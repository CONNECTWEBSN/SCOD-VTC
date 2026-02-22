"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X, Download, CheckCircle2, Star, CreditCard } from "lucide-react";
import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────── */

type PaymentStatus = "success" | "pending" | "failed";
type MethodType    = "wave" | "orange" | "free" | "stripe" | "cash";

interface PaymentMethod {
  id:        string;
  type:      MethodType;
  label:     string;
  masked:    string;
  isDefault: boolean;
}

interface Transaction {
  id:       string;
  date:     string;
  summary:  string;
  amount:   number;
  method:   MethodType;
  status:   PaymentStatus;
}

/* ─────────────────────────────────────────────────────────
   Mock data
───────────────────────────────────────────────────────── */

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "1", type: "wave",   label: "Wave",         masked: "****67",   isDefault: true  },
  { id: "2", type: "orange", label: "Orange Money", masked: "****12",   isDefault: false },
  { id: "3", type: "stripe", label: "Visa",         masked: "****4242", isDefault: false },
];

const TRANSACTIONS: Transaction[] = [
  { id: "TX-001", date: "22 Fév 2026",  summary: "Plateau → AIBD",          amount: 45000, method: "wave",   status: "success" },
  { id: "TX-002", date: "19 Fév 2026",  summary: "AIBD → Radisson Blu",     amount: 55000, method: "stripe", status: "success" },
  { id: "TX-003", date: "15 Fév 2026",  summary: "Saly → Dakar",            amount: 62000, method: "orange", status: "success" },
  { id: "TX-004", date: "10 Fév 2026",  summary: "Mermoz → AIBD",           amount: 45000, method: "wave",   status: "failed"  },
  { id: "TX-005", date: "05 Fév 2026",  summary: "Almadies → CIS Dakar",    amount: 22000, method: "wave",   status: "success" },
  { id: "TX-006", date: "28 Jan 2026",  summary: "AIBD → Hôtel Terrou-Bi",  amount: 48000, method: "stripe", status: "success" },
  { id: "TX-007", date: "20 Jan 2026",  summary: "Plateau → Mermoz",        amount: 18000, method: "orange", status: "pending" },
];

/* ─────────────────────────────────────────────────────────
   Method icons (SVG inline)
───────────────────────────────────────────────────────── */

function MethodIcon({ type, size = 24 }: { type: MethodType; size?: number }) {
  const s = size;
  if (type === "wave") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect width="40" height="40" rx="10" fill="#0066FF" />
        <path d="M8 20c4-8 8-8 12 0s8 8 12 0" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  if (type === "orange") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect width="40" height="40" rx="10" fill="#FF6600" />
        <circle cx="20" cy="20" r="9" stroke="white" strokeWidth="3" fill="none" />
        <circle cx="20" cy="20" r="4" fill="white" />
      </svg>
    );
  }
  if (type === "free") {
    return (
      <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect width="40" height="40" rx="10" fill="#CC0000" />
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontWeight="bold" fontSize="13">Free</text>
      </svg>
    );
  }
  if (type === "stripe") {
    return (
      <svg width={s} height={s * 0.625} viewBox="0 0 780 500" aria-hidden>
        <rect width="780" height="500" rx="40" fill="#1A1F71" />
        <rect x="120" y="200" width="540" height="100" rx="8" fill="white" />
        <rect x="120" y="200" width="200" height="100" rx="8" fill="#F7B731" />
      </svg>
    );
  }
  if (type === "cash") {
    return (
      <div
        style={{ width: s, height: s }}
        className="flex items-center justify-center rounded-xl bg-green-100"
      >
        <span className="text-[14px]">💵</span>
      </div>
    );
  }
  return <CreditCard className="h-6 w-6 text-grey-400" />;
}

/* ─────────────────────────────────────────────────────────
   Status badge
───────────────────────────────────────────────────────── */

const STATUS_CFG: Record<PaymentStatus, { label: string; cls: string }> = {
  success: { label: "Payé",      cls: "bg-green-100 text-green-700" },
  pending: { label: "En attente", cls: "bg-amber-100 text-amber-700" },
  failed:  { label: "Échoué",    cls: "bg-red-100 text-red-600"    },
};

/* ─────────────────────────────────────────────────────────
   Add payment modal
───────────────────────────────────────────────────────── */

const ADD_OPTIONS: { type: MethodType; label: string; desc: string }[] = [
  { type: "wave",   label: "Wave",                desc: "Entrez votre numéro Wave" },
  { type: "orange", label: "Orange Money",        desc: "Entrez votre numéro Orange" },
  { type: "free",   label: "Free Money",          desc: "Entrez votre numéro Free" },
  { type: "stripe", label: "Carte bancaire (CB)", desc: "Visa, Mastercard, Amex" },
];

function AddPaymentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selected, setSelected] = useState<MethodType | null>(null);
  const [phone, setPhone]       = useState("");
  const [done, setDone]         = useState(false);

  const handleAdd = async () => {
    await new Promise((r) => setTimeout(r, 800));
    setDone(true);
    setTimeout(() => { setDone(false); setSelected(null); setPhone(""); onClose(); }, 1500);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-brand-dark/60 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-7 shadow-2xl"
              >
                <div className="mb-5 flex items-center justify-between">
                  <Dialog.Title className="font-sans text-[20px] font-bold text-grey-900">
                    Ajouter un moyen de paiement
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="rounded-lg p-1.5 text-grey-400 hover:bg-grey-100 hover:text-grey-700">
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>

                {done ? (
                  <div className="flex flex-col items-center gap-3 py-8 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                    <p className="font-sans text-[17px] font-bold text-grey-900">
                      Moyen de paiement ajouté !
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-5 grid gap-2 sm:grid-cols-2">
                      {ADD_OPTIONS.map((opt) => (
                        <button
                          key={opt.type}
                          type="button"
                          onClick={() => setSelected(opt.type)}
                          className={cn(
                            "flex items-center gap-3 rounded-xl border-2 px-3 py-3 text-left transition-all",
                            selected === opt.type
                              ? "border-accent bg-accent/5"
                              : "border-grey-200 hover:border-grey-300"
                          )}
                        >
                          <MethodIcon type={opt.type} size={32} />
                          <div>
                            <p className="text-[13px] font-semibold text-grey-900">{opt.label}</p>
                            <p className="text-[11px] text-grey-400">{opt.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {selected && selected !== "stripe" && (
                      <div className="mb-4">
                        <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                          Numéro de téléphone
                        </label>
                        <div className="flex gap-2">
                          <div className="flex h-12 shrink-0 items-center gap-1.5 rounded-xl border-2 border-grey-200 bg-grey-50 px-3">
                            <span>🇸🇳</span>
                            <span className="text-[13px] font-semibold text-grey-500">+221</span>
                          </div>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="77 000 00 00"
                            className="h-12 flex-1 rounded-xl border-2 border-grey-200 px-4 text-[15px] outline-none focus:border-accent focus:shadow-lg focus:shadow-accent/10"
                          />
                        </div>
                      </div>
                    )}

                    {selected === "stripe" && (
                      <div className="mb-4 rounded-xl border-2 border-grey-200 bg-grey-50 p-4 text-center text-[13px] text-grey-500">
                        Vous serez redirigé vers Stripe pour saisir vos données de carte (PCI compliant).
                      </div>
                    )}

                    <button
                      disabled={!selected || (selected !== "stripe" && phone.length < 8)}
                      onClick={handleAdd}
                      className={cn(
                        "flex h-12 w-full items-center justify-center rounded-xl font-bold text-[14px] text-brand",
                        "bg-accent shadow-lg shadow-accent/20 transition-all hover:bg-accent-light",
                        "disabled:cursor-not-allowed disabled:opacity-40"
                      )}
                    >
                      Ajouter ce moyen de paiement
                    </button>
                  </>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */

export default function PaiementsPage() {
  const [methods, setMethods]   = useState<PaymentMethod[]>(PAYMENT_METHODS);
  const [modalOpen, setModal]   = useState(false);
  const [page, setPage]         = useState(1);
  const PER_PAGE = 5;
  const paginated = TRANSACTIONS.slice(0, page * PER_PAGE);
  const hasMore   = paginated.length < TRANSACTIONS.length;

  const setDefault = (id: string) => {
    setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
  };

  const removeMethod = (id: string) => {
    setMethods((prev) => prev.filter((m) => m.id !== id));
  };

  const exportCSV = () => {
    const rows = [
      ["ID", "Date", "Trajet", "Montant (FCFA)", "Méthode", "Statut"],
      ...TRANSACTIONS.map((t) => [t.id, t.date, t.summary, t.amount, t.method, t.status]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "transactions-scod-vtc.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const total = TRANSACTIONS.filter((t) => t.status === "success")
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="mb-6">
        <h2 className="font-sans text-[24px] font-bold text-grey-900">Mes paiements</h2>
        <p className="mt-1 text-[14px] text-grey-500">
          Gérez vos moyens de paiement et consultez vos transactions.
        </p>
      </div>

      {/* Summary card */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total dépensé",     value: `${total.toLocaleString("fr-FR")} FCFA`, accent: true },
          { label: "Transactions",       value: `${TRANSACTIONS.filter((t) => t.status === "success").length} réussies` },
          { label: "Moyen favori",       value: "Wave" },
        ].map(({ label, value, accent }) => (
          <div key={label} className="rounded-2xl border-2 border-grey-200 bg-white px-5 py-4">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-grey-500">{label}</p>
            <p className={cn("mt-1 font-sans text-[20px] font-bold", accent ? "text-accent" : "text-grey-900")}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Payment methods ───────────────────────── */}
      <div className="rounded-2xl border-2 border-grey-200 bg-white">
        <div className="flex items-center justify-between border-b border-grey-100 px-6 py-4">
          <h3 className="font-sans text-[16px] font-bold text-grey-900">
            Moyens de paiement
          </h3>
          <button
            onClick={() => setModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-accent px-3 py-2 font-bold text-[12.5px] text-brand shadow-md shadow-accent/15 transition-colors hover:bg-accent-light"
          >
            <Plus className="h-3.5 w-3.5" />
            Ajouter
          </button>
        </div>

        <div className="divide-y divide-grey-100">
          {methods.map((method) => (
            <motion.div
              key={method.id}
              layout
              className="flex items-center gap-4 px-6 py-4"
            >
              <MethodIcon type={method.type} size={36} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-grey-900">{method.label}</p>
                  {method.isDefault && (
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                      Par défaut
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-grey-500">{method.masked}</p>
              </div>
              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <button
                    onClick={() => setDefault(method.id)}
                    className="rounded-lg px-3 py-1.5 text-[12px] font-medium text-grey-500 transition-colors hover:bg-grey-100 hover:text-grey-800"
                  >
                    Définir par défaut
                  </button>
                )}
                <button
                  onClick={() => removeMethod(method.id)}
                  className="rounded-lg p-1.5 text-grey-300 transition-colors hover:bg-red-50 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}

          {methods.length === 0 && (
            <div className="px-6 py-10 text-center text-[14px] text-grey-400">
              Aucun moyen de paiement enregistré.
            </div>
          )}
        </div>
      </div>

      {/* ── Transaction history ───────────────────── */}
      <div className="rounded-2xl border-2 border-grey-200 bg-white">
        <div className="flex items-center justify-between border-b border-grey-100 px-6 py-4">
          <h3 className="font-sans text-[16px] font-bold text-grey-900">
            Historique des transactions
          </h3>
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 rounded-xl border-2 border-grey-200 px-3 py-2 text-[12.5px] font-semibold text-grey-600 transition-colors hover:border-grey-300 hover:bg-grey-50"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>

        {/* Table header */}
        <div className="hidden grid-cols-[1fr_2fr_auto_auto_auto] gap-4 border-b border-grey-100 px-6 py-2.5 sm:grid">
          {["Date", "Trajet", "Montant", "Méthode", "Statut"].map((h) => (
            <span key={h} className="text-[11px] font-bold uppercase tracking-wider text-grey-400">
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-grey-100">
          <AnimatePresence initial={false}>
            {paginated.map((tx) => {
              const { label: stLabel, cls: stCls } = STATUS_CFG[tx.status];
              return (
                <motion.div
                  key={tx.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid gap-2 px-6 py-4 sm:grid-cols-[1fr_2fr_auto_auto_auto] sm:items-center sm:gap-4"
                >
                  <p className="text-[13px] text-grey-500">{tx.date}</p>
                  <p className="text-[14px] font-medium text-grey-900">{tx.summary}</p>
                  <p className="font-sans text-[15px] font-bold text-grey-900">
                    {tx.amount.toLocaleString("fr-FR")}
                    <span className="ml-1 text-[11px] font-normal text-grey-400">FCFA</span>
                  </p>
                  <div className="flex items-center">
                    <MethodIcon type={tx.method} size={20} />
                  </div>
                  <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold", stCls)}>
                    {stLabel}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="border-t border-grey-100 px-6 py-4 text-center">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="text-[13px] font-semibold text-accent hover:underline underline-offset-4"
            >
              Voir plus de transactions
            </button>
          </div>
        )}
        {!hasMore && TRANSACTIONS.length > PER_PAGE && (
          <p className="border-t border-grey-100 px-6 py-4 text-center text-[12px] text-grey-400">
            Toutes les transactions ont été chargées · {TRANSACTIONS.length} au total
          </p>
        )}
      </div>

      {/* Add payment modal */}
      <AddPaymentModal open={modalOpen} onClose={() => setModal(false)} />
    </div>
  );
}
