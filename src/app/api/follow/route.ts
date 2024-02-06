import { authOptions } from '../auth/[...nextauth]/route';
import { follow, unfollow } from '@/service/user';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { id: targetId, follow: isFollow } = await req.json();

  console.log('targetId >> ', targetId);
  console.log('follow >> ', isFollow);

  if (!targetId || isFollow === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = isFollow ? follow : unfollow;

  return request(user.id, targetId) //
    .then(res => NextResponse.json(res))
    .catch(err => new Response(JSON.stringify(err), { status: 500 }));
}
