import type { Metadata } from "next";
import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { MembershipCard } from "@/components/MembershipCard";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Membresías",
  description:
    "Conozca las modalidades de membresía de Junko Golf Club, un club de golf de montaña en El Junquito, Vargas.",
};

export default async function MembershipsPage() {
  const supabase = await createClient();
  const { data: memberships } = await supabase
    .from("memberships")
    .select("*")
    .order("order", { ascending: true });

  return (
    <section className="py-16 sm:py-24">
      <div className="container-club flex flex-col items-center gap-16">
        <div className="glass-card p-8 sm:p-12">
          <SectionTitle
            eyebrow="Membresías"
            title="Formar parte del Junko"
            description="Ser socio de El Junko es tener un lugar propio en la montaña. Estas son nuestras modalidades de membresía; contáctenos para conocer requisitos y condiciones vigentes."
          />
        </div>

        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(memberships ?? []).map((membership) => (
            <MembershipCard key={membership.id} membership={membership} />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-serif text-base text-ivory/70">
            ¿Tiene preguntas sobre membresías?
          </p>
          <Link href="/contacto" className="btn-outline w-fit">
            Escríbanos
          </Link>
        </div>
      </div>
    </section>
  );
}
