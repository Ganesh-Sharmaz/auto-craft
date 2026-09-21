import Image from 'next/image';
import Link from 'next/link';

type BlogPost = {
  slug: string;
  kicker: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: string;
  image?: string | null;
  author: { name: string; role: string; image: string };
};

export default function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [featured, ...rest] = posts;

  return (
    <main className="bg-[#f5f5f0] text-[#0a0a0a]">
      <section className="border-b border-[#d0d0c8] bg-[#0a0a0a] px-6 pb-16 pt-[120px] text-[#f5f5f0] md:px-[60px] md:pb-24 md:pt-[160px]">
        <p className="mb-8 font-[var(--font-geist-mono)] text-[0.6rem] uppercase tracking-[0.25em] text-[#777]">
          Auto Craft / Field Notes
        </p>
        <h1 className="max-w-[900px] font-[var(--font-playfair)] text-[clamp(52px,9vw,130px)] font-black leading-[0.9] tracking-[-0.02em]">
          The work
          <br />
          <em className="font-normal">behind the work.</em>
        </h1>
        <p className="mt-12 max-w-[520px] font-[var(--font-geist-mono)] text-[0.65rem] uppercase leading-[1.9] tracking-[0.1em] text-[#777]">
          Practical notes on SaaS, AI automation, web development, and the
          decisions that make digital products useful.
        </p>
      </section>

      <section className="border-b border-[#d0d0c8] px-6 py-16 md:px-[60px] md:py-24">
        <p className="mb-8 font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.25em] text-[#aaaaaa]">
          Latest note
        </p>
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid overflow-hidden border border-[#d0d0c8] bg-[#e8e8e2] md:grid-cols-[1.1fr_1fr]"
        >
          <div className="relative min-h-[300px] overflow-hidden bg-[#0a0a0a] md:min-h-[480px]">
            {featured.image ? (
              <Image
                src={featured.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover grayscale transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full min-h-[300px] items-center justify-center p-8 text-center font-[var(--font-playfair)] text-[clamp(34px,5vw,72px)] font-black leading-none text-[#f5f5f0] md:min-h-[480px]">
                {featured.category}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between p-6 md:p-12">
            <div>
              <p className="mb-8 font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.22em] text-[#888]">
                {featured.kicker} · {featured.readingTime}
              </p>
              <h2 className="font-[var(--font-playfair)] text-[clamp(34px,4vw,64px)] font-black leading-[0.95] tracking-[-0.02em]">
                {featured.title}
              </h2>
              <p className="mt-8 max-w-[520px] font-[var(--font-geist-mono)] text-[0.62rem] uppercase leading-[1.9] tracking-[0.08em] text-[#666]">
                {featured.subtitle}
              </p>
            </div>
            <div className="mt-12 flex items-center justify-between border-t border-[#d0d0c8] pt-5 font-[var(--font-geist-mono)] text-[0.52rem] uppercase tracking-[0.15em] text-[#777]">
              <span>By {featured.author.name}</span>
              <span>Read note →</span>
            </div>
          </div>
        </Link>
      </section>

      <section className="px-6 py-16 md:px-[60px] md:py-24">
        <div className="mb-8 flex items-end justify-between border-b border-[#d0d0c8] pb-5">
          <p className="font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.25em] text-[#aaaaaa]">
            All notes
          </p>
          <p className="font-[var(--font-geist-mono)] text-[0.5rem] uppercase tracking-[0.15em] text-[#aaaaaa]">
            {posts.length} essays
          </p>
        </div>
        <div className="grid border-t border-[#d0d0c8] md:grid-cols-2">
          {rest.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group border-b border-[#d0d0c8] py-8 md:px-8 md:py-10 md:even:border-l"
            >
              <div className="flex items-center justify-between font-[var(--font-geist-mono)] text-[0.52rem] uppercase tracking-[0.16em] text-[#aaaaaa]">
                <span>{String(index + 2).padStart(2, '0')} / {post.category}</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mt-8 max-w-[560px] font-[var(--font-playfair)] text-[clamp(28px,3vw,46px)] font-black leading-none tracking-[-0.015em] transition-colors group-hover:text-[#666]">
                {post.title}
              </h2>
              <p className="mt-6 max-w-[560px] font-[var(--font-geist-mono)] text-[0.6rem] uppercase leading-[1.9] tracking-[0.08em] text-[#777]">
                {post.excerpt}
              </p>
              <div className="mt-8 font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.18em] text-[#555]">
                Read article →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
