"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Fixed, full-viewport photo + dark wash behind the entire public site
 * (every page, not just the home hero). `fixed` keeps it pinned to the
 * viewport while the page scrolls; every section renders as a translucent
 * "panel-*" band (see globals.css) on top of it instead of an opaque color.
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
      <div className="absolute inset-0 bg-navy/50" />
    </div>
  );
}
