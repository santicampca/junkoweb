"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin route error]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="font-sans text-xs uppercase tracking-widest2 text-navy/40">
          Panel administrativo
        </p>
        <h1 className="font-heading text-2xl text-forest">No pudimos cargar esta sección</h1>
        <p className="max-w-sm font-sans text-sm text-navy/60">
          Ocurrió un problema inesperado. Intente nuevamente; si el problema persiste, revise su
          conexión o vuelva a iniciar sesión.
        </p>
        <button type="button" onClick={() => reset()} className="btn-primary">
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
