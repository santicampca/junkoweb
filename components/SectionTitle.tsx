import { cx } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Set false only for a title placed on the rare solid light panel. */
  light?: boolean;
  /** "h1" when this is the page's sole/primary heading (e.g. a page with
   * no other h1). Defaults to "h2" — same as before this prop existed. */
  as?: "h1" | "h2";
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  light = true,
  as: Heading = "h2",
}: SectionTitleProps) {
  return (
    <div
      className={cx(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left"
      )}
    >
      {eyebrow ? (
        <span className={cx("eyebrow", light && "text-gold")}>{eyebrow}</span>
      ) : null}
      <Heading
        className={cx(
          "font-display text-3xl uppercase tracking-wide sm:text-4xl",
          light ? "text-ivory drop-shadow-sm" : "text-forest"
        )}
      >
        {title}
      </Heading>
      <div className="gold-rule" />
      {description ? (
        <p
          className={cx(
            "max-w-2xl font-serif text-lg leading-relaxed",
            light ? "text-ivory/80" : "text-navy/70"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
