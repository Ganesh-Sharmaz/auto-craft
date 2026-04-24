'use client';

import { easeInOut, motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.15,
      duration: 0.8,
      ease: easeInOut,
    },
  }),
};

export default function PricingHero() {
  return (
    <section
      style={{
        padding: '160px 60px 80px',
        borderBottom: '1px solid #d0d0c8',
        position: 'relative',
        overflow: 'hidden',
        background: '#0a0a0a',
        color: '#f5f5f0',
      }}
      className="max-sm:!px-6 max-sm:!pt-[120px] max-sm:!pb-[60px]"
    >
      {/* Background Watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(60px, 13vw, 180px)',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '1px #1a1a1a',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        PRICING
      </div>

      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#555',
          marginBottom: '32px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        Investment · Transparency · No Surprises
      </motion.p>

      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(48px, 8vw, 110px)',
          fontWeight: 900,
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          maxWidth: '800px',
          color: '#f5f5f0',
          position: 'relative',
          zIndex: 10,
        }}
      >
        Honest
        <br />
        <em style={{ fontStyle: 'italic', fontWeight: 400 }}>pricing,</em>
        <br />
        always.
      </motion.h1>

      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.1em',
          lineHeight: 1.9,
          color: '#555',
          textTransform: 'uppercase',
          maxWidth: '360px',
          marginTop: '48px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        Three tiers. Clear scope.
        <br />
        No hidden costs.
        <br />
        Every number here is a
        <br />
        starting point — not a wall.
      </motion.p>
    </section>
  );
}
