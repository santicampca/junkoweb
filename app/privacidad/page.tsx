import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Cómo Junko Golf Club trata los datos personales enviados a través de este sitio.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout eyebrow="Legal" title="Política de Privacidad" updatedAt="22 de septiembre de 2026">
      <div>
        <h2>1. Responsable del tratamiento</h2>
        <p>
          Razón social: [PENDIENTE DE CONFIRMAR]. RIF: [PENDIENTE DE CONFIRMAR]. Dirección:
          Carretera El Junquito, Km. 19, El Junko, estado La Guaira, Venezuela. Correo de contacto
          para asuntos de privacidad: [PENDIENTE DE CONFIRMAR].
        </p>
      </div>

      <div>
        <h2>2. Datos que recopilamos</h2>
        <p>A través de los formularios de este sitio podemos recopilar:</p>
        <ul>
          <li>Datos de reservas: nombre, teléfono, fecha y hora preferida, número de jugadores y mensaje.</li>
          <li>Datos de contacto: nombre, correo electrónico y el contenido del mensaje enviado.</li>
        </ul>
        <p>No recopilamos datos de pago ni datos sensibles a través de este sitio.</p>
      </div>

      <div>
        <h2>3. Finalidad</h2>
        <p>
          Los datos enviados se utilizan exclusivamente para gestionar su solicitud de reserva o
          responder a su mensaje de contacto. No se utilizan con fines publicitarios ni se ceden a
          terceros con fines comerciales.
        </p>
      </div>

      <div>
        <h2>4. Conservación</h2>
        <p>
          Los datos se conservan mientras sean necesarios para gestionar la solicitud
          correspondiente. Plazo exacto de conservación: [PENDIENTE DE CONFIRMAR].
        </p>
      </div>

      <div>
        <h2>5. Terceros y proveedores</h2>
        <p>
          Los datos se almacenan en Supabase, nuestro proveedor de base de datos e infraestructura,
          que actúa como encargado del tratamiento. No compartimos sus datos con redes publicitarias
          ni con terceros para fines de marketing.
        </p>
      </div>

      <div>
        <h2>6. Sus derechos</h2>
        <p>
          Puede solicitar acceso, rectificación o eliminación de sus datos escribiendo a
          [PENDIENTE DE CONFIRMAR]. Autoridad de protección de datos competente:
          [PENDIENTE DE CONFIRMAR].
        </p>
      </div>

      <div>
        <h2>7. Cookies</h2>
        <p>
          Consulte nuestra{" "}
          <a href="/cookies" className="text-gold underline">
            Política de Cookies
          </a>{" "}
          para conocer exactamente qué cookies utiliza este sitio.
        </p>
      </div>
    </LegalPageLayout>
  );
}
