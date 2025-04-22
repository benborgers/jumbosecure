import { NextResponse } from "next/server";

export function middleware() {
  // Get current time in EST
  const now = new Date();
  const estTime = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  const cutoffDate = new Date("2025-04-21T20:35:00-04:00"); // -04:00 for EDT

  // Compare timestamps
  const isBlocked = estTime.getTime() > cutoffDate.getTime();

  console.log("Current EST:", estTime.toISOString());
  console.log("Cutoff EST:", cutoffDate.toISOString());
  console.log("Current timestamp:", estTime.getTime());
  console.log("Cutoff timestamp:", cutoffDate.getTime());
  console.log("Is blocked:", isBlocked);

  if (isBlocked) {
    // Return a maintenance page response
    return new NextResponse(
      "Since it's past 8:30pm, JumboSecure is gone.\n\nIf you'd like to keep playing with it, we might be able to bring it back (although not for points).",
      {
        status: 503,
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: "/:path*", // This will match all paths
};
