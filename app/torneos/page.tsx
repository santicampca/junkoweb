import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { TournamentCard } from "@/components/TournamentCard";
import { createClient } from "@/lib/supabase/server";
import type { Tournament } from "@/lib/types";

export const metadata: Metadata = {
  title: "Torneos",
  description: "Calendario de torneos y competencias de Junko Golf Club.",
};

export default async function TournamentsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tournaments")
    .select("*")
    .order("date", { ascending: false });
  const tournaments = (data ?? []) as Tournament[];

  const upcoming = tournaments.filter((t) => t.status === "upcoming");
  const past = tournaments.filter((t) => t.status !== "upcoming");

  return (
    <section className="container-club flex flex-col gap-20 py-24 sm:py-32">
      <SectionTitle
        eyebrow="Calendario"
        title="Torneos"
        description="Descubra nuestros próximos torneos y revise los resultados de ediciones anteriores."
      />

      {upcoming.length > 0 ? (
        <div className="flex flex-col gap-8">
          <h3 className="font-heading text-2xl text-forest">Próximos</h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((t) => (
              <TournamentCard key={t.id} tournament={t} />
            ))}
          </div>
        </div>
      ) : null}

      {past.length > 0 ? (
        <div className="flex flex-col gap-8">
          <h3 className="font-heading text-2xl text-forest">Anteriores</h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((t) => (
              <TournamentCard key={t.id} tournament={t} />
            ))}
          </div>
        </div>
      ) : null}

      {tournaments.length === 0 ? (
        <p className="text-center font-serif text-lg text-navy/60">
          Próximamente anunciaremos nuestro calendario de torneos.
        </p>
      ) : null}
    </section>
  );
}
