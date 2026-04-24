'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ServiceContactCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  });

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        borderBottom: '1px solid #d0d0c8',
        background: '#f5f5f0',
      }}
      className="max-sm:!grid-cols-1"
    >
      {/* LEFT MAIN CTA */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
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
          Let&apos;s Talk
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(40px, 6vw, 88px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            marginBottom: '48px',
            color: '#0a0a0a',
          }}
        >
          Start your
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 400 }}>project.</em>
        </h2>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2"
            style={{
              background: '#0a0a0a',
              color: '#f5f5f0',
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '18px 40px',
              border: '1px solid #0a0a0a',
            }}
          >
            Meet the Team
            <ArrowRight size={14} />
          </Link>

          <a
            href="tel:+916306450212"
            className="inline-flex items-center gap-2"
            style={{
              background: '#0a0a0a',
              color: '#f5f5f0',
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '18px 40px',
              border: '1px solid #0a0a0a',
            }}
          >
            Call Now
            <ArrowRight size={14} />
          </a>
        </div>
      </motion.div>

      {/* RIGHT ASIDE */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          delay: 0.1,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          padding: '100px 52px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        className="max-sm:!px-6 max-sm:!py-16"
      >
        <div
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#aaaaaa',
            marginBottom: '32px',
          }}
        >
          Based In
        </div>

        <div
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            lineHeight: 2.5,
            textTransform: 'uppercase',
            color: '#aaaaaa',
          }}
        >
          Indrapuram, Ghaziabad
          <br />
          Uttar Pradesh, India
          <br />
          <br />
          <a
            href="tel:+916306450212"
            style={{
              color: '#aaaaaa',
              textDecoration: 'none',
            }}
          >
            +91 63064 50212
          </a>
          <br />
          <a
            href="tel:+918802130983"
            style={{
              color: '#aaaaaa',
              textDecoration: 'none',
            }}
          >
            +91 88021 30983
          </a>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            lineHeight: 2.5,
            textTransform: 'uppercase',
            color: '#aaaaaa',
            marginTop: '32px',
          }}
        >
          Serving all 28 states
          <br />
          of India, remotely.
        </div>
      </motion.div>
    </section>
  );
}
