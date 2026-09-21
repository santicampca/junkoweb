"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
}

export function Hero({ title, subtitle, cta }: HeroProps) {
  return (
    <section className="relative flex h-[92vh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <ImagePlaceholder label="Fotografía del recorrido — próximamente" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="container-club relative z-10 flex flex-col items-center gap-6 text-center"
      >
        <span className="eyebrow text-gold">Golf · Montaña · Tradición</span>
        <h1 className="font-display text-4xl uppercase leading-tight tracking-wide text-ivory sm:text-6xl md:text-7xl">
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
