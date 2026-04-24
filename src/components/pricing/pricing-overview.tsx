'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const always = [
  {
    num: '01',
    title: 'No junior devs',
    desc: 'Both founders personally write, review, and own every line of code on your project. Always.',
  },
  {
    num: '02',
    title: 'Fixed-scope proposals',
    desc: 'What is in the proposal is what you pay. No scope creep, no surprise invoices mid-project.',
  },
  {
    num: '03',
    title: 'Post-launch support',
    desc: 'Every engagement includes a support window. We do not disappear after handoff.',
  },
  {
    num: '04',
    title: 'Documented handoff',
    desc: 'Full codebase documentation, deployment guides, and walkthrough calls — you own everything.',
  },
  {
    num: '05',
    title: 'Milestone payments',
    desc: 'We split payments into milestones tied to real deliverables. Pay as we build.',
  },
];

function AlwaysPoint({
  point,
  index,
}: {
  point: (typeof always)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

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
      <div>
        <p
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            lineHeight: 1.5,
            textTransform: 'uppercase',
            color: '#0a0a0a',
            marginBottom: '6px',
          }}
        >
          {point.title}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.1em',
            lineHeight: 2,
            textTransform: 'uppercase',
            color: '#aaaaaa',
          }}
        >
          {point.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function PricingOverview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <>
      {/* ALWAYS INCLUDED */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid #d0d0c8',
          background: '#f5f5f0',
        }}
        className="max-sm:!grid-cols-1"
      >
        {/* LEFT */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
            Always Included
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
            Every project.
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 400 }}>
              Every time.
            </em>
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
              maxWidth: '380px',
            }}
          >
            Regardless of which tier fits your budget, these are non-negotiable
            standards we hold ourselves to on every single engagement.
          </p>
        </motion.div>

        {/* RIGHT */}
        <div
          style={{
            padding: '100px 60px',
            display: 'flex',
            flexDirection: 'column',
          }}
          className="max-sm:!px-6 max-sm:!py-16"
        >
          {always.map((point, index) => (
            <AlwaysPoint key={point.num} point={point} index={index} />
          ))}
        </div>
      </section>

      {/* NEGOTIATION NOTE */}
      <section
        style={{
          background: '#0a0a0a',
          borderBottom: '1px solid #1a1a1a',
          padding: '80px 60px',
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '60px',
          alignItems: 'center',
        }}
        className="max-sm:!grid-cols-1 max-sm:!px-6 max-sm:!py-14 max-sm:!gap-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#444',
              marginBottom: '20px',
            }}
          >
            A Note On Pricing
          </div>
          <div
            style={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 900,
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              lineHeight: 1.0,
              color: '#f5f5f0',
            }}
          >
            These are
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 400 }}>
              starting points.
            </em>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            lineHeight: 2.2,
            textTransform: 'uppercase',
            color: '#555',
            maxWidth: '600px',
          }}
        >
          The ranges above reflect typical project scopes — but every business
          is different. If your budget sits between tiers, or your scope
          doesn&apos;t map cleanly to one box, talk to us. We&apos;ve structured
          flexible payment plans, phased builds, and custom scopes for founders
          and businesses at every stage. The right engagement is the one that
          works for both sides — and we&apos;re always open to finding it
          together.
        </motion.p>
      </section>
    </>
  );
}
