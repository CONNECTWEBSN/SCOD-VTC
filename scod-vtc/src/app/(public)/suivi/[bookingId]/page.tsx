"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence, useDragControls, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Phone, MessageSquare, Star,
  Car, MapPin, CheckCircle2, Navigation, Clock,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────── */

type TrackingStatus = "heading_to_you" | "arrived" | "in_ride" | "done";

interface BookingData {
  id:          string;
  from:        string;
  to:          string;
  driver: {
    name:      string;
    initials:  string;
    rating:    number;
    phone:     string;
    vehicle:   string;
    plate:     string;
  };
  status:      TrackingStatus;
  eta:         number; // minutes
  hasRealtime: boolean;
}

/* ─────────────────────────────────────────────────────────
   Mock booking data
───────────────────────────────────────────────────────── */

const MOCK_BOOKING: BookingData = {
  id:      "BK-001",
  from:    "Hôtel Terrou-Bi, Dakar",
  to:      "Aéroport AIBD, Diass",
  driver: {
    name:     "Seydou Diallo",
    initials: "SD",
    rating:   4.9,
    phone:    "+221771234567",
    vehicle:  "BMW Série 5",
    plate:    "DK-1234-AA",
  },
  status:      "heading_to_you",
  eta:         8,
  hasRealtime: false,
};

/* ─────────────────────────────────────────────────────────
   Status config
───────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<TrackingStatus, {
  label:    string;
  sublabel: string;
  color:    string;
  step:     number;
}> = {
  heading_to_you: {
    label:    "En route vers vous",
    sublabel: "Votre chauffeur arrive",
    color:    "text-blue-500",
    step:     1,
  },
  arrived: {
    label:    "Votre chauffeur est arrivé",
    sublabel: "Rejoignez votre véhicule",
    color:    "text-accent",
    step:     2,
  },
  in_ride: {
    label:    "En course",
    sublabel: "Vers votre destination",
    color:    "text-green-500",
    step:     3,
  },
  done: {
    label:    "Course terminée",
    sublabel: "Merci d'avoir choisi SCOD VTC",
    color:    "text-grey-600",
    step:     4,
  },
};

const PROGRESS_STEPS = [
  { label: "Confirmée",   icon: CheckCircle2 },
  { label: "En approche", icon: Car          },
  { label: "À bord",      icon: Navigation   },
  { label: "Arrivée",     icon: MapPin       },
];

/* ─────────────────────────────────────────────────────────
   Animated car SVG marker (standalone)
───────────────────────────────────────────────────────── */

