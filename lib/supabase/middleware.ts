import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnvSafe } from "@/lib/supabase/env";

type CookieToSet = { name: string; value: string; options: CookieOptions };

/**
 * Gates /admin behind a verified Supabase session. This must never take
 * down the public site: it only ever runs for /admin (see the matcher in
 * middleware.ts), and if Supabase itself is unreachable or misconfigured
 * it fails CLOSED — redirecting to the login page — rather than throwing
 * (which Vercel surfaces as a hard 500 MIDDLEWARE_INVOCATION_FAILED) or
 * letting the request through unauthenticated.
 */
export async function updateSession(request: NextRequest) {
  const isLoginRoute = request.nextUrl.pathname === "/admin/login";
  const redirectToLogin = () => {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  };

  const env = getSupabaseEnvSafe();
  if (!env) {
    console.error(
      "[middleware] Supabase is not configured (missing NEXT_PUBLIC_SUPABASE_URL " +
        "or NEXT_PUBLIC_SUPABASE_ANON_KEY). Denying /admin access until it is set " +
        "in the deployment's environment variables and redeployed."
    );
    return isLoginRoute ? NextResponse.next({ request }) : redirectToLogin();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (error) {
    console.error("[middleware] Supabase auth check failed:", error);
    return isLoginRoute ? response : redirectToLogin();
  }

  if (!isLoginRoute && !user) {
    return redirectToLogin();
  }

  if (isLoginRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}
