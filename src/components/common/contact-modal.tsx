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

// ─── Mobile scroll helper ────────────────────────────────────────────────────
// Scrolls targetRef into view inside the modal panel.
// Only fires on mobile (max-width: 639px) — desktop is untouched.

function scrollToRef(
  targetRef: React.RefObject<HTMLElement | null>,
  panelRef: React.RefObject<HTMLElement | null>,
) {
  if (typeof window === 'undefined') return;
  if (!window.matchMedia('(max-width: 639px)').matches) return;

  const target = targetRef.current;
  const panel = panelRef.current;
  if (!target || !panel) return;

  // 120 ms delay so the soft keyboard has time to appear and resize the viewport
  setTimeout(() => {
    const panelRect = panel.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const offset = targetRect.top - panelRect.top - 16; // 16 px breathing room above target
    panel.scrollBy({ top: offset, behavior: 'smooth' });
  }, 120);
}

// ─── Service Dropdown ────────────────────────────────────────────────────────

function ServiceDropdown({
  value,
  onChange,
  panelRef,
  submitRef,
}: {
  value: string;
  onChange: (val: string) => void;
  panelRef: React.RefObject<HTMLElement | null>;
  submitRef: React.RefObject<HTMLElement | null>;
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

  const handleSelect = (service: string) => {
    onChange(service);
    setOpen(false);
    // After selecting a service scroll the brief/submit row into view
    scrollToRef(submitRef, panelRef);
  };

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
              left: 0,
              right: 0,
              background: '#0a0a0a',
              zIndex: 100,
              borderTop: '1px solid #1a1a1a',
            }}
          >
            {SERVICES.map((service, i) => (
              <button
                key={service}
                type="button"
                onClick={() => handleSelect(service)}
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
                  padding: '16px 18px',
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

function ModalForm({
  onClose,
  panelRef,
}: {
  onClose: () => void;
  panelRef: React.RefObject<HTMLElement | null>;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [service, setService] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  // Scroll target refs — one per logical row
  const emailRowRef = useRef<HTMLDivElement>(null);
  const serviceRowRef = useRef<HTMLDivElement>(null);
  const briefRowRef = useRef<HTMLDivElement>(null);
  const submitRowRef = useRef<HTMLDivElement>(null);

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
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            minHeight: '320px',
            justifyContent: 'center',
          }}
          className="px-5 py-16 sm:px-[52px]"
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
          className="px-5 pb-8 sm:px-[52px] sm:pb-10"
        >
          {/* ── Row 1: Name + Company ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10 border-b border-[#d0d0c8]">
            <div>
              <label style={labelStyle}>Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your full name"
                style={inputStyle}
              />
            </div>
            <div className="border-t border-[#d0d0c8] sm:border-t-0">
              <label style={labelStyle}>Company</label>
              <input
                name="company"
                type="text"
                placeholder="Startup / firm"
                style={inputStyle}
                onBlur={(e) => {
                  // Scroll email row into view only when company is filled
                  if (e.target.value.trim()) scrollToRef(emailRowRef, panelRef);
                }}
              />
            </div>
          </div>

          {/* ── Row 2: Email + Phone ── */}
          <div
            ref={emailRowRef}
            className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10 border-b border-[#d0d0c8]"
          >
            <div>
              <label style={labelStyle}>Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@company.com"
                style={inputStyle}
                onBlur={(e) => {
                  if (e.target.value.trim())
                    scrollToRef(serviceRowRef, panelRef);
                }}
              />
            </div>
            <div className="border-t border-[#d0d0c8] sm:border-t-0">
              <label style={labelStyle}>Phone</label>
              <input
                name="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                style={inputStyle}
                onBlur={() => {
                  scrollToRef(serviceRowRef, panelRef);
                }}
              />
            </div>
          </div>

          {/* ── Row 3: Service ── */}
          <div
            ref={serviceRowRef}
            style={{ borderBottom: '1px solid #d0d0c8' }}
          >
            <label style={labelStyle}>Service</label>
            <ServiceDropdown
              value={service}
              onChange={setService}
              panelRef={panelRef}
              submitRef={briefRowRef}
            />
            <input type="hidden" name="selected_service" value={service} />
          </div>

          {/* ── Row 4: Brief ── */}
          <div ref={briefRowRef}>
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
              onFocus={() => {
                // When brief gets focus scroll the submit button into view
                scrollToRef(submitRowRef, panelRef);
              }}
            />
          </div>

          {/* ── Submit ── */}
          <div
            ref={submitRowRef}
            style={{ paddingTop: '28px', borderTop: '1px solid #d0d0c8' }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
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
}: Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>) {
  // panelRef is forwarded to ModalForm so it can scroll inside the panel element
  const panelRef = useRef<HTMLDivElement>(null);

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
            touchAction: 'none',
          }}
          className="flex items-end sm:items-center justify-center sm:p-6"
        >
          {/* Panel */}
          <motion.div
            key="panel"
            ref={panelRef}
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(720px, 100%)',
              maxHeight: '92vh',
              background: '#f5f5f0',
              zIndex: 9999,
              overflowY: 'auto',
              scrollbarWidth: 'none',
            }}
            className="rounded-t-xl sm:rounded-none"
          >
            {/* Header */}
            <div
              style={{
                borderBottom: '1px solid #d0d0c8',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                background: '#f5f5f0',
                zIndex: 10,
              }}
              className="px-5 pt-7 pb-5 sm:px-[52px] sm:pt-10 sm:pb-8"
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
                  marginLeft: '16px',
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
              <ModalForm onClose={onClose} panelRef={panelRef} />
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
}: Readonly<{
  children: React.ReactNode;
}>) {
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
