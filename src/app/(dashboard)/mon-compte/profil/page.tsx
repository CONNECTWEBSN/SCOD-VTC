"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, Plus, X, Home, Briefcase, Plane, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────────────────────
   Schema
───────────────────────────────────────────────────────── */

const profileSchema = z.object({
  firstName:    z.string().min(2, "Requis"),
  lastName:     z.string().min(2, "Requis"),
  email:        z.string().email("Email invalide").or(z.literal("")),
  vehicle:      z.string(),
  temperature:  z.string(),
  water:        z.boolean(),
});

type ProfileData = z.infer<typeof profileSchema>;

/* ─────────────────────────────────────────────────────────
   Static data
───────────────────────────────────────────────────────── */

interface FavoriteAddress {
  id:   string;
  type: "home" | "work" | "airport" | "other";
  label: string;
  address: string;
}

const INITIAL_FAVORITES: FavoriteAddress[] = [
  { id: "1", type: "home",    label: "Domicile", address: "Mermoz, Dakar" },
  { id: "2", type: "work",    label: "Bureau",   address: "Plateau, Dakar Centre" },
  { id: "3", type: "airport", label: "Aéroport", address: "Aéroport AIBD, Diass" },
];

const ADDRESS_ICONS = {
  home:    { Icon: Home,      color: "text-blue-500",  bg: "bg-blue-100"   },
  work:    { Icon: Briefcase, color: "text-violet-500", bg: "bg-violet-100" },
  airport: { Icon: Plane,     color: "text-cyan-500",  bg: "bg-cyan-100"   },
  other:   { Icon: Home,      color: "text-grey-500",  bg: "bg-grey-100"   },
};

/* ─────────────────────────────────────────────────────────
   Shared input style
───────────────────────────────────────────────────────── */

const inputCls = (err?: boolean) =>
  cn(
    "h-12 w-full rounded-xl border-2 bg-white px-4 text-[15px] text-grey-900",
    "placeholder:text-grey-400 outline-none transition-all duration-200",
    "focus:border-accent focus:shadow-lg focus:shadow-accent/10",
    "disabled:bg-grey-50 disabled:text-grey-400 disabled:cursor-not-allowed",
    err ? "border-red-400" : "border-grey-200"
  );

/* ─────────────────────────────────────────────────────────
   Toggle switch
───────────────────────────────────────────────────────── */

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-200",
        checked ? "border-accent bg-accent" : "border-grey-300 bg-grey-200"
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "h-4 w-4 rounded-full shadow-sm",
          checked ? "translate-x-5 bg-brand" : "translate-x-0.5 bg-white"
        )}
        style={{ marginLeft: checked ? 0 : undefined }}
      />
    </button>
  );
}

/* ─────────────────────────────────────────────────────────
   Section wrapper
───────────────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-grey-200 bg-white">
      <div className="border-b border-grey-100 px-6 py-4">
        <h3 className="font-sans text-[16px] font-bold text-grey-900">{title}</h3>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */

