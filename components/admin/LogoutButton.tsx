"use client";

import { logout } from "@/lib/actions/auth";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="font-sans text-xs uppercase tracking-widest2 text-ivory/60 transition-colors hover:text-gold"
      >
        Cerrar sesión
      </button>
    </form>
  );
}
