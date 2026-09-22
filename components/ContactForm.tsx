"use client";

import { useActionState } from "react";
import { submitContactMessage, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactMessage, initialState);

  return (
    <form action={formAction} className="glass-card flex flex-col gap-6 p-8 sm:p-10">
      <label className="flex flex-col gap-2">
        <span className="font-sans text-xs uppercase tracking-widest2 text-ivory/60">
          Nombre completo
        </span>
        <input name="name" required className="glass-input" />
        {state.fieldErrors?.name ? (
          <span className="font-sans text-xs text-red-400">{state.fieldErrors.name}</span>
        ) : null}
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-sans text-xs uppercase tracking-widest2 text-ivory/60">
          Correo electrónico
        </span>
        <input name="email" type="email" required className="glass-input" />
        {state.fieldErrors?.email ? (
          <span className="font-sans text-xs text-red-400">{state.fieldErrors.email}</span>
        ) : null}
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-sans text-xs uppercase tracking-widest2 text-ivory/60">
          Mensaje
        </span>
        <textarea name="message" rows={5} required className="glass-input" />
        {state.fieldErrors?.message ? (
          <span className="font-sans text-xs text-red-400">{state.fieldErrors.message}</span>
        ) : null}
      </label>

      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
        {pending ? "Enviando..." : "Enviar mensaje"}
      </button>

      {state.status === "success" ? (
        <p className="font-serif text-base text-gold">{state.message}</p>
      ) : null}
      {state.status === "error" && state.message ? (
        <p className="font-serif text-base text-red-400">{state.message}</p>
      ) : null}
    </form>
  );
}
