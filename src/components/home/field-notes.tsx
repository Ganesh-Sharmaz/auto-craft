import Image from 'next/image';
import Link from 'next/link';
import posts from '@/data/blog-posts.json';
import { normalizeBlogPosts, type BlogPost } from '@/lib/blog-schema';

const fieldNotes = normalizeBlogPosts(posts as BlogPost[]);

export default function FieldNotes() {
  const [featured, ...notes] = fieldNotes;

  return (
    <section className="border-b border-[#d0d0c8] bg-[#f5f5f0] px-6 py-20 text-[#0a0a0a] md:px-[60px] md:py-28">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-[#d0d0c8] pb-6">
        <div>
          <p className="mb-5 font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.25em] text-[#aaaaaa]">
            Auto Craft / Field Notes
          </p>
          <h2 className="max-w-[720px] font-[var(--font-playfair)] text-[clamp(42px,6vw,84px)] font-black leading-[0.92] tracking-[-0.02em]">
            Ideas behind
            <br />
            <em className="font-normal">the work.</em>
          </h2>
        </div>
        <Link
          href="/blog"
          className="border border-[#0a0a0a] px-5 py-4 font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.18em] text-[#0a0a0a] transition-colors hover:bg-[#0a0a0a] hover:text-[#f5f5f0]"
        >
          Read all notes →
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid overflow-hidden border border-[#d0d0c8] bg-[#e8e8e2] md:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="relative min-h-[280px] overflow-hidden bg-[#0a0a0a] md:min-h-[420px]">
            {featured.image && (
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            )}
          </div>
          <div className="flex flex-col justify-between p-6 md:p-10">
            <div>
              <p className="mb-6 font-[var(--font-geist-mono)] text-[0.52rem] uppercase tracking-[0.2em] text-[#888]">
                {featured.kicker} · {featured.readingTime}
              </p>
              <h3 className="font-[var(--font-playfair)] text-[clamp(30px,3.2vw,52px)] font-black leading-[0.96] tracking-[-0.02em]">
                {featured.title}
              </h3>
              <p className="mt-6 font-[var(--font-geist-mono)] text-[0.62rem] uppercase leading-[1.9] tracking-[0.07em] text-[#666]">
                {featured.subtitle}
              </p>
            </div>
            <span className="mt-10 border-t border-[#d0d0c8] pt-5 font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.16em] text-[#555]">
              Read the latest note →
            </span>
          </div>
        </Link>

        <div className="border-t border-[#d0d0c8]">
          {notes.slice(0, 2).map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border-b border-[#d0d0c8] py-7"
            >
              <div className="flex items-center justify-between font-[var(--font-geist-mono)] text-[0.5rem] uppercase tracking-[0.16em] text-[#aaaaaa]">
                <span>
                  {String(index + 2).padStart(2, '0')} / {post.category}
                </span>
                <span>{post.readingTime}</span>
              </div>
              <h3 className="mt-5 font-[var(--font-playfair)] text-[clamp(25px,2.5vw,38px)] font-black leading-none tracking-[-0.015em] transition-colors group-hover:text-[#666]">
                {post.title}
              </h3>
              <p className="mt-4 font-[var(--font-geist-mono)] text-[0.57rem] uppercase leading-[1.8] tracking-[0.07em] text-[#777]">
                {post.excerpt}
              </p>
              <span className="mt-5 block font-[var(--font-geist-mono)] text-[0.52rem] uppercase tracking-[0.16em] text-[#555]">
                Read note →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
