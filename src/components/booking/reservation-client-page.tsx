"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { ReservationStepper } from "@/components/booking/reservation-stepper";
import { StepTrajet } from "@/components/booking/steps/step-trajet";
import { StepDatetime } from "@/components/booking/steps/step-datetime";
import { StepVehicle } from "@/components/booking/steps/step-vehicle";
import { StepRecap } from "@/components/booking/steps/step-recap";
import { StepPayment } from "@/components/booking/steps/step-payment";
import { SuccessScreen } from "@/components/booking/success-screen";
import {
  DEFAULT_RESERVATION,
  generateBookingRef,
  calculatePrice,
  type ReservationData,
  type AddressValue,
  type VehicleClass,
  type PaymentMethodId,
} from "@/components/booking/reservation-types";

// ─── Haversine distance calculation ───────────────────────────────────────────

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

// ─── Slide transition variants ────────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function ReservationClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [data, setData] = React.useState<ReservationData>(() => {
    // Pre-fill from query params if coming from /commander
    const pickup = searchParams.get("pickup");
    const dropoff = searchParams.get("dropoff");
    const vehicle = searchParams.get("vehicle") as VehicleClass | null;
    return {
      ...DEFAULT_RESERVATION,
      pickup: pickup ? { address: pickup } : DEFAULT_RESERVATION.pickup,
      dropoff: dropoff ? { address: dropoff } : DEFAULT_RESERVATION.dropoff,
      vehicleClass: vehicle || DEFAULT_RESERVATION.vehicleClass,
    };
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [bookingRef, setBookingRef] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);

  // Update distance + duration when both addresses have coordinates
  React.useEffect(() => {
    if (
      data.pickup.latitude !== undefined &&
      data.pickup.longitude !== undefined &&
      data.dropoff.latitude !== undefined &&
      data.dropoff.longitude !== undefined
    ) {
      const distanceKm = haversineKm(
        data.pickup.latitude,
        data.pickup.longitude,
        data.dropoff.latitude,
        data.dropoff.longitude
      );
      const durationMin = Math.round(distanceKm * 2.5);
      setData((d) => ({ ...d, distanceKm, durationMin }));
    }
  }, [
    data.pickup.latitude,
    data.pickup.longitude,
    data.dropoff.latitude,
    data.dropoff.longitude,
  ]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const updateData = (fields: Partial<ReservationData>) => {
    setData((d) => ({ ...d, ...fields }));
    setErrors({});
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!data.pickup.address) newErrors.pickup = "Adresse de départ requise";
      if (!data.dropoff.address) newErrors.dropoff = "Adresse d'arrivée requise";
      if (!data.pickup.latitude || !data.dropoff.latitude)
        newErrors.pickup = "Veuillez sélectionner une adresse dans la liste";
    }

    if (step === 1) {
      if (!data.isEarliest && !data.date) newErrors.date = "Veuillez choisir une date";
      if (!data.isEarliest && !data.time) newErrors.time = "Veuillez choisir une heure";
    }

    if (step === 4) {
      if (!data.paymentMethod) {
        newErrors.payment = "Veuillez sélectionner un moyen de paiement";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToStep = (step: number) => {
    if (step < currentStep || validateStep(currentStep)) {
      setDirection(step > currentStep ? 1 : -1);
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      goToStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000));

    const ref = generateBookingRef();
    setBookingRef(ref);
    setIsSuccess(true);
    setIsProcessing(false);

    // Scroll to top to show success screen
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Success screen ─────────────────────────────────────────────────────────

  if (isSuccess) {
    const price = calculatePrice(
      data.vehicleClass,
      data.distanceKm,
      data.time,
      data.pickup.address,
      data.dropoff.address
    );
    return (
      <SuccessScreen
        bookingRef={bookingRef}
        data={data}
        totalAmount={price.total}
        depositAmount={price.deposit}
      />
    );
  }

  // ── Stepper flow ───────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-grey-50 pt-[68px]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stepper */}
        <div className="mb-10">
          <ReservationStepper currentStep={currentStep} />
        </div>

        {/* Step content with AnimatePresence */}
        <div className="overflow-hidden rounded-2xl border border-grey-100 bg-white shadow-xl">
          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {currentStep === 0 && (
                  <StepTrajet
                    data={data}
                    onPickupChange={(v: AddressValue) => updateData({ pickup: v })}
                    onDropoffChange={(v: AddressValue) => updateData({ dropoff: v })}
                    errors={errors}
                  />
                )}

                {currentStep === 1 && (
                  <StepDatetime data={data} onUpdate={updateData} errors={errors} />
                )}

                {currentStep === 2 && (
                  <StepVehicle
                    data={data}
                    onSelect={(vehicleClass: VehicleClass) =>
                      updateData({ vehicleClass })
                    }
                  />
                )}

                {currentStep === 3 && <StepRecap data={data} />}

                {currentStep === 4 && (
                  <StepPayment
                    data={data}
                    onSelectMethod={(method: PaymentMethodId) =>
                      updateData({ paymentMethod: method })
                    }
                    isProcessing={isProcessing}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between border-t border-grey-100 bg-grey-50 px-6 py-5 sm:px-10">
            <button
              type="button"
              onClick={handleBack}
              disabled={isProcessing}
              className={cn(
                "flex items-center gap-2 rounded-btn border-2 border-grey-200 bg-white px-5 py-3 font-sans text-sm font-bold text-grey-700 transition-all",
                "hover:border-grey-300 hover:bg-grey-50",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              {currentStep === 0 ? "Annuler" : "Retour"}
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isProcessing}
              className={cn(
                "flex items-center gap-2 rounded-btn bg-accent px-6 py-3 font-sans text-sm font-bold text-brand shadow-[0_4px_16px_rgba(255,195,0,0.3)] transition-all",
                "hover:bg-accent-light hover:shadow-[0_6px_20px_rgba(255,195,0,0.4)]",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
              )}
            >
              {currentStep === 4 ? (
                <>
                  <Check className="h-4 w-4" />
                  Confirmer la réservation
                </>
              ) : (
                <>
                  Continuer
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {[
            "Paiement 100% sécurisé",
            "Annulation gratuite 24h",
            "Tarif fixe garanti",
          ].map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 font-sans text-sm text-grey-400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
