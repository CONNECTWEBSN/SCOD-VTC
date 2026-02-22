"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, UserCheck, PartyPopper, ArrowRight } from "lucide-react";

const OFFERS = [
  {
    icon: Users,
    title: "Trajets Collaborateurs",
    description:
      "Gérez facilement les déplacements de toute votre équipe avec une solution centralisée",
    features: ["Dashboard de suivi", "Budget par collaborateur", "Facturation mensuelle"],
    href: "/entreprises/trajets-pro",
    color: "from-blue-600 to-blue-400",
  },
  {
    icon: UserCheck,
    title: "Chauffeur à Disposition",
    description:
      "Un chauffeur dédié pour vos dirigeants et invités VIP, disponible à la demande",
    features: ["Flexibilité totale", "Discrétion garantie", "Véhicule premium"],
    href: "/entreprises/chauffeur-disposition",
    color: "from-accent to-accent-light",
    popular: true,
  },
  {
    icon: PartyPopper,
    title: "Événements Corporate",
    description:
      "Transport sur mesure pour vos séminaires, galas et événements professionnels",
    features: ["Coordination complète", "Flotte coordonnée", "Tarif dégressif"],
    href: "/services/evenements",
    color: "from-purple-600 to-purple-400",
  },
];

export function EntreprisesOffers() {
  return (
    <section id="offres" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="container px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-sm font-bold uppercase tracking-widest text-accent"
          >
            Nos solutions entreprise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-sans text-4xl font-bold text-grey-900 md:text-5xl"
          >
            3 offres pour <span className="text-accent">tous vos besoins</span>
          </motion.h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3 lg:gap-8">
          {OFFERS.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <Link
                  href={offer.href}
                  className="block h-full overflow-hidden rounded-2xl border border-grey-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-accent/30"
                >
                  {offer.popular && (
                    <div className="absolute right-4 top-4 rounded-pill bg-accent px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-brand">
                      Populaire
                    </div>
                  )}

                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${offer.color} text-white shadow-lg`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-5 font-sans text-2xl font-bold text-grey-900">
                    {offer.title}
                  </h3>
                  <p className="mt-2 font-sans text-base text-grey-600">
                    {offer.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {offer.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 font-sans text-sm text-grey-700"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center gap-2 font-sans text-sm font-bold text-brand transition-all group-hover:gap-3">
                    En savoir plus
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
