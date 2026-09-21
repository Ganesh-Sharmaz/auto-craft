import { NextResponse } from 'next/server';
import { getAnalyticsSummary } from '@/lib/analytics';
import { isAdminRequest } from '@/lib/blog-admin';

export const runtime = 'nodejs';

export async function GET() {
  if (!(await isAdminRequest())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const summary = await getAnalyticsSummary();
  if (!summary) return NextResponse.json({ error: 'Firebase analytics is not configured yet.' }, { status: 503 });
  return NextResponse.json({ summary }, { headers: { 'Cache-Control': 'no-store' } });
}
