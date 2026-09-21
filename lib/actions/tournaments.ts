"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const tournamentSchema = z.object({
  title: z.string().trim().min(2).max(160),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
  image: z.string().trim().max(500).optional().or(z.literal("")),
  date: z.string().trim().min(1),
  status: z.enum(["upcoming", "past", "cancelled"]),
  featured: z.coerce.boolean().optional(),
});

export type TournamentFormState = { status: "idle" | "error"; message?: string };

export async function createTournament(
  _prevState: TournamentFormState,
  formData: FormData
): Promise<TournamentFormState> {
  const parsed = tournamentSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image"),
    date: formData.get("date"),
    status: formData.get("status"),
    featured: formData.get("featured") === "on",
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("tournaments").insert({
    title: parsed.data.title,
    description: parsed.data.description || null,
    image: parsed.data.image || null,
    date: parsed.data.date,
    status: parsed.data.status,
    featured: parsed.data.featured ?? false,
  });

  if (error) return { status: "error", message: error.message };

  revalidatePath("/admin/dashboard/torneos");
  revalidatePath("/torneos");
  revalidatePath("/");
  redirect("/admin/dashboard/torneos");
}

export async function updateTournament(id: string, formData: FormData) {
  const parsed = tournamentSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image"),
    date: formData.get("date"),
    status: formData.get("status"),
    featured: formData.get("featured") === "on",
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Datos inválidos");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("tournaments")
    .update({
      title: parsed.data.title,
      description: parsed.data.description || null,
      image: parsed.data.image || null,
      date: parsed.data.date,
      status: parsed.data.status,
      featured: parsed.data.featured ?? false,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/dashboard/torneos");
  revalidatePath("/torneos");
  revalidatePath("/");
  redirect("/admin/dashboard/torneos");
}

export async function deleteTournament(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("tournaments").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard/torneos");
  revalidatePath("/torneos");
  revalidatePath("/");
}

export async function toggleFeatured(id: string, featured: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tournaments")
    .update({ featured })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard/torneos");
  revalidatePath("/torneos");
  revalidatePath("/");
}
