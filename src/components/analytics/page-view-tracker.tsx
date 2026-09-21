'use client';

import { logEvent } from 'firebase/analytics';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { getFirebaseAnalytics } from '@/lib/firebase/client';

function getSessionId() {
  const key = 'auto-craft-analytics-session';
  const existing = window.sessionStorage.getItem(key);
  if (existing) return existing;
  const value = `${crypto.randomUUID().replaceAll('-', '')}`;
  window.sessionStorage.setItem(key, value);
  return value;
}

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith('/studio') || pathname.startsWith('/analytics') || pathname.startsWith('/api')) return;
    const event = {
      path: pathname,
      referrer: document.referrer,
      sessionId: getSessionId(),
    };
    void fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
      keepalive: true,
    }).catch(() => undefined);

    void getFirebaseAnalytics().then((analytics) => {
      if (analytics) logEvent(analytics, 'page_view', { page_path: pathname });
    }).catch(() => undefined);
  }, [pathname]);

  return null;
}
