"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import {
  ChevronDown, Search, Phone, MessageCircle, Star, Users, Clock,
  Laptop, Plane, CreditCard, Car, MapPin, Ban, Banknote, Building2,
  CheckCircle2, Info, Smartphone,
} from "lucide-react";
import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────────────────────
   Primitives — style "Supplements"
───────────────────────────────────────────────────────── */

function ItemRow({
  icon: Icon,
  label,
  value,
  sub,
  last,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
  sub?: string;
  last?: boolean;
}) {
  return (
    <div className={cn("flex items-start gap-3 px-4 py-3", !last && "border-b border-grey-100")}>
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="flex-1 min-w-0">
        <span className="block text-[13.5px] font-semibold text-grey-900 leading-snug">{label}</span>
        {sub && <span className="block text-[12.5px] text-grey-500 leading-relaxed mt-0.5">{sub}</span>}
      </div>
      {value && (
        <span className="shrink-0 font-sans text-[13px] font-bold text-accent tracking-tight">
          {value}
        </span>
      )}
    </div>
  );
}

function StepRow({ n, label, sub, last }: { n: number; label: string; sub?: string; last?: boolean }) {
  return (
    <div className={cn("flex items-start gap-3 px-4 py-3", !last && "border-b border-grey-100")}>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent font-sans text-[11px] font-bold text-brand mt-0.5">
        {n}
      </span>
      <div className="flex-1">
        <span className="block text-[13.5px] font-semibold text-grey-900 leading-snug">{label}</span>
        {sub && <span className="block text-[12.5px] text-grey-500 mt-0.5 leading-relaxed">{sub}</span>}
      </div>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-4 mb-3 mt-1 flex gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
      <p className="text-[12.5px] leading-relaxed text-amber-800">{children}</p>
    </div>
  );
}

