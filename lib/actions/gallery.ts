"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const gallerySchema = z.object({
  image: z.string().trim().min(1, "La imagen es requerida").max(500),
  category: z.enum(["hero", "gallery", "club", "tournaments", "memberships"]),
  order: z.coerce.number().int().min(0).default(0),
  alt: z.string().trim().max(200).optional().or(z.literal("")),
});

export type GalleryFormState = { status: "idle" | "error"; message?: string };

export async function createGalleryItem(
  _prevState: GalleryFormState,
  formData: FormData
): Promise<GalleryFormState> {
  const parsed = gallerySchema.safeParse({
    image: formData.get("image"),
    category: formData.get("category"),
    order: formData.get("order"),
    alt: formData.get("alt"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("gallery").insert({
    image: parsed.data.image,
    category: parsed.data.category,
    order: parsed.data.order,
    alt: parsed.data.alt || null,
  });

  if (error) return { status: "error", message: error.message };

  revalidatePath("/admin/dashboard/galeria");
  revalidatePath("/galeria");
  revalidatePath("/");
  redirect("/admin/dashboard/galeria");
}

export async function updateGalleryOrder(id: string, order: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("gallery").update({ order }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard/galeria");
  revalidatePath("/galeria");
  revalidatePath("/");
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard/galeria");
  revalidatePath("/galeria");
  revalidatePath("/");
}
