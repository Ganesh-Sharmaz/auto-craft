'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const faqs = [
  {
    q: 'Are the prices fixed or negotiable?',
    a: 'The ranges are honest estimates based on typical project scopes — not fixed ceilings. If your budget is tight or your scope is different, tell us. We have structured phased builds, stripped-down MVPs, and flexible payment plans for businesses at every stage.',
  },
  {
    q: 'What is included in post-launch support?',
    a: 'Bug fixes, minor UI adjustments, deployment issues, and general questions within the agreed support window. This is not a retainer — it is a buffer to make sure the launch sticks. Ongoing retainers for continued development are available separately.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. While we are based in Indrapuram, Ghaziabad, we work fully remotely and have delivered projects for clients outside India. All communication is in English and payments can be structured accordingly.',
  },
  {
    q: 'How are payments structured?',
    a: 'We use milestone-based payments tied to real deliverables — typically 30% to start, 40% at mid-project milestone, and 30% on final delivery. For larger projects we adjust the split. Nothing is paid upfront without a signed scope document.',
  },
  {
    q: 'What if my project does not fit a tier?',
    a: 'Most projects do not fit perfectly into a tier — that is normal. The tiers are a starting frame. Tell us what you are building and we will give you a custom proposal. There is no obligation and no sales pressure.',
  },
  {
    q: 'How fast can you start?',
    a: 'Typically within one to two weeks of a signed proposal, depending on current capacity. If your timeline is urgent, mention it early — we will be honest about whether we can meet it.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes, always. We sign NDAs before any detailed technical or business discussions. Your idea, your data, and your code are yours — full stop.',
  },
];

function FAQItem({ item, index }: { item: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.06,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ borderBottom: '1px solid #d0d0c8' }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: '24px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '28px 0',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            lineHeight: 1.7,
            textTransform: 'uppercase',
            color: '#0a0a0a',
          }}
        >
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '1rem',
            color: '#aaaaaa',
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.1em',
                lineHeight: 2.2,
                textTransform: 'uppercase',
                color: '#aaaaaa',
                paddingBottom: '28px',
                maxWidth: '640px',
              }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PricingFAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        borderBottom: '1px solid #d0d0c8',
        background: '#f5f5f0',
      }}
      className="max-sm:!grid-cols-1"
    >
      {/* LEFT */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
          Questions
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(36px, 4.5vw, 60px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: '#0a0a0a',
          }}
        >
          Things people
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 400 }}>usually ask.</em>
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.1em',
            lineHeight: 2,
            textTransform: 'uppercase',
            color: '#aaaaaa',
            marginTop: '32px',
            maxWidth: '280px',
          }}
        >
          Still have a question not answered here? Just reach out — we respond
          fast.
        </p>
      </motion.div>

      {/* RIGHT */}
      <div
        style={{ padding: '100px 60px' }}
        className="max-sm:!px-6 max-sm:!py-16"
      >
        {faqs.map((item, index) => (
          <FAQItem key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
