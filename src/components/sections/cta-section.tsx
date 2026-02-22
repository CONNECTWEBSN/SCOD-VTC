"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, Shield, BadgeCheck, Clock, Star } from "lucide-react";
import { cn } from "@/lib/cn";

const badges = [
  { icon: BadgeCheck, label: "Tarif fixe garanti" },
  { icon: Shield, label: "Paiement sécurisé" },
  { icon: Clock, label: "7j/7, 24h/24" },
];

const testimonial = {
  quote: "Service impeccable. Mon chauffeur était déjà là quand j'ai atterri. Je recommande à 100%.",
  author: "Moussa Sarr",
  role: "Client régulier · Dakar",
  rating: 5,
};

const stats = [
  { value: "4.8/5", label: "satisfaction" },
  { value: "2 000+", label: "trajets" },
  { value: "< 2 min", label: "réservation" },
];

export function CTASection({ className }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className={cn("relative overflow-hidden bg-brand-dark py-24 lg:py-32", className)}
    >
      {/* Background effects */}
      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Glow left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #FFC300, transparent 65%)" }}
      />
      {/* Glow right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #FFC300, transparent 65%)" }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_380px]">

          {/* LEFT — Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <span className="text-label text-accent/80 mb-4 inline-block">
              Prêt à partir ?
            </span>

            {/* Headline */}
            <h2 className="text-hero-inverse mb-5 text-balance">
              Réservez votre
              <br />
              chauffeur{" "}
              <span className="text-accent">en 30 secondes</span>
            </h2>

            {/* Subline */}
            <p className="text-body-lg-inverse mb-10 max-w-prose">
              Tarif fixe garanti. Chauffeur confirmé immédiatement.
              Annulation gratuite jusqu'à 24h avant le départ.
            </p>

            {/* CTAs */}
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <Link
                href="/commander"
                className={cn(
                  "group inline-flex items-center gap-2.5 rounded-xl bg-accent px-7 py-4",
                  "text-cta text-brand uppercase",
                  "shadow-lg shadow-accent/25 transition-all duration-200",
                  "hover:-translate-y-0.5 hover:bg-accent-light hover:shadow-xl hover:shadow-accent/35"
                )}
              >
                Réserver maintenant
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <a
                href="tel:+221771234567"
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-xl border border-white/20 px-7 py-4",
                  "text-body-inverse",
                  "transition-all duration-200",
                  "hover:border-white/40 hover:text-white hover:bg-white/5"
                )}
                style={{ fontWeight: "var(--weight-semibold)" }}
              >
                <Phone className="h-4 w-4" />
                Nous appeler
              </a>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {badges.map(({ icon: Icon, label }) => (
                <div key={label} className="text-sm-inverse flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Social proof */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Stats row */}
            <div className="grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/5 px-2 py-5 backdrop-blur-sm">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 px-2 text-center">
                  <span className="text-accent" style={{ fontSize: "var(--text-h3)", fontWeight: "var(--weight-bold)" }}>{value}</span>
                  <span className="text-sm-inverse">{label}</span>
                </div>
              ))}
            </div>

            {/* Testimonial card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              {/* Stars */}
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-body-inverse mb-5 italic" style={{ lineHeight: "1.7" }}>
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar initials */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent" style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-bold)" }}>
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="text-body-inverse" style={{ fontWeight: "var(--weight-semibold)", color: "var(--color-text-inverse)" }}>{testimonial.author}</p>
                  <p className="text-sm-inverse">{testimonial.role}</p>
                </div>
              </div>
            </div>

            {/* Link to all reviews */}
            <Link
              href="/avis"
              className="text-sm-inverse text-center transition-colors hover:text-accent"
              style={{ fontWeight: "var(--weight-medium)" }}
            >
              Voir tous les avis →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
