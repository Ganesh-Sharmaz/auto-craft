'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

export function CallBtn({
  href,
  children,
  primary = true,
}: Readonly<{
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}>) {
  return (
    <a
      href={href}
      className="items-center justify-center gap-2"
      style={{
        display: 'flex',
        background: primary ? '#0a0a0a' : 'transparent',
        color: primary ? '#f5f5f0' : '#0a0a0a',
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        padding: '18px 40px',
        border: primary ? '1px solid #0a0a0a' : '1px solid #d0d0c8',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        if (primary) {
          el.style.background = '#f5f5f0';
          el.style.color = '#0a0a0a';
        } else {
          el.style.borderColor = '#0a0a0a';
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        if (primary) {
          el.style.background = '#0a0a0a';
          el.style.color = '#f5f5f0';
        } else {
          el.style.borderColor = '#d0d0c8';
        }
      }}
    >
      {children}
    </a>
  );
}

export default function ContactCTA() {
  const mainRef = useRef(null);
  const asideRef = useRef(null);
  const mainInView = useInView(mainRef, { once: true, margin: '-60px' });
  const asideInView = useInView(asideRef, { once: true, margin: '-60px' });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        borderBottom: '1px solid #d0d0c8',
      }}
      className="max-sm:!grid-cols-1"
    >
      {/* Main CTA */}
      <motion.div
        ref={mainRef}
        initial={{ opacity: 0, y: 30 }}
        animate={mainInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          padding: '100px 60px',
          borderRight: '1px solid #d0d0c8',
          background: '#f5f5f0',
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
            marginBottom: '40px',
          }}
        >
          Start Something
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
          Ready to
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 400 }}>build?</em>
        </h2>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <CallBtn href="tel:+916306450212">
            Call Dharmendra <ArrowRight className="h-2.5 w-2.5 font-semibold" />
          </CallBtn>
          <CallBtn href="tel:+918802130983">
            <span>Call Ganesh</span>{' '}
            <ArrowRight className="h-2.5 w-2.5 font-semibold" />
          </CallBtn>
          <CallBtn href="/services" primary={false}>
            View Services
          </CallBtn>
        </div>
      </motion.div>

      {/* Aside */}
      <motion.div
        ref={asideRef}
        initial={{ opacity: 0, y: 30 }}
        animate={asideInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          padding: '100px 52px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f5f5f0',
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
          Reach Us
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
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = '#0a0a0a')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = '#aaaaaa')
            }
          >
            +91 63064 50212
          </a>
          <br />
          <a
            href="tel:+918802130983"
            style={{
              color: '#aaaaaa',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = '#0a0a0a')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = '#aaaaaa')
            }
          >
            +91 88021 30983
          </a>
          <br />
          <br />
          <a
            href="mailto:yaduvanshi.dhanno@gmail.com"
            style={{
              color: '#aaaaaa',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = '#0a0a0a')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = '#aaaaaa')
            }
          >
            yaduvanshi.dhanno@gmail.com
          </a>
          <br />
          <a
            href="mailto:ganesh.sharma.work@gmail.com"
            style={{
              color: '#aaaaaa',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = '#0a0a0a')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = '#aaaaaa')
            }
          >
            ganesh.sharma.work@gmail.com
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
            marginTop: '24px',
          }}
        >
          Serving all 28 states
          <br />
          of India.
        </div>
      </motion.div>
    </div>
  );
}
