import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const required = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'];
for (const name of required) {
  if (!process.env[name]) throw new Error(`Missing ${name}`);
}

const app = getApps()[0] || initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});
const db = getFirestore(app);

const json = async (file) => JSON.parse(await readFile(path.join(root, 'src/data', file), 'utf8'));

async function writeCollection(name, records, idFor) {
  const batch = db.batch();
  for (const record of records) batch.set(db.collection(name).doc(idFor(record)), record, { merge: true });
  await batch.commit();
}

const blogs = await json('blog-posts.json');
const states = await json('state-pages.json');
const locations = await json('location-pages.json');

await writeCollection('blogPosts', blogs, (post) => post.slug);
await writeCollection('statePages', states, (state) => state.stateSlug);
await writeCollection('locationPages', locations, (location) => `${location.stateSlug}__${location.citySlug}`);

console.log(`Seeded ${blogs.length} blog posts, ${states.length} states, and ${locations.length} locations into Firestore.`);
