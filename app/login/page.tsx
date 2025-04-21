import React from "react";
import { AuthLayout } from "../../components/auth-layout";
import { Heading } from "../../components/heading";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Link } from "../../components/link";

export default function LoginPage() {
  return (
    <AuthLayout>
      <form className="flex flex-col gap-6 w-80 max-w-full">
        <Heading level={1} className="mb-2">
          Sign in
        </Heading>
        <Input type="email" placeholder="Email" required />
        <Input type="password" placeholder="Password" required />
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
