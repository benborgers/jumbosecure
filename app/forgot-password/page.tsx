import ForgotPasswordPage from "@/components/ForgotPasswordPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateToken } from "@/lib/token";

export default async function ForgotPassword() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jumbosecure_token")?.value;
  const email = token ? validateToken(token) : null;
  if (email) {
    redirect("/");
  }
  return <ForgotPasswordPage />;
}
