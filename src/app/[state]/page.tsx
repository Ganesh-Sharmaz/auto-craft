import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import locations from '@/data/location-pages.json';
import states from '@/data/state-pages.json';
import StatePage from '@/components/locations/state-page';

type Params = { state: string };
type State = (typeof states)[number];
const baseUrl = 'https://autocraft-phi.vercel.app';

function getState(stateSlug: string): State | undefined {
  return states.find((state) => state.stateSlug === stateSlug);
}

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return states.map(({ stateSlug }) => ({ state: stateSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = getState(stateSlug);
  if (!state) return {};

  const title = `IT Services & AI Automation in ${state.state} | Auto Craft`;
  const description = `Auto Craft provides SaaS development, AI automation, and web development for businesses across ${state.state}. Remote technology support from India.`;
  const url = `${baseUrl}/${state.stateSlug}`;

  return {
    title,
    description,
    authors: [{ name: 'Ganesh Sharma' }],
    creator: 'Ganesh Sharma',
    publisher: 'Auto Craft',
    keywords: [
      `IT services in ${state.state}`,
      `AI automation ${state.state}`,
      `SaaS development ${state.state}`,
      `software development company ${state.state}`,
      `web development company ${state.state}`,
    ],
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function StateRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  const { state: stateSlug } = await params;
  const state = getState(stateSlug);
  if (!state) notFound();

  const cities = locations.filter(
    (location) => location.stateSlug === state.stateSlug,
  );
  const url = `${baseUrl}/${state.stateSlug}`;
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: `IT services in ${state.state}`,
    serviceType: state.focus,
    description: state.summary,
    author: { '@type': 'Person', name: 'Ganesh Sharma' },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'Auto Craft',
    },
    provider: { '@id': `${baseUrl}/#organization` },
    areaServed: { '@type': 'State', name: state.state },
    url,
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: state.state, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceSchema, breadcrumbSchema]),
        }}
      />
      <StatePage state={state} cities={cities} />
    </>
  );
}
