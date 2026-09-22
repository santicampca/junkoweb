import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { createClient } from "@/lib/supabase/server";
import type { Page } from "@/lib/types";

export const metadata: Metadata = {
  title: "El Club",
  description:
    "Conozca la historia, las instalaciones y la filosofía de Junko Golf Club, un club de golf privado de montaña.",
};

export default async function ClubPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pages")
    .select("content")
    .eq("slug", "club")
    .maybeSingle();

  const content = (data?.content as Page["content"]) ?? {
    title: "El Club",
    text: "",
  };

  return (
    <>
      <section className="flex h-[45vh] min-h-[320px] items-center justify-center text-center">
        <h1 className="font-display text-4xl uppercase tracking-wide text-ivory sm:text-5xl">
          {content.title}
        </h1>
      </section>

      <section className="panel-ivory py-24 sm:py-32">
        <div className="container-club flex flex-col items-center gap-8">
          <SectionTitle eyebrow="Institucional" title="Nuestra tradición" />
          <p className="max-w-3xl text-center font-serif text-lg leading-relaxed text-navy/70">
            {content.text}
          </p>
        </div>
      </section>

      <section className="grid gap-1 sm:grid-cols-3">
        {["Recorrido", "Instalaciones", "Servicio"].map((label) => (
          <div key={label} className="relative aspect-[4/5] w-full overflow-hidden">
            <ImagePlaceholder label={label} />
          </div>
        ))}
      </section>
    </>
  );
}
