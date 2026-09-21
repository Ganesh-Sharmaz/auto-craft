import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const required = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY', 'FIREBASE_STORAGE_BUCKET'];
for (const name of required) {
  if (!process.env[name]) throw new Error(`Missing ${name}`);
}

const app = getApps()[0] || initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});
const db = getFirestore(app);
const bucket = getStorage(app).bucket();

const json = async (file) => JSON.parse(await readFile(path.join(root, 'src/data', file), 'utf8'));

async function imageMap() {
  const map = new Map();
  const imageRoot = path.join(root, 'public/images');

  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) await visit(absolute);
      else {
        const relative = path.relative(imageRoot, absolute).split(path.sep).join('/');
        const destination = `images/${relative}`;
        const file = bucket.file(destination);
        const content = await readFile(absolute);
        const extension = path.extname(entry.name).toLowerCase();
        const contentType = extension === '.png' ? 'image/png' : extension === '.webp' ? 'image/webp' : extension === '.svg' ? 'image/svg+xml' : 'image/jpeg';
        await file.save(content, { resumable: false, metadata: { contentType, cacheControl: 'public,max-age=31536000,immutable' } });
        const [url] = await file.getSignedUrl({ action: 'read', expires: '01-01-2099' });
        map.set(`/images/${relative}`, url);
      }
    }
  }

  await visit(imageRoot);
  return map;
}

function replaceImages(value, images) {
  if (typeof value === 'string') {
    const clean = value.split('?')[0];
    return images.get(clean) || value;
  }
  if (Array.isArray(value)) return value.map((item) => replaceImages(item, images));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, replaceImages(item, images)]));
  return value;
}

async function writeCollection(name, records, idFor) {
  const batch = db.batch();
  for (const record of records) batch.set(db.collection(name).doc(idFor(record)), record, { merge: true });
  await batch.commit();
}

const images = await imageMap();
const blogs = replaceImages(await json('blog-posts.json'), images);
const states = await json('state-pages.json');
const locations = await json('location-pages.json');

await writeCollection('blogPosts', blogs, (post) => post.slug);
await writeCollection('statePages', states, (state) => state.stateSlug);
await writeCollection('locationPages', locations, (location) => `${location.stateSlug}__${location.citySlug}`);

console.log(`Seeded ${blogs.length} blog posts, ${states.length} states, ${locations.length} locations, and ${images.size} images.`);
