"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  User,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/cn";
import { CommanderMap } from "../commander-map";
import {
  calculatePrice,
  formatFcfa,
  VEHICLES,
  MOCK_DRIVERS,
  type ReservationData,
} from "../reservation-types";

// ─── Price row helper ─────────────────────────────────────────────────────────

function PriceRow({
  label,
  amount,
  highlight = false,
  muted = false,
}: {
  label: string;
  amount: number;
  highlight?: boolean;
  muted?: boolean;
}) {
  if (amount === 0) return null;
  return (
    <div
      className={cn(
        "flex items-center justify-between py-2",
        highlight && "border-t border-grey-100 pt-3"
      )}
    >
      <span
        className={cn(
          "font-sans text-sm",
          highlight ? "font-bold text-grey-900" : "text-grey-600",
          muted && "text-grey-400"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "font-sans text-sm",
          highlight
            ? "font-sans text-lg font-bold text-accent"
            : muted
            ? "text-grey-400"
            : "font-semibold text-grey-900"
        )}
      >
        {amount > 0 ? `+${formatFcfa(amount)} FCFA` : `${formatFcfa(amount)} FCFA`}
      </span>
    </div>
  );
}

// ─── Step component ───────────────────────────────────────────────────────────

interface StepRecapProps {
  data: ReservationData;
}

export function StepRecap({ data }: StepRecapProps) {
  const vehicle = VEHICLES.find((v) => v.id === data.vehicleClass)!;
  const driver = MOCK_DRIVERS[data.vehicleClass];
  const price = calculatePrice(
    data.vehicleClass,
    data.distanceKm,
    data.time,
    data.pickup.address,
    data.dropoff.address
  );

  const formattedDate = data.isEarliest
    ? "Au plus tôt"
    : data.date
    ? format(parseISO(data.date), "EEEE d MMMM yyyy", { locale: fr })
    : "—";

  const formattedTime = data.isEarliest ? "Prochain disponible" : data.time || "—";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-sans text-2xl font-bold text-grey-900 md:text-3xl">
          Récapitulatif
        </h2>
        <p className="mt-1 font-sans text-sm text-grey-500">
          Vérifiez les détails avant de confirmer
        </p>
      </div>

      {/* Mini map + route summary */}
      <div className="overflow-hidden rounded-card border border-grey-100 shadow-sm">
        {/* Map */}
        <div className="h-[200px] w-full">
          <CommanderMap
            pickup={data.pickup}
            dropoff={data.dropoff}
            className="h-full"
          />
        </div>

        {/* Route */}
        <div className="divide-y divide-grey-50 bg-white px-5 py-1">
          <div className="flex items-start gap-3 py-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <div>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-wide text-grey-400">
                Départ
              </p>
              <p className="font-sans text-sm font-semibold text-grey-900">
                {data.pickup.address || "—"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 py-3">
            <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-brand" />
            <div>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-wide text-grey-400">
                Arrivée
              </p>
              <p className="font-sans text-sm font-semibold text-grey-900">
                {data.dropoff.address || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trip details grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            icon: Calendar,
            label: "Date",
            value: formattedDate,
          },
          {
            icon: Clock,
            label: "Heure",
            value: formattedTime,
          },
          {
            icon: Car,
            label: "Véhicule",
            value: vehicle.name,
          },
          {
            icon: User,
            label: "Chauffeur",
            value: driver.name,
          },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-start gap-3 rounded-xl border border-grey-100 bg-grey-50 px-4 py-3"
          >
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/5">
              <Icon className="h-4 w-4 text-brand" />
            </div>
            <div>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-wide text-grey-400">
                {label}
              </p>
              <p className="mt-0.5 font-sans text-sm font-semibold capitalize text-grey-900 first-letter:uppercase">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Price breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-card border border-grey-100 bg-white p-5 shadow-sm"
      >
        <p className="mb-1 font-sans text-xs font-bold uppercase tracking-widest text-grey-400">
          Détail du prix
        </p>

        <div className="mt-3 divide-y divide-grey-50">
          <PriceRow label="Tarif de base" amount={price.base} />
          {price.perKm > 0 && (
            <div className="flex items-center justify-between py-2">
              <span className="font-sans text-sm text-grey-600">
                Kilométrage ({data.distanceKm.toFixed(1)} km)
              </span>
              <span className="font-sans text-sm font-semibold text-grey-900">
                +{formatFcfa(price.perKm)} FCFA
              </span>
            </div>
          )}
          {price.aibdSupplement > 0 && (
            <div className="flex items-center justify-between py-2">
              <span className="font-sans text-sm text-grey-600">Supplément AIBD</span>
              <span className="font-sans text-sm font-semibold text-grey-900">
                +{formatFcfa(price.aibdSupplement)} FCFA
              </span>
            </div>
          )}
          {price.nightSupplement > 0 && (
            <div className="flex items-center justify-between py-2">
              <span className="font-sans text-sm text-grey-600">Supplément nuit</span>
              <span className="font-sans text-sm font-semibold text-grey-900">
                +{formatFcfa(price.nightSupplement)} FCFA
              </span>
            </div>
          )}
          {price.zoneSupplement > 0 && (
            <div className="flex items-center justify-between py-2">
              <span className="font-sans text-sm text-grey-600">Zone éloignée (&gt;50 km)</span>
              <span className="font-sans text-sm font-semibold text-grey-900">
                +{formatFcfa(price.zoneSupplement)} FCFA
              </span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="mt-3 flex items-center justify-between border-t border-grey-100 pt-4">
          <span className="font-sans text-base font-bold text-grey-900">Total TTC</span>
          <span className="font-sans text-2xl font-bold text-accent">
            {formatFcfa(price.total)}{" "}
            <span className="font-sans text-sm font-400 text-grey-500">FCFA</span>
          </span>
        </div>

        {/* Deposit note */}
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-brand/5 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          <p className="font-sans text-sm text-brand/80">
            Acompte de confirmation :{" "}
            <span className="font-bold">
              {formatFcfa(price.deposit)} FCFA
            </span>{" "}
            (30%). Le solde est réglé en fin de course.
          </p>
        </div>
      </motion.div>

      {/* Cancellation policy */}
      <div className="rounded-xl border border-grey-100 bg-grey-50 p-4">
        <p className="mb-2 font-sans text-xs font-bold uppercase tracking-widest text-grey-400">
          Politique d&apos;annulation
        </p>
        <div className="space-y-2">
          {[
            { label: "Annulation gratuite jusqu'à 24h avant", accent: true },
            { label: "50% retenu entre 24h et 2h avant la course" },
            { label: "Acompte non remboursable moins de 2h avant" },
          ].map(({ label, accent }) => (
            <div key={label} className="flex items-start gap-2">
              <ChevronRight
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  accent ? "text-accent" : "text-grey-400"
                )}
              />
              <p
                className={cn(
                  "font-sans text-sm",
                  accent ? "font-semibold text-grey-900" : "text-grey-500"
                )}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
