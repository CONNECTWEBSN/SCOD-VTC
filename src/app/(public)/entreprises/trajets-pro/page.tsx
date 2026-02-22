import { EntreprisesHero } from "@/components/entreprises/entreprises-hero";
import { EntreprisesAdvantages } from "@/components/entreprises/entreprises-advantages";
import { EntreprisesContact } from "@/components/entreprises/entreprises-contact";

export const metadata = {
  title: "Trajets Professionnels Collaborateurs - Solution Corporate | SCOD VTC",
  description:
    "Gérez les déplacements de vos collaborateurs avec notre solution B2B : dashboard de suivi, facturation centralisée Wave Business, reporting mensuel. Remises volume jusqu'à -30%.",
  keywords:
    "trajets pro Dakar, VTC entreprise collaborateurs, transport corporate Sénégal, facturation centralisée Wave Business, dashboard trajets entreprise",
  openGraph: {
    title: "Trajets Pro - SCOD VTC Entreprises",
    description:
      "Solution complète pour les déplacements professionnels de vos équipes. Dashboard, facturation centralisée, reporting.",
  },
};

export default function TrajetsProPage() {
  return (
    <>
      <EntreprisesHero bgImage="/cars/header-hero/transport-personnel.jpg" />
      
      {/* How it works section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div className="container px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-sans text-sm font-bold uppercase tracking-widest text-accent">
              Comment ça marche
            </p>
            <h2 className="mt-3 font-sans text-4xl font-bold text-grey-900 md:text-5xl">
              3 étapes pour <span className="text-accent">démarrer</span>
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
            {[
              {
                number: "1",
                title: "Créez votre compte",
                description: "Renseignez les informations de votre entreprise en 5 minutes",
              },
              {
                number: "2",
                title: "Invitez vos collaborateurs",
                description: "Chaque employé reçoit ses identifiants personnels",
              },
              {
                number: "3",
                title: "Vous êtes facturé mensuellement",
                description: "Facturation Wave Business ou virement, export CSV/PDF",
              },
            ].map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent font-sans text-3xl font-bold text-brand shadow-lg">
                  {step.number}
                </div>
                <h3 className="mt-5 font-sans text-xl font-bold text-grey-900">
                  {step.title}
                </h3>
                <p className="mt-2 font-sans text-sm text-grey-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EntreprisesAdvantages />

      {/* Pricing section */}
      <section className="relative overflow-hidden bg-grey-50 py-20 lg:py-28">
        <div className="container px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-sans text-sm font-bold uppercase tracking-widest text-accent">
              Tarification entreprise
            </p>
            <h2 className="mt-3 font-sans text-4xl font-bold text-grey-900 md:text-5xl">
              Remises <span className="text-accent">volume</span> avantageuses
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-grey-100 bg-white shadow-xl">
              <div className="bg-gradient-to-r from-brand to-brand-hover p-6 text-center">
                <p className="font-sans text-sm font-semibold uppercase tracking-wider text-white/80">
                  Tarif de base
                </p>
                <p className="mt-2 font-sans text-5xl font-bold text-accent">
                  25 000 <span className="text-2xl">FCFA</span>
                </p>
                <p className="mt-1 font-sans text-sm text-white/70">
                  par trajet · Véhicule Confort
                </p>
              </div>

              <div className="divide-y divide-grey-100">
                {[
                  { volume: "10+ trajets/mois", discount: "-10%", price: "22 500 FCFA" },
                  { volume: "50+ trajets/mois", discount: "-20%", price: "20 000 FCFA", popular: true },
                  { volume: "100+ trajets/mois", discount: "-30%", price: "17 500 FCFA" },
                ].map((tier) => (
                  <div
                    key={tier.volume}
                    className={`flex items-center justify-between p-6 ${
                      tier.popular ? "bg-accent/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-sans text-lg font-bold text-grey-900">
                        {tier.volume}
                      </span>
                      {tier.popular && (
                        <span className="rounded-pill bg-accent px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-brand">
                          Populaire
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-sans text-2xl font-bold text-accent">
                        {tier.discount}
                      </span>
                      <span className="font-sans text-lg font-bold text-grey-700">
                        {tier.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-grey-50 p-6 text-center">
                <p className="font-sans text-sm text-grey-600">
                  * Prix par trajet. Remises calculées sur le volume mensuel total.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EntreprisesContact />
    </>
  );
}