function Block({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-grey-200 bg-white">
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   FAQ Data — 6 questions restructurées
───────────────────────────────────────────────────────── */

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  tags: string[];
  answerText: string; // for search
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "Comment réserver un chauffeur privé ?",
    answerText: "réserver en ligne téléphone whatsapp sms confirmation",
    tags: ["réservation", "booking", "commander"],
    answer: (
      <div className="space-y-3">
        <Block>
          <StepRow n={1} label="Saisissez départ et arrivée" sub="Google Places — adresse précise ou nom de lieu" />
          <StepRow n={2} label="Choisissez date & heure" sub="Réservation jusqu'à 1 an à l'avance" />
          <StepRow n={3} label="Sélectionnez le véhicule" sub="Berline, SUV, VIP — tarif affiché en FCFA" />
          <StepRow n={4} label="Payez et confirmez" sub="Orange Money, Wave, Free Money, Visa, CB" last />
        </Block>
        <Tip>Vous recevez instantanément un SMS avec le nom, la photo et le numéro de votre chauffeur.</Tip>
      </div>
    ),
  },
  {
    id: "2",
    question: "Comment connaître le prix de ma course ?",
    answerText: "prix tarif coût estimation devis fcfa fixe garanti",
    tags: ["prix", "tarif", "coût"],
    answer: (
      <div className="space-y-3">
        <Block>
          <ItemRow icon={Laptop} label="En ligne — estimation immédiate" sub="Saisissez votre trajet sur scod-vtc.sn → tarif affiché en FCFA" />
          <ItemRow icon={Phone} label="Par téléphone" sub="+221 77 123 45 67 — devis en moins de 2 minutes" />
          <ItemRow icon={MessageCircle} label="Via WhatsApp" sub="Envoyez départ + arrivée → tarif instantané" last />
        </Block>
        <Block>
          <ItemRow icon={CheckCircle2} label="Tarif fixe garanti" sub="Pas de compteur, même en cas d'embouteillage" />
          <ItemRow icon={Plane} label="15 min d'attente offertes" sub="Pour les transferts aéroport AIBD" />
          <ItemRow icon={CreditCard} label="Frais inclus" sub="Péages, parking, eau à bord, chargeur" last />
        </Block>
      </div>
    ),
  },
  {
    id: "3",
    question: "Quelle gamme de véhicule choisir ?",
    answerText: "véhicule voiture gamme berline suv van vip pmr",
    tags: ["véhicule", "voiture", "gamme"],
    answer: (
      <div className="space-y-3">
        <Block>
          <ItemRow icon={Car} label="Berline — BMW Série 5 / Mercedes S" value="Confort" sub="1–4 passagers · trajets professionnels · discrétion" />
          <ItemRow icon={Car} label="SUV — Tesla X / Peugeot 3008" value="Famille" sub="4–6 passagers · bagages volumineux · espace" />
          <ItemRow icon={Car} label="Van VIP — Mercedes V" value="Groupe" sub="Jusqu'à 7 passagers · séminaires · événements" />
          <ItemRow icon={Car} label="PMR — Van accessible" value="Accès." sub="Fauteuil roulant · rampe électrique · assistance" last />
        </Block>
        <Tip>Pour l'aéroport AIBD avec bagages, privilégiez le SUV ou le Van VIP.</Tip>
      </div>
    ),
  },
  {
    id: "4",
    question: "Comment retrouver mon chauffeur à l'aéroport AIBD ?",
    answerText: "aéroport aibd retrouver chauffeur pancarte nominative",
    tags: ["aéroport", "aibd", "chauffeur"],
    answer: (
      <div className="space-y-3">
        <Block>
          <StepRow n={1} label="Sortie principale — hall des arrivées" sub="Votre chauffeur vous attend dès la zone de récupération des bagages" />
          <StepRow n={2} label="Pancarte nominative à votre nom" sub="Identification immédiate, même dans les foules" />
          <StepRow n={3} label="Aide aux bagages" sub="Le chauffeur prend en charge vos valises jusqu'au véhicule" />
          <StepRow n={4} label="Départ confortable" sub="Véhicule climatisé, eau à bord, direction votre destination" last />
        </Block>
        <Tip>Renseignez votre numéro de vol lors de la réservation — votre chauffeur suit le vol en temps réel et s'adapte à tout retard.</Tip>
      </div>
    ),
  },
  {
    id: "5",
    question: "Que se passe-t-il si mon vol est en retard ?",
    answerText: "retard vol attente ajustement sans frais gratuit",
    tags: ["retard", "vol", "attente"],
    answer: (
      <div className="space-y-3">
        <Block>
          <ItemRow icon={Plane} label="Vol renseigné lors de la réservation" value="Gratuit" sub="Suivi automatique · chauffeur ajusté · 15 min offertes · aucun frais" />
          <ItemRow icon={Phone} label="Vol non renseigné" value="Payant" sub="Appelez votre chauffeur · attente facturée après 15 min" last />
        </Block>
        <Tip>Aucun frais supplémentaire si vous avez renseigné votre numéro de vol. En cas de retard exceptionnel, notre équipe vous contacte proactivement.</Tip>
      </div>
    ),
  },
  {
    id: "6",
    question: "Quels modes de paiement acceptez-vous ?",
    answerText: "paiement orange money wave free money visa mastercard espèces cb stripe paytech",
    tags: ["paiement", "payment", "money"],
    answer: (
      <div className="space-y-3">
        <Block>
          <ItemRow icon={Smartphone} label="Orange Money" value="Mobile" sub="Via PayTech · confirmation par SMS" />
          <ItemRow icon={Smartphone} label="Wave" value="Mobile" sub="Via PayTech · virement instantané" />
          <ItemRow icon={Smartphone} label="Free Money" value="Mobile" sub="Via PayTech · compatible tous réseaux" last />
        </Block>
        <Block>
          <ItemRow icon={CreditCard} label="Visa / Mastercard / Amex" value="CB" sub="Via Stripe · 3D Secure · Apple Pay · Google Pay" />
          <ItemRow icon={Banknote} label="Espèces FCFA" value="Cash" sub="Paiement en fin de course au chauffeur" />
          <ItemRow icon={Building2} label="Wave Business" value="Entreprise" sub="Facturation mensuelle centralisée · export PDF" last />
        </Block>
        <Tip>L'acompte de 30 % est encaissé à la réservation. Le solde est réglé en fin de course.</Tip>
      </div>
    ),
  },
];

/* ─────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────── */

