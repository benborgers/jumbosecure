import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateToken } from "@/lib/token";
import HomeClient from "@/components/HomeClient";
import db from "@/lib/db";
import clsx from "clsx";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jumbosecure_token")?.value;
  const email = token ? validateToken(token) : null;
  if (!email) {
    return redirect("/login");
  }

  const data = await db.query({
    accounts: {
      $: {
        where: {
          email,
        },
      },
    },
  });

  const account = data.accounts[0];

  if (!account) {
    throw new Error("No account on `/` route");
  }

  return (
    <div>
      <HomeClient />
      <div className="w-full max-w-2xl mt-12 mx-auto bg-gray-100 p-4 rounded-lg">
        <p className={clsx(account.passed_level_1 && "text-emerald-600")}>
          Level 1: {account.passed_level_1 ? "Passed" : "Not Passed"}
        </p>
        <p className={clsx(account.passed_level_2 && "text-emerald-600")}>
          Level 2: {account.passed_level_2 ? "Passed" : "Not Passed"}
        </p>
        <p className={clsx(account.passed_level_3 && "text-emerald-600")}>
          Level 3: {account.passed_level_3 ? "Passed" : "Not Passed"}
        </p>
      </div>
    </div>
  );
}
