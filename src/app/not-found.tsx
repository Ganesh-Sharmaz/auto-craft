'use client';

import Link from 'next/link';
import { motion, easeInOut } from 'framer-motion';

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

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '160px 60px 80px',
        borderBottom: '1px solid #d0d0c8',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="max-sm:!px-6 max-sm:!pt-[120px] max-sm:!pb-[60px] bg-[#f5f5f0]"
      aria-label="404 — Page Not Found"
    >
      {/* Animated background watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(140px, 28vw, 380px)',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '1px #e0e0d8',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          animation: 'floatBg 8s ease-in-out infinite',
        }}
      >
        404
      </div>

      {/* Thin diagonal rule — decorative */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: '120px',
          width: '1px',
          height: '100%',
          background: '#d0d0c8',
          opacity: 0.5,
        }}
      />

      <style>{`
        @keyframes floatBg {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -52%) scale(1.01); }
        }
      `}</style>

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
        Error 404 &nbsp;·&nbsp; Auto Craft &nbsp;·&nbsp; Page Not Found
      </motion.p>

      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="z-50"
        style={{
          fontFamily: 'var(--font-playfair)',
          fontWeight: 900,
          fontSize: 'clamp(52px, 9vw, 130px)',
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          maxWidth: '900px',
          color: '#0a0a0a',
        }}
      >
        Lost in
        <br />
        <em style={{ fontStyle: 'italic', fontWeight: 400 }}>The Void,</em>
        <br />
        Are We?
      </motion.h1>

      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: '64px',
        }}
        className="max-sm:!flex-col max-sm:!items-start max-sm:!gap-7"
      >
        <p
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            lineHeight: 1.9,
            color: '#aaaaaa',
            textTransform: 'uppercase',
            maxWidth: '280px',
          }}
        >
          The page you were looking for
          <br />
          doesn&apos;t exist or has been moved.
          <br />
          Let&apos;s get you back on track.
        </p>

        <div
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          className="max-sm:!flex-col max-sm:!items-start"
        >
          {/* Ghost / secondary button */}
          <Link
            href="/"
            style={{
              display: 'inline-block',
              background: 'transparent',
              color: '#0a0a0a',
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '18px 40px',
              border: '1px solid #0a0a0a',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = '#0a0a0a';
              el.style.color = '#f5f5f0';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = 'transparent';
              el.style.color = '#0a0a0a';
            }}
          >
            Back to Home
          </Link>

          {/* Primary / filled button */}
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              background: '#0a0a0a',
              color: '#f5f5f0',
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '18px 40px',
              border: '1px solid #0a0a0a',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = '#f5f5f0';
              el.style.color = '#0a0a0a';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = '#0a0a0a';
              el.style.color = '#f5f5f0';
            }}
          >
            Start a Project
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
