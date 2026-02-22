"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plane, MapPin, ArrowRight, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/cn";

export function AirportQuickBooking() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    from: "",
    flightNumber: "",
    date: "",
    time: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query string for /reservation page
    const params = new URLSearchParams();
    
    // Determine pickup/dropoff based on direction
    if (formData.from) {
      params.set("pickup", formData.from);
      params.set("dropoff", "Aéroport International Blaise Diagne, Diass, Sénégal");
    } else {
      params.set("pickup", "Aéroport International Blaise Diagne, Diass, Sénégal");
    }
    
    if (formData.date) params.set("date", formData.date);
    if (formData.time) params.set("time", formData.time);
    if (formData.flightNumber) params.set("flight", formData.flightNumber);
    
    router.push(`/reservation?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-hover py-20 lg:py-28">
      {/* Grain texture */}
      <div
        className="grain-texture pointer-events-none absolute inset-0"
        style={{ opacity: 0.025 }}
      />

      <div className="container relative z-10 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="font-sans text-sm font-bold uppercase tracking-widest text-accent">
              Réservation rapide
            </p>
            <h2 className="mt-3 font-sans text-4xl font-bold text-white md:text-5xl">
              Réservez votre transfert AIBD
            </h2>
            <p className="mt-4 font-sans text-lg text-white/80">
              Remplissez ce formulaire pour une réservation en 30 secondes
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md lg:p-8"
          >
            <div className="space-y-5">
              {/* Direction selector */}
              <div>
                <label className="mb-2 block font-sans text-sm font-semibold text-white/90">
                  Je viens de
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-accent" />
                  <input
                    type="text"
                    value={formData.from}
                    onChange={(e) =>
                      setFormData({ ...formData, from: e.target.value })
                    }
                    placeholder="ex: Almadies, Plateau, Sacré-Cœur..."
                    className="h-[56px] w-full rounded-input border border-white/20 bg-white/10 pl-12 pr-4 font-sans text-base text-white placeholder:text-white/40 backdrop-blur-sm focus:border-accent focus:bg-white/15 focus:outline-none focus:ring-4 focus:ring-accent/20"
                  />
                </div>
                <p className="mt-1.5 font-sans text-xs text-white/60">
                  Laissez vide si vous venez de l&apos;aéroport
                </p>
              </div>

              {/* Flight number */}
              <div>
                <label className="mb-2 block font-sans text-sm font-semibold text-white/90">
                  Numéro de vol{" "}
                  <span className="font-400 text-white/50">(recommandé)</span>
                </label>
                <div className="relative">
                  <Plane className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-accent" />
                  <input
                    type="text"
                    value={formData.flightNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        flightNumber: e.target.value.toUpperCase(),
                      })
                    }
                    placeholder="ex: AF 718 / DT 501"
                    maxLength={10}
                    className="h-[56px] w-full rounded-input border border-white/20 bg-white/10 pl-12 pr-4 font-sans text-base tracking-wider text-white placeholder:text-white/40 backdrop-blur-sm focus:border-accent focus:bg-white/15 focus:outline-none focus:ring-4 focus:ring-accent/20"
                  />
                </div>
                <p className="mt-1.5 flex items-start gap-1.5 font-sans text-xs text-accent">
                  <span className="mt-0.5">ℹ</span>
                  Suivi automatique de votre vol + 15 min d&apos;attente
                  offertes
                </p>
              </div>

              {/* Date & Time */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-sans text-sm font-semibold text-white/90">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="h-[56px] w-full rounded-input border border-white/20 bg-white/10 pl-12 pr-4 font-sans text-base text-white backdrop-blur-sm focus:border-accent focus:bg-white/15 focus:outline-none focus:ring-4 focus:ring-accent/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-sans text-sm font-semibold text-white/90">
                    Heure
                  </label>
                  <div className="relative">
                    <Clock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="h-[56px] w-full rounded-input border border-white/20 bg-white/10 pl-12 pr-4 font-sans text-base text-white backdrop-blur-sm focus:border-accent focus:bg-white/15 focus:outline-none focus:ring-4 focus:ring-accent/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 flex h-[60px] w-full items-center justify-center gap-3 rounded-btn bg-accent font-sans text-lg font-bold text-brand shadow-[0_6px_24px_rgba(255,195,0,0.4)] transition-all hover:bg-accent-light hover:shadow-[0_8px_32px_rgba(255,195,0,0.5)]"
            >
              Réserver mon transfert
              <ArrowRight className="h-5 w-5" />
            </motion.button>

            {/* Trust signals */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/10 pt-6">
              {[
                "Tarif fixe garanti",
                "Annulation gratuite 24h",
                "Confirmation immédiate",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 font-sans text-sm text-white/70"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {item}
                </span>
              ))}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
