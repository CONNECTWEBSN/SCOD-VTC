import { LocationHero } from "@/components/services/location-hero";
import { LocationForm } from "@/components/services/location-form";
import { FleetSection } from "@/components/sections/fleet-section";
import { ServicesSection } from "@/components/sections/services-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata = {
  title: "Location de Véhicule avec Chauffeur | SCOD VTC Sénégal",
  description:
    "Louez un véhicule avec chauffeur professionnel au Sénégal. Journée, demi-journée ou longue durée. Tarif fixe, kilométrage illimité, assurance tous risques incluse.",
  keywords:
    "location voiture avec chauffeur Sénégal, location véhicule Dakar, VTC longue durée, location journée chauffeur, voiture de luxe avec chauffeur",
  openGraph: {
    title: "Location Véhicule avec Chauffeur - SCOD VTC",
    description:
      "Flotte premium avec chauffeur professionnel pour tous vos besoins. Tarifs transparents, service d'exception.",
    images: ["/images/services/car-rental-premium.jpg"],
  },
};

export default function LocationPage() {
  return (
    <>
      <LocationHero />
      <LocationForm />
      <FleetSection />
      <ServicesSection />
      <CTASection />
    </>
  );
}
