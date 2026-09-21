import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocationPage from '@/components/locations/location-page';
import PageNavigation from '@/components/common/page-navigation';
import { getLocations } from '@/lib/content-data';

type Params = { state: string; city: string };

const baseUrl = 'https://autocraft-phi.vercel.app';

export const dynamicParams = true;
export const dynamic = 'force-dynamic';

export async function generateStaticParams(): Promise<Params[]> {
  return (await getLocations()).map(({ stateSlug, citySlug }) => ({
    state: stateSlug,
    city: citySlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { state, city } = await params;
  const location = (await getLocations()).find((item) => item.stateSlug === state && item.citySlug === city);

  if (!location) return {};

  const title = `IT Services in ${location.city} | SaaS, AI & Web Development`;
  const description = `Auto Craft provides SaaS development, AI automation, and web development for businesses in ${location.city}, ${location.state}. Work with a remote technology partner based in India.`;
  const url = `${baseUrl}/${location.stateSlug}/${location.citySlug}`;

  return {
    title,
    description,
    authors: [{ name: 'Ganesh Sharma' }],
    creator: 'Ganesh Sharma',
    publisher: 'Auto Craft',
    keywords: [
      `IT services in ${location.city}`,
      `software development company ${location.city}`,
      `web development company ${location.city}`,
      `AI automation ${location.city}`,
      `SaaS development ${location.state}`,
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function LocationRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  const { state, city } = await params;
  const locations = await getLocations();
  const location = locations.find((item) => item.stateSlug === state && item.citySlug === city);

  if (!location) notFound();

  const relatedLocations = locations
    .filter(
      (candidate) =>
        candidate.stateSlug === location.stateSlug &&
        candidate.citySlug !== location.citySlug,
    )
    .slice(0, 5);

  const url = `${baseUrl}/${location.stateSlug}/${location.citySlug}`;
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: `IT services in ${location.city}`,
    serviceType: [
      'SaaS development',
      'AI automation',
      'Web development',
    ],
    description: `SaaS development, AI automation, and web development for businesses in ${location.city}, ${location.state}.`,
    author: { '@type': 'Person', name: 'Ganesh Sharma' },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'Auto Craft',
    },
    provider: { '@id': `${baseUrl}/#organization` },
    areaServed: {
      '@type': 'City',
      name: location.city,
      containedInPlace: {
        '@type': 'State',
        name: location.state,
      },
    },
    url,
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: location.state,
        item: `${baseUrl}/${location.stateSlug}`,
      },
      { '@type': 'ListItem', position: 3, name: location.city, item: url },
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
            { label: location.state, href: `/${location.stateSlug}` },
            { label: location.city },
          ]}
          backHref={`/${location.stateSlug}`}
          backLabel={location.state}
        />
        <LocationPage
          location={location}
          relatedLocations={relatedLocations}
        />
      </>
    </>
  );
}
