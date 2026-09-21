import { cx } from "@/lib/utils";

interface ImagePlaceholderProps {
  label?: string;
  className?: string;
  variant?: "dark" | "light";
}

/**
 * Elegant stand-in used across the site until real photography is
 * uploaded to Supabase Storage. Keeps layout/aspect ratios final so
 * swapping in real <Image> sources later requires no markup changes.
 */
export function ImagePlaceholder({
  label = "Junko Golf Club",
  className,
  variant = "dark",
}: ImagePlaceholderProps) {
  return (
    <div
      className={cx(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        variant === "dark"
          ? "bg-gradient-to-br from-forest via-forest-light to-navy"
          : "bg-gradient-to-br from-ivory via-ivory to-gold/10",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "24px 24px",
          color: variant === "dark" ? "#F9F8F5" : "#0B2818",
        }}
      />
      <div className="absolute inset-4 border border-gold/30" />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span
          className={cx(
            "font-display text-[10px] uppercase tracking-widest2",
            variant === "dark" ? "text-gold" : "text-gold-dark"
          )}
        >
          Junko Golf Club
        </span>
        <span
          className={cx(
            "max-w-[220px] font-serif text-sm italic",
            variant === "dark" ? "text-ivory/60" : "text-forest/50"
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
