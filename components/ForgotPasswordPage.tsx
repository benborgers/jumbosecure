"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "./auth-layout";
import { Heading } from "./heading";
import { Input } from "./input";
import { Button } from "./button";
import { Link } from "./link";
import { toast, Toaster } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGenerateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/forgot-password/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          `You've got mail! Your password reset code is: ${data.token}`
        );
        console.log(data);
        setStep(2);
      } else {
        setError(data.error || "An error occurred");
      }
    } catch {
      setError("An unexpected error occurred");
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/forgot-password/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(3);
      } else {
        setError(data.error || "An error occurred");
      }
    } catch {
      setError("An unexpected error occurred");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/forgot-password/change", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-From-JumboSecure-Frontend": "true",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/login");
      } else {
        setError(data.error || "An error occurred");
      }
    } catch {
      setError("An unexpected error occurred");
    }
  };

  return (
    <AuthLayout>
      {step === 1 && (
        <form
          className="flex flex-col gap-6 w-80 max-w-full"
          onSubmit={handleGenerateCode}
        >
          <Heading level={1} className="mb-2">
            Forgot password
          </Heading>
          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <Button type="submit" className="mt-2">
            Generate Code
          </Button>
          <div className="text-sm text-center mt-2">
            <Link href="/login" className="text-blue-600 hover:underline">
              Back to login
            </Link>
          </div>
        </form>
      )}

      {step === 2 && (
        <form
          className="flex flex-col gap-6 w-80 max-w-full"
          onSubmit={handleVerifyCode}
        >
          <Heading level={1} className="mb-2">
            Enter verification code
          </Heading>
          <Input
            type="text"
            placeholder="Verification code"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <Button type="submit" className="mt-2">
            Verify Code
          </Button>
        </form>
      )}

      {step === 3 && (
        <form
          className="flex flex-col gap-6 w-80 max-w-full"
          onSubmit={handleChangePassword}
        >
          <Heading level={1} className="mb-2">
            Set new password
          </Heading>
          <Input
            type="password"
            placeholder="New password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <Button type="submit" className="mt-2">
            Change Password
          </Button>
        </form>
      )}
      <Toaster />
    </AuthLayout>
  );
}
