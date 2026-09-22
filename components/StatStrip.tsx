"use client";

import { motion } from "framer-motion";
import { cx } from "@/lib/utils";

interface StatStripProps {
  items: string[];
  className?: string;
}

/**
 * A thin horizontal band of short labels — deliberately not a row of
 * cards. Used for facts that are safe to state without a database
 * (thematic, not measurable claims like hole counts or prices).
 */
export function StatStrip({ items, className }: StatStripProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cx(
        "flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-y border-ivory/15 py-5",
        className
      )}
    >
      {items.map((item, index) => (
        <span key={item} className="flex items-center gap-6">
          <span className="font-sans text-xs uppercase tracking-widest2 text-ivory/75">
            {item}
          </span>
          {index < items.length - 1 ? <span className="h-1 w-1 rounded-full bg-gold" /> : null}
        </span>
      ))}
    </motion.div>
  );
}