export default function ProfilPage() {
  const [favorites, setFavorites]     = useState<FavoriteAddress[]>(INITIAL_FAVORITES);
  const [newAddress, setNewAddress]   = useState("");
  const [addingAddr, setAddingAddr]   = useState(false);
  const [saved, setSaved]             = useState(false);
  const [waterOn, setWaterOn]         = useState(true);
  const [initials]                    = useState("MS");

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } =
    useForm<ProfileData>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        firstName:   "Moussa",
        lastName:    "Sarr",
        email:       "moussa.sarr@email.com",
        vehicle:     "berline",
        temperature: "normale",
        water:       true,
      },
    });

  const water = watch("water");

  const onSave = async (_data: ProfileData) => {
    await new Promise((r) => setTimeout(r, 900));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const addFavorite = () => {
    if (!newAddress.trim()) return;
    setFavorites((prev) => [
      ...prev,
      { id: Date.now().toString(), type: "other", label: "Adresse", address: newAddress.trim() },
    ]);
    setNewAddress("");
    setAddingAddr(false);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="mb-6">
        <h2 className="font-sans text-[24px] font-bold text-grey-900">Mon profil</h2>
        <p className="mt-1 text-[14px] text-grey-500">
          Gérez vos informations et préférences de transport.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSave)} className="space-y-6">

        {/* ── Avatar + identity ─────────────────────── */}
        <Section title="Informations personnelles">
          {/* Avatar */}
          <div className="mb-6 flex items-center gap-5">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-hover font-sans text-[24px] font-bold text-white shadow-lg">
                {initials}
              </div>
              <button
                type="button"
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-accent shadow-md transition-colors hover:bg-accent-light"
              >
                <Camera className="h-3.5 w-3.5 text-brand" />
              </button>
            </div>
            <div>
              <p className="font-semibold text-grey-900">Moussa Sarr</p>
              <p className="text-[13px] text-grey-500">Membre depuis Janvier 2025</p>
              <p className="mt-1 text-[12px] font-medium text-green-600">✓ Compte vérifié</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">Prénom</label>
              <input {...register("firstName")} className={inputCls(!!errors.firstName)} />
              {errors.firstName && (
                <p className="mt-1 text-[12px] text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">Nom</label>
              <input {...register("lastName")} className={inputCls(!!errors.lastName)} />
              {errors.lastName && (
                <p className="mt-1 text-[12px] text-red-500">{errors.lastName.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                Téléphone{" "}
                <span className="font-normal text-grey-400">(non modifiable)</span>
              </label>
              <div className="flex gap-2">
                <div className="flex h-12 shrink-0 items-center gap-1.5 rounded-xl border-2 border-grey-200 bg-grey-50 px-3">
                  <span className="text-[16px]">🇸🇳</span>
                  <span className="text-[13px] font-semibold text-grey-500">+221</span>
                </div>
                <input
                  disabled
                  value="77 123 45 67"
                  className={inputCls(false)}
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="votre@email.com"
                className={inputCls(!!errors.email)}
              />
              {errors.email && (
                <p className="mt-1 text-[12px] text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>
        </Section>

        {/* ── Favorite addresses ────────────────────── */}
        <Section title="Adresses favorites">
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {favorites.map((fav) => {
                const cfg = ADDRESS_ICONS[fav.type];
                const Icon = cfg.Icon;
                return (
                  <motion.div
                    key={fav.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-3 rounded-xl border-2 border-grey-200 bg-grey-50 px-4 py-3"
                  >
                    <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", cfg.bg)}>
                      <Icon className={cn("h-4.5 w-4.5", cfg.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-bold uppercase tracking-wider text-grey-500">
                        {fav.label}
                      </p>
                      <p className="truncate text-[14px] font-medium text-grey-900">{fav.address}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFavorite(fav.id)}
                      className="shrink-0 rounded-lg p-1 text-grey-400 transition-colors hover:bg-red-100 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Add new */}
            <AnimatePresence>
              {addingAddr ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-2"
                >
                  <input
                    autoFocus
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addFavorite()}
                    placeholder="Saisissez une adresse..."
                    className={cn(inputCls(), "flex-1")}
                  />
                  <button
                    type="button"
                    onClick={addFavorite}
                    className="h-12 rounded-xl bg-accent px-4 font-bold text-[13px] text-brand hover:bg-accent-light"
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddingAddr(false)}
                    className="h-12 rounded-xl border-2 border-grey-200 px-3 text-grey-500 hover:bg-grey-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ) : (
                <button
                  key="add-btn"
                  type="button"
                  onClick={() => setAddingAddr(true)}
                  className="flex items-center gap-2 rounded-xl border-2 border-dashed border-grey-300 px-4 py-3 text-[13.5px] font-medium text-grey-500 transition-colors hover:border-accent/40 hover:text-accent w-full"
                >
                  <Plus className="h-4 w-4" />
                  Ajouter une adresse favorite
                </button>
              )}
            </AnimatePresence>
          </div>
        </Section>

        {/* ── Preferences ───────────────────────────── */}
        <Section title="Préférences de course">
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                  Véhicule favori
                </label>
                <select
                  {...register("vehicle")}
                  className={cn(inputCls(), "cursor-pointer appearance-none")}
                >
                  <option value="berline">Berline (Confort)</option>
                  <option value="suv">SUV (Espace)</option>
                  <option value="vip">VIP (Prestige)</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                  Température habituelle
                </label>
                <select
                  {...register("temperature")}
                  className={cn(inputCls(), "cursor-pointer appearance-none")}
                >
                  <option value="fraiche">Fraîche (20°C)</option>
                  <option value="normale">Normale (22°C)</option>
                  <option value="chaude">Chaude (24°C)</option>
                </select>
              </div>
            </div>

            {/* Water toggle */}
            <div className="flex items-center justify-between rounded-xl border-2 border-grey-200 bg-grey-50 px-4 py-3.5">
              <div>
                <p className="text-[14px] font-semibold text-grey-900">Eau à bord</p>
                <p className="text-[12px] text-grey-500">
                  Bouteille d&apos;eau fraîche mise à disposition
                </p>
              </div>
              <Toggle
                checked={water ?? waterOn}
                onChange={(v) => { setValue("water", v); setWaterOn(v); }}
              />
            </div>
          </div>
        </Section>

        {/* ── Save button ───────────────────────────── */}
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-[13px] font-semibold text-green-600"
              >
                <CheckCircle2 className="h-4 w-4" />
                Modifications sauvegardées
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "ml-auto flex h-12 items-center gap-2 rounded-xl",
              "bg-accent px-8 font-bold text-[14px] text-brand",
              "shadow-lg shadow-accent/20 transition-all duration-200 hover:bg-accent-light",
              "disabled:cursor-not-allowed disabled:opacity-60"
            )}
          >
            {isSubmitting ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand border-t-transparent" />
            ) : (
              "Sauvegarder les modifications"
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
