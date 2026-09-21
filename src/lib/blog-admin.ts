import { createHmac, timingSafeEqual } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { cookies } from 'next/headers';
import { getFirebaseAdminBucket, getFirebaseAdminFirestore } from '@/lib/firebase/admin';

export const ADMIN_COOKIE = 'auto_craft_blog_admin';
const DATA_PATH = path.join(process.cwd(), 'src/data/blog-posts.json');
const IMAGE_DIR = path.join(process.cwd(), 'public/images/blog');

function secret() {
  return process.env.BLOG_ADMIN_SESSION_SECRET || process.env.BLOG_ADMIN_PASSWORD || 'local-dev-only-secret';
}

function signature(value: string) {
  return createHmac('sha256', secret()).update(value).digest('hex');
}

export function isAdminPasswordValid(value: string) {
  const expected = process.env.BLOG_ADMIN_PASSWORD;
  if (!expected || !value) return false;
  const actualBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export function createAdminToken() {
  const value = 'authenticated';
  return `${value}.${signature(value)}`;
}

export function isAdminTokenValid(value: string | undefined) {
  if (!value) return false;
  const [payload, hash] = value.split('.');
  if (!payload || !hash) return false;
  const expected = signature(payload);
  return hash.length === expected.length && timingSafeEqual(Buffer.from(hash), Buffer.from(expected));
}

export async function isAdminRequest() {
  const store = await cookies();
  return isAdminTokenValid(store.get(ADMIN_COOKIE)?.value);
}

export async function readLocalPosts() {
  return JSON.parse(await readFile(DATA_PATH, 'utf8')) as unknown[];
}

export async function writeLocalPosts(posts: unknown[]) {
  await writeFile(DATA_PATH, `${JSON.stringify(posts, null, 2)}\n`, 'utf8');
}

export async function readPosts() {
  const db = getFirebaseAdminFirestore();
  if (!db) return readLocalPosts();
  const snapshot = await db.collection('blogPosts').get();
  return snapshot.empty ? readLocalPosts() : snapshot.docs.map((doc) => doc.data());
}

export async function savePosts(posts: unknown[]) {
  const db = getFirebaseAdminFirestore();
  if (!db) {
    await writeLocalPosts(posts);
    return 'local';
  }

  const batch = db.batch();
  for (const post of posts as Array<{ slug: string }>) {
    if (!post.slug) throw new Error('Every blog post must have a slug');
    batch.set(db.collection('blogPosts').doc(post.slug), post, { merge: true });
  }
  await batch.commit();
  return 'firebase';
}

export async function saveImage(fileName: string, content: Buffer, contentType = 'application/octet-stream') {
  const safeName = fileName.toLowerCase().replace(/[^a-z0-9._-]+/g, '-');
  if (!safeName || safeName.startsWith('.')) throw new Error('Invalid image filename');

  const bucket = getFirebaseAdminBucket();
  if (bucket) {
    const file = bucket.file(`images/blog/${safeName}`);
    await file.save(content, {
      resumable: false,
      metadata: { contentType, cacheControl: 'public,max-age=31536000,immutable' },
    });
    const [url] = await file.getSignedUrl({ action: 'read', expires: '01-01-2099' });
    return url;
  }

  await mkdir(IMAGE_DIR, { recursive: true });
  await writeFile(path.join(IMAGE_DIR, safeName), content);
  return `/images/blog/${safeName}`;
}
