"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CtaLink } from "@/components/CtaLink";

interface HeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaMicrocopy?: string;
  secondaryCta: string;
  secondaryHref?: string;
  caption?: string;
}

/**
 * No own background photo — the site-wide fixed background (see
 * SiteBackground) shows through directly behind this section. That
 * global overlay is kept very light so photos read as photos everywhere
 * else, so this section adds its own small extra bottom-weighted
 * gradient, scoped to the hero only, to keep the large title legible
 * without darkening the photo itself.
 */
export function Hero({
  eyebrow,
  title,
  subtitle,
  cta,
  ctaMicrocopy,
  secondaryCta,
  secondaryHref = "#descubrir",
  caption,
}: HeroProps) {
  return (
    <section className="relative flex h-[92vh] min-h-[640px] w-full items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy/25 via-navy/10 to-navy/50"
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="container-club relative z-10 flex flex-col items-center gap-6 text-center"
      >
        <span className="eyebrow text-gold drop-shadow-sm">{eyebrow}</span>
        <h1 className="font-display text-4xl uppercase leading-tight tracking-wide text-ivory drop-shadow-lg sm:text-6xl md:text-7xl">
          {title}
        </h1>
        <div className="gold-rule" />
        <p className="max-w-xl font-serif text-xl italic leading-relaxed text-ivory/85 drop-shadow-sm">
          {subtitle}
        </p>

        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
            <CtaLink href="/reservas" size="lg">
              {cta}
            </CtaLink>
            <Link
              href={secondaryHref}
              className="group inline-flex items-center gap-2 font-sans text-sm uppercase tracking-widest2 text-ivory/85 underline decoration-ivory/30 underline-offset-4 drop-shadow-sm transition-colors hover:text-gold hover:decoration-gold"
            >
              {secondaryCta}
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
          {ctaMicrocopy ? (
            <span className="font-serif text-base italic text-ivory/70 drop-shadow-sm">
              {ctaMicrocopy}
            </span>
          ) : null}
        </div>

        {caption ? (
          <span className="mt-2 font-sans text-[11px] uppercase tracking-widest2 text-ivory/60 drop-shadow-sm">
            {caption}
          </span>
        ) : null}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1, duration: 0.6 }, y: { delay: 1.2, duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <span className="block h-9 w-px bg-ivory/50" />
      </motion.div>
    </section>
  );
}
