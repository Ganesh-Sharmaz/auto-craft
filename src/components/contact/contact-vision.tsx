'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const visions = [
  {
    num: '01 / Vision',
    title: ["India's Most", 'Trusted', 'Tech Agency'],
    titleItalic: 'Trusted',
    desc: 'To become the go-to engineering partner for startups and enterprises across all 28 states — known not for size, but for the quality of every single delivery.',
  },
  {
    num: '02 / Vision',
    title: ['AI That Works', 'For Everyone'],
    titleItalic: 'For Everyone',
    desc: 'To democratize AI automation for Indian businesses — from solo founders in Lucknow to enterprises in Bangalore — making intelligent software accessible at every scale.',
  },
  {
    num: '03 / Vision',
    title: ['Products That', 'Outlast Us'],
    titleItalic: 'Outlast Us',
    desc: 'To ship software that compounds in value over years — not months. We measure success by how well our products perform five years after launch, not five weeks.',
  },
];

function VisionItem({
  vision,
  index,
}: {
  vision: (typeof visions)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        padding: '40px 0',
        borderRight: index < visions.length - 1 ? '1px solid #1e1e1e' : 'none',
        paddingRight: index < visions.length - 1 ? '48px' : '0',
        paddingLeft: index > 0 ? '48px' : '0',
      }}
      className="max-sm:!border-r-0 max-sm:!border-b max-sm:!border-[#1e1e1e] max-sm:!px-0 last:max-sm:!border-b-0"
    >
      <div
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.5rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#555',
          marginBottom: '20px',
        }}
      >
        {vision.num}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(20px, 2.5vw, 32px)',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: '16px',
          color: '#f5f5f0',
        }}
      >
        {vision.title.map((line, i) =>
          line === vision.titleItalic ? (
            <em
              key={i}
              style={{ fontStyle: 'italic', fontWeight: 400, display: 'block' }}
            >
              {line}
            </em>
          ) : (
            <span key={i} style={{ display: 'block' }}>
              {line}
            </span>
          ),
        )}
      </div>

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
        {vision.desc}
      </p>
    </motion.div>
  );
}

export default function ContactVision() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      style={{
        padding: '120px 60px',
        borderBottom: '1px solid #d0d0c8',
        background: '#0a0a0a',
        color: '#f5f5f0',
      }}
      className="max-sm:!px-6 max-sm:!py-20"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#555',
            marginBottom: '48px',
          }}
        >
          What We&apos;re Building Toward
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '64px',
            color: '#f5f5f0',
          }}
        >
          The future we&apos;re
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 400 }}>
            working to create.
          </em>
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
        {visions.map((vision, index) => (
          <VisionItem key={index} vision={vision} index={index} />
        ))}
      </div>
    </section>
  );
}
