"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "./auth-layout";
import { Heading } from "./heading";
import { Input } from "./input";
import { Button } from "./button";
import { Link } from "./link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/");
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      setError("An unexpected error occurred");
    }
  }

  return (
    <AuthLayout>
      <form
        className="flex flex-col gap-6 w-80 max-w-full"
        onSubmit={handleSubmit}
      >
        <Heading level={1} className="mb-2">
          Sign in
        </Heading>
        <Input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <Button type="submit" className="mt-2">
          Sign in
        </Button>
        <div className="text-sm text-center mt-2">
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
