import ContactForm from '@/components/common/contact-form';
import Hero from '@/components/home/hero';
import Location from '@/components/home/location';
import Manifesto from '@/components/home/manifesto';
import Marquee from '@/components/home/marquee';
import Services from '@/components/home/services';
import Taglines from '@/components/home/taglines';
import Team from '@/components/home/teams';
import React from 'react';

const page = () => {
  return (
    <div className="w-full h-fit">
      <Hero />
      <Marquee />
      <Services />
      <Manifesto />
      <Taglines />
      <Team />
      <Location />
      <ContactForm />
    </div>
  );
};

export default page;
