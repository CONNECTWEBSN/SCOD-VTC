"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, CreditCard, Smartphone, Wallet, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  calculatePrice,
  formatFcfa,
  type ReservationData,
  type PaymentMethodId,
} from "../reservation-types";

// ─── Payment method definitions ───────────────────────────────────────────────

interface PaymentMethod {
  id: PaymentMethodId;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: "mobile-money" | "card" | "other";
  provider: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  // Mobile Money (PayTech)
  {
    id: "orange-money",
    name: "Orange Money",
    description: "Paiement sécurisé via Orange Money",
    icon: <Smartphone className="h-5 w-5" />,
    category: "mobile-money",
    provider: "PayTech",
  },
  {
    id: "wave",
    name: "Wave",
    description: "Paiement rapide et gratuit",
    icon: <Smartphone className="h-5 w-5" />,
    category: "mobile-money",
    provider: "PayTech",
  },
  {
    id: "free-money",
    name: "Free Money",
    description: "Paiement via Free Money",
    icon: <Smartphone className="h-5 w-5" />,
    category: "mobile-money",
    provider: "PayTech",
  },
  // Card (Stripe)
  {
    id: "card",
    name: "Carte bancaire",
    description: "Visa, Mastercard, Amex",
    icon: <CreditCard className="h-5 w-5" />,
    category: "card",
    provider: "Stripe",
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    description: "Paiement express",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
    ),
    category: "card",
    provider: "Stripe",
  },
  {
    id: "google-pay",
    name: "Google Pay",
    description: "Paiement rapide et sécurisé",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
    ),
    category: "card",
    provider: "Stripe",
  },
  // Other
  {
    id: "cash",
    name: "Espèces",
    description: "Paiement au chauffeur en fin de course",
    icon: <Wallet className="h-5 w-5" />,
    category: "other",
    provider: "Direct",
  },
  {
    id: "wave-business",
    name: "Wave Business",
    description: "Facturation entreprise (réservé aux comptes professionnels)",
    icon: <Smartphone className="h-5 w-5" />,
    category: "other",
    provider: "Wave Business",
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  "mobile-money": "Mobile Money (PayTech)",
  card: "Carte bancaire (Stripe)",
  other: "Autres moyens de paiement",
};

// ─── Payment method card ──────────────────────────────────────────────────────

interface PaymentMethodCardProps {
  method: PaymentMethod;
  selected: boolean;
  onSelect: () => void;
}

function PaymentMethodCard({ method, selected, onSelect }: PaymentMethodCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200",
        selected
          ? "border-accent bg-accent-soft shadow-[0_0_0_1px_#FFC300]"
          : "border-grey-200 bg-white hover:border-grey-300 hover:bg-grey-50"
      )}
      aria-pressed={selected}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
          selected ? "bg-accent text-brand" : "bg-grey-100 text-grey-500"
        )}
      >
        {method.icon}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "font-sans text-base font-bold transition-colors",
            selected ? "text-brand" : "text-grey-900"
          )}
        >
          {method.name}
        </p>
        <p className="mt-0.5 font-sans text-xs text-grey-500">{method.description}</p>
      </div>

      {/* Selection indicator */}
      <div
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
          selected ? "border-accent bg-accent" : "border-grey-300 bg-white"
        )}
      >
        {selected && <Check className="h-3 w-3 text-brand" strokeWidth={3} />}
      </div>
    </motion.button>
  );
}

// ─── Stripe card input placeholder ───────────────────────────────────────────

