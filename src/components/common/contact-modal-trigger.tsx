'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactModal } from './contact-modal';

const INITIAL_DELAY = 10_000;
const REPEAT_INTERVAL = 30_000;
const NUDGE_VISIBLE_DURATION = 10_000;
const STORAGE_KEY = 'ac_modal_last_shown';
const MIN_GAP = 15_000;

export default function ContactModalTrigger() {
  const { open, isOpen } = useContactModal();
  const [showNudge, setShowNudge] = useState(false);
  const nudgeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fireModal = () => {
    const now = Date.now();
    const lastShown = Number(sessionStorage.getItem(STORAGE_KEY) ?? 0);
    if (now - lastShown < MIN_GAP) return;
    if (isOpen) return;
    sessionStorage.setItem(STORAGE_KEY, String(now));
    setShowNudge(true);
  };

  const handleOpenModal = () => {
    setShowNudge(false);
    open();
  };

  const handleDismissNudge = () => {
    setShowNudge(false);
  };

  useEffect(() => {
    if (!showNudge) return;
    nudgeTimer.current = setTimeout(
      () => setShowNudge(false),
      NUDGE_VISIBLE_DURATION,
    );
    return () => {
      if (nudgeTimer.current) clearTimeout(nudgeTimer.current);
    };
  }, [showNudge]);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      fireModal();
      intervalRef.current = setInterval(fireModal, REPEAT_INTERVAL);
    }, INITIAL_DELAY);
    return () => {
      clearTimeout(initTimer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {showNudge && !isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            bottom: '36px',
            right: '36px',
            zIndex: 9990,
            background: '#0a0a0a',
            width: '340px',
            padding: '36px 36px 28px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px #1f1f1f',
          }}
          className="max-sm:!bottom-22  max-sm:!left-9 max-sm:!w-[300px]"
        >
          {/* Top accent line — bright white */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.55,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              height: '1.5px',
              background: '#ffffff',
              marginBottom: '28px',
              transformOrigin: 'left',
            }}
          />

          {/* Eyebrow */}
          <div
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.52rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#888',
              marginBottom: '14px',
            }}
          >
            Auto Craft · Quick Connect
          </div>

          {/* Headline */}
          <div
            style={{
              fontFamily: 'var(--font-playfair)',
              fontWeight: 900,
              fontSize: '28px',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '12px',
            }}
          >
            Have a project
            <br />
            <em
              style={{ fontStyle: 'italic', fontWeight: 400, color: '#c8c8c0' }}
            >
              in mind?
            </em>
          </div>

          {/* Body */}
          <p
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#777',
              lineHeight: 2,
              marginBottom: '28px',
            }}
          >
            We build SaaS, AI & web products
            <br />
            that actually work.
          </p>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              background: '#1f1f1f',
              marginBottom: '24px',
            }}
          />

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={handleOpenModal}
              style={{
                flex: 1,
                background: '#ffffff',
                color: '#0a0a0a',
                border: '1px solid #ffffff',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '14px 20px',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = 'transparent';
                el.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = '#ffffff';
                el.style.color = '#0a0a0a';
              }}
            >
              Let&apos;s Talk →
            </button>

            <button
              onClick={handleDismissNudge}
              style={{
                background: 'transparent',
                border: '1px solid #2a2a2a',
                color: '#666',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '14px 16px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = '#555';
                el.style.color = '#aaa';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = '#2a2a2a';
                el.style.color = '#666';
              }}
            >
              Not now
            </button>
          </div>

          {/* Progress bar — drains over NUDGE_VISIBLE_DURATION */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{
              duration: NUDGE_VISIBLE_DURATION / 1000,
              ease: 'linear',
            }}
            style={{
              height: '1.5px',
              background: '#333',
              marginTop: '24px',
              transformOrigin: 'left',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
