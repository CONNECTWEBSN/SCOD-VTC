import Link from "next/link";
import { ArrowRight, Shield, Gem, Handshake, Check, X } from "lucide-react";

export const metadata = {
  title: "Pourquoi Choisir SCOD VTC - Premier VTC Premium 100% Sénégalais",
  description:
    "Découvrez pourquoi SCOD VTC est le meilleur choix pour vos déplacements au Sénégal : tarif fixe garanti, véhicules premium, chauffeurs identifiés, paiement mobile money. +2000 trajets, 4.8/5 de satisfaction.",
  keywords:
    "pourquoi SCOD VTC, meilleur VTC Dakar, VTC vs taxi Sénégal, service premium Dakar, VTC sénégalais",
};

export default function PourquoiScodPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div className="container px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-sans text-sm font-bold uppercase tracking-widest text-accent">
              Notre différence
            </p>
            <h1
              className="mt-4 font-sans font-bold leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
            >
              Pourquoi choisir{" "}
              <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
                SCOD VTC
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-xl text-grey-600">
              Le premier service VTC premium 100% sénégalais
            </p>
          </div>
        </div>
      </section>

      {/* Comparatif */}
      <section className="relative overflow-hidden bg-grey-50 py-20 lg:py-28">
        <div className="container px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-sans text-3xl font-bold text-grey-900 md:text-4xl">
              SCOD VTC vs <span className="text-accent">Concurrence</span>
            </h2>
            <p className="mt-3 font-sans text-lg text-grey-600">
              Comparaison transparente avec les alternatives
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-2xl bg-white shadow-xl">
              <thead>
                <tr className="bg-gradient-to-r from-brand to-brand-hover">
                  <th className="p-4 text-left font-sans text-sm font-bold uppercase tracking-wider text-white">
                    Critère
                  </th>
                  <th className="p-4 text-center font-sans text-base font-bold text-accent">
                    SCOD VTC
                  </th>
                  <th className="p-4 text-center font-sans text-sm font-semibold text-white/80">
                    Taxi classique
                  </th>
                  <th className="p-4 text-center font-sans text-sm font-semibold text-white/80">
                    Autres VTC
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-grey-100">
                {[
                  { label: "Tarif fixe garanti", scod: true, taxi: false, others: "partial" },
                  { label: "Véhicules premium", scod: true, taxi: false, others: "partial" },
                  { label: "Chauffeur identifié avant", scod: true, taxi: false, others: true },
                  { label: "Suivi temps réel", scod: true, taxi: false, others: true },
                  { label: "Paiement OM/Wave", scod: true, taxi: "partial", others: "partial" },
                  { label: "Facturation entreprise", scod: true, taxi: false, others: false },
                  { label: "Réservation à l'avance", scod: true, taxi: false, others: "partial" },
                  { label: "Transfert AIBD dédié", scod: true, taxi: "partial", others: false },
                ].map((row) => (
                  <tr key={row.label} className="hover:bg-grey-50">
                    <td className="p-4 font-sans text-sm font-semibold text-grey-900">
                      {row.label}
                    </td>
                    <td className="p-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-emerald-500" />
                    </td>
                    <td className="p-4 text-center">
                      {row.taxi === false ? (
                        <X className="mx-auto h-5 w-5 text-red-400" />
                      ) : row.taxi === "partial" ? (
                        <span className="font-sans text-xs text-grey-400">Partiel</span>
                      ) : (
                        <Check className="mx-auto h-5 w-5 text-emerald-500" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.others === false ? (
                        <X className="mx-auto h-5 w-5 text-red-400" />
                      ) : row.others === "partial" ? (
                        <span className="font-sans text-xs text-grey-400">Partiel</span>
                      ) : (
                        <Check className="mx-auto h-5 w-5 text-emerald-500" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div className="container px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-sans text-3xl font-bold text-grey-900 md:text-4xl">
              SCOD VTC en <span className="text-accent">chiffres</span>
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "2 000+", label: "Trajets réalisés" },
              { value: "4.8/5", label: "Satisfaction client" },
              { value: "15 min", label: "Attente max aéroport" },
              { value: "6", label: "Véhicules premium" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-grey-100 bg-gradient-to-br from-white to-grey-50 p-8 text-center shadow-lg"
              >
                <p className="font-sans text-5xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="mt-2 font-sans text-sm font-semibold text-grey-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="relative overflow-hidden bg-grey-50 py-20 lg:py-28">
        <div className="container px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-sans text-3xl font-bold text-grey-900 md:text-4xl">
              Nos <span className="text-accent">valeurs</span>
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-3">
            {[
              {
                emoji: "🛡️",
                icon: Shield,
                title: "Sécurité",
                items: [
                  "Chauffeurs vérifiés et formés",
                  "Véhicules assurés tous risques",
                  "Géolocalisation temps réel",
                ],
              },
              {
                emoji: "💎",
                icon: Gem,
                title: "Excellence",
                items: [
                  "Véhicules haut de gamme",
                  "Propreté irréprochable",
                  "Eau et chargeur à bord",
                ],
              },
              {
                emoji: "🤝",
                icon: Handshake,
                title: "Confiance",
                items: [
                  "Prix transparent, sans surprise",
                  "Avis clients vérifiés",
                  "Support 24/7 disponible",
                ],
              },
            ].map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-grey-100 bg-white p-8 shadow-lg transition-all hover:shadow-2xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all group-hover:bg-accent group-hover:text-brand">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-4xl">{value.emoji}</span>
                  </div>

                  <h3 className="mt-6 font-sans text-2xl font-bold text-grey-900">
                    {value.title}
                  </h3>

                  <ul className="mt-4 space-y-2">
                    {value.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 font-sans text-sm text-grey-600"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-hover py-20 lg:py-28">
        <div className="container px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-sans text-4xl font-bold text-white md:text-5xl">
              Testez l&apos;expérience SCOD VTC
            </h2>
            <p className="mt-4 font-sans text-lg text-white/80">
              Réservez votre premier trajet et découvrez la différence
            </p>

            <Link
              href="/commander"
              className="group mt-8 inline-flex items-center gap-2 rounded-btn bg-accent px-10 py-5 font-sans text-lg font-bold text-brand shadow-[0_6px_24px_rgba(255,195,0,0.4)] transition-all hover:bg-accent-light hover:shadow-[0_8px_32px_rgba(255,195,0,0.5)] hover:translate-y-[-2px]"
            >
              Réserver maintenant
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <p className="mt-6 font-sans text-sm text-white/60">
              Première course ? Code promo BIENVENUE pour -15%
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