function StripeCardInput() {
  return (
    <div className="mt-4 rounded-xl border border-grey-100 bg-white p-4">
      <p className="mb-3 font-sans text-xs font-bold uppercase tracking-widest text-grey-500">
        Informations de carte
      </p>
      <div className="space-y-3">
        {/* Card number */}
        <div>
          <input
            type="text"
            placeholder="4242 4242 4242 4242"
            maxLength={19}
            className="h-[48px] w-full rounded-input border border-grey-200 bg-white px-4 font-sans text-[15px] text-grey-900 placeholder:text-grey-400 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15"
          />
        </div>

        {/* Expiry + CVC */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="MM / AA"
            maxLength={7}
            className="h-[48px] w-full rounded-input border border-grey-200 bg-white px-4 font-sans text-[15px] text-grey-900 placeholder:text-grey-400 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15"
          />
          <input
            type="text"
            placeholder="CVC"
            maxLength={4}
            className="h-[48px] w-full rounded-input border border-grey-200 bg-white px-4 font-sans text-[15px] text-grey-900 placeholder:text-grey-400 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15"
          />
        </div>
      </div>

      {/* Security badge */}
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-grey-50 px-3 py-2">
        <svg className="h-4 w-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <p className="font-sans text-xs text-grey-600">
          Paiement sécurisé par Stripe · Vos données sont chiffrées
        </p>
      </div>
    </div>
  );
}

// ─── Step component ───────────────────────────────────────────────────────────

interface StepPaymentProps {
  data: ReservationData;
  onSelectMethod: (method: PaymentMethodId) => void;
  isProcessing: boolean;
}

export function StepPayment({ data, onSelectMethod, isProcessing }: StepPaymentProps) {
  const price = calculatePrice(
    data.vehicleClass,
    data.distanceKm,
    data.time,
    data.pickup.address,
    data.dropoff.address
  );

  const groupedMethods = React.useMemo(() => {
    const groups: Record<string, PaymentMethod[]> = {
      "mobile-money": [],
      card: [],
      other: [],
    };
    PAYMENT_METHODS.forEach((m) => groups[m.category].push(m));
    return groups;
  }, []);

  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === data.paymentMethod);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-sans text-2xl font-bold text-grey-900 md:text-3xl">
          Paiement
        </h2>
        <p className="mt-1 font-sans text-sm text-grey-500">
          Acompte de {formatFcfa(price.deposit)} FCFA pour confirmer (30%)
        </p>
      </div>

      {/* Payment methods grouped by category */}
      <div className="space-y-6">
        {Object.entries(groupedMethods).map(([category, methods]) => (
          <div key={category}>
            <p className="mb-3 font-sans text-xs font-bold uppercase tracking-widest text-grey-400">
              {CATEGORY_LABELS[category]}
            </p>
            <div className="flex flex-col gap-2">
              {methods.map((method) => (
                <PaymentMethodCard
                  key={method.id}
                  method={method}
                  selected={data.paymentMethod === method.id}
                  onSelect={() => onSelectMethod(method.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Stripe card input when card selected */}
      {selectedMethod?.category === "card" && selectedMethod.id === "card" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <StripeCardInput />
        </motion.div>
      )}

      {/* Payment summary */}
      <div className="rounded-xl border border-grey-100 bg-gradient-to-br from-brand/5 to-accent/5 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-sans text-sm text-grey-600">Acompte à régler</p>
            <p className="mt-0.5 font-sans text-3xl font-bold text-brand">
              {formatFcfa(price.deposit)}{" "}
              <span className="font-sans text-base font-400 text-grey-500">FCFA</span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-sans text-xs text-grey-500">Total course</p>
            <p className="font-sans text-lg font-bold text-grey-700">
              {formatFcfa(price.total)} FCFA
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-lg bg-white/60 px-3 py-2">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          <p className="font-sans text-xs text-grey-600">
            Le solde de{" "}
            <span className="font-bold">{formatFcfa(price.total - price.deposit)} FCFA</span>{" "}
            sera réglé en fin de course
            {data.paymentMethod === "cash"
              ? " en espèces au chauffeur"
              : " via le même moyen de paiement"}.
          </p>
        </div>
      </div>

      {/* Terms */}
      <div className="rounded-xl border border-grey-100 bg-grey-50 p-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-grey-300 text-accent focus:ring-2 focus:ring-accent/20"
            defaultChecked
          />
          <label htmlFor="terms" className="cursor-pointer font-sans text-sm text-grey-600">
            J&apos;accepte les{" "}
            <a href="/legal/cgv" className="font-semibold text-brand hover:underline">
              conditions générales de vente
            </a>{" "}
            et la{" "}
            <a
              href="/legal/confidentialite"
              className="font-semibold text-brand hover:underline"
            >
              politique de confidentialité
            </a>
            . J&apos;ai compris la politique d&apos;annulation.
          </label>
        </div>
      </div>

      {/* Processing state */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-3 rounded-xl bg-accent/10 py-4"
        >
          <Loader2 className="h-5 w-5 animate-spin text-brand" />
          <p className="font-sans text-sm font-semibold text-brand">
            Traitement du paiement en cours…
          </p>
        </motion.div>
      )}
    </div>
  );
}
