"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { Button } from "@/components/button";

type Post = { id: string; title: string; body: string };

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((posts: Post[]) => {
        const post = posts.find((p) => p.id === id);
        if (post) {
          setTitle(post.title);
          setBody(post.body);
        }
      });
  }, [id]);

  useEffect(() => {
    if (button.current) {
      button.current.disabled = true;
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch(`/api/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });
    setLoading(false);
    router.push("/");
  }

  async function handleDelete() {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    router.push("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto flex flex-col gap-4 mt-12"
    >
      <h1 className="text-2xl font-bold mb-2">Edit Post</h1>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <div className="flex gap-4 items-center">
        <Button color="blue" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        <div className="relative group inline-block">
          <button
            type="button"
            onClick={handleDelete}
            ref={button}
            className="text-red-600 font-medium opacity-50 cursor-not-allowed"
          >
            Delete
          </button>
          <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max -translate-x-1/2 rounded bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition">
            Only admins can delete posts
          </span>
        </div>
      </div>
    </form>
  );
}
