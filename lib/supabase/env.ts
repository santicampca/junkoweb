/**
 * Centralized, explicit read of the public Supabase config.
 *
 * Next.js inlines `process.env.NEXT_PUBLIC_*` references at BUILD time for
 * every runtime (client, server, and Edge middleware). If these variables
 * are missing from the Vercel project when a build runs, every reference
 * compiles down to `undefined` — adding the variables afterwards does
 * nothing until a new deployment is built. Throwing a clear, named error
 * here (instead of letting @supabase/supabase-js fail with the generic
 * "supabaseUrl is required.") makes that misconfiguration obvious in logs.
 */
export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase environment variables. NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in the deployment's " +
        "environment variables (see .env.example) and the project must be " +
        "redeployed after adding them."
    );
  }

  return { url, anonKey };
}

/** Same as getSupabaseEnv, but never throws — for call sites (like
 * middleware) that must keep serving requests when Supabase isn't
 * configured yet, instead of crashing the whole request. */
export function getSupabaseEnvSafe() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;
  return { url, anonKey };
}
