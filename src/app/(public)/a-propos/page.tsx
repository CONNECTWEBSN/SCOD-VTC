"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   Animation helpers
───────────────────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ─────────────────────────────────────────────────────────
   Animated counter
───────────────────────────────────────────────────────── */

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, target, {
        duration: 1.8,
        ease: "easeOut",
        onUpdate: (value) => setDisplayValue(Math.round(value)),
      });
      return () => controls.stop();
    }
  }, [inView, target]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      className="font-sans font-bold text-accent"
      style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
    >
      {displayValue.toLocaleString("fr-FR")}{suffix}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────────────────
   Static data
───────────────────────────────────────────────────────── */

const timeline = [
  {
    year: "2021",
    label: "Création",
    desc: "SCOD VTC est fondé à Dakar par une équipe de passionnés de mobilité premium. Vision : combler le vide entre les taxis classiques et l'exigence des clients internationaux.",
  },
  {
    year: "2022",
    label: "Première course",
    desc: "Le premier client est accueilli à l'aéroport AIBD. La promesse est tenue : ponctualité, élégance, tarif fixe. Le bouche-à-oreille commence.",
  },
  {
    year: "2023",
    label: "Expansion",
    desc: "La flotte passe de 1 à 6 véhicules premium. Lancement des offres entreprises, des transferts aéroport dédiés et du transport événementiel.",
  },
  {
    year: "2024",
    label: "Aujourd'hui",
    desc: "Plus de 2 000 trajets réalisés, une note de 4.8/5, des clients fidèles dans toute la région. SCOD VTC s'impose comme la référence VTC au Sénégal.",
  },
];

const team = [
  {
    name: "Ousmane Diallo",
    role: "Co-fondateur & CEO",
    bio: "Entrepreneur sénégalais, passionné de mobilité urbaine et de service client d'exception.",
    initials: "OD",
    color: "from-blue-600 to-brand",
  },
  {
    name: "Fatou Ndiaye",
    role: "Co-fondatrice & Ops",
    bio: "Ancienne responsable logistique, elle structure les opérations avec rigueur et bienveillance.",
    initials: "FN",
    color: "from-violet-600 to-brand",
  },
  {
    name: "Ibrahima Sow",
    role: "Responsable Flotte",
    bio: "Mécanicien formé en France, garant de la qualité et de la fiabilité de chaque véhicule.",
    initials: "IS",
    color: "from-rose-600 to-brand",
  },
  {
    name: "Aïssatou Bâ",
    role: "Expérience Client",
    bio: "Ancienne hôtesse VIP, elle veille à ce que chaque course soit une expérience mémorable.",
    initials: "AB",
    color: "from-amber-500 to-accent",
  },
];

const stats = [
  { value: 2000, suffix: "+", label: "Trajets réalisés" },
  { value: 4.8,  suffix: "/5", label: "Satisfaction client", float: true },
  { value: 15,   suffix: " min", label: "Attente max aéroport" },
  { value: 6,    suffix: "",    label: "Véhicules premium" },
];

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */

