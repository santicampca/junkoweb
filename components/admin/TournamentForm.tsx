"use client";

import { useActionState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { AdminField, adminInputClass } from "@/components/admin/AdminEditor";
import { createTournament, type TournamentFormState } from "@/lib/actions/tournaments";
import type { Tournament } from "@/lib/types";

const initialState: TournamentFormState = { status: "idle" };

export function TournamentCreateForm() {
  const [state, formAction, pending] = useActionState(createTournament, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <TournamentFields />
      <button type="submit" disabled={pending} className="btn-primary w-fit disabled:opacity-60">
        {pending ? "Guardando..." : "Crear torneo"}
      </button>
      {state.status === "error" && state.message ? (
        <p className="font-sans text-sm text-red-700">{state.message}</p>
      ) : null}
    </form>
  );
}

export function TournamentEditForm({
  tournament,
  action,
}: {
  tournament: Tournament;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="flex flex-col gap-6">
      <TournamentFields tournament={tournament} />
      <button type="submit" className="btn-primary w-fit">
        Guardar cambios
      </button>
    </form>
  );
}

function TournamentFields({ tournament }: { tournament?: Tournament }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <AdminField label="Título">
        <input
          name="title"
          required
          defaultValue={tournament?.title}
          className={adminInputClass}
        />
      </AdminField>

      <AdminField label="Fecha">
        <input
          name="date"
          type="date"
          required
          defaultValue={tournament?.date}
          className={adminInputClass}
        />
      </AdminField>

      <AdminField label="Estado">
        <select
          name="status"
          defaultValue={tournament?.status ?? "upcoming"}
          className={adminInputClass}
        >
          <option value="upcoming">Próximo</option>
          <option value="past">Finalizado</option>
          <option value="cancelled">Cancelado</option>
        </select>
      </AdminField>

      <label className="flex items-center gap-2 pt-6">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={tournament?.featured}
          className="h-4 w-4"
        />
        <span className="font-sans text-xs uppercase tracking-widest2 text-navy/60">
          Destacar torneo
        </span>
      </label>

      <div className="sm:col-span-2">
        <AdminField label="Descripción">
          <textarea
            name="description"
            rows={4}
            defaultValue={tournament?.description ?? ""}
            className={adminInputClass}
          />
        </AdminField>
      </div>

      <div className="sm:col-span-2">
        <ImageUploader
          name="image"
          folder="tournaments"
          defaultValue={tournament?.image}
          label="Imagen del torneo"
        />
      </div>
    </div>
  );
}
