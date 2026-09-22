import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { Gallery } from "@/components/Gallery";
import { createClient } from "@/lib/supabase/server";
import type { GalleryCategory, GalleryItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Galería",
  description: "Explore imágenes del club, el recorrido y nuestros torneos.",
  alternates: { canonical: "/galeria" },
};

const categories: { key: GalleryCategory; label: string }[] = [
  { key: "gallery", label: "El Campo" },
  { key: "club", label: "El Club" },
  { key: "tournaments", label: "Torneos" },
  { key: "people", label: "Personas" },
  { key: "mountain", label: "Montaña" },
  { key: "moments", label: "Momentos" },
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
      <div className="container-club flex flex-col gap-20">
        <SectionTitle
          eyebrow="Galería"
          title="El Junko en imágenes"
          description="El campo, la montaña y la gente que le da vida al club, poco a poco, en fotografía real."
        />

        {categories.map(({ key, label }) => {
          const categoryItems = items.filter((item) => item.category === key);
          return (
            <div key={key} className="flex flex-col gap-8">
              <h3 className="font-display text-xl uppercase tracking-widest2 text-gold">
                {label}
              </h3>
              <Gallery items={categoryItems} emptyLabel={label} editorial />
            </div>
          );
        })}
      </div>
    </section>
  );
}
