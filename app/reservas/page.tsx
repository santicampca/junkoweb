import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { ReservationForm } from "@/components/ReservationForm";

export const metadata: Metadata = {
  title: "Reservas",
  description: "Reserve su próxima ronda de golf en Junko Golf Club.",
};

export default function ReservationsPage() {
  return (
    <section className="bg-ivory py-24 sm:py-32">
      <div className="container-club flex flex-col items-center gap-12">
        <SectionTitle
          eyebrow="Reservas"
          title="Reserve su ronda"
          description="Complete el siguiente formulario y nuestro equipo confirmará su reserva a la brevedad."
        />
        <ReservationForm />
      </div>
    </section>
  );
}
