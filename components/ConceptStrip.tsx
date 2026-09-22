"use client";

import { motion } from "framer-motion";

interface Concept {
  label: string;
  text: string;
}

interface ConceptStripProps {
  eyebrow?: string;
  title: string;
  concepts: Concept[];
}

/**
 * A horizontal editorial row of concepts (numbered labels + one line
 * each) rather than a grid of cards. Works fully without any hover or
 * JS — the numbering and layout carry the composition on their own.
 */
export function ConceptStrip({ eyebrow, title, concepts }: ConceptStripProps) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-navy/10 via-navy/45 to-navy/10" aria-hidden />
      <div className="container-club relative flex flex-col gap-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 text-center"
        >
          {eyebrow ? <span className="eyebrow text-gold drop-shadow-sm">{eyebrow}</span> : null}
          <h2 className="font-display text-3xl uppercase tracking-wide text-ivory drop-shadow-lg sm:text-4xl">
            {title}
          </h2>
          <div className="gold-rule" />
        </motion.div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {concepts.map((concept, index) => (
            <motion.div
              key={concept.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
              className="flex flex-col gap-3 border-t border-ivory/15 pt-5"
            >
              <span className="font-display text-sm text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-sans text-sm uppercase tracking-widest2 text-ivory">
                {concept.label}
              </h3>
              <p className="font-serif text-base leading-relaxed text-ivory/80">
                {concept.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
