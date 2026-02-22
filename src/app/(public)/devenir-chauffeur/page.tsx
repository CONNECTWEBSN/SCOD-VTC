"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  DollarSign, Calendar, Car, Smartphone, GraduationCap, Shield,
  CheckCircle2, ChevronRight, Upload, X, FileText, ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────────────────────
   Schema
───────────────────────────────────────────────────────── */

const schema = z.object({
  firstName:    z.string().min(2, "Requis"),
  lastName:     z.string().min(2, "Requis"),
  phone:        z.string().min(8, "Numéro invalide"),
  email:        z.string().email("Email invalide"),
  licenseNum:   z.string().min(4, "Requis"),
  experience:   z.coerce.number().min(0, "Requis"),
  availability: z.string().min(1, "Choisissez une disponibilité"),
});

type FormData = z.infer<typeof schema>;

/* ─────────────────────────────────────────────────────────
   Static Data
───────────────────────────────────────────────────────── */

const perks = [
  {
    icon: DollarSign,
    title: "Revenus attractifs",
    desc: "Commissions compétitives sur chaque course + pourboires clients premium.",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    icon: Calendar,
    title: "Flexibilité totale",
    desc: "Choisissez vos horaires, acceptez uniquement les courses qui vous conviennent.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Car,
    title: "Véhicules fournis",
    desc: "Conduisez des BMW, Mercedes et Tesla entretenus et assurés par SCOD VTC.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Smartphone,
    title: "Application dédiée",
    desc: "Gérez vos courses, revenus et planning depuis une application pensée pour vous.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    icon: GraduationCap,
    title: "Formation continue",
    desc: "Formation au service premium, protocole VTC, accueil clientèle exigeante.",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
  },
  {
    icon: Shield,
    title: "Couverture complète",
    desc: "Assurance tous risques, prise en charge maladie, accompagnement social.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
];

const steps = [
  {
    num: "01",
    title: "Postulez en ligne",
    desc: "Remplissez le formulaire ci-dessous en moins de 5 minutes. Aucun déplacement requis.",
  },
  {
    num: "02",
    title: "Entretien & vérification",
    desc: "Notre équipe vous contacte sous 48h pour un entretien téléphonique et la vérification de vos documents.",
  },
  {
    num: "03",
    title: "Formation premium",
    desc: "Une journée de formation complète : service haut de gamme, protocoles, application chauffeur.",
  },
  {
    num: "04",
    title: "Commencez à gagner",
    desc: "Accès immédiat aux courses après validation. Premier versement dès la première semaine.",
  },
];

const criteria = [
  "Permis B obtenu depuis 3 ans minimum",
  "Casier judiciaire vierge (bulletin n°3)",
  "Expérience en transport de personnes appréciée",
  "Présentation soignée et tenue professionnelle",
  "Bonne connaissance de Dakar et ses environs",
];

const availabilityOptions = [
  { value: "full",     label: "Temps plein (40h+/semaine)" },
  { value: "part",     label: "Temps partiel (20–30h/semaine)" },
  { value: "weekend",  label: "Week-ends uniquement" },
  { value: "flexible", label: "Disponibilité flexible" },
];

/* ─────────────────────────────────────────────────────────
   Animation helper
───────────────────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */

export default function DevenirChauffeurPage() {
  const [sent, setSent]   = useState(false);
  const [file, setFile]   = useState<File | null>(null);
  const [drag, setDrag]   = useState(false);
  const fileInputRef      = useRef<HTMLInputElement>(null);
  const formRef           = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
  };

  const handleFile = (f: File | null | undefined) => {
    if (!f) return;
    if (f.size > 5_000_000) return;
    setFile(f);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const inputCls = (hasError?: boolean) =>
    cn(
      "h-12 w-full rounded-xl border-2 bg-white px-4 text-[15px] text-grey-900",
      "placeholder:text-grey-400 outline-none transition-all duration-200",
      "focus:border-accent focus:shadow-lg focus:shadow-accent/10",
      hasError ? "border-red-400" : "border-grey-200"
    );

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <Image
          src="/cars/header-hero/navette-inter-regions.jpg"
          alt="Chauffeur professionnel SCOD VTC"
          fill
          priority
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(10,9,32,0.96) 0%, rgba(10,9,32,0.88) 40%, rgba(10,9,32,0.50) 70%, rgba(10,9,32,0.15) 100%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <span className="mb-4 inline-block text-[12px] font-bold uppercase tracking-[0.25em] text-accent">
              Recrutement · Dakar, Sénégal
            </span>

            <h1
              className="font-sans font-bold leading-none tracking-tight text-white"
              style={{ fontSize: "clamp(38px, 5vw, 62px)" }}
            >
              Devenez chauffeur
              <br />
              <span className="text-accent">SCOD VTC</span>
            </h1>

            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/70">
              Rejoignez le premier réseau VTC premium du Sénégal. Revenus
              stables, véhicules fournis, horaires flexibles.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.button
                onClick={scrollToForm}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex h-13 items-center gap-2 rounded-xl bg-accent px-8 font-bold text-[15px] text-brand shadow-lg shadow-accent/30 transition-colors hover:bg-accent-light"
              >
                Postuler maintenant
                <ArrowDown className="h-4 w-4" />
              </motion.button>
              <p className="text-[13px] text-white/50">
                Réponse sous 48h · Aucun frais
              </p>
            </div>

            {/* Quick stats */}
            <div className="mt-10 flex flex-wrap gap-6">
              {[
                ["6", "Véhicules premium"],
                ["48h", "Pour être rappelé"],
                ["1j", "Formation suffisante"],
              ].map(([val, label]) => (
                <div key={label}>
                  <p className="font-sans text-[28px] font-bold text-accent leading-none">{val}</p>
                  <p className="mt-0.5 text-[12px] text-white/50">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Perks ────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div {...fadeUp(0)} className="mb-14 text-center">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.25em] text-accent">
              Vos avantages
            </span>
            <h2
              className="font-sans font-bold leading-tight text-grey-900"
              style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
            >
              Pourquoi rejoindre SCOD VTC ?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[15px] text-grey-500">
              Des conditions de travail pensées pour valoriser votre métier et votre quotidien.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <motion.div key={perk.title} {...fadeUp(i * 0.07)}>
                  <div className="group h-full rounded-2xl border-2 border-grey-200 bg-white p-6 transition-all duration-250 hover:-translate-y-1 hover:border-accent/20 hover:shadow-xl hover:shadow-grey-900/5">
                    <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-xl", perk.bg)}>
                      <Icon className={cn("h-6 w-6", perk.color)} />
                    </div>
                    <h3 className="mb-2 font-sans text-[18px] font-bold text-grey-900">
                      {perk.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-grey-500">{perk.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section className="bg-brand-dark py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div {...fadeUp(0)} className="mb-14 text-center">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.25em] text-accent">
              Le processus
            </span>
            <h2
              className="font-sans font-bold leading-tight text-white"
              style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
            >
              Comment ça marche ?
            </h2>
          </motion.div>

          <div className="relative grid gap-8 md:grid-cols-4">
            {/* connecting line desktop */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px md:block"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,195,0,0.25) 20%, rgba(255,195,0,0.25) 80%, transparent)" }}
            />

            {steps.map((step, i) => (
              <motion.div key={step.num} {...fadeUp(i * 0.1)} className="relative">
                <div className="flex flex-col items-center text-center">
                  {/* Circle */}
                  <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent bg-brand-dark shadow-lg shadow-accent/20">
                    <span className="font-sans text-[14px] font-bold text-accent">{step.num}</span>
                  </div>

                  <h3 className="mb-2 font-sans text-[17px] font-bold text-white">{step.title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-white/50">{step.desc}</p>
                </div>

                {/* arrow on mobile */}
                {i < steps.length - 1 && (
                  <ChevronRight className="mx-auto mt-6 h-4 w-4 text-white/20 md:hidden" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Criteria ─────────────────────────────────────── */}
      <section className="bg-grey-50 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <motion.div {...fadeUp(0)} className="mb-10 text-center">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.25em] text-accent">
              Profil recherché
            </span>
            <h2
              className="font-sans font-bold text-grey-900"
              style={{ fontSize: "clamp(26px, 4vw, 42px)" }}
            >
              Critères de sélection
            </h2>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <div className="rounded-3xl border-2 border-accent/25 bg-accent/5 p-8">
              <ul className="space-y-4">
                {criteria.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                    </span>
                    <span className="text-[15px] font-medium text-grey-800">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl border border-white/60 bg-white/60 p-4">
                <p className="text-[13px] leading-relaxed text-grey-600">
                  <span className="font-semibold text-grey-900">Note :</span> Même sans expérience
                  professionnelle en transport, une forte motivation et une présentation irréprochable
                  peuvent faire la différence. N&apos;hésitez pas à postuler.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Application Form ─────────────────────────────── */}
      <section ref={formRef} className="bg-white py-20 lg:py-28" id="postuler">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <motion.div {...fadeUp(0)} className="mb-10 text-center">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.25em] text-accent">
              Postuler
            </span>
            <h2
              className="font-sans font-bold text-grey-900"
              style={{ fontSize: "clamp(26px, 4vw, 42px)" }}
            >
              Envoyez votre candidature
            </h2>
            <p className="mt-3 text-[14px] text-grey-500">
              5 minutes suffisent. Notre équipe RH vous rappelle sous 48h.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <div className="rounded-3xl border-2 border-grey-200 bg-white p-8 shadow-2xl shadow-grey-900/5">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-14 text-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                  </div>
                  <h3 className="font-sans text-[24px] font-bold text-grey-900">
                    Candidature reçue !
                  </h3>
                  <p className="max-w-sm text-[14px] leading-relaxed text-grey-500">
                    Merci pour votre intérêt. Notre équipe RH vous contacte par
                    téléphone sous <strong>48 heures</strong>.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-[13px] font-medium text-accent hover:underline underline-offset-4"
                  >
                    Envoyer une autre candidature
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                        Prénom *
                      </label>
                      <input
                        {...register("firstName")}
                        placeholder="Moussa"
                        className={inputCls(!!errors.firstName)}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-[12px] text-red-500">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                        Nom *
                      </label>
                      <input
                        {...register("lastName")}
                        placeholder="Sarr"
                        className={inputCls(!!errors.lastName)}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-[12px] text-red-500">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                        Téléphone *
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="+221 77 000 00 00"
                        className={inputCls(!!errors.phone)}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-[12px] text-red-500">{errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                        Email *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="moussa@email.com"
                        className={inputCls(!!errors.email)}
                      />
                      {errors.email && (
                        <p className="mt-1 text-[12px] text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* License + Experience */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                        Numéro de permis *
                      </label>
                      <input
                        {...register("licenseNum")}
                        placeholder="SN-XXXX-XXXX"
                        className={inputCls(!!errors.licenseNum)}
                      />
                      {errors.licenseNum && (
                        <p className="mt-1 text-[12px] text-red-500">{errors.licenseNum.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                        Années d&apos;expérience *
                      </label>
                      <input
                        {...register("experience")}
                        type="number"
                        min={0}
                        placeholder="3"
                        className={inputCls(!!errors.experience)}
                      />
                      {errors.experience && (
                        <p className="mt-1 text-[12px] text-red-500">{errors.experience.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                      Disponibilité *
                    </label>
                    <select
                      {...register("availability")}
                      className={cn(
                        inputCls(!!errors.availability),
                        "cursor-pointer appearance-none"
                      )}
                    >
                      <option value="">Sélectionner</option>
                      {availabilityOptions.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    {errors.availability && (
                      <p className="mt-1 text-[12px] text-red-500">{errors.availability.message}</p>
                    )}
                  </div>

                  {/* CV Upload */}
                  <div>
                    <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                      CV <span className="font-normal text-grey-400">(optionnel · PDF ou Word · max 5 Mo)</span>
                    </label>

                    {file ? (
                      <div className="flex items-center justify-between rounded-xl border-2 border-accent/30 bg-accent/5 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-accent" />
                          <div>
                            <p className="text-[13px] font-semibold text-grey-900">{file.name}</p>
                            <p className="text-[11px] text-grey-400">
                              {(file.size / 1024).toFixed(0)} Ko
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="rounded-full p-1 text-grey-400 transition-colors hover:bg-grey-100 hover:text-grey-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                        onDragLeave={() => setDrag(false)}
                        onDrop={onDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-8 transition-all duration-200",
                          drag
                            ? "border-accent bg-accent/5"
                            : "border-grey-200 bg-grey-50 hover:border-accent/40 hover:bg-accent/5"
                        )}
                      >
                        <Upload className="h-7 w-7 text-grey-400" />
                        <p className="text-[13px] font-medium text-grey-600">
                          Glissez votre CV ici ou{" "}
                          <span className="text-accent underline underline-offset-2">parcourir</span>
                        </p>
                        <p className="text-[11px] text-grey-400">PDF, DOCX · Max 5 Mo</p>
                      </div>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => handleFile(e.target.files?.[0])}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "flex h-13 w-full items-center justify-center gap-2 rounded-xl",
                      "bg-accent font-bold text-[15px] text-brand",
                      "shadow-lg shadow-accent/25 transition-all duration-200",
                      "hover:bg-accent-light hover:shadow-xl hover:shadow-accent/30",
                      "disabled:cursor-not-allowed disabled:opacity-60"
                    )}
                  >
                    {isSubmitting ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                    ) : (
                      "Envoyer ma candidature"
                    )}
                  </motion.button>

                  <p className="text-center text-[12px] text-grey-400">
                    En postulant, vous acceptez que nous traitions vos données à des fins de recrutement.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
