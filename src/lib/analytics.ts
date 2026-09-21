import { FieldValue } from 'firebase-admin/firestore';
import { getFirebaseAdminFirestore } from '@/lib/firebase/admin';

export type AnalyticsEvent = {
  path: string;
  referrer: string | null;
  sessionId: string;
  day: string;
  createdAt?: unknown;
};

export async function recordPageView(event: Omit<AnalyticsEvent, 'createdAt'>) {
  const db = getFirebaseAdminFirestore();
  if (!db) return false;
  await db.collection('analyticsEvents').add({
    ...event,
    createdAt: FieldValue.serverTimestamp(),
  });
  return true;
}

export async function getAnalyticsSummary() {
  const db = getFirebaseAdminFirestore();
  if (!db) return null;

  const snapshot = await db
    .collection('analyticsEvents')
    .orderBy('createdAt', 'desc')
    .limit(5000)
    .get();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const cutoffDay = cutoff.toISOString().slice(0, 10);
  const events = snapshot.docs
    .map((doc) => doc.data() as AnalyticsEvent)
    .filter((event) => event.day >= cutoffDay);

  const today = new Date().toISOString().slice(0, 10);
  const pageCounts = new Map<string, number>();
  const sessions = new Set<string>();
  const todaySessions = new Set<string>();
  for (const event of events) {
    pageCounts.set(event.path, (pageCounts.get(event.path) || 0) + 1);
    sessions.add(event.sessionId);
    if (event.day === today) todaySessions.add(event.sessionId);
  }

  return {
    totalViews: events.length,
    viewsToday: events.filter((event) => event.day === today).length,
    uniqueSessions: sessions.size,
    uniqueSessionsToday: todaySessions.size,
    topPages: [...pageCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([path, views]) => ({ path, views })),
    recent: events.slice(0, 12).map((event) => ({
      path: event.path,
      day: event.day,
      referrer: event.referrer,
    })),
    sampledEvents: snapshot.size,
  };
}
