import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Qué cookies utiliza el sitio de Junko Golf Club.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPageLayout eyebrow="Legal" title="Política de Cookies" updatedAt="22 de septiembre de 2026">
      <div>
        <h2>1. Qué cookies utiliza este sitio</h2>
        <p>
          Este sitio utiliza únicamente cookies estrictamente necesarias para su funcionamiento.
          Actualmente no utilizamos cookies de analítica, publicidad, redes sociales ni de
          terceros de ningún tipo.
        </p>
        <ul>
          <li>
            <strong>Cookies de sesión de autenticación (Supabase):</strong> se utilizan
            exclusivamente en el panel administrativo (<code>/admin</code>) para mantener la
            sesión de un miembro del equipo autenticado. No se instalan al navegar la parte
            pública del sitio como visitante.
          </li>
        </ul>
        <p>
          Estas cookies son estrictamente necesarias: sin ellas, el panel administrativo no
          funcionaría. Por eso no requieren consentimiento previo, conforme a la normativa
          aplicable a cookies estrictamente esenciales.
        </p>
      </div>

      <div>
        <h2>2. Qué no utilizamos</h2>
        <p>Actualmente este sitio no utiliza:</p>
        <ul>
          <li>Google Analytics ni ninguna otra herramienta de analítica.</li>
          <li>Meta Pixel ni píxeles de publicidad de ningún tipo.</li>
          <li>Cookies de redes sociales (botones de compartir con seguimiento).</li>
          <li>Cookies de marketing o remarketing.</li>
        </ul>
        <p>
          Si en el futuro se incorpora alguna herramienta que instale cookies no esenciales, esta
          página se actualizará y se mostrará un banner de consentimiento con opciones claras de
          aceptar, rechazar y configurar preferencias, antes de activar dichas cookies.
        </p>
      </div>

      <div>
        <h2>3. Cómo gestionar las cookies</h2>
        <p>
          Puede eliminar o bloquear las cookies desde la configuración de su navegador. Al tratarse
          únicamente de una cookie de sesión necesaria para el panel administrativo, bloquearla
          solo afecta a quien intente iniciar sesión como administrador, no a la navegación pública
          del sitio.
        </p>
      </div>
    </LegalPageLayout>
  );
}
