"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, Calendar, Clock, Car, Download, MessageSquare } from "lucide-react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/cn";
import { formatFcfa, VEHICLES, MOCK_DRIVERS, type ReservationData } from "./reservation-types";

interface SuccessScreenProps {
  bookingRef: string;
  data: ReservationData;
  totalAmount: number;
  depositAmount: number;
}

export function SuccessScreen({
  bookingRef,
  data,
  totalAmount,
  depositAmount,
}: SuccessScreenProps) {
  const vehicle = VEHICLES.find((v) => v.id === data.vehicleClass)!;
  const driver = MOCK_DRIVERS[data.vehicleClass];

  const formattedDate = data.isEarliest
    ? "Au plus tôt"
    : data.date
    ? format(parseISO(data.date), "EEEE d MMMM yyyy", { locale: fr })
    : "";

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-20" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-2xl shadow-emerald-500/40">
              <CheckCircle className="h-14 w-14 text-white" strokeWidth={2} />
            </div>
          </div>
        </motion.div>

        {/* Success message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="font-sans text-4xl font-bold text-grey-900 md:text-5xl">
            Réservation confirmée !
          </h1>
          <p className="mt-3 font-sans text-lg text-grey-600">
            Votre chauffeur {driver.name} vous a été assigné
          </p>

          {/* Booking reference */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-grey-100 bg-gradient-to-br from-brand/5 to-accent/5 px-6 py-4">
            <div className="text-left">
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-grey-400">
                Référence
              </p>
              <p className="mt-0.5 font-mono text-2xl font-bold tracking-wider text-brand">
                {bookingRef}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Booking details card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 overflow-hidden rounded-2xl border border-grey-100 bg-white shadow-xl"
        >
          {/* Route */}
          <div className="divide-y divide-grey-50 bg-gradient-to-br from-grey-50 to-white px-6 py-1">
            <div className="flex items-start gap-4 py-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <div className="min-w-0 flex-1">
                <p className="font-sans text-xs font-semibold uppercase tracking-wide text-grey-400">
                  Départ
                </p>
                <p className="mt-1 font-sans text-base font-semibold text-grey-900">
                  {data.pickup.address}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 py-4">
              <div className="mt-1 h-5 w-5 shrink-0 rounded-full border-2 border-brand" />
              <div className="min-w-0 flex-1">
                <p className="font-sans text-xs font-semibold uppercase tracking-wide text-grey-400">
                  Arrivée
                </p>
                <p className="mt-1 font-sans text-base font-semibold text-grey-900">
                  {data.dropoff.address}
                </p>
              </div>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-px bg-grey-100 p-px">
            {[
              {
                icon: Calendar,
                label: "Date",
                value: formattedDate,
              },
              {
                icon: Clock,
                label: "Heure",
                value: data.isEarliest ? "Au plus tôt" : data.time,
              },
              {
                icon: Car,
                label: "Véhicule",
                value: vehicle.name,
              },
              {
                icon: CheckCircle,
                label: "Acompte réglé",
                value: `${formatFcfa(depositAmount)} FCFA`,
              },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white px-6 py-4">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-grey-400" />
                  <p className="font-sans text-xs font-semibold uppercase tracking-wide text-grey-400">
                    {label}
                  </p>
                </div>
                <p className="mt-1.5 font-sans text-sm font-bold capitalize text-grey-900 first-letter:uppercase">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="bg-gradient-to-br from-brand/5 to-accent/5 px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-sans text-sm text-grey-600">Total TTC</p>
                <p className="mt-0.5 font-sans text-2xl font-bold text-brand">
                  {formatFcfa(totalAmount)}{" "}
                  <span className="font-sans text-base font-400 text-grey-500">FCFA</span>
                </p>
              </div>
              <div className="text-right">
                <p className="font-sans text-xs text-grey-500">Solde restant</p>
                <p className="font-sans text-lg font-bold text-grey-700">
                  {formatFcfa(totalAmount - depositAmount)} FCFA
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-btn bg-brand px-6 py-4 font-sans text-base font-bold text-white transition-all hover:bg-brand-hover hover:shadow-lg"
          >
            <Download className="h-5 w-5" />
            Télécharger le reçu
          </button>

          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-btn border-2 border-brand bg-white px-6 py-4 font-sans text-base font-bold text-brand transition-all hover:bg-brand/5"
          >
            <MessageSquare className="h-5 w-5" />
            Contacter le chauffeur
          </button>
        </motion.div>

        {/* Next steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 rounded-xl bg-blue-50 p-5"
        >
          <p className="mb-3 font-sans text-sm font-bold text-blue-900">
            Prochaines étapes :
          </p>
          <ol className="space-y-2">
            {[
              "Vous recevrez un SMS et un email de confirmation immédiatement",
              "Le jour de votre course, votre chauffeur vous contactera 15 min avant",
              "Suivez votre trajet en temps réel depuis votre espace client",
            ].map((step: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-200 font-sans text-xs font-bold text-blue-900">
                  {i + 1}
                </span>
                <span className="font-sans text-sm text-blue-800">{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* Return link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <a
            href="/"
            className="font-sans text-sm font-semibold text-brand hover:underline"
          >
            ← Retour à l&apos;accueil
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
