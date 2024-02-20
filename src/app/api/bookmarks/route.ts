import { NextRequest, NextResponse } from 'next/server';
import { addBookmark, removeBookmark } from '@/service/user';
import { withSessionUser } from '@/util/session';

export async function PUT(req: NextRequest) {
  // return withSession(callback); // callback == (user) => Promise<Response>
  return withSessionUser(async user => {
    const { id, bookmark } = await req.json();

    if (!id || bookmark === null) {
      return new Response('Bad request', { status: 400 });
    }

    const request = bookmark ? addBookmark : removeBookmark;

    return request(user.id, id) //
      .then(res => NextResponse.json(res))
      .catch(err => new Response(JSON.stringify(err), { status: 500 }));
  });
}
