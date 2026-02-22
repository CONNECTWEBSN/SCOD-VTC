"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  Calendar,
  Clock,
  Navigation,
  Plane,
  Building2,
  Landmark,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { AddressInput, type AddressValue } from "./address-input";
import { VehicleSelector, type VehicleClass } from "./vehicle-selector";

// ─── Zod Schema ─────────────────────────────────────────────────────────────

const commanderSchema = z.object({
  pickup: z.object({
    address: z.string().min(3, "Adresse de départ requise"),
    placeId: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  dropoff: z.object({
    address: z.string().min(3, "Adresse d'arrivée requise"),
    placeId: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  schedule: z.enum(["now", "later"]),
  date: z.string().optional(),
  time: z.string().optional(),
  vehicleClass: z.enum(["confort", "premium", "vip"]),
});

type CommanderFormData = z.infer<typeof commanderSchema>;

// ─── Quick destination suggestions ──────────────────────────────────────────

const QUICK_DESTINATIONS = [
  {
    icon: Plane,
    label: "Aéroport AIBD",
    address: "Aéroport International Blaise Diagne, Diass, Sénégal",
    latitude: 14.7397,
    longitude: -17.0902,
  },
  {
    icon: Building2,
    label: "Radisson Blu Dakar",
    address: "Radisson Blu Hotel Dakar Seaview, Dakar, Sénégal",
    latitude: 14.7232,
    longitude: -17.4757,
  },
  {
    icon: Landmark,
    label: "Plateau Centre-ville",
    address: "Plateau, Dakar, Sénégal",
    latitude: 14.6937,
    longitude: -17.4441,
  },
] as const;

// ─── Price estimation ────────────────────────────────────────────────────────

function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const PRICE_PER_KM: Record<VehicleClass, number> = {
  confort: 750,
  premium: 1100,
  vip: 1500,
};
const BASE_PRICE: Record<VehicleClass, number> = {
  confort: 25000,
  premium: 40000,
  vip: 60000,
};

function estimateTripPrice(
  pickup: AddressValue,
  dropoff: AddressValue,
  vehicleClass: VehicleClass
): { distanceKm: number; durationMin: number; price: number } | null {
  if (
    pickup.latitude === undefined ||
    pickup.longitude === undefined ||
    dropoff.latitude === undefined ||
    dropoff.longitude === undefined
  )
    return null;

  const distanceKm = haversineKm(
    pickup.latitude,
    pickup.longitude,
    dropoff.latitude,
    dropoff.longitude
  );
  const durationMin = Math.round(distanceKm * 2.5);
  const price = Math.round(BASE_PRICE[vehicleClass] + distanceKm * PRICE_PER_KM[vehicleClass]);
  return { distanceKm, durationMin, price };
}

function formatFcfa(amount: number): string {
  return new Intl.NumberFormat("fr-SN", { maximumFractionDigits: 0 }).format(
    amount
  );
}

// ─── Today helpers ───────────────────────────────────────────────────────────

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

function getNextHourTime(): string {
  const d = new Date();
  d.setHours(d.getHours() + 1, 0, 0, 0);
  return `${String(d.getHours()).padStart(2, "0")}:00`;
}

// ─── Props ───────────────────────────────────────────────────────────────────

interface CommanderFormProps {
  onPickupChange?: (pickup: AddressValue) => void;
  onDropoffChange?: (dropoff: AddressValue) => void;
  className?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function CommanderForm({
  onPickupChange,
  onDropoffChange,
  className,
}: CommanderFormProps) {
  const router = useRouter();
  const [isLocating, setIsLocating] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CommanderFormData>({
    resolver: zodResolver(commanderSchema),
    defaultValues: {
      pickup: { address: "" },
      dropoff: { address: "" },
      schedule: "now",
      date: getTodayDate(),
      time: getNextHourTime(),
      vehicleClass: "premium",
    },
  });

  const pickup = watch("pickup");
  const dropoff = watch("dropoff");
  const vehicleClass = watch("vehicleClass");
  const schedule = watch("schedule");

  // Propagate address changes up to parent (for the map)
  React.useEffect(() => {
    onPickupChange?.(pickup);
  }, [pickup.latitude, pickup.longitude, pickup.address]);

  React.useEffect(() => {
    onDropoffChange?.(dropoff);
  }, [dropoff.latitude, dropoff.longitude, dropoff.address]);

  // Compute estimate
  const estimate = React.useMemo(
    () => estimateTripPrice(pickup, dropoff, vehicleClass),
    [
      pickup.latitude,
      pickup.longitude,
      dropoff.latitude,
      dropoff.longitude,
      vehicleClass,
    ]
  );

  // Geolocation
  const handleMyLocation = React.useCallback(() => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          { location: { lat: pos.coords.latitude, lng: pos.coords.longitude } },
          (
            results: google.maps.GeocoderResult[] | null,
            status: google.maps.GeocoderStatus
          ) => {
            setIsLocating(false);
            if (status === "OK" && results?.[0]) {
              setValue("pickup", {
                address: results[0].formatted_address,
                placeId: results[0].place_id,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              });
            }
          }
        );
      },
      () => setIsLocating(false),
      { timeout: 10000 }
    );
  }, [setValue]);

  // Quick destination
  const handleQuickDestination = (dest: (typeof QUICK_DESTINATIONS)[number]) => {
    setValue("dropoff", {
      address: dest.address,
      latitude: dest.latitude,
      longitude: dest.longitude,
    });
  };

  // Submit
  const onSubmit = async (data: CommanderFormData) => {
    setIsSubmitting(true);
    // Build query params for the next step (/reservation)
    const params = new URLSearchParams({
      pickup: data.pickup.address,
      dropoff: data.dropoff.address,
      vehicle: data.vehicleClass,
      schedule: data.schedule,
      ...(data.schedule === "later" && data.date ? { date: data.date } : {}),
      ...(data.schedule === "later" && data.time ? { time: data.time } : {}),
    });
    // Simulate short delay for UX
    await new Promise((r) => setTimeout(r, 600));
    router.push(`/reservation?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
    >
      {/* ── Titre ── */}
      <div>
        <h1 className="font-sans text-4xl font-bold leading-none tracking-tight text-grey-900">
          Où allez-vous ?
        </h1>
        <p className="mt-1 font-sans text-sm text-grey-500">
          Réservez votre chauffeur en 30 secondes
        </p>
      </div>

      {/* ── Adresses ── */}
      <div className="flex flex-col gap-3">
        <Controller
          name="pickup"
          control={control}
          render={({ field }) => (
            <AddressInput
              placeholder="Adresse de départ"
              value={field.value}
              onChange={field.onChange}
              iconVariant="pin"
              showMyLocation
              onMyLocation={handleMyLocation}
              isLocating={isLocating}
              error={errors.pickup?.address?.message}
            />
          )}
        />

        <Controller
          name="dropoff"
          control={control}
          render={({ field }) => (
            <AddressInput
              placeholder="Adresse d'arrivée"
              value={field.value}
              onChange={field.onChange}
              iconVariant="circle"
              error={errors.dropoff?.address?.message}
            />
          )}
        />

        {/* Quick destinations */}
        <AnimatePresence>
          {!dropoff.address && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-widest text-grey-400">
                Destinations populaires
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_DESTINATIONS.map((dest) => {
                  const Icon = dest.icon;
                  return (
                    <button
                      key={dest.label}
                      type="button"
                      onClick={() => handleQuickDestination(dest)}
                      className="flex items-center gap-1.5 rounded-pill border border-grey-200 bg-white px-3 py-1.5 font-sans text-sm text-grey-700 transition-all hover:border-accent hover:bg-accent-soft hover:text-brand"
                    >
                      <Icon className="h-3.5 w-3.5 text-accent" />
                      {dest.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Quand ? ── */}
      <div>
        <Controller
          name="schedule"
          control={control}
          render={({ field }) => (
            <div className="flex overflow-hidden rounded-xl border border-grey-200 bg-grey-100 p-1">
              {(["now", "later"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => field.onChange(opt)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 font-sans text-sm font-semibold transition-all duration-200",
                    field.value === opt
                      ? "bg-white shadow-sm text-grey-900"
                      : "text-grey-500 hover:text-grey-700"
                  )}
                >
                  {opt === "now" ? (
                    <>
                      <Navigation className="h-4 w-4" />
                      Maintenant
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4" />
                      Planifier
                    </>
                  )}
                </button>
              ))}
            </div>
          )}
        />

        <AnimatePresence>
          {schedule === "later" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-grey-400" />
                      <input
                        type="date"
                        {...field}
                        min={getTodayDate()}
                        className="h-[48px] w-full rounded-input border border-grey-200 bg-white pl-10 pr-3 font-sans text-sm text-grey-900 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15"
                      />
                    </div>
                  )}
                />
                <Controller
                  name="time"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-grey-400" />
                      <input
                        type="time"
                        {...field}
                        className="h-[48px] w-full rounded-input border border-grey-200 bg-white pl-10 pr-3 font-sans text-sm text-grey-900 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15"
                      />
                    </div>
                  )}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Sélection véhicule ── */}
      <div>
        <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-grey-400">
          Votre véhicule
        </p>
        <Controller
          name="vehicleClass"
          control={control}
          render={({ field }) => (
            <VehicleSelector
              selected={field.value}
              onSelect={field.onChange}
              distanceKm={estimate?.distanceKm}
            />
          )}
        />
      </div>

      {/* ── Estimation prix ── */}
      <AnimatePresence>
        {estimate && (
          <motion.div
            key="estimate"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="rounded-card border border-accent/30 bg-accent-soft px-5 py-4"
          >
            <div className="flex items-end justify-between">
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-widest text-grey-500">
                  Estimation du trajet
                </p>
                <p className="mt-1 font-sans text-sm text-grey-600">
                  {estimate.distanceKm.toFixed(1)} km · ~{estimate.durationMin} min
                </p>
              </div>
              <div className="text-right">
                <p className="font-sans text-xs text-grey-500">Tarif fixe</p>
                <p className="font-sans text-3xl font-bold leading-none text-accent">
                  {formatFcfa(estimate.price)}
                  <span className="ml-1 font-sans text-sm font-400 text-grey-500">
                    FCFA
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA ── */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ translateY: -2 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative flex h-[56px] w-full items-center justify-center gap-3 overflow-hidden rounded-btn font-sans text-base font-bold transition-all duration-200",
          "bg-accent text-brand shadow-[0_4px_20px_rgba(255,195,0,0.35)]",
          "hover:bg-accent-light hover:shadow-[0_6px_28px_rgba(255,195,0,0.45)]",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40",
          "disabled:cursor-not-allowed disabled:opacity-60"
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Préparation…
          </>
        ) : (
          <>
            Commander maintenant
            <ArrowRight className="h-5 w-5" />
          </>
        )}
        {/* Subtle pulse glow */}
        <span className="absolute inset-0 animate-ping rounded-btn bg-accent opacity-0 group-hover:opacity-10" />
      </motion.button>

      {/* Trust signals */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
        {["Tarif fixe garanti", "Paiement sécurisé", "Annulation gratuite 24h"].map(
          (item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 font-sans text-xs text-grey-400"
            >
              <span className="h-1 w-1 rounded-full bg-accent" />
              {item}
            </span>
          )
        )}
      </div>
    </form>
  );
}
