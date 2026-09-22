"use client";

import { MotionConfig } from "framer-motion";

/**
 * Wraps the app so every Framer Motion animation (Hero, ExperienceShowcase,
 * NextTournamentFeature, FeatureSplit, NarrativeSection, StatStrip)
 * automatically respects the OS-level prefers-reduced-motion setting,
 * without having to thread a check through each component individually.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
