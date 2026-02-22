"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Car, Users, Star } from "lucide-react";
import { cn } from "@/lib/cn";

interface Formula {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  popular?: boolean;
  features: string[];
  icon: React.ReactNode;
}

const FORMULAS: Formula[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    subtitle: "1 véhicule premium",
    price: "À partir de 45 000 FCFA",
    icon: <Car className="h-7 w-7" />,
    features: [
      "1 véhicule de votre choix",
      "Chauffeur professionnel",
      "4 heures de mise à disposition",
      "Décoration simple incluse",
      "50 km inclus",
    ],
  },
  {
    id: "confort",
    name: "Confort",
    subtitle: "2-3 véhicules coordonnés",
    price: "À partir de 120 000 FCFA",
    popular: true,
    icon: <Users className="h-7 w-7" />,
    features: [
      "2 à 3 véhicules assortis",
      "Coordination événement",
      "6 heures de mise à disposition",
      "Décoration personnalisée",
      "100 km inclus",
      "Coordinateur dédié",
    ],
  },
  {
    id: "prestige",
    name: "Prestige",
    subtitle: "Flotte complète sur mesure",
    price: "Sur devis",
    icon: <Star className="h-7 w-7" />,
    features: [
      "Flotte complète (4+ véhicules)",
      "Service concierge 24/7",
      "Durée illimitée",
      "Décoration haut de gamme",
      "Kilométrage illimité",
      "Coordinateur + assistant",
      "Tapis rouge & service champagne",
    ],
  },
];

function formatFcfa(text: string): string {
  return text;
}

export function EventFormulas() {
  return (
    <section className="relative overflow-hidden bg-grey-50 py-20 lg:py-28">
      <div className="container px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-sm font-bold uppercase tracking-widest text-accent"
          >
            Nos formules
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-sans text-4xl font-bold text-grey-900 md:text-5xl"
          >
            Choisissez votre{" "}
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              formule
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 font-sans text-lg text-grey-600"
          >
            Des prestations adaptées à tous les budgets
          </motion.p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-8">
          {FORMULAS.map((formula, index) => {
            const isPopular = formula.popular;

            return (
              <motion.div
                key={formula.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-lg transition-all duration-300",
                  isPopular
                    ? "scale-[1.03] border-accent shadow-[0_8px_30px_rgba(255,195,0,0.15)] md:scale-[1.05]"
                    : "border-grey-100 hover:shadow-xl"
                )}
              >
                {/* Badge */}
                {isPopular && (
                  <div className="absolute right-4 top-4 z-10 rounded-pill bg-accent px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-brand shadow-md">
                    Populaire
                  </div>
                )}

                {/* Header */}
                <div
                  className={cn(
                    "px-6 pb-6 pt-8",
                    isPopular
                      ? "bg-gradient-to-br from-accent/5 to-brand/5"
                      : "bg-grey-50"
                  )}
                >
                  <div
                    className={cn(
                      "mx-auto flex h-16 w-16 items-center justify-center rounded-xl transition-colors",
                      isPopular
                        ? "bg-accent text-brand"
                        : "bg-grey-100 text-grey-600"
                    )}
                  >
                    {formula.icon}
                  </div>

                  <h3 className="mt-5 text-center font-sans text-2xl font-bold text-grey-900">
                    {formula.name}
                  </h3>
                  <p className="mt-1 text-center font-sans text-sm text-grey-500">
                    {formula.subtitle}
                  </p>

                  {/* Price */}
                  <div className="mt-6 text-center">
                    <p className="font-sans text-3xl font-bold leading-none text-accent">
                      {formula.price}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex-1 px-6 py-6">
                  <ul className="space-y-3">
                    {formula.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check
                          className={cn(
                            "mt-0.5 h-5 w-5 shrink-0",
                            isPopular ? "text-accent" : "text-grey-400"
                          )}
                        />
                        <span className="font-sans text-sm text-grey-700">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <Link
                    href="#devis"
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-btn py-3.5 font-sans text-base font-bold transition-all",
                      isPopular
                        ? "bg-accent text-brand shadow-[0_4px_16px_rgba(255,195,0,0.3)] hover:bg-accent-light hover:shadow-[0_6px_20px_rgba(255,195,0,0.4)]"
                        : "border-2 border-brand bg-white text-brand hover:bg-brand hover:text-white"
                    )}
                  >
                    Demander un devis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center font-sans text-sm text-grey-400"
        >
          * Les tarifs sont indicatifs. Devis personnalisé gratuit sous 24h
        </motion.p>
      </div>
    </section>
  );
}
