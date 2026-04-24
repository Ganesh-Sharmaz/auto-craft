'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const lines = [
  {
    num: 'I.',
    text: "We don't chase vanity metrics. We chase outcomes that matter to real people.",
  },
  {
    num: 'II.',
    text: 'Every line of code is a promise. We keep them all.',
  },
  {
    num: 'III.',
    text: 'Small teams, sharp minds, zero compromises.',
  },
  {
    num: 'IV.',
    text: 'We build for the long run, not the next funding round.',
  },
];

export default function Manifesto() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: '-100px',
  });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: '140px 60px',
        borderBottom: '1px solid #d0d0c8',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '80px',
        alignItems: 'start',
        background: '#f5f5f0',
      }}
      className="max-sm:!grid-cols-1 max-sm:!gap-8 max-sm:!py-20 max-sm:!px-6"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#aaaaaa',
          paddingTop: '12px',
        }}
      >
        Our Way
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '48px',
            color: '#0a0a0a',
          }}
        >
          We work to win
          <br />
          <em
            style={{
              fontStyle: 'italic',
              fontWeight: 400,
            }}
          >
            hearts,
          </em>
          <br />
          not big banks.
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '20px',
                borderTop: '1px solid #d0d0c8',
                paddingTop: '20px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.2em',
                  color: '#aaaaaa',
                  minWidth: '28px',
                  textTransform: 'uppercase',
                }}
              >
                {line.num}
              </span>

              <span
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  lineHeight: 2,
                  textTransform: 'uppercase',
                  color: '#aaaaaa',
                }}
              >
                {line.text}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
