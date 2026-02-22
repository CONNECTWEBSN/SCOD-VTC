"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import {
  Users, Briefcase, Star, ArrowRight, Zap, X,
  Wifi, Droplets, BatteryCharging, Thermometer, Music, ShieldCheck,
  ChevronDown, Info, Plane, Moon, MapPin,
  CheckCircle2, XCircle, AlertCircle, CreditCard, Clock, Timer,
} from "lucide-react";
import { cn } from "@/lib/cn";

interface Driver {
  name: string;
  initials: string;
  rating: number;
  trips: number;
  experience: string;
  languages: string[];
  available: boolean;
}

interface Vehicle {
  id: string;
  name: string;
  type: string;
  category: string;
  passengers: number;
  luggage: number;
  fuel: string;
  priceFrom: number;
  rating: number;
  image: string;
  tag?: string;
  tagColor?: string;
  isPopular?: boolean;
  color: string;
  driver: Driver;
  features: string[];
}

const vehicles: Vehicle[] = [
  {
    id: "1",
    name: "Citroën C-Elysée",
    type: "Berline Confort",
    category: "berline",
    passengers: 4,
    luggage: 3,
    fuel: "Essence",
    priceFrom: 25000,
    rating: 4.7,
    image: "/cars/Voitures/car-1.png",
    color: "#c0c9d4",
    driver: { name: "Ousmane Sy", initials: "OS", rating: 4.7, trips: 395, experience: "2 ans", languages: ["Français", "Wolof"], available: true },
    features: ["Climatisation auto", "Eau fraîche", "Chargeur USB-C", "Sièges confort", "Coffre spacieux", "Vitres teintées"],
  },
  {
    id: "2",
    name: "Peugeot 508",
    type: "Berline",
    category: "berline",
    passengers: 4,
    luggage: 3,
    fuel: "Diesel",
    priceFrom: 35000,
    rating: 4.8,
    image: "/cars/Voitures/car-9.png",
    color: "#c0c9d4",
    driver: { name: "Moussa Diop", initials: "MD", rating: 4.8, trips: 620, experience: "4 ans", languages: ["Français", "Wolof", "Anglais"], available: true },
    features: ["Climatisation bi-zone", "WiFi 4G", "Eau fraîche", "Chargeur USB-C", "Sièges cuir", "Vitres teintées"],
  },
  {
    id: "3",
    name: "Mercedes CLA",
    type: "Berline Premium",
    category: "berline",
    passengers: 4,
    luggage: 2,
    fuel: "Essence",
    priceFrom: 45000,
    rating: 4.9,
    isPopular: true,
    image: "/cars/Voitures/car-4.png",
    color: "#c0c9d4",
    driver: { name: "Amadou Fall", initials: "AF", rating: 4.9, trips: 847, experience: "5 ans", languages: ["Français", "Wolof", "Anglais"], available: true },
    features: ["Climatisation bi-zone", "WiFi 4G", "Eau fraîche", "Chargeur USB-C", "Sièges cuir", "Son premium"],
  },
  {
    id: "4",
    name: "Audi A7",
    type: "Berline Premium",
    category: "berline",
    passengers: 4,
    luggage: 3,
    fuel: "Essence",
    priceFrom: 50000,
    rating: 4.9,
    image: "/cars/Voitures/car-3.png",
    color: "#b8c8d4",
    driver: { name: "Ibrahima Ndiaye", initials: "IN", rating: 4.9, trips: 512, experience: "4 ans", languages: ["Français", "Wolof", "Anglais"], available: true },
    features: ["Climatisation bi-zone", "WiFi 4G", "Eau fraîche", "Chargeur USB-C", "Sièges cuir", "Vitres teintées"],
  },
  {
    id: "5",
    name: "Peugeot 3008",
    type: "SUV",
    category: "suv",
    passengers: 5,
    luggage: 4,
    fuel: "Diesel",
    priceFrom: 40000,
    rating: 4.8,
    tag: "Famille",
    tagColor: "blue",
    image: "/cars/Voitures/car-8.png",
    color: "#c4c0d4",
    driver: { name: "Cheikh Mbaye", initials: "CM", rating: 4.8, trips: 389, experience: "3 ans", languages: ["Français", "Wolof"], available: true },
    features: ["Climatisation auto", "WiFi 4G", "Eau fraîche", "Chargeur USB-C", "Caméra 360°", "Coffre modulable"],
  },
  {
    id: "6",
    name: "Tesla Model X",
    type: "SUV Électrique",
    category: "suv",
    passengers: 6,
    luggage: 4,
    fuel: "Électrique",
    priceFrom: 55000,
    rating: 4.9,
    tag: "Éco",
    tagColor: "emerald",
    image: "/cars/Voitures/car-5.png",
    color: "#b8c8d4",
    driver: { name: "Ibrahima Ndiaye", initials: "IN", rating: 4.9, trips: 512, experience: "4 ans", languages: ["Français", "Wolof", "Anglais"], available: true },
    features: ["Portes falcon", "WiFi 4G", "Eau fraîche", "Chargeur USB-C", "7 places", "Zéro émission"],
  },
  {
    id: "7",
    name: "Tesla Model 3",
    type: "Berline Électrique",
    category: "electrique",
    passengers: 4,
    luggage: 2,
    fuel: "Électrique",
    priceFrom: 40000,
    rating: 4.9,
    tag: "Éco",
    tagColor: "emerald",
    image: "/cars/Voitures/car-7.png",
    color: "#b8d4c0",
    driver: { name: "Amadou Fall", initials: "AF", rating: 5.0, trips: 632, experience: "3 ans", languages: ["Français", "Wolof"], available: true },
    features: ["Autopilot", "WiFi 4G", "Eau fraîche", "Chargeur USB-C", "Écran tactile", "Zéro émission"],
  },
  {
    id: "8",
    name: "Tesla Model S",
    type: "Berline Électrique",
    category: "electrique",
    passengers: 4,
    luggage: 3,
    fuel: "Électrique",
    priceFrom: 50000,
    rating: 5.0,
    isPopular: true,
    tag: "Éco",
    tagColor: "emerald",
    image: "/cars/Voitures/car-6.png",
    color: "#b8d4c0",
    driver: { name: "Amadou Fall", initials: "AF", rating: 5.0, trips: 632, experience: "3 ans", languages: ["Français", "Wolof"], available: true },
    features: ["Autopilot", "WiFi 4G", "Eau fraîche", "Chargeur USB-C", "Écran tactile", "Zéro émission"],
  },
  {
    id: "9",
    name: "Mercedes Classe S",
    type: "Berline Luxe",
    category: "vip",
    passengers: 4,
    luggage: 3,
    fuel: "Hybride",
    priceFrom: 75000,
    rating: 5.0,
    tag: "VIP",
    tagColor: "amber",
    image: "/cars/Voitures/car-2.png",
    color: "#d4cdb8",
    driver: { name: "Abdoulaye Sarr", initials: "AS", rating: 5.0, trips: 1203, experience: "8 ans", languages: ["Français", "Wolof", "Anglais", "Arabe"], available: true },
    features: ["Massage sièges", "WiFi 5G", "Champagne offert", "Chargeur sans fil", "Son Burmester", "Vitres intimité"],
  },
];

