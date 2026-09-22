"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[public route error]", error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-24">
      <div className="container-club flex flex-col items-center gap-6 text-center">
        <span className="eyebrow text-gold drop-shadow-sm">Algo salió mal</span>
        <h1 className="font-display text-3xl uppercase tracking-wide text-ivory drop-shadow-lg sm:text-4xl">
          No pudimos cargar esta página
        </h1>
        <div className="gold-rule" />
        <p className="max-w-md font-serif text-lg leading-relaxed text-ivory/80">
          Ocurrió un problema inesperado. Intente nuevamente en unos momentos.
        </p>
        <button type="button" onClick={() => reset()} className="btn-primary">
          Intentar de nuevo
        </button>
      </div>
    </section>
  );
}
