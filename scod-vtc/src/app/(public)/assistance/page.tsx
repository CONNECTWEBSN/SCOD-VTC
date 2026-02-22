"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone, MessageCircle, Mail, MapPin, Clock,
  ChevronDown, AlertCircle, CheckCircle2, ArrowRight, Send,
} from "lucide-react";
import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────────────────────
   Schema
───────────────────────────────────────────────────────── */

const schema = z.object({
  subject: z.string().min(1, "Choisissez un objet"),
  name:    z.string().min(2, "Nom requis"),
  email:   z.string().email("Email invalide"),
  phone:   z.string().optional(),
  message: z.string().min(10, "Message trop court (10 caractères min)"),
});

type FormData = z.infer<typeof schema>;

/* ─────────────────────────────────────────────────────────
   Static Data
───────────────────────────────────────────────────────── */

const contactCards = [
  {
    icon: Phone,
    title: "Téléphone",
    value: "+221 77 123 45 67",
    badge: "Réponse immédiate",
    badgeColor: "bg-green-500/15 text-green-400",
    cta: "Appeler",
    href: "tel:+221771234567",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+221 77 123 45 67",
    badge: "Réponse < 5 min",
    badgeColor: "bg-green-500/15 text-green-400",
    cta: "Écrire sur WhatsApp",
    href: "https://wa.me/221771234567",
    color: "text-[#25D366]",
    bg: "bg-[#25D366]/10",
    external: true,
  },
  {
    icon: Mail,
    title: "Email",
    value: "contact@scodvtc.sn",
    badge: "Réponse < 2h",
    badgeColor: "bg-amber-500/15 text-amber-400",
    cta: "Envoyer un email",
    href: "mailto:contact@scodvtc.sn",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    icon: MapPin,
    title: "Bureau",
    value: "Dakar, Plateau, Sénégal",
    badge: "Sur rendez-vous",
    badgeColor: "bg-white/10 text-white/50",
    cta: "Voir sur la carte",
    href: "https://maps.google.com/?q=Dakar,Senegal",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    external: true,
  },
];

const schedules = [
  {
    label: "Service client",
    hours: "Lun – Dim, 6h – 23h",
    note: "Téléphone, WhatsApp, Email",
    icon: Clock,
  },
  {
    label: "Transfert aéroport",
    hours: "24h/24, 7j/7",
    note: "Suivi de vol en temps réel",
    icon: AlertCircle,
  },
];

const quickFAQ = [
  {
    id: "q1",
    question: "Comment annuler ma réservation ?",
    answer: "Rendez-vous dans Mon compte → Mes réservations → Annuler. Gratuit jusqu'à 24h avant. Entre 2h et 24h : 50% retenu. Moins de 2h : non remboursé.",
  },
  {
    id: "q2",
    question: "Mon chauffeur est en retard, que faire ?",
    answer: "Consultez votre SMS de confirmation pour le numéro direct du chauffeur. Vous pouvez aussi l'appeler via notre service client au +221 77 123 45 67.",
  },
  {
    id: "q3",
    question: "Comment obtenir une facture pour mon entreprise ?",
    answer: "Les factures sont disponibles dans Mon compte → Historique. Pour la facturation mensuelle Wave Business, contactez-nous à contact@scodvtc.sn.",
  },
];

const subjects = [
  "Réservation",
  "Réclamation",
  "Partenariat",
  "Compte entreprise",
  "Facturation",
  "Autre",
];

/* ─────────────────────────────────────────────────────────
   Fade-up animation
───────────────────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */

export default function AssistancePage() {
  const [sent, setSent]         = useState(false);
  const [openFAQ, setOpenFAQ]   = useState<string | undefined>(undefined);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
  };

  /* shared input classes */
  const inputCls = cn(
    "h-12 w-full rounded-xl border-2 border-grey-200 bg-white px-4 text-[15px] text-grey-900",
    "placeholder:text-grey-400 outline-none transition-all duration-200",
    "focus:border-accent focus:shadow-lg focus:shadow-accent/10"
  );

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-dark py-20 lg:py-28">
        {/* Background image */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/cars/header-hero/transport-familial.jpg')" }}
        />
        {/* Dark overlay */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-brand-dark/95 via-brand-dark/85 to-brand-dark/55" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #FFC300, transparent 65%)" }}
        />

        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <motion.div {...fadeUp(0)}>
            <span className="mb-4 inline-block text-[12px] font-bold uppercase tracking-[0.25em] text-accent">
              Assistance
            </span>
            <h1
              className="font-sans font-bold leading-none tracking-tight text-white"
              style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
            >
              Comment pouvons-nous
              <br />
              <span className="text-accent">vous aider ?</span>
            </h1>
            <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-white/60">
              Notre équipe est disponible 7j/7 pour répondre à toutes vos questions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Urgency banner ────────────────────────────────── */}
      <div className="bg-accent px-5 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 text-center">
          <AlertCircle className="h-4 w-4 shrink-0 text-brand" />
          <p className="text-[13.5px] font-semibold text-brand">
            Course en cours ?{" "}
            <span className="font-normal">
              Appelez directement votre chauffeur depuis votre SMS de confirmation.
            </span>
          </p>
        </div>
      </div>

      <section className="bg-grey-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          {/* ── Contact Cards 2×2 ──────────────────────────── */}
          <motion.div {...fadeUp(0.05)} className="mb-16">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <a
                    key={card.title}
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className="group flex flex-col rounded-2xl border-2 border-grey-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-grey-900/5"
                  >
                    {/* Icon */}
                    <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-xl", card.bg)}>
                      <Icon className={cn("h-6 w-6", card.color)} />
                    </div>

                    {/* Title + badge */}
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-sans text-[16px] font-bold text-grey-900">
                        {card.title}
                      </h3>
                    </div>
                    <span className={cn("mb-3 inline-block self-start rounded-full px-2.5 py-0.5 text-[11px] font-semibold", card.badgeColor)}>
                      {card.badge}
                    </span>

                    <p className="mb-5 flex-1 text-[13px] font-medium text-grey-600">
                      {card.value}
                    </p>

                    <div className="flex items-center gap-1.5 text-[13px] font-semibold text-accent transition-colors group-hover:text-brand">
                      {card.cta}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

            {/* ── Contact Form ────────────────────────────── */}
            <motion.div {...fadeUp(0.1)}>
              <div className="rounded-3xl border-2 border-grey-200 bg-white p-8 shadow-xl shadow-grey-900/5">
                <h2 className="mb-2 font-sans text-[28px] font-bold text-grey-900">
                  Envoyez-nous un message
                </h2>
                <p className="mb-8 text-[14px] text-grey-500">
                  Nous vous répondons par email ou téléphone sous 2 heures.
                </p>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 py-12 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="font-sans text-[22px] font-bold text-grey-900">
                      Message envoyé !
                    </h3>
                    <p className="max-w-sm text-[14px] text-grey-500">
                      Nous vous répondons sous 2h. Vérifiez vos emails, y compris votre dossier spam.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-2 text-[13px] font-medium text-accent hover:underline underline-offset-4"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Subject */}
                    <div>
                      <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                        Objet *
                      </label>
                      <select
                        {...register("subject")}
                        className={cn(
                          inputCls,
                          "cursor-pointer appearance-none",
                          errors.subject && "border-red-400 focus:border-red-400 focus:shadow-red-100"
                        )}
                      >
                        <option value="">Choisissez un objet</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.subject && (
                        <p className="mt-1 text-[12px] text-red-500">{errors.subject.message}</p>
                      )}
                    </div>

                    {/* Name + Email */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                          Nom complet *
                        </label>
                        <input
                          {...register("name")}
                          placeholder="Moussa Sarr"
                          className={cn(inputCls, errors.name && "border-red-400")}
                        />
                        {errors.name && (
                          <p className="mt-1 text-[12px] text-red-500">{errors.name.message}</p>
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
                          className={cn(inputCls, errors.email && "border-red-400")}
                        />
                        {errors.email && (
                          <p className="mt-1 text-[12px] text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                        Téléphone <span className="font-normal text-grey-400">(optionnel)</span>
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="+221 77 000 00 00"
                        className={inputCls}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mb-1.5 block text-[13px] font-semibold text-grey-700">
                        Message *
                      </label>
                      <textarea
                        {...register("message")}
                        rows={5}
                        placeholder="Décrivez votre demande en détail..."
                        className={cn(
                          "w-full resize-none rounded-xl border-2 border-grey-200 bg-white px-4 py-3",
                          "text-[15px] text-grey-900 placeholder:text-grey-400",
                          "outline-none transition-all duration-200",
                          "focus:border-accent focus:shadow-lg focus:shadow-accent/10",
                          errors.message && "border-red-400"
                        )}
                      />
                      {errors.message && (
                        <p className="mt-1 text-[12px] text-red-500">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "flex h-13 w-full items-center justify-center gap-2 rounded-xl",
                        "bg-accent font-bold text-[15px] text-brand",
                        "shadow-lg shadow-accent/25 transition-all duration-200",
                        "hover:-translate-y-0.5 hover:bg-accent-light hover:shadow-xl hover:shadow-accent/30",
                        "disabled:cursor-not-allowed disabled:opacity-60"
                      )}
                    >
                      {isSubmitting ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Envoyer le message
                        </>
                      )}
                    </button>

                    <p className="text-center text-[12px] text-grey-400">
                      Réponse garantie sous 2h · Lun–Dim 6h–23h
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

            {/* ── Right column ────────────────────────────── */}
            <div className="space-y-6">

              {/* Schedules */}
              <motion.div {...fadeUp(0.15)}>
                <div className="rounded-2xl border-2 border-grey-200 bg-white p-6">
                  <h3 className="mb-5 font-sans text-[20px] font-bold text-grey-900">
                    Horaires
                  </h3>
                  <div className="space-y-4">
                    {schedules.map(({ label, hours, note, icon: Icon }) => (
                      <div key={label} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                          <Icon className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold text-grey-900">{label}</p>
                          <p className="font-sans text-[18px] font-bold text-accent">{hours}</p>
                          <p className="text-[12px] text-grey-500">{note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Quick FAQ */}
              <motion.div {...fadeUp(0.2)}>
                <div className="rounded-2xl border-2 border-grey-200 bg-white p-6">
                  <h3 className="mb-5 font-sans text-[20px] font-bold text-grey-900">
                    Questions fréquentes
                  </h3>

                  <Accordion.Root
                    type="single"
                    value={openFAQ}
                    onValueChange={setOpenFAQ}
                    collapsible
                    className="space-y-2"
                  >
                    {quickFAQ.map((item) => (
                      <Accordion.Item
                        key={item.id}
                        value={item.id}
                        className={cn(
                          "overflow-hidden rounded-xl border transition-all duration-200",
                          openFAQ === item.id
                            ? "border-accent/30 bg-accent/5"
                            : "border-grey-200 bg-grey-50"
                        )}
                      >
                        <Accordion.Header>
                          <Accordion.Trigger className="group flex w-full items-center justify-between gap-3 p-4 text-left">
                            <span className="text-[13.5px] font-semibold text-grey-900">
                              {item.question}
                            </span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 shrink-0 text-grey-400 transition-all duration-200",
                                openFAQ === item.id && "rotate-180 text-accent"
                              )}
                            />
                          </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                          <p className="border-t border-grey-200 px-4 py-4 text-[13px] leading-relaxed text-grey-600">
                            {item.answer}
                          </p>
                        </Accordion.Content>
                      </Accordion.Item>
                    ))}
                  </Accordion.Root>

                  <Link
                    href="/faq"
                    className="mt-4 flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:underline underline-offset-4"
                  >
                    Voir toutes les questions
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
