'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const [path, hash] = href.split('#');

    if (!hash) return; // no anchor — let Next.js handle normally

    e.preventDefault();

    const scrollToHash = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (pathname === path || pathname === '/homepage') {
      // Already on the right page — just scroll
      scrollToHash();
    } else {
      // Navigate first, then scroll after the page mounts
      router.push(href);
      // Small delay to let the page render before scrolling
      setTimeout(scrollToHash, 400);
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center bg-[#f5f5f0] border-b border-[#d0d0c8]"
      style={{ padding: '14px 48px' }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href="/homepage"
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

      <ul
        className="hidden md:flex list-none items-center"
        style={{ gap: '24px' }}
      >
        {[
          { href: '/pricing', label: 'Pricing' },
          { href: '/services', label: 'Services' },
          { href: '/homepage#about', label: 'About' },
          { href: '/homepage#team', label: 'Team' },
          { href: '/contact', label: 'Contact' },
        ].map((link) => (
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
    </motion.nav>
  );
}
