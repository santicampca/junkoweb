"use client";

import { useActionState } from "react";
import { updatePassword, type UpdatePasswordState } from "@/lib/actions/auth";
import { adminInputClass } from "@/components/admin/AdminEditor";

const initialState: UpdatePasswordState = { status: "idle" };

export function UpdatePasswordForm() {
  const [state, formAction, pending] = useActionState(updatePassword, initialState);

  return (
    <form action={formAction} className="flex max-w-sm flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="font-sans text-xs uppercase tracking-widest2 text-navy/50">
          Nueva contraseña
        </span>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          className={adminInputClass}
        />
      </label>
      <button type="submit" disabled={pending} className="btn-primary w-fit disabled:opacity-60">
        {pending ? "Actualizando..." : "Actualizar contraseña"}
      </button>
      {state.status === "success" ? (
        <p className="font-sans text-sm text-forest">{state.message}</p>
      ) : null}
      {state.status === "error" ? (
        <p className="font-sans text-sm text-red-700">{state.message}</p>
      ) : null}
    </form>
  );
}
