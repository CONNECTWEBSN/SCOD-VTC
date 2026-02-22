import {
  EntreprisesHero,
  EntreprisesOffers,
  EntreprisesAdvantages,
  EntreprisesTrust,
  EntreprisesContact,
} from "@/components/entreprises";

export const metadata = {
  title: "SCOD VTC pour les Entreprises - Solution B2B Transport Professionnel",
  description:
    "Solution complète de transport professionnel pour entreprises au Sénégal. Dashboard de suivi, facturation centralisée, comptes collaborateurs. +50 entreprises nous font confiance.",
  keywords:
    "VTC entreprise Sénégal, transport corporate Dakar, solution mobilité entreprise, chauffeur entreprise, Uber for Business Sénégal",
  openGraph: {
    title: "SCOD VTC Entreprises - Transport Corporate Premium",
    description:
      "Simplifiez les déplacements de votre équipe avec notre solution B2B complète. Dashboard, reporting, facturation centralisée.",
  },
};

export default function EntreprisesPage() {
  return (
    <>
      <EntreprisesHero />
      <EntreprisesOffers />
      <EntreprisesAdvantages />
      <EntreprisesTrust />
      <EntreprisesContact />
    </>
  );
}
