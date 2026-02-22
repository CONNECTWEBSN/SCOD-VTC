"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Ruler, Clock4, AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { AddressInput } from "../address-input";
import { CommanderMap } from "../commander-map";
import type { ReservationData, AddressValue } from "../reservation-types";
import { formatFcfa } from "../reservation-types";

interface StepTrajetProps {
  data: ReservationData;
  onPickupChange: (v: AddressValue) => void;
  onDropoffChange: (v: AddressValue) => void;
  errors: Partial<Record<"pickup" | "dropoff", string>>;
}

export function StepTrajet({
  data,
  onPickupChange,
  onDropoffChange,
  errors,
}: StepTrajetProps) {
  const [isLocating, setIsLocating] = React.useState(false);

  const handleMyLocation = React.useCallback(() => {
    if (!navigator.geolocation || !window.google?.maps) return;
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
              onPickupChange({
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
  }, [onPickupChange]);

  const hasRoute =
    data.pickup.latitude !== undefined && data.dropoff.latitude !== undefined;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-sans text-2xl font-bold text-grey-900 md:text-3xl">
          Votre trajet
        </h2>
        <p className="mt-1 font-sans text-sm text-grey-500">
          Saisissez le point de départ et la destination
        </p>
      </div>

      {/* Address inputs */}
      <div className="relative flex flex-col gap-3">
        {/* Connecting line between the two inputs */}
        <div className="pointer-events-none absolute left-[23px] top-[52px] h-[28px] w-px bg-grey-200" />

        <AddressInput
          placeholder="Adresse de départ"
          value={data.pickup}
          onChange={onPickupChange}
          iconVariant="pin"
          showMyLocation
          onMyLocation={handleMyLocation}
          isLocating={isLocating}
          error={errors.pickup}
        />

        <AddressInput
          placeholder="Adresse d'arrivée"
          value={data.dropoff}
          onChange={onDropoffChange}
          iconVariant="circle"
          error={errors.dropoff}
        />
      </div>

      {/* Map */}
      <motion.div
        className={cn(
          "overflow-hidden rounded-card transition-all duration-500",
          hasRoute ? "h-[300px]" : "h-[220px]"
        )}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <CommanderMap
          pickup={data.pickup}
          dropoff={data.dropoff}
          className="h-full"
        />
      </motion.div>

      {/* Route stats */}
      {hasRoute && data.distanceKm > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="flex items-center gap-3 rounded-xl border border-grey-100 bg-grey-50 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/5">
              <Ruler className="h-4.5 w-4.5 text-brand" />
            </div>
            <div>
              <p className="font-sans text-xs text-grey-500">Distance</p>
              <p className="font-sans text-lg font-bold text-grey-900">
                {data.distanceKm.toFixed(1)}{" "}
                <span className="font-sans text-xs font-400 text-grey-500">km</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-grey-100 bg-grey-50 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/5">
              <Clock4 className="h-4.5 w-4.5 text-brand" />
            </div>
            <div>
              <p className="font-sans text-xs text-grey-500">Durée estimée</p>
              <p className="font-sans text-lg font-bold text-grey-900">
                {data.durationMin}{" "}
                <span className="font-sans text-xs font-400 text-grey-500">min</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Helper hint when no addresses */}
      {!data.pickup.address && !data.dropoff.address && (
        <div className="flex items-start gap-2 rounded-xl bg-brand/5 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          <p className="font-sans text-sm text-brand/80">
            Tapez une adresse pour voir les suggestions. Le calcul de prix
            s&apos;effectue automatiquement dès que les deux points sont sélectionnés.
          </p>
        </div>
      )}
    </div>
  );
}
