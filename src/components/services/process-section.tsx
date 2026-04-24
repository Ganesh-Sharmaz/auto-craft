'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const processSteps = [
  {
    num: '01',
    title: 'Discovery Call',
    desc: 'One call. We understand your business, goals, budget, and timeline. No fluff. No sales pitch. Just the facts we need to plan right.',
  },
  {
    num: '02',
    title: 'Proposal & Scope',
    desc: "A clear document: what we'll build, how long it'll take, what it costs. No surprises. No scope creep. A plan you can sign off on confidently.",
  },
  {
    num: '03',
    title: 'Design & Build',
    desc: 'We build in sprints with regular check-ins. You see progress every week. You give feedback. We implement it. Repeat until perfect.',
  },
  {
    num: '04',
    title: 'QA & Launch',
    desc: 'Thorough testing across devices, browsers, and edge cases. Then a clean, zero-downtime launch with full monitoring in place from day one.',
  },
  {
    num: '05',
    title: 'Support & Scale',
    desc: "We don't disappear after launch. Retainer options available for ongoing development, maintenance, and growth features as your business scales.",
  },
];

function ProcessStep({
  step,
  index,
}: Readonly<{
  step: (typeof processSteps)[0];
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
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        padding: index === 0 ? '40px 32px 40px 0px' : '40px 32px 40px 32px',
        borderRight:
          index < processSteps.length - 1 ? '1px solid #d0d0c8' : 'none',
      }}
      className="max-sm:!border-r-0 max-sm:!border-b max-sm:!border-[#d0d0c8] max-sm:!py-8 max-sm:!pr-0 last:max-sm:!border-b-0"
    >
      <div
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.5rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#aaaaaa',
          marginBottom: '20px',
        }}
      >
        {step.num}
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(16px, 1.8vw, 24px)',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: '16px',
          color: '#0a0a0a',
        }}
      >
        {step.title}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.5rem',
          letterSpacing: '0.1em',
          lineHeight: 2,
          textTransform: 'uppercase',
          color: '#aaaaaa',
        }}
      >
        {step.desc}
      </p>
    </motion.div>
  );
}

export default function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  });

  return (
    <section
      style={{
        padding: '100px 60px',
        borderBottom: '1px solid #d0d0c8',
        background: '#f5f5f0',
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
            color: '#aaaaaa',
            marginBottom: '48px',
          }}
        >
          How We Work
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(30px, 4vw, 56px)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            marginBottom: '64px',
            color: '#0a0a0a',
          }}
        >
          From brief to
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 400 }}>
            live product.
          </em>
        </h2>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '0',
        }}
        className="max-sm:!grid-cols-1"
      >
        {processSteps.map((step, index) => (
          <ProcessStep key={step.num} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}
