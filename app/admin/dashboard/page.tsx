import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: reservationsCount },
    { count: pendingCount },
    { count: tournamentsCount },
    { count: galleryCount },
    { data: recentReservations },
    { data: recentMessages },
  ] = await Promise.all([
    supabase.from("reservations").select("*", { count: "exact", head: true }),
    supabase
      .from("reservations")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase.from("tournaments").select("*", { count: "exact", head: true }),
    supabase.from("gallery").select("*", { count: "exact", head: true }),
    supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    { label: "Reservas totales", value: reservationsCount ?? 0 },
    { label: "Reservas pendientes", value: pendingCount ?? 0 },
    { label: "Torneos", value: tournamentsCount ?? 0 },
    { label: "Imágenes en galería", value: galleryCount ?? 0 },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="font-heading text-2xl text-forest">Resumen</h2>
        <p className="mt-1 font-sans text-sm text-navy/50">
          Vista general del club en tiempo real.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-navy/10 bg-white p-6">
            <p className="font-display text-3xl text-forest">{stat.value}</p>
            <p className="mt-1 font-sans text-xs uppercase tracking-widest2 text-navy/50">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="border border-navy/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg text-forest">Últimas reservas</h3>
            <Link
              href="/admin/dashboard/reservas"
              className="font-sans text-xs uppercase tracking-widest2 text-gold-dark"
            >
              Ver todas
            </Link>
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {(recentReservations ?? []).map((r) => (
              <li key={r.id} className="flex flex-col border-b border-navy/5 pb-3 text-sm">
                <span className="font-sans text-navy">{r.name}</span>
                <span className="font-sans text-xs text-navy/50">
                  {formatDate(r.date)} · {r.players} jugador(es) · {r.status}
                </span>
              </li>
            ))}
            {(recentReservations ?? []).length === 0 ? (
              <p className="font-sans text-sm text-navy/40">Aún no hay reservas.</p>
            ) : null}
          </ul>
        </div>

        <div className="border border-navy/10 bg-white p-6">
          <h3 className="font-heading text-lg text-forest">Mensajes de contacto</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {(recentMessages ?? []).map((m) => (
              <li key={m.id} className="flex flex-col border-b border-navy/5 pb-3 text-sm">
                <span className="font-sans text-navy">
                  {m.name} — {m.email}
                </span>
                <span className="font-sans text-xs text-navy/50 line-clamp-2">
                  {m.message}
                </span>
              </li>
            ))}
            {(recentMessages ?? []).length === 0 ? (
              <p className="font-sans text-sm text-navy/40">Sin mensajes por ahora.</p>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
