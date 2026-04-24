'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Location() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  });

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        borderBottom: '1px solid #d0d0c8',
        background: '#f5f5f0',
      }}
      className="max-sm:!grid-cols-1"
    >
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          padding: '100px 60px',
          borderRight: '1px solid #d0d0c8',
        }}
        className="max-sm:!border-r-0 max-sm:!border-b max-sm:!border-[#d0d0c8] max-sm:!p-[60px_24px]"
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
          Headquarters
        </div>

        <div
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(56px, 9vw, 120px)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            color: '#0a0a0a',
          }}
        >
          Indra
          <em
            style={{
              fontStyle: 'italic',
              fontWeight: 400,
              display: 'block',
            }}
          >
            puram.
          </em>
        </div>

        <address
          style={{
            marginTop: '48px',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#aaaaaa',
            lineHeight: 2.2,
            fontStyle: 'normal',
          }}
        >
          Indrapuram, Ghaziabad
          <br />
          Uttar Pradesh, India
          <br />
          <br />
          dharmendra —{' '}
          <a
            href="tel:+916306450212"
            style={{
              color: '#aaaaaa',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = '#0a0a0a';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = '#aaaaaa';
            }}
          >
            6306450212
          </a>
          <br />
          ganesh —{' '}
          <a
            href="tel:+918802130983"
            style={{
              color: '#aaaaaa',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = '#0a0a0a';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = '#aaaaaa';
            }}
          >
            8802130983
          </a>
        </address>
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          padding: '100px 52px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        className="max-sm:!p-[60px_24px]"
      >
        <div
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#aaaaaa',
          }}
        >
          Ready?
        </div>

        <div
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(22px, 2.8vw, 40px)',
            fontWeight: 900,
            lineHeight: 1.15,
            color: '#0a0a0a',
          }}
        >
          Let&apos;s build something
          <br />
          <em
            style={{
              fontStyle: 'italic',
              fontWeight: 400,
            }}
          >
            worth talking about.
          </em>
        </div>

        <Link
          href="/contact"
          style={{
            display: 'inline-block',
            border: '1px solid #0a0a0a',
            padding: '16px 32px',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            color: '#0a0a0a',
            transition: 'background 0.2s ease, color 0.2s ease',
            alignSelf: 'flex-start',
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
          Get in Touch →
        </Link>
      </motion.div>
    </section>
  );
}
