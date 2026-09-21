import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.37', '192.168.1.36'],
  images: {
    localPatterns: [{ pathname: '/images/**' }],
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/home.html', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/services.html', destination: '/services', permanent: true },
      { source: '/pricing.html', destination: '/pricing', permanent: true },
    ];
  },
};

export default nextConfig;
