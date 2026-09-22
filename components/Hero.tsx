"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
}

/**
 * No longer renders its own background photo — the site-wide fixed
 * background (see SiteBackground) shows through directly behind this
 * section on every page, home included.
 */
export function Hero({ title, subtitle, cta }: HeroProps) {
  return (
    <section className="relative flex h-[92vh] min-h-[640px] w-full items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="container-club relative z-10 flex flex-col items-center gap-6 text-center"
      >
        <span className="eyebrow text-gold">Golf · Montaña · Tradición</span>
        <h1 className="font-display text-4xl uppercase leading-tight tracking-wide text-ivory drop-shadow-lg sm:text-6xl md:text-7xl">
          {title}
        </h1>
        <div className="gold-rule" />
        <p className="max-w-xl font-serif text-xl italic leading-relaxed text-ivory/80">
          {subtitle}
        </p>
        <Link href="/reservas" className="btn-primary mt-4">
          {cta}
        </Link>
      </motion.div>
    </section>
  );
}
