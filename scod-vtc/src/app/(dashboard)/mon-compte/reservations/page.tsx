"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";
import {
  MapPin, Circle, Star, Eye, RotateCcw,
  XCircle, Navigation, FileText, Edit2, CalendarX,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────────────────────
   Types & mock data
───────────────────────────────────────────────────────── */

type BookingStatus = "upcoming" | "active" | "done" | "cancelled";

interface Booking {
  id:        string;
  status:    BookingStatus;
  date:      string;
  time:      string;
  from:      string;
  to:        string;
  vehicle:   string;
  driver:    { initials: string; name: string; rating: number };
  price:     number;
  currency:  string;
}

const MOCK: Booking[] = [
  {
    id: "BK-001",
    status: "upcoming",
    date: "Lun 24 Fév 2026",
    time: "08:30",
    from: "Hôtel Terrou-Bi, Dakar",
    to: "Aéroport AIBD, Diass",
    vehicle: "BMW Série 5",
    driver: { initials: "SD", name: "Seydou D.", rating: 4.9 },
    price: 45000,
    currency: "FCFA",
  },
  {
    id: "BK-002",
    status: "active",
    date: "Sam 22 Fév 2026",
    time: "14:00",
    from: "Plateau, Dakar",
    to: "Almadies, Dakar",
    vehicle: "Tesla Model S",
    driver: { initials: "AI", name: "Abdou I.", rating: 4.8 },
    price: 28000,
    currency: "FCFA",
  },
  {
    id: "BK-003",
    status: "done",
    date: "Mer 19 Fév 2026",
    time: "10:15",
    from: "Aéroport AIBD, Diass",
    to: "Radisson Blu, Dakar",
    vehicle: "Mercedes Classe S",
    driver: { initials: "OB", name: "Omar B.", rating: 5.0 },
    price: 55000,
    currency: "FCFA",
  },
  {
    id: "BK-004",
    status: "done",
    date: "Dim 15 Fév 2026",
    time: "19:45",
    from: "Saly Portudal",
    to: "Hôtel King Fahd, Dakar",
    vehicle: "Peugeot 3008",
    driver: { initials: "ML", name: "Mamadou L.", rating: 4.7 },
    price: 62000,
    currency: "FCFA",
  },
  {
    id: "BK-005",
    status: "cancelled",
    date: "Mar 10 Fév 2026",
    time: "07:00",
    from: "Mermoz, Dakar",
    to: "Aéroport AIBD, Diass",
    vehicle: "BMW Série 5",
    driver: { initials: "SD", name: "Seydou D.", rating: 4.9 },
    price: 45000,
    currency: "FCFA",
  },
];

const TABS: { id: BookingStatus | "all"; label: string }[] = [
  { id: "upcoming",  label: "À venir" },
  { id: "active",    label: "En cours" },
  { id: "done",      label: "Passées" },
  { id: "cancelled", label: "Annulées" },
];

/* ─────────────────────────────────────────────────────────
   Status badge
───────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<BookingStatus, { label: string; cls: string; dot?: string }> = {
  upcoming:  { label: "Confirmée",  cls: "bg-green-100 text-green-700",  dot: "bg-green-500" },
  active:    { label: "En cours",   cls: "bg-blue-100 text-blue-700",    dot: "bg-blue-500" },
  done:      { label: "Terminée",   cls: "bg-grey-100 text-grey-600" },
  cancelled: { label: "Annulée",    cls: "bg-red-100 text-red-600" },
};

function StatusBadge({ status }: { status: BookingStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider", cfg.cls)}>
      {cfg.dot && (
        <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot, status === "active" && "animate-pulse")} />
      )}
      {cfg.label}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   Booking card
───────────────────────────────────────────────────────── */

function BookingCard({ booking }: { booking: Booking }) {
  const { status } = booking;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl border-2 border-grey-200 bg-white transition-shadow hover:shadow-lg hover:shadow-grey-900/5"
    >
      {/* Active bar */}
      {status === "active" && (
        <div className="h-1 w-full bg-gradient-to-r from-accent via-accent-light to-accent animate-[shimmer_2s_linear_infinite]" />
      )}

      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          {/* Left: route + info */}
          <div className="flex flex-1 gap-4">
            {/* Route visual */}
            <div className="flex flex-col items-center gap-1 pt-1">
              <MapPin className="h-4 w-4 shrink-0 text-accent" />
              <div className="w-px flex-1 bg-grey-200" style={{ minHeight: 28 }} />
              <Circle className="h-3.5 w-3.5 shrink-0 text-brand fill-brand" />
            </div>

            <div className="flex-1 space-y-1">
              {/* Date/time */}
              <div className="mb-3 flex items-center gap-2">
                <p className="font-sans text-[17px] font-bold text-brand">
                  {booking.date}
                </p>
                <span className="rounded-lg bg-grey-100 px-2 py-0.5 font-sans text-[13px] font-bold text-grey-700">
                  {booking.time}
                </span>
              </div>

              {/* From */}
              <p className="text-[14px] font-semibold text-grey-900">{booking.from}</p>
              <p className="text-[14px] text-grey-500">{booking.to}</p>

              {/* Meta row */}
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-medium text-grey-500">
                  {booking.vehicle}
                </span>
                <span className="h-1 w-1 rounded-full bg-grey-300" />
                {/* Driver */}
                <div className="flex items-center gap-1.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand font-sans text-[8px] font-bold text-white">
                    {booking.driver.initials}
                  </div>
                  <span className="text-[12px] font-medium text-grey-600">
                    {booking.driver.name}
                  </span>
                  <span className="flex items-center gap-0.5 text-[11px] font-semibold text-amber-500">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {booking.driver.rating}
                  </span>
                </div>
                <span className="h-1 w-1 rounded-full bg-grey-300" />
                <span className="text-[12px] text-grey-400">{booking.id}</span>
              </div>
            </div>
          </div>

          {/* Right: price + status */}
          <div className="flex items-start justify-between gap-4 sm:flex-col sm:items-end">
            <div className="text-right">
              <p className="font-sans text-[20px] font-bold text-accent">
                {booking.price.toLocaleString("fr-FR")}
              </p>
              <p className="text-[11px] font-medium text-grey-400">{booking.currency}</p>
            </div>
            <StatusBadge status={status} />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-grey-100 pt-4">
          {status === "upcoming" && (
            <>
              <ActionBtn icon={Edit2} label="Modifier" />
              <ActionBtn icon={XCircle} label="Annuler" danger />
            </>
          )}
          {status === "active" && (
            <Link href={`/suivi/${booking.id}`}>
              <ActionBtn icon={Navigation} label="Suivre en direct" primary />
            </Link>
          )}
          {status === "done" && (
            <>
              <ActionBtn icon={RotateCcw} label="Rebook" />
              <ActionBtn icon={FileText} label="Voir le reçu" />
            </>
          )}
          {status === "cancelled" && (
            <>
              <ActionBtn icon={RotateCcw} label="Rebook" />
              <ActionBtn icon={Eye} label="Voir les détails" />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ActionBtn({
  icon: Icon, label, primary, danger,
}: {
  icon: React.ElementType; label: string; primary?: boolean; danger?: boolean;
}) {
  return (
    <button
      className={cn(
        "flex items-center gap-1.5 rounded-xl border-2 px-3 py-1.5 text-[12.5px] font-semibold transition-all duration-150",
        primary
          ? "border-accent bg-accent text-brand hover:bg-accent-light"
          : danger
          ? "border-red-200 text-red-500 hover:bg-red-50"
          : "border-grey-200 text-grey-600 hover:border-grey-300 hover:bg-grey-50"
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────
   Empty state
───────────────────────────────────────────────────────── */

function EmptyState({ tab }: { tab: string }) {
  const messages: Record<string, string> = {
    upcoming:  "Aucune réservation à venir.",
    active:    "Aucune course en cours.",
    done:      "Aucun trajet passé.",
    cancelled: "Aucune réservation annulée.",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed border-grey-200 bg-white py-20 text-center"
    >
      {/* SVG illustration */}
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden>
        <circle cx="40" cy="40" r="40" fill="#F4F4F5" />
        <path d="M24 48h32M24 52h20" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
        <rect x="28" y="26" width="24" height="16" rx="3" fill="#E5E7EB" />
        <rect x="32" y="30" width="8" height="2" rx="1" fill="#9CA3AF" />
        <rect x="32" y="34" width="12" height="2" rx="1" fill="#9CA3AF" />
        <circle cx="52" cy="28" r="7" fill="#FFC300" />
        <path d="M52 25v4M52 31v1" stroke="#110E40" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      <div>
        <p className="font-sans text-[18px] font-bold text-grey-900">
          {messages[tab] ?? "Aucune réservation"}
        </p>
        <p className="mt-1 text-[13.5px] text-grey-500">
          Vos courses apparaîtront ici une fois réservées.
        </p>
      </div>

      <Link href="/commander">
        <motion.span
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-accent px-6 py-2.5 font-bold text-[14px] text-brand shadow-lg shadow-accent/20 transition-colors hover:bg-accent-light"
        >
          <Plus className="h-4 w-4" />
          Réservez votre premier trajet
        </motion.span>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */

export default function ReservationsPage() {
  const [active, setActive] = useState<string>("upcoming");

  const filtered = MOCK.filter((b) => b.status === active);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h2 className="font-sans text-[24px] font-bold text-grey-900">
          Mes réservations
        </h2>
        <p className="mt-1 text-[14px] text-grey-500">
          {MOCK.length} courses au total
        </p>
      </div>

      <Tabs.Root value={active} onValueChange={setActive}>
        {/* Tab list */}
        <Tabs.List className="mb-6 flex gap-0 overflow-x-auto border-b border-grey-200">
          {TABS.map(({ id, label }) => {
            const count = MOCK.filter((b) => b.status === id).length;
            return (
              <Tabs.Trigger
                key={id}
                value={id}
                className={cn(
                  "relative flex shrink-0 items-center gap-2 px-4 py-3 text-[14px] font-medium transition-colors",
                  "focus-visible:outline-none",
                  active === id
                    ? "font-semibold text-brand"
                    : "text-grey-500 hover:text-grey-800"
                )}
              >
                {label}
                {count > 0 && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                      active === id
                        ? "bg-accent text-brand"
                        : "bg-grey-100 text-grey-500"
                    )}
                  >
                    {count}
                  </span>
                )}
                {/* active underline */}
                {active === id && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>

        {/* Content */}
        {TABS.map(({ id }) => (
          <Tabs.Content key={id} value={id} className="outline-none">
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <EmptyState key="empty" tab={id} />
              ) : (
                <motion.div
                  key="list"
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {filtered.map((b) => (
                    <BookingCard key={b.id} booking={b} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}
