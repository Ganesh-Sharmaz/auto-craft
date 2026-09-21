import { NextResponse } from 'next/server';
import { isAdminRequest, readPosts, savePosts } from '@/lib/blog-admin';

export const runtime = 'nodejs';

export async function GET() {
  if (!(await isAdminRequest()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(
    { posts: await readPosts() },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

export async function POST(request: Request) {
  if (!(await isAdminRequest()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const post = await request.json();
  if (
    !post ||
    typeof post !== 'object' ||
    typeof post.slug !== 'string' ||
    !post.slug ||
    !Array.isArray(post.content)
  )
    return NextResponse.json(
      { error: 'Post must include a slug and content array.' },
      { status: 400 },
    );
  const posts = (
    (await readPosts()) as Array<{
      slug: string;
      publishedAt?: string;
      featured?: boolean;
    }>
  ).filter((item) => item.slug !== post.slug);
  posts.push(post);
  posts.sort((a, b) => {
    if (Boolean(b.featured) !== Boolean(a.featured)) {
      return Boolean(b.featured) ? -1 : 1;
    }
    return String(b.publishedAt || '').localeCompare(String(a.publishedAt || ''));
  });
  const storage = await savePosts(posts);
  return NextResponse.json({ ok: true, storage, posts });
}
