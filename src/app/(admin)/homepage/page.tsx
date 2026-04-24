import ContactForm from '@/components/common/contact-form';
import Hero from '@/components/homepage/hero';
import Location from '@/components/homepage/location';
import Manifesto from '@/components/homepage/manifesto';
import Marquee from '@/components/homepage/marquee';
import Services from '@/components/homepage/services';
import Taglines from '@/components/homepage/taglines';
import Team from '@/components/homepage/teams';
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
