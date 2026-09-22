"use client";

import { useEffect } from "react";

/**
 * Catches errors thrown by the root layout itself (rare — Navbar, Footer,
 * SiteBackground, font loading). Must render its own <html>/<body> since
 * it fully replaces the root layout when triggered. Kept deliberately
 * plain (inline styles, no shared components) so it can't fail the same
 * way the layout it's replacing just did.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error]", error);
  }, [error]);

  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f1f1a",
          color: "#f5f2ea",
          fontFamily: "Georgia, serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div>
          <p style={{ letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 12, opacity: 0.7 }}>
            Junko Golf Club
          </p>
          <h1 style={{ fontSize: 24, margin: "16px 0" }}>No pudimos cargar el sitio</h1>
          <p style={{ opacity: 0.8, maxWidth: 420 }}>
            Ocurrió un problema inesperado. Intente nuevamente en unos momentos.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 24,
              padding: "12px 28px",
              background: "#c9a24a",
              color: "#0f1f1a",
              border: "none",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  );
}
