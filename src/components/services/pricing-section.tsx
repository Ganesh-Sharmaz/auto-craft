'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    tier: 'Tier 01',
    name: 'Starter',
    range: '₹30,000 – ₹80,000',
    note: 'Ideal for: Freelancers, local businesses, early-stage startups',
    features: [
      'Single web presence or landing page',
      'SEO-optimised with schema markup',
      'Mobile-responsive design',
      'Basic contact / lead capture',
      '2-week delivery',
      '1 month post-launch support',
    ],
  },
  {
    tier: 'Tier 02',
    name: 'Growth',
    range: '₹80,000 – ₹3,00,000',
    note: 'Ideal for: Growing startups, D2C brands, service businesses',
    features: [
      'Full web application or small SaaS MVP',
      'Custom dashboard & user authentication',
      'Payment integration (Razorpay)',
      'AI automation workflow (1–2 flows)',
      '4–8 week delivery',
      '3 months post-launch support',
    ],
  },
  {
    tier: 'Tier 03',
    name: 'Enterprise',
    range: '₹3,00,000+',
    note: 'Ideal for: Enterprises, funded startups, MSME platforms',
    features: [
      'Full-scale SaaS platform',
      'Multi-tenant architecture & RBAC',
      'Custom AI automation suite',
      'Admin CMS & analytics dashboards',
      '8–20+ week delivery',
      'Ongoing retainer available',
    ],
  },
];

function PricingCard({
  plan,
  index,
}: {
  plan: (typeof pricingPlans)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-60px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        padding: '52px 48px',
        border: '1px solid #1e1e1e',
        marginRight: '-1px',
      }}
      className="max-sm:!mb-[-1px] max-sm:!mr-0"
    >
      <div
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.5rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#555',
          marginBottom: '16px',
        }}
      >
        {plan.tier}
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(22px, 2.5vw, 36px)',
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: '8px',
          color: '#f5f5f0',
        }}
      >
        {plan.name}
      </h3>

      <div
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#aaaaaa',
          marginBottom: '32px',
          paddingBottom: '32px',
          borderBottom: '1px solid #1e1e1e',
        }}
      >
        {plan.range}
      </div>

      <div className="flex flex-col">
        {plan.features.map((feature, i) => (
          <div
            key={i}
            className="flex gap-3"
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.5rem',
              letterSpacing: '0.1em',
              lineHeight: 2.5,
              textTransform: 'uppercase',
              color: '#666',
            }}
          >
            <Check size={12} className="mt-[6px] shrink-0" />
            {feature}
          </div>
        ))}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.5rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#333',
          marginTop: '40px',
          paddingTop: '24px',
          borderTop: '1px solid #1e1e1e',
        }}
      >
        {plan.note}
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  });

  return (
    <section
      style={{
        background: '#0a0a0a',
        color: '#f5f5f0',
        padding: '100px 60px',
        borderBottom: '1px solid #111',
      }}
      className="max-sm:!px-6 max-sm:!py-16"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#555',
            marginBottom: '16px',
          }}
        >
          Investment
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(36px, 5vw, 68px)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            marginBottom: '64px',
            color: '#f5f5f0',
          }}
        >
          Transparent
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 400 }}>pricing.</em>
        </h2>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0',
        }}
        className="max-sm:!grid-cols-1"
      >
        {pricingPlans.map((plan, index) => (
          <PricingCard key={plan.name} plan={plan} index={index} />
        ))}
      </div>
    </section>
  );
}
