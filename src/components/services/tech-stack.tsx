'use client';

type ServiceType = 'saas' | 'ai' | 'web';

const techStacks = {
  saas: {
    label: 'SaaS Tech Stack',
    items: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'Python',
      'FastAPI',
      'Flask',
      'MongoDB',
      'PostgreSQL',
      'Redis',
      'TanStack Query',
      'TailwindCSS',
      'NextAuth',
      'Razorpay',
      'Stripe',
      'Docker',
      'Digital Ocean',
      'Vercel',
      'GitHub CI/CD',
      'WebSockets',
    ],
  },

  ai: {
    label: 'AI & Automation Stack',
    items: [
      'Python',
      'LangChain',
      'OpenAI API',
      'Gemini API',
      'Claude API',
      'FastAPI',
      'Celery',
      'Redis Queue',
      'WhatsApp Cloud API',
      'Meta Business API',
      'WebSockets',
      'Webhooks',
      'n8n',
      'Zapier-style Logic',
      'MongoDB',
      'PostgreSQL',
      'Docker',
      'GitHub Actions',
    ],
  },

  web: {
    label: 'Web Tech Stack',
    items: [
      'Next.js',
      'React',
      'TypeScript',
      'TailwindCSS',
      'Framer Motion',
      'HTML5 / CSS3',
      'SSR / SSG',
      'JSON-LD',
      'Schema.org',
      'Vercel',
      'Cloudflare',
      'Google Analytics 4',
      'Lighthouse',
      'Jest',
      'ESLint',
      'Husky',
    ],
  },
} as const;

export default function TechStack({ type }: Readonly<{ type: ServiceType }>) {
  const data = techStacks[type];

  return (
    <section
      style={{
        padding: '80px 60px',
        borderBottom: '1px solid #d0d0c8',
        background: '#e8e8e2',
      }}
      className="max-sm:!px-6 max-sm:!py-[60px]"
    >
      <div
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#aaaaaa',
          marginBottom: '40px',
        }}
      >
        {data.label}
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        {data.items.map((tech) => (
          <span
            key={tech}
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.5rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#0a0a0a',
              border: '1px solid #d0d0c8',
              padding: '8px 20px',
              background: '#f5f5f0',
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
