'use client';

import {
  ArrowRight,
  LayoutGrid,
  Code2,
  Search,
  Monitor,
  Activity,
  Sun,
  Layers,
  Mail,
  Share2,
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type ServiceType = 'saas' | 'ai' | 'web';

type IncludedCard = {
  title: string;
  desc: string;
  points: string[];
  icon: React.ReactNode;
};

type ServiceContent = {
  id: string;
  dark: boolean;
  label: string;
  seoLine: string;
  headlineTop: string;
  headlineItalic: string;
  description: string;
  cta: string;
  techLabel: string;
  techStack: string[];
  included: IncludedCard[];
};

export function StartCTA({
  href,
  children,
  primary = true,
}: Readonly<{
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}>) {
  return (
    <a
      href={href}
      className="items-center justify-center gap-2"
      style={{
        display: 'flex',
        background: primary ? '#0a0a0a' : 'transparent',
        color: primary ? '#f5f5f0' : '#0a0a0a',
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '8.8px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        padding: '14px 32px',
        border: primary ? '1px solid #333' : '1px solid  #d0d0c8',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        if (primary) {
          el.style.background = '#f5f5f0';
          el.style.color = '#0a0a0a';
        } else {
          el.style.background = 'black';
          el.style.color = '#f5f5f0';
          el.style.borderColor = '#0a0a0a';
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        if (primary) {
          el.style.background = '#0a0a0a';
          el.style.color = '#f5f5f0';
        } else {
          el.style.background = '';
          el.style.color = '#0a0a0a';
          el.style.borderColor = '#d0d0c8';
        }
      }}
    >
      {children}
    </a>
  );
}

const services: Record<ServiceType, ServiceContent> = {
  saas: {
    id: 'saas',
    dark: true,
    label: '01 / SaaS Products',
    seoLine:
      'SaaS Development India · Full-Stack Platforms · Best SaaS Developer India',
    headlineTop: 'Products that',
    headlineItalic: 'serve thousands.',
    description:
      "We architect, design, and ship production-grade SaaS platforms from the ground up. Whether you're a startup launching your first product or an enterprise modernising legacy software, we build systems that scale with you — not against you. Serving clients from Delhi, Mumbai, Bangalore, Hyderabad, Pune, Chennai, and all 28 states.",
    cta: 'Start a SaaS Project',
    techLabel: 'SaaS Tech Stack',
    techStack: [
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
    included: [
      {
        title: 'Architecture & Planning',
        desc: 'We design the entire system before writing a single line of code. Database schemas, API structures, auth flows, scalability plans — everything mapped out with precision.',
        points: [
          'System design & database architecture',
          'API design & documentation',
          'Auth strategy (OAuth, FIDO2, JWT, PASSKEYS)',
          'Infrastructure planning (AWS / DO / Vercel)',
          'Scalability roadmap',
        ],
        icon: <LayoutGrid size={18} strokeWidth={1.5} />,
      },
      {
        title: 'Full-Stack Development',
        desc: 'End-to-end engineering from pixel-perfect frontends to battle-tested backends. No shortcuts. No tech debt passed to you. Every feature production-ready on day one.',
        points: [
          'Next.js / React frontend with TypeScript',
          'Node.js / Python / FastAPI backend',
          'MongoDB / PostgreSQL / Redis databases',
          'Payment integrations (Razorpay, Stripe)',
          'Real-time features (WebSockets)',
        ],
        icon: <Code2 size={18} strokeWidth={1.5} />,
      },
      {
        title: 'Enterprise Features',
        desc: 'The features that separate a demo from a product businesses actually pay for. RBAC, multi-tenancy, audit logs, team management, and admin dashboards built right.',
        points: [
          'Role-based access control (RBAC)',
          'Multi-tenant architecture',
          'Admin dashboards & CRM panels',
          'Audit logs & activity tracking',
          'Subscription & billing management',
        ],
        icon: <Sun size={18} strokeWidth={1.5} />,
      },
    ],
  },

  ai: {
    id: 'ai',
    dark: false,
    label: '02 / AI Automations',
    seoLine:
      'AI Automation India · Workflow Automation · Best AI Company India',
    headlineTop: 'Automate the',
    headlineItalic: 'ordinary.',
    description:
      'We build intelligent automation systems that eliminate repetitive work, reduce human error, and free your team to focus on what actually matters. From LLM-powered document processing to end-to-end business workflow automation — we connect the tools your business already uses into one intelligent system. India-wide delivery from our Ghaziabad base.',
    cta: 'Start an AI Project',
    techLabel: 'AI & Automation Stack',
    techStack: [
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
    included: [
      {
        title: 'LLM-Powered Workflows',
        desc: 'Integrate GPT-4, Gemini, Claude, and other LLMs directly into your business processes. Document summarisation, content generation, smart classification, and natural language interfaces — all automated.',
        points: [
          'AI document processing & extraction',
          'Automated content generation pipelines',
          'Smart email / ticket triage systems',
          'LLM-powered customer support bots',
          'Natural language data querying',
        ],
        icon: <Layers size={18} strokeWidth={1.5} />,
      },
      {
        title: 'Business Process Automation',
        desc: 'Map your manual workflows. Identify the repetition. We build the automation. From lead management to invoice generation, report compilation to data sync — we turn your ops into a machine.',
        points: [
          'CRM & lead automation pipelines',
          'Invoice & report generation',
          'Multi-channel messaging automation',
          'Data sync across business tools',
          'Scheduled tasks & cron job systems',
        ],
        icon: <Mail size={18} strokeWidth={1.5} />,
      },
      {
        title: 'API & Integration Automation',
        desc: 'Connect your entire business stack. WhatsApp, Slack, email, payment gateways, ERPs, spreadsheets — we build the glue layer that makes everything talk to each other without human intervention.',
        points: [
          'WhatsApp Business API automation',
          'Payment gateway event handling',
          'Webhook-driven event systems',
          'Third-party API integrations',
          'Data pipeline automation',
        ],
        icon: <Share2 size={18} strokeWidth={1.5} />,
      },
    ],
  },

  web: {
    id: 'web',
    dark: true,
    label: '03 / Web Presence',
    seoLine: 'Web Development India · SEO · High-Converting Websites India',
    headlineTop: 'First impressions',
    headlineItalic: 'done right.',
    description:
      'Your website is your best salesperson. We build sites that load fast, rank high, convert visitors, and look stunning on every device. From Lighthouse-optimized SEO platforms to editorial portfolios and enterprise landing pages — every pixel is intentional. We serve businesses from every Indian state and deliver internationally.',
    cta: 'Start a Web Project',
    techLabel: 'Web Tech Stack',
    techStack: [
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
    included: [
      {
        title: 'SEO-First Development',
        desc: 'We don"t add SEO after building. We build with SEO baked in from line one. Server-side rendering, structured data, Core Web Vitals optimisation, and semantic HTML that Google loves.',
        points: [
          'SSR / SSG with Next.js for top rankings',
          'JSON-LD structured data & schema markup',
          'Metadata & OpenGraph optimisation',
          'Core Web Vitals: LCP / CLS / INP',
          'Lighthouse scores 90+',
        ],
        icon: <Search size={18} strokeWidth={1.5} />,
      },
      {
        title: 'Design & UX',
        desc: 'Distinctive design that doesn"t look like a template. We create identities, visual systems, and user experiences that make your brand unforgettable — without sacrificing speed or accessibility.',
        points: [
          'Custom UI design (no templates)',
          'Responsive across all devices',
          'Accessibility standards (WCAG)',
          'Animation & micro-interactions',
          'Brand identity integration',
        ],
        icon: <Monitor size={18} strokeWidth={1.5} />,
      },
      {
        title: 'Performance & Conversion',
        desc: 'A beautiful site that doesn"t convert is a liability. We engineer for outcomes — fast load times, clear CTAs, A/B-ready structures, and analytics that show you exactly what"s working.',
        points: [
          'Sub-2s load times, globally',
          'Conversion-optimized layouts & CTAs',
          'Google Analytics 4 integration',
          'Ad management with zero CLS',
          'Ongoing performance monitoring',
        ],
        icon: <Activity size={18} strokeWidth={1.5} />,
      },
    ],
  },
};

export default function ServiceSection({
  type,
}: Readonly<{
  type: ServiceType;
}>) {
  const data = services[type];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id={data.id}>
      {/* HEADER */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          padding: '100px 60px',
          background: data.dark ? '#0a0a0a' : '#f5f5f0',
          color: data.dark ? '#f5f5f0' : '#0a0a0a',
          gap: '60px',
          borderBottom: '1px solid #d0d0c8',
        }}
        className="max-sm:!grid-cols-1 max-sm:!px-6 max-sm:!py-16"
      >
        <div
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: data.dark ? '#555' : '#aaaaaa',
          }}
        >
          {data.label}
        </div>

        <div>
          <div
            style={{
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: data.dark ? '#555' : '#aaaaaa',
              marginBottom: '16px',
            }}
          >
            {data.seoLine}
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(36px, 5vw, 68px)',
              fontWeight: 900,
              lineHeight: 1,
              marginBottom: '32px',
            }}
          >
            {data.headlineTop}
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 400 }}>
              {data.headlineItalic}
            </em>
          </h2>

          <p
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              lineHeight: 2.2,
              textTransform: 'uppercase',
              fontFamily: 'var(--font-geist-mono)',
              color: data.dark ? '#555' : '#aaaaaa',
              maxWidth: '560px',
              marginBottom: '40px',
            }}
          >
            {data.description}
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <StartCTA
              href="/contact"
              primary={type === 'saas' || type === 'web'}
            >
              {data.cta} <ArrowRight className="h-2.5 w-2.5 font-semibold" />
            </StartCTA>
          </div>
        </div>
      </motion.div>

      {/* INCLUDED GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          borderBottom: '1px solid #d0d0c8',
        }}
        className="max-sm:!grid-cols-1"
      >
        {data.included.map((item, index) => (
          <div
            key={index}
            style={{
              padding: '60px 52px',
              borderRight:
                index !== data.included.length - 1
                  ? '1px solid #d0d0c8'
                  : 'none',
            }}
            className="max-sm:!border-r-0 max-sm:!border-b max-sm:!border-[#d0d0c8]"
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid #d0d0c8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
              }}
            >
              {item.icon}
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(18px, 2vw, 26px)',
                fontWeight: 900,
                marginBottom: '20px',
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.1em',
                lineHeight: 2.2,
                fontFamily: 'var(--font-geist-mono)',
                textTransform: 'uppercase',
                color: '#aaaaaa',
                marginBottom: '20px',
              }}
            >
              {item.desc}
            </p>

            <ul className="space-y-2">
              {item.points.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 border-t border-[#ebebea] pt-2"
                  style={{
                    fontSize: '0.5rem',
                    letterSpacing: '0.12em',
                    fontFamily: 'var(--font-geist-mono)',
                    textTransform: 'uppercase',
                    color: '#aaaaaa',
                  }}
                >
                  <ArrowRight size={6} className="mt-[2px]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* TECH STACK */}
      <div
        style={{
          padding: '80px 60px',
          background: '#e8e8e2',
          borderBottom: '1px solid #d0d0c8',
        }}
        className="max-sm:!px-6 max-sm:!py-16"
      >
        <div
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#aaaaaa',
            marginBottom: '40px',
          }}
        >
          {data.techLabel}
        </div>

        <div className="flex flex-wrap gap-3">
          {data.techStack.map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: '0.5rem',
                letterSpacing: '0.15em',
                fontFamily: 'var(--font-geist-mono)',
                textTransform: 'uppercase',
                border: '1px solid #d0d0c8',
                padding: '8px 20px',
                background: '#f5f5f0',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
