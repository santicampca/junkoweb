"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ContactStatus } from "@/lib/types";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Ingrese su nombre completo").max(120),
  email: z.string().trim().email("Ingrese un correo electrónico válido"),
  message: z.string().trim().min(10, "Su mensaje es muy corto").max(1000),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
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
  const { error } = await supabase.from("contact_messages").insert(parsed.data);

  if (error) {
    return {
      status: "error",
      message: "No pudimos enviar su mensaje. Intente nuevamente.",
    };
  }

  revalidatePath("/admin/dashboard");

  return {
    status: "success",
    message: "Gracias por escribirnos. Responderemos a la brevedad.",
  };
}

export async function markMessageRead(id: string, read: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_messages")
    .update({ read })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard");
}

export async function updateContactStatus(id: string, status: ContactStatus) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_messages")
    .update({ status, read: true })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/contactos");
}

export async function deleteContactMessage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard");
}
