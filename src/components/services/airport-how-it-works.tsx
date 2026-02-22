"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FileText, Bell, MapPin, Car } from "lucide-react";
import { cn } from "@/lib/cn";

interface Step {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    icon: <FileText className="h-6 w-6" />,
    title: "Réservez en ligne",
    description:
      "Formulaire simple en 2 minutes ou via WhatsApp. Renseignez votre numéro de vol pour un suivi automatique.",
  },
  {
    number: 2,
    icon: <Bell className="h-6 w-6" />,
    title: "Confirmation SMS immédiate",
    description:
      "Vous recevez le nom, la photo et les coordonnées de votre chauffeur confirmé. Aucune surprise.",
  },
  {
    number: 3,
    icon: <MapPin className="h-6 w-6" />,
    title: "Votre chauffeur vous attend",
    description:
      "Pancarte nominative à la sortie des arrivées. 15 minutes d'attente offertes en cas de retard.",
  },
  {
    number: 4,
    icon: <Car className="h-6 w-6" />,
    title: "Trajet confortable",
    description:
      "Véhicule climatisé, eau fraîche, aide aux bagages. Tarif fixe garanti, pas de mauvaise surprise.",
  },
];

export function AirportHowItWorks() {
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
            Comment ça marche
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-sans text-4xl font-bold text-grey-900 md:text-5xl"
          >
            Réservation en{" "}
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              4 étapes
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 font-sans text-lg text-grey-600"
          >
            Simple, rapide et sans stress
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="relative">
            {/* Vertical line (desktop only) */}
            <div className="absolute left-[31px] top-8 hidden h-[calc(100%-80px)] w-px bg-gradient-to-b from-accent via-accent/50 to-accent/20 md:block" />

            {/* Steps */}
            <div className="space-y-8 md:space-y-12">
              {STEPS.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="relative flex gap-6"
                >
                  {/* Number + Icon */}
                  <div className="relative z-10 flex shrink-0 flex-col items-center gap-2">
                    {/* Circle with number */}
                    <div
                      className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br shadow-lg transition-all duration-300",
                        index === 0 && "from-accent to-accent-light",
                        index === 1 && "from-brand to-brand-hover",
                        index === 2 && "from-accent-light to-accent",
                        index === 3 && "from-brand-hover to-brand"
                      )}
                    >
                      <span className="font-sans text-2xl font-bold text-white">
                        {step.number}
                      </span>
                    </div>

                    {/* Icon badge */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-accent shadow-md">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4 pt-2">
                    <h3 className="font-sans text-2xl font-bold text-grey-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-sans text-base leading-relaxed text-grey-600">
                      {step.description}
                    </p>

                    {/* Decorative card */}
                    <div className="mt-4 rounded-xl border border-grey-100 bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="font-sans text-sm font-semibold text-grey-700">
                          {index === 0 && "Réservation confirmée en temps réel"}
                          {index === 1 && "Notification SMS instantanée"}
                          {index === 2 && "Suivi de vol automatique"}
                          {index === 3 && "Paiement sécurisé en ligne ou à bord"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-16 max-w-3xl rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 to-brand/5 p-8 text-center"
        >
          <p className="font-sans text-lg text-grey-700">
            <span className="font-bold text-brand">Besoin d&apos;aide ?</span>{" "}
            Notre équipe est disponible 24/7 par téléphone ou WhatsApp pour
            répondre à vos questions.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+221771234567"
              className="font-sans text-base font-bold text-brand hover:underline"
            >
              +221 77 123 45 67
            </a>
            <span className="text-grey-300">|</span>
            <a
              href="https://wa.me/221771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-base font-bold text-accent hover:underline"
            >
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
