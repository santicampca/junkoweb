import { AdminTable } from "@/components/admin/AdminTable";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { updateReservationStatus, deleteReservation } from "@/lib/actions/reservations";
import type { ReservationStatus } from "@/lib/types";

const statusOptions: ReservationStatus[] = ["pending", "confirmed", "cancelled"];

export default async function AdminReservationsPage() {
  const supabase = await createClient();
  const { data: reservations } = await supabase
    .from("reservations")
    .select("*")
    .order("date", { ascending: true });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-2xl text-forest">Reservas</h2>
        <p className="mt-1 font-sans text-sm text-navy/50">
          Gestione las solicitudes de reserva recibidas desde el sitio público.
        </p>
      </div>

      <AdminTable
        headers={["Nombre", "Contacto", "Fecha", "Hora", "Jugadores", "Notas", "Estado", "Acciones"]}
      >
        {(reservations ?? []).map((r) => (
          <tr key={r.id}>
            <td className="px-4 py-3 font-sans text-sm text-navy">{r.name}</td>
            <td className="px-4 py-3 font-sans text-xs text-navy/60">
              {r.phone ? <p>{r.phone}</p> : null}
              {r.email ? <p>{r.email}</p> : null}
            </td>
            <td className="px-4 py-3 font-sans text-sm text-navy/70">{formatDate(r.date)}</td>
            <td className="px-4 py-3 font-sans text-sm text-navy/70">
              {r.preferred_time ?? "—"}
            </td>
            <td className="px-4 py-3 font-sans text-sm text-navy/70">{r.players}</td>
            <td className="max-w-[200px] px-4 py-3 font-sans text-xs text-navy/50">
              {r.notes ?? "—"}
            </td>
            <td className="px-4 py-3">
              <form
                action={async (formData) => {
                  "use server";
                  await updateReservationStatus(
                    r.id,
                    formData.get("status") as ReservationStatus
                  );
                }}
                className="flex items-center gap-2"
              >
                <select
                  name="status"
                  defaultValue={r.status}
                  className="border border-navy/15 bg-transparent px-2 py-1 font-sans text-xs uppercase tracking-widest2 text-navy"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s === "pending" ? "Pendiente" : s === "confirmed" ? "Confirmada" : "Cancelada"}
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
                  await deleteReservation(r.id);
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

      {(reservations ?? []).length === 0 ? (
        <p className="font-sans text-sm text-navy/40">Aún no hay reservas registradas.</p>
      ) : null}
    </div>
  );
}
