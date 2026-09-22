"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface HeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  secondaryCta: string;
  secondaryHref?: string;
}

/**
 * No longer renders its own background photo — the site-wide fixed
 * background (see SiteBackground) shows through directly behind this
 * section on every page, home included.
 */
export function Hero({
  eyebrow,
  title,
  subtitle,
  cta,
  secondaryCta,
  secondaryHref = "#descubrir",
}: HeroProps) {
  return (
    <section className="relative flex h-[92vh] min-h-[640px] w-full items-center justify-center overflow-hidden">
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
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Link href="/reservas" className="btn-primary">
            {cta}
          </Link>
          <Link href={secondaryHref} className="btn-outline">
            {secondaryCta}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
