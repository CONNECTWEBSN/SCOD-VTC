"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Circle, ArrowRight, Star, Check, Calendar, Plane, Shield, MapPinned } from "lucide-react";
import { cn } from "@/lib/cn";

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const badges = [
  { icon: Star, text: "Chauffeur confirmé" },
  { icon: Check, text: "Tarif fixe FCFA" },
  { icon: Calendar, text: "Réservation 1 an" },
  { icon: Plane, text: "Suivi vol AIBD" },
  { icon: Shield, text: "Paiement sécurisé" },
  { icon: MapPinned, text: "Tout le Sénégal" },
];

export function Hero({ className }: { className?: string }) {
  const router = useRouter();
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (departure) params.set("from", departure);
    if (arrival) params.set("to", arrival);
    if (date) params.set("date", date);
    if (time) params.set("time", time);
    router.push(`/reservation?${params.toString()}`);
  };

  return (
    <section className={cn("relative min-h-screen overflow-hidden bg-brand-dark", className)}>
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(135deg, #0A0920 0%, #110E40 50%, #1a1650 100%)",
          }}
        />
        <Image
          src="/cars/header-hero/scod-vtc-hero.jpg"
          alt="Chauffeur VTC SCOD au volant"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[60%_25%] opacity-50"
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,9,32,0.95) 0%, rgba(10,9,32,0.80) 40%, rgba(10,9,32,0.45) 75%, rgba(10,9,32,0.30) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex min-h-screen flex-col justify-center gap-8 py-24 lg:flex-row lg:items-center lg:gap-16">
          
          {/* Left: Text */}
          <div className="flex-1 space-y-6">
            {/* Eyebrow */}
            <motion.div variants={fadeUp(0.1)} initial="hidden" animate="visible">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-label text-accent/80">
                  VTC Premium · Dakar
                </span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp(0.15)}
              initial="hidden"
              animate="visible"
              className="text-hero-inverse text-balance"
            >
              <span>Réservez votre VTC</span>
              <br />
              <span className="text-accent">partout au Sénégal</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp(0.2)}
              initial="hidden"
              animate="visible"
              className="text-body-lg-inverse max-w-md"
            >
              Transfert aéroport, trajets pro, événements —{" "}
              <span className="text-white">tarif fixe garanti</span>, chauffeur confirmé instantanément.
            </motion.p>

            {/* Badges */}
            <motion.div
              variants={fadeUp(0.25)}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-2"
            >
              {badges.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  <span className="text-sm-inverse">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Form Card */}
          <motion.div
            variants={fadeUp(0.3)}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md lg:w-[420px]"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl shadow-2xl">
              <h2 className="text-h2-inverse mb-5">
                Où allez-vous ?
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Departure */}
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-accent" />
                  <input
                    type="text"
                    placeholder="Adresse de départ"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className={cn(
                      "h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4",
                      "text-[15px] text-white placeholder:text-white/40",
                      "outline-none transition-all duration-200",
                      "focus:border-accent focus:bg-white/10 focus:ring-2 focus:ring-accent/20"
                    )}
                  />
                </div>

                {/* Arrival */}
                <div className="relative">
                  <Circle className="absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    placeholder="Adresse d'arrivée"
                    value={arrival}
                    onChange={(e) => setArrival(e.target.value)}
                    className={cn(
                      "h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4",
                      "text-[15px] text-white placeholder:text-white/40",
                      "outline-none transition-all duration-200",
                      "focus:border-accent focus:bg-white/10 focus:ring-2 focus:ring-accent/20"
                    )}
                  />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-white/40 pointer-events-none z-10" />
                    <select
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={cn(
                        "h-12 w-full appearance-none rounded-xl border border-white/10 bg-white/5 pl-10 pr-4",
                        "text-[15px] text-white cursor-pointer",
                        "outline-none transition-all duration-200",
                        "focus:border-accent focus:bg-white/10 focus:ring-2 focus:ring-accent/20",
                        "[&>option]:bg-brand [&>option]:text-white",
                        !date && "text-white/40"
                      )}
                    >
                      <option value="" disabled>Date</option>
                      <option value="today">Aujourd&apos;hui</option>
                      <option value="tomorrow">Demain</option>
                      {Array.from({ length: 14 }, (_, i) => {
                        const d = new Date();
                        d.setDate(d.getDate() + i + 2);
                        return (
                          <option key={i} value={d.toISOString().split("T")[0]}>
                            {d.toLocaleDateString("fr-SN", { day: "numeric", month: "short" })}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className={cn(
                      "h-12 w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4",
                      "text-[15px] text-white cursor-pointer",
                      "outline-none transition-all duration-200",
                      "focus:border-accent focus:bg-white/10 focus:ring-2 focus:ring-accent/20",
                      "[&>option]:bg-brand [&>option]:text-white",
                      !time && "text-white/40"
                    )}
                  >
                    <option value="" disabled>Heure</option>
                    {Array.from({ length: 48 }, (_, i) => {
                      const h = Math.floor(i / 2).toString().padStart(2, "0");
                      const m = i % 2 === 0 ? "00" : "30";
                      return (
                        <option key={i} value={`${h}:${m}`}>
                          {h}:{m}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* CTA */}
                <button
                  type="submit"
                  className={cn(
                    "group flex h-[52px] w-full items-center justify-center gap-2 rounded-xl",
                    "bg-accent text-cta text-brand uppercase",
                    "shadow-lg shadow-accent/25",
                    "transition-all duration-200",
                    "hover:bg-accent-light hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                  )}
                >
                  <span>Consulter les prix</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>

              {/* Trust line */}
              <p className="mt-4 text-center text-sm-inverse">
                Gratuit · Sans engagement · Réponse immédiate
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-white/20 pt-1.5"
        >
          <div className="h-1.5 w-1 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
