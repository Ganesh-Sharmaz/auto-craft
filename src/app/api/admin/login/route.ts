import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE,
  createAdminToken,
  isAdminPasswordValid,
} from '@/lib/blog-admin';

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  if (!isAdminPasswordValid(body.password || ''))
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createAdminToken(), {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ADMIN_COOKIE);
  return response;
}
