"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/club", label: "El Club" },
  { href: "/membresias", label: "Membresías" },
  { href: "/reservas", label: "Reservas" },
  { href: "/torneos", label: "Torneos" },
  { href: "/galeria", label: "Galería" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-gold/20 bg-navy/55 text-ivory backdrop-blur-md">
      <div className="container-club grid gap-12 py-16 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/brand/logo.png" alt="Junko Golf Club" width={36} height={36} className="h-9 w-9" />
            <p className="font-display text-lg uppercase tracking-widest2">
              Junko <span className="text-gold">Golf Club</span>
            </p>
          </div>
          <p className="mt-4 max-w-xs font-serif text-sm leading-relaxed text-ivory/60">
            Golf, montaña y tradición en un entorno de exclusividad discreta.
          </p>
        </div>

        <div>
          <p className="eyebrow text-ivory/50">Navegación</p>
          <ul className="mt-4 flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-sm text-ivory/70 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-ivory/50">Contacto</p>
          <ul className="mt-4 flex flex-col gap-2 font-sans text-sm text-ivory/70">
            <li>info@junkogolfclub.com</li>
            <li>Por confirmar</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10 py-6">
        <p className="container-club text-center font-sans text-xs uppercase tracking-widest2 text-ivory/40">
          © {new Date().getFullYear()} Junko Golf Club. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
