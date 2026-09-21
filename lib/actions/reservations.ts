"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ReservationStatus } from "@/lib/types";

const reservationSchema = z.object({
  name: z.string().trim().min(2, "Ingrese su nombre completo").max(120),
  email: z.string().trim().email("Ingrese un correo electrónico válido"),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  date: z.string().trim().min(1, "Seleccione una fecha"),
  players: z.coerce.number().int().min(1).max(12),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

export type ReservationFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitReservation(
  _prevState: ReservationFormState,
  formData: FormData
): Promise<ReservationFormState> {
  const parsed = reservationSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    date: formData.get("date"),
    players: formData.get("players"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[String(issue.path[0])] = issue.message;
    }
    return {
      status: "error",
      message: "Por favor revise los campos marcados.",
      fieldErrors,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("reservations").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    date: parsed.data.date,
    players: parsed.data.players,
    notes: parsed.data.notes || null,
  });

  if (error) {
    return {
      status: "error",
      message: "No pudimos registrar su reserva. Intente nuevamente.",
    };
  }

  revalidatePath("/admin/dashboard/reservas");

  return {
    status: "success",
    message: "Su solicitud de reserva fue recibida. Nos pondremos en contacto para confirmarla.",
  };
}

export async function updateReservationStatus(id: string, status: ReservationStatus) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("reservations")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard/reservas");
}

export async function deleteReservation(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("reservations").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard/reservas");
}
