"use client";

import { motion } from "framer-motion";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { CtaLink } from "@/components/CtaLink";
import { StatStrip } from "@/components/StatStrip";
import { cx } from "@/lib/utils";

interface FeatureSplitProps {
  eyebrow?: string;
  title: string;
  text: string;
  imageLabel: string;
  reverse?: boolean;
  id?: string;
  cta?: { label: string; href: string };
  stats?: string[];
}

/**
 * A big image + short text pair on its own solid backdrop (covers the
 * fixed photo for this section only), used where a section needs a
 * distinct, dominant image slot rather than a text-on-photo treatment.
 * The image is deliberately given more width than the text column.
 * Uses ImagePlaceholder instead of a stock/AI photo — real photography
 * can replace it later without any markup change.
 */
export function FeatureSplit({
  eyebrow,
  title,
  text,
  imageLabel,
  reverse,
  id,
  cta,
  stats,
}: FeatureSplitProps) {
  return (
    <section id={id} className="relative py-16 sm:py-24">
      <div className="absolute inset-0 bg-navy/70" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container-club relative flex flex-col gap-12"
      >
        <div className="grid items-center gap-10 md:grid-cols-5">
          <div className={cx("flex flex-col gap-5 md:col-span-2", reverse && "md:order-2")}>
            {eyebrow ? <span className="eyebrow text-gold">{eyebrow}</span> : null}
            <h2 className="font-display text-3xl uppercase tracking-wide text-ivory sm:text-4xl">
              {title}
            </h2>
            <div className="gold-rule" />
            <p className="font-serif text-lg leading-relaxed text-ivory/80">{text}</p>
            {cta ? (
              <CtaLink href={cta.href} variant="outline" className="w-fit">
                {cta.label}
              </CtaLink>
            ) : null}
          </div>
          <div
            className={cx(
              "relative aspect-[4/3] w-full overflow-hidden rounded-sm md:col-span-3",
              reverse && "md:order-1"
            )}
          >
            <ImagePlaceholder label={imageLabel} />
          </div>
        </div>
        {stats ? <StatStrip items={stats} /> : null}
      </motion.div>
    </section>
  );
}
