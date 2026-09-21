import Image from 'next/image';
import Link from 'next/link';
import PageNavigation from '@/components/common/page-navigation';
import type { BlogBlock, NormalizedBlogPost } from '@/lib/blog-schema';

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00Z`));
}

function renderBlock(block: BlogBlock, index: number) {
  switch (block.type) {
    case 'heading':
      return block.level === 3 ? (
        <h3
          key={index}
          className="mb-4 font-[var(--font-playfair)] text-[clamp(24px,3vw,36px)] font-black leading-none"
        >
          {block.text}
        </h3>
      ) : (
        <h2
          key={index}
          className="mb-6 font-[var(--font-playfair)] text-[clamp(30px,4vw,52px)] font-black leading-none tracking-[-0.015em]"
        >
          {block.text}
        </h2>
      );
    case 'paragraph':
      return (
        <p
          key={index}
          className="mb-6 font-[var(--font-geist-mono)] text-[0.72rem] leading-[2] tracking-[0.02em] text-[#444]"
        >
          {block.text}
        </p>
      );
    case 'list':
      return block.style === 'number' ? (
        <ol
          key={index}
          className="mt-8 list-decimal space-y-3 border-l border-[#0a0a0a] pl-9 font-[var(--font-geist-mono)] text-[0.65rem] uppercase leading-[1.8] tracking-[0.06em] text-[#555]"
        >
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul
          key={index}
          className="mt-8 list-disc space-y-3 border-l border-[#0a0a0a] pl-9 font-[var(--font-geist-mono)] text-[0.65rem] uppercase leading-[1.8] tracking-[0.06em] text-[#555]"
        >
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'image':
      return (
        <figure key={index} className="my-10">
          <Image
            src={block.image.src}
            alt={block.image.alt}
            width={1200}
            height={675}
            className="h-auto w-full"
          />
          {block.image.caption && (
            <figcaption className="mt-3 font-[var(--font-geist-mono)] text-[0.55rem] uppercase tracking-[0.1em] text-[#777]">
              {block.image.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'quote':
      return (
        <blockquote
          key={index}
          className="my-10 border-l-2 border-[#0a0a0a] pl-6 font-[var(--font-playfair)] text-[clamp(24px,3vw,38px)] italic leading-[1.1]"
        >
          “{block.text}”
          {block.attribution && (
            <cite className="mt-4 block font-[var(--font-geist-mono)] text-[0.55rem] not-italic uppercase tracking-[0.1em] text-[#777]">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );
    case 'callout':
      return (
        <aside
          key={index}
          className="my-10 border border-[#d0d0c8] bg-[#e8e8e2] p-6 md:p-8"
        >
          {block.label && (
            <p className="mb-4 font-[var(--font-geist-mono)] text-[0.52rem] uppercase tracking-[0.2em] text-[#888]">
              {block.label}
            </p>
          )}
          <p className="font-[var(--font-geist-mono)] text-[0.68rem] leading-[1.8] text-[#444]">
            {block.text}
          </p>
          {block.items && (
            <ul className="mt-4 list-disc space-y-2 pl-5 font-[var(--font-geist-mono)] text-[0.62rem] uppercase leading-[1.7] text-[#555]">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </aside>
      );
    case 'divider':
      return <hr key={index} className="my-12 border-[#d0d0c8]" />;
  }
}

export default function BlogArticle({ post }: { post: NormalizedBlogPost }) {
  const headings = post.content.filter(
    (block): block is Extract<BlogBlock, { type: 'heading' }> =>
      block.type === 'heading',
  );
  return (
    <main className="bg-[#f5f5f0] text-[#0a0a0a]">
      <PageNavigation
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.category, href: '/blog' },
          { label: post.title },
        ]}
        backHref="/blog"
        backLabel="All notes"
      />
      <article>
        <header className="border-b border-[#d0d0c8] px-6 pb-16 pt-[120px] md:px-[60px] md:pb-24 md:pt-[160px]">
          <div className="mx-auto max-w-[1080px]">
            <p className="mb-8 font-[var(--font-geist-mono)] text-[0.58rem] uppercase tracking-[0.25em] text-[#aaaaaa]">
              {post.kicker} · {post.category} · {post.readingTime}
            </p>
            <h1 className="max-w-[1000px] font-[var(--font-playfair)] text-[clamp(48px,8vw,110px)] font-black leading-[0.92] tracking-[-0.02em]">
              {post.title}
            </h1>
            <p className="mt-10 max-w-[720px] font-[var(--font-geist-mono)] text-[0.72rem] uppercase leading-[1.9] tracking-[0.08em] text-[#666]">
              {post.subtitle}
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-[#d0d0c8] pt-5 font-[var(--font-geist-mono)] text-[0.52rem] uppercase tracking-[0.14em] text-[#777]">
              <Image
                src={post.author.image}
                alt={post.author.name}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
              />
              <span>By {post.author.name}</span>
              <span>·</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span>·</span>
              <span>Updated {formatDate(post.updatedAt)}</span>
            </div>
          </div>
        </header>

        <div className="relative mx-auto flex aspect-[16/7] max-h-[560px] max-w-[1440px] items-center justify-center overflow-hidden bg-[#0a0a0a]">
          {post.image ? (
            <Image
              src={post.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <span className="font-[var(--font-playfair)] text-[clamp(38px,7vw,100px)] font-black leading-none text-[#f5f5f0]">
              {post.category}
            </span>
          )}
        </div>

        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-16 md:grid-cols-[180px_1fr] md:px-10 md:py-24">
          <aside className="self-start md:sticky md:top-24">
            <p className="mb-4 font-[var(--font-geist-mono)] text-[0.5rem] uppercase tracking-[0.2em] text-[#aaaaaa]">
              In this note
            </p>
            <ul className="space-y-3 border-l border-[#d0d0c8] pl-4 font-[var(--font-geist-mono)] text-[0.52rem] uppercase leading-[1.5] tracking-[0.08em] text-[#777]">
              {headings.map((heading) => (
                <li key={heading.text}>{heading.text}</li>
              ))}
            </ul>
          </aside>

          <div className="max-w-[720px]">
            <p className="mb-12 font-[var(--font-geist-mono)] text-[0.75rem] uppercase leading-[2] tracking-[0.06em] text-[#555]">
              {post.excerpt}
            </p>
            {post.content.map(renderBlock)}

            <aside className="border border-[#d0d0c8] bg-[#e8e8e2] p-6 md:p-8">
              <p className="mb-6 font-[var(--font-geist-mono)] text-[0.52rem] uppercase tracking-[0.2em] text-[#888]">
                The short version
              </p>
              <ul className="space-y-4 font-[var(--font-geist-mono)] text-[0.65rem] uppercase leading-[1.8] tracking-[0.05em] text-[#444]">
                {post.takeaways.map((takeaway) => (
                  <li key={takeaway}>→ {takeaway}</li>
                ))}
              </ul>
            </aside>

            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-[#d0d0c8] px-3 py-2 font-[var(--font-geist-mono)] text-[0.5rem] uppercase tracking-[0.14em] text-[#777]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-16 border-t border-[#d0d0c8] pt-8 font-[var(--font-geist-mono)] text-[0.58rem] uppercase tracking-[0.14em] text-[#555]">
              <Link href="/blog">← Back to all notes</Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
