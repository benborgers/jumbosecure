import db from "@/lib/db";
import emails from "@/lib/emails";
import { encrypt } from "@/lib/encryption";
import { lookup } from "@instantdb/admin";
import { NextResponse } from "next/server";

const CORRECT_PASSWORD = "password";

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email.trim().toLowerCase();
  const password = body.password;

  if (!emails.includes(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (password !== CORRECT_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }

  const token = encrypt(email);

  await db.transact(
    db.tx.accounts[lookup("email", email)].update({
      passed_level_1: false,
      passed_level_2: false,
      passed_level_3: false,
    })
  );

  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.set("jumbosecure_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  return response;
}
