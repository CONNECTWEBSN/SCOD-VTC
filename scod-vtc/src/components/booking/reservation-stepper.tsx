"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface StepDefinition {
  label: string;
  shortLabel: string;
}

export const STEP_DEFINITIONS: StepDefinition[] = [
  { label: "Trajet", shortLabel: "Trajet" },
  { label: "Date & heure", shortLabel: "Date" },
  { label: "Véhicule", shortLabel: "Véhicule" },
  { label: "Récapitulatif", shortLabel: "Récap" },
  { label: "Paiement", shortLabel: "Payer" },
];

interface ReservationStepperProps {
  currentStep: number; // 0-indexed
  totalSteps?: number;
  className?: string;
}

export function ReservationStepper({
  currentStep,
  totalSteps = STEP_DEFINITIONS.length,
  className,
}: ReservationStepperProps) {
  const progressPct = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className={cn("w-full", className)}>
      {/* ── Desktop stepper ── */}
      <div className="hidden md:block">
        <div className="relative flex items-start justify-between">
          {/* Background track */}
          <div className="absolute left-0 right-0 top-5 h-[2px] -translate-y-1/2 bg-grey-200" />

          {/* Animated fill */}
          <motion.div
            className="absolute left-0 top-5 h-[2px] -translate-y-1/2 origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progressPct / 100 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ right: 0 }}
          />

          {/* Steps */}
          {STEP_DEFINITIONS.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            const isFuture = index > currentStep;

            return (
              <div
                key={step.label}
                className="relative z-10 flex flex-col items-center gap-2"
              >
                {/* Circle */}
                <motion.div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 font-sans text-sm font-bold transition-colors duration-300",
                    isCompleted &&
                      "border-accent bg-accent text-brand",
                    isActive &&
                      "border-accent bg-white text-brand shadow-[0_0_0_4px_rgba(255,195,0,0.2)]",
                    isFuture &&
                      "border-grey-200 bg-white text-grey-400"
                  )}
                  animate={isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" strokeWidth={2.5} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </motion.div>

                {/* Label */}
                <span
                  className={cn(
                    "whitespace-nowrap font-sans text-xs font-semibold transition-colors duration-300",
                    isCompleted && "text-accent",
                    isActive && "text-brand",
                    isFuture && "text-grey-400"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile stepper : compact progress bar + step label ── */}
      <div className="md:hidden">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-grey-400">
            Étape {currentStep + 1} sur {totalSteps}
          </span>
          <span className="font-sans text-sm font-bold text-brand">
            {STEP_DEFINITIONS[currentStep]?.label}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-grey-100">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Mini dots */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {STEP_DEFINITIONS.map((_, index) => (
            <div
              key={index}
              className={cn(
                "rounded-full transition-all duration-300",
                index < currentStep
                  ? "h-1.5 w-4 bg-accent"
                  : index === currentStep
                  ? "h-1.5 w-6 bg-accent"
                  : "h-1.5 w-1.5 bg-grey-200"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
