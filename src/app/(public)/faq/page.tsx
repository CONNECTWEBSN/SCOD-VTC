"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Info,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────── */

type Category =
  | "toutes"
  | "reservation"
  | "paiement"
  | "vehicules"
  | "aeroport"
  | "entreprises"
  | "annulation";

interface FAQItem {
  id: string;
  category: Category;
  question: string;
  answer: React.ReactNode;
}

/* ─────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────── */

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 flex gap-3 rounded-xl border border-accent/25 bg-accent/[0.07] p-4">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
      <p className="text-[13.5px] leading-relaxed text-amber-800">{children}</p>
    </div>
  );
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-grey-700">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-brand">
            {i + 1}
          </span>
          {item}
        </li>
      ))}
    </ol>
  );
}

function Checks({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-[14px] text-grey-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────
   FAQ Data — 18 questions
───────────────────────────────────────────────────────── */

const faqItems: FAQItem[] = [
  /* ── Réservation ────────────────────────────────────── */
  {
    id: "r1",
    category: "reservation",
    question: "Comment réserver un chauffeur privé ?",
    answer: (
      <div className="space-y-4">
        <div className="rounded-xl border border-grey-200 bg-grey-50 p-5">
          <p className="mb-3 font-semibold text-grey-900">En ligne (recommandé)</p>
          <Steps items={[
            "Saisissez votre adresse de départ et d'arrivée",
            "Choisissez votre date et heure de trajet",
            "Sélectionnez le véhicule adapté à vos besoins",
            "Validez et payez en ligne (Orange Money, Wave, CB)",
          ]} />
        </div>
        <div className="rounded-xl border border-grey-200 bg-grey-50 p-5">
          <p className="mb-2 font-semibold text-grey-900">Par téléphone / WhatsApp</p>
          <p className="text-[14px] text-grey-700">
            Appelez le <span className="font-semibold text-brand">+221 77 123 45 67</span> ou
            envoyez un message WhatsApp. Un conseiller vous guidera en temps réel.
          </p>
        </div>
        <Tip>Vous recevez un SMS de confirmation avec le nom, la photo et le numéro de téléphone de votre chauffeur dès la réservation validée.</Tip>
      </div>
    ),
  },
  {
    id: "r2",
    category: "reservation",
    question: "Comment modifier ma réservation ?",
    answer: (
      <div className="space-y-4">
        <p className="text-[14px] text-grey-700">Toute modification est possible via votre espace client ou par téléphone :</p>
        <div className="rounded-xl border border-grey-200 bg-grey-50 p-5">
          <Steps items={[
            "Connectez-vous sur scod-vtc.sn → Mon compte → Mes réservations",
            "Sélectionnez la réservation à modifier",
            "Cliquez sur \"Modifier\" et changez l'heure, le lieu ou le véhicule",
            "Confirmez — vous recevrez un SMS de mise à jour",
          ]} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 text-[13.5px]">
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="mb-1 font-semibold text-green-900">Plus de 2h avant</p>
            <p className="text-green-700">Modification gratuite, sans frais</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="mb-1 font-semibold text-amber-900">Moins de 2h avant</p>
            <p className="text-amber-700">Modification sous réserve de disponibilité</p>
          </div>
        </div>
        <Tip>Pour les urgences, appelez directement le +221 77 123 45 67. Notre équipe est disponible 7j/7 de 6h à 23h.</Tip>
      </div>
    ),
  },
  {
    id: "r3",
    category: "reservation",
    question: "Puis-je réserver pour quelqu'un d'autre ?",
    answer: (
      <div className="space-y-4">
        <p className="text-[14px] text-grey-700">Oui, parfaitement. Lors de la réservation, vous pouvez renseigner les coordonnées du passager :</p>
        <div className="rounded-xl border border-grey-200 bg-grey-50 p-5">
          <Checks items={[
            "Prénom et nom du passager (pour la pancarte nominative)",
            "Numéro de téléphone du passager (pour le SMS de confirmation)",
            "Numéro de vol si c'est un transfert aéroport",
            "Instructions spéciales (bagages, accessibilité, etc.)",
          ]} />
        </div>
        <Tip>Le chauffeur contactera directement le passager. Vous restez le référent pour toute question de facturation.</Tip>
      </div>
    ),
  },
  {
    id: "r4",
    category: "reservation",
    question: "Quelle est la zone de couverture de SCOD VTC ?",
    answer: (
      <div className="space-y-4">
        <p className="text-[14px] text-grey-700">SCOD VTC opère dans toutes les grandes villes du Sénégal :</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { city: "Dakar", desc: "Toutes communes — tarif standard" },
            { city: "Thiès", desc: "Desserte complète, tarif selon distance" },
            { city: "Saly & Mbour", desc: "Résidences, hôtels, plages" },
            { city: "Saint-Louis", desc: "Sur réservation, tarif forfait" },
            { city: "Touba", desc: "Disponible, tarif sur devis" },
            { city: "Aéroport AIBD", desc: "Service dédié, tarif fixe" },
          ].map(({ city, desc }) => (
            <div key={city} className="rounded-xl border border-grey-200 bg-grey-50 p-4">
              <p className="font-semibold text-grey-900">{city}</p>
              <p className="text-[13px] text-grey-600">{desc}</p>
            </div>
          ))}
        </div>
        <Tip>Pour toute destination hors liste, contactez-nous — nous étudions chaque demande.</Tip>
      </div>
    ),
  },
  {
    id: "r5",
    category: "reservation",
    question: "Les sièges enfants sont-ils disponibles ?",
    answer: (
      <div className="space-y-4">
        <p className="text-[14px] text-grey-700">Oui. SCOD VTC propose des sièges enfants adaptés à chaque âge :</p>
        <div className="rounded-xl border border-grey-200 bg-grey-50 p-5">
          <Checks items={[
            "Siège bébé (0-13 kg) — pour les nourrissons",
            "Siège groupe 1 (9-18 kg) — pour les tout-petits",
            "Rehausseur (15-36 kg) — pour les enfants de 4-10 ans",
          ]} />
        </div>
        <p className="text-[14px] text-grey-700">Pour en bénéficier, précisez-le dans le champ "Besoins spécifiques" lors de votre réservation ou contactez-nous à l'avance.</p>
        <Tip>Siège enfant inclus sans supplément dans la majorité des véhicules SCOD VTC.</Tip>
      </div>
    ),
  },

  /* ── Paiement ────────────────────────────────────────── */
  {
    id: "p1",
    category: "paiement",
    question: "Quels modes de paiement acceptez-vous ?",
    answer: (
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { title: "Mobile Money", items: ["Orange Money", "Wave", "Free Money"], note: "Via PayTech" },
            { title: "Carte bancaire", items: ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay"], note: "Via Stripe" },
            { title: "Autres", items: ["Espèces (FCFA)", "Wave Business"], note: "Entreprises" },
          ].map(({ title, items, note }) => (
            <div key={title} className="rounded-xl border border-grey-200 bg-grey-50 p-4">
              <p className="mb-2 font-semibold text-grey-900">{title}</p>
              <ul className="mb-2 space-y-1">
                {items.map((item) => (
                  <li key={item} className="text-[13px] text-grey-700">· {item}</li>
                ))}
              </ul>
              <span className="rounded-full bg-grey-200 px-2 py-0.5 text-[11px] text-grey-600">{note}</span>
            </div>
          ))}
        </div>
        <Tip>Paiement 100% sécurisé. Vos coordonnées bancaires ne sont jamais stockées sur nos serveurs.</Tip>
      </div>
    ),
  },
  {
    id: "p2",
    category: "paiement",
    question: "Comment fonctionne le paiement Wave Business ?",
    answer: (
      <div className="space-y-4">
        <p className="text-[14px] text-grey-700">Wave Business est réservé aux entreprises ayant souscrit à notre offre professionnelle :</p>
        <div className="rounded-xl border border-grey-200 bg-grey-50 p-5">
          <Steps items={[
            "Créez votre compte entreprise sur scod-vtc.sn",
            "Ajoutez vos collaborateurs avec leurs identifiants",
            "Ils réservent normalement — SCOD VTC enregistre les courses",
            "En fin de mois, vous recevez une facture consolidée Wave Business",
            "Règlement par virement Wave Business ou virement bancaire",
          ]} />
        </div>
        <Tip>Inclut un export PDF/CSV détaillé par collaborateur et par projet pour votre comptabilité.</Tip>
      </div>
    ),
  },
  {
    id: "p3",
    category: "paiement",
    question: "Puis-je payer par carte internationale (Stripe) ?",
    answer: (
      <div className="space-y-4">
        <p className="text-[14px] text-grey-700">Absolument. SCOD VTC accepte toutes les cartes bancaires internationales via Stripe :</p>
        <div className="rounded-xl border border-grey-200 bg-grey-50 p-5">
          <Checks items={[
            "Visa, Mastercard, American Express",
            "Apple Pay (iPhone, Mac avec Touch ID)",
            "Google Pay (Android, Chrome)",
            "Cartes prépayées et cartes virtuelles compatibles",
          ]} />
        </div>
        <p className="text-[14px] text-grey-700">Le paiement est sécurisé par le protocole 3D Secure. Aucune donnée carte n'est stockée chez nous.</p>
        <Tip>Si votre carte est refusée, vérifiez que les paiements en ligne internationaux sont activés auprès de votre banque.</Tip>
      </div>
    ),
  },
  {
    id: "p4",
    category: "paiement",
    question: "Quand suis-je débité ?",
    answer: (
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-grey-200 bg-grey-50 p-5">
            <p className="mb-2 font-semibold text-grey-900">À la réservation</p>
            <p className="text-[14px] text-grey-700">Un acompte de <span className="font-bold text-accent">30%</span> est prélevé pour confirmer votre réservation et bloquer votre chauffeur.</p>
          </div>
          <div className="rounded-xl border border-grey-200 bg-grey-50 p-5">
            <p className="mb-2 font-semibold text-grey-900">En fin de course</p>
            <p className="text-[14px] text-grey-700">Le solde de <span className="font-bold text-accent">70%</span> est prélevé à la fin de votre trajet. Total = tarif fixe affiché lors de la réservation.</p>
          </div>
        </div>
        <Tip>Si vous payez en espèces, la totalité est réglée directement au chauffeur en fin de course. Pas d'acompte dans ce cas.</Tip>
      </div>
    ),
  },

  /* ── Véhicules ───────────────────────────────────────── */
  {
    id: "v1",
    category: "vehicules",
    question: "Quelle gamme de véhicule choisir ?",
    answer: (
      <div className="space-y-3">
        {[
          { name: "BERLINE", models: "BMW Série 5, Mercedes Classe E", desc: "Idéale pour 1-3 passagers, trajets professionnels et rendez-vous d'affaires.", color: "bg-amber-500/10 text-amber-700 border-amber-500/20" },
          { name: "SUV", models: "Tesla Model X, Peugeot 3008", desc: "Idéale pour familles, bagages volumineux et confort maximal sur longue distance.", color: "bg-blue-500/10 text-blue-700 border-blue-500/20" },
          { name: "VAN VIP", models: "Mercedes Classe V — 6 places", desc: "Idéale pour groupes, délégations étrangères et événements corporate.", color: "bg-violet-500/10 text-violet-700 border-violet-500/20" },
          { name: "PMR", models: "Van accessible fauteuil roulant", desc: "Rampe électrique, fixations sécurisées, espace optimisé pour personnes à mobilité réduite.", color: "bg-sky-500/10 text-sky-700 border-sky-500/20" },
        ].map(({ name, models, desc, color }) => (
          <div key={name} className="rounded-xl border border-grey-200 bg-grey-50 p-4">
            <div className="mb-2 flex items-center gap-3">
              <span className={cn("rounded-full border px-3 py-0.5 text-[11px] font-bold tracking-wide", color)}>{name}</span>
              <span className="text-[13px] font-semibold text-grey-800">{models}</span>
            </div>
            <p className="text-[13.5px] text-grey-600">{desc}</p>
          </div>
        ))}
        <Tip>Pour un transfert aéroport AIBD, privilégiez le SUV ou Van pour plus d'espace bagages sur la route de Diamniadio.</Tip>
      </div>
    ),
  },
  {
    id: "v2",
    category: "vehicules",
    question: "Les véhicules sont-ils tous climatisés ?",
    answer: (
      <div className="space-y-4">
        <p className="text-[14px] text-grey-700">Oui. 100% de la flotte SCOD VTC est climatisée. C'est un standard non négociable :</p>
        <div className="rounded-xl border border-grey-200 bg-grey-50 p-5">
          <Checks items={[
            "Climatisation bizone réglable individuellement",
            "Eau minérale fraîche offerte à bord",
            "WiFi gratuit dans tous les véhicules",
            "Chargeur USB-C et sans fil disponibles",
            "Sièges en cuir ou tissu premium selon le modèle",
          ]} />
        </div>
        <Tip>Si vous avez une préférence de température, n'hésitez pas à l'indiquer au chauffeur en montant.</Tip>
      </div>
    ),
  },

  /* ── Aéroport ────────────────────────────────────────── */
  {
    id: "a1",
    category: "aeroport",
    question: "Comment retrouver mon chauffeur à l'aéroport AIBD ?",
    answer: (
      <div className="space-y-4">
        <div className="rounded-xl border border-grey-200 bg-grey-50 p-5">
          <Steps items={[
            "À l'atterrissage, dirigez-vous vers la sortie principale des arrivées",
            "Votre chauffeur vous attend avec une pancarte à votre nom",
            "Il se présente, vérifie votre identité et vous aide avec vos bagages",
            "Direction votre destination dans le véhicule réservé",
          ]} />
        </div>
        <p className="text-[14px] text-grey-700">En cas de difficulté, appelez directement votre chauffeur — son numéro est inclus dans votre SMS de confirmation.</p>
        <Tip>Pensez à renseigner votre numéro de vol lors de la réservation pour un suivi automatique et un accueil parfaitement synchronisé.</Tip>
      </div>
    ),
  },
  {
    id: "a2",
    category: "aeroport",
    question: "Que se passe-t-il si mon vol est en retard ?",
    answer: (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-green-200 bg-green-50 p-5">
            <p className="mb-3 flex items-center gap-2 font-semibold text-green-900">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white text-sm">✓</span>
              Vol renseigné
            </p>
            <ul className="space-y-1.5 text-[13.5px] text-green-800">
              <li>• Suivi automatique en temps réel</li>
              <li>• Chauffeur ajuste son heure d'arrivée</li>
              <li>• 15 min d'attente supplémentaires offertes</li>
              <li>• Aucune action de votre part requise</li>
            </ul>
          </div>
          <div className="rounded-xl border border-grey-200 bg-grey-50 p-5">
            <p className="mb-3 flex items-center gap-2 font-semibold text-grey-900">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-grey-400 text-white text-sm">!</span>
              Vol non renseigné
            </p>
            <ul className="space-y-1.5 text-[13.5px] text-grey-700">
              <li>• Appelez votre chauffeur</li>
              <li>• Communiquez votre nouveau horaire</li>
              <li>• Attente facturée après 15 min incluses</li>
            </ul>
          </div>
        </div>
        <Tip>Aucun frais supplémentaire si vous avez renseigné votre numéro de vol. Le suivi est automatique — concentrez-vous sur votre voyage.</Tip>
      </div>
    ),
  },
  {
    id: "a3",
    category: "aeroport",
    question: "Le tarif du transfert aéroport est-il vraiment fixe ?",
    answer: (
      <div className="space-y-4">
        <p className="text-[14px] text-grey-700">Oui, absolument. Le tarif affiché à la réservation est le tarif que vous payez — sans exception :</p>
        <div className="rounded-xl border border-grey-200 bg-grey-50 p-5">
          <Checks items={[
            "Aucun supplément en cas d'embouteillages",
            "Aucun supplément en cas de détour",
            "15 min d'attente à l'aéroport incluses gratuitement",
            "Péages et parking aéroport inclus",
            "Aide aux bagages incluse",
          ]} />
        </div>
        <div className="rounded-xl border border-grey-200 bg-grey-50 p-5">
          <p className="mb-3 font-semibold text-grey-900">Suppléments optionnels connus à l'avance</p>
          <div className="space-y-2 text-[13.5px] text-grey-700">
            <div className="flex justify-between"><span>Horaire de nuit (22h–6h)</span><span className="font-semibold">+5 000 FCFA</span></div>
            <div className="flex justify-between"><span>Zone hors Dakar (&gt;50 km)</span><span className="font-semibold">+10 000 FCFA</span></div>
          </div>
        </div>
        <Tip>Ces suppléments sont affichés et acceptés avant votre paiement. Aucune surprise en fin de course.</Tip>
      </div>
    ),
  },

  /* ── Entreprises ─────────────────────────────────────── */
  {
    id: "e1",
    category: "entreprises",
    question: "Comment créer un compte entreprise ?",
    answer: (
      <div className="space-y-4">
        <div className="rounded-xl border border-grey-200 bg-grey-50 p-5">
          <Steps items={[
            "Remplissez le formulaire sur scod-vtc.sn/entreprises",
            "Renseignez NINEA, raison sociale, contact RH et volume mensuel estimé",
            "Notre équipe valide votre compte sous 24h ouvrées",
            "Vous recevez vos identifiants et invitez vos collaborateurs",
            "Vos employés réservent — vous gérez depuis le dashboard",
          ]} />
        </div>
        <Tip>La création du compte entreprise est gratuite et sans engagement. Un chargé de compte vous accompagne à l'onboarding.</Tip>
      </div>
    ),
  },
  {
    id: "e2",
    category: "entreprises",
    question: "Comment fonctionne la facturation mensuelle ?",
    answer: (
      <div className="space-y-4">
        <p className="text-[14px] text-grey-700">La facturation mensuelle est automatisée et transparente :</p>
        <div className="rounded-xl border border-grey-200 bg-grey-50 p-5">
          <Steps items={[
            "Chaque trajet est enregistré en temps réel dans votre dashboard",
            "Le 1er du mois, une facture consolidée est générée automatiquement",
            "Règlement par Wave Business, virement SEPA ou chèque",
            "Délai de paiement : 30 jours",
          ]} />
        </div>
        <div className="rounded-xl border border-grey-200 bg-grey-50 p-5">
          <p className="mb-2 font-semibold text-grey-900">Inclus dans le reporting</p>
          <Checks items={[
            "Détail par collaborateur et par trajet",
            "Export CSV et PDF pour votre comptabilité",
            "Filtres par département, projet ou centre de coût",
            "Historique 12 mois disponible",
          ]} />
        </div>
      </div>
    ),
  },

  /* ── Annulation ──────────────────────────────────────── */
  {
    id: "an1",
    category: "annulation",
    question: "Comment annuler ma réservation et être remboursé ?",
    answer: (
      <div className="space-y-4">
        <p className="text-[14px] text-grey-700">L'annulation se fait depuis votre espace client ou par téléphone. La politique de remboursement est claire :</p>
        <div className="space-y-3">
          {[
            { delay: "Plus de 24h avant", refund: "100% remboursé", color: "border-green-200 bg-green-50 text-green-900" },
            { delay: "Entre 2h et 24h avant", refund: "50% remboursé", color: "border-amber-200 bg-amber-50 text-amber-900" },
            { delay: "Moins de 2h avant", refund: "Non remboursé", color: "border-red-200 bg-red-50 text-red-900" },
          ].map(({ delay, refund, color }) => (
            <div key={delay} className={cn("flex items-center justify-between rounded-xl border p-4", color)}>
              <span className="font-medium">{delay}</span>
              <span className="font-bold">{refund}</span>
            </div>
          ))}
        </div>
        <Tip>Le remboursement est effectué dans les 3-5 jours ouvrés sur le moyen de paiement d'origine.</Tip>
      </div>
    ),
  },
  {
    id: "an2",
    category: "annulation",
    question: "Quels sont les suppléments possibles ?",
    answer: (
      <div className="space-y-4">
        <p className="text-[14px] text-grey-700">Tous les suppléments sont transparents et affichés avant votre confirmation de paiement :</p>
        <div className="overflow-hidden rounded-xl border border-grey-200">
          <table className="w-full text-[13.5px]">
            <thead className="bg-grey-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-grey-900">Supplément</th>
                <th className="px-4 py-3 text-right font-semibold text-grey-900">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-grey-100">
              {[
                ["Prise en charge à l'aéroport AIBD", "+2 000 FCFA"],
                ["Horaire de nuit (22h–6h)", "+5 000 FCFA"],
                ["Zone hors Dakar (>50 km)", "+10 000 FCFA"],
                ["Attente supplémentaire (>15 min)", "+2 000 FCFA / 15 min"],
                ["Siège enfant (sur demande)", "Gratuit"],
              ].map(([label, price]) => (
                <tr key={label} className="bg-white">
                  <td className="px-4 py-3 text-grey-700">{label}</td>
                  <td className="px-4 py-3 text-right font-semibold text-accent">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Tip>Aucun supplément caché. Si un supplément s'applique à votre trajet, il est affiché et accepté avant votre paiement.</Tip>
      </div>
    ),
  },
];

/* ─────────────────────────────────────────────────────────
   Category Tabs Config
───────────────────────────────────────────────────────── */

const tabCategories: { id: Category; label: string; count: number }[] = [
  { id: "toutes",      label: "Toutes",      count: faqItems.length },
  { id: "reservation", label: "Réservation", count: faqItems.filter(f => f.category === "reservation").length },
  { id: "paiement",    label: "Paiement",    count: faqItems.filter(f => f.category === "paiement").length },
  { id: "vehicules",   label: "Véhicules",   count: faqItems.filter(f => f.category === "vehicules").length },
  { id: "aeroport",    label: "Aéroport",    count: faqItems.filter(f => f.category === "aeroport").length },
  { id: "entreprises", label: "Entreprises", count: faqItems.filter(f => f.category === "entreprises").length },
  { id: "annulation",  label: "Annulation",  count: faqItems.filter(f => f.category === "annulation").length },
];

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */

export default function FAQPage() {
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState<Category>("toutes");
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  const filtered = useMemo(() => {
    let items = faqItems;
    if (category !== "toutes") {
      items = items.filter((f) => f.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          (typeof f.answer === "string" && f.answer.toLowerCase().includes(q))
      );
    }
    return items;
  }, [search, category]);

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-dark py-20 lg:py-28">
        {/* Background image */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/cars/header-hero/hero-premium.jpg')" }}
        />
        {/* Dark overlay */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-brand-dark/95 via-brand-dark/85 to-brand-dark/55" />
        {/* Grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #FFC300, transparent 65%)" }}
        />

        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-4 inline-block text-[12px] font-bold uppercase tracking-[0.25em] text-accent">
              Centre d'aide
            </span>
            <h1
              className="mb-8 font-sans font-bold leading-none tracking-tight text-white"
              style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
            >
              Comment pouvons-nous
              <br />
              vous aider ?
            </h1>

            {/* Search */}
            <div className="relative mx-auto max-w-xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-grey-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCategory("toutes");
                }}
                placeholder="Rechercher une question..."
                className={cn(
                  "h-14 w-full rounded-2xl border-2 bg-white pl-12 pr-4",
                  "text-[15px] text-grey-900 placeholder:text-grey-400",
                  "outline-none transition-all duration-200",
                  "border-transparent focus:border-accent focus:shadow-xl focus:shadow-accent/20"
                )}
              />
            </div>

            {/* Quick links */}
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {["Annulation", "Paiement", "Aéroport AIBD", "Entreprise"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearch(tag.toLowerCase())}
                  className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-[12px] font-medium text-white/60 transition-colors hover:border-white/30 hover:text-white"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Body ──────────────────────────────────────────── */}
      <section className="bg-grey-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex gap-10 lg:items-start">

            {/* ── Main content ───────────────────────────── */}
            <div className="min-w-0 flex-1">

              {/* Category tabs */}
              {!search && (
                <div className="mb-8 overflow-x-auto">
                  <div className="flex gap-2 pb-2">
                    {tabCategories.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => { setCategory(tab.id); setOpenItem(undefined); }}
                        className={cn(
                          "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200",
                          category === tab.id
                            ? "bg-accent text-brand shadow-md shadow-accent/25"
                            : "bg-white text-grey-600 hover:bg-grey-100"
                        )}
                      >
                        {tab.label}
                        <span
                          className={cn(
                            "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                            category === tab.id
                              ? "bg-brand/20 text-brand"
                              : "bg-grey-100 text-grey-500"
                          )}
                        >
                          {tab.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search result label */}
              {search && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 flex items-center justify-between"
                >
                  <p className="text-[14px] text-grey-500">
                    <span className="font-semibold text-grey-900">{filtered.length}</span> résultat{filtered.length !== 1 ? "s" : ""} pour "{search}"
                  </p>
                  <button
                    onClick={() => setSearch("")}
                    className="text-[13px] font-medium text-accent hover:underline"
                  >
                    Effacer
                  </button>
                </motion.div>
              )}

              {/* Accordion */}
              <AnimatePresence mode="wait">
                {filtered.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-16 text-center"
                  >
                    <p className="text-[16px] text-grey-500">
                      Aucune question trouvée pour "{search}"
                    </p>
                    <button
                      onClick={() => setSearch("")}
                      className="mt-4 text-[14px] font-semibold text-accent hover:underline"
                    >
                      Réinitialiser la recherche
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={category + search}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Accordion.Root
                      type="single"
                      value={openItem}
                      onValueChange={setOpenItem}
                      collapsible
                      className="space-y-3"
                    >
                      {filtered.map((item, i) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.04 }}
                        >
                          <Accordion.Item
                            value={item.id}
                            className={cn(
                              "overflow-hidden rounded-2xl border-2 bg-white transition-all duration-200",
                              openItem === item.id
                                ? "border-accent shadow-lg shadow-accent/8"
                                : "border-grey-200 hover:border-grey-300"
                            )}
                          >
                            <Accordion.Header>
                              <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6">
                                <span className="text-[15px] font-semibold leading-snug text-grey-900 sm:text-[16px]">
                                  {item.question}
                                </span>
                                <div
                                  className={cn(
                                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
                                    openItem === item.id
                                      ? "rotate-180 bg-accent text-brand"
                                      : "bg-grey-100 text-grey-400 group-hover:bg-grey-200"
                                  )}
                                >
                                  <ChevronDown className="h-4 w-4" />
                                </div>
                              </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                              <div className="border-t border-grey-100 px-5 py-5 sm:px-6">
                                {item.answer}
                              </div>
                            </Accordion.Content>
                          </Accordion.Item>
                        </motion.div>
                      ))}
                    </Accordion.Root>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Sidebar ────────────────────────────────── */}
            <aside className="hidden lg:block lg:w-[300px] lg:shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* Contact card */}
                <div className="rounded-2xl border border-grey-200 bg-white p-6">
                  <h3 className="mb-1 font-sans text-[18px] font-bold text-grey-900">
                    Besoin d'aide ?
                  </h3>
                  <p className="mb-5 text-[13px] text-grey-500">
                    Notre équipe répond en moins de 5 minutes.
                  </p>

                  <div className="space-y-3">
                    <a
                      href="https://wa.me/221771234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl bg-[#25D366] px-4 py-3 text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#25D366]/30"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                    <a
                      href="tel:+221771234567"
                      className="flex items-center gap-3 rounded-xl border-2 border-grey-900 px-4 py-3 text-[13px] font-semibold text-grey-900 transition-all duration-200 hover:bg-grey-900 hover:text-white"
                    >
                      <Phone className="h-4 w-4" />
                      +221 77 123 45 67
                    </a>
                    <a
                      href="mailto:contact@scodvtc.sn"
                      className="flex items-center gap-3 rounded-xl border-2 border-grey-200 px-4 py-3 text-[13px] font-semibold text-grey-700 transition-all duration-200 hover:border-grey-300 hover:text-grey-900"
                    >
                      <Mail className="h-4 w-4" />
                      contact@scodvtc.sn
                    </a>
                  </div>

                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-grey-50 px-3 py-2.5">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className="text-[12px] text-grey-600">
                      Disponible <span className="font-semibold text-grey-900">7j/7, 6h–23h</span>
                    </span>
                  </div>
                </div>

                {/* Quick links */}
                <div className="rounded-2xl border border-grey-200 bg-white p-6">
                  <h3 className="mb-4 font-sans text-[15px] font-bold text-grey-900">
                    Liens utiles
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: "Réserver une course", href: "/reservation" },
                      { label: "Commander maintenant", href: "/commander" },
                      { label: "Transfert aéroport", href: "/services/transfert-aeroport" },
                      { label: "Offre entreprises", href: "/entreprises" },
                      { label: "Nous contacter", href: "/assistance" },
                    ].map(({ label, href }) => (
                      <Link
                        key={href}
                        href={href}
                        className="block rounded-lg px-3 py-2 text-[13px] font-medium text-grey-700 transition-colors hover:bg-grey-50 hover:text-accent"
                      >
                        {label} →
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
