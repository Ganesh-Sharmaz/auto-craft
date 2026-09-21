import Link from 'next/link';

type StatePageData = {
  state: string;
  stateSlug: string;
  market: string;
  focus: string[];
  summary: string;
};

type CityPageData = {
  stateSlug: string;
  city: string;
  citySlug: string;
};

export default function StatePage({
  state,
  cities,
}: {
  state: StatePageData;
  cities: CityPageData[];
}) {
  return (
    <main className="bg-[#f5f5f0] text-[#0a0a0a]">
      <section className="relative overflow-hidden border-b border-[#d0d0c8] bg-[#0a0a0a] px-6 pb-16 pt-[120px] text-[#f5f5f0] md:px-[60px] md:pb-24 md:pt-[160px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-[var(--font-playfair)] text-[clamp(100px,18vw,280px)] font-black leading-none text-transparent"
          style={{ WebkitTextStroke: '1px #1a1a1a' }}
        >
          {state.state.toUpperCase()}
        </div>
        <p className="relative z-10 mb-8 font-[var(--font-geist-mono)] text-[0.6rem] uppercase tracking-[0.25em] text-[#777]">
          India · {state.state} · SaaS · AI · Web
        </p>
        <h1 className="relative z-10 max-w-[1000px] font-[var(--font-playfair)] text-[clamp(48px,8vw,110px)] font-black leading-[0.92] tracking-[-0.02em]">
          IT services in
          <br />
          <em className="font-normal">{state.state}.</em>
        </h1>
        <p className="relative z-10 mt-12 max-w-[600px] font-[var(--font-geist-mono)] text-[0.65rem] uppercase leading-[1.9] tracking-[0.1em] text-[#777]">
          {state.summary}
        </p>
      </section>

      <section className="grid border-b border-[#d0d0c8] md:grid-cols-[1fr_2fr]">
        <div className="border-b border-[#d0d0c8] px-6 py-16 md:border-b-0 md:border-r md:px-[60px] md:py-24">
          <p className="mb-8 font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.25em] text-[#aaaaaa]">
            State market
          </p>
          <h2 className="max-w-[520px] font-[var(--font-playfair)] text-[clamp(36px,5vw,68px)] font-black leading-[0.95] tracking-[-0.02em]">
            Digital systems for businesses across {state.state}.
          </h2>
        </div>
        <div className="px-6 py-16 md:px-[60px] md:py-24">
          <p className="max-w-[720px] font-[var(--font-geist-mono)] text-[0.68rem] uppercase leading-[2] tracking-[0.08em] text-[#666]">
            Businesses in {state.state} operate across {state.market}. Auto
            Craft provides a remote technology partner for teams that need to
            launch a product, automate repetitive work, or improve their web
            presence. We do not claim a local office unless one is explicitly
            stated.
          </p>
          <div className="mt-12 flex flex-wrap gap-2">
            {state.focus.map((item) => (
              <span
                key={item}
                className="border border-[#d0d0c8] bg-[#e8e8e2] px-4 py-2 font-[var(--font-geist-mono)] text-[0.5rem] uppercase tracking-[0.16em] text-[#555]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#d0d0c8] px-6 py-16 md:px-[60px] md:py-24">
        <p className="mb-8 font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.25em] text-[#aaaaaa]">
          Cities we serve in {state.state}
        </p>
        <div className="grid border-t border-[#d0d0c8] md:grid-cols-2">
          {cities.map((city, index) => (
            <Link
              key={city.citySlug}
              href={`/${city.stateSlug}/${city.citySlug}`}
              className="group flex items-baseline justify-between border-b border-[#d0d0c8] py-6 font-[var(--font-geist-mono)] uppercase tracking-[0.12em] transition-colors hover:bg-[#0a0a0a] hover:px-5 hover:text-[#f5f5f0] md:px-4"
            >
              <span className="text-[0.55rem] text-[#aaaaaa] group-hover:text-[#777]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-[0.7rem]">IT services in {city.city}</span>
              <span className="text-[0.8rem]">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid border-b border-[#d0d0c8] md:grid-cols-[2fr_1fr]">
        <div className="border-b border-[#d0d0c8] px-6 py-16 md:border-b-0 md:border-r md:px-[60px] md:py-24">
          <p className="mb-8 font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.25em] text-[#aaaaaa]">
            Work with Auto Craft
          </p>
          <h2 className="max-w-[760px] font-[var(--font-playfair)] text-[clamp(40px,6vw,88px)] font-black leading-[0.95] tracking-[-0.02em]">
            Build software that
            <br />
            <em className="font-normal">moves your business.</em>
          </h2>
          <Link
            href={`/contact?state=${state.stateSlug}`}
            className="mt-12 inline-flex border border-[#0a0a0a] bg-[#0a0a0a] px-10 py-[18px] font-[var(--font-geist-mono)] text-[0.6rem] uppercase tracking-[0.2em] text-[#f5f5f0] transition-colors hover:bg-[#f5f5f0] hover:text-[#0a0a0a]"
          >
            Start a project
          </Link>
        </div>
        <div className="bg-[#e8e8e2] px-6 py-16 md:px-10 md:py-24">
          <p className="mb-8 font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.25em] text-[#aaaaaa]">
            Explore more
          </p>
          <Link
            href="/locations"
            className="font-[var(--font-geist-mono)] text-[0.6rem] uppercase tracking-[0.14em] text-[#555] transition-colors hover:text-[#0a0a0a]"
          >
            All India locations →
          </Link>
        </div>
      </section>
    </main>
  );
}
