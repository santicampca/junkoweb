import Link from "next/link";
import { AdminTable } from "@/components/admin/AdminTable";
import { createClient } from "@/lib/supabase/server";
import { deleteMembership } from "@/lib/actions/memberships";

export default async function AdminMembershipsPage() {
  const supabase = await createClient();
  const { data: memberships } = await supabase
    .from("memberships")
    .select("*")
    .order("order", { ascending: true });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl text-forest">Membresías</h2>
          <p className="mt-1 font-sans text-sm text-navy/50">
            Gestione los tipos de membresía disponibles.
          </p>
        </div>
        <Link href="/admin/dashboard/membresias/nuevo" className="btn-primary">
          Nueva membresía
        </Link>
      </div>

      <AdminTable headers={["Título", "Descripción", "Orden", "Acciones"]}>
        {(memberships ?? []).map((m) => (
          <tr key={m.id}>
            <td className="px-4 py-3 font-sans text-sm text-navy">{m.title}</td>
            <td className="max-w-sm px-4 py-3 font-sans text-xs text-navy/50">
              {m.description}
            </td>
            <td className="px-4 py-3 font-sans text-sm text-navy/70">{m.order}</td>
            <td className="flex gap-4 px-4 py-3">
              <Link
                href={`/admin/dashboard/membresias/${m.id}/editar`}
                className="font-sans text-xs uppercase tracking-widest2 text-navy/60 hover:underline"
              >
                Editar
              </Link>
              <form
                action={async () => {
                  "use server";
                  await deleteMembership(m.id);
                }}
              >
                <button
                  type="submit"
                  className="font-sans text-xs uppercase tracking-widest2 text-red-700 hover:underline"
                >
                  Eliminar
                </button>
              </form>
            </td>
          </tr>
        ))}
      </AdminTable>

      {(memberships ?? []).length === 0 ? (
        <p className="font-sans text-sm text-navy/40">Aún no hay membresías creadas.</p>
      ) : null}
    </div>
  );
}
