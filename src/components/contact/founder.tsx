'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type Founder = {
  name: string[];
  role: string;
  bio: string;
  skills: string[];
  achievements: { year: string; text: string }[];
  phone: string;
  phoneDisplay: string;
  email: string;
  socials: { label: string; href: string }[];
  photo: string;
  photoAlt: string;
  reverse?: boolean;
};

const founders: Founder[] = [
  {
    name: ['Dharmen', 'dra', 'Yadav'],
    role: 'Founder · Auto Craft',
    bio: `Dharmendra is the architect behind Auto Craft's vision. A full-stack builder with a passion for systems that scale, he leads product strategy, client relationships, and the technical direction of every project. He doesn't just build software — he engineers growth engines for businesses that want to compete at the highest level.\n\nWith deep roots in Ghaziabad and a national outlook, Dharmendra has been the driving force behind Auto Craft's expansion across all Indian states — from Delhi NCR to Chennai, from Mumbai to Guwahati.`,
    skills: [
      'Full-Stack Dev',
      'System Architecture',
      'Product Strategy',
      'AI Integration',
      'SaaS',
      'DevOps',
      'Client Relations',
    ],
    achievements: [
      {
        year: '2025',
        text: 'Co-founded Auto Craft — IT services agency serving clients nationwide',
      },
      {
        year: '2025',
        text: 'Architected and shipped production-grade SaaS platforms for Indian MSMEs',
      },
      {
        year: '2025',
        text: 'Built AI automation systems reducing client operational costs by 40%+',
      },
      {
        year: '2024',
        text: 'Mastered full-stack development across React, Node.js, Python & cloud platforms',
      },
    ],
    phone: '+916306450212',
    phoneDisplay: '+91 63064 50212',
    email: 'yaduvanshi.dhanno@gmail.com',
    socials: [
      {
        label: 'LinkedIn ↗',
        href: 'https://linkedin.com/in/dharmendra-dxy',
      },
      { label: 'GitHub ↗', href: 'https://github.com/dharmendra-dxy' },
      { label: 'X / Twitter ↗', href: 'https://x.com/dharmendra_dxy' },
      {
        label: 'Portfolio ↗',
        href: 'https://dharmendra-dxy.vercel.app',
      },
    ],
    photo: '/images/dharmendra.png',
    photoAlt: 'Dharmendra Yadav - Founder, Auto Craft',
    reverse: false,
  },
  {
    name: ['Ganesh', 'Sharma'],
    role: 'Co-Founder · Auto Craft',
    bio: `Ganesh is Auto Craft's principal engineer — the one who actually fixes what everyone else breaks. A full-stack developer specialising in React, Next.js, TypeScript, and AI-powered products, he brings an obsessive attention to performance, UX, and engineering quality that is rare at any level.\n\nFrom shipping enterprise HR & payroll platforms to building WhatsApp SaaS tools used by businesses across India, Ganesh's portfolio spans the full product lifecycle — from first commit to production scale. He is also the architect of Auto Craft's AI automation stack.`,
    skills: [
      'Next.js',
      'TypeScript',
      'React',
      'Python',
      'Node.js',
      'FastAPI',
      'MongoDB',
      'Redis',
      'Docker',
      'WebSockets',
      'AI/LLM APIs',
      'SEO',
      'CI/CD',
    ],
    achievements: [
      {
        year: '2025–Now',
        text: 'Associate Software Developer @ Truetym Inc., USA — MSME HR & Payroll platform with RBAC, FIDO2 auth, Razorpay integration, cutting load time by ~2s',
      },
      {
        year: '2025',
        text: 'Built Babbler — WhatsApp bulk messaging SaaS (WATI-like) with Meta Business API, WebSockets, real-time chat & campaign automation at Makunai Global',
      },
      {
        year: '2025',
        text: 'Shipped College Hai — SEO-first education platform lifting Lighthouse scores from 65 → 92+, with SSR, JSON-LD, and CLS-optimized ad management',
      },
      {
        year: '2025',
        text: 'Won college hackathon with SHNK CLI — Python scaffolding tool automating React + Tailwind project setup',
      },
      {
        year: '2025',
        text: 'Co-founded Auto Craft — building SaaS, AI automations & web products for clients across India',
      },
      {
        year: '2024',
        text: 'Published StorageBuddy on npm — zero-dependency TypeScript library unifying browser storage APIs; open source debut',
      },
      {
        year: '2024',
        text: 'Built YapperAI — multi-persona chatbot with Gemini Flash 1.5, Next.js & Firebase',
      },
    ],
    phone: '+918802130983',
    phoneDisplay: '+91 88021 30983',
    email: 'ganesh.sharma.work@gmail.com',
    socials: [
      {
        label: 'LinkedIn ↗',
        href: 'https://linkedin.com/in/ganesh-sharmaz',
      },
      { label: 'GitHub ↗', href: 'https://github.com/Ganesh-Sharmaz' },
      { label: 'X / Twitter ↗', href: 'https://x.com/Ganesh_Sharmazz' },
      { label: 'Portfolio ↗', href: 'https://ganesh-sharma.me' },
    ],
    photo: '/images/ganesh-suit-close-up.PNG',
    photoAlt: 'Ganesh Sharma - Co-Founder, Auto Craft',
    reverse: true,
  },
];

