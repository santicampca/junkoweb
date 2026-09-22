import type { Membership } from "@/lib/types";

export function MembershipCard({ membership }: { membership: Membership }) {
  return (
    <div className="glass-card flex h-full flex-col gap-4 p-8 text-center transition-colors hover:border-gold/50">
      <span className="mx-auto h-px w-10 bg-gold" />
      <h3 className="font-heading text-2xl text-ivory">{membership.title}</h3>
      {membership.description ? (
        <p className="font-serif text-base leading-relaxed text-ivory/75">
          {membership.description}
        </p>
      ) : null}
      <p className="mt-auto pt-4 font-sans text-xs uppercase tracking-widest2 text-gold">
        Información y tarifas a solicitud
      </p>
    </div>
  );
}
