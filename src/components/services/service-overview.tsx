'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    num: '01',
    title: 'SaaS Products',
    desc: 'Full-stack platforms built to serve thousands',
    href: '#saas',
  },
  {
    num: '02',
    title: 'AI Automations',
    desc: 'Intelligent workflows that eliminate grunt work',
    href: '#ai',
  },
  {
    num: '03',
    title: 'Web Presence',
    desc: 'High-converting digital experiences that sell',
    href: '#web',
  },
];

function ServiceCard({
  service,
  index,
}: Readonly<{
  service: (typeof services)[0];
  index: number;
}>) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-60px',
  });

  return (
    <motion.a
      ref={ref}
      href={service.href}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        padding: '64px 52px',
        borderRight: index < services.length - 1 ? '1px solid #d0d0c8' : 'none',
        textDecoration: 'none',
        color: '#0a0a0a',
        display: 'block',
        cursor: 'pointer',
      }}
      className="max-sm:!border-r-0 max-sm:!border-b max-sm:!border-[#d0d0c8] last:max-sm:!border-b-0"
    >
      <div
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          color: '#aaaaaa',
          textTransform: 'uppercase',
          marginBottom: '16px',
          transition: 'color 0.2s',
        }}
      >
        {service.num}
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(24px, 2.5vw, 36px)',
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: '16px',
          color: '#0a0a0a',
        }}
      >
        {service.title}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.1em',
          lineHeight: 1.9,
          color: '#aaaaaa',
          textTransform: 'uppercase',
        }}
      >
        {service.desc}
      </p>

      <span
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#aaaaaa',
          display: 'block',
          marginTop: '24px',
        }}
      >
        → Deep Dive
      </span>
    </motion.a>
  );
}

export default function ServiceOverview() {
  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        borderBottom: '1px solid #d0d0c8',
        background: '#f5f5f0',
      }}
      className="max-sm:!grid-cols-1"
    >
      {services.map((service, index) => (
        <ServiceCard key={service.title} service={service} index={index} />
      ))}
    </section>
  );
}
