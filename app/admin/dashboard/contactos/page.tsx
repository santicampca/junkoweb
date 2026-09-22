import { AdminTable } from "@/components/admin/AdminTable";
import { AdminEmptyState, AdminErrorState } from "@/components/admin/AdminStates";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { updateContactStatus, deleteContactMessage } from "@/lib/actions/contact";
import type { ContactStatus } from "@/lib/types";

const statusOptions: ContactStatus[] = [
  "nuevo",
  "contactado",
  "en_seguimiento",
  "convertido",
  "cerrado",
];

const statusLabels: Record<ContactStatus, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  en_seguimiento: "En seguimiento",
  convertido: "Convertido",
  cerrado: "Cerrado",
};

export default async function AdminContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q, status } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (q) query = query.ilike("name", `%${q}%`);
  if (status) query = query.eq("status", status);

  const { data: messages, error } = await query;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-2xl text-forest">Contactos</h2>
        <p className="mt-1 font-sans text-sm text-navy/50">
          Mensajes recibidos desde el formulario de contacto público.
        </p>
      </div>

      <form className="flex flex-wrap items-end gap-4" method="get">
        <label className="flex flex-col gap-1">
          <span className="font-sans text-xs uppercase tracking-widest2 text-navy/50">
            Buscar por nombre
          </span>
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Nombre del remitente"
            className="border border-navy/15 bg-transparent px-3 py-2 font-sans text-sm text-navy outline-none focus:border-gold"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-sans text-xs uppercase tracking-widest2 text-navy/50">
            Estado
          </span>
          <select
            name="status"
            defaultValue={status ?? ""}
            className="border border-navy/15 bg-transparent px-3 py-2 font-sans text-sm text-navy outline-none focus:border-gold"
          >
            <option value="">Todos</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {statusLabels[s]}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="btn-outline-dark">
          Filtrar
        </button>
      </form>

      {error ? <AdminErrorState /> : null}

      {!error ? (
        <AdminTable headers={["Nombre", "Correo", "Mensaje", "Fecha", "Estado", "Acciones"]}>
          {(messages ?? []).map((m) => (
            <tr key={m.id}>
              <td className="px-4 py-3 font-sans text-sm text-navy">{m.name}</td>
              <td className="px-4 py-3 font-sans text-xs text-navy/60">{m.email}</td>
              <td className="max-w-[280px] px-4 py-3 font-sans text-xs text-navy/50">
                {m.message}
              </td>
              <td className="px-4 py-3 font-sans text-sm text-navy/70">
                {formatDate(m.created_at)}
              </td>
              <td className="px-4 py-3">
                <form
                  action={async (formData) => {
                    "use server";
                    await updateContactStatus(m.id, formData.get("status") as ContactStatus);
                  }}
                  className="flex items-center gap-2"
                >
                  <select
                    name="status"
                    defaultValue={m.status}
                    className="border border-navy/15 bg-transparent px-2 py-1 font-sans text-xs uppercase tracking-widest2 text-navy"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {statusLabels[s]}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="font-sans text-xs uppercase tracking-widest2 text-gold-dark hover:underline"
                  >
                    Guardar
                  </button>
                </form>
              </td>
              <td className="px-4 py-3">
                <form
                  action={async () => {
                    "use server";
                    await deleteContactMessage(m.id);
                  }}
                >
                  <ConfirmSubmitButton
                    confirmMessage={`¿Eliminar el mensaje de ${m.name}? Esta acción no se puede deshacer.`}
                    className="font-sans text-xs uppercase tracking-widest2 text-red-700 hover:underline"
                  >
                    Eliminar
                  </ConfirmSubmitButton>
                </form>
              </td>
            </tr>
          ))}
        </AdminTable>
      ) : null}

      {!error && (messages ?? []).length === 0 ? (
        <AdminEmptyState
          message={
            q || status
              ? "Ningún contacto coincide con la búsqueda o el filtro aplicado."
              : "Aún no hay mensajes de contacto nuevos."
          }
        />
      ) : null}
    </div>
  );
}
