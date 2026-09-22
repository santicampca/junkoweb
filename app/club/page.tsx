import type { Metadata } from "next";
import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { createClient } from "@/lib/supabase/server";
import type { Page } from "@/lib/types";

export const metadata: Metadata = {
  title: "El Club",
  description:
    "Conozca Junko Golf Club: historia desde 1948, instalaciones y el entorno de montaña de El Junquito, Vargas.",
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
        <h1 className="font-display text-4xl uppercase tracking-wide text-ivory drop-shadow-lg sm:text-5xl">
          {content.title}
        </h1>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-club">
          <div className="glass-card mx-auto flex max-w-3xl flex-col items-center gap-8 p-8 text-center sm:p-12">
            <SectionTitle eyebrow="Desde 1948" title="Nuestra tradición" />
            <p className="max-w-3xl text-center font-serif text-lg leading-relaxed text-ivory/80">
              {content.text}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-1 sm:grid-cols-3">
        {["El Campo", "El Club", "La Montaña"].map((label) => (
          <div key={label} className="relative aspect-[4/5] w-full overflow-hidden">
            <ImagePlaceholder label={label} />
          </div>
        ))}
      </section>

      <section className="py-16 text-center sm:py-24">
        <div className="container-club flex flex-col items-center gap-6">
          <h2 className="font-display text-2xl uppercase tracking-wide text-ivory drop-shadow-lg sm:text-3xl">
            Venga a conocerlo
          </h2>
          <Link href="/reservas" className="btn-primary">
            Reservar
          </Link>
        </div>
      </section>
    </>
  );
}
