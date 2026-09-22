import Link from "next/link";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminEmptyState } from "@/components/admin/AdminStates";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { deleteTournament, toggleFeatured } from "@/lib/actions/tournaments";

export default async function AdminTournamentsPage() {
  const supabase = await createClient();
  const { data: tournaments } = await supabase
    .from("tournaments")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl text-forest">Torneos</h2>
          <p className="mt-1 font-sans text-sm text-navy/50">
            Cree, edite y destaque los torneos del club.
          </p>
        </div>
        <Link href="/admin/dashboard/torneos/nuevo" className="btn-primary">
          Nuevo torneo
        </Link>
      </div>

      <AdminTable headers={["Título", "Fecha", "Estado", "Destacado", "Acciones"]}>
        {(tournaments ?? []).map((t) => (
          <tr key={t.id}>
            <td className="px-4 py-3 font-sans text-sm text-navy">{t.title}</td>
            <td className="px-4 py-3 font-sans text-sm text-navy/70">{formatDate(t.date)}</td>
            <td className="px-4 py-3 font-sans text-xs uppercase tracking-widest2 text-navy/60">
              {t.status}
            </td>
            <td className="px-4 py-3">
              <form
                action={async () => {
                  "use server";
                  await toggleFeatured(t.id, !t.featured);
                }}
              >
                <button
                  type="submit"
                  className="font-sans text-xs uppercase tracking-widest2 text-gold-dark hover:underline"
                >
                  {t.featured ? "Quitar destaque" : "Destacar"}
                </button>
              </form>
            </td>
            <td className="flex gap-4 px-4 py-3">
              <Link
                href={`/admin/dashboard/torneos/${t.id}/editar`}
                className="font-sans text-xs uppercase tracking-widest2 text-navy/60 hover:underline"
              >
                Editar
              </Link>
              <form
                action={async () => {
                  "use server";
                  await deleteTournament(t.id);
                }}
              >
                <ConfirmSubmitButton
                  confirmMessage={`¿Eliminar el torneo "${t.title}"? Esta acción no se puede deshacer.`}
                  className="font-sans text-xs uppercase tracking-widest2 text-red-700 hover:underline"
                >
                  Eliminar
                </ConfirmSubmitButton>
              </form>
            </td>
          </tr>
        ))}
      </AdminTable>

      {(tournaments ?? []).length === 0 ? (
        <AdminEmptyState message="Aún no hay torneos creados." />
      ) : null}
    </div>
  );
}
