"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  CreditCard,
  FileText,
  Lock,
  UserCircle,
  Car,
} from "lucide-react";

const ADVANTAGES = [
  {
    icon: BarChart3,
    title: "Dashboard de suivi",
    description: "Tous les trajets de votre équipe en temps réel",
  },
  {
    icon: CreditCard,
    title: "Facturation centralisée",
    description: "Wave Business ou virement bancaire mensuel",
  },
  {
    icon: FileText,
    title: "Reporting complet",
    description: "Export CSV/PDF par collaborateur et période",
  },
  {
    icon: Lock,
    title: "Politique de transport",
    description: "Définissez plafonds, horaires et zones autorisées",
  },
  {
    icon: UserCircle,
    title: "Comptes collaborateurs",
    description: "Chaque employé dispose de son propre compte",
  },
  {
    icon: Car,
    title: "Flotte dédiée",
    description: "Véhicules et chauffeurs attitrés si besoin",
  },
];

export function EntreprisesAdvantages() {
  return (
    <section className="relative overflow-hidden bg-grey-50 py-20 lg:py-28">
      <div className="container px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-sm font-bold uppercase tracking-widest text-accent"
          >
            Avantages entreprise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-sans text-4xl font-bold text-grey-900 md:text-5xl"
          >
            Tout pour <span className="text-accent">simplifier</span> votre gestion
          </motion.h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {ADVANTAGES.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-xl border border-grey-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-accent/30"
              >
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-brand">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-4 font-sans text-lg font-bold text-grey-900">
                  {advantage.title}
                </h3>
                <p className="mt-1.5 font-sans text-sm text-grey-600">
                  {advantage.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
