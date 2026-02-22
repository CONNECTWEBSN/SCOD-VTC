"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

const steps = [
  {
    number: "01",
    title: "Saisissez votre trajet",
    description: "Départ, arrivée, date et heure. Le prix s'affiche instantanément — fixe et garanti.",
  },
  {
    number: "02",
    title: "Choisissez votre véhicule",
    description: "Berline, SUV ou Van VIP. Chaque gamme affiche son chauffeur, sa note et son tarif.",
  },
  {
    number: "03",
    title: "Payez en ligne",
    description: "Orange Money, Wave, Visa ou Mastercard. Confirmation immédiate, zéro frais cachés.",
  },
  {
    number: "04",
    title: "Votre chauffeur arrive",
    description: "SMS avec nom, photo et numéro. Suivi en temps réel jusqu'à votre prise en charge.",
  },
];

export function HowItWorks({ className }: { className?: string }) {
  return (
    <section className={cn("relative overflow-hidden bg-grey-50 py-24 lg:py-32", className)}>
      {/* Grain texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Subtle bottom accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full opacity-[0.02]"
        style={{ background: "radial-gradient(circle, #FFC300, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="text-label text-accent mb-3 inline-block">
              Comment ça marche
            </span>
            <h2 className="text-h1 text-balance">
              Réservez en moins
              <br />
              de 2 minutes
            </h2>
          </div>

          <Link
            href="/reservation"
            className={cn(
              "group inline-flex shrink-0 items-center gap-2 self-start rounded-xl",
              "bg-brand px-6 py-3 text-cta text-white uppercase sm:self-end",
              "transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/25"
            )}
          >
            Réserver maintenant
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 gap-px bg-grey-200 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden bg-white p-8 transition-all duration-300 hover:bg-brand hover:shadow-xl hover:shadow-brand/15 hover:z-10"
            >
              {/* Big ghost number */}
              <span
                className="pointer-events-none absolute right-5 top-3 select-none font-display font-extrabold leading-none tracking-[-0.03em] text-grey-100 transition-colors duration-300 group-hover:text-white/5"
                style={{ fontSize: "clamp(72px, 8vw, 96px)" }}
                aria-hidden
              >
                {step.number}
              </span>

              {/* Step number pill */}
              <div className="relative mb-6">
                <span className="inline-block rounded-full bg-accent/10 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-[0.08em] text-accent transition-colors duration-300 group-hover:bg-white/10 group-hover:text-accent">
                  Étape {parseInt(step.number)}
                </span>
              </div>

              {/* Title */}
              <h3 className="relative mb-3 font-body text-[18px] font-bold leading-snug tracking-[-0.01em] text-grey-900 transition-colors duration-300 group-hover:text-white">
                {step.title}
              </h3>

              {/* Description */}
              <p className="relative font-body text-[14px] font-normal leading-relaxed text-grey-500 transition-colors duration-300 group-hover:text-white/65 text-justify">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm mt-8 text-center"
        >
          Disponible 7j/7, 24h/24 · Paiement 100% sécurisé · Annulation gratuite 24h avant
        </motion.p>
      </div>
    </section>
  );
}
