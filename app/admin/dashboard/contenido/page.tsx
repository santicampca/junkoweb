import { AdminEditor, AdminField, adminInputClass } from "@/components/admin/AdminEditor";
import { createClient } from "@/lib/supabase/server";
import { updatePageContent } from "@/lib/actions/pages";
import type { Page } from "@/lib/types";

const fieldConfig: Record<
  string,
  { key: string; label: string; textarea?: boolean }[]
> = {
  home: [
    { key: "hero_title", label: "Título del hero" },
    { key: "hero_subtitle", label: "Subtítulo del hero" },
    { key: "hero_cta", label: "Texto del botón principal" },
    { key: "intro_title", label: "Título de introducción" },
    { key: "intro_text", label: "Texto de introducción", textarea: true },
    { key: "experience_title", label: "Título de experiencia" },
    { key: "experience_text", label: "Texto de experiencia", textarea: true },
    { key: "club_title", label: "Título del club" },
    { key: "club_text", label: "Texto del club", textarea: true },
    { key: "cta_final_title", label: "Título CTA final" },
    { key: "cta_final_text", label: "Texto CTA final", textarea: true },
  ],
  club: [
    { key: "title", label: "Título" },
    { key: "text", label: "Texto institucional", textarea: true },
  ],
  contacto: [
    { key: "title", label: "Título" },
    { key: "text", label: "Texto introductorio", textarea: true },
    { key: "address", label: "Dirección" },
    { key: "phone", label: "Teléfono" },
    { key: "email", label: "Correo electrónico" },
  ],
};

const pageLabels: Record<string, string> = {
  home: "Inicio",
  club: "El Club",
  contacto: "Contacto",
};

export default async function AdminContentPage() {
  const supabase = await createClient();
  const { data: pages } = await supabase.from("pages").select("*");

  const bySlug = new Map((pages ?? []).map((p) => [p.slug, p]));

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="font-heading text-2xl text-forest">Contenido</h2>
        <p className="mt-1 font-sans text-sm text-navy/50">
          Edite los textos del sitio público sin tocar código.
        </p>
      </div>

      {Object.entries(fieldConfig).map(([slug, fields]) => {
        const page = bySlug.get(slug) as Page | undefined;
        const content = page?.content ?? {};

        const action = async (formData: FormData) => {
          "use server";
          await updatePageContent(slug, formData);
        };

        return (
          <AdminEditor key={slug} title={pageLabels[slug] ?? slug}>
            <form action={action} className="grid gap-6 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.key} className={field.textarea ? "sm:col-span-2" : undefined}>
                  <AdminField label={field.label}>
                    {field.textarea ? (
                      <textarea
                        name={field.key}
                        rows={4}
                        defaultValue={content[field.key] ?? ""}
                        className={adminInputClass}
                      />
                    ) : (
                      <input
                        name={field.key}
                        defaultValue={content[field.key] ?? ""}
                        className={adminInputClass}
                      />
                    )}
                  </AdminField>
                </div>
              ))}
              <div className="sm:col-span-2">
                <button type="submit" className="btn-primary w-fit">
                  Guardar cambios
                </button>
              </div>
            </form>
          </AdminEditor>
        );
      })}
    </div>
  );
}
