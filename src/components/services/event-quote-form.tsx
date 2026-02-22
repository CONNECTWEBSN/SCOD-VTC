"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Loader2, Calendar, Users, MapPin, MessageSquare } from "lucide-react";
import { cn } from "@/lib/cn";

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const quoteSchema = z.object({
  eventType: z.string().min(1, "Type d'événement requis"),
  date: z.string().min(1, "Date requise"),
  guests: z.string().min(1, "Nombre d'invités requis"),
  location: z.string().min(3, "Lieu requis"),
  needs: z.string().optional(),
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(9, "Téléphone invalide"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

// ─── Component ────────────────────────────────────────────────────────────────

export function EventQuoteForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      eventType: "",
      date: "",
      guests: "",
      location: "",
      needs: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    
    console.log("Quote request:", data);
    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after 3s
    setTimeout(() => {
      setIsSuccess(false);
      reset();
    }, 3000);
  };

  if (isSuccess) {
    return (
      <section id="devis" className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-hover py-20 lg:py-28">
        <div className="container px-6 lg:px-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-md"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500">
              <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-6 font-sans text-3xl font-bold text-white">
              Demande envoyée !
            </h3>
            <p className="mt-3 font-sans text-lg text-white/80">
              Nous vous répondons sous 24h avec un devis personnalisé
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="devis" className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-hover py-20 lg:py-28">
      {/* Grain texture */}
      <div
        className="grain-texture pointer-events-none absolute inset-0"
        style={{ opacity: 0.025 }}
      />

      <div className="container relative z-10 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="font-sans text-sm font-bold uppercase tracking-widest text-accent">
              Devis gratuit
            </p>
            <h2 className="mt-3 font-sans text-4xl font-bold text-white md:text-5xl">
              Demandez un devis personnalisé
            </h2>
            <p className="mt-4 font-sans text-lg text-white/80">
              Réponse sous 24h · Sans engagement
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md lg:p-8"
          >
            <div className="space-y-5">
              {/* Event type */}
              <div>
                <label className="mb-2 block font-sans text-sm font-semibold text-white/90">
                  Type d&apos;événement *
                </label>
                <Controller
                  name="eventType"
                  control={control}
                  render={({ field }) => (
                    <>
                      <select
                        {...field}
                        className={cn(
                          "h-[56px] w-full rounded-input border bg-white/10 px-4 font-sans text-base text-white backdrop-blur-sm focus:bg-white/15 focus:outline-none focus:ring-4",
                          errors.eventType
                            ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                            : "border-white/20 focus:border-accent focus:ring-accent/20"
                        )}
                      >
                        <option value="" className="text-grey-900">Sélectionnez...</option>
                        <option value="mariage" className="text-grey-900">Mariage / Cérémonie</option>
                        <option value="gala" className="text-grey-900">Soirée / Gala</option>
                        <option value="seminaire" className="text-grey-900">Séminaire / Congrès</option>
                        <option value="officielle" className="text-grey-900">Cérémonie officielle</option>
                        <option value="autre" className="text-grey-900">Autre</option>
                      </select>
                      {errors.eventType && (
                        <p className="mt-1.5 font-sans text-sm text-red-300">
                          {errors.eventType.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              {/* Date & guests */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-sans text-sm font-semibold text-white/90">
                    Date de l&apos;événement *
                  </label>
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <>
                        <div className="relative">
                          <Calendar className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                          <input
                            type="date"
                            {...field}
                            min={new Date().toISOString().split("T")[0]}
                            className={cn(
                              "h-[56px] w-full rounded-input border bg-white/10 pl-12 pr-4 font-sans text-base text-white backdrop-blur-sm focus:bg-white/15 focus:outline-none focus:ring-4",
                              errors.date
                                ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                                : "border-white/20 focus:border-accent focus:ring-accent/20"
                            )}
                          />
                        </div>
                        {errors.date && (
                          <p className="mt-1.5 font-sans text-sm text-red-300">
                            {errors.date.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                <div>
                  <label className="mb-2 block font-sans text-sm font-semibold text-white/90">
                    Nombre d&apos;invités *
                  </label>
                  <Controller
                    name="guests"
                    control={control}
                    render={({ field }) => (
                      <>
                        <div className="relative">
                          <Users className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                          <input
                            type="number"
                            {...field}
                            placeholder="ex: 50"
                            min="1"
                            className={cn(
                              "h-[56px] w-full rounded-input border bg-white/10 pl-12 pr-4 font-sans text-base text-white placeholder:text-white/40 backdrop-blur-sm focus:bg-white/15 focus:outline-none focus:ring-4",
                              errors.guests
                                ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                                : "border-white/20 focus:border-accent focus:ring-accent/20"
                            )}
                          />
                        </div>
                        {errors.guests && (
                          <p className="mt-1.5 font-sans text-sm text-red-300">
                            {errors.guests.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block font-sans text-sm font-semibold text-white/90">
                  Lieu de l&apos;événement *
                </label>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-accent" />
                        <input
                          type="text"
                          {...field}
                          placeholder="ex: Radisson Blu Dakar"
                          className={cn(
                            "h-[56px] w-full rounded-input border bg-white/10 pl-12 pr-4 font-sans text-base text-white placeholder:text-white/40 backdrop-blur-sm focus:bg-white/15 focus:outline-none focus:ring-4",
                            errors.location
                              ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                              : "border-white/20 focus:border-accent focus:ring-accent/20"
                          )}
                        />
                      </div>
                      {errors.location && (
                        <p className="mt-1.5 font-sans text-sm text-red-300">
                          {errors.location.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              {/* Needs */}
              <div>
                <label className="mb-2 block font-sans text-sm font-semibold text-white/90">
                  Besoins spécifiques{" "}
                  <span className="font-400 text-white/50">(optionnel)</span>
                </label>
                <Controller
                  name="needs"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <MessageSquare className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-white/40" />
                      <textarea
                        {...field}
                        rows={4}
                        placeholder="Décoration, type de véhicule, horaires..."
                        className="w-full rounded-input border border-white/20 bg-white/10 px-4 py-3.5 pl-12 font-sans text-base text-white placeholder:text-white/40 backdrop-blur-sm focus:border-accent focus:bg-white/15 focus:outline-none focus:ring-4 focus:ring-accent/20"
                      />
                    </div>
                  )}
                />
              </div>

              {/* Contact info */}
              <div className="grid gap-4 sm:grid-cols-3">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="mb-2 block font-sans text-sm font-semibold text-white/90">
                        Nom *
                      </label>
                      <input
                        type="text"
                        {...field}
                        className={cn(
                          "h-[52px] w-full rounded-input border bg-white/10 px-4 font-sans text-base text-white backdrop-blur-sm focus:bg-white/15 focus:outline-none focus:ring-4",
                          errors.name
                            ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                            : "border-white/20 focus:border-accent focus:ring-accent/20"
                        )}
                      />
                      {errors.name && (
                        <p className="mt-1 font-sans text-xs text-red-300">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="mb-2 block font-sans text-sm font-semibold text-white/90">
                        Email *
                      </label>
                      <input
                        type="email"
                        {...field}
                        className={cn(
                          "h-[52px] w-full rounded-input border bg-white/10 px-4 font-sans text-base text-white backdrop-blur-sm focus:bg-white/15 focus:outline-none focus:ring-4",
                          errors.email
                            ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                            : "border-white/20 focus:border-accent focus:ring-accent/20"
                        )}
                      />
                      {errors.email && (
                        <p className="mt-1 font-sans text-xs text-red-300">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="mb-2 block font-sans text-sm font-semibold text-white/90">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        {...field}
                        placeholder="+221 77 123 45 67"
                        className={cn(
                          "h-[52px] w-full rounded-input border bg-white/10 px-4 font-sans text-base text-white placeholder:text-white/40 backdrop-blur-sm focus:bg-white/15 focus:outline-none focus:ring-4",
                          errors.phone
                            ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                            : "border-white/20 focus:border-accent focus:ring-accent/20"
                        )}
                      />
                      {errors.phone && (
                        <p className="mt-1 font-sans text-xs text-red-300">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 flex h-[60px] w-full items-center justify-center gap-3 rounded-btn bg-accent font-sans text-lg font-bold text-brand shadow-[0_6px_24px_rgba(255,195,0,0.4)] transition-all hover:bg-accent-light hover:shadow-[0_8px_32px_rgba(255,195,0,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  Demander un devis gratuit
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>

            {/* Trust signal */}
            <p className="mt-6 text-center font-sans text-sm text-white/60">
              🔒 Vos données sont sécurisées · Réponse sous 24h
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
