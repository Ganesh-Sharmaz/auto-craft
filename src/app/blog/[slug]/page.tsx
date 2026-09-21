import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArticle from '@/components/blog/blog-article';
import { getBlogPosts } from '@/lib/content-data';

type Params = { slug: string };
const baseUrl = 'https://autocraft-phi.vercel.app';
export const dynamicParams = true;
export const dynamic = 'force-dynamic';

export async function generateStaticParams(): Promise<Params[]> {
  return (await getBlogPosts()).map(({ slug }) => ({ slug }));
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toISOString();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getBlogPosts()).find((item) => item.slug === slug);
  if (!post) return {};

  const url = `${baseUrl}/blog/${post.slug}`;
  return {
    title: `${post.title} | Auto Craft`,
    description: post.subtitle,
    authors: [{ name: post.author.name }],
    creator: post.author.name,
    publisher: 'Auto Craft',
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.subtitle,
      url,
      type: 'article',
      publishedTime: formatDate(post.publishedAt),
      modifiedTime: formatDate(post.updatedAt),
      authors: [post.author.name],
      tags: post.tags,
      ...(post.image ? { images: [{ url: post.image, alt: post.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.subtitle,
      ...(post.image ? { images: [post.image] } : {}),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = (await getBlogPosts()).find((item) => item.slug === slug);
  if (!post) notFound();

  const url = `${baseUrl}/blog/${post.slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.subtitle,
    ...(post.image ? { image: [`${baseUrl}${post.image}`] } : {}),
    datePublished: formatDate(post.publishedAt),
    dateModified: formatDate(post.updatedAt),
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: `${baseUrl}/contact`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'Auto Craft',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/images/ACNeww.ico` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogArticle post={post} />
    </>
  );
}
