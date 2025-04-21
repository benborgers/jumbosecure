import { NextResponse } from "next/server";
import emails from "@/lib/emails";
import db from "@/lib/db";
import { lookup } from "@instantdb/admin";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!emails.includes(email)) {
    return NextResponse.json({ error: "Email not found" }, { status: 404 });
  }

  const headers = request.headers;
  const fromFrontend = headers.get("X-From-JumboSecure-Frontend") === "true";

  if (!fromFrontend) {
    await db.transact(
      db.tx.accounts[lookup("email", email)].update({
        passed_level_2: true,
      })
    );

    return Response.json({ success: true, hacked: true });
  }

  return Response.json({ success: true });
}
