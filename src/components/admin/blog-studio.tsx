'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import AnalyticsDashboard from '@/components/admin/analytics-dashboard';

const aiSchema = `{
  "slug": "kebab-case-url",
  "kicker": "Editorial category",
  "title": "Clear article title",
  "subtitle": "One-sentence promise for the reader.",
  "excerpt": "A 40–80 word summary for cards and search previews.",
  "category": "AI & Engineering",
  "featured": false,
  "tags": ["tag-one", "tag-two"],
  "publishedAt": "YYYY-MM-DD",
  "updatedAt": "YYYY-MM-DD",
  "readingTime": "8 min read",
  "image": "/images/blog/your-banner.png",
  "author": { "name": "Ganesh Sharma", "role": "Founder, Auto Craft", "image": "/images/ganesh-suit-close-up.PNG" },
  "content": [
    { "type": "heading", "level": 2, "text": "Section heading" },
    { "type": "paragraph", "text": "One focused paragraph of at least 40 words." },
    { "type": "list", "style": "bullet", "items": ["Point one", "Point two"] },
    { "type": "image", "image": { "src": "/images/blog/inline.png", "alt": "Descriptive alt text", "caption": "Optional caption" } },
    { "type": "quote", "text": "A short quote", "attribution": "Optional source" },
    { "type": "callout", "label": "Key idea", "text": "A useful insight", "items": ["Optional item"] },
    { "type": "divider" }
  ],
  "takeaways": ["Takeaway one", "Takeaway two", "Takeaway three"]
}`;

const example = `{
  "slug": "how-ai-agents-use-structured-decisions",
  "kicker": "AI Engineering",
  "title": "How AI agents use structured decisions to become more reliable",
  "subtitle": "Reliable agents need clear decisions, controlled tools, and human review—not just better prompts.",
  "excerpt": "AI agents become safer and easier to operate when their decisions are structured, observable, and connected to explicit workflow boundaries.",
  "category": "AI & Engineering",
  "featured": false,
  "tags": ["ai-agents", "structured-ai", "automation", "llm"],
  "publishedAt": "2026-09-21",
  "updatedAt": "2026-09-21",
  "readingTime": "8 min read",
  "image": "/images/blog/how-ai-agents-use-structured-decisions.png",
  "author": { "name": "Ganesh Sharma", "role": "Founder, Auto Craft", "image": "/images/ganesh-suit-close-up.PNG" },
  "content": [
    { "type": "heading", "level": 2, "text": "Agents need decisions, not endless text" },
    { "type": "paragraph", "text": "An AI agent often needs to choose a tool, classify a request, decide whether to retry, or determine whether a person should review the result. These are decisions that software can act on directly." },
    { "type": "callout", "label": "The practical principle", "text": "Use generative models for language and structured decision models for bounded choices.", "items": ["Define possible outcomes.", "Return a typed result.", "Expose uncertainty.", "Escalate risky cases."] },
    { "type": "heading", "level": 2, "text": "Build for review and recovery" },
    { "type": "paragraph", "text": "Production automation needs visible boundaries. Log the input, decision, confidence, tool call, result, and approval state so the team can understand what happened when a workflow fails." }
  ],
  "takeaways": ["Use structured decisions for bounded agent choices.", "Keep workflow boundaries explicit.", "Send uncertain actions to human review."]
}`;

type Mode = 'json' | 'text';
type StudioState = {
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  category: string;
  tags: string;
  body: string;
  image: string;
};

const emptyText: StudioState = {
  title: '',
  slug: '',
  subtitle: '',
  excerpt: '',
  category: 'AI & Engineering',
  tags: '',
  body: '',
  image: '',
};

function textToPost(state: StudioState) {
  const today = new Date().toISOString().slice(0, 10);
  return {
    slug: state.slug,
    kicker: state.category,
    title: state.title,
    subtitle: state.subtitle,
    excerpt: state.excerpt,
    category: state.category,
    featured: false,
    tags: state.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    publishedAt: today,
    updatedAt: today,
    readingTime: '5 min read',
    image: state.image || null,
    author: {
      name: 'Ganesh Sharma',
      role: 'Founder, Auto Craft',
      image: '/images/ganesh-suit-close-up.PNG',
    },
    content: state.body
      .split(/\n\s*\n/)
      .filter(Boolean)
      .map((text) => ({ type: 'paragraph' as const, text: text.trim() })),
    takeaways: [
      'Add a practical takeaway.',
      'Add a measurable takeaway.',
      'Add a next step for the reader.',
    ],
  };
}

