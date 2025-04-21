import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateToken } from "@/lib/token";
import db from "@/lib/db";
import { id, lookup } from "@instantdb/admin";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jumbosecure_token")?.value;
  const email = token ? validateToken(token) : null;
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, body } = await request.json();

  const newId = id();

  await db.transact([
    db.tx.posts[newId].update({
      title,
      body,
      published: false,
    }),
    db.tx.posts[newId].link({ account: lookup("email", email) }),
  ]);

  return NextResponse.json({ success: true }, { status: 201 });
}
