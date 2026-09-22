import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-24">
      <div className="container-club flex flex-col items-center gap-6 text-center">
        <span className="eyebrow text-gold drop-shadow-sm">Error 404</span>
        <h1 className="font-display text-3xl uppercase tracking-wide text-ivory drop-shadow-lg sm:text-4xl">
          Este hoyo no existe
        </h1>
        <div className="gold-rule" />
        <p className="max-w-md font-serif text-lg leading-relaxed text-ivory/80">
          La página que busca no está disponible o fue movida. Vuelva al inicio o explore el club
          desde el menú.
        </p>
        <Link href="/" className="btn-primary">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
