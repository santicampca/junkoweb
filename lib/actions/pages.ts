"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updatePageContent(slug: string, formData: FormData) {
  const content: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (key === "slug") continue;
    content[key] = String(value);
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("pages")
    .update({ content })
    .eq("slug", slug);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/dashboard/contenido");
  revalidatePath("/");
  revalidatePath(`/${slug === "home" ? "" : slug}`);
}
