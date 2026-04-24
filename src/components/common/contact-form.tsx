'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Check } from 'lucide-react';

const SERVICES = [
  'SaaS Product Development',
  'AI & Workflow Automation',
  'Web Presence & SEO',
  'Full-Stack Engineering',
  "Not sure — let's talk",
];

function ServiceDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.05em',
          color: value ? '#0a0a0a' : '#cccccc',
          padding: '6px 0 18px',
          textAlign: 'left',
        }}
      >
        {value || 'Select what you need'}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', color: '#aaaaaa', flexShrink: 0 }}
        >
          <ChevronDown size={12} strokeWidth={1.5} />
        </motion.span>
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: 'calc(100% - 8px)',
              left: '-60px',
              right: '-52px',
              background: '#0a0a0a',
              zIndex: 50,
              borderTop: '1px solid #1a1a1a',
            }}
          >
            {SERVICES.map((service, i) => (
              <button
                key={service}
                type="button"
                onClick={() => {
                  onChange(service);
                  setOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'transparent',
                  border: 'none',
                  borderBottom:
                    i < SERVICES.length - 1 ? '1px solid #1a1a1a' : 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: value === service ? '#f5f5f0' : '#555',
                  padding: '18px 52px 18px 60px',
                  textAlign: 'left',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    '#f5f5f0';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    value === service ? '#f5f5f0' : '#555';
                }}
              >
                {service}
                {value === service && (
                  <Check
                    size={10}
                    strokeWidth={2}
                    style={{ color: '#f5f5f0', flexShrink: 0 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [service, setService] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (
      form.elements.namedItem('name') as HTMLInputElement
    ).value.trim();
    const email = (
      form.elements.namedItem('email') as HTMLInputElement
    ).value.trim();

    if (!name || !email) {
      setError('Name & email required');
      setTimeout(() => setError(''), 4000);
      return;
    }

    setSubmitted(true);

    // Reset back to form after 4 seconds
    setTimeout(() => {
      setSubmitted(false);
      setService('');
      formRef.current?.reset();
    }, 4000);
  };

  return (
    <section
      ref={ref}
      style={{
        background: '#f5f5f0',
      }}
    >
      {/* TOP HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          padding: '100px 60px 64px',
          borderBottom: '1px solid #d0d0c8',
        }}
        className="max-sm:!px-6 max-sm:!pt-16 max-sm:!pb-10"
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
          Quick Connect · Auto Craft · Indrapuram, Ghaziabad
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 900,
            fontSize: 'clamp(40px, 6vw, 88px)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: '#0a0a0a',
          }}
        >
          Let&apos;s build
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 400 }}>
            something real.
          </em>
        </h2>
      </motion.div>

      {/* BODY — animated between form and success */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          {submitted ? (
            /* SUCCESS STATE */
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: '100px 60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '24px',
              }}
              className="max-sm:!px-6 max-sm:!py-16"
            >
              <div
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#aaaaaa',
                }}
              >
                Received
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontWeight: 900,
                  fontSize: 'clamp(36px, 5vw, 72px)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.02em',
                  color: '#0a0a0a',
                }}
              >
                We&apos;ll be in
                <br />
                <em style={{ fontStyle: 'italic', fontWeight: 400 }}>
                  touch soon.
                </em>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#aaaaaa',
                  lineHeight: 2,
                }}
              >
                Expect a reply within 24 hours.
              </p>
            </motion.div>
          ) : (
            /* FORM + INFO GRID */
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
              }}
              className="max-sm:!grid-cols-1"
            >
              {/* FORM SIDE */}
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  padding: '64px 60px',
                  borderRight: '1px solid #d0d0c8',
                }}
                className="max-sm:!px-6 max-sm:!py-10 max-sm:!border-r-0 max-sm:!border-b max-sm:!border-[#d0d0c8]"
              >
                {/* Name + Company */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    borderBottom: '1px solid #d0d0c8',
                  }}
                >
                  <div style={{ paddingRight: '40px' }}>
                    <label style={labelStyle}>Name</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ paddingLeft: '40px' }}>
                    <label style={labelStyle}>Company</label>
                    <input
                      name="company"
                      type="text"
                      placeholder="Startup / firm"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    borderBottom: '1px solid #d0d0c8',
                  }}
                >
                  <div style={{ paddingRight: '40px' }}>
                    <label style={labelStyle}>Email</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ paddingLeft: '40px' }}>
                    <label style={labelStyle}>Phone</label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Service — custom dropdown */}
                <div style={{ borderBottom: '1px solid #d0d0c8' }}>
                  <label style={labelStyle}>Service</label>
                  <ServiceDropdown value={service} onChange={setService} />
                </div>

                {/* Brief */}
                <div>
                  <label style={labelStyle}>Brief</label>
                  <textarea
                    name="brief"
                    placeholder="Tell us what you're building or what problem you need solved..."
                    rows={4}
                    style={{
                      ...inputStyle,
                      resize: 'none',
                      lineHeight: 1.9,
                      paddingBottom: '20px',
                    }}
                  />
                </div>

                {/* Submit Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '32px',
                    borderTop: '1px solid #d0d0c8',
                  }}
                  className="max-sm:!flex-col max-sm:!items-start max-sm:!gap-6"
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#aaaaaa',
                    }}
                  >
                    We respond within 24h
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2"
                    style={{
                      background: error ? '#c0392b' : '#0a0a0a',
                      color: '#f5f5f0',
                      border: `1px solid ${error ? '#c0392b' : '#0a0a0a'}`,
                      fontFamily: 'var(--font-geist-mono)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      padding: '18px 40px',
                      cursor: 'pointer',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (!error) {
                        const el = e.currentTarget;
                        el.style.background = '#f5f5f0';
                        el.style.color = '#0a0a0a';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!error) {
                        const el = e.currentTarget;
                        el.style.background = '#0a0a0a';
                        el.style.color = '#f5f5f0';
                      }
                    }}
                  >
                    {error ? (
                      error
                    ) : (
                      <>
                        Send Message <ArrowRight size={12} />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>

              {/* INFO SIDE */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.15,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  padding: '64px 52px',
                  background: '#0a0a0a',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                className="max-sm:!px-6 max-sm:!py-10"
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: '#444',
                      marginBottom: '40px',
                    }}
                  >
                    Headquarters
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontWeight: 900,
                      fontSize: 'clamp(36px, 4vw, 56px)',
                      lineHeight: 0.95,
                      color: '#f5f5f0',
                      marginBottom: '40px',
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

                  <div
                    style={{
                      width: '40px',
                      height: '1px',
                      background: '#2a2a2a',
                      marginBottom: '32px',
                    }}
                  />

                  <address
                    style={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#555',
                      lineHeight: 2.4,
                      fontStyle: 'normal',
                    }}
                  >
                    Indrapuram, Ghaziabad
                    <br />
                    Uttar Pradesh, India
                    <br />
                    <br />
                    Dharmendra —{' '}
                    <a
                      href="tel:+916306450212"
                      style={{
                        color: '#555',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          '#f5f5f0';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          '#555';
                      }}
                    >
                      6306450212
                    </a>
                    <br />
                    Ganesh —{' '}
                    <a
                      href="tel:+918802130983"
                      style={{
                        color: '#555',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          '#f5f5f0';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          '#555';
                      }}
                    >
                      8802130983
                    </a>
                  </address>
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#333',
                      marginBottom: '20px',
                    }}
                  >
                    Serving all 28 states of India, remotely.
                  </div>

                  <div
                    style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
                  >
                    {['SaaS', 'AI', 'Web', 'Automation'].map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: 'var(--font-geist-mono)',
                          fontSize: '0.5rem',
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: '#444',
                          border: '1px solid #2a2a2a',
                          padding: '6px 14px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-geist-mono)',
  fontSize: '0.5rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: '#aaaaaa',
  paddingTop: '18px',
  paddingBottom: '6px',
};

const inputStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  outline: 'none',
  fontFamily: 'var(--font-geist-mono)',
  fontSize: '0.65rem',
  letterSpacing: '0.05em',
  color: '#0a0a0a',
  padding: '6px 0 18px',
  width: '100%',
};
