import ContactCTA from '@/components/contact/contact-cta';
import ContactHero from '@/components/contact/contact-hero';
import ContactVision from '@/components/contact/contact-vision';
import Founders from '@/components/contact/founder';
import ProcessSection from '@/components/services/process-section';

export const metadata = {
  title:
    'Contact Auto Craft | Best IT Company India | Meet the Founders | Ghaziabad',
  description:
    "Contact Auto Craft — India's best SaaS & AI automation company. Meet founders Dharmendra Yadav and Ganesh Sharma. Based in Indrapuram, Ghaziabad, serving all 28 states.",
  keywords: [
    'Auto Craft contact',
    'best IT company India',
    'AI automation company India',
    'SaaS development company Ghaziabad',
    'Ganesh Sharma Auto Craft',
    'Dharmendra Yadav Auto Craft',
  ],
  alternates: {
    canonical: 'https://autocraft-phi.vercel.app/contact',
  },
  openGraph: {
    title: 'Contact Auto Craft | Meet the Founders | Best IT Company India',
    description:
      'Meet Dharmendra Yadav and Ganesh Sharma — the builders behind Auto Craft.',
    url: 'https://autocraft-phi.vercel.app/contact',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Auto Craft',
  url: 'https://autocraft-phi.vercel.app',
  logo: 'https://autocraft-phi.vercel.app/images/ACNeww.ico',
  description:
    'SaaS development, AI automations, websites and growth systems for businesses across India.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Indrapuram, Ghaziabad',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  founder: [
    {
      '@type': 'Person',
      name: 'Dharmendra Yadav',
    },
    {
      '@type': 'Person',
      name: 'Ganesh Sharma',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-63064-50212',
      contactType: 'customer service',
    },
    {
      '@type': 'ContactPoint',
      telephone: '+91-88021-30983',
      contactType: 'customer service',
    },
  ],
};

export default function ContactPage() {
  return (
    <main className="bg-[#f5f5f0] text-[#0a0a0a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <ContactHero />
      <Founders />
      <ContactVision />
      <ProcessSection />
      <ContactCTA />
    </main>
  );
}
