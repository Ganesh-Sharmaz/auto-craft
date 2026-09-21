import Footer from '@/components/common/footer';
import Nav from '@/components/common/navbar';
import type { ReactNode } from 'react';

export default function BlogLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="w-full min-h-screen bg-[#f5f5f0]">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