export default function BlogStudio() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [mode, setMode] = useState<Mode>('json');
  const [json, setJson] = useState(example);
  const [text, setText] = useState(emptyText);
  const [message, setMessage] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    fetch('/api/admin/blog')
      .then((response) => {
        if (response.ok) setAuthenticated(true);
        else router.replace('/studio');
      })
      .catch(() => router.replace('/studio'));
  }, [router]);

  const parsed = useMemo(() => {
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  }, [json]);

  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    const response = await fetch('/api/admin/blog/upload', {
      method: 'POST',
      body: form,
    });
    const result = await response.json();
    if (!response.ok) return setMessage(result.error || 'Upload failed.');
    setJson((current) =>
      JSON.stringify(
        { ...(JSON.parse(current) || {}), image: result.imagePath },
        null,
        2,
      ),
    );
    setMessage(`Uploaded ${result.imagePath}`);
  }

  async function publish() {
    const post = mode === 'json' ? parsed : textToPost(text);
    if (!post) return setMessage('The JSON is invalid.');
    const response = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    const result = await response.json();
    setMessage(
      response.ok
        ? `Published. Storage: ${result.storage}. Newest posts are sorted first.`
        : result.error || 'Publish failed.',
    );
  }

  if (authenticated !== true) return null;

  return (
    <main className="min-h-screen bg-[#f5f5f0] px-6 py-20 text-[#0a0a0a] md:px-[60px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#d0d0c8] pb-8">
          <div>
            <p className="mb-4 font-[var(--font-geist-mono)] text-xs uppercase tracking-[0.2em] text-[#777]">
              Private / Blog Studio
            </p>
            <h1 className="font-[var(--font-playfair)] text-6xl font-black">
              Publish a note.
            </h1>
          </div>
          <button
            onClick={() =>
              fetch('/api/admin/login', { method: 'DELETE' }).then(() =>
                setAuthenticated(false),
              )
            }
            className="border border-[#0a0a0a] px-4 py-3 font-[var(--font-geist-mono)] text-xs uppercase"
          >
            Sign out
          </button>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <section>
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => setMode('json')}
                className={`border px-4 py-3 font-[var(--font-geist-mono)] text-xs uppercase ${mode === 'json' ? 'bg-[#0a0a0a] text-white' : ''}`}
              >
                JSON paste
              </button>
              <button
                onClick={() => setMode('text')}
                className={`border px-4 py-3 font-[var(--font-geist-mono)] text-xs uppercase ${mode === 'text' ? 'bg-[#0a0a0a] text-white' : ''}`}
              >
                Text editor
              </button>
            </div>
            {mode === 'json' ? (
              <textarea
                value={json}
                onChange={(event) => setJson(event.target.value)}
                className="min-h-[720px] w-full border border-[#aaa] bg-[#fff] p-5 font-mono text-sm leading-7"
                spellCheck={false}
              />
            ) : (
              <div className="space-y-3">
                {(
                  [
                    'title',
                    'slug',
                    'subtitle',
                    'excerpt',
                    'category',
                    'tags',
                    'image',
                  ] as const
                ).map((field) => (
                  <input
                    key={field}
                    value={text[field]}
                    onChange={(event) =>
                      setText({ ...text, [field]: event.target.value })
                    }
                    placeholder={field}
                    className="w-full border border-[#aaa] bg-white p-3 font-[var(--font-geist-mono)] text-sm"
                  />
                ))}
                <textarea
                  value={text.body}
                  onChange={(event) =>
                    setText({ ...text, body: event.target.value })
                  }
                  placeholder="Write paragraphs here. Separate paragraphs with a blank line."
                  className="min-h-[450px] w-full border border-[#aaa] bg-white p-4 font-[var(--font-geist-mono)] text-sm leading-7"
                />
              </div>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <label className="cursor-pointer border border-[#0a0a0a] px-4 py-3 font-[var(--font-geist-mono)] text-xs uppercase">
                Upload image
                <input
                  type="file"
                  accept="image/*"
                  onChange={upload}
                  className="hidden"
                />
              </label>
              <button
                onClick={publish}
                className="bg-[#0a0a0a] px-5 py-3 font-[var(--font-geist-mono)] text-xs uppercase text-white"
              >
                Publish blog
              </button>
              <span className="font-[var(--font-geist-mono)] text-xs text-[#777]">
                {message}
              </span>
            </div>
          </section>
          <aside>
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="w-full border border-[#aaa] p-4 text-left font-[var(--font-geist-mono)] text-xs uppercase tracking-[0.12em]"
            >
              AI schema & example {showGuide ? '−' : '+'}
            </button>
            {showGuide && (
              <div className="mt-3 space-y-4">
                <button
                  onClick={() => navigator.clipboard.writeText(aiSchema)}
                  className="border border-[#aaa] px-3 py-2 font-[var(--font-geist-mono)] text-xs uppercase"
                >
                  Copy schema
                </button>
                <pre className="max-h-[380px] overflow-auto whitespace-pre-wrap border border-[#d0d0c8] bg-white p-3 text-[11px] leading-5">
                  {aiSchema}
                </pre>
                <button
                  onClick={() => navigator.clipboard.writeText(example)}
                  className="border border-[#aaa] px-3 py-2 font-[var(--font-geist-mono)] text-xs uppercase"
                >
                  Copy example JSON
                </button>
                <pre className="max-h-[500px] overflow-auto whitespace-pre-wrap border border-[#d0d0c8] bg-white p-3 text-[11px] leading-5">
                  {example}
                </pre>
              </div>
            )}
          </aside>
        </div>
        <AnalyticsDashboard />
      </div>
    </main>
  );
}