export function ContactFAQ({ className }: { className?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  const filteredFAQ = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answerText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section className={cn("relative overflow-hidden bg-grey-50 py-24 lg:py-32", className)}>
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
        {/* ── Header ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
            Besoin d&apos;aide ?
          </span>
          <h2
            className="mb-6 font-sans font-bold text-balance text-grey-900"
            style={{ fontSize: "clamp(30px, 4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            Questions fréquentes
          </h2>

          {/* Search bar */}
          <div className="mx-auto max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-grey-400" />
              <input
                type="text"
                placeholder="Rechercher une question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "h-14 w-full rounded-2xl border-2 border-grey-200 bg-white pl-12 pr-4",
                  "text-[15px] text-grey-900 placeholder:text-grey-400",
                  "outline-none transition-all duration-200",
                  "focus:border-accent focus:shadow-lg focus:shadow-accent/10"
                )}
              />
            </div>
          </div>
        </motion.div>

        {/* ── FAQ Accordion ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          {filteredFAQ.length === 0 ? (
            <div className="py-12 text-center text-grey-500">
              Aucune question trouvée pour &ldquo;{searchQuery}&rdquo;
            </div>
          ) : (
            <Accordion.Root
              type="single"
              value={openItem}
              onValueChange={setOpenItem}
              collapsible
              className="space-y-3"
            >
              {filteredFAQ.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Accordion.Item
                    value={item.id}
                    className={cn(
                      "overflow-hidden rounded-2xl border-2 bg-white transition-all duration-200",
                      openItem === item.id
                        ? "border-accent shadow-lg shadow-accent/10"
                        : "border-grey-200 hover:border-grey-300"
                    )}
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6">
                        <span className="font-sans text-[17px] font-semibold leading-snug tracking-[-0.01em] text-grey-900">
                          {item.question}
                        </span>
                        <div
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
                            openItem === item.id
                              ? "rotate-180 bg-accent text-brand"
                              : "bg-grey-100 text-grey-500 group-hover:bg-grey-200"
                          )}
                        >
                          <ChevronDown className="h-5 w-5" />
                        </div>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="border-t border-grey-100 px-5 pb-5 pt-4 sm:px-6">
                        {item.answer}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </motion.div>
              ))}
            </Accordion.Root>
          )}
        </motion.div>

        {/* ── Bottom Bar ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {/* Contact Card */}
          <div className="rounded-2xl border-2 border-grey-200 bg-white p-6">
            <h3 className="mb-4 font-sans text-[18px] font-bold tracking-[-0.01em] text-grey-900">
              Besoin d&apos;aide ?
            </h3>
            <p className="mb-5 font-sans text-[14px] font-normal text-grey-600">
              Notre équipe est disponible 7j/7 pour répondre à vos questions
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/221771234567"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3",
                  "font-sans text-[14px] font-semibold text-white transition-all duration-200",
                  "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#25D366]/30"
                )}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href="tel:+221771234567"
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border-2 border-grey-900 bg-transparent px-4 py-3",
                  "font-sans text-[14px] font-semibold text-grey-900 transition-all duration-200",
                  "hover:-translate-y-0.5 hover:bg-grey-900 hover:text-white hover:shadow-lg"
                )}
              >
                <Phone className="h-4 w-4" />
                Appeler
              </a>
            </div>
          </div>

          {/* Stats Card */}
          <div className="rounded-2xl border-2 border-grey-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2 font-sans text-[14px] font-semibold text-grey-900">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span>Ce que disent nos clients</span>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="font-sans text-[32px] font-bold tracking-[-0.02em] text-accent">4.8</p>
                <p className="font-sans text-[12px] font-normal text-grey-500">/ 5</p>
              </div>
              <div className="h-12 w-px bg-grey-200" />
              <div className="flex-1 space-y-2 text-[13px]">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-grey-400" />
                  <span className="text-grey-600">2 000+ clients satisfaits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-grey-400" />
                  <span className="text-grey-600">15 min offertes AIBD</span>
                </div>
              </div>
            </div>
            <Link
              href="/avis"
              className="mt-4 inline-flex items-center font-sans text-[13px] font-medium text-accent hover:underline"
            >
              Voir tous les avis →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
