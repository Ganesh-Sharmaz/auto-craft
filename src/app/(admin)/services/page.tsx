import ServicesHero from '@/components/services/services-hero';
import ServiceOverview from '@/components/services/service-overview';
import ServiceSection from '@/components/services/service-section';
import PricingSection from '@/components/services/pricing-section';
import WhyUs from '@/components/services/why-us';
import ServiceContactCTA from '@/components/services/service-contact-us';

export const metadata = {
  title:
    'Services | Auto Craft — SaaS Development, AI Automation & Web Design India',
  description:
    'Auto Craft offers SaaS product development, AI automation workflows, and high-performance web design across all 28 states of India. Best IT services company Ghaziabad, UP.',
  keywords: [
    'SaaS development services India',
    'AI automation services India',
    'web development services India',
    'custom software development India',
    'workflow automation India',
    'Next.js development India',
    'React development India',
    'Python automation India',
    'full-stack development India',
    'IT services Ghaziabad',
    'software company Uttar Pradesh',
    'best web agency India',
  ],
  alternates: {
    canonical: 'https://autocraft-phi.vercel.app/services',
  },
  openGraph: {
    title: 'Services | Auto Craft — Best IT Services India',
    description:
      'SaaS development, AI automation, and web design services across India. Auto Craft — Indrapuram, Ghaziabad.',
    url: 'https://autocraft-phi.vercel.app/services',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Auto Craft Services — Best IT Services India',
  description:
    'SaaS development, AI automation, and web design services across all 28 states of India',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'SaaS Product Development India',
        description:
          'Full-stack SaaS product development using Next.js, React, TypeScript, Node.js, Python. Serving startups and enterprises across all Indian states.',
        provider: {
          '@type': 'Organization',
          name: 'Auto Craft',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'AI Automation India',
        description:
          'Intelligent AI workflow automation using LLMs, Python, and integration APIs. Eliminating manual work for Indian businesses.',
        provider: {
          '@type': 'Organization',
          name: 'Auto Craft',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'Web Presence & Design India',
        description:
          'High-converting, SEO-optimized websites and web applications for businesses across India.',
        provider: {
          '@type': 'Organization',
          name: 'Auto Craft',
        },
      },
    },
  ],
};

export default function ServicesPage() {
  return (
    <main className="bg-[#f5f5f0] text-[#0a0a0a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <ServicesHero />
      <ServiceOverview />

      {/* SaaS */}
      <ServiceSection type="saas" />

      {/* AI */}
      <ServiceSection type="ai" />

      {/* Web */}
      <ServiceSection type="web" />
      <WhyUs />
      <ServiceContactCTA />
    </main>
  );
}