function AnimatedCarMarker({ angle = 0 }: { angle?: number }) {
  return (
    <motion.div
      animate={{ rotate: angle }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className="relative"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand shadow-2xl shadow-brand/40 ring-4 ring-white">
        <Car className="h-6 w-6 text-white" />
      </div>
      {/* pulse ring */}
      <motion.div
        animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 rounded-full bg-brand/30"
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Google Maps placeholder (renders map via JS API)
───────────────────────────────────────────────────────── */

function MapView({ status }: { status: TrackingStatus }) {
  const mapRef = useRef<HTMLDivElement>(null);

  // In production this would use @googlemaps/js-api-loader + Supabase Realtime.
  // We render a styled static fallback with the animated marker overlaid.
  const isDark  = true;
  const isDone  = status === "done";

  return (
    <div ref={mapRef} className="relative h-full w-full overflow-hidden bg-[#1a2235]">
      {/* Simulated map tiles */}
      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {/* Road grid */}
        <line x1="0" y1="200" x2="800" y2="220" stroke="#2a3a55" strokeWidth="18" />
        <line x1="0" y1="380" x2="800" y2="360" stroke="#2a3a55" strokeWidth="24" />
        <line x1="200" y1="0" x2="220" y2="600" stroke="#2a3a55" strokeWidth="16" />
        <line x1="580" y1="0" x2="560" y2="600" stroke="#2a3a55" strokeWidth="20" />
        <line x1="0" y1="500" x2="800" y2="480" stroke="#2a3a55" strokeWidth="12" />
        <line x1="100" y1="0" x2="110" y2="600" stroke="#243045" strokeWidth="8" />
        <line x1="400" y1="0" x2="400" y2="600" stroke="#243045" strokeWidth="10" />
        {/* Roundabout */}
        <circle cx="400" cy="370" r="40" stroke="#2a3a55" strokeWidth="16" fill="none" />
        {/* Blocks */}
        <rect x="240" y="240" width="120" height="80" rx="4" fill="#1e2d44" />
        <rect x="430" y="240" width="100" height="100" rx="4" fill="#1e2d44" />
        <rect x="60"  y="300" width="80"  height="50"  rx="4" fill="#1e2d44" />
        <rect x="620" y="300" width="100" height="80"  rx="4" fill="#1e2d44" />
        <rect x="240" y="430" width="80"  height="40"  rx="4" fill="#1e2d44" />
      </svg>

      {/* Route polyline — planned */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <path
          d="M180 150 Q300 200 390 370 Q460 490 640 520"
          stroke="#FFC300"
          strokeWidth="4"
          strokeDasharray="8 4"
          fill="none"
          opacity="0.7"
        />
        {/* Travelled */}
        <path
          d="M180 150 Q250 190 310 270"
          stroke="#22c55e"
          strokeWidth="5"
          fill="none"
          opacity="0.9"
        />
      </svg>

      {/* Start pin */}
      <div className="absolute" style={{ left: "22%", top: "22%" }}>
        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/40">
            <MapPin className="h-4 w-4 text-brand" />
          </div>
          <div className="mt-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-grey-900 shadow backdrop-blur-sm">
            Départ
          </div>
        </div>
      </div>

      {/* End pin */}
      <div className="absolute" style={{ left: "78%", top: "82%" }}>
        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand shadow-lg shadow-brand/40">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div className="mt-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-grey-900 shadow backdrop-blur-sm">
            AIBD
          </div>
        </div>
      </div>

      {/* Animated driver marker */}
      {!isDone && (
        <motion.div
          className="absolute"
          style={{ left: "38%", top: "43%" }}
          animate={{ x: [0, 6, -3, 4, 0], y: [0, -4, 3, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <AnimatedCarMarker angle={35} />
        </motion.div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Bottom panel
───────────────────────────────────────────────────────── */

function BottomPanel({
  booking,
  expanded,
  onToggle,
}: {
  booking:  BookingData;
  expanded: boolean;
  onToggle: () => void;
}) {
  const cfg    = STATUS_CONFIG[booking.status];
  const isDone = booking.status === "done";

  /* ETA countdown */
  const [eta, setEta] = useState(booking.eta);
  useEffect(() => {
    if (isDone || booking.status === "arrived") return;
    const t = setInterval(() => setEta((e) => Math.max(0, e - 1)), 60_000);
    return () => clearInterval(t);
  }, [isDone, booking.status]);

  return (
    <motion.div
      layout
      animate={{ height: expanded ? "auto" : "auto" }}
      className="relative z-20 rounded-t-3xl bg-white shadow-[0_-4px_30px_rgba(0,0,0,0.18)]"
    >
      {/* Drag handle */}
      <button
        onClick={onToggle}
        className="flex w-full flex-col items-center gap-1 pb-1 pt-3"
        aria-label={expanded ? "Réduire" : "Agrandir"}
      >
        <div className="h-1 w-10 rounded-full bg-grey-300" />
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronUp className="h-4 w-4 text-grey-300" />
        </motion.div>
      </button>

      <div className="px-5 pb-8 pt-1">
        {/* Status + ETA */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={booking.status === "arrived" ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.6, repeat: booking.status === "arrived" ? Infinity : 0 }}
                className={cn("font-display text-[20px] font-bold", cfg.color)}
              >
                {cfg.label}
              </motion.div>
            </div>
            <p className="mt-0.5 text-[13px] text-grey-500">{cfg.sublabel}</p>
          </div>

          {!isDone && booking.status !== "arrived" && (
            <div className="flex shrink-0 flex-col items-end">
              <div className="flex items-center gap-1.5 rounded-2xl bg-accent/10 px-3 py-1.5">
                <Clock className="h-4 w-4 text-accent" />
                <span className="font-display text-[20px] font-bold text-accent leading-none">
                  {eta}
                </span>
                <span className="text-[12px] font-semibold text-accent">min</span>
              </div>
              <p className="mt-1 text-[11px] text-grey-400">ETA estimé</p>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between">
            {PROGRESS_STEPS.map((s, i) => {
              const done   = i < cfg.step;
              const active = i === cfg.step - 1;
              const Icon   = s.icon;
              return (
                <div key={s.label} className="flex flex-1 flex-col items-center gap-1">
                  <div className="relative flex w-full items-center">
                    {i > 0 && (
                      <div className={cn("h-0.5 flex-1 transition-colors duration-500", done ? "bg-accent" : "bg-grey-200")} />
                    )}
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                        active
                          ? "border-accent bg-accent shadow-lg shadow-accent/25"
                          : done
                          ? "border-accent bg-accent"
                          : "border-grey-200 bg-white"
                      )}
                    >
                      <Icon className={cn("h-3.5 w-3.5", (active || done) ? "text-brand" : "text-grey-300")} />
                    </div>
                    {i < PROGRESS_STEPS.length - 1 && (
                      <div className={cn("h-0.5 flex-1 transition-colors duration-500", done && i < cfg.step - 1 ? "bg-accent" : "bg-grey-200")} />
                    )}
                  </div>
                  <span className={cn("text-[10px] font-semibold", active ? "text-accent" : done ? "text-grey-600" : "text-grey-400")}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="mb-4 h-px bg-grey-100" />

        {/* Driver card */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-hover font-display text-[18px] font-bold text-white shadow-lg">
            {booking.driver.initials}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-grey-900">{booking.driver.name}</p>
              <span className="flex items-center gap-0.5 text-[12px] font-semibold text-amber-500">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {booking.driver.rating}
              </span>
            </div>
            <p className="truncate text-[13px] text-grey-500">
              {booking.driver.vehicle}
            </p>
            <p className="text-[12px] font-bold tracking-widest text-grey-400">
              {booking.driver.plate}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex shrink-0 gap-2">
            <a
              href={`tel:${booking.driver.phone}`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 shadow-md shadow-green-500/25 transition-colors hover:bg-green-600"
              aria-label="Appeler le chauffeur"
            >
              <Phone className="h-5 w-5 text-white" />
            </a>
            <a
              href={`sms:${booking.driver.phone}`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand shadow-md shadow-brand/25 transition-colors hover:bg-brand-hover"
              aria-label="SMS au chauffeur"
            >
              <MessageSquare className="h-5 w-5 text-white" />
            </a>
          </div>
        </div>

        {/* Trip detail (expanded) */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-5 space-y-3 rounded-2xl bg-grey-50 p-4">
                <h4 className="text-[12px] font-bold uppercase tracking-wider text-grey-500">Détail du trajet</h4>
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className="h-3 w-3 rounded-full border-2 border-accent bg-accent" />
                    <div className="w-px flex-1 bg-grey-200" style={{ minHeight: 20 }} />
                    <div className="h-3 w-3 rounded-full border-2 border-brand bg-brand" />
                  </div>
                  <div className="space-y-3">
                    <p className="text-[14px] font-semibold text-grey-900">{booking.from}</p>
                    <p className="text-[14px] text-grey-600">{booking.to}</p>
                  </div>
                </div>
              </div>

              {/* Done state: rating */}
              {isDone && (
                <div className="mt-4 rounded-2xl border-2 border-accent/20 bg-accent/5 p-4 text-center">
                  <p className="mb-3 font-display text-[16px] font-bold text-grey-900">
                    Comment s&apos;est passée votre course ?
                  </p>
                  <div className="mb-3 flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} className="transition-transform hover:scale-110">
                        <Star className="h-8 w-8 fill-accent text-accent" />
                      </button>
                    ))}
                  </div>
                  <button className="h-11 w-full rounded-xl bg-accent font-bold text-[14px] text-brand shadow-lg shadow-accent/20 transition-colors hover:bg-accent-light">
                    Soumettre mon avis
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Realtime fallback banner
───────────────────────────────────────────────────────── */

function RealtimeBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mt-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3"
    >
      <p className="text-[12.5px] leading-relaxed text-amber-800">
        <span className="font-bold">⏳ Suivi en attente :</span> Le suivi en temps réel sera
        disponible quand votre chauffeur sera en route. Vous recevrez une notification SMS.
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Status cycle demo (dev helper)
───────────────────────────────────────────────────────── */

const STATUS_CYCLE: TrackingStatus[] = ["heading_to_you", "arrived", "in_ride", "done"];

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */

export default function SuiviPage() {
  const params     = useParams();
  const bookingId  = params.bookingId as string;

  const [booking, setBooking]   = useState<BookingData>({ ...MOCK_BOOKING, id: bookingId });
  const [expanded, setExpanded] = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);

  /* Simulate Supabase Realtime status progression for demo */
  useEffect(() => {
    const t = setInterval(() => {
      setStatusIdx((prev) => {
        const next = Math.min(prev + 1, STATUS_CYCLE.length - 1);
        setBooking((b) => ({ ...b, status: STATUS_CYCLE[next], hasRealtime: true }));
        return next;
      });
    }, 12_000); // advance every 12s for demo
    return () => clearInterval(t);
  }, []);

  /* Vibrate on "arrived" */
  useEffect(() => {
    if (booking.status === "arrived" && "vibrate" in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  }, [booking.status]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#1a2235] lg:flex-row">

      {/* ── Map (full on mobile, 70% on desktop) ─── */}
      <div className="relative flex-1 overflow-hidden lg:h-full">
        <MapView status={booking.status} />

        {/* Top bar overlay */}
        <div className="absolute left-0 right-0 top-0 z-10 px-4 pt-4">
          <div className="flex items-center justify-between rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Link
                href="/mon-compte/reservations"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-grey-100 text-grey-600 transition-colors hover:bg-grey-200"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-grey-500">
                  Course
                </p>
                <p className="font-display text-[15px] font-bold text-grey-900">
                  #{booking.id}
                </p>
              </div>
            </div>

            {booking.status !== "done" && (
              <div className="flex items-center gap-1.5 rounded-xl bg-accent px-3 py-1.5 shadow-md shadow-accent/25">
                <Clock className="h-3.5 w-3.5 text-brand" />
                <span className="font-display text-[14px] font-bold text-brand">
                  {booking.status === "arrived" ? "Arrivé !" : `${booking.eta} min`}
                </span>
              </div>
            )}
          </div>

          {/* Realtime fallback */}
          {!booking.hasRealtime && <RealtimeBanner />}
        </div>

        {/* Demo status cycle pill */}
        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 lg:hidden">
          <button
            onClick={() => {
              const next = (statusIdx + 1) % STATUS_CYCLE.length;
              setStatusIdx(next);
              setBooking((b) => ({ ...b, status: STATUS_CYCLE[next], hasRealtime: true }));
            }}
            className="rounded-full bg-white/20 px-4 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm"
          >
            Simuler étape suivante ↓
          </button>
        </div>
      </div>

      {/* ── Bottom panel (mobile) / Right panel (desktop) ── */}
      <div className="z-20 lg:flex lg:h-full lg:w-[380px] lg:shrink-0 lg:flex-col lg:overflow-y-auto lg:bg-white lg:shadow-2xl">

        {/* Desktop: always expanded */}
        <div className="hidden lg:block">
          {/* Booking header */}
          <div className="border-b border-grey-100 px-6 py-5">
            <div className="mb-1 flex items-center gap-2">
              <Link
                href="/mon-compte/reservations"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-grey-100 text-grey-600 hover:bg-grey-200"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-grey-500">Course #{booking.id}</p>
                {!booking.hasRealtime && (
                  <p className="text-[11px] text-amber-600">⏳ Suivi en attente de départ</p>
                )}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="border-b border-grey-100 px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("font-display text-[20px] font-bold", STATUS_CONFIG[booking.status].color)}>
                  {STATUS_CONFIG[booking.status].label}
                </p>
                <p className="text-[13px] text-grey-500">{STATUS_CONFIG[booking.status].sublabel}</p>
              </div>
              {booking.status !== "done" && booking.status !== "arrived" && (
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 rounded-xl bg-accent/10 px-3 py-2">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className="font-display text-[22px] font-bold text-accent leading-none">{booking.eta}</span>
                    <span className="text-[12px] font-semibold text-accent">min</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="border-b border-grey-100 px-6 py-5">
            <div className="flex items-center justify-between">
              {PROGRESS_STEPS.map((s, i) => {
                const done   = i < STATUS_CONFIG[booking.status].step;
                const active = i === STATUS_CONFIG[booking.status].step - 1;
                const Icon   = s.icon;
                return (
                  <div key={s.label} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="relative flex w-full items-center">
                      {i > 0 && (
                        <div className={cn("h-0.5 flex-1", done ? "bg-accent" : "bg-grey-200")} />
                      )}
                      <div className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                        active
                          ? "border-accent bg-accent shadow-lg shadow-accent/25"
                          : done
                          ? "border-accent bg-accent"
                          : "border-grey-200 bg-white"
                      )}>
                        <Icon className={cn("h-4 w-4", (active || done) ? "text-brand" : "text-grey-300")} />
                      </div>
                      {i < PROGRESS_STEPS.length - 1 && (
                        <div className={cn("h-0.5 flex-1", done && i < STATUS_CONFIG[booking.status].step - 1 ? "bg-accent" : "bg-grey-200")} />
                      )}
                    </div>
                    <span className={cn("text-[10px] font-semibold text-center", active ? "text-accent" : done ? "text-grey-600" : "text-grey-400")}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Driver */}
          <div className="border-b border-grey-100 px-6 py-5">
            <h4 className="mb-4 text-[12px] font-bold uppercase tracking-wider text-grey-500">Votre chauffeur</h4>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-hover font-display text-[22px] font-bold text-white shadow-lg">
                {booking.driver.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-grey-900">{booking.driver.name}</p>
                  <span className="flex items-center gap-0.5 text-[12px] font-semibold text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {booking.driver.rating}
                  </span>
                </div>
                <p className="text-[13px] text-grey-500">{booking.driver.vehicle}</p>
                <p className="text-[12px] font-bold tracking-widest text-grey-400">{booking.driver.plate}</p>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${booking.driver.phone}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 shadow-md transition-colors hover:bg-green-600">
                  <Phone className="h-5 w-5 text-white" />
                </a>
                <a href={`sms:${booking.driver.phone}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-brand shadow-md transition-colors hover:bg-brand-hover">
                  <MessageSquare className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Trip route */}
          <div className="px-6 py-5">
            <h4 className="mb-4 text-[12px] font-bold uppercase tracking-wider text-grey-500">Trajet</h4>
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center gap-1 pt-1">
                <div className="h-3 w-3 rounded-full bg-accent" />
                <div className="w-px flex-1 bg-grey-200" style={{ minHeight: 24 }} />
                <div className="h-3 w-3 rounded-full bg-brand" />
              </div>
              <div className="space-y-4">
                <p className="text-[14px] font-semibold text-grey-900">{booking.from}</p>
                <p className="text-[14px] text-grey-600">{booking.to}</p>
              </div>
            </div>
          </div>

          {/* Desktop: simulate button */}
          <div className="px-6 pb-6">
            <button
              onClick={() => {
                const next = (statusIdx + 1) % STATUS_CYCLE.length;
                setStatusIdx(next);
                setBooking((b) => ({ ...b, status: STATUS_CYCLE[next], hasRealtime: true }));
              }}
              className="w-full rounded-xl border-2 border-dashed border-grey-200 py-2 text-[12px] font-medium text-grey-400 transition-colors hover:border-grey-300 hover:text-grey-600"
            >
              Simuler étape suivante →
            </button>
          </div>
        </div>

        {/* Mobile: bottom sheet */}
        <div className="lg:hidden">
          <BottomPanel
            booking={booking}
            expanded={expanded}
            onToggle={() => setExpanded((e) => !e)}
          />
        </div>
      </div>
    </div>
  );
}
