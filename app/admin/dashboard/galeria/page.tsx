import { AdminEditor } from "@/components/admin/AdminEditor";
import { AdminTable } from "@/components/admin/AdminTable";
import { GalleryCreateForm } from "@/components/admin/GalleryForm";
import { createClient } from "@/lib/supabase/server";
import { deleteGalleryItem, updateGalleryOrder } from "@/lib/actions/gallery";

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("gallery")
    .select("*")
    .order("category", { ascending: true })
    .order("order", { ascending: true });

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="font-heading text-2xl text-forest">Galería</h2>
        <p className="mt-1 font-sans text-sm text-navy/50">
          Suba imágenes, ordénelas y asígnelas a una categoría.
        </p>
      </div>

      <AdminEditor title="Subir imagen">
        <GalleryCreateForm />
      </AdminEditor>

      <AdminTable headers={["Vista previa", "Categoría", "Orden", "Acciones"]}>
        {(items ?? []).map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.alt ?? ""}
                className="h-14 w-14 rounded-sm object-cover"
              />
            </td>
            <td className="px-4 py-3 font-sans text-xs uppercase tracking-widest2 text-navy/60">
              {item.category}
            </td>
            <td className="px-4 py-3">
              <form
                action={async (formData) => {
                  "use server";
                  await updateGalleryOrder(item.id, Number(formData.get("order")));
                }}
                className="flex items-center gap-2"
              >
                <input
                  name="order"
                  type="number"
                  min={0}
                  defaultValue={item.order}
                  className="w-16 border border-navy/15 bg-transparent px-2 py-1 font-sans text-xs text-navy"
                />
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
                  await deleteGalleryItem(item.id);
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

      {(items ?? []).length === 0 ? (
        <p className="font-sans text-sm text-navy/40">Aún no hay imágenes en la galería.</p>
      ) : null}
    </div>
  );
}
