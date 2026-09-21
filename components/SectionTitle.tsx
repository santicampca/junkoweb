import { cx } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
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
      <h2
        className={cx(
          "font-display text-3xl uppercase tracking-wide sm:text-4xl",
          light ? "text-ivory" : "text-forest"
        )}
      >
        {title}
      </h2>
      <div className="gold-rule" />
      {description ? (
        <p
          className={cx(
            "max-w-2xl font-serif text-lg leading-relaxed",
            light ? "text-ivory/75" : "text-navy/70"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
