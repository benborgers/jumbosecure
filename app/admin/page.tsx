import { validateToken } from "@/lib/token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Admin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jumbosecure_token")?.value;
  const email = token ? validateToken(token) : null;
  if (!email) {
    return redirect("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-center text-gray-500">
        As a non-admin, you cannot view this page, because you cannot set posts
        to <code>published</code>.
      </p>
    </div>
  );
}
