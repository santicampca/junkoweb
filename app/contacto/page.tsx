import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { ContactForm } from "@/components/ContactForm";
import { createClient } from "@/lib/supabase/server";
import type { Page } from "@/lib/types";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Póngase en contacto con Junko Golf Club.",
};

export default async function ContactPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pages")
    .select("content")
    .eq("slug", "contacto")
    .maybeSingle();

  const content = (data?.content as Page["content"]) ?? {
    title: "Contacto",
    text: "",
    address: "Por confirmar",
    phone: "Por confirmar",
    email: "info@junkogolfclub.com",
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="container-club grid gap-8 md:grid-cols-2">
        <div className="glass-card flex flex-col gap-8 p-8 sm:p-12">
          <SectionTitle
            eyebrow="Contacto"
            title={content.title}
            description={content.text}
            align="left"
          />
          <dl className="flex flex-col gap-4 font-sans text-sm text-ivory/75">
            <div>
              <dt className="uppercase tracking-widest2 text-xs text-gold">Dirección</dt>
              <dd className="mt-1">{content.address}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest2 text-xs text-gold">Teléfono</dt>
              <dd className="mt-1">{content.phone}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest2 text-xs text-gold">Correo</dt>
              <dd className="mt-1">{content.email}</dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
