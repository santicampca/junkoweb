import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: "Datos identificativos y condiciones de acceso al sitio de Junko Golf Club.",
  alternates: { canonical: "/aviso-legal" },
};

export default function LegalNoticePage() {
  return (
    <LegalPageLayout eyebrow="Legal" title="Aviso Legal" updatedAt="22 de septiembre de 2026">
      <div>
        <h2>1. Datos identificativos</h2>
        <ul>
          <li>Denominación: Junko Golf Club (nombre comercial; fundado en 1948).</li>
          <li>Razón social: [PENDIENTE DE CONFIRMAR]</li>
          <li>RIF: [PENDIENTE DE CONFIRMAR]</li>
          <li>Domicilio: El Junquito, estado Vargas, Venezuela. Dirección exacta: [PENDIENTE DE CONFIRMAR]</li>
          <li>Representante: [PENDIENTE DE CONFIRMAR]</li>
          <li>Correo de contacto: [PENDIENTE DE CONFIRMAR]</li>
          <li>Teléfono: [PENDIENTE DE CONFIRMAR]</li>
          <li>Número de registro: [PENDIENTE DE CONFIRMAR]</li>
        </ul>
      </div>

      <div>
        <h2>2. Objeto del sitio</h2>
        <p>
          Este sitio ofrece información sobre Junko Golf Club: el club, membresías, torneos,
          galería, y permite enviar solicitudes de reserva y mensajes de contacto.
        </p>
      </div>

      <div>
        <h2>3. Condiciones de acceso</h2>
        <p>
          El acceso a este sitio es gratuito. El uso del sitio implica la aceptación de este aviso
          legal, de los{" "}
          <a href="/terminos" className="text-gold underline">
            Términos y Condiciones
          </a>{" "}
          y de la{" "}
          <a href="/privacidad" className="text-gold underline">
            Política de Privacidad
          </a>
          .
        </p>
      </div>

      <div>
        <h2>4. Exclusión de responsabilidad</h2>
        <p>
          Junko Golf Club no garantiza la disponibilidad continua del sitio y no será responsable
          por daños derivados de su uso, en la medida permitida por la legislación aplicable.
        </p>
      </div>
    </LegalPageLayout>
  );
}
