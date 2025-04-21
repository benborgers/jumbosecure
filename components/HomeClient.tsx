"use client";
import Link from "next/link";
import { Button } from "@/components/button";
import { useEffect, useState } from "react";

type Post = { id: string; title: string; body: string };

export default function HomeClient() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <div className="min-h-screen p-8 pb-20 flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      <div className="w-full max-w-2xl flex flex-col gap-4 mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Posts</h2>
          <div className="flex gap-2 items-center">
            <Link href="/posts/new">
              <Button color="blue">New Post</Button>
            </Link>
            <Button
              color="red"
              onClick={async () => {
                await fetch("/api/logout", { method: "POST" });
                window.location.href = "/login";
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
        <ul className="flex flex-col gap-2">
          {posts.map((post) => (
            <li
              key={post.id}
              className="border rounded p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{post.title}</span>
                <Link href={`/posts/${post.id}`}>
                  <Button color="zinc">Edit</Button>
                </Link>
              </div>
              <div className="text-zinc-600">{post.body}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
