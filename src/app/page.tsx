import type { Metadata } from 'next';
import ContactForm from '@/components/common/contact-form';
import Footer from '@/components/common/footer';
import FieldNotes from '@/components/home/field-notes';
import Hero from '@/components/home/hero';
import Location from '@/components/home/location';
import Manifesto from '@/components/home/manifesto';
import Marquee from '@/components/home/marquee';
import Nav from '@/components/common/navbar';
import Services from '@/components/home/services';
import Taglines from '@/components/home/taglines';
import Team from '@/components/home/teams';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Auto Craft | SaaS, AI Automation & Web Development India',
  description:
    'Auto Craft builds SaaS products, AI automations, and high-performance websites for businesses across India. Read practical field notes on AI agents, SEO, and product engineering from our team in Ghaziabad.',
  keywords: [
    'SaaS development India',
    'AI automation company India',
    'web development company India',
    'software development Ghaziabad',
    'AI engineering blog India',
    'SEO and SaaS field notes',
    'Auto Craft',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Auto Craft | SaaS, AI Automation & Web Development India',
    description:
      'SaaS products, AI automations, and high-performance websites by Auto Craft, plus practical notes on building them.',
    url: '/',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="w-full min-h-screen">
      <Nav />
      <div className="w-full h-fit">
        <Hero />
        <Marquee />
        <Services />
        <FieldNotes />
        <Manifesto />
        <Taglines />
        <Team />
        <Location />
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
}
