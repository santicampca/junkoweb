import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Only /admin needs a Supabase session check. Public pages read public
 * data directly in Server Components and must never depend on this
 * middleware (or on Supabase auth, or on an admin user existing) to
 * render — scoping the matcher here keeps a Supabase outage or a missing
 * env var from ever affecting "/" and the rest of the public site.
 */
export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
