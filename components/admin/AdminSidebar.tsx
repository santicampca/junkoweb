"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/utils";

const links = [
  { href: "/admin/dashboard", label: "Resumen" },
  { href: "/admin/dashboard/reservas", label: "Reservas" },
  { href: "/admin/dashboard/contactos", label: "Contactos" },
  { href: "/admin/dashboard/torneos", label: "Torneos" },
  { href: "/admin/dashboard/galeria", label: "Galería" },
  { href: "/admin/dashboard/membresias", label: "Membresías" },
  { href: "/admin/dashboard/contenido", label: "Contenido" },
  { href: "/admin/dashboard/configuracion", label: "Configuración" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex w-full flex-row gap-1 overflow-x-auto border-b border-ivory/10 bg-navy px-4 py-3 lg:h-screen lg:w-64 lg:flex-col lg:gap-2 lg:overflow-visible lg:border-b-0 lg:border-r lg:px-4 lg:py-8">
      {links.map((link) => {
        const active =
          link.href === "/admin/dashboard"
            ? pathname === link.href
            : pathname?.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cx(
              "whitespace-nowrap rounded-sm px-4 py-2 font-sans text-xs uppercase tracking-widest2 text-ivory/70 transition-colors hover:bg-ivory/5 hover:text-gold",
              active && "bg-gold/10 text-gold"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
