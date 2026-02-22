"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plane, Building2, PartyPopper, CarFront, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

const services = [
  {
    icon: Plane,
    tag: "Transfert aéroport",
    title: "Dakar ↔ AIBD",
    description: "Tarif fixe, chauffeur avec pancarte, suivi vol en temps réel.",
    price: "45 000 FCFA",
    href: "/services/transfert-aeroport",
    popular: true,
  },
  {
    icon: Building2,
    tag: "Entreprise",
    title: "Transport collaborateurs",
    description: "Dashboard, facturation Wave Business, reporting mensuel.",
    price: "Sur devis",
    href: "/entreprises",
    popular: false,
  },
  {
    icon: PartyPopper,
    tag: "Événementiel",
    title: "Mariages & cérémonies",
    description: "Véhicule décoré, chauffeur en tenue, ponctualité garantie.",
    price: "45 000 FCFA/j",
    href: "/services/evenements",
    popular: false,
  },
  {
    icon: CarFront,
    tag: "Location",
    title: "Chauffeur à disposition",
    description: "Demi-journée, journée ou longue durée, kilométrage illimité.",
    price: "120 000 FCFA/j",
    href: "/location",
    popular: false,
  },
];

export function ServicesSection({ className }: { className?: string }) {
  return (
    <section
      className={cn("relative overflow-hidden py-20 lg:py-28", className)}
      style={{ background: "linear-gradient(180deg, #FAFAF8 0%, #F7F7F5 100%)" }}
    >
      {/* Subtle accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full opacity-[0.025]"
        style={{ background: "radial-gradient(circle, #FFC300, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <span className="text-label text-accent mb-2 inline-block">
              Nos services
            </span>
            <h2 className="text-h1">
              Tout ce dont vous avez besoin
            </h2>
          </div>
          <Link
            href="/reservation"
            className="text-sm hidden shrink-0 transition-colors hover:text-[var(--color-text-primary)] sm:block"
          >
            Tous les services →
          </Link>
        </motion.div>

        {/* Grid 4 columns */}
        <div className="grid grid-cols-1 gap-px bg-grey-200 rounded-2xl overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={service.href}
                  className={cn(
                    "group relative flex h-full flex-col bg-white p-6 transition-all duration-250",
                    "hover:bg-grey-50",
                    service.popular && "lg:bg-[#FAFAF8]"
                  )}
                >
                  {/* Popular dot */}
                  {service.popular && (
                    <span className="absolute right-5 top-5 flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                  )}

                  {/* Icon */}
                  <div className={cn(
                    "mb-6 flex h-10 w-10 items-center justify-center rounded-xl border",
                    "border-grey-200 bg-white text-grey-500 transition-all duration-200",
                    "group-hover:border-accent/30 group-hover:bg-accent/5 group-hover:text-accent"
                  )}>
                    <Icon className="h-[18px] w-[18px]" />
                  </div>

                  {/* Tag */}
                  <span className="text-label mb-2">
                    {service.tag}
                  </span>

                  {/* Title */}
                  <h3 className="text-h3 mb-3 transition-colors duration-200 group-hover:text-brand">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm mb-8 flex-1">
                    {service.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-accent" style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-bold)" }}>
                      {service.price}
                    </span>
                    <ArrowUpRight className={cn(
                      "h-4 w-4 text-grey-300 transition-all duration-200",
                      "group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    )} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile — "Tous les services" */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/reservation"
            className="text-sm transition-colors hover:text-[var(--color-text-primary)]"
          >
            Tous les services →
          </Link>
        </div>
      </div>
    </section>
  );
}
