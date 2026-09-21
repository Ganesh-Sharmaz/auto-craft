import type { Metadata } from 'next';
import posts from '@/data/blog-posts.json';
import BlogIndex from '@/components/blog/blog-index';
import PageNavigation from '@/components/common/page-navigation';
import { normalizeBlogPosts, type BlogPost } from '@/lib/blog-schema';

const blogPosts = normalizeBlogPosts(posts as BlogPost[]);

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

export default function BlogPage() {
  return (
    <>
      <PageNavigation
        items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />
      <BlogIndex posts={blogPosts} />
    </>
  );
}
