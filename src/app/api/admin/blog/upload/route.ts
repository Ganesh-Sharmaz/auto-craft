import { NextResponse } from 'next/server';
import { isAdminRequest, saveImage } from '@/lib/blog-admin';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!(await isAdminRequest()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File) || !file.type.startsWith('image/'))
    return NextResponse.json(
      { error: 'Please upload an image file.' },
      { status: 400 },
    );
  if (file.size > 8 * 1024 * 1024)
    return NextResponse.json(
      { error: 'Images must be smaller than 8 MB.' },
      { status: 400 },
    );
  const imagePath = await saveImage(
    file.name,
    Buffer.from(await file.arrayBuffer()),
    file.type,
  );
  return NextResponse.json({ ok: true, imagePath });
}
