'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <footer
      ref={ref}
      style={{
        background: '#0a0a0a',
        color: '#f5f5f0',
        padding: '60px 60px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
      className="max-sm:flex-col max-sm:items-start max-sm:gap-10 max-sm:!px-6 max-sm:!pt-12 max-sm:!pb-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 900,
            fontSize: 'clamp(36px, 5vw, 72px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            textDecoration: 'none',
            color: '#f5f5f0',
            display: 'block',
          }}
        >
          Auto<em style={{ fontStyle: 'italic', fontWeight: 400 }}>Craft</em>
        </Link>
        <div
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#555',
            marginTop: '16px',
          }}
        >
          We build what moves. — Indrapuram, Ghaziabad.
        </div>
        <nav style={{ display: 'flex', gap: '32px', marginTop: '20px' }}>
          {[
            { href: '/services', label: 'Services' },
            { href: '/#about', label: 'About' },
            { href: '/#team', label: 'Team' },
            { href: '/contact', label: 'Contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.5rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#444',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#aaaaaa')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#444')}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </motion.div>

      <motion.div
        className="max-sm:text-left"
        style={{ textAlign: 'right' }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <div
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#444',
            lineHeight: 2.2,
          }}
        >
          SaaS · AI Automations · Websites
          <br />
          © 2025 Auto Craft
          <br />
          All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
}
