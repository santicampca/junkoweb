"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Fixed, full-viewport photo behind the entire public site (every page,
 * not just the home hero) — `fixed` keeps it pinned while the page
 * scrolls. Kept deliberately neutral and subtle (navy, not green) so the
 * photograph itself stays the dominant color on the page; individual
 * sections layer their own extra contrast where they need it for text.
 */
export function SiteBackground() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src="/images/hero/fairway.jpg"
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/10 via-navy/20 to-navy/45" />
    </div>
  );
}
