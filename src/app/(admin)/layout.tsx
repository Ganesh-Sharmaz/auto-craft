import Footer from '@/components/common/footer';
import Nav from '@/components/common/navbar';
import React from 'react';

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="w-full min-h-screen">
      <Nav />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
