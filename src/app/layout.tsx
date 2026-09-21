import type { Metadata } from 'next';
import { Playfair_Display, Geist_Mono } from 'next/font/google';
import './globals.css';
import Cursor from '@/components/cursor/cursor';
import { Analytics } from '@vercel/analytics/next';
import { ContactModalProvider } from '@/components/common/contact-modal';
import ContactModalTrigger from '@/components/common/contact-modal-trigger';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://autocraft-phi.vercel.app'),
  title: 'Auto Craft | SaaS, AI Automation & Web Development India',
  description:
    'Auto Craft builds SaaS products, AI automations, and high-performance websites for businesses across India. Based in Indrapuram, Ghaziabad.',
  keywords: [
    'SaaS development India',
    'AI automation company India',
    'web development company India',
    'software development Ghaziabad',
    'Auto Craft',
  ],
  authors: [{ name: 'Ganesh Sharma' }],
  creator: 'Ganesh Sharma',
  publisher: 'Auto Craft',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://autocraft-phi.vercel.app/',
    title: 'Auto Craft | SaaS, AI Automation & Web Development India',
    description:
      'Top-rated SaaS development, AI automation & web design agency based in Ghaziabad. Serving businesses across all 28 states of India.',
    siteName: 'Auto Craft',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto Craft | SaaS, AI Automation & Web Development India',
    description:
      'SaaS products, AI automations, and high-performance websites by Auto Craft.',
  },
  other: {
    'geo.region': 'IN-UP',
    'geo.placename': 'Indrapuram, Ghaziabad, Uttar Pradesh, India',
    'geo.position': '28.6692;77.3663',
    ICBM: '28.6692, 77.3663',
    'google-site-verification': 'vEgABVsm4TQ0XVMHk44XQKc0UxIXzyMTesJdQwcqyFI',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://autocraft-phi.vercel.app/#organization',
  name: 'Auto Craft',
  alternateName: [
    'AutoCraft India',
    'Auto Craft Ghaziabad',
    'Auto Craft IT Services',
  ],
  description:
    "Auto Craft is India's best SaaS development, AI automation, and web presence agency.",
  url: 'https://autocraft-phi.vercel.app',
  telephone: ['+916306450212', '+918802130983'],
  email: 'ganesh.sharma.work@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Indrapuram',
    addressLocality: 'Ghaziabad',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201014',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.6692,
    longitude: 77.3663,
  },
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'State', name: 'Uttar Pradesh' },
    { '@type': 'State', name: 'Delhi' },
    { '@type': 'State', name: 'Maharashtra' },
    { '@type': 'State', name: 'Karnataka' },
    { '@type': 'State', name: 'Tamil Nadu' },
    { '@type': 'State', name: 'Telangana' },
    { '@type': 'State', name: 'Gujarat' },
    { '@type': 'State', name: 'Rajasthan' },
    { '@type': 'State', name: 'West Bengal' },
    { '@type': 'State', name: 'Bihar' },
    { '@type': 'State', name: 'Punjab' },
    { '@type': 'State', name: 'Haryana' },
    { '@type': 'State', name: 'Kerala' },
    { '@type': 'State', name: 'Andhra Pradesh' },
    { '@type': 'State', name: 'Odisha' },
    { '@type': 'State', name: 'Madhya Pradesh' },
    { '@type': 'State', name: 'Chhattisgarh' },
    { '@type': 'State', name: 'Assam' },
    { '@type': 'State', name: 'Jharkhand' },
    { '@type': 'State', name: 'Uttarakhand' },
    { '@type': 'State', name: 'Himachal Pradesh' },
    { '@type': 'State', name: 'Goa' },
    { '@type': 'State', name: 'Tripura' },
    { '@type': 'State', name: 'Meghalaya' },
    { '@type': 'State', name: 'Manipur' },
    { '@type': 'State', name: 'Nagaland' },
    { '@type': 'State', name: 'Mizoram' },
    { '@type': 'State', name: 'Arunachal Pradesh' },
    { '@type': 'State', name: 'Sikkim' },
  ],
  sameAs: [
    'https://linkedin.com/in/ganesh-sharmaz',
    'https://linkedin.com/in/dharmendra-dxy',
    'https://github.com/Ganesh-Sharmaz',
    'https://github.com/dharmendra-dxy',
    'https://x.com/Ganesh_Sharmazz',
    'https://x.com/dharmendra_dxy',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is the best IT services company in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Auto Craft, based in Indrapuram, Ghaziabad, is one of India's best IT services companies offering SaaS development, AI automation, and web design across all 28 states.",
      },
    },
    {
      '@type': 'Question',
      name: 'Who is the best AI automation company in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Auto Craft is a leading AI automation company in India, building intelligent workflows for businesses across Delhi, Mumbai, Bangalore, Hyderabad, and all states.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is the best SaaS developer in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Auto Craft (Ghaziabad, UP) specializes in full-stack SaaS product development, serving startups and businesses across India. Contact: +91 63064 50212.',
      },
    },
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://autocraft-phi.vercel.app/#website',
  name: 'Auto Craft',
  alternateName: 'Auto Craft India',
  url: 'https://autocraft-phi.vercel.app/',
  author: {
    '@type': 'Person',
    name: 'Ganesh Sharma',
  },
  publisher: {
    '@type': 'Organization',
    '@id': 'https://autocraft-phi.vercel.app/#organization',
    name: 'Auto Craft',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" itemScope itemType="https://schema.org/LocalBusiness">
      <head>
        <link rel="icon" href="/images/ACNeww.ico" type="image/x-icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${playfair.variable} ${geistMono.variable} font-geist`}>
        <Analytics />
        <Cursor />
        {/* ContactModalProvider wraps everything so any child can call useContactModal() */}
        <ContactModalProvider>
          <div className="w-screen overflow-clip">
            {children}
            {/* Auto-triggers the modal nudge after 25s, then every 90s */}
          </div>
          <ContactModalTrigger />
        </ContactModalProvider>
      </body>
    </html>
  );
}
