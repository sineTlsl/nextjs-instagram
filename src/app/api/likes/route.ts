import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { disLikePost, likePost } from "@/service/posts";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new NextResponse("Authentication Error", { status: 401 });
  }

  const { id, like } = await req.json();

  if (!id || like === undefined) {
    return new NextResponse("Bad request", { status: 400 });
  }

  const request = like ? likePost : disLikePost;

  return request(id, user.id) //
    .then(res => NextResponse.json(res))
    .catch(err => new NextResponse(JSON.stringify(err), { status: 500 }));
}
