'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const team = [
  {
    role: 'Founder',
    name: ['Dharmendra', 'Yadav'],
    img: '/images/dharmendra.png',
    phone: '+91 63064 50212',
    tel: 'tel:+916306450212',
    links: [
      { label: 'LI', href: 'https://linkedin.com/in/dharmendra-dxy' },
      { label: 'GH', href: 'https://github.com/dharmendra-dxy' },
      { label: 'X', href: 'https://x.com/dharmendra_dxy' },
      { label: '↗', href: 'https://dharmendra-dxy.vercel.app' },
    ],
  },
  {
    role: 'Co-Founder',
    name: ['Ganesh', 'Sharma'],
    img: '/images/ganesh-suit-close-up.PNG',
    phone: '+91 88021 30983',
    tel: 'tel:+918802130983',
    links: [
      { label: 'LI', href: 'https://linkedin.com/in/ganesh-sharmaz' },
      { label: 'GH', href: 'https://github.com/Ganesh-Sharmaz' },
      { label: 'X', href: 'https://x.com/Ganesh_Sharmazz' },
      { label: '↗', href: 'https://ganesh-sharma.me' },
    ],
  },
];

export default function Team() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  });

  return (
    <section
      id="team"
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderBottom: '1px solid #d0d0c8',
        background: '#f5f5f0',
      }}
      className="max-sm:!grid-cols-1"
    >
      {/* Left Intro Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          padding: '100px 60px',
          borderRight: '1px solid #d0d0c8',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
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
          }}
        >
          The People
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(40px, 5.5vw, 80px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: '#0a0a0a',
          }}
        >
          Crafted
          <br />
          by
          <br />
          <em
            style={{
              fontStyle: 'italic',
              fontWeight: 400,
            }}
          >
            Builders.
          </em>
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#aaaaaa',
            lineHeight: 2,
          }}
        >
          Two founders.
          <br />
          One mission.
          <br />
          No fluff.
        </p>
      </motion.div>

      {/* Right Cards */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {team.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2 + i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              padding: '56px 60px',
              borderBottom:
                i === team.length - 1 ? 'none' : '1px solid #d0d0c8',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '32px',
            }}
            className="max-sm:!p-[40px_24px] max-sm:!flex-col max-sm:!items-start"
          >
            {/* Left Side */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '28px',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  background: '#e8e8e2',
                  border: '1px solid #d0d0c8',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <Image
                  src={member.img}
                  alt={`${member.name.join(' ')} - ${member.role}`}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#aaaaaa',
                    marginBottom: '12px',
                  }}
                >
                  {member.role}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: 'clamp(24px, 3vw, 40px)',
                    fontWeight: 900,
                    lineHeight: 1,
                    color: '#0a0a0a',
                  }}
                >
                  {member.name[0]}
                  <br />
                  {member.name[1]}
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div
              style={{
                textAlign: 'right',
              }}
              className="max-sm:!text-left"
            >
              <div
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#aaaaaa',
                  marginBottom: '6px',
                }}
              >
                Direct Line
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                }}
              >
                <a
                  href={member.tel}
                  style={{
                    textDecoration: 'none',
                    color: '#0a0a0a',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {member.phone}
                </a>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '10px',
                  justifyContent: 'flex-end',
                }}
                className="max-sm:!justify-start"
              >
                {member.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    style={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontSize: '0.5rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#aaaaaa',
                      textDecoration: 'none',
                      border: '1px solid #d0d0c8',
                      padding: '4px 10px',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = '#0a0a0a';
                      el.style.color = '#f5f5f0';
                      el.style.borderColor = '#0a0a0a';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = 'transparent';
                      el.style.color = '#aaaaaa';
                      el.style.borderColor = '#d0d0c8';
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
