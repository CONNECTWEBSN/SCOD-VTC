"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/cn";

interface Testimonial {
  name: string;
  initials: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  trip: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marie Dupont",
    initials: "MD",
    role: "Voyageuse d'affaires",
    rating: 5,
    comment:
      "Service impeccable pour mon transfert AIBD → Almadies. Le chauffeur était ponctuel, la voiture impeccable, et j'ai pu travailler tranquillement pendant le trajet. Le suivi de vol automatique est vraiment un plus.",
    date: "Il y a 3 jours",
    trip: "AIBD → Almadies",
  },
  {
    name: "Amadou Diallo",
    initials: "AD",
    role: "Consultant",
    rating: 5,
    comment:
      "J'utilise SCOD VTC depuis 6 mois pour tous mes déplacements aéroport. Jamais déçu : tarif fixe respecté, chauffeurs professionnels, véhicules toujours propres. La pancarte nominative facilite vraiment les retrouvailles.",
    date: "Il y a 1 semaine",
    trip: "Plateau → AIBD",
  },
  {
    name: "Sophie Martin",
    initials: "SM",
    role: "Touriste",
    rating: 5,
    comment:
      "Premier voyage au Sénégal, un peu inquiète pour le transfert aéroport. SCOD VTC m'a totalement rassurée : réservation simple, SMS de confirmation avec photo du chauffeur, accueil chaleureux. Je recommande à 100%.",
    date: "Il y a 2 semaines",
    trip: "AIBD → Ngor",
  },
];

export function AirportTestimonials() {
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
            Témoignages clients
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-sans text-4xl font-bold text-grey-900 md:text-5xl"
          >
            Ils nous font{" "}
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              confiance
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex items-center justify-center gap-3"
          >
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <div className="h-6 w-px bg-grey-200" />
            <p className="font-sans text-sm font-semibold text-grey-700">
              4.9/5 basé sur 1 240+ avis
            </p>
          </motion.div>
        </div>

        {/* Testimonials grid */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-grey-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              {/* Quote decoration */}
              <div className="absolute right-4 top-4 opacity-5 transition-opacity duration-300 group-hover:opacity-10">
                <Quote className="h-16 w-16 text-accent" />
              </div>

              {/* Header */}
              <div className="relative z-10 flex items-start justify-between">
                {/* Avatar + Info */}
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-hover font-sans text-sm font-bold text-white shadow-md">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-sans text-base font-bold text-grey-900">
                      {testimonial.name}
                    </p>
                    <p className="font-sans text-xs text-grey-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="relative z-10 mt-4 flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="relative z-10 mt-4 flex-1 font-sans text-sm leading-relaxed text-grey-700">
                {testimonial.comment}
              </p>

              {/* Footer */}
              <div className="relative z-10 mt-5 flex items-center justify-between border-t border-grey-50 pt-4">
                <p className="font-sans text-xs text-grey-400">
                  {testimonial.date}
                </p>
                <span className="rounded-pill bg-accent/10 px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-accent">
                  {testimonial.trip}
                </span>
              </div>

              {/* Hover accent border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-accent/20" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-12 text-center"
        >
          <p className="font-sans text-base text-grey-600">
            Rejoignez des milliers de voyageurs satisfaits
          </p>
          <a
            href="/avis"
            className="mt-3 inline-flex items-center gap-1 font-sans text-sm font-semibold text-brand hover:underline"
          >
            Voir tous les avis
            <Star className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
