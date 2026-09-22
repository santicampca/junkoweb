import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos de uso del sitio y del proceso de solicitud de reservas de Junko Golf Club.",
  alternates: { canonical: "/terminos" },
};

export default function TermsPage() {
  return (
    <LegalPageLayout eyebrow="Legal" title="Términos y Condiciones" updatedAt="22 de septiembre de 2026">
      <div>
        <h2>1. Objeto</h2>
        <p>
          Estos términos regulan el uso del sitio web de Junko Golf Club y el proceso de solicitud
          de reservas e información a través de sus formularios.
        </p>
      </div>

      <div>
        <h2>2. Naturaleza de las solicitudes de reserva</h2>
        <p>
          El formulario de reservas de este sitio registra una <strong>solicitud</strong>, no una
          reserva confirmada. Al enviar el formulario, su solicitud queda registrada y se le
          redirige a WhatsApp para continuar la conversación directamente con el club. La reserva
          únicamente se confirma cuando Junko Golf Club la confirma manualmente. El sitio no
          procesa pagos ni gestiona disponibilidad de forma automática.
        </p>
      </div>

      <div>
        <h2>3. Uso del sitio</h2>
        <p>
          Usted se compromete a proporcionar datos veraces en los formularios y a utilizar el sitio
          de forma lícita. Nos reservamos el derecho de no procesar solicitudes con información
          claramente falsa o abusiva.
        </p>
      </div>

      <div>
        <h2>4. Membresías y torneos</h2>
        <p>
          La información sobre modalidades de membresía y torneos publicada en el sitio tiene
          carácter informativo. Las condiciones, precios y cupos vigentes deben confirmarse
          directamente con el club antes de tomar cualquier decisión.
        </p>
      </div>

      <div>
        <h2>5. Propiedad intelectual</h2>
        <p>
          Los contenidos, fotografías y marca de Junko Golf Club publicados en este sitio son
          propiedad del club o se utilizan con la autorización correspondiente. Titular registral y
          datos de registro: [PENDIENTE DE CONFIRMAR].
        </p>
      </div>

      <div>
        <h2>6. Ley aplicable</h2>
        <p>
          Legislación y jurisdicción aplicables: [PENDIENTE DE CONFIRMAR].
        </p>
      </div>

      <div>
        <h2>7. Contacto</h2>
        <p>
          Para consultas sobre estos términos, escriba a través de la página de{" "}
          <a href="/contacto" className="text-gold underline">
            Contacto
          </a>
          .
        </p>
      </div>
    </LegalPageLayout>
  );
}
