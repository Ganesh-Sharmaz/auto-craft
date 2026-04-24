import PricingHero from '@/components/pricing/pricing-hero';
import PricingOverview from '@/components/pricing/pricing-overview';
import PricingSection from '@/components/services/pricing-section';
import PricingProcess from '@/components/pricing/pricing-process';
import PricingFAQ from '@/components/pricing/pricing-faq';
import ServiceContactCTA from '@/components/services/service-contact-us';
import ContactForm from '@/components/common/contact-form';

export const metadata = {
  title: 'Pricing | Auto Craft — Transparent Software Development Costs India',
  description:
    'Honest, transparent pricing for SaaS development, AI automation, and web design across India. No hidden costs. Flexible engagements for startups and enterprises. Auto Craft, Indrapuram, Ghaziabad.',
  keywords: [
    'software development cost India',
    'SaaS development pricing India',
    'AI automation cost India',
    'web development pricing India',
    'IT services cost Ghaziabad',
    'custom software pricing India',
    'startup development budget India',
    'affordable SaaS development India',
    'Next.js developer cost India',
    'React developer pricing India',
    'full-stack development cost India',
    'Auto Craft pricing',
  ],
  alternates: {
    canonical: 'https://autocraft-phi.vercel.app/pricing',
  },
  openGraph: {
    title: 'Pricing | Auto Craft — Transparent IT Services India',
    description:
      'Transparent pricing for SaaS, AI automation, and web development. Auto Craft — Indrapuram, Ghaziabad. Flexible plans for every budget.',
    url: 'https://autocraft-phi.vercel.app/pricing',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Auto Craft Pricing Plans',
  description:
    'Transparent pricing tiers for SaaS development, AI automation, and web presence services by Auto Craft, India.',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Offer',
        name: 'Starter',
        description:
          'Single web presence or landing page, SEO-optimised, mobile-responsive, with basic lead capture and 1 month post-launch support.',
        price: '30000',
        priceCurrency: 'INR',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '30000',
          maxPrice: '80000',
          priceCurrency: 'INR',
        },
        seller: {
          '@type': 'Organization',
          name: 'Auto Craft',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Indrapuram, Ghaziabad',
            addressRegion: 'Uttar Pradesh',
            addressCountry: 'IN',
          },
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Offer',
        name: 'Growth',
        description:
          'Full web application or SaaS MVP with dashboard, authentication, payment integration, and AI automation workflows.',
        price: '80000',
        priceCurrency: 'INR',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '80000',
          maxPrice: '300000',
          priceCurrency: 'INR',
        },
        seller: {
          '@type': 'Organization',
          name: 'Auto Craft',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Indrapuram, Ghaziabad',
            addressRegion: 'Uttar Pradesh',
            addressCountry: 'IN',
          },
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Offer',
        name: 'Enterprise',
        description:
          'Full-scale SaaS platform with multi-tenant architecture, RBAC, custom AI automation suite, and admin dashboards.',
        price: '300000',
        priceCurrency: 'INR',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: '300000',
          priceCurrency: 'INR',
        },
        seller: {
          '@type': 'Organization',
          name: 'Auto Craft',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Indrapuram, Ghaziabad',
            addressRegion: 'Uttar Pradesh',
            addressCountry: 'IN',
          },
        },
      },
    },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are the prices fixed or negotiable?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The ranges are honest estimates based on typical project scopes — not fixed ceilings. We structure phased builds, stripped-down MVPs, and flexible payment plans for businesses at every stage.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in post-launch support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bug fixes, minor UI adjustments, deployment issues, and general questions within the agreed support window. Ongoing retainers for continued development are available separately.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are payments structured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We use milestone-based payments — typically 30% to start, 40% at mid-project milestone, and 30% on final delivery. Nothing is paid upfront without a signed scope document.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with international clients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We are based in Indrapuram, Ghaziabad, but work fully remotely. All communication is in English and payments can be structured accordingly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you sign NDAs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, always. We sign NDAs before any detailed technical or business discussions. Your idea, your data, and your code are yours.',
      },
    },
  ],
};

export default function PricingPage() {
  return (
    <main className="bg-[#f5f5f0] text-[#0a0a0a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PricingHero />
      <PricingOverview />
      <PricingSection />
      <PricingProcess />
      <PricingFAQ />
      <ServiceContactCTA />
      <ContactForm />
    </main>
  );
}
