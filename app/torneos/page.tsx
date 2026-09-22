import type { Metadata } from "next";
import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { TournamentCard } from "@/components/TournamentCard";
import { createClient } from "@/lib/supabase/server";
import type { Tournament } from "@/lib/types";

export const metadata: Metadata = {
  title: "Torneos",
  description: "Calendario de torneos de Junko Golf Club, club de golf de montaña en El Junquito, Vargas.",
  alternates: { canonical: "/torneos" },
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
    <section className="py-16 sm:py-24">
      <div className="container-club flex flex-col gap-16">
        <SectionTitle
          as="h1"
          eyebrow="Calendario"
          title="Torneos en El Junko"
          description="Nuestro calendario de competencias, y los resultados de ediciones anteriores."
        />

        {upcoming.length > 0 ? (
          <div className="flex flex-col gap-8">
            <h3 className="font-display text-xl uppercase tracking-widest2 text-gold">
              Próximo en El Junko
            </h3>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((t) => (
                <TournamentCard key={t.id} tournament={t} />
              ))}
            </div>
          </div>
        ) : null}

        {past.length > 0 ? (
          <div className="flex flex-col gap-8">
            <h3 className="font-display text-xl uppercase tracking-widest2 text-gold">
              Torneos anteriores
            </h3>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((t) => (
                <TournamentCard key={t.id} tournament={t} />
              ))}
            </div>
          </div>
        ) : null}

        {tournaments.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="font-serif text-lg text-ivory/80">
              Próximamente anunciaremos nuestro calendario de torneos.
            </p>
          </div>
        ) : null}

        <div className="flex flex-col items-center gap-4 pt-4 text-center">
          <p className="font-serif text-base text-ivory/70">
            ¿Quiere jugar antes del próximo torneo?
          </p>
          <Link href="/reservas" className="btn-outline w-fit">
            Reservar una ronda
          </Link>
        </div>
      </div>
    </section>
  );
}
