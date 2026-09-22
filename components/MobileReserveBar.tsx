"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Small persistent reservation entry point for mobile, where scrolling
 * back up to the header (or down to the final CTA) is more friction
 * than on desktop. Hidden on /admin (no public chrome there) and on
 * /reservas itself, where the CTA would be redundant.
 */
export function MobileReserveBar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname === "/reservas") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-ivory/10 bg-navy/95 px-5 py-3 backdrop-blur-md lg:hidden">
      <span className="font-serif text-sm italic text-ivory/80">¿Jugamos?</span>
      <Link
        href="/reservas"
        aria-label="Reservar una ronda en Junko Golf Club"
        className="btn-primary px-6 py-2 text-xs"
      >
        Reservar
      </Link>
    </div>
  );
}
