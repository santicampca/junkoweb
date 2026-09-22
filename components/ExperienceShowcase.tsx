"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { cx } from "@/lib/utils";

interface Concept {
  label: string;
  text: string;
}

interface ExperienceShowcaseProps {
  eyebrow?: string;
  title: string;
  concepts: Concept[];
}

/**
 * Desktop: one large image paired with a list of concepts — hovering
 * (or focusing, or clicking) a concept swaps the image, so the section
 * reads as an editorial "explore the club" moment instead of a grid of
 * green cards. Mobile drops the interaction entirely and lays every
 * concept out as its own small image + text pair, since a hover-driven
 * composition doesn't translate to touch.
 */
export function ExperienceShowcase({ eyebrow, title, concepts }: ExperienceShowcaseProps) {
  const [active, setActive] = useState(0);
  const current = concepts[active];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-navy/60" aria-hidden />
      <div className="container-club relative flex flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          {eyebrow ? <span className="eyebrow text-gold drop-shadow-sm">{eyebrow}</span> : null}
          <h2 className="font-display text-3xl uppercase tracking-wide text-ivory drop-shadow-lg sm:text-4xl">
            {title}
          </h2>
          <div className="gold-rule" />
        </div>

        {/* Desktop: image swaps with the selected concept */}
        <div className="hidden md:grid md:grid-cols-2 md:items-center md:gap-14">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <ImagePlaceholder label={current.label} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col">
            {concepts.map((concept, index) => (
              <button
                key={concept.label}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={cx(
                  "flex flex-col gap-2 border-t border-ivory/15 py-5 text-left transition-colors last:border-b",
                  index === active ? "text-ivory" : "text-ivory/45 hover:text-ivory/75"
                )}
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-display text-sm text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-sm uppercase tracking-widest2">
                    {concept.label}
                  </span>
                </span>
                {index === active ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="font-serif text-base leading-relaxed text-ivory/80"
                  >
                    {concept.text}
                  </motion.p>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: a clean vertical sequence, no interaction required */}
        <div className="flex flex-col gap-10 md:hidden">
          {concepts.map((concept, index) => (
            <div key={concept.label} className="flex flex-col gap-4">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm">
                <ImagePlaceholder label={concept.label} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="flex items-baseline gap-3">
                  <span className="font-display text-sm text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-sm uppercase tracking-widest2 text-ivory">
                    {concept.label}
                  </span>
                </span>
                <p className="font-serif text-base leading-relaxed text-ivory/80">{concept.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
