"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, Zap, Crown, Shield } from "lucide-react";
import { cn } from "@/lib/cn";

export type VehicleClass = "confort" | "premium" | "vip";

export interface VehicleOption {
  id: VehicleClass;
  name: string;
  subtitle: string;
  capacity: number;
  luggage: number;
  features: string[];
  basePrice: number;
  pricePerKm: number;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: "confort",
    name: "Confort",
    subtitle: "Berline · Peugeot 3008 ou similaire",
    capacity: 4,
    luggage: 3,
    features: ["Climatisation", "WiFi"],
    basePrice: 25000,
    pricePerKm: 750,
    icon: <Shield className="h-6 w-6" />,
  },
  {
    id: "premium",
    name: "Premium",
    subtitle: "Berline Luxe · BMW Série 5 ou similaire",
    capacity: 4,
    luggage: 3,
    features: ["Eau minérale", "Chargeur"],
    basePrice: 40000,
    pricePerKm: 1100,
    icon: <Crown className="h-6 w-6" />,
    badge: "Populaire",
    badgeColor: "accent",
  },
  {
    id: "vip",
    name: "VIP",
    subtitle: "Grand Luxe · Tesla Model S ou Mercedes S",
    capacity: 4,
    luggage: 3,
    features: ["Champagne", "Tapis rouge"],
    basePrice: 60000,
    pricePerKm: 1500,
    icon: <Zap className="h-6 w-6" />,
    badge: "Électrique",
    badgeColor: "green",
  },
];

function formatFcfa(amount: number): string {
  return new Intl.NumberFormat("fr-SN", {
    maximumFractionDigits: 0,
  }).format(amount);
}

interface VehicleSelectorProps {
  selected: VehicleClass;
  onSelect: (vehicle: VehicleClass) => void;
  distanceKm?: number;
  className?: string;
}

export function VehicleSelector({
  selected,
  onSelect,
  distanceKm,
  className,
}: VehicleSelectorProps) {
  const estimatePrice = (option: VehicleOption) => {
    if (!distanceKm) return option.basePrice;
    return Math.round(option.basePrice + distanceKm * option.pricePerKm);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {VEHICLE_OPTIONS.map((option) => {
        const isSelected = selected === option.id;
        const price = estimatePrice(option);

        return (
          <motion.button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative flex w-full items-center gap-4 rounded-card border p-4 text-left transition-all duration-200",
              isSelected
                ? "border-accent bg-accent-soft shadow-[0_0_0_1px_#FFC300]"
                : "border-grey-200 bg-white hover:border-grey-300 hover:bg-grey-50"
            )}
            aria-pressed={isSelected}
          >
            {/* Badge */}
            {option.badge && (
              <span
                className={cn(
                  "absolute right-3 top-3 rounded-pill px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider",
                  option.badgeColor === "accent" &&
                    "bg-accent text-brand",
                  option.badgeColor === "green" &&
                    "bg-emerald-100 text-emerald-700"
                )}
              >
                {option.badge}
              </span>
            )}

            {/* Icon */}
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-200",
                isSelected
                  ? "bg-accent text-brand"
                  : "bg-grey-100 text-grey-500"
              )}
            >
              {option.icon}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p
                  className={cn(
                    "font-sans text-base font-bold transition-colors",
                    isSelected ? "text-brand" : "text-grey-900"
                  )}
                >
                  {option.name}
                </p>
                <p className="shrink-0 font-sans text-base font-bold text-accent">
                  {formatFcfa(price)}
                  <span className="ml-0.5 font-sans text-xs font-400 text-grey-500">
                    {distanceKm ? " FCFA" : " FCFA min."}
                  </span>
                </p>
              </div>

              <p className="mt-0.5 truncate font-sans text-xs text-grey-500">
                {option.subtitle}
              </p>

              {/* Meta */}
              <div className="mt-2 flex items-center gap-3">
                <span className="flex items-center gap-1 font-sans text-xs text-grey-600">
                  <Users className="h-3.5 w-3.5" />
                  {option.capacity} pers.
                </span>
                <span className="flex items-center gap-1 font-sans text-xs text-grey-600">
                  <Briefcase className="h-3.5 w-3.5" />
                  {option.luggage} bag.
                </span>
                {option.features.map((f) => (
                  <span
                    key={f}
                    className={cn(
                      "hidden rounded-md px-1.5 py-0.5 font-sans text-[10px] font-500 sm:inline-block",
                      isSelected
                        ? "bg-accent/20 text-brand"
                        : "bg-grey-100 text-grey-600"
                    )}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Selection indicator */}
            <div
              className={cn(
                "h-5 w-5 shrink-0 rounded-full border-2 transition-all duration-200",
                isSelected
                  ? "border-accent bg-accent"
                  : "border-grey-300 bg-white"
              )}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex h-full w-full items-center justify-center"
                >
                  <div className="h-2 w-2 rounded-full bg-brand" />
                </motion.div>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

export { VEHICLE_OPTIONS };
