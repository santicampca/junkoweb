"use client";

import { motion } from "framer-motion";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { cx } from "@/lib/utils";

interface FeatureSplitProps {
  eyebrow?: string;
  title: string;
  text: string;
  imageLabel: string;
  reverse?: boolean;
  id?: string;
}

/**
 * Text + image pair on its own solid backdrop (covers the fixed photo
 * for this section only), used where a section needs a distinct image
 * slot rather than a text-on-photo treatment. Uses ImagePlaceholder
 * instead of a stock/AI photo — real photography can replace it later
 * without any markup change.
 */
export function FeatureSplit({
  eyebrow,
  title,
  text,
  imageLabel,
  reverse,
  id,
}: FeatureSplitProps) {
  return (
    <section id={id} className="relative py-16 sm:py-24">
      <div className="absolute inset-0 bg-navy/70" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container-club relative grid items-center gap-10 md:grid-cols-2"
      >
        <div className={cx("flex flex-col gap-5", reverse && "md:order-2")}>
          {eyebrow ? <span className="eyebrow text-gold">{eyebrow}</span> : null}
          <h2 className="font-display text-3xl uppercase tracking-wide text-ivory sm:text-4xl">
            {title}
          </h2>
          <div className="gold-rule" />
          <p className="font-serif text-lg leading-relaxed text-ivory/80">{text}</p>
        </div>
        <div className={cx("relative aspect-[4/3] w-full overflow-hidden rounded-sm", reverse && "md:order-1")}>
          <ImagePlaceholder label={imageLabel} />
        </div>
      </motion.div>
    </section>
  );
}
