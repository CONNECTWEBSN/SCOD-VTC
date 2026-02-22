"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Users, Briefcase, Crown, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/cn";

interface PricingTier {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  passengers: number;
  luggage: number;
  icon: React.ReactNode;
  badge?: string;
  recommended?: boolean;
  features: string[];
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: "confort",
    name: "Confort",
    subtitle: "BMW Série 5 ou Peugeot 3008",
    price: 45000,
    passengers: 4,
    luggage: 3,
    icon: <Shield className="h-7 w-7" />,
    features: [
      "Climatisation",
      "WiFi à bord",
      "Eau minérale",
      "Aide aux bagages",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    subtitle: "Tesla Model S ou Mercedes Classe S",
    price: 55000,
    passengers: 4,
    luggage: 3,
    icon: <Crown className="h-7 w-7" />,
    badge: "Recommandé",
    recommended: true,
    features: [
      "Tout Confort +",
      "Chargeur smartphone",
      "Presse quotidienne",
      "Choix musique",
    ],
  },
  {
    id: "vip",
    name: "VIP",
    subtitle: "Range Rover ou Van Mercedes",
    price: 65000,
    passengers: 6,
    luggage: 5,
    icon: <Zap className="h-7 w-7" />,
    features: [
      "Tout Premium +",
      "Champagne frais",
      "Espace maximal",
      "Service concierge",
    ],
  },
];

function formatFcfa(amount: number): string {
  return new Intl.NumberFormat("fr-SN", { maximumFractionDigits: 0 }).format(amount);
}

export function AirportPricing() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="container px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-label text-accent"
          >
            Tarifs Transfert AIBD
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-h1 mt-3"
          >
            Choisissez votre <span className="text-accent">gamme</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-body-lg mt-4"
          >
            Tarif fixe garanti · Aucun supplément caché · Annulation gratuite 24h
          </motion.p>
        </div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-8">
          {PRICING_TIERS.map((tier, index) => {
            const isRecommended = tier.recommended;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-card border bg-white shadow-lg transition-all duration-300",
                  isRecommended
                    ? "scale-[1.05] border-accent shadow-[0_8px_30px_rgba(255,195,0,0.15)] md:scale-[1.08]"
                    : "border-grey-100 hover:shadow-xl"
                )}
              >
                {/* Badge */}
                {tier.badge && (
                  <div className="text-label absolute right-4 top-4 z-10 rounded-pill bg-accent px-3 py-1 text-brand shadow-md">
                    {tier.badge}
                  </div>
                )}

                {/* Header */}
                <div
                  className={cn(
                    "px-6 pb-6 pt-8",
                    isRecommended
                      ? "bg-gradient-to-br from-accent/5 to-brand/5"
                      : "bg-grey-50"
                  )}
                >
                  <div
                    className={cn(
                      "mx-auto flex h-16 w-16 items-center justify-center rounded-xl transition-colors",
                      isRecommended
                        ? "bg-accent text-brand"
                        : "bg-grey-100 text-grey-600"
                    )}
                  >
                    {tier.icon}
                  </div>

                  <h3 className="text-h2 mt-5 text-center">
                    {tier.name}
                  </h3>
                  <p className="text-sm mt-1 text-center">
                    {tier.subtitle}
                  </p>

                  {/* Price */}
                  <div className="mt-6 text-center">
                    <p className="text-accent" style={{ fontSize: "var(--text-hero)", fontWeight: "var(--weight-bold)" }}>
                      {formatFcfa(tier.price)}
                    </p>
                    <p className="text-sm mt-1">
                      FCFA · Trajet simple
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="mt-5 flex items-center justify-center gap-4">
                    <div className="text-sm flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      {tier.passengers} pers.
                    </div>
                    <div className="text-sm flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" />
                      {tier.luggage} bag.
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex-1 px-6 py-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check
                          className={cn(
                            "mt-0.5 h-5 w-5 shrink-0",
                            isRecommended ? "text-accent" : "text-grey-400"
                          )}
                        />
                        <span className="text-body" style={{ color: "var(--color-text-secondary)" }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <Link
                    href={`/reservation?pickup=A%C3%A9roport%20AIBD&vehicle=${tier.id}`}
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-btn py-3.5 text-cta transition-all",
                      isRecommended
                        ? "bg-accent text-brand uppercase shadow-[0_4px_16px_rgba(255,195,0,0.3)] hover:bg-accent-light hover:shadow-[0_6px_20px_rgba(255,195,0,0.4)]"
                        : "border-2 border-brand bg-white text-brand uppercase hover:bg-brand hover:text-white"
                    )}
                  >
                    Réserver {tier.name}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-sm mt-8 text-center"
        >
          * Suppléments : Nuit (22h-6h) +5 000 FCFA | Zone hors Dakar &gt;50km +10 000 FCFA
        </motion.p>
      </div>
    </section>
  );
}
