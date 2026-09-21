import type { Metadata } from 'next';
import AnalyticsDashboard from '@/components/admin/analytics-dashboard';

export const metadata: Metadata = {
  title: 'Analytics | Auto Craft',
  robots: { index: false, follow: false },
};

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f0] px-6 py-20 text-[#0a0a0a] md:px-[60px]">
      <div className="mx-auto max-w-[1200px]">
        <AnalyticsDashboard />
      </div>
    </main>
  );
}
