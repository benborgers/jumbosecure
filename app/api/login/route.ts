import emails from "@/lib/emails";
import { encrypt } from "@/lib/encryption";
import { NextResponse } from "next/server";

const CORRECT_PASSWORD = "password";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!emails.includes(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (password !== CORRECT_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }

  const token = encrypt(email);

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
