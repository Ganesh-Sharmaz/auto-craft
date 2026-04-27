'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const [path, hash] = href.split('#');

    setMenuOpen(false);

    if (!hash) return;

    e.preventDefault();

    const scrollToHash = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (pathname === path || pathname === '/home') {
      scrollToHash();
    } else {
      router.push(href);
      setTimeout(scrollToHash, 400);
    }
  };

  const navLinks = [
    { href: '/pricing', label: 'Pricing' },
    { href: '/services', label: 'Services' },
    { href: '/home#about', label: 'About' },
    { href: '/home#team', label: 'Team' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center bg-[#f5f5f0] border-b border-[#d0d0c8] px-6 py-[14px] md:px-12"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <Link
          href="/home"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontWeight: 900,
            fontSize: '1rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            color: '#0a0a0a',
            flexShrink: 0,
          }}
        >
          Auto Craft
        </Link>

        {/* Desktop links */}
        <ul
          className="hidden md:flex list-none items-center"
          style={{ gap: '24px' }}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#aaaaaa',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0a0a0a')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#aaaaaa')}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden flex-col justify-center items-center"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            gap: '5px',
            flexDirection: 'column',
          }}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: '#0a0a0a',
              transformOrigin: 'center',
            }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: '#0a0a0a',
            }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: '#0a0a0a',
              transformOrigin: 'center',
            }}
          />
        </button>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed top-[49px] left-0 right-0 z-[99] md:hidden"
            style={{
              background: '#f5f5f0',
              borderBottom: '1px solid #d0d0c8',
              overflow: 'hidden',
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: '8px 0 16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-geist-mono)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#aaaaaa',
                      textDecoration: 'none',
                      padding: '12px 24px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = '#0a0a0a')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = '#aaaaaa')
                    }
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
