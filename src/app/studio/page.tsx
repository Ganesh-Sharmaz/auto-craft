import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import StudioLogin from '@/components/admin/studio-login';
import { isAdminRequest } from '@/lib/blog-admin';

export const metadata: Metadata = {
  title: 'Private Studio | Auto Craft',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function StudioPage() {
  if (await isAdminRequest()) redirect('/analytics');
  return <StudioLogin />;
}
