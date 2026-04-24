'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const taglines = [
  {
    quote: [
      'Built lean.',
      <em
        key="e"
        style={{
          fontStyle: 'italic',
          fontWeight: 400,
        }}
      >
        Delivered clean.
      </em>,
    ],
    attr: 'On Quality',
  },
  {
    quote: [
      'Your vision,',
      <em
        key="e"
        style={{
          fontStyle: 'italic',
          fontWeight: 400,
        }}
      >
        our obsession.
      </em>,
    ],
    attr: 'On Partnership',
  },
  {
    quote: [
      "We don't do",
      <em
        key="e"
        style={{
          fontStyle: 'italic',
          fontWeight: 400,
        }}
      >
        good enough.
      </em>,
    ],
    attr: 'On Standards',
  },
  {
    quote: [
      'Automate the',
      <em
        key="e"
        style={{
          fontStyle: 'italic',
          fontWeight: 400,
        }}
      >
        ordinary. Own
      </em>,
      'the extraordinary.',
    ],
    attr: 'On AI',
  },
];

export default function Taglines() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  });

  return (
    <section
      ref={ref}
      style={{
        background: '#0a0a0a',
        color: '#f5f5f0',
        padding: '120px 60px',
        borderBottom: '1px solid #222',
      }}
      className="max-sm:!py-20 max-sm:!px-6"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 0,
        }}
        className="max-sm:!grid-cols-1"
      >
        {taglines.map((t, i) => {
          const isEven = i % 2 === 0;
          const isLastRow = i >= taglines.length - 2;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                paddingTop: '56px',
                paddingBottom: '56px',
                borderBottom: isLastRow ? 'none' : '1px solid #1e1e1e',
                borderRight: isEven ? '1px solid #1e1e1e' : 'none',
                paddingRight: isEven ? '56px' : '0',
                paddingLeft: isEven ? '0' : '56px',
              }}
              className="
                max-sm:!border-r-0
                max-sm:!pl-0
                max-sm:!pr-0
              "
            >
              <div
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(22px, 2.5vw, 38px)',
                  fontWeight: 900,
                  lineHeight: 1.15,
                  marginBottom: '20px',
                  color: '#f5f5f0',
                }}
              >
                {t.quote.map((part, j) => (
                  <span key={j}>
                    {j > 0 && <br />}
                    {part}
                  </span>
                ))}
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#555',
                }}
              >
                {t.attr}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
