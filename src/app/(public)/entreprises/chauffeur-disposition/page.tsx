import { DriverHero } from "@/components/services/driver-hero";
import { EventFormulas } from "@/components/services/event-formulas";
import { AirportIncluded } from "@/components/services/airport-included";
import { EventTypes } from "@/components/services/event-types";
import { LocationForm } from "@/components/services/location-form";
import { CTASection } from "@/components/sections/cta-section";

export const metadata = {
  title: "Chauffeur à Disposition - Service Premium Entreprise | SCOD VTC",
  description:
    "Chauffeur professionnel à disposition pour entreprises au Sénégal. Demi-journée, journée ou semaine. Véhicule premium, flexibilité totale, discrétion garantie.",
  keywords:
    "chauffeur à disposition Dakar, chauffeur privé entreprise, mise à disposition chauffeur, VTC longue durée, chauffeur journée Sénégal",
  openGraph: {
    title: "Chauffeur à Disposition - SCOD VTC Entreprises",
    description:
      "Service premium de chauffeur dédié pour dirigeants et entreprises. Flexibilité, discrétion, professionnalisme.",
    images: ["/images/services/driver-professional.jpg"],
  },
};

export default function ChauffeurDispositionPage() {
  return (
    <>
      <DriverHero />
      <EventFormulas />
      <AirportIncluded />
      <EventTypes />
      <LocationForm />
      <CTASection />
    </>
  );
}
