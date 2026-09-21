import blogs from '@/data/blog-posts.json';
import locations from '@/data/location-pages.json';
import states from '@/data/state-pages.json';
import { getFirebaseAdminFirestore } from '@/lib/firebase/admin';
import { normalizeBlogPosts, type BlogPost, type NormalizedBlogPost } from '@/lib/blog-schema';

async function readCollection<T>(name: string, fallback: T[]): Promise<T[]> {
  const db = getFirebaseAdminFirestore();
  if (!db) return fallback;
  const snapshot = await db.collection(name).get();
  return snapshot.empty ? fallback : snapshot.docs.map((doc) => doc.data() as T);
}

export async function getBlogPosts(): Promise<NormalizedBlogPost[]> {
  const posts = await readCollection<BlogPost>('blogPosts', blogs as BlogPost[]);
  return normalizeBlogPosts([...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)));
}

export async function getStates() {
  return readCollection('statePages', states);
}

export async function getLocations() {
  return readCollection('locationPages', locations);
}
