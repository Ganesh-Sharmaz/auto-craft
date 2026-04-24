'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    num: '01 / Service',
    title: ['SaaS', 'Products'],
    desc: "Full-stack software built to serve thousands. We architect, design, and ship products that don't just work — they win.",
  },
  {
    num: '02 / Service',
    title: ['AI', 'Automations'],
    desc: 'Intelligent workflows that eliminate grunt work. Your team focuses on what matters. We automate the rest.',
  },
  {
    num: '03 / Service',
    title: ['Web', 'Presence'],
    desc: 'Websites that look like art and perform like machines. First impressions are everything — we make yours unforgettable.',
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        padding: '80px 52px',
        borderRight: '1px solid #d0d0c8',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '420px',
        position: 'relative',
        overflow: 'hidden',
        background: '#f5f5f0',
        transition: 'background 0.3s ease',
        cursor: 'crosshair',
      }}
      className="group last:border-r-0 max-sm:!border-r-0 max-sm:!border-b max-sm:!border-[#d0d0c8] max-sm:!p-[60px_24px]"
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = '#0a0a0a';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = '#f5f5f0';
      }}
    >
      <div>
        <p
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#aaaaaa',
            transition: 'color 0.3s ease',
          }}
          className="group-hover:!text-white"
        >
          {service.num}
        </p>

        <div
          style={{
            width: '40px',
            height: '1px',
            background: '#d0d0c8',
            margin: '24px 0',
            transition: 'background 0.3s ease',
          }}
          className="group-hover:!bg-[#333]"
        />

        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(28px, 3vw, 44px)',
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: '28px',
            color: '#0a0a0a',
            transition: 'color 0.3s ease',
          }}
          className="group-hover:!text-white"
        >
          {service.title[0]}
          <br />
          {service.title[1]}
        </h2>
      </div>

      <div>
        <p
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.08em',
            lineHeight: 2,
            textTransform: 'uppercase',
            color: '#aaaaaa',
            transition: 'color 0.3s ease',
            flex: 1,
          }}
          className="group-hover:!text-white"
        >
          {service.desc}
        </p>

        <Link
          href="/services"
          style={{
            marginTop: '40px',
            display: 'block',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#aaaaaa',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
          className="group-hover:!text-white"
        >
          → Explore
        </Link>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        borderBottom: '1px solid #d0d0c8',
        borderTop: '1px solid #d0d0c8',
        background: '#f5f5f0',
      }}
      className="max-sm:!grid-cols-1"
    >
      {services.map((service, index) => (
        <ServiceCard key={index} service={service} index={index} />
      ))}
    </section>
  );
}
