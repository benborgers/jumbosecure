import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateToken } from "@/lib/token";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jumbosecure_token")?.value;
  const email = token ? validateToken(token) : null;
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Dummy data
  return NextResponse.json([
    { id: "1", title: "First Post", body: "This is the first post." },
    { id: "2", title: "Second Post", body: "This is the second post." },
  ]);
}
