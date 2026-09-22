"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitReservation, type ReservationFormState } from "@/lib/actions/reservations";

const initialState: ReservationFormState = { status: "idle" };

interface ReservationFormProps {
  /** Club WhatsApp number from admin-editable content (may still be the "[PENDIENTE DE CONFIRMAR CON EL CLUB]" placeholder until set). */
  whatsappPhone?: string;
}

/** Digits-only wa.me number, or null when the club hasn't set a real phone yet. */
function buildWhatsappNumber(raw?: string) {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 7 ? digits : null;
}

export function ReservationForm({ whatsappPhone }: ReservationFormProps) {
  const [state, formAction, pending] = useActionState(submitReservation, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const waNumber = buildWhatsappNumber(whatsappPhone);

  // Once the request is registered, hand the conversation off to WhatsApp
  // with the reservation details pre-filled — Junko confirms manually there.
  useEffect(() => {
    if (state.status !== "success" || !formRef.current || !waNumber) return;

    const data = new FormData(formRef.current);
    const name = data.get("name")?.toString().trim();
    const date = data.get("date")?.toString();
    const time = data.get("preferredTime")?.toString();
    const players = data.get("players")?.toString();

    let message = "Hola, quiero reservar una ronda";
    if (date) message += ` el ${date}`;
    if (time) message += ` a las ${time}`;
    if (players) message += ` para ${players} jugador${players === "1" ? "" : "es"}`;
    message += ".";
    if (name) message += ` Mi nombre es ${name}.`;

    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
    formRef.current.reset();
  }, [state.status, waNumber]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="glass-card mx-auto flex w-full max-w-2xl flex-col gap-6 p-8 sm:p-12"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Nombre completo"
          name="name"
          error={state.fieldErrors?.name}
          autoComplete="name"
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
          label="Hora preferida"
          name="preferredTime"
          type="time"
          error={state.fieldErrors?.preferredTime}
        />
        <Field
          label="Nº de jugadores"
          name="players"
          type="number"
          min={1}
          max={12}
          defaultValue={2}
          error={state.fieldErrors?.players}
        />
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-sans text-xs uppercase tracking-widest2 text-ivory/60">
          Mensaje (opcional)
        </span>
        <textarea name="notes" rows={4} className="glass-input" />
      </label>

      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
        {pending ? "Enviando..." : "Enviar solicitud"}
      </button>

      {state.status === "success" ? (
        <p className="font-serif text-base text-gold">
          {state.message}
          {waNumber ? " La abrimos en WhatsApp para confirmar directamente con nosotros." : ""}
        </p>
      ) : null}
      {state.status === "error" && state.message ? (
        <p className="font-serif text-base text-red-400">{state.message}</p>
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
      <span className="font-sans text-xs uppercase tracking-widest2 text-ivory/60">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={name !== "preferredTime"}
        className="glass-input"
        {...rest}
      />
      {error ? <span className="font-sans text-xs text-red-400">{error}</span> : null}
    </label>
  );
}
