import { createPost, getFollowingPostsOf } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';
import { withSessionUser } from '@/util/session';

export async function GET() {
  return withSessionUser(async user => {
    return getFollowingPostsOf(user.username) //
      .then(data => NextResponse.json(data));
  });
}

export async function POST(req: NextRequest) {
  return withSessionUser(async user => {
    const form = await req.formData();
    const text = form.get('text')?.toString();
    const file = form.get('file') as Blob;

    // 텍스트나 파일이 없으면 400
    if (!text || !file) {
      return new Response('Bad request', { status: 400 });
    }

    return createPost(user.id, text, file) //
      .then(data => NextResponse.json(data));
  });
}
