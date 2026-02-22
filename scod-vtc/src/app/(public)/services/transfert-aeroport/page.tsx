import {
  AirportHero,
  AirportPricing,
  AirportHowItWorks,
  AirportIncluded,
  AirportQuickBooking,
  AirportTestimonials,
} from "@/components/services";
import { CTASection } from "@/components/sections/cta-section";

export const metadata = {
  title: "Transfert Aéroport AIBD - Tarif Fixe Garanti | SCOD VTC",
  description:
    "Transfert aéroport Blaise Diagne (AIBD) ↔ Dakar à partir de 45 000 FCFA. Chauffeur avec pancarte, suivi de vol temps réel, 15 min d'attente offertes. Réservation en ligne simple et rapide.",
  keywords:
    "transfert aéroport AIBD, VTC Dakar aéroport, chauffeur aéroport Blaise Diagne, taxi aéroport Sénégal, transport aéroport Dakar",
  openGraph: {
    title: "Transfert Aéroport AIBD - SCOD VTC Sénégal",
    description:
      "Service de transfert aéroport premium entre Dakar et l'aéroport Blaise Diagne. Tarif fixe, chauffeur professionnel, réservation instantanée.",
    images: ["/images/services/aibd-airport.jpg"],
  },
};

export default function TransfertAeroportPage() {
  return (
    <>
      <AirportHero />
      <AirportPricing />
      <AirportHowItWorks />
      <AirportIncluded />
      <AirportTestimonials />
      <AirportQuickBooking />
      <CTASection />
    </>
  );
}
