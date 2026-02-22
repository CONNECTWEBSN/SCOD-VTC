"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Check,
  Shield,
  Clock,
  Plane,
  Tag,
  Droplets,
  Battery,
  Luggage,
  Moon,
  MapPin,
} from "lucide-react";

const INCLUDED_FEATURES = [
  {
    icon: Shield,
    title: "Tarif fixe garanti",
    description: "Pas de compteur, aucune surprise",
  },
  {
    icon: Clock,
    title: "15 min d'attente offertes",
    description: "Vol retardé ? Pas de frais supplémentaires",
  },
  {
    icon: Plane,
    title: "Suivi de vol temps réel",
    description: "Votre chauffeur suit votre vol automatiquement",
  },
  {
    icon: Tag,
    title: "Pancarte nominative",
    description: "Votre nom à la sortie des arrivées",
  },
  {
    icon: Droplets,
    title: "Eau et chargeur à bord",
    description: "Rafraîchissement et batterie pleine",
  },
  {
    icon: Luggage,
    title: "Aide aux bagages",
    description: "Chargement et déchargement inclus",
  },
];

const SUPPLEMENTS = [
  {
    icon: Moon,
    label: "Supplément nuit (22h-6h)",
    amount: "+5 000 FCFA",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: MapPin,
    label: "Zone hors Dakar (>50 km)",
    amount: "+10 000 FCFA",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
];

export function AirportIncluded() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="container px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-sm font-bold uppercase tracking-widest text-accent"
          >
            Tout inclus
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-sans text-4xl font-bold text-grey-900 md:text-5xl"
          >
            Ce qui est{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              inclus
            </span>{" "}
            dans le tarif
          </motion.h2>
        </div>

        {/* Grid of included features */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {INCLUDED_FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-xl border border-grey-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-accent/30 hover:shadow-lg"
              >
                {/* Accent line on hover */}
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-light transition-transform duration-300 group-hover:scale-x-100" />

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:bg-accent group-hover:text-brand">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-sans text-base font-bold text-grey-900">
                      {feature.title}
                    </h3>
                    <p className="mt-1 font-sans text-sm text-grey-600">
                      {feature.description}
                    </p>
                  </div>

                  {/* Check icon */}
                  <Check className="h-5 w-5 shrink-0 text-emerald-500" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Supplements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <div className="rounded-2xl border border-grey-100 bg-grey-50 p-8">
            <h3 className="text-center font-sans text-2xl font-bold text-grey-900">
              Suppléments éventuels
            </h3>
            <p className="mt-2 text-center font-sans text-sm text-grey-500">
              Appliqués automatiquement selon les conditions
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {SUPPLEMENTS.map((supplement) => {
                const Icon = supplement.icon;
                return (
                  <div
                    key={supplement.label}
                    className={`flex items-center gap-4 rounded-xl border ${supplement.bgColor} border-current/10 p-5`}
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${supplement.color} bg-white/80`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-sans text-sm font-semibold text-grey-700">
                        {supplement.label}
                      </p>
                      <p
                        className={`mt-0.5 font-sans text-xl font-bold ${supplement.color}`}
                      >
                        {supplement.amount}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 text-center font-sans text-xs text-grey-400">
              * Le prix total avec suppléments est calculé automatiquement lors
              de votre réservation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
