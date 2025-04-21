import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { code } = await request.json();

  if (code !== "123456") {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
