"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Loader2, Calendar, Clock, MapPin, Users, MessageSquare } from "lucide-react";
import { cn } from "@/lib/cn";

const locationSchema = z.object({
  type: z.string().min(1, "Type de location requis"),
  startDate: z.string().min(1, "Date de début requise"),
  duration: z.string().min(1, "Durée requise"),
  pickup: z.string().min(3, "Lieu de prise en charge requis"),
  passengers: z.string().min(1, "Nombre de passagers requis"),
  needs: z.string().optional(),
});

type LocationFormData = z.infer<typeof locationSchema>;

export function LocationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      type: "",
      startDate: "",
      duration: "",
      pickup: "",
      passengers: "",
      needs: "",
    },
  });

  const onSubmit = async (data: LocationFormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    
    const params = new URLSearchParams({
      type: data.type,
      date: data.startDate,
      duration: data.duration,
      pickup: data.pickup,
      passengers: data.passengers,
    });
    router.push(`/reservation?${params.toString()}`);
  };

  return (
    <section className="relative -mt-20 overflow-hidden bg-white py-12">
      <div className="container px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto max-w-[680px]"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-hidden rounded-card border border-grey-100 bg-white p-8 shadow-2xl"
          >
            <div className="mb-6 text-center">
              <h2 className="font-sans text-2xl font-bold text-grey-900">
                Demander un devis
              </h2>
              <p className="mt-1 font-sans text-sm text-grey-500">
                Réponse immédiate avec tarif garanti
              </p>
            </div>

            <div className="space-y-4">
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="mb-2 block font-sans text-sm font-semibold text-grey-700">
                      Type de location *
                    </label>
                    <select
                      {...field}
                      className={cn(
                        "h-[52px] w-full rounded-input border bg-white px-4 font-sans text-[15px] text-grey-900 focus:outline-none focus:ring-4",
                        errors.type
                          ? "border-error focus:border-error focus:ring-error/15"
                          : "border-grey-200 focus:border-accent focus:ring-accent/15"
                      )}
                    >
                      <option value="">Sélectionnez...</option>
                      <option value="half-day">Demi-journée (4h)</option>
                      <option value="full-day">Journée (8h)</option>
                      <option value="week">Semaine</option>
                      <option value="custom">Sur mesure</option>
                    </select>
                    {errors.type && (
                      <p className="mt-1 font-sans text-sm text-error">{errors.type.message}</p>
                    )}
                  </div>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="mb-2 block font-sans text-sm font-semibold text-grey-700">
                        Date de début *
                      </label>
                      <div className="relative">
                        <Calendar className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-grey-400" />
                        <input
                          type="date"
                          {...field}
                          min={new Date().toISOString().split("T")[0]}
                          className={cn(
                            "h-[52px] w-full rounded-input border bg-white pl-12 pr-4 font-sans text-[15px] text-grey-900 focus:outline-none focus:ring-4",
                            errors.startDate
                              ? "border-error focus:border-error focus:ring-error/15"
                              : "border-grey-200 focus:border-accent focus:ring-accent/15"
                          )}
                        />
                      </div>
                      {errors.startDate && (
                        <p className="mt-1 font-sans text-sm text-error">{errors.startDate.message}</p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="duration"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="mb-2 block font-sans text-sm font-semibold text-grey-700">
                        Durée *
                      </label>
                      <div className="relative">
                        <Clock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-grey-400" />
                        <input
                          type="text"
                          {...field}
                          placeholder="ex: 3 jours"
                          className={cn(
                            "h-[52px] w-full rounded-input border bg-white pl-12 pr-4 font-sans text-[15px] text-grey-900 placeholder:text-grey-400 focus:outline-none focus:ring-4",
                            errors.duration
                              ? "border-error focus:border-error focus:ring-error/15"
                              : "border-grey-200 focus:border-accent focus:ring-accent/15"
                          )}
                        />
                      </div>
                      {errors.duration && (
                        <p className="mt-1 font-sans text-sm text-error">{errors.duration.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>

              <Controller
                name="pickup"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="mb-2 block font-sans text-sm font-semibold text-grey-700">
                      Lieu de prise en charge *
                    </label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-accent" />
                      <input
                        type="text"
                        {...field}
                        placeholder="ex: Almadies, Dakar"
                        className={cn(
                          "h-[52px] w-full rounded-input border bg-white pl-12 pr-4 font-sans text-[15px] text-grey-900 placeholder:text-grey-400 focus:outline-none focus:ring-4",
                          errors.pickup
                            ? "border-error focus:border-error focus:ring-error/15"
                            : "border-grey-200 focus:border-accent focus:ring-accent/15"
                        )}
                      />
                    </div>
                    {errors.pickup && (
                      <p className="mt-1 font-sans text-sm text-error">{errors.pickup.message}</p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="passengers"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="mb-2 block font-sans text-sm font-semibold text-grey-700">
                      Nombre de passagers *
                    </label>
                    <div className="relative">
                      <Users className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-grey-400" />
                      <input
                        type="number"
                        {...field}
                        placeholder="ex: 4"
                        min="1"
                        max="8"
                        className={cn(
                          "h-[52px] w-full rounded-input border bg-white pl-12 pr-4 font-sans text-[15px] text-grey-900 placeholder:text-grey-400 focus:outline-none focus:ring-4",
                          errors.passengers
                            ? "border-error focus:border-error focus:ring-error/15"
                            : "border-grey-200 focus:border-accent focus:ring-accent/15"
                        )}
                      />
                    </div>
                    {errors.passengers && (
                      <p className="mt-1 font-sans text-sm text-error">{errors.passengers.message}</p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="needs"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="mb-2 block font-sans text-sm font-semibold text-grey-700">
                      Besoins spécifiques{" "}
                      <span className="font-400 text-grey-400">(optionnel)</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-grey-400" />
                      <textarea
                        {...field}
                        rows={3}
                        placeholder="Itinéraire, horaires, équipements..."
                        className="w-full rounded-input border border-grey-200 bg-white px-4 py-3.5 pl-12 font-sans text-[15px] text-grey-900 placeholder:text-grey-400 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15"
                      />
                    </div>
                  </div>
                )}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 flex h-[56px] w-full items-center justify-center gap-2 rounded-btn bg-accent font-sans text-base font-bold text-brand shadow-[0_4px_16px_rgba(255,195,0,0.3)] transition-all hover:bg-accent-light hover:shadow-[0_6px_20px_rgba(255,195,0,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Chargement...
                </>
              ) : (
                <>
                  Obtenir un devis
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            <p className="mt-4 text-center font-sans text-xs text-grey-400">
              Tarif fixe garanti · Sans engagement
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
