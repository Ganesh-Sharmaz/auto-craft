import Footer from '@/components/common/footer';
import Nav from '@/components/common/navbar';
import type { ReactNode } from 'react';

export default function LocationLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="w-full min-h-screen">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
