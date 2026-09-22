import type { Metadata } from "next";
import Link from "next/link";
import { MembershipCard } from "@/components/MembershipCard";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Membresías",
  description:
    "Conozca las modalidades de membresía de Junko Golf Club, un club de golf de montaña en El Junquito, La Guaira.",
  alternates: { canonical: "/membresias" },
};

export default async function MembershipsPage() {
  const supabase = await createClient();
  const { data: memberships } = await supabase
    .from("memberships")
    .select("*")
    .order("order", { ascending: true });

  return (
    <section className="relative py-16 sm:py-24">
      <div className="absolute inset-0 bg-navy/55" aria-hidden />
      <div className="container-club relative flex flex-col items-center gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="eyebrow text-gold">No vengas solo a jugar</span>
          <h1 className="font-display text-3xl uppercase tracking-wide text-ivory drop-shadow-lg sm:text-4xl">
            Forma parte del Junko
          </h1>
          <div className="gold-rule" />
          <p className="font-serif text-lg leading-relaxed text-ivory/85">
            Ser socio de El Junko es tener un lugar propio en la montaña. Estas son nuestras
            modalidades de membresía; contáctenos para conocer requisitos y condiciones vigentes.
          </p>
        </div>

        <div className="w-full max-w-3xl divide-y divide-ivory/15 border-y border-ivory/15">
          {(memberships ?? []).map((membership, index) => (
            <MembershipCard key={membership.id} membership={membership} index={index} />
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
