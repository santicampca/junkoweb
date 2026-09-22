import type { NextConfig } from "next";

// Guarded with try/catch, not just a truthy check: an env var can be "set"
// in Vercel to an empty or malformed value, and `new URL()` throws on
// those too — which would otherwise fail the entire build, not just image
// optimization for Supabase-hosted images.
function getSupabaseHostname(): string | undefined {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return undefined;
  try {
    return new URL(url).hostname;
  } catch {
    return undefined;
  }
}

const supabaseHostname = getSupabaseHostname();

const nextConfig: NextConfig = {
  images: {
    // Next's default optimizer quality (75) visibly softened our real
    // photos even though the source files were exported at quality 92 —
    // this allowlists the higher value so <Image quality={90}> is honored
    // for the hero background and featured photos.
    qualities: [75, 90],
    remotePatterns: [
      ...(supabaseHostname
        ? [
            {
              protocol: "https" as const,
              hostname: supabaseHostname,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
    ],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
