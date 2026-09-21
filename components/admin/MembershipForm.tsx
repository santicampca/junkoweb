"use client";

import { useActionState } from "react";
import { AdminField, adminInputClass } from "@/components/admin/AdminEditor";
import { createMembership, type MembershipFormState } from "@/lib/actions/memberships";
import type { Membership } from "@/lib/types";

const initialState: MembershipFormState = { status: "idle" };

export function MembershipCreateForm() {
  const [state, formAction, pending] = useActionState(createMembership, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <MembershipFields />
      <button type="submit" disabled={pending} className="btn-primary w-fit disabled:opacity-60">
        {pending ? "Guardando..." : "Crear membresía"}
      </button>
      {state.status === "error" && state.message ? (
        <p className="font-sans text-sm text-red-700">{state.message}</p>
      ) : null}
    </form>
  );
}

export function MembershipEditForm({
  membership,
  action,
}: {
  membership: Membership;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="flex flex-col gap-6">
      <MembershipFields membership={membership} />
      <button type="submit" className="btn-primary w-fit">
        Guardar cambios
      </button>
    </form>
  );
}

function MembershipFields({ membership }: { membership?: Membership }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <AdminField label="Título">
        <input
          name="title"
          required
          defaultValue={membership?.title}
          className={adminInputClass}
        />
      </AdminField>

      <AdminField label="Orden">
        <input
          name="order"
          type="number"
          min={0}
          defaultValue={membership?.order ?? 0}
          className={adminInputClass}
        />
      </AdminField>

      <div className="sm:col-span-2">
        <AdminField label="Descripción">
          <textarea
            name="description"
            rows={4}
            defaultValue={membership?.description ?? ""}
            className={adminInputClass}
          />
        </AdminField>
      </div>
    </div>
  );
}
