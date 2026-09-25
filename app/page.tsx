import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { NarrativeSection } from "@/components/NarrativeSection";
import { FeatureSplit } from "@/components/FeatureSplit";
import { ExperienceShowcase } from "@/components/ExperienceShowcase";
import { NextTournamentFeature } from "@/components/NextTournamentFeature";
import { Gallery } from "@/components/Gallery";
import { CtaLink } from "@/components/CtaLink";
import { StructuredData } from "@/components/StructuredData";
import { createClient } from "@/lib/supabase/server";
import { rotatingSlice } from "@/lib/utils";
import type { Page, GalleryItem, Tournament } from "@/lib/types";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const homeDefaults = {
  hero_eyebrow: "Junko Golf Club · El Junquito, Venezuela",
  hero_title: "Tu próxima vuelta empieza aquí",
  hero_subtitle: "Golf, montaña y ese clima que hace diferente cada ronda.",
  hero_cta: "Reservar tu ronda",
  hero_cta_microcopy: "Ven a jugar al Junko.",
  hero_secondary_cta: "Descubre el Junko",
  hero_caption: "Montaña · Tradición · Desde 1948",
  intro_title: "¿Cuándo fue la última vez que jugaste una ronda así?",
  intro_text: "Escápate de la ciudad. Toma tus palos. Ven al Junko.",
  location_title: "Golf entre montañas",
  location_text:
    "El club está en El Junquito, estado La Guaira, rodeado de montaña. Un entorno natural que pocos campos de golf pueden ofrecer, y que forma parte de la experiencia tanto como el propio juego.",
  experience_text:
    "Un recorrido que aprovecha el terreno de montaña tal como es, sin forzarlo. Cada hoyo tiene su propio carácter, marcado por la vegetación y el desnivel natural del terreno.",
  game_text:
    "Aquí el golf se juega sin prisa. La altura, la vegetación y el clima de montaña hacen de cada ronda una experiencia distinta a la de un campo de tierras bajas.",
  community_text:
    "Más que un deporte, en El Junko el golf es una excusa para encontrarse. Socios de distintas generaciones que comparten el campo, la mesa y una misma pasión.",
  history_text:
    "Junko Golf Club abrió sus puertas en 1948 y desde entonces ha sido un punto de encuentro para quienes aman el golf y la montaña por igual.",
  membership_title: "Forma parte del Junko",
  membership_text:
    "No vengas solo a jugar. Ser socio de El Junko es tener un lugar propio en la montaña, para volver cuando quieras.",
  cta_final_title: "Nos vemos en el Junko",
  cta_final_text: "Tu próxima ronda está más cerca de lo que imaginas.",
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

  const [{ data: galleryData }, { data: tournamentData }] = await Promise.all([
    supabase
      .from("gallery")
      .select("*")
      .eq("category", "gallery")
      .order("order", { ascending: true })
      .limit(100),
    supabase
      .from("tournaments")
      .select("*")
      .eq("status", "upcoming")
      .order("date", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);

  const gallery = rotatingSlice((galleryData ?? []) as GalleryItem[], 3);
  const tournament = tournamentData as Tournament | null;

  return (
    <>
      <StructuredData />
      <Hero
        eyebrow={content.hero_eyebrow}
        title={content.hero_title}
        subtitle={content.hero_subtitle}
        cta={content.hero_cta}
        ctaMicrocopy={content.hero_cta_microcopy}
        secondaryCta={content.hero_secondary_cta}
        caption={content.hero_caption}
      />

      {/* Invitación */}
      <NarrativeSection
        id="descubrir"
        eyebrow="¿Jugamos?"
        title={content.intro_title}
        text={content.intro_text}
        align="center"
        cta={{ label: content.hero_cta, href: "/reservas" }}
      />

      {/* El Junko — imagen grande + texto + CTA + datos */}
      <FeatureSplit
        eyebrow="El Junko"
        title={content.location_title}
        text={content.location_text}
        imageLabel="El Junko"
        cta={{ label: "Conoce el club", href: "/club" }}
        stats={["Desde 1948", "Montaña", "Clima fresco", "Comunidad"]}
      />

      {/* Experiencia — imagen que cambia según el concepto seleccionado */}
      <ExperienceShowcase
        eyebrow="La experiencia"
        title="Esto es lo que vas a vivir"
        concepts={[
          {
            label: "Montaña",
            text: "El Junquito, entre niebla y montaña.",
            image: "/images/experience/montana.jpg",
          },
          { label: "El Campo", text: content.experience_text },
          { label: "El Juego", text: content.game_text },
          { label: "Historia", text: content.history_text },
          {
            label: "Torneos",
            text: "Encuentros que reúnen a los socios del club, dentro y fuera del campo.",
            image: "/images/experience/torneos.jpg",
          },
          {
            label: "Comunidad",
            text: content.community_text,
            image: "/images/experience/comunidad.jpg",
          },
        ]}
      />

      {/* Galería */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-navy/50" aria-hidden />
        <div className="container-club relative flex flex-col gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="eyebrow text-gold">Galería</span>
            <h2 className="font-display text-3xl uppercase tracking-wide text-ivory sm:text-4xl">
              Así se vive el Junko
            </h2>
            <div className="gold-rule" />
          </div>
          <Gallery items={gallery} editorial />
          <CtaLink href="/galeria" variant="outline" className="mx-auto w-fit">
            Ver toda la galería
          </CtaLink>
        </div>
      </section>

      {/* Torneos */}
      <NextTournamentFeature tournament={tournament} />

      {/* Membresías — imagen + texto + CTA */}
      <FeatureSplit
        eyebrow="Membresías"
        title={content.membership_title}
        text={content.membership_text}
        imageLabel="Membresías"
        reverse
        cta={{ label: "Conoce las membresías", href: "/membresias" }}
      />

      {/* CTA final */}
      <NarrativeSection
        eyebrow="Hasta pronto"
        title={content.cta_final_title}
        text={content.cta_final_text}
        align="center"
        cta={{ label: "Reservar mi ronda", href: "/reservas" }}
      />
    </>
  );
}
