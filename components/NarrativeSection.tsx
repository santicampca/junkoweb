"use client";

import { motion } from "framer-motion";
import { CtaLink } from "@/components/CtaLink";
import { cx } from "@/lib/utils";

interface NarrativeSectionProps {
  eyebrow?: string;
  title: string;
  text: string;
  align?: "left" | "center" | "right";
  cta?: { label: string; href: string };
  id?: string;
}

/**
 * Text sitting directly on the fixed background photo — no card, no
 * blur — with a soft vignette scoped to this section only so copy stays
 * legible wherever the photo happens to be light. This is the primary
 * narrative building block used down the home page instead of stacking
 * everything in floating panels.
 */
export function NarrativeSection({
  eyebrow,
  title,
  text,
  align = "left",
  cta,
  id,
}: NarrativeSectionProps) {
  return (
    <section id={id} className="relative py-20 sm:py-28">
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy/5 via-navy/50 to-navy/5"
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={cx(
          "container-club relative flex",
          align === "center" && "justify-center",
          align === "right" && "justify-end"
        )}
      >
        <div
          className={cx(
            "flex max-w-xl flex-col gap-6",
            align === "center" && "items-center text-center",
            align === "right" && "items-end text-right",
            align === "left" && "items-start text-left"
          )}
        >
          {eyebrow ? <span className="eyebrow text-gold drop-shadow-sm">{eyebrow}</span> : null}
          <h2 className="font-display text-3xl uppercase leading-tight tracking-wide text-ivory drop-shadow-lg sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <div className="gold-rule" />
          <p className="font-serif text-lg leading-relaxed text-ivory/90 drop-shadow-sm">
            {text}
          </p>
          {cta ? (
            <CtaLink href={cta.href} variant="outline" className="w-fit">
              {cta.label}
            </CtaLink>
          ) : null}
        </div>
      </motion.div>
    </section>
  );
}
