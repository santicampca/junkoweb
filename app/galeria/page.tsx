import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { Gallery } from "@/components/Gallery";
import { createClient } from "@/lib/supabase/server";
import type { GalleryCategory, GalleryItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Galería",
  description: "Explore imágenes del club, el recorrido y nuestros torneos.",
};

const categories: { key: GalleryCategory; label: string }[] = [
  { key: "club", label: "El Club" },
  { key: "gallery", label: "Recorrido" },
  { key: "tournaments", label: "Torneos" },
];

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery")
    .select("*")
    .order("category", { ascending: true })
    .order("order", { ascending: true });

  const items = (data ?? []) as GalleryItem[];

  return (
    <section className="py-16 sm:py-24">
      <div className="container-club flex flex-col gap-16">
        <SectionTitle
          eyebrow="Galería"
          title="Un vistazo al club"
          description="Nuestra galería se irá completando con fotografía profesional del club, el recorrido y nuestros eventos."
        />

        {categories.map(({ key, label }) => {
          const categoryItems = items.filter((item) => item.category === key);
          return (
            <div key={key} className="flex flex-col gap-8">
              <h3 className="font-heading text-2xl text-ivory">{label}</h3>
              <Gallery items={categoryItems} emptyLabel={label} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
