import {
  EventsHero,
  EventTypes,
  EventFormulas,
  EventGallery,
  EventQuoteForm,
} from "@/components/services";
import { CTASection } from "@/components/sections/cta-section";

export const metadata = {
  title: "Transport Événementiel - Mariages, Galas, Séminaires | SCOD VTC",
  description:
    "Transport événementiel premium au Sénégal : mariages, galas, séminaires, cérémonies officielles. Flotte coordonnée, chauffeurs en tenue, service sur mesure. Devis gratuit sous 24h.",
  keywords:
    "transport événementiel Sénégal, voiture mariage Dakar, navette événement, VTC séminaire, transport gala, chauffeur mariage, location véhicule événement",
  openGraph: {
    title: "Transport Événementiel Premium - SCOD VTC",
    description:
      "Flotte premium et service d'exception pour vos mariages, galas et événements au Sénégal. Devis personnalisé gratuit.",
    images: ["/images/services/events-wedding.jpg"],
  },
};

export default function EvenementsPage() {
  return (
    <>
      <EventsHero />
      <EventTypes />
      <EventFormulas />
      <EventGallery />
      <EventQuoteForm />
      <CTASection />
    </>
  );
}
