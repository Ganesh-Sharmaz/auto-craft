import { NextResponse } from 'next/server';
import { recordPageView } from '@/lib/analytics';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      path?: string;
      referrer?: string;
      sessionId?: string;
    };
    if (
      !body.path ||
      !body.path.startsWith('/') ||
      body.path.length > 500 ||
      !body.sessionId ||
      !/^[a-zA-Z0-9_-]{16,80}$/.test(body.sessionId)
    ) {
      return NextResponse.json({ error: 'Invalid analytics event.' }, { status: 400 });
    }

    const stored = await recordPageView({
      path: body.path,
      referrer: body.referrer?.slice(0, 500) || null,
      sessionId: body.sessionId,
      day: new Date().toISOString().slice(0, 10),
    });
    return NextResponse.json({ ok: true, stored });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
