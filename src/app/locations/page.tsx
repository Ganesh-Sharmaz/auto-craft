import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/common/footer';
import Nav from '@/components/common/navbar';
import locations from '@/data/location-pages.json';
import PageNavigation from '@/components/common/page-navigation';

export const metadata: Metadata = {
  title: 'IT Services Across India | Auto Craft Locations',
  description:
    'Explore Auto Craft service coverage for SaaS development, AI automation, and web development across major Indian states and cities.',
  alternates: { canonical: '/locations' },
  openGraph: {
    title: 'IT Services Across India | Auto Craft Locations',
    description:
    'SaaS development, AI automation, and web development for businesses across India.',
    url: '/locations',
    type: 'website',
  },
  authors: [{ name: 'Ganesh Sharma' }],
  creator: 'Ganesh Sharma',
  publisher: 'Auto Craft',
};

const stateGroups = locations.reduce<Record<string, typeof locations>>(
  (groups, location) => {
    groups[location.state] ??= [];
    groups[location.state].push(location);
    return groups;
  }, {},
);

export default function LocationsPage() {
  return (
    <div className="w-full min-h-screen bg-[#f5f5f0] text-[#0a0a0a]">
      <Nav />
      <PageNavigation
        items={[{ label: 'Home', href: '/' }, { label: 'Locations' }]}
      />
      <main>
        <section className="border-b border-[#d0d0c8] bg-[#0a0a0a] px-6 pb-16 pt-[120px] text-[#f5f5f0] md:px-[60px] md:pb-24 md:pt-[160px]">
          <p className="mb-8 font-[var(--font-geist-mono)] text-[0.6rem] uppercase tracking-[0.25em] text-[#777]">
            India · SaaS · AI · Web
          </p>
          <h1 className="max-w-[900px] font-[var(--font-playfair)] text-[clamp(48px,8vw,110px)] font-black leading-[0.92] tracking-[-0.02em]">
            Where we
            <br />
            <em className="font-normal">work.</em>
          </h1>
          <p className="mt-12 max-w-[520px] font-[var(--font-geist-mono)] text-[0.65rem] uppercase leading-[1.9] tracking-[0.1em] text-[#777]">
            Remote SaaS development, AI automation, and web development for
            businesses across India.
          </p>
        </section>

        <section className="px-6 py-16 md:px-[60px] md:py-24">
          <div className="grid border-t border-[#d0d0c8] md:grid-cols-2">
            {Object.entries(stateGroups).map(([state, stateLocations]) => (
              <section
                key={state}
                className="border-b border-[#d0d0c8] py-10 md:px-8 md:py-12 md:even:border-l"
              >
                <p className="mb-5 font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.2em] text-[#aaaaaa]">
                  State market
                </p>
                <h2 className="mb-8 font-[var(--font-playfair)] text-[clamp(30px,4vw,52px)] font-black leading-none">
                  <Link href={`/${stateLocations[0].stateSlug}`}>{state}</Link>
                </h2>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {stateLocations.map((location) => (
                    <li key={location.citySlug}>
                      <Link
                        href={`/${location.stateSlug}/${location.citySlug}`}
                        className="font-[var(--font-geist-mono)] text-[0.58rem] uppercase tracking-[0.12em] text-[#666] transition-colors hover:text-[#0a0a0a]"
                      >
                        {location.city} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