type RuleRow = {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
};

const rules: {
  id: string;
  title: string;
  rows: RuleRow[];
}[] = [
  {
    id: "cancel",
    title: "Annulation gratuite",
    rows: [
      { icon: <CheckCircle2 className="h-4 w-4 shrink-0" />, label: "Plus de 24h avant le départ", value: "Gratuit", accent: true },
      { icon: <AlertCircle className="h-4 w-4 shrink-0" />, label: "Entre 24h et 2h avant", value: "50% du montant" },
      { icon: <XCircle className="h-4 w-4 shrink-0" />, label: "Moins de 2h avant", value: "100% du montant" },
    ],
  },
  {
    id: "deposit",
    title: "Acompte 30%",
    rows: [
      { icon: <CreditCard className="h-4 w-4 shrink-0" />, label: "Acompte à la réservation", value: "30% du total" },
      { icon: <CheckCircle2 className="h-4 w-4 shrink-0" />, label: "Solde en fin de course", value: "70% du total", accent: true },
      { icon: <ShieldCheck className="h-4 w-4 shrink-0" />, label: "Paiement sécurisé", value: "OM · Wave · CB" },
    ],
  },
  {
    id: "wait",
    title: "Attente incluse",
    rows: [
      { icon: <Clock className="h-4 w-4 shrink-0" />, label: "Transfert aéroport — offert", value: "15 min", accent: true },
      { icon: <Timer className="h-4 w-4 shrink-0" />, label: "Au-delà des 15 min", value: "+1 000 FCFA / 15 min" },
      { icon: <Clock className="h-4 w-4 shrink-0" />, label: "Autres trajets — offert", value: "5 min" },
    ],
  },
  {
    id: "supplements",
    title: "Suppléments",
    rows: [
      { icon: <Plane className="h-4 w-4 shrink-0" />, label: "Transfert AIBD", value: "+2 000 FCFA" },
      { icon: <Moon className="h-4 w-4 shrink-0" />, label: "Course de nuit (22h–6h)", value: "+5 000 FCFA" },
      { icon: <MapPin className="h-4 w-4 shrink-0" />, label: "Zone hors Dakar (>50 km)", value: "+10 000 FCFA" },
    ],
  },
];

