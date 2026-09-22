import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Gallery } from "@/components/Gallery";
import { TournamentCard } from "@/components/TournamentCard";
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
      />

      <section className="py-16 sm:py-24">
        <div className="container-club">
          <div className="glass-card mx-auto flex max-w-3xl flex-col items-center gap-6 p-8 text-center sm:p-12">
            <SectionTitle
              eyebrow="Bienvenido"
              title={content.intro_title}
              description={content.intro_text}
            />
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="container-club grid gap-6 md:grid-cols-2">
          <div className="glass-card flex flex-col items-center gap-6 p-8 text-center sm:p-12">
            <span className="eyebrow text-gold">Experiencia</span>
            <h2 className="font-display text-3xl uppercase tracking-wide sm:text-4xl">
              {content.experience_title}
            </h2>
            <div className="gold-rule" />
            <p className="font-serif text-lg leading-relaxed text-ivory/80">
              {content.experience_text}
            </p>
          </div>

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
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="container-club">
          <div className="glass-card flex flex-col items-center gap-8 p-8 text-center sm:p-12">
            <SectionTitle
              eyebrow="Membresías"
              title="Forme parte del club"
              description="Distintas modalidades de membresía diseñadas para socios individuales, familias y empresas."
            />
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
              <SectionTitle eyebrow="Agenda" title="Próximo torneo" />
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
            <Gallery items={gallery ?? []} className="w-full" />
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
              Reserva ya
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
