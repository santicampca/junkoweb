"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cx } from "@/lib/utils";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/club", label: "Club" },
  { href: "/membresias", label: "Membresías" },
  { href: "/reservas", label: "Reservas" },
  { href: "/torneos", label: "Torneos" },
  { href: "/galeria", label: "Galería" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={cx(
        "sticky top-0 z-50 w-full bg-navy transition-shadow duration-500",
        (scrolled || open) && "shadow-elegant"
      )}
    >
      <div className="container-club flex h-20 items-center justify-between">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-display text-lg uppercase tracking-widest2 text-ivory"
        >
          <Image src="/brand/logo.png" alt="Junko Golf Club" width={36} height={36} className="h-9 w-9 shrink-0" />
          <span className="whitespace-nowrap">
            Junko <span className="text-gold">Golf Club</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cx(
                "font-sans text-xs uppercase tracking-widest2 text-ivory/80 transition-colors hover:text-gold",
                pathname === link.href && "text-gold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/reservas" className="btn-primary">
            Reserva ya
          </Link>
        </div>

        <button
          aria-label="Abrir menú"
          className="flex flex-col gap-1.5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={cx(
              "h-px w-7 bg-ivory transition-transform",
              open && "translate-y-2 rotate-45"
            )}
          />
          <span
            className={cx("h-px w-7 bg-ivory transition-opacity", open && "opacity-0")}
          />
          <span
            className={cx(
              "h-px w-7 bg-ivory transition-transform",
              open && "-translate-y-2 -rotate-45"
            )}
          />
        </button>
      </div>

      {open ? (
        <div className="border-t border-ivory/10 bg-navy/98 px-6 pb-8 pt-4 lg:hidden">
          <nav className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cx(
                  "font-sans text-sm uppercase tracking-widest2 text-ivory/80",
                  pathname === link.href && "text-gold"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/reservas"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              Reserva ya
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