function SocialBtn({ href, label }: Readonly<{ href: string; label: string }>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: 'var(--fon>t-geist-mono)',
        fontSize: '0.5rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: '#aaaaaa',
        textDecoration: 'none',
        border: '1px solid #d0d0c8',
        padding: '8px 16px',
        transition: 'all 0.2s',
        background: '#f5f5f0',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = '#0a0a0a';
        el.style.color = '#f5f5f0';
        el.style.borderColor = '#0a0a0a';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = '#f5f5f0';
        el.style.color = '#aaaaaa';
        el.style.borderColor = '#d0d0c8';
      }}
    >
      {label}
    </a>
  );
}

function FounderCard({ founder }: { founder: Founder }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const Visual = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: founder.reverse ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: '80px 60px',
        borderRight: founder.reverse ? 'none' : '1px solid #d0d0c8',
        borderLeft: founder.reverse ? '1px solid #d0d0c8' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        background: '#e8e8e2',
        order: founder.reverse ? 2 : undefined,
      }}
      className="max-sm:!border-none max-sm:!border-b max-sm:!border-[#d0d0c8] max-sm:!p-[60px_24px] max-sm:!order-none"
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '1',
          background: '#e0e0d8',
          border: '1px solid #d0d0c8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          maxWidth: '320px',
        }}
      >
        <Image
          src={founder.photo}
          alt={founder.photoAlt}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <SocialBtn
            href={founder.socials[0].href}
            label={founder.socials[0].label}
          />
          <SocialBtn
            href={founder.socials[1].href}
            label={founder.socials[1].label}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <SocialBtn
            href={founder.socials[2].href}
            label={founder.socials[2].label}
          />
          <SocialBtn
            href={founder.socials[3].href}
            label={founder.socials[3].label}
          />
        </div>
      </div>
    </motion.div>
  );

  const Info = (
    <motion.div
      initial={{ opacity: 0, x: founder.reverse ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: '80px 60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        order: founder.reverse ? 1 : undefined,
      }}
      className="max-sm:!p-[60px_24px] max-sm:!order-none"
    >
      <div>
        <div
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#aaaaaa',
            marginBottom: '12px',
          }}
        >
          {founder.role}
        </div>

        <div
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            marginBottom: '40px',
            color: '#0a0a0a',
          }}
        >
          {founder.reverse ? (
            <>
              {founder.name[0]}
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 400 }}>
                {founder.name[1]}
              </em>
            </>
          ) : (
            <>
              {founder.name[0]}
              <em style={{ fontStyle: 'italic', fontWeight: 400 }}>
                {founder.name[1]}
              </em>
              <br />
              {founder.name[2]}
            </>
          )}
        </div>

        <p
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            lineHeight: 2.2,
            color: '#aaaaaa',
            textTransform: 'uppercase',
            marginBottom: '48px',
          }}
        >
          {founder.bio.split('\n\n').map((para, i) => (
            <span key={i}>
              {para}
              {i < founder.bio.split('\n\n').length - 1 && (
                <>
                  <br />
                  <br />
                </>
              )}
            </span>
          ))}
        </p>

        {/* Skills */}
        <div
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#aaaaaa',
            borderTop: '1px solid #d0d0c8',
            paddingTop: '20px',
            marginBottom: '16px',
            marginTop: '32px',
          }}
        >
          {founder.reverse ? 'Core Stack' : 'Core Skills'}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {founder.skills.map((skill) => (
            <span
              key={skill}
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.5rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#0a0a0a',
                border: '1px solid #d0d0c8',
                padding: '6px 14px',
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Achievements */}
        <div
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#aaaaaa',
            borderTop: '1px solid #d0d0c8',
            paddingTop: '20px',
            marginBottom: '16px',
            marginTop: '32px',
          }}
        >
          Career Highlights
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {founder.achievements.map((a, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'baseline',
                borderTop: '1px solid #e8e8e2',
                paddingTop: '12px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.1em',
                  color: '#aaaaaa',
                  minWidth: '60px',
                }}
              >
                {a.year}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.1em',
                  lineHeight: 1.8,
                  textTransform: 'uppercase',
                  color: '#0a0a0a',
                }}
              >
                {a.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          marginTop: '32px',
          paddingTop: '32px',
          borderTop: '1px solid #d0d0c8',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#aaaaaa',
              marginBottom: '8px',
            }}
          >
            Call Direct
          </div>
          <div
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(18px, 2vw, 28px)',
              fontWeight: 900,
              color: '#0a0a0a',
            }}
          >
            <a
              href={`tel:${founder.phone}`}
              style={{
                textDecoration: 'none',
                color: '#0a0a0a',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = '#aaaaaa')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = '#0a0a0a')
              }
            >
              {founder.phoneDisplay}
            </a>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#aaaaaa',
              marginTop: '8px',
            }}
          >
            <a
              href={`mailto:${founder.email}`}
              style={{
                textDecoration: 'none',
                color: '#aaaaaa',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = '#0a0a0a')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = '#aaaaaa')
              }
            >
              {founder.email}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderBottom: '1px solid #d0d0c8',
      }}
      className="max-sm:!grid-cols-1"
    >
      {founder.reverse ? (
        <>
          {Info}
          {Visual}
        </>
      ) : (
        <>
          {Visual}
          {Info}
        </>
      )}
    </div>
  );
}

export default function Founders() {
  return (
    <div style={{ borderBottom: '1px solid #d0d0c8' }}>
      {founders.map((founder) => (
        <FounderCard key={founder.email} founder={founder} />
      ))}
    </div>
  );
}
