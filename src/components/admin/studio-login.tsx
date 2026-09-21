'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function StudioLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function login(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (response.ok) router.replace('/studio/blog');
    else setMessage('Invalid password.');
  }

  return (
    <main className="min-h-screen bg-[#f5f5f0] px-6 py-32 text-[#0a0a0a] md:px-[60px]">
      <div className="mx-auto max-w-md">
        <p className="mb-6 font-[var(--font-geist-mono)] text-xs uppercase tracking-[0.2em] text-[#777]">Private / Studio</p>
        <h1 className="font-[var(--font-playfair)] text-6xl font-black">Sign in.</h1>
        <form onSubmit={login} className="mt-10 space-y-4">
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Studio password" autoFocus className="w-full border border-[#aaa] bg-transparent p-4 font-[var(--font-geist-mono)]" />
          <button className="w-full bg-[#0a0a0a] p-4 font-[var(--font-geist-mono)] text-xs uppercase tracking-[0.18em] text-white">Enter studio</button>
          <p aria-live="polite" className="font-[var(--font-geist-mono)] text-xs text-[#777]">{message}</p>
        </form>
      </div>
    </main>
  );
}
