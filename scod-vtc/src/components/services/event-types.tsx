"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Heart, PartyPopper, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface EventType {
  icon: React.ReactNode;
  emoji: string;
  title: string;
  description: string;
  features: string[];
  color: string;
  bgColor: string;
}

const EVENT_TYPES: EventType[] = [
  {
    icon: <Heart className="h-7 w-7" />,
    emoji: "💍",
    title: "Mariages & Cérémonies",
    description: "Le jour le plus important mérite un transport d'exception",
    features: [
      "Véhicules décorés sur demande",
      "Chauffeur en costume",
      "Coordination avec le planning",
      "Service tapis rouge",
    ],
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    icon: <PartyPopper className="h-7 w-7" />,
    emoji: "🎉",
    title: "Soirées & Galas",
    description: "Transport VIP pour vos invités et soirées prestigieuses",
    features: [
      "Navette aller-retour",
      "Attente sur place",
      "Plusieurs points de prise en charge",
      "Service discret et élégant",
    ],
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: <Briefcase className="h-7 w-7" />,
    emoji: "🏢",
    title: "Séminaires & Congrès",
    description: "Solutions professionnelles pour vos événements d'entreprise",
    features: [
      "Navette groupe",
      "Ponctualité garantie",
      "Facturation centralisée",
      "Coordinateur dédié",
    ],
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: <GraduationCap className="h-7 w-7" />,
    emoji: "🎓",
    title: "Cérémonies officielles",
    description: "Protocole et excellence pour vos événements institutionnels",
    features: [
      "Mercedes Classe S",
      "Respect du protocole",
      "Chauffeur expérimenté",
      "Discrétion absolue",
    ],
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
];

export function EventTypes() {
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
            Types d&apos;événements
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-sans text-4xl font-bold text-grey-900 md:text-5xl"
          >
            Pour <span className="text-accent">tous</span> vos événements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 font-sans text-lg text-grey-600"
          >
            Une solution adaptée à chaque occasion spéciale
          </motion.p>
        </div>

        {/* Grid 2x2 */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 lg:gap-8">
          {EVENT_TYPES.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-grey-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-accent/20"
            >
              {/* Accent line */}
              <div className={cn("absolute left-0 top-0 h-1 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100", event.color.replace("text-", "bg-"))} />

              {/* Icon */}
              <div className="flex items-start justify-between">
                <div className={cn("flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-300", event.bgColor, event.color)}>
                  {event.icon}
                </div>
                <span className="text-4xl">{event.emoji}</span>
              </div>

              {/* Content */}
              <h3 className="mt-5 font-sans text-2xl font-bold text-grey-900">
                {event.title}
              </h3>
              <p className="mt-2 font-sans text-base text-grey-600">
                {event.description}
              </p>

              {/* Features */}
              <ul className="mt-5 space-y-2.5">
                {event.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <ArrowRight className={cn("mt-0.5 h-4 w-4 shrink-0 transition-colors", event.color, "opacity-60 group-hover:opacity-100")} />
                    <span className="font-sans text-sm text-grey-700">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Hover overlay */}
              <div className={cn("absolute bottom-0 left-0 right-0 h-0 transition-all duration-300 group-hover:h-1", event.color.replace("text-", "bg-"))} />
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center font-sans text-sm text-grey-400"
        >
          Autre type d&apos;événement ? Contactez-nous pour une solution sur
          mesure
        </motion.p>
      </div>
    </section>
  );
}
