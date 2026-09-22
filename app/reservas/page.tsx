import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { ReservationForm } from "@/components/ReservationForm";
import { createClient } from "@/lib/supabase/server";
import type { Page } from "@/lib/types";

export const metadata: Metadata = {
  title: "Reservas",
  description: "Reserve su próxima ronda de golf en Junko Golf Club.",
  alternates: { canonical: "/reservas" },
};

export default async function ReservationsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pages")
    .select("content")
    .eq("slug", "contacto")
    .maybeSingle();

  const content = data?.content as Page["content"] | undefined;

  return (
    <section className="py-16 sm:py-24">
      <div className="container-club flex flex-col items-center gap-12">
        <SectionTitle
          eyebrow="Reservas"
          title="Reserve su ronda"
          description="Complete el siguiente formulario y le confirmamos por WhatsApp a la brevedad."
        />
        <ReservationForm whatsappPhone={content?.phone} />
      </div>
    </section>
  );
}
