import { SectionTitle } from "@/components/SectionTitle";

/**
 * Shared shell for the four legal pages. These are informational
 * templates pending real legal review — never presented as legal advice,
 * and any fact we don't actually have (RIF, dirección, representante,
 * etc.) is marked [PENDIENTE DE CONFIRMAR] instead of invented.
 */
export function LegalPageLayout({
  eyebrow,
  title,
  updatedAt,
  children,
}: {
  eyebrow: string;
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-club flex flex-col gap-10">
        <SectionTitle as="h1" eyebrow={eyebrow} title={title} align="left" />

        <div className="glass-card flex flex-col gap-6 p-8 font-serif text-base leading-relaxed text-ivory/80 sm:p-12">
          <p className="font-sans text-xs uppercase tracking-widest2 text-ivory/40">
            Última actualización: {updatedAt}
          </p>
          <div className="border-l-2 border-gold/40 pl-4 font-sans text-sm text-ivory/60">
            Este documento es una plantilla informativa pendiente de validación legal. No
            constituye asesoría jurídica. Junko Golf Club completará y revisará este contenido
            con asesoría legal calificada antes de considerarlo definitivo.
          </div>
          <div className="flex flex-col gap-6 [&_h2]:font-display [&_h2]:text-lg [&_h2]:uppercase [&_h2]:tracking-widest2 [&_h2]:text-gold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
