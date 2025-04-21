import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateToken } from "@/lib/token";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jumbosecure_token")?.value;
  const email = token ? validateToken(token) : null;
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Just echo back the post for now
  const { title, body } = await request.json();
  return NextResponse.json({ id: "dummy", title, body }, { status: 201 });
}
