'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageNavigationProps = {
  items: BreadcrumbItem[];
  backHref?: string;
  backLabel?: string;
};

function BackButton({ href, label }: { href: string; label: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push(href);
        }
      }}
      className="inline-flex items-center gap-2 border border-[#d0d0c8] px-3 py-2 font-[var(--font-geist-mono)] text-[0.5rem] uppercase tracking-[0.16em] text-[#555] transition-colors hover:border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#f5f5f0]"
      aria-label={label}
    >
      <span aria-hidden="true" className="text-[0.75rem] leading-none">
        ←
      </span>
      {label}
    </button>
  );
}

export default function PageNavigation({
  items,
  backHref = '/',
  backLabel = 'Back',
}: PageNavigationProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mt-[49px] flex flex-wrap items-center justify-between gap-4 border-b border-[#d0d0c8] bg-[#f5f5f0] px-6 py-4 text-[#0a0a0a] md:mt-[66px] md:px-[60px]"
    >
      <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 font-[var(--font-geist-mono)] text-[0.5rem] uppercase tracking-[0.14em] text-[#888]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[#0a0a0a]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-[#0a0a0a]' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <BackButton href={backHref} label={backLabel} />
    </nav>
  );
}
