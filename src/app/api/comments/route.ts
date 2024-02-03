import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { addComment } from "@/service/posts";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new NextResponse("Authentication Error", { status: 401 });
  }

  const { id, comment } = await req.json();

  if (!id || comment === undefined) {
    return new NextResponse("Bad request", { status: 400 });
  }

  return addComment(id, user.id, comment) //
    .then(res => NextResponse.json(res))
    .catch(err => new NextResponse(JSON.stringify(err), { status: 500 }));
}