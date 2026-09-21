import Image from "next/image";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import type { Tournament } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const statusLabel: Record<Tournament["status"], string> = {
  upcoming: "Próximo",
  past: "Finalizado",
  cancelled: "Cancelado",
};

export function TournamentCard({ tournament }: { tournament: Tournament }) {
  return (
    <article className="group flex flex-col overflow-hidden border border-forest/10 bg-white shadow-elegant">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {tournament.image ? (
          <Image
            src={tournament.image}
            alt={tournament.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder label={tournament.title} />
        )}
        {tournament.featured ? (
          <span className="absolute left-4 top-4 bg-gold px-3 py-1 font-sans text-[10px] uppercase tracking-widest2 text-navy">
            Destacado
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="eyebrow">{statusLabel[tournament.status]}</span>
        <h3 className="font-heading text-xl text-forest">{tournament.title}</h3>
        <p className="font-sans text-sm text-navy/60">{formatDate(tournament.date)}</p>
        {tournament.description ? (
          <p className="font-serif text-base leading-relaxed text-navy/70">
            {tournament.description}
          </p>
        ) : null}
      </div>
    </article>
  );
}
