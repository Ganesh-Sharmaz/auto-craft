'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    num: '01',
    title: 'Discovery Call',
    duration: '30–60 min',
    desc: "We understand your product, goals, timeline, and budget. No pressure, no sales pitch — just a straight conversation about what you need and whether we're the right fit.",
  },
  {
    num: '02',
    title: 'Proposal & Scope',
    duration: '2–3 days',
    desc: 'We put together a detailed written proposal: scope of work, tech stack, timeline, milestones, and a fixed price. Everything in writing before any work begins.',
  },
  {
    num: '03',
    title: 'Kickoff & Build',
    duration: 'Project duration',
    desc: 'Work begins. You get regular updates, milestone demos, and direct access to both founders throughout. No account managers, no middlemen.',
  },
  {
    num: '04',
    title: 'Launch & Handoff',
    duration: '1–2 days',
    desc: 'We deploy, document, and walk you through everything. Full codebase ownership transfers to you. You are never locked in.',
  },
  {
    num: '05',
    title: 'Post-Launch Support',
    duration: 'Included window',
    desc: 'Every project comes with a post-launch support period. Bug fixes, minor adjustments, and questions — covered. Longer retainers available for ongoing work.',
  },
];

function StepItem({
  step,
  index,
  total,
}: {
  step: (typeof steps)[0];
  index: number;
  total: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 200px',
        gap: '40px',
        padding: '36px 0',
        borderBottom: index < total - 1 ? '1px solid #1e1e1e' : 'none',
        alignItems: 'baseline',
      }}
      className="max-sm:!grid-cols-1 max-sm:!gap-3"
    >
      <span
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.5rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#444',
        }}
      >
        {step.num}
      </span>

      <div>
        <p
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(18px, 2vw, 26px)',
            fontWeight: 900,
            color: '#f5f5f0',
            marginBottom: '10px',
            lineHeight: 1,
          }}
        >
          {step.title}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.1em',
            lineHeight: 2,
            textTransform: 'uppercase',
            color: '#555',
          }}
        >
          {step.desc}
        </p>
      </div>

      <span
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.5rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#333',
          textAlign: 'right',
        }}
        className="max-sm:!text-left"
      >
        {step.duration}
      </span>
    </motion.div>
  );
}

export default function PricingProcess() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

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
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: '64px' }}
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
          How It Works
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(36px, 5vw, 68px)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: '#f5f5f0',
          }}
        >
          From brief
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 400 }}>to launch.</em>
        </h2>
      </motion.div>

      <div>
        {steps.map((step, index) => (
          <StepItem
            key={step.num}
            step={step}
            index={index}
            total={steps.length}
          />
        ))}
      </div>
    </section>
  );
}
