'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Summary = {
  totalViews: number;
  viewsToday: number;
  uniqueSessions: number;
  uniqueSessionsToday: number;
  topPages: Array<{ path: string; views: number }>;
  recent: Array<{ path: string; day: string; referrer: string | null }>;
  sampledEvents: number;
};

export default function AnalyticsDashboard() {
  const router = useRouter();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [message, setMessage] = useState('Loading analytics…');

  useEffect(() => {
    fetch('/api/admin/analytics', { cache: 'no-store' })
      .then(async (response) => {
        const result = await response.json();
        if (response.status === 401) {
          router.replace('/studio');
          return;
        }
        if (!response.ok) throw new Error(result.error || 'Analytics unavailable.');
        setSummary(result.summary);
        setMessage('Last 30 days');
      })
      .catch((error: Error) => setMessage(error.message));
  }, [router]);

  if (!summary)
    return <section className="mt-8 border border-[#d0d0c8] p-6 font-[var(--font-geist-mono)] text-xs text-[#777]">{message}</section>;

  const cards = [
    ['Views / 30 days', summary.totalViews],
    ['Views today', summary.viewsToday],
    ['Unique sessions', summary.uniqueSessions],
    ['Sessions today', summary.uniqueSessionsToday],
  ];

  return (
    <section className="mt-8 border-y border-[#d0d0c8] py-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="font-[var(--font-geist-mono)] text-xs uppercase tracking-[0.2em] text-[#777]">Private / Analytics</p>
          <h2 className="mt-2 font-[var(--font-playfair)] text-4xl font-black">What readers open.</h2>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-[var(--font-geist-mono)] text-[10px] uppercase text-[#777]">{message}</p>
          <button
            onClick={() =>
              fetch('/api/admin/login', { method: 'DELETE' }).then(() =>
                router.replace('/studio'),
              )
            }
            className="border border-[#0a0a0a] px-3 py-2 font-[var(--font-geist-mono)] text-[10px] uppercase tracking-[0.12em]"
          >
            Log out
          </button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([label, value]) => (
          <div key={label} className="border border-[#d0d0c8] bg-white p-4">
            <p className="font-[var(--font-geist-mono)] text-[10px] uppercase tracking-[0.12em] text-[#777]">{label}</p>
            <p className="mt-3 text-3xl font-black">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 font-[var(--font-geist-mono)] text-xs uppercase tracking-[0.15em]">Top pages</h3>
          <div className="divide-y divide-[#e2e2dc] border border-[#d0d0c8] bg-white">
            {summary.topPages.map((page) => (
              <div key={page.path} className="flex justify-between gap-4 p-3 font-[var(--font-geist-mono)] text-xs"><span className="truncate">{page.path}</span><span>{page.views}</span></div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-[var(--font-geist-mono)] text-xs uppercase tracking-[0.15em]">Recent activity</h3>
          <div className="divide-y divide-[#e2e2dc] border border-[#d0d0c8] bg-white">
            {summary.recent.map((event, index) => (
              <div key={`${event.path}-${event.day}-${index}`} className="flex justify-between gap-4 p-3 font-[var(--font-geist-mono)] text-xs"><span className="truncate">{event.path}</span><span>{event.day}</span></div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 font-[var(--font-geist-mono)] text-[10px] text-[#777]">Dashboard data is sampled from the latest {summary.sampledEvents} recorded events. Studio and API traffic is excluded.</p>
    </section>
  );
}
