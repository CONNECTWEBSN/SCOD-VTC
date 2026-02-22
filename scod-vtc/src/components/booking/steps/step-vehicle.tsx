"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Users, Briefcase, Check, Globe, Shield, Crown, Zap } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  VEHICLES,
  MOCK_DRIVERS,
  calculatePrice,
  formatFcfa,
  type ReservationData,
  type VehicleClass,
} from "../reservation-types";

// ─── Vehicle icons ────────────────────────────────────────────────────────────

const VEHICLE_ICONS: Record<VehicleClass, React.ReactNode> = {
  confort: <Shield className="h-7 w-7" />,
  premium: <Crown className="h-7 w-7" />,
  vip: <Zap className="h-7 w-7" />,
};

// ─── Driver card ──────────────────────────────────────────────────────────────

function DriverCard({ vehicleClass }: { vehicleClass: VehicleClass }) {
  const driver = MOCK_DRIVERS[vehicleClass];

  return (
    <motion.div
      key={vehicleClass}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="mt-4 overflow-hidden rounded-xl border border-grey-100 bg-grey-50"
    >
      <div className="flex items-center gap-4 p-4">
        {/* Avatar */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-hover font-sans text-lg font-bold text-white shadow-md">
          {driver.initials}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-sans text-base font-bold text-grey-900">
                {driver.name}
              </p>
              <div className="mt-0.5 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3.5 w-3.5",
                      i < Math.floor(driver.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-grey-200"
                    )}
                  />
                ))}
                <span className="ml-1 font-sans text-xs font-semibold text-grey-700">
                  {driver.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <span className="shrink-0 rounded-pill bg-emerald-100 px-2.5 py-0.5 font-sans text-[10px] font-bold text-emerald-700">
              Disponible
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-3">
            <span className="flex items-center gap-1 font-sans text-xs text-grey-500">
              <Globe className="h-3 w-3" />
              {driver.languages.join(", ")}
            </span>
            <span className="flex items-center gap-1 font-sans text-xs text-grey-500">
              <Star className="h-3 w-3" />
              {driver.trips.toLocaleString()} courses
            </span>
            <span className="font-sans text-xs text-grey-500">
              {driver.experience} d&apos;expérience
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Step component ───────────────────────────────────────────────────────────

interface StepVehicleProps {
  data: ReservationData;
  onSelect: (vehicleClass: VehicleClass) => void;
}

export function StepVehicle({ data, onSelect }: StepVehicleProps) {
  const { distanceKm, time, pickup, dropoff, vehicleClass } = data;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-sans text-2xl font-bold text-grey-900 md:text-3xl">
          Choisissez votre véhicule
        </h2>
        <p className="mt-1 font-sans text-sm text-grey-500">
          Tarif fixe garanti · Chauffeur professionnel inclus
        </p>
      </div>

      {/* Vehicle cards */}
      <div className="flex flex-col gap-3">
        {VEHICLES.map((vehicle) => {
          const isSelected = vehicleClass === vehicle.id;
          const price = calculatePrice(
            vehicle.id,
            distanceKm,
            time,
            pickup.address,
            dropoff.address
          );

          return (
            <motion.button
              key={vehicle.id}
              type="button"
              onClick={() => onSelect(vehicle.id)}
              whileTap={{ scale: 0.985 }}
              className={cn(
                "relative w-full rounded-card border p-5 text-left transition-all duration-200",
                isSelected
                  ? "border-accent bg-accent-soft shadow-[0_0_0_1.5px_#FFC300,0_8px_24px_rgba(255,195,0,0.15)]"
                  : "border-grey-200 bg-white hover:border-grey-300 hover:shadow-md"
              )}
              aria-pressed={isSelected}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={cn(
                    "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors duration-200",
                    isSelected
                      ? "bg-accent text-brand"
                      : "bg-grey-100 text-grey-500"
                  )}
                >
                  {VEHICLE_ICONS[vehicle.id]}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <p
                      className={cn(
                        "font-sans text-xl font-bold transition-colors",
                        isSelected ? "text-brand" : "text-grey-900"
                      )}
                    >
                      {vehicle.name}
                    </p>
                    <div className="text-right">
                      <p className="font-sans text-2xl font-bold leading-none text-accent">
                        {formatFcfa(price.total)}
                      </p>
                      <p className="font-sans text-[10px] text-grey-500">FCFA</p>
                    </div>
                  </div>

                  <p className="mt-0.5 font-sans text-sm text-grey-500">
                    {vehicle.subtitle}
                  </p>

                  {/* Meta */}
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1.5 font-sans text-xs text-grey-600">
                      <Users className="h-3.5 w-3.5" />
                      {vehicle.capacity} passagers
                    </span>
                    <span className="flex items-center gap-1.5 font-sans text-xs text-grey-600">
                      <Briefcase className="h-3.5 w-3.5" />
                      {vehicle.luggage} bagages
                    </span>
                  </div>

                  {/* Features */}
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {vehicle.features.map((f) => (
                      <span
                        key={f}
                        className={cn(
                          "flex items-center gap-1 rounded-md px-2 py-0.5 font-sans text-[11px] font-semibold",
                          isSelected
                            ? "bg-accent/20 text-brand"
                            : "bg-grey-100 text-grey-600"
                        )}
                      >
                        <Check className="h-3 w-3" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Radio indicator */}
                <div
                  className={cn(
                    "mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 transition-all duration-200",
                    isSelected
                      ? "border-accent bg-accent"
                      : "border-grey-300 bg-white"
                  )}
                >
                  {isSelected && (
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-brand" />
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Driver info — animated on selection */}
      <AnimatePresence mode="wait">
        <DriverCard key={vehicleClass} vehicleClass={vehicleClass} />
      </AnimatePresence>

      {/* Price note */}
      {distanceKm === 0 && (
        <p className="font-sans text-xs text-grey-400">
          * Le prix définitif sera calculé une fois le trajet renseigné.
        </p>
      )}
    </div>
  );
}
