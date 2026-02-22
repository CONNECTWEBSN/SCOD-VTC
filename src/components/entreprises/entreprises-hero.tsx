"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, ChevronDown } from "lucide-react";

interface EntreprisesHeroProps {
  bgImage?: string;
}

export function EntreprisesHero({ bgImage = "/cars/header-hero/transport-professionnel.jpg" }: EntreprisesHeroProps) {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-brand-dark">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${bgImage}')`,
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/95 via-brand-dark/85 to-brand-dark/60" />

      {/* Grain texture */}
      <div
        className="grain-texture pointer-events-none absolute inset-0"
        style={{ opacity: 0.025 }}
      />

      {/* Gradient accent subtle */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />

      <div className="container relative z-10 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-pill border border-accent/30 bg-accent/10 px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-accent backdrop-blur-sm">
              Solution B2B
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans font-bold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(38px, 5vw, 58px)" }}
          >
            SCOD VTC pour les{" "}
            <span className="text-accent">entreprises</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl font-sans text-xl leading-relaxed text-white/85"
          >
            Simplifiez les déplacements professionnels de votre équipe
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="#contact"
              className="group flex items-center gap-2 rounded-btn bg-accent px-8 py-4 font-sans text-base font-bold text-brand shadow-[0_4px_20px_rgba(255,195,0,0.4)] transition-all hover:bg-accent-light hover:shadow-[0_6px_28px_rgba(255,195,0,0.5)] hover:translate-y-[-2px]"
            >
              Demander une démo
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#offres"
              className="flex items-center gap-2 rounded-btn border-2 border-white/20 bg-white/5 px-8 py-4 font-sans text-base font-bold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              Découvrir l&apos;offre
              <ChevronDown className="h-5 w-5" />
            </a>
          </motion.div>

          {/* Trust metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 border-t border-white/10 pt-12"
          >
            {[
              { value: "+50", label: "Entreprises clientes" },
              { value: "98%", label: "Satisfaction client" },
              { value: "24/7", label: "Support dédié" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-sans text-4xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="mt-1 font-sans text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
