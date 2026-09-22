"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Fixed, full-viewport photo behind the entire public site (every page,
 * not just the home hero) — `fixed` keeps it pinned while the page
 * scrolls. The overlay is intentionally light (matches the reference
 * the club provided): the photo stays crisp and recognizable, and
 * every section renders as a floating ".glass-card" panel on top of it
 * rather than an opaque color band.
 */
export function SiteBackground() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src="/images/hero/fairway.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/45 to-navy/60" />
    </div>
  );
}