const featureIcons: Record<string, React.ReactNode> = {
  "Climatisation bi-zone": <Thermometer className="h-4 w-4" />,
  "Climatisation auto": <Thermometer className="h-4 w-4" />,
  "Climatisation": <Thermometer className="h-4 w-4" />,
  "WiFi 4G": <Wifi className="h-4 w-4" />,
  "WiFi 5G": <Wifi className="h-4 w-4" />,
  "Eau fraîche": <Droplets className="h-4 w-4" />,
  "Champagne offert": <Droplets className="h-4 w-4" />,
  "Chargeur USB-C": <BatteryCharging className="h-4 w-4" />,
  "Chargeur sans fil": <BatteryCharging className="h-4 w-4" />,
  "Son Burmester": <Music className="h-4 w-4" />,
  "Zéro émission": <ShieldCheck className="h-4 w-4" />,
};

const categories = [
  { id: "tous", label: "Tous" },
  { id: "berline", label: "Berline" },
  { id: "suv", label: "SUV" },
  { id: "electrique", label: "Électrique" },
  { id: "vip", label: "VIP" },
];

const tagColorMap: Record<string, string> = {
  emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  sky: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

function VehicleDetailModal({ vehicle, open, onOpenChange }: { vehicle: Vehicle; open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-dark/70 backdrop-blur-sm"
          />
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-[560px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-brand shadow-2xl sm:w-full"
          >
            <div className="max-h-[85vh] overflow-y-auto scrollbar-hide">
              {/* Header */}
              <div className="relative border-b border-white/10 px-6 pb-5 pt-6">
                <Dialog.Close className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white">
                  <X className="h-5 w-5" />
                </Dialog.Close>

                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="text-h2-inverse">
                        {vehicle.name}
                      </h3>
                      {vehicle.tag && (
                        <span className={cn("rounded-full border px-2.5 py-0.5 text-label", tagColorMap[vehicle.tagColor!])}>
                          {vehicle.tag}
                        </span>
                      )}
                    </div>
                    <span className="text-sm-inverse">{vehicle.type} · {vehicle.fuel}</span>
                  </div>
                </div>

                {/* Car image */}
                <div className="relative mt-4 flex items-center justify-center rounded-xl bg-white/[0.04] py-8">
                  <div className="relative h-[160px] w-[80%]">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      sizes="480px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 divide-x divide-white/10 border-b border-white/10">
                {[
                  { label: "Passagers", value: `${vehicle.passengers}` },
                  { label: "Bagages", value: `${vehicle.luggage}` },
                  { label: "Note", value: `${vehicle.rating}` },
                  { label: "Prix min", value: `${(vehicle.priceFrom / 1000).toFixed(0)}k` },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center gap-1 py-4">
                    <span className="text-accent" style={{ fontSize: "var(--text-body-lg)", fontWeight: "var(--weight-bold)" }}>{stat.value}</span>
                    <span className="text-label-inverse">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Driver section */}
              <div className="border-b border-white/10 px-6 py-5">
                <h4 className="text-label-inverse mb-4">
                  Votre chauffeur
                </h4>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-accent/10 text-accent" style={{ fontSize: "var(--text-body)", fontWeight: "var(--weight-bold)" }}>
                    {vehicle.driver.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-body-inverse" style={{ fontWeight: "var(--weight-semibold)", color: "var(--color-text-inverse)" }}>{vehicle.driver.name}</span>
                      {vehicle.driver.available && (
                        <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-label text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Disponible
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-sm-inverse">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        {vehicle.driver.rating}
                      </span>
                      <span>{vehicle.driver.trips} trajets</span>
                      <span>{vehicle.driver.experience}</span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {vehicle.driver.languages.map((lang) => (
                        <span key={lang} className="rounded-full bg-white/5 px-2 py-0.5 text-label text-white/45">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Equipment */}
              <div className="border-b border-white/10 px-6 py-5">
                <h4 className="text-label-inverse mb-4">
                  Équipements
                </h4>
                <div className="space-y-0">
                  {vehicle.features.map((feat, i) => (
                    <div
                      key={feat}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-white/[0.03]",
                        i > 0 && "border-t border-white/5"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-accent/70">
                          {featureIcons[feat] || <ShieldCheck className="h-4 w-4" />}
                        </span>
                        <span className="text-body-inverse" style={{ fontWeight: "var(--weight-medium)" }}>{feat}</span>
                      </div>
                      <span className="text-accent/60" style={{ fontSize: "var(--text-label)", fontWeight: "var(--weight-semibold)" }}>✓</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules accordion */}
              <div className="border-b border-white/10 px-6 py-5">
                <h4 className="text-label-inverse mb-4">
                  Conditions
                </h4>
                <Accordion.Root type="single" collapsible className="space-y-2">
                  {rules.map((rule) => (
                    <Accordion.Item key={rule.id} value={rule.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                      <Accordion.Header>
                        <Accordion.Trigger className="group flex w-full items-center justify-between px-4 py-3 text-left">
                          <div className="flex items-center gap-2.5">
                            <Info className="h-3.5 w-3.5 text-accent" />
                            <span className="text-body-inverse" style={{ fontWeight: "var(--weight-semibold)" }}>{rule.title}</span>
                          </div>
                          <ChevronDown className="h-4 w-4 text-white/30 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                        <div className="border-t border-white/5">
                          {rule.rows.map((row, i) => (
                            <div
                              key={row.label}
                              className={cn(
                                "flex items-center justify-between px-4 py-3",
                                i > 0 && "border-t border-white/5"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-accent/70">{row.icon}</span>
                                <span className="text-body-inverse" style={{ fontWeight: "var(--weight-medium)" }}>
                                  {row.label}
                                </span>
                              </div>
                              <span className="text-accent" style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-bold)" }}>
                                {row.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              </div>

              {/* Footer CTA */}
              <div className="sticky bottom-0 flex items-center justify-between bg-brand/95 px-6 py-4 backdrop-blur-md">
                <div>
                  <span className="text-label-inverse block">
                    À partir de
                  </span>
                  <span className="text-accent" style={{ fontSize: "var(--text-h2)", fontWeight: "var(--weight-bold)" }}>
                    {vehicle.priceFrom.toLocaleString("fr-FR")}
                    <span className="text-sm-inverse ml-1">FCFA</span>
                  </span>
                </div>
                <Link
                  href="/reservation"
                  onClick={() => onOpenChange(false)}
                  className="text-cta flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-brand uppercase shadow-lg shadow-accent/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-light hover:shadow-xl hover:shadow-accent/35"
                >
                  Réserver maintenant
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function VehicleCard({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        className="group relative"
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border transition-all duration-300",
            "hover:-translate-y-1.5 hover:shadow-2xl",
            vehicle.isPopular
              ? "border-accent/30 bg-white/[0.07] hover:border-accent/50 hover:shadow-accent/10"
              : "border-white/[0.08] bg-white/[0.04] hover:border-white/15 hover:shadow-brand/50"
          )}
        >
          {vehicle.isPopular && (
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-20"
              style={{ boxShadow: "inset 0 0 40px rgba(255,195,0,0.15)" }}
            />
          )}

          <div className="p-5">
            {/* Header row */}
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-h3-inverse">
                  {vehicle.name}
                </h3>
                <span className="text-sm-inverse">{vehicle.type}</span>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                {vehicle.tag && (
                  <span className={cn("rounded-full border px-2.5 py-0.5 text-label", tagColorMap[vehicle.tagColor!])}>
                    {vehicle.tag}
                  </span>
                )}
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  <span className="text-sm-inverse" style={{ fontWeight: "var(--weight-semibold)" }}>{vehicle.rating}</span>
                </div>
              </div>
            </div>

            {/* Car image */}
            <div className="relative mb-4 flex items-center justify-center rounded-xl bg-white/[0.03] py-6">
              <div className="relative h-[140px] w-[85%]">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 28vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1"
                />
              </div>
            </div>

            {/* Specs */}
            <div className="mb-5 flex items-center gap-4 text-sm-inverse">
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                <span>{vehicle.passengers} pax</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5" />
                <span>{vehicle.luggage} bag</span>
              </div>
              {vehicle.fuel === "Électrique" && (
                <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400">
                  <Zap className="h-3 w-3" />
                  <span style={{ fontSize: "var(--text-label)" }}>Électrique</span>
                </div>
              )}
            </div>

            {/* Price + Actions */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-label-inverse block">
                  À partir de
                </span>
                <span className="text-accent" style={{ fontSize: "var(--text-h3)", fontWeight: "var(--weight-bold)" }}>
                  {vehicle.priceFrom.toLocaleString("fr-FR")}
                  <span className="text-sm-inverse ml-1">FCFA</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDetailOpen(true)}
                  className="rounded-xl border border-white/15 px-4 py-2.5 text-sm-inverse transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
                  style={{ fontWeight: "var(--weight-semibold)" }}
                >
                  Détails
                </button>
                <Link
                  href="/reservation"
                  className={cn(
                    "flex items-center gap-1.5 rounded-xl px-4 py-2.5",
                    "text-sm transition-all duration-200",
                    vehicle.isPopular
                      ? "bg-accent text-brand hover:bg-accent-light hover:shadow-lg hover:shadow-accent/30"
                      : "bg-white/10 text-white hover:bg-accent hover:text-brand"
                  )}
                  style={{ fontWeight: "var(--weight-semibold)" }}
                >
                  Réserver
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <VehicleDetailModal vehicle={vehicle} open={detailOpen} onOpenChange={setDetailOpen} />
    </>
  );
}

export function FleetSection({ className }: { className?: string }) {
  const [activeCategory, setActiveCategory] = useState("tous");

  const filtered =
    activeCategory === "tous"
      ? vehicles
      : vehicles.filter((v) => v.category === activeCategory);

  return (
    <section
      className={cn("relative overflow-hidden py-24 lg:py-32", className)}
      style={{ background: "linear-gradient(180deg, #0A0920 0%, #110E40 50%, #0A0920 100%)" }}
    >
      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Subtle center glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #FFC300, transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="text-label text-accent mb-3 inline-block">
              Notre flotte
            </span>
            <h2 className="text-h1-inverse text-balance">
              Découvrez nos véhicules
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-all duration-200",
                  activeCategory === cat.id
                    ? "bg-accent text-brand shadow-lg shadow-accent/25"
                    : "border border-white/15 text-white/60 hover:border-white/30 hover:text-white"
                )}
                style={{ fontWeight: "var(--weight-semibold)" }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((vehicle, i) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-3 text-center"
        >
          <p className="text-sm-inverse">
            Besoin d'un véhicule spécifique ou d'une flotte pour votre entreprise ?
          </p>
          <Link
            href="/assistance"
            className="text-accent hover:underline underline-offset-4"
            style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-semibold)" }}
          >
            Nous contacter →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
