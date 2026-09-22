import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Gallery } from "@/components/Gallery";
import { TournamentCard } from "@/components/TournamentCard";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { createClient } from "@/lib/supabase/server";
import type { Page, GalleryItem, Tournament } from "@/lib/types";

async function getHomeContent(): Promise<Page["content"]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pages")
    .select("content")
    .eq("slug", "home")
    .maybeSingle();

  return (
    (data?.content as Page["content"]) ?? {
      hero_title: "Junko Golf Club",
      hero_subtitle: "Donde la montaña, la tradición y el golf se encuentran",
      hero_cta: "Reserva ya",
      intro_title: "Una experiencia distinta",
      intro_text: "",
      experience_title: "La experiencia Junko",
      experience_text: "",
      club_title: "El Club",
      club_text: "",
      cta_final_title: "Vívelo usted mismo",
      cta_final_text: "",
    }
  );
}

export default async function HomePage() {
  const supabase = await createClient();
  const content = await getHomeContent();

  const [{ data: galleryData }, { data: tournamentData }] = await Promise.all([
    supabase
      .from("gallery")
      .select("*")
      .eq("category", "gallery")
      .order("order", { ascending: true })
      .limit(6),
    supabase
      .from("tournaments")
      .select("*")
      .eq("status", "upcoming")
      .order("date", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);

  const gallery = (galleryData ?? []) as GalleryItem[];
  const tournament = tournamentData as Tournament | null;

  return (
    <>
      <Hero
        title={content.hero_title}
        subtitle={content.hero_subtitle}
        cta={content.hero_cta}
        image="/images/hero/fairway.png"
      />

      <section className="container-club flex flex-col items-center gap-8 py-24 sm:py-32">
        <SectionTitle
          eyebrow="Bienvenido"
          title={content.intro_title}
          description={content.intro_text}
        />
      </section>

      <section className="bg-forest py-24 text-ivory sm:py-32">
        <div className="container-club grid items-center gap-16 md:grid-cols-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <ImagePlaceholder label="La experiencia Junko" />
          </div>
          <div className="flex flex-col gap-6">
            <span className="eyebrow text-gold">Experiencia</span>
            <h2 className="font-display text-3xl uppercase tracking-wide sm:text-4xl">
              {content.experience_title}
            </h2>
            <div className="gold-rule" />
            <p className="font-serif text-lg leading-relaxed text-ivory/80">
              {content.experience_text}
            </p>
          </div>
        </div>
      </section>

      <section className="container-club grid items-center gap-16 py-24 sm:py-32 md:grid-cols-2">
        <div className="order-2 flex flex-col gap-6 md:order-1">
          <span className="eyebrow">El Club</span>
          <h2 className="font-display text-3xl uppercase tracking-wide text-forest sm:text-4xl">
            {content.club_title}
          </h2>
          <div className="gold-rule" />
          <p className="font-serif text-lg leading-relaxed text-navy/70">
            {content.club_text}
          </p>
          <Link href="/club" className="btn-outline-dark w-fit">
            Conocer el club
          </Link>
        </div>
        <div className="relative order-1 aspect-[4/5] w-full overflow-hidden md:order-2">
          <ImagePlaceholder label="El Club" />
        </div>
      </section>

      <section className="bg-navy py-24 text-ivory sm:py-32">
        <div className="container-club flex flex-col items-center gap-12">
          <SectionTitle
            eyebrow="Membresías"
            title="Forme parte del club"
            description="Distintas modalidades de membresía diseñadas para socios individuales, familias y empresas."
            light
          />
          <Link href="/membresias" className="btn-outline w-fit">
            Ver membresías
          </Link>
        </div>
      </section>

      {tournament ? (
        <section className="container-club flex flex-col items-center gap-12 py-24 sm:py-32">
          <SectionTitle eyebrow="Agenda" title="Próximo torneo" />
          <div className="w-full max-w-md">
            <TournamentCard tournament={tournament} />
          </div>
          <Link href="/torneos" className="btn-outline-dark w-fit">
            Ver todos los torneos
          </Link>
        </section>
      ) : null}

      <section className="bg-ivory py-24 sm:py-32">
        <div className="container-club flex flex-col items-center gap-12">
          <SectionTitle eyebrow="Galería" title="Un vistazo al club" />
          <Gallery items={gallery ?? []} className="w-full" />
          <Link href="/galeria" className="btn-outline-dark w-fit">
            Ver galería completa
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest py-28 text-center text-ivory">
        <div className="container-club relative z-10 flex flex-col items-center gap-6">
          <h2 className="font-display text-3xl uppercase tracking-wide sm:text-4xl">
            {content.cta_final_title}
          </h2>
          <div className="gold-rule" />
          <p className="max-w-xl font-serif text-lg text-ivory/80">
            {content.cta_final_text}
          </p>
          <Link href="/reservas" className="btn-primary">
            Reserva ya
          </Link>
        </div>
      </section>
    </>
  );
}
