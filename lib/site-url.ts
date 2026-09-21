/**
 * Reads NEXT_PUBLIC_SITE_URL with a safe fallback. Using `??` here is not
 * enough: Vercel lets an env var be "set" with an empty string value, which
 * is not null/undefined, so `?? fallback` would still pass `''` through to
 * `new URL('')` and crash page-data collection for every route (including
 * `/_not-found`, which reads `metadataBase` from the root layout).
 */
export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return value ? value : "http://localhost:3000";
}
