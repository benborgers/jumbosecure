"use client";

import React, { useState } from "react";
import { AuthLayout } from "./auth-layout";
import { Heading } from "./heading";
import { Input } from "./input";
import { Button } from "./button";
import { Link } from "./link";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "otp" | "password" | "success">(
    "email"
  );
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  // For demo: hardcoded correct OTP
  const CORRECT_OTP = "123456";

  async function handleSendLink(e: React.FormEvent) {
    e.preventDefault();
    // Stub: pretend to send email
    setStep("otp");
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp === CORRECT_OTP) {
      // Right OTP callback
      setStep("password");
    } else {
      // Wrong OTP callback (user will add toast later)
      // For now, just clear OTP
      setOtp("");
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    // Stub: pretend to change password
    setStep("success");
  }

  return (
    <AuthLayout>
      {step === "email" && (
        <form
          className="flex flex-col gap-6 w-80 max-w-full"
          onSubmit={handleSendLink}
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
          <Button type="submit" className="mt-2">
            Send reset link
          </Button>
          <div className="text-sm text-center mt-2">
            <Link href="/login" className="text-blue-600 hover:underline">
              Back to login
            </Link>
          </div>
        </form>
      )}
      {step === "otp" && (
        <form
          className="flex flex-col gap-6 w-80 max-w-full"
          onSubmit={handleVerifyOtp}
        >
          <Heading level={1} className="mb-2">
            Enter OTP
          </Heading>
          <Input
            type="text"
            placeholder="One-time code"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button type="submit" className="mt-2">
            Verify code
          </Button>
        </form>
      )}
      {step === "password" && (
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="mt-2">
            Change password
          </Button>
        </form>
      )}
      {step === "success" && (
        <div className="flex flex-col gap-6 w-80 max-w-full items-center">
          <Heading level={1} className="mb-2">
            Password changed!
          </Heading>
          <div className="text-center text-zinc-700 dark:text-zinc-300">
            Your password has been changed. You can now log in.
          </div>
          <Link href="/login" className="text-blue-600 hover:underline">
            Back to login
          </Link>
        </div>
      )}
    </AuthLayout>
  );
}
