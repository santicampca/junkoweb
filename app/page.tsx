import Link from "next/link";
import { Hero } from "@/components/Hero";
import { NarrativeSection } from "@/components/NarrativeSection";
import { FeatureSplit } from "@/components/FeatureSplit";
import { SectionTitle } from "@/components/SectionTitle";
import { Gallery } from "@/components/Gallery";
import { TournamentCard } from "@/components/TournamentCard";
import { createClient } from "@/lib/supabase/server";
import type { Page, GalleryItem, Tournament } from "@/lib/types";

const homeDefaults = {
  hero_eyebrow: "El Junko · Venezuela",
  hero_title: "Golf entre montañas",
  hero_subtitle:
    "Un club de golf entre las montañas de El Junquito, donde el juego se vive con calma y buena compañía.",
  hero_cta: "Reservar",
  hero_secondary_cta: "Descubrir El Junko",
  intro_title: "Deja la ciudad atrás",
  intro_text:
    "Subir hasta El Junko es dejar el ruido abajo. El camino cambia, el aire cambia, y de pronto el único sonido es el del viento entre los árboles y el golpe limpio de una bola bien jugada.",
  location_title: "En las montañas de El Junquito",
  location_text:
    "El club está en El Junquito, estado Vargas, rodeado de montaña. Un entorno natural que pocos campos de golf pueden ofrecer, y que forma parte de la experiencia tanto como el propio juego.",
  experience_title: "El campo",
  experience_text:
    "Un recorrido que aprovecha el terreno de montaña tal como es, sin forzarlo. Cada hoyo tiene su propio carácter, marcado por la vegetación y el desnivel natural del terreno.",
  game_title: "El juego",
  game_text:
    "Aquí el golf se juega sin prisa. La altura, la vegetación y el clima de montaña hacen de cada ronda una experiencia distinta a la de un campo de tierras bajas.",
  community_title: "Aquí el golf se comparte",
  community_text:
    "Más que un deporte, en El Junko el golf es una excusa para encontrarse. Socios de distintas generaciones que comparten el campo, la mesa y una misma pasión.",
  history_title: "Desde 1948",
  history_text:
    "Junko Golf Club abrió sus puertas en 1948 y desde entonces ha sido un punto de encuentro para quienes aman el golf y la montaña por igual. Más de siete décadas de historia siguen presentes en cada ronda.",
  club_title: "El club",
  club_text:
    "Instalaciones y servicio pensados para socios que valoran la tradición tanto como la comodidad.",
  cta_final_title: "Vívalo usted mismo",
  cta_final_text: "Ninguna fotografía reemplaza estar ahí. Reserve su ronda y conozca El Junko en persona.",
};

async function getHomeContent(): Promise<Page["content"]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pages")
    .select("content")
    .eq("slug", "home")
    .maybeSingle();

  return { ...homeDefaults, ...((data?.content as Page["content"]) ?? {}) };
}

export default async function HomePage() {
  const supabase = await createClient();
  const content = await getHomeContent();

  const [{ data: galleryData }, { data: peopleData }, { data: tournamentData }] =
    await Promise.all([
      supabase
        .from("gallery")
        .select("*")
        .eq("category", "gallery")
        .order("order", { ascending: true })
        .limit(6),
      supabase
        .from("gallery")
        .select("*")
        .eq("category", "people")
        .order("order", { ascending: true })
        .limit(4),
      supabase
        .from("tournaments")
        .select("*")
        .eq("status", "upcoming")
        .order("date", { ascending: true })
        .limit(1)
        .maybeSingle(),
    ]);

  const gallery = (galleryData ?? []) as GalleryItem[];
  const people = (peopleData ?? []) as GalleryItem[];
  const tournament = tournamentData as Tournament | null;

  return (
    <>
      <Hero
        eyebrow={content.hero_eyebrow}
        title={content.hero_title}
        subtitle={content.hero_subtitle}
        cta={content.hero_cta}
        secondaryCta={content.hero_secondary_cta}
      />

      <NarrativeSection
        id="descubrir"
        eyebrow="Bienvenido"
        title={content.intro_title}
        text={content.intro_text}
        align="left"
      />

      <NarrativeSection
        eyebrow="Ubicación"
        title={content.location_title}
        text={content.location_text}
        align="right"
      />

      <FeatureSplit
        eyebrow="El recorrido"
        title={content.experience_title}
        text={content.experience_text}
        imageLabel="El Campo"
      />

      <FeatureSplit
        eyebrow="La experiencia"
        title={content.game_title}
        text={content.game_text}
        imageLabel="El Juego"
        reverse
      />

      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-navy/60" aria-hidden />
        <div className="container-club relative flex flex-col items-center gap-10 text-center">
          <SectionTitle eyebrow="Comunidad" title={content.community_title} description={content.community_text} />
          <Gallery items={people} emptyLabel="Personas del club" className="w-full max-w-3xl" />
        </div>
      </section>

      <NarrativeSection
        eyebrow="Historia"
        title={content.history_title}
        text={content.history_text}
        align="left"
      />

      <section className="py-8 sm:py-12">
        <div className="container-club grid gap-6 md:grid-cols-2">
          <div className="glass-card flex flex-col items-center gap-6 p-8 text-center sm:p-12">
            <span className="eyebrow text-gold">El Club</span>
            <h2 className="font-display text-3xl uppercase tracking-wide sm:text-4xl">
              {content.club_title}
            </h2>
            <div className="gold-rule" />
            <p className="font-serif text-lg leading-relaxed text-ivory/80">
              {content.club_text}
            </p>
            <Link href="/club" className="btn-outline w-fit">
              Conocer el club
            </Link>
          </div>

          <div className="glass-card flex flex-col items-center gap-6 p-8 text-center sm:p-12">
            <span className="eyebrow text-gold">Membresías</span>
            <h2 className="font-display text-3xl uppercase tracking-wide sm:text-4xl">
              Formar parte del Junko
            </h2>
            <div className="gold-rule" />
            <p className="font-serif text-lg leading-relaxed text-ivory/80">
              Distintas modalidades de membresía, pensadas para socios individuales, familias y empresas.
            </p>
            <Link href="/membresias" className="btn-outline w-fit">
              Ver membresías
            </Link>
          </div>
        </div>
      </section>

      {tournament ? (
        <section className="py-8 sm:py-12">
          <div className="container-club">
            <div className="glass-card flex flex-col items-center gap-8 p-8 sm:p-12">
              <SectionTitle eyebrow="Agenda" title="Próximo en El Junko" />
              <div className="w-full max-w-md">
                <TournamentCard tournament={tournament} />
              </div>
              <Link href="/torneos" className="btn-outline w-fit">
                Ver todos los torneos
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-8 sm:py-12">
        <div className="container-club">
          <div className="glass-card flex flex-col items-center gap-8 p-8 sm:p-12">
            <SectionTitle eyebrow="Galería" title="Un vistazo al club" />
            <Gallery items={gallery} className="w-full" />
            <Link href="/galeria" className="btn-outline w-fit">
              Ver galería completa
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-club">
          <div className="glass-card mx-auto flex max-w-2xl flex-col items-center gap-6 p-10 text-center sm:p-14">
            <h2 className="font-display text-3xl uppercase tracking-wide sm:text-4xl">
              {content.cta_final_title}
            </h2>
            <div className="gold-rule" />
            <p className="max-w-xl font-serif text-lg text-ivory/80">
              {content.cta_final_text}
            </p>
            <Link href="/reservas" className="btn-primary">
              Reservar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
