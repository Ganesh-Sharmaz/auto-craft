'use client';

import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Check, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

// ─── Context ────────────────────────────────────────────────────────────────

interface ContactModalContextType {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const ContactModalContext = createContext<ContactModalContextType>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export function useContactModal() {
  return useContext(ContactModalContext);
}

// ─── Services ────────────────────────────────────────────────────────────────

const SERVICES = [
  'SaaS Product Development',
  'AI & Workflow Automation',
  'Web Presence & SEO',
  'Full-Stack Engineering',
  "Not sure — let's talk",
];

// ─── Shared styles ───────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-geist-mono)',
  fontSize: '0.5rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: '#aaaaaa',
  paddingTop: '16px',
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
  padding: '6px 0 16px',
  width: '100%',
};

// ─── Service Dropdown ────────────────────────────────────────────────────────

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
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
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
          padding: '6px 0 16px',
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
              left: '-24px',
              right: '-24px',
              background: '#0a0a0a',
              zIndex: 100,
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
                  padding: '16px 24px',
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

// ─── Modal Inner Form ─────────────────────────────────────────────────────────

function ModalForm({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [service, setService] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const name = (
      form.elements.namedItem('name') as HTMLInputElement
    ).value.trim();
    const email = (
      form.elements.namedItem('email') as HTMLInputElement
    ).value.trim();
    const company = (
      form.elements.namedItem('company') as HTMLInputElement
    ).value.trim();
    const phone = (
      form.elements.namedItem('phone') as HTMLInputElement
    ).value.trim();
    const brief = (
      form.elements.namedItem('brief') as HTMLTextAreaElement
    ).value.trim();

    if (!name || !email) {
      setError('Name & email required');
      setTimeout(() => setError(''), 4000);
      return;
    }
    if (!service) {
      setError('Select a service');
      setTimeout(() => setError(''), 4000);
      return;
    }

    try {
      const serviceID = process.env.NEXT_PUBLIC_MAIL_SERVICE_ID!;
      const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_MAIL_PUBLIC_KEY!;

      await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: name,
          from_email: 'ganesh.sharma.work@yopmail.com',
          reply_to: email,
          to_name: 'AutoCraft Team',
          message: `Service: ${service}\nCompany: ${company}\nPhone: ${phone}\n\nProject Brief:\n${brief}`,
        },
        publicKey,
      );

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setService('');
        formRef.current?.reset();
        onClose();
      }, 3500);
    } catch (err) {
      console.error(err);
      setError('Failed to send');
      setTimeout(() => setError(''), 4000);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        /* SUCCESS */
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding: '64px 52px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            minHeight: '320px',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.5rem',
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
              fontSize: 'clamp(36px, 5vw, 64px)',
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
              fontSize: '0.5rem',
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
        /* FORM */
        <motion.form
          key="form"
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ padding: '0 52px 40px' }}
          className="max-sm:!px-6"
        >
          {/* Name + Company */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0 40px',
              borderBottom: '1px solid #d0d0c8',
            }}
            className="max-sm:!grid-cols-1 max-sm:!gap-0"
          >
            <div>
              <label style={labelStyle}>Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your full name"
                style={inputStyle}
              />
            </div>
            <div>
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
              gap: '0 40px',
              borderBottom: '1px solid #d0d0c8',
            }}
            className="max-sm:!grid-cols-1 max-sm:!gap-0"
          >
            <div>
              <label style={labelStyle}>Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@company.com"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <input
                name="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Service */}
          <div style={{ borderBottom: '1px solid #d0d0c8' }}>
            <label style={labelStyle}>Service</label>
            <ServiceDropdown value={service} onChange={setService} />
            <input type="hidden" name="selected_service" value={service} />
          </div>

          {/* Brief */}
          <div>
            <label style={labelStyle}>Brief</label>
            <textarea
              name="brief"
              placeholder="Tell us what you're building or what problem you need solved..."
              rows={3}
              style={{
                ...inputStyle,
                resize: 'none',
                lineHeight: 1.9,
                paddingBottom: '16px',
              }}
            />
          </div>

          {/* Submit */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '28px',
              borderTop: '1px solid #d0d0c8',
            }}
            className="max-sm:!flex-col max-sm:!items-start max-sm:!gap-5"
          >
            <span
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.5rem',
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
                padding: '16px 36px',
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
                  {' '}
                  Send Message <ArrowRight size={12} />
                </>
              )}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

// ─── Modal Shell ──────────────────────────────────────────────────────────────

function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        /* Single container: backdrop + flex centering */
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 10, 10, 0.72)',
            zIndex: 9998,
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          {/* Panel — stop click propagation so clicking inside doesn't close */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(720px, 100%)',
              maxHeight: '90vh',
              background: '#f5f5f0',
              zIndex: 9999,
              overflowY: 'auto',
              scrollbarWidth: 'none',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '40px 52px 32px',
                borderBottom: '1px solid #d0d0c8',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                background: '#f5f5f0',
                zIndex: 10,
              }}
              className="max-sm:!px-6 max-sm:!pt-8 max-sm:!pb-6"
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#aaaaaa',
                    marginBottom: '16px',
                  }}
                >
                  Quick Connect · Auto Craft
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontWeight: 900,
                    fontSize: 'clamp(28px, 4vw, 48px)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    color: '#0a0a0a',
                    margin: 0,
                  }}
                >
                  Let&apos;s build
                  <br />
                  <em style={{ fontStyle: 'italic', fontWeight: 400 }}>
                    something real.
                  </em>
                </h2>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                style={{
                  background: 'transparent',
                  border: '1px solid #d0d0c8',
                  cursor: 'pointer',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#aaaaaa',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                  marginLeft: '24px',
                  marginBottom: '4px',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = '#0a0a0a';
                  el.style.borderColor = '#0a0a0a';
                  el.style.color = '#f5f5f0';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = 'transparent';
                  el.style.borderColor = '#d0d0c8';
                  el.style.color = '#aaaaaa';
                }}
                aria-label="Close"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>

            {/* Form body */}
            <div style={{ paddingTop: '32px' }}>
              <ModalForm onClose={onClose} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ContactModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <ContactModalContext.Provider value={{ open, close, isOpen }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={close} />
    </ContactModalContext.Provider>
  );
}
