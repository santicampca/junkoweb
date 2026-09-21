"use client";

import { useActionState } from "react";
import { submitReservation, type ReservationFormState } from "@/lib/actions/reservations";

const initialState: ReservationFormState = { status: "idle" };

export function ReservationForm() {
  const [state, formAction, pending] = useActionState(submitReservation, initialState);

  return (
    <form
      action={formAction}
      className="mx-auto flex w-full max-w-2xl flex-col gap-6 border border-gold/20 bg-white p-8 shadow-elegant sm:p-12"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Nombre completo"
          name="name"
          error={state.fieldErrors?.name}
          autoComplete="name"
        />
        <Field
          label="Correo electrónico"
          name="email"
          type="email"
          error={state.fieldErrors?.email}
          autoComplete="email"
        />
        <Field
          label="Teléfono"
          name="phone"
          type="tel"
          error={state.fieldErrors?.phone}
          autoComplete="tel"
        />
        <Field
          label="Fecha deseada"
          name="date"
          type="date"
          error={state.fieldErrors?.date}
        />
        <Field
          label="Cantidad de jugadores"
          name="players"
          type="number"
          min={1}
          max={12}
          defaultValue={2}
          error={state.fieldErrors?.players}
        />
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-sans text-xs uppercase tracking-widest2 text-navy/60">
          Comentarios (opcional)
        </span>
        <textarea
          name="notes"
          rows={4}
          className="border border-forest/15 bg-transparent px-4 py-3 font-serif text-base text-navy outline-none transition-colors focus:border-gold"
        />
      </label>

      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
        {pending ? "Enviando..." : "Solicitar reserva"}
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

function Field({
  label,
  name,
  type = "text",
  error,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-sans text-xs uppercase tracking-widest2 text-navy/60">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={name !== "phone"}
        className="border border-forest/15 bg-transparent px-4 py-3 font-serif text-base text-navy outline-none transition-colors focus:border-gold"
        {...rest}
      />
      {error ? <span className="font-sans text-xs text-red-700">{error}</span> : null}
    </label>
  );
}
