"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { formatDate } from "@/lib/utils";
import type { Tournament } from "@/lib/types";

interface NextTournamentFeatureProps {
  tournament: Tournament | null;
}

/**
 * The homepage's tournament block — one large editorial pairing of
 * photo + essentials, not another card grid. When nothing is scheduled
 * it still renders (never an empty gap), with an editorial fallback
 * instead of silence.
 */
export function NextTournamentFeature({ tournament }: NextTournamentFeatureProps) {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="absolute inset-0 bg-navy/65" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container-club relative grid items-center gap-10 md:grid-cols-2"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
          {tournament?.image ? (
            <Image
              src={tournament.image}
              alt={tournament.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder label={tournament?.title ?? "Torneos"} />
          )}
        </div>

        <div className="flex flex-col gap-5">
          <span className="eyebrow text-gold">El próximo tee time</span>
          {tournament ? (
            <>
              <h2 className="font-display text-3xl uppercase tracking-wide text-ivory sm:text-4xl">
                {tournament.title}
              </h2>
              <div className="gold-rule" />
              <p className="font-sans text-sm uppercase tracking-widest2 text-ivory/60">
                {formatDate(tournament.date)}
              </p>
              {tournament.description ? (
                <p className="font-serif text-lg leading-relaxed text-ivory/80">
                  {tournament.description}
                </p>
              ) : null}
              <Link href="/torneos" className="btn-outline w-fit">
                Ver torneos
              </Link>
            </>
          ) : (
            <>
              <h2 className="font-display text-3xl uppercase tracking-wide text-ivory sm:text-4xl">
                Próximamente en El Junko
              </h2>
              <div className="gold-rule" />
              <p className="font-serif text-lg leading-relaxed text-ivory/80">
                Estamos preparando el próximo torneo. Mientras tanto, el campo sigue abierto para
                su ronda.
              </p>
              <Link href="/reservas" className="btn-outline w-fit">
                Reservar una ronda
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
