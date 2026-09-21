"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const membershipSchema = z.object({
  title: z.string().trim().min(2).max(160),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
  order: z.coerce.number().int().min(0).default(0),
});

export type MembershipFormState = { status: "idle" | "error"; message?: string };

export async function createMembership(
  _prevState: MembershipFormState,
  formData: FormData
): Promise<MembershipFormState> {
  const parsed = membershipSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    order: formData.get("order"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("memberships").insert({
    title: parsed.data.title,
    description: parsed.data.description || null,
    order: parsed.data.order,
  });

  if (error) return { status: "error", message: error.message };

  revalidatePath("/admin/dashboard/membresias");
  revalidatePath("/membresias");
  revalidatePath("/");
  redirect("/admin/dashboard/membresias");
}

export async function updateMembership(id: string, formData: FormData) {
  const parsed = membershipSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    order: formData.get("order"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Datos inválidos");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("memberships")
    .update({
      title: parsed.data.title,
      description: parsed.data.description || null,
      order: parsed.data.order,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/dashboard/membresias");
  revalidatePath("/membresias");
  revalidatePath("/");
  redirect("/admin/dashboard/membresias");
}

export async function deleteMembership(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("memberships").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard/membresias");
  revalidatePath("/membresias");
  revalidatePath("/");
}
