"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Car, Clock, MapPin } from "lucide-react";

export function LocationHero() {
  return (
    <section className="relative flex min-h-[75vh] items-center overflow-hidden bg-brand-dark">
      {/* Background image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/cars/header-hero/location-flexible.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/85 to-brand-dark/35" />
        <div className="grain-texture pointer-events-none absolute inset-0" style={{ opacity: 0.025 }} />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-pill border border-accent/30 bg-accent/10 px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-accent backdrop-blur-sm">
              <Car className="h-3.5 w-3.5" />
              Location avec chauffeur
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans font-bold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
          >
            Louez un véhicule{" "}
            <span className="text-accent">avec chauffeur</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-5 max-w-2xl font-sans text-lg leading-relaxed text-white/85"
          >
            Journée, demi-journée ou longue durée — partout au Sénégal
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            {[
              { icon: Car, label: "Chauffeur professionnel" },
              { icon: Clock, label: "Tarif fixe garanti" },
              { icon: MapPin, label: "Kilométrage illimité" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm"
              >
                <Icon className="h-4 w-4 text-accent" />
                <span className="font-sans text-sm font-semibold text-white/90">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
