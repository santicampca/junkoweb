import type { Membership } from "@/lib/types";

export function MembershipCard({ membership }: { membership: Membership }) {
  return (
    <div className="flex h-full flex-col gap-4 border border-gold/20 bg-navy/[0.02] p-8 text-center transition-colors hover:border-gold/50">
      <span className="mx-auto h-px w-10 bg-gold" />
      <h3 className="font-heading text-2xl text-forest">{membership.title}</h3>
      {membership.description ? (
        <p className="font-serif text-base leading-relaxed text-navy/70">
          {membership.description}
        </p>
      ) : null}
      <p className="mt-auto pt-4 font-sans text-xs uppercase tracking-widest2 text-gold-dark">
        Información y tarifas a solicitud
      </p>
    </div>
  );
}