export default function AProposPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-dark py-24 lg:py-36">
        {/* Background image */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/cars/header-hero/navettes-vip.jpg')" }}
        />
        {/* Dark overlay */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-brand-dark/95 via-brand-dark/85 to-brand-dark/60" />
        {/* grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #FFC300, transparent 65%)" }}
        />

        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-5 inline-block text-[12px] font-bold uppercase tracking-[0.25em] text-accent">
              Notre histoire
            </span>
            <h1
              className="font-sans font-bold leading-none tracking-tight text-white"
              style={{ fontSize: "clamp(38px, 5.5vw, 64px)" }}
            >
              À propos de
              <br />
              <span className="text-accent">SCOD VTC</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-[16px] leading-relaxed text-white/60">
              Le premier service VTC premium 100&nbsp;% sénégalais.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Notre Histoire + Timeline ─────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">

            {/* Narrative */}
            <motion.div {...fadeUp(0)}>
              <span className="mb-4 inline-block text-[12px] font-bold uppercase tracking-[0.25em] text-accent">
                Notre histoire
              </span>
              <h2
                className="mb-6 font-sans font-bold leading-tight text-grey-900"
                style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}
              >
                Né d&apos;une frustration,
                <br />
                construit sur une conviction.
              </h2>
              <div className="space-y-5 text-[16px] leading-[1.85] text-grey-600">
                <p>
                  Tout a commencé par une observation simple : à Dakar, il était impossible de
                  trouver un service de transport fiable, élégant et au prix annoncé. Entre taxis
                  négociés au bord de la route et applications étrangères peu adaptées au marché
                  local, il manquait quelque chose d&apos;évident.
                </p>
                <p>
                  SCOD VTC est né de cette frustration en 2021. Notre pari : créer le premier
                  réseau VTC premium pensé par des Sénégalais, pour des Sénégalais — et pour
                  tous ceux qui visitent notre pays ou y travaillent.
                </p>
                <p>
                  Aujourd&apos;hui, nous sommes fiers d&apos;avoir réalisé plus de 2&nbsp;000 trajets avec
                  une satisfaction client de 4.8/5. Chaque course est pour nous l&apos;occasion de
                  prouver qu&apos;excellence et accessibilité ne sont pas incompatibles.
                </p>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div {...fadeUp(0.15)}>
              <div className="relative space-y-0">
                {timeline.map((item, i) => (
                  <div key={item.year} className="relative flex gap-6 pb-10 last:pb-0">
                    {/* vertical line */}
                    {i < timeline.length - 1 && (
                      <div
                        aria-hidden
                        className="absolute left-[19px] top-10 w-px"
                        style={{
                          height: "calc(100% - 8px)",
                          background: "linear-gradient(180deg, rgba(255,195,0,0.35) 0%, rgba(255,195,0,0.05) 100%)",
                        }}
                      />
                    )}

                    {/* dot */}
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-white shadow-lg shadow-accent/15">
                      <span className="font-sans text-[9px] font-bold text-accent leading-none">
                        {item.year}
                      </span>
                    </div>

                    <div className="pt-1.5">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-accent">
                          {item.year}
                        </span>
                        <span className="h-px w-6 bg-accent/30" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-grey-400">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-[14px] leading-relaxed text-grey-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────── */}
      <section className="bg-grey-50 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <motion.div {...fadeUp(0)}>
            <div className="relative overflow-hidden rounded-3xl border-2 border-accent/25 bg-accent/5 px-8 py-12 text-center sm:px-14 sm:py-16">
              {/* decorative quotes */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-8 top-4 font-sans text-[120px] font-bold leading-none text-accent/10 select-none"
              >
                "
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-4 right-8 font-sans text-[120px] font-bold leading-none text-accent/10 select-none"
              >
                "
              </span>

              <span className="mb-5 inline-block text-[12px] font-bold uppercase tracking-[0.25em] text-accent">
                Notre mission
              </span>
              <p
                className="relative mx-auto max-w-2xl font-sans font-bold leading-tight text-grey-900"
                style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
              >
                Offrir à chaque Sénégalais, chaque visiteur et chaque entreprise un service de
                transport à la hauteur de leurs ambitions.{" "}
                <span className="text-accent">Sécurisé, ponctuel, premium.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div {...fadeUp(0)} className="mb-14 text-center">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.25em] text-accent">
              L&apos;équipe
            </span>
            <h2
              className="font-sans font-bold leading-tight text-grey-900"
              style={{ fontSize: "clamp(26px, 4vw, 44px)" }}
            >
              Les visages derrière SCOD VTC
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[15px] text-grey-500">
              Une équipe soudée, exigeante, et passionnée par l&apos;excellence du service.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.div key={member.name} {...fadeUp(i * 0.08)}>
                <div className="group flex h-full flex-col items-center rounded-2xl border-2 border-grey-200 bg-white p-7 text-center transition-all duration-250 hover:-translate-y-1 hover:border-accent/20 hover:shadow-xl hover:shadow-grey-900/5">
                  {/* Avatar */}
                  <div
                    className={`mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${member.color} shadow-lg`}
                  >
                    <span className="font-sans text-[22px] font-bold text-white">
                      {member.initials}
                    </span>
                  </div>

                  <h3 className="mb-0.5 font-sans text-[17px] font-bold text-grey-900">
                    {member.name}
                  </h3>
                  <p className="mb-4 text-[12px] font-semibold uppercase tracking-wider text-accent">
                    {member.role}
                  </p>
                  <p className="text-[13.5px] leading-relaxed text-grey-500">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section className="bg-brand-dark py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div {...fadeUp(0)} className="mb-14 text-center">
            <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.25em] text-accent">
              En chiffres
            </span>
            <h2
              className="font-sans font-bold text-white"
              style={{ fontSize: "clamp(26px, 4vw, 44px)" }}
            >
              SCOD VTC aujourd&apos;hui
            </h2>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp(i * 0.1)}>
                <div className="flex flex-col items-center justify-center gap-3 bg-white/5 px-8 py-12 text-center backdrop-blur-sm">
                  <div className="flex items-baseline gap-0.5 leading-none">
                    {stat.float ? (
                      <span
                        className="font-sans font-bold text-accent"
                        style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
                      >
                        {stat.value}
                        {stat.suffix}
                      </span>
                    ) : (
                      <Counter target={stat.value} suffix={stat.suffix} />
                    )}
                  </div>
                  <p className="text-[13px] font-medium text-white/50">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="bg-grey-50 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <motion.div {...fadeUp(0)}>
            <span className="mb-4 inline-block text-[12px] font-bold uppercase tracking-[0.25em] text-accent">
              Rejoignez l&apos;aventure
            </span>
            <h2
              className="mb-4 font-sans font-bold leading-tight text-grey-900"
              style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
            >
              Prêt à vivre l&apos;expérience
              <br />
              <span className="text-brand">SCOD VTC ?</span>
            </h2>
            <p className="mb-10 text-[15px] leading-relaxed text-grey-500">
              Que vous soyez passager ou chauffeur, rejoignez le réseau VTC
              premium du Sénégal dès aujourd&apos;hui.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/commander">
                <motion.span
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex h-13 cursor-pointer items-center gap-2 rounded-xl bg-accent px-8 font-bold text-[15px] text-brand shadow-lg shadow-accent/25 transition-colors hover:bg-accent-light"
                >
                  Réserver une course
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>

              <Link href="/devenir-chauffeur">
                <motion.span
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex h-13 cursor-pointer items-center gap-2 rounded-xl border-2 border-brand px-8 font-bold text-[15px] text-brand transition-all hover:bg-brand hover:text-white"
                >
                  Devenir chauffeur
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
