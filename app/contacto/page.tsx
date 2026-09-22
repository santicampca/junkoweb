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
    <section className="panel-ivory py-24 sm:py-32">
      <div className="container-club grid gap-16 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <SectionTitle
            eyebrow="Contacto"
            title={content.title}
            description={content.text}
            align="left"
          />
          <dl className="flex flex-col gap-4 font-sans text-sm text-navy/70">
            <div>
              <dt className="uppercase tracking-widest2 text-xs text-gold-dark">Dirección</dt>
              <dd className="mt-1">{content.address}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest2 text-xs text-gold-dark">Teléfono</dt>
              <dd className="mt-1">{content.phone}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest2 text-xs text-gold-dark">Correo</dt>
              <dd className="mt-1">{content.email}</dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
