"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, User, Calendar } from "lucide-react";

export function DriverHero() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-brand-dark">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/cars/header-hero/placement-chauffeurs.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/85 to-brand-dark/35" />
        <div className="grain-texture pointer-events-none absolute inset-0" style={{ opacity: 0.025 }} />
      </div>

      <div className="container relative z-10 px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-pill border border-accent/30 bg-accent/10 px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-accent backdrop-blur-sm">
              <User className="h-3.5 w-3.5" />
              Service entreprise
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans font-bold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
          >
            Votre chauffeur{" "}
            <span className="text-accent">à disposition</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-5 max-w-2xl font-sans text-lg leading-relaxed text-white/85"
          >
            Un chauffeur dédié pour votre journée, semaine ou mois
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            {[
              "Flexibilité totale",
              "Discrétion garantie",
              "Véhicule premium",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm"
              >
                <span className="font-sans text-sm font-semibold text-white/90">
                  {feature}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link
              href="#reservation"
              className="group flex items-center gap-2 rounded-btn bg-accent px-8 py-4 font-sans text-base font-bold text-brand shadow-[0_4px_20px_rgba(255,195,0,0.4)] transition-all hover:bg-accent-light hover:shadow-[0_6px_28px_rgba(255,195,0,0.5)] hover:translate-y-[-2px]"
            >
              Réserver maintenant
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/entreprises/trajets-pro"
              className="flex items-center gap-2 rounded-btn border-2 border-white/20 bg-white/5 px-8 py-4 font-sans text-base font-bold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              <Calendar className="h-5 w-5" />
              Nos offres entreprise
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
