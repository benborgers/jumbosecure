import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateToken } from "@/lib/token";
import db from "@/lib/db";
import { lookup } from "@instantdb/admin";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("jumbosecure_token")?.value;
  const email = token ? validateToken(token) : null;
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await db.query({
    posts: {
      $: {
        where: {
          id,
        },
      },
      account: {},
    },
  });

  const post = data.posts[0];

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  if (post.account?.email !== email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, body, published } = await request.json();
  await db.transact(db.tx.posts[id].update({ title, body }));

  if (published !== undefined) {
    await db.transact([
      db.tx.posts[id].update({ published }),
      db.tx.accounts[lookup("email", email)].update({
        passed_level_3: true,
      }),
    ]);
  }

  return Response.json({ success: true }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("jumbosecure_token")?.value;
  const email = token ? validateToken(token) : null;
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await db.query({
    posts: {
      $: {
        where: {
          id,
        },
      },
      account: {},
    },
  });

  const post = data.posts[0];

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  if (post.account?.email !== email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await db.transact([
    db.tx.posts[id].delete(),
    db.tx.accounts[lookup("email", email)].update({ passed_level_1: true }),
  ]);

  return Response.json({ success: true }, { status: 200 });
}
