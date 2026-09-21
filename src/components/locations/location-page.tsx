import Link from 'next/link';

type LocationPageData = {
  state: string;
  stateSlug: string;
  city: string;
  citySlug: string;
  market: string;
  industries: string[];
};

export default function LocationPage({
  location,
  relatedLocations,
}: {
  location: LocationPageData;
  relatedLocations: LocationPageData[];
}) {
  return (
    <main className="bg-[#f5f5f0] text-[#0a0a0a]">
      <section
        className="relative overflow-hidden border-b border-[#d0d0c8] bg-[#0a0a0a] px-6 pb-16 pt-[120px] md:px-[60px] md:pb-24 md:pt-[160px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-[var(--font-playfair)] text-[clamp(90px,18vw,240px)] font-black leading-none text-transparent"
          style={{ WebkitTextStroke: '1px #1a1a1a' }}
        >
          {location.city.toUpperCase()}
        </div>

        <p className="relative z-10 mb-8 font-[var(--font-geist-mono)] text-[0.6rem] uppercase tracking-[0.25em] text-[#555]">
          IT Services · SaaS · AI Automation · {location.state}
        </p>
        <h1 className="relative z-10 max-w-[980px] font-[var(--font-playfair)] text-[clamp(48px,8vw,110px)] font-black leading-[0.92] tracking-[-0.02em] text-[#f5f5f0]">
          IT services in
          <br />
          <em className="font-normal">{location.city}.</em>
        </h1>
        <p className="relative z-10 mt-12 max-w-[520px] font-[var(--font-geist-mono)] text-[0.65rem] uppercase leading-[1.9] tracking-[0.1em] text-[#777]">
          SaaS products, AI workflow automation, and high-performance websites
          for businesses in {location.city} and across {location.state}.
        </p>
      </section>

      <section className="grid border-b border-[#d0d0c8] md:grid-cols-[1fr_2fr]">
        <div className="border-b border-[#d0d0c8] px-6 py-16 md:border-b-0 md:border-r md:px-[60px] md:py-24">
          <p className="mb-8 font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.25em] text-[#aaaaaa]">
            {location.state} / {location.city}
          </p>
          <h2 className="max-w-[440px] font-[var(--font-playfair)] text-[clamp(36px,5vw,68px)] font-black leading-[0.95] tracking-[-0.02em]">
            A digital partner for {location.city} businesses.
          </h2>
        </div>
        <div className="px-6 py-16 md:px-[60px] md:py-24">
          <p className="max-w-[700px] font-[var(--font-geist-mono)] text-[0.68rem] uppercase leading-[2] tracking-[0.08em] text-[#666]">
            {location.city} businesses operate across {location.market}. Auto
            Craft helps teams turn manual processes and ambitious ideas into
            reliable software, automation, and web experiences. We work
            remotely from India and do not represent this page as a local
            office unless explicitly stated.
          </p>
          <div className="mt-12 flex flex-wrap gap-2">
            {location.industries.map((industry) => (
              <span
                key={industry}
                className="border border-[#d0d0c8] bg-[#e8e8e2] px-4 py-2 font-[var(--font-geist-mono)] text-[0.5rem] uppercase tracking-[0.16em] text-[#555]"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#d0d0c8] pb-0 pt-16 md:pb-0 md:pt-24">
        <p className="mb-8 px-6 font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.25em] text-[#aaaaaa] md:px-[60px]">
          What we build for {location.city}
        </p>
        <div className="grid border-t border-[#d0d0c8] md:grid-cols-3">
          {[
            [
              '01',
              'SaaS products',
              'From MVPs to multi-tenant platforms with clear scope, modern architecture, and a documented handoff.',
            ],
            [
              '02',
              'AI automations',
              'Workflow automation, LLM-powered tools, and integrations that reduce repetitive work for your team.',
            ],
            [
              '03',
              'Web development',
              'Fast, search-friendly websites and web applications designed to explain your value and generate demand.',
            ],
          ].map(([number, title, description]) => (
            <article
              key={number}
              className="border-b border-[#d0d0c8] px-6 py-8 md:border-b-0 md:border-r md:px-[60px] md:py-10 md:last:border-r-0"
            >
              <p className="mb-6 font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.2em] text-[#aaaaaa]">
                {number} / Service
              </p>
              <h3 className="mb-5 font-[var(--font-playfair)] text-[clamp(24px,2.5vw,36px)] font-black leading-none">
                {title}
              </h3>
              <p className="font-[var(--font-geist-mono)] text-[0.58rem] uppercase leading-[1.9] tracking-[0.08em] text-[#777]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid border-b border-[#d0d0c8] md:grid-cols-[2fr_1fr]">
        <div className="border-b border-[#d0d0c8] px-6 py-16 md:border-b-0 md:border-r md:px-[60px] md:py-24">
          <p className="mb-8 font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.25em] text-[#aaaaaa]">
            Start a project in {location.city}
          </p>
          <h2 className="max-w-[760px] font-[var(--font-playfair)] text-[clamp(40px,6vw,88px)] font-black leading-[0.95] tracking-[-0.02em]">
            Build something that
            <br />
            <em className="font-normal">actually works.</em>
          </h2>
          <Link
            href={`/contact?city=${location.citySlug}`}
            className="mt-12 inline-flex border border-[#0a0a0a] bg-[#0a0a0a] px-10 py-[18px] font-[var(--font-geist-mono)] text-[0.6rem] uppercase tracking-[0.2em] text-[#f5f5f0] transition-colors hover:bg-[#f5f5f0] hover:text-[#0a0a0a]"
          >
            Talk about your project
          </Link>
        </div>
        <div className="bg-[#e8e8e2] px-6 py-16 md:px-10 md:py-24">
          <p className="mb-8 font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.25em] text-[#aaaaaa]">
            Nearby markets
          </p>
          <nav aria-label={`Other locations in ${location.state}`}>
            <ul className="space-y-3">
              {relatedLocations.map((related) => (
                <li key={related.citySlug}>
                  <Link
                    href={`/${related.stateSlug}/${related.citySlug}`}
                    className="font-[var(--font-geist-mono)] text-[0.6rem] uppercase tracking-[0.14em] text-[#555] transition-colors hover:text-[#0a0a0a]"
                  >
                    {related.city} →
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </main>
  );
}
