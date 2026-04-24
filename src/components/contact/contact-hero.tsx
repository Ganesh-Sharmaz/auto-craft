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

export default function ContactHero() {
  return (
    <section
      style={{
        padding: '160px 60px 80px',
        borderBottom: '1px solid #d0d0c8',
        position: 'relative',
        overflow: 'hidden',
        background: '#f5f5f0',
      }}
      className="max-sm:!px-6 max-sm:!pt-[120px] max-sm:!pb-[60px]"
    >
      {/* Background watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(100px, 18vw, 240px)',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '1px #e8e8e2',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        CONTACT
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
          color: '#aaaaaa',
          marginBottom: '32px',
        }}
      >
        The People Behind The Work
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
          color: '#0a0a0a',
          position: 'relative',
          zIndex: 10,
        }}
      >
        Meet the
        <br />
        <em style={{ fontStyle: 'italic', fontWeight: 400 }}>Builders.</em>
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
          color: '#aaaaaa',
          textTransform: 'uppercase',
          maxWidth: '340px',
          marginTop: '48px',
        }}
      >
        Two engineers. One mission.
        <br />
        Building the future of software
        <br />
        from Ghaziabad, India.
      </motion.p>
    </section>
  );
}
