"use client";

import { useActionState } from "react";
import { login, type LoginFormState } from "@/lib/actions/auth";

const initialState: LoginFormState = { status: "idle" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <label className="flex flex-col gap-2">
        <span className="font-sans text-xs uppercase tracking-widest2 text-ivory/60">
          Correo electrónico
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="border border-ivory/20 bg-transparent px-4 py-3 font-serif text-base text-ivory outline-none transition-colors focus:border-gold"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-sans text-xs uppercase tracking-widest2 text-ivory/60">
          Contraseña
        </span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="border border-ivory/20 bg-transparent px-4 py-3 font-serif text-base text-ivory outline-none transition-colors focus:border-gold"
        />
      </label>

      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
        {pending ? "Ingresando..." : "Ingresar"}
      </button>

      {state.status === "error" && state.message ? (
        <p className="font-sans text-sm text-red-400">{state.message}</p>
      ) : null}
    </form>
  );
}
