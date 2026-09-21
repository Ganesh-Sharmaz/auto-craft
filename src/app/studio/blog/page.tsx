import type { Metadata } from 'next';
import BlogStudio from '@/components/admin/blog-studio';

export const metadata: Metadata = {
  title: 'Blog Studio | Auto Craft',
  robots: { index: false, follow: false },
};

export default function BlogStudioPage() {
  return <BlogStudio />;
}
