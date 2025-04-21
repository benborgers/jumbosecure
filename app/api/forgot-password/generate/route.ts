import { NextResponse } from "next/server";
import emails from "@/lib/emails";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!emails.includes(email)) {
    return NextResponse.json({ error: "Email not found" }, { status: 404 });
  }

  return NextResponse.json({ token: "123456" });
}
