'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const whyPoints = [
  {
    num: '01',
    text: `We've shipped real production products — not just portfolios. Our founders have built enterprise HR platforms, WhatsApp SaaS tools, and SEO platforms serving thousands of real users.`,
  },
  {
    num: '02',
    text: `No juniors on your project. Both founders personally write, review, and own every line of code we deliver.`,
  },
  {
    num: '03',
    text: `We're builders first, agency second. We started Auto Craft because we love building products — and that passion shows in every delivery.`,
  },
  {
    num: '04',
    text: `We serve all 28 states of India, remotely. Delhi NCR clients get the same quality as those in Bangalore, Chennai, Mumbai, or Guwahati.`,
  },
  {
    num: '05',
    text: `We price honestly. No hidden costs, no scope creep, no surprise invoices. What's in the proposal is what you pay.`,
  },
];

function WhyPoint({
  point,
  index,
}: Readonly<{
  point: (typeof whyPoints)[0];
  index: number;
}>) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-60px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.08,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        padding: '28px 0',
        borderBottom: '1px solid #d0d0c8',
        display: 'flex',
        gap: '20px',
        alignItems: 'baseline',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.5rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#aaaaaa',
          minWidth: '36px',
          flexShrink: 0,
        }}
      >
        {point.num}
      </span>

      <p
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.1em',
          lineHeight: 2,
          textTransform: 'uppercase',
          color: '#0a0a0a',
        }}
      >
        {point.text}
      </p>
    </motion.div>
  );
}

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  });

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderBottom: '1px solid #d0d0c8',
        background: '#f5f5f0',
      }}
      className="max-sm:!grid-cols-1"
    >
      {/* LEFT INTRO */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          padding: '100px 60px',
          borderRight: '1px solid #d0d0c8',
        }}
        className="max-sm:!border-r-0 max-sm:!border-b max-sm:!border-[#d0d0c8] max-sm:!px-6 max-sm:!py-16"
      >
        <div
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#aaaaaa',
            marginBottom: '40px',
          }}
        >
          Why Auto Craft
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(36px, 5vw, 68px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: '#0a0a0a',
          }}
        >
          Why we&apos;re
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 400 }}>different.</em>
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.1em',
            lineHeight: 2,
            textTransform: 'uppercase',
            color: '#aaaaaa',
            marginTop: '32px',
            maxWidth: '480px',
          }}
        >
          Every agency promises quality. Here&apos;s what actually sets us apart
          — in specifics, not adjectives.
        </p>
      </motion.div>

      {/* RIGHT POINTS */}
      <div
        style={{
          padding: '100px 60px',
          display: 'flex',
          flexDirection: 'column',
        }}
        className="max-sm:!px-6 max-sm:!py-16"
      >
        {whyPoints.map((point, index) => (
          <WhyPoint key={point.num} point={point} index={index} />
        ))}
      </div>
    </section>
  );
}
