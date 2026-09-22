"use client";

import { useActionState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { AdminField, adminInputClass } from "@/components/admin/AdminEditor";
import { createGalleryItem, type GalleryFormState } from "@/lib/actions/gallery";

const initialState: GalleryFormState = { status: "idle" };

const categories = [
  { value: "hero", label: "Portada" },
  { value: "gallery", label: "El Campo" },
  { value: "club", label: "El Club" },
  { value: "tournaments", label: "Torneos" },
  { value: "people", label: "Personas" },
  { value: "mountain", label: "Montaña" },
  { value: "moments", label: "Momentos" },
  { value: "memberships", label: "Membresías" },
];

export function GalleryCreateForm() {
  const [state, formAction, pending] = useActionState(createGalleryItem, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <ImageUploader name="image" folder="gallery" label="Imagen" />

      <div className="grid gap-6 sm:grid-cols-2">
        <AdminField label="Categoría">
          <select name="category" defaultValue="gallery" className={adminInputClass}>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </AdminField>

        <AdminField label="Orden">
          <input name="order" type="number" min={0} defaultValue={0} className={adminInputClass} />
        </AdminField>
      </div>

      <AdminField label="Texto alternativo (SEO)">
        <input name="alt" className={adminInputClass} />
      </AdminField>

      <button type="submit" disabled={pending} className="btn-primary w-fit disabled:opacity-60">
        {pending ? "Guardando..." : "Agregar a la galería"}
      </button>
      {state.status === "error" && state.message ? (
        <p className="font-sans text-sm text-red-700">{state.message}</p>
      ) : null}
    </form>
  );
}
