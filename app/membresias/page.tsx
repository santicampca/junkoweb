import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { MembershipCard } from "@/components/MembershipCard";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Membresías",
  description:
    "Descubra los distintos tipos de membresía de Junko Golf Club: individual, familiar, corporativa y honoraria.",
};

export default async function MembershipsPage() {
  const supabase = await createClient();
  const { data: memberships } = await supabase
    .from("memberships")
    .select("*")
    .order("order", { ascending: true });

  return (
    <section className="panel-ivory py-24 sm:py-32">
      <div className="container-club flex flex-col items-center gap-16">
        <SectionTitle
          eyebrow="Membresías"
          title="Forme parte del club"
          description="Ofrecemos distintas modalidades de membresía para adaptarse a cada etapa de vida de nuestros socios. Contáctenos para conocer requisitos y tarifas vigentes."
        />

        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(memberships ?? []).map((membership) => (
            <MembershipCard key={membership.id} membership={membership} />
          ))}
        </div>
      </div>
    </section>
  );
}
