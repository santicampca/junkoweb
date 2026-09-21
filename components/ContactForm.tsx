"use client";

import { useActionState } from "react";
import { submitContactMessage, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactMessage, initialState);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-6 border border-gold/20 bg-white p-8 shadow-elegant sm:p-10"
    >
      <label className="flex flex-col gap-2">
        <span className="font-sans text-xs uppercase tracking-widest2 text-navy/60">
          Nombre completo
        </span>
        <input
          name="name"
          required
          className="border border-forest/15 bg-transparent px-4 py-3 font-serif text-base text-navy outline-none transition-colors focus:border-gold"
        />
        {state.fieldErrors?.name ? (
          <span className="font-sans text-xs text-red-700">{state.fieldErrors.name}</span>
        ) : null}
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-sans text-xs uppercase tracking-widest2 text-navy/60">
          Correo electrónico
        </span>
        <input
          name="email"
          type="email"
          required
          className="border border-forest/15 bg-transparent px-4 py-3 font-serif text-base text-navy outline-none transition-colors focus:border-gold"
        />
        {state.fieldErrors?.email ? (
          <span className="font-sans text-xs text-red-700">{state.fieldErrors.email}</span>
        ) : null}
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-sans text-xs uppercase tracking-widest2 text-navy/60">
          Mensaje
        </span>
        <textarea
          name="message"
          rows={5}
          required
          className="border border-forest/15 bg-transparent px-4 py-3 font-serif text-base text-navy outline-none transition-colors focus:border-gold"
        />
        {state.fieldErrors?.message ? (
          <span className="font-sans text-xs text-red-700">{state.fieldErrors.message}</span>
        ) : null}
      </label>

      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
        {pending ? "Enviando..." : "Enviar mensaje"}
      </button>

      {state.status === "success" ? (
        <p className="font-serif text-base text-forest">{state.message}</p>
      ) : null}
      {state.status === "error" && state.message ? (
        <p className="font-serif text-base text-red-700">{state.message}</p>
      ) : null}
    </form>
  );
}
