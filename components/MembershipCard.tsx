import type { Membership } from "@/lib/types";

/**
 * An editorial list row, not a pricing card — no box, no border of its
 * own. Meant to sit inside a `divide-y` list so membership types read
 * like a considered list rather than a SaaS plan comparison.
 */
export function MembershipCard({
  membership,
  index,
}: {
  membership: Membership;
  index?: number;
}) {
  return (
    <div className="flex flex-col gap-3 py-7 sm:flex-row sm:items-baseline sm:gap-8">
      {typeof index === "number" ? (
        <span className="font-display text-sm text-gold sm:w-10 sm:shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : null}
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="font-heading text-2xl text-ivory">{membership.title}</h3>
        {membership.description ? (
          <p className="font-serif text-base leading-relaxed text-ivory/75">
            {membership.description}
          </p>
        ) : null}
      </div>
      <span className="font-sans text-xs uppercase tracking-widest2 text-ivory/50 sm:shrink-0">
        Información a solicitud
      </span>
    </div>
  );
}
