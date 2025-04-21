import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateToken } from "@/lib/token";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jumbosecure_token")?.value;
  const email = token ? validateToken(token) : null;
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Just echo back the post for now
  const { title, body } = await request.json();
  return NextResponse.json({ id: params.id, title, body }, { status: 200 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jumbosecure_token")?.value;
  const email = token ? validateToken(token) : null;
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Just return success for now
  return NextResponse.json({ success: true }, { status: 200 });
}
