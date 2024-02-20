import { NextRequest, NextResponse } from 'next/server';
import { disLikePost, likePost } from '@/service/posts';
import { withSessionUser } from '@/util/session';

export async function PUT(req: NextRequest) {
  return withSessionUser(async user => {
    const { id, like } = await req.json();

    if (!id || like === undefined) {
      return new Response('Bad request', { status: 400 });
    }

    const request = like ? likePost : disLikePost;

    return request(id, user.id) //
      .then(res => NextResponse.json(res))
      .catch(err => new Response(JSON.stringify(err), { status: 500 }));
  });
}
