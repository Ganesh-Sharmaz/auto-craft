import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StatePage from '@/components/locations/state-page';
import PageNavigation from '@/components/common/page-navigation';
import { getLocations, getStates } from '@/lib/content-data';

type Params = { state: string };
const baseUrl = 'https://autocraft-phi.vercel.app';

export const dynamicParams = true;
export const dynamic = 'force-dynamic';

export async function generateStaticParams(): Promise<Params[]> {
  return (await getStates()).map(({ stateSlug }) => ({ state: stateSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = (await getStates()).find((item) => item.stateSlug === stateSlug);
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
  const [states, locations] = await Promise.all([getStates(), getLocations()]);
  const state = states.find((item) => item.stateSlug === stateSlug);
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
      <>
        <PageNavigation
          items={[
            { label: 'Home', href: '/' },
            { label: 'Locations', href: '/locations' },
            { label: state.state },
          ]}
          backHref="/locations"
          backLabel="Locations"
        />
        <StatePage state={state} cities={cities} />
      </>
    </>
  );
}
