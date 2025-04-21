import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateToken } from "@/lib/token";
import db from "@/lib/db";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jumbosecure_token")?.value;
  const email = token ? validateToken(token) : null;
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await db.query({
    accounts: {
      $: {
        where: {
          email,
        },
      },
      posts: {
        $: {
          order: {
            serverCreatedAt: "desc",
          },
        },
      },
    },
  });

  return Response.json(data.accounts[0]?.posts ?? []);
}
