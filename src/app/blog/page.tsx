import type { Metadata } from 'next';
import BlogIndex from '@/components/blog/blog-index';
import PageNavigation from '@/components/common/page-navigation';
import { getBlogPosts } from '@/lib/content-data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Field Notes on SaaS, AI & Web Development | Auto Craft',
  description:
    'Practical engineering and product notes from Auto Craft on SaaS development, AI automation, web development, and SEO.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Field Notes on SaaS, AI & Web Development | Auto Craft',
    description: 'Practical engineering and product notes from Auto Craft.',
    url: '/blog',
    type: 'website',
  },
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  return (
    <>
      <PageNavigation
        items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />
      <BlogIndex posts={blogPosts} />
    </>
  );
}
