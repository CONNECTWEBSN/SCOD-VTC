# SCOD VTC — PLAYBOOK DE DÉVELOPPEMENT FROM SCRATCH

**Application Web Premium · Niveau Uber Pro**
Pipeline 5 Phases · Cursor + Claude AI · Prompts prêts à copier-coller

---

## Stack Technique Choisie

| Couche | Choix | Pourquoi |
|--------|-------|----------|
| **Framework** | Next.js 15 (App Router) | SSR/SSG natif, API routes, image optimization, le standard SaaS 2026 |
| **Langage** | TypeScript strict | Zéro `any`, typage complet, moins de bugs |
| **Styling** | Tailwind CSS 4 + `clsx` + `tailwind-merge` | Cohérent avec le design system SCOD, utilitarian, responsive natif |
| **Animations** | Framer Motion | Déclaratives, scroll-triggered, page transitions, le meilleur sur React |
| **UI Components** | Radix UI + shadcn/ui | Accessibilité native, headless, personnalisables, pas de style imposé |
| **Icons** | Lucide React | Open source, cohérent, léger, SVG optimisé |
| **Forms** | react-hook-form + Zod | Validation client + serveur, performant, type-safe |
| **Backend** | Supabase (PostgreSQL) | Auth, DB relationnelle, Realtime, Storage, Row Level Security |
| **Auth** | Supabase Auth (OTP SMS + Email) | Natif Sénégal : connexion par numéro de téléphone |
| **Paiement local** | PayTech API | Mobile money natif Sénégal : Orange Money, Wave, Free Money |
| **Paiement international** | Stripe | CB internationales (Visa, Mastercard, Amex), Apple Pay, Google Pay |
| **Paiement entreprise** | Wave Business | Facturation centralisée entreprise, paiements récurrents |
| **Maps** | Google Maps Platform | Places Autocomplete, Directions, Distance Matrix pour calcul prix |
| **SMS** | Twilio | Confirmations de réservation, notifications chauffeur |
| **Email** | Resend | Emails transactionnels (confirmations, reçus) |
| **Déploiement** | Vercel | Edge network, CI/CD auto, preview deploys, Analytics |

---

## Principe Fondamental

```
Mauvais prompt + Modèle puissant = Résultat moyen
Prompt précis + Méthode senior  = Résultat premium

→ Toujours analyser AVANT de coder
→ Toujours générer SECTION PAR SECTION, jamais tout d'un coup
→ 5+ contraintes visuelles explicites dans CHAQUE prompt
→ Préciser la stack dans CHAQUE prompt
→ Citer des références visuelles (Uber, Stripe, Linear)
```

---

## Cartographie complète des pages

| Page | Route | Type | Priorité |
|------|-------|------|----------|
| Home (Hero + sections) | `/` | SSG | ⚡ Critique |
| Commander une course | `/commander` | CSR | ⚡ Critique |
| Réservation (stepper 5 étapes) | `/reservation` | CSR | ⚡ Critique |
| Location de véhicule | `/location` | SSG + CSR | Haute |
| Transfert Aéroport AIBD | `/services/transfert-aeroport` | SSG | ⚡ Critique |
| Transport Événementiel | `/services/evenements` | SSG | Haute |
| Landing Entreprises | `/entreprises` | SSG | Haute |
| Trajets Pro | `/entreprises/trajets-pro` | SSG | Haute |
| Chauffeur à Disposition | `/entreprises/chauffeur-disposition` | SSG | Haute |
| Pourquoi SCOD VTC | `/pourquoi-scod` | SSG | Moyenne |
| FAQ Complète | `/faq` | SSG | Haute |
| Assistance / Contact | `/assistance` | SSG + CSR | Haute |
| Devenir Chauffeur | `/devenir-chauffeur` | SSG | Moyenne |
| À Propos | `/a-propos` | SSG | Moyenne |
| Connexion | `/connexion` | CSR | ⚡ Critique |
| Inscription | `/inscription` | CSR | ⚡ Critique |
| Dashboard Client | `/mon-compte` | SSR | ⚡ Critique |
| Mes Réservations | `/mon-compte/reservations` | SSR | ⚡ Critique |
| Mon Profil | `/mon-compte/profil` | SSR | Haute |
| Mes Paiements | `/mon-compte/paiements` | SSR | Haute |
| Suivi Course Temps Réel | `/suivi/[bookingId]` | CSR | ⚡ Critique |
| CGV | `/legal/cgv` | SSG | Basse |
| Politique de Confidentialité | `/legal/confidentialite` | SSG | Basse |
| Mentions Légales | `/legal/mentions-legales` | SSG | Basse |

**Total : 24 pages** (vs 2 dans l'ancien playbook)

---

## Sélection Modèle par Phase

| Phase | Modèle dans Cursor | Extended Thinking | Usage |
|-------|-------------------|-------------------|-------|
| Phase 1 : Analyse | **Opus 4.5** | Optionnel | Vision globale, critique design |
| Phase 2 : Architecture | **Opus 4.5** | Non | Décisions techniques assumées |
| Phase 3 : Setup | **Sonnet 4.5** | Non | Exécution rapide du scaffolding |
| Phase 4 : Hero | **Sonnet 4.5** | **OUI — Obligatoire** | Section la plus critique |
| Phase 4 : CTA Final | **Sonnet 4.5** | **OUI — Recommandé** | Dernier levier de conversion |
| Phase 4 : Page Réservation | **Sonnet 4.5** | **OUI — Recommandé** | Core business |
| Phase 4 : Commander course | **Sonnet 4.5** | **OUI — Recommandé** | Expérience Uber-like |
| Phase 4 : Dashboard Client | **Sonnet 4.5** | **OUI — Recommandé** | Espace personnel critique |
| Phase 4 : Auth (Connexion) | **Sonnet 4.5** | **OUI — Recommandé** | Porte d'entrée utilisateur |
| Phase 4 : Suivi temps réel | **Sonnet 4.5** | **OUI — Recommandé** | Différenciateur Uber-like |
| Phase 4 : Autres sections | **Sonnet 4.5** | Non | Rapide, propre, économique |
| Phase 5 : Debug & Optim | **Opus 4.5** | Optionnel | Raisonnement profond |

---

# PHASE 1 — ANALYSE

> **Modèle : Claude Opus 4.5** · Durée : 2-3 jours · Livrable : `ANALYSIS.md`

### Étape 1.1 : Créer le fichier ANALYSIS.md et coller le prompt

Dans Cursor, sélectionner **Claude Opus 4.5**, puis coller :

```
Tu es un senior product designer avec 10 ans d'experience chez Uber, Stripe et Linear.
Je te donne le code HTML de la page d'accueil actuelle du site SCOD VTC — un service de
chauffeur privé premium au Sénégal.

[COLLER ICI LE CONTENU DU FICHIER scod-vtc-home.html]

Analyse cette page comme un designer senior. Décris EN DÉTAIL :

1. STRUCTURE DU LAYOUT
   - Organisation grille/colonnes de chaque section
   - Flux de navigation utilisateur
   - Hiérarchie des informations

2. HIÉRARCHIE VISUELLE
   - Ce qui attire l'oeil en premier, en second, en troisième
   - Ordre de lecture naturel
   - Points d'attention mal placés

3. SYSTÈME D'ESPACEMENT
   - Le système 8px est-il respecté partout ?
   - Où l'espacement respire, où il étouffe ?
   - Cohérence entre sections

4. ÉCHELLE TYPOGRAPHIQUE
   - Analyse Barlow vs Barlow Condensed : usage correct ?
   - Tailles, poids, contraste entre titre/corps/meta
   - Comparaison avec l'échelle typo de Uber/Stripe

5. SYSTÈME DE COULEURS
   - #110E40 brand et #FFC300 accent : usage cohérent ?
   - Contraste WCAG AA respecté ?
   - Palette trop limitée ou suffisante ?

6. ÉLÉMENTS PREMIUM
   - Quels éléments font "premium" (micro-interactions, grain, glassmorphism) ?
   - Quels éléments font "template générique" ?
   - Que manque-t-il pour atteindre le niveau Uber ?

7. LES 5 PROBLÈMES VISUELS CRITIQUES
   - Pour chaque problème : description + impact + solution
   - Prioriser par impact sur la conversion

8. PLAN D'AMÉLIORATION
   - Les 10 quick wins pour passer de "bon" à "premium"
   - Les fonctionnalités manquantes pour le niveau Uber Pro

CONTEXTE BUSINESS :
- Cible : Dakarois CSP+, diaspora, touristes, entreprises
- Flotte : BMW Série 5, Tesla Model S/X, Range Rover, Mercedes Classe S/V, Van PMR
- Paiement : FCFA, Orange Money, Wave, Wave Business, Free Money, CB (Stripe), espèces
- Services : Transfert AIBD, trajets pro, famille, événements, inter-régions
- Chauffeurs : nom, photo, note, expérience visibles dès la réservation

Ne génère PAS de code. Sois précis, critique et opiniâtre.
Sauvegarde ton analyse dans ANALYSIS.md
```

---

# PHASE 2 — ARCHITECTURE

> **Modèle : Claude Opus 4.5** · Durée : 2-3 jours · Livrable : `ARCHITECTURE.md`

### Étape 2.1 : Architecture complète

Toujours dans **Opus 4.5**, coller :

```
En te basant sur ton analyse de SCOD VTC, propose l'architecture technique COMPLÈTE
du projet. Sauvegarde dans ARCHITECTURE.md

STACK IMPOSÉE :
- Next.js 15 App Router + TypeScript strict
- Tailwind CSS 4 + Framer Motion
- Radix UI + shadcn/ui
- Supabase (Postgres + Auth + Realtime)
- Google Maps Platform
- PayTech (paiement mobile money Sénégal : Orange Money, Wave, Free Money)
- Stripe (paiement CB internationales : Visa, Mastercard, Amex, Apple Pay, Google Pay)
- Wave Business (facturation entreprise)

DÉFINIS :

1. STRUCTURE DES DOSSIERS
   src/
   ├── app/
   │   ├── (public)/
   │   │   ├── page.tsx                          → Home (Hero + sections)
   │   │   ├── commander/page.tsx                → Commander une course (résa rapide Uber-like)
   │   │   ├── reservation/page.tsx              → Réservation complète (stepper 5 étapes)
   │   │   ├── location/page.tsx                 → Location de véhicule avec chauffeur
   │   │   ├── services/
   │   │   │   ├── transfert-aeroport/page.tsx   → Transfert AIBD (page dédiée)
   │   │   │   └── evenements/page.tsx           → Transport événementiel (page dédiée)
   │   │   ├── entreprises/
   │   │   │   ├── page.tsx                      → Landing entreprises
   │   │   │   ├── trajets-pro/page.tsx          → Trajets collaborateurs (page dédiée)
   │   │   │   └── chauffeur-disposition/page.tsx → Chauffeur à disposition (page dédiée)
   │   │   ├── pourquoi-scod/page.tsx            → Pourquoi SCOD VTC
   │   │   ├── faq/page.tsx                      → FAQ complète avec recherche
   │   │   ├── assistance/page.tsx               → Centre d'aide & contact
   │   │   ├── devenir-chauffeur/page.tsx        → Recrutement chauffeurs
   │   │   ├── a-propos/page.tsx                 → À propos de SCOD VTC
   │   │   ├── suivi/[bookingId]/page.tsx        → Suivi course temps réel
   │   │   └── legal/
   │   │       ├── cgv/page.tsx                  → Conditions générales
   │   │       ├── confidentialite/page.tsx       → Politique de confidentialité
   │   │       └── mentions-legales/page.tsx      → Mentions légales
   │   ├── (auth)/
   │   │   ├── connexion/page.tsx                → Login (OTP SMS + Email)
   │   │   └── inscription/page.tsx              → Register
   │   ├── (dashboard)/
   │   │   ├── mon-compte/page.tsx               → Dashboard client
   │   │   ├── mon-compte/reservations/page.tsx  → Historique réservations
   │   │   ├── mon-compte/profil/page.tsx        → Profil & préférences
   │   │   └── mon-compte/paiements/page.tsx     → Moyens de paiement
   │   └── (admin)/
   │       ├── dashboard/page.tsx                → Admin overview
   │       ├── reservations/page.tsx             → Gestion réservations
   │       ├── chauffeurs/page.tsx               → Gestion chauffeurs
   │       └── vehicules/page.tsx                → Gestion flotte
   ├── components/
   │   ├── ui/           → Button, Input, Card, Badge, Modal, Accordion, Stepper, DatePicker
   │   ├── layout/       → Navbar, Footer, Sidebar, PageWrapper, DashboardLayout
   │   ├── sections/     → Hero, FleetGrid, ServicesToggle, FAQ, BookingForm, CTASection
   │   ├── booking/      → StepTrajet, StepDateTime, StepVehicle, StepRecap, StepPayment
   │   ├── tracking/     → LiveMap, DriverCard, StatusBar, ETADisplay
   │   └── payment/      → PayTechForm, StripeForm, WaveBusinessForm, PaymentMethodSelector
   ├── lib/
   │   ├── cn.ts              → utilitaire clsx + tailwind-merge
   │   ├── supabase.ts        → client Supabase
   │   ├── paytech.ts         → SDK PayTech (Orange Money, Wave, Free Money)
   │   ├── stripe.ts          → SDK Stripe (CB internationales)
   │   ├── wave-business.ts   → SDK Wave Business (facturation entreprise)
   │   ├── google-maps.ts     → helpers Google Maps
   │   └── constants.ts       → constantes globales
   ├── hooks/
   │   ├── useBooking.ts      → logique réservation
   │   ├── useFleet.ts        → données flotte
   │   ├── useAuth.ts         → authentification
   │   ├── useTracking.ts     → suivi temps réel
   │   └── usePayment.ts      → gestion paiement multi-provider
   ├── types/
   │   ├── vehicle.ts         → Vehicle, VehicleCategory
   │   ├── booking.ts         → Booking, BookingStatus, BookingStep
   │   ├── user.ts            → User, UserRole, UserPreferences
   │   ├── driver.ts          → Driver, DriverStatus
   │   └── payment.ts         → Payment, PaymentMethod, PaymentStatus, PaymentProvider
   └── styles/
       └── globals.css        → design tokens, animations, base styles

2. DESIGN SYSTEM COMPLET
   Couleurs :
   - brand: #110E40 (bleu marine profond)
   - brand-dark: #0A0920
   - brand-hover: #1C1870
   - accent: #FFC300 (or)
   - accent-light: #FFD440
   - accent-soft: rgba(255,195,0,0.10)
   - Neutrals : white, grey, dark pour texte/fond

   Typographie :
   - Barlow Condensed 700-900 → titres, prix, noms véhicules
   - Barlow 300-600 → corps, boutons, inputs, meta

   Spacing : système 8px (8, 16, 24, 32, 48, 64, 80, 100, 120)
   Radius : btn 8px, card 16px, input 10px, pill 9999px
   Shadows : sm, md, lg, glow-accent
   Transitions : durée 200-500ms, easing cubic-bezier(0.22, 1, 0.36, 1)

3. COMPOSANTS UI (liste complète avec props/variants)

4. ARCHITECTURE DES PAGES (24 pages)
   Pour chaque page : route, type de rendu (SSG/SSR/CSR), sections, priorité

5. MODÈLE DE DONNÉES
   Tables : users, vehicles, drivers, bookings, payments, companies, reviews, driver_applications
   Relations, types, contraintes

6. INTÉGRATIONS TIERCES
   - Google Maps : Places Autocomplete, Directions, Distance Matrix
   - PayTech : Orange Money, Wave, Free Money (paiements locaux Sénégal)
   - Stripe : CB internationales (Visa, Mastercard, Amex), Apple Pay, Google Pay
   - Wave Business : facturation entreprise, paiements récurrents, reporting
   - Twilio : SMS confirmation réservation, notifications chauffeur
   - Resend : emails transactionnels (confirmations, reçus, factures)
   - Supabase Realtime : suivi course en temps réel (position chauffeur)

7. API ROUTES
   POST /api/booking/create           → Créer une réservation
   POST /api/booking/cancel           → Annuler une réservation
   GET  /api/booking/[id]             → Détails réservation
   PUT  /api/booking/[id]             → Modifier une réservation
   GET  /api/booking/estimate         → Estimation prix (distance + gamme)
   POST /api/payment/paytech          → Initier paiement PayTech (OM, Wave, Free Money)
   POST /api/payment/stripe           → Créer Stripe PaymentIntent (CB internationales)
   POST /api/payment/wave-business    → Facturation Wave Business (entreprise)
   POST /api/payment/webhook/paytech  → Webhook PayTech (confirmation paiement)
   POST /api/payment/webhook/stripe   → Webhook Stripe (confirmation paiement)
   POST /api/auth/otp/send            → Envoyer OTP SMS via Twilio
   POST /api/auth/otp/verify          → Vérifier OTP
   POST /api/contact                  → Formulaire contact / assistance
   POST /api/driver/apply             → Candidature chauffeur
   GET  /api/fleet                    → Liste véhicules disponibles
   GET  /api/fleet/[id]               → Détails véhicule
   GET  /api/tracking/[bookingId]     → Position chauffeur temps réel
   GET  /api/user/bookings            → Historique réservations utilisateur
   PUT  /api/user/profile             → Mise à jour profil
   GET  /api/user/payments            → Historique paiements

Sois opiniâtre. Prends des décisions ASSUMÉES. Pas de code encore.
```

---

# PHASE 3 — SETUP PROJET

> **Modèle : Claude Sonnet 4.5** · Durée : 1-2 jours

### Étape 3.1 : Initialisation

Passer à **Sonnet 4.5** dans Cursor :

```
Initialise le projet SCOD VTC from scratch. Suis exactement ces étapes :

1. Créer le projet :
   npx create-next-app@latest scod-vtc --typescript --tailwind --eslint --app --src-dir

2. Installer les dépendances :
   npm install @radix-ui/react-dialog @radix-ui/react-accordion @radix-ui/react-tabs
   npm install framer-motion clsx tailwind-merge
   npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
   npm install lucide-react date-fns
   npm install react-hook-form zod @hookform/resolvers
   npm install @googlemaps/js-api-loader
   npm install @stripe/stripe-js @stripe/react-stripe-js stripe

3. Configurer les fonts dans src/app/layout.tsx :
   - Barlow (weights: 300, 400, 500, 600, 700) → variable --font-barlow
   - Barlow Condensed (weights: 700, 800, 900) → variable --font-barlow-condensed
   Via next/font/google

4. Configurer tailwind.config.ts avec le design system SCOD VTC :
   - Couleurs : brand, brand-dark, brand-hover, accent, accent-light, accent-soft
   - Fonts : font-display (Barlow Condensed), font-body (Barlow)
   - Radius : card (16px), btn (8px), input (10px), pill (9999px)
   - Transitions customisées

5. Créer globals.css avec :
   - CSS custom properties pour les couleurs
   - Smooth scrolling
   - Antialiasing
   - Grain texture overlay (optionnel, en CSS)
   - Animations keyframes de base (fadeUp, slideIn)

6. Créer la structure de dossiers complète selon ARCHITECTURE.md (24 pages)

7. Créer le fichier src/lib/cn.ts (utilitaire clsx + tailwind-merge)

8. Créer .env.local avec les placeholders :
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   NEXT_PUBLIC_GOOGLE_MAPS_KEY=
   PAYTECH_API_KEY=
   PAYTECH_API_SECRET=
   STRIPE_SECRET_KEY=
   STRIPE_PUBLISHABLE_KEY=
   STRIPE_WEBHOOK_SECRET=
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
   WAVE_BUSINESS_API_KEY=
   WAVE_BUSINESS_SECRET=
   TWILIO_ACCOUNT_SID=
   TWILIO_AUTH_TOKEN=
   TWILIO_PHONE_NUMBER=
   RESEND_API_KEY=

Code propre, commenté, TypeScript strict. Pas de "any".
```

### Étape 3.2 : Composants de base

Toujours dans **Sonnet 4.5** :

```
Crée les composants UI de base du design system SCOD VTC dans src/components/ui/ :

1. Button.tsx
   - Variants : primary (accent #FFC300), secondary (brand #110E40), ghost, danger
   - Sizes : sm, md, lg
   - Props : loading (spinner), icon (lucide), fullWidth, disabled
   - Hover : translateY(-1px) + couleur ajustée
   - Focus-visible : outline accent
   - Transition : 200ms cubic-bezier(0.22, 1, 0.36, 1)
   - Font : Barlow 600-700

2. Input.tsx
   - Props : label, icon (position gauche), error, placeholder, type
   - Style : fond transparent avec border subtile, focus border accent + glow
   - Variante dark (pour le hero) et light (pour les formulaires)
   - Font : Barlow 400

3. Card.tsx
   - Variant : vehicle (fond sombre), service (fond blanc), stat, pricing
   - Hover : translateY(-6px) + shadow + border accent subtil
   - Transition : 450ms ease
   - Radius : 16px

4. Badge.tsx
   - Variants : electric (vert), luxe (or), premium (violet), accessible (bleu), popular (accent)
   - Style : petit, uppercase, letter-spacing, border teinté

5. SectionHeader.tsx
   - Props : tag (uppercase petit texte), title (gros Barlow Condensed), subtitle
   - Tag avec lignes décoratives accent de chaque côté
   - Centré par défaut

6. Stepper.tsx
   - Props : steps (label[]), currentStep, completedSteps
   - Horizontal desktop, vertical mobile
   - Étape active : accent, complétée : check vert, future : gris
   - Barre de progression animée entre les étapes

7. PaymentMethodCard.tsx
   - Props : method (PayTech | Stripe | WaveBusiness | Espèces), selected, onSelect
   - Icône/logo du moyen de paiement + nom + description
   - Border accent quand sélectionné, fond accent-soft

Tous les composants doivent :
- Être TypeScript strict avec interfaces exportées
- Utiliser Tailwind + cn() pour le merge de classes
- Supporter className en prop pour override
- Utiliser les tokens du design system (jamais de couleurs en dur)
- Avoir des animations Framer Motion si pertinent

Ref visuelle : les composants de shadcn/ui mais avec le style SCOD VTC (brand + accent).
```

---

# PHASE 4 — GÉNÉRATION SECTION PAR SECTION

> **Modèle : Sonnet 4.5** (Extended Thinking pour Hero, CTA, Réservation, Commander, Dashboard, Auth, Suivi)

⚠️ **RÈGLE ABSOLUE** : Générer UNE section, la vérifier (espacement, typo, responsive, animations), puis passer à la suivante. Jamais 2 sections dans le même prompt.

---

## PARTIE A — PAGE D'ACCUEIL (Sections 1 à 7)

---

### Section 1 : NAVBAR

> Sonnet 4.5 (standard)

```
Génère uniquement le composant NAVBAR pour SCOD VTC : src/components/layout/Navbar.tsx

DESKTOP (>= 1024px) :
- Position fixed, fond blanc backdrop-filter blur(16px), border-bottom subtil
- Height 68px, padding horizontal 52px, z-index 100
- Gauche : logo SCOD VTC (composant Image next/image)
- Centre : navigation avec 5 items
  * "Commander" → dropdown 3 liens :
    - Commander course → /commander
    - Réserver un trajet → /reservation
    - Louer un véhicule → /location
  * "Particuliers" → dropdown 2 liens :
    - Transfert aéroport → /services/transfert-aeroport
    - Transport événementiel → /services/evenements
  * "Entreprises" → dropdown 3 liens :
    - Offre entreprises → /entreprises
    - Trajets pro → /entreprises/trajets-pro
    - Chauffeur à disposition → /entreprises/chauffeur-disposition
  * "Pourquoi SCOD VTC" → lien simple → /pourquoi-scod
  * "FAQ" → lien simple → /faq
- Dropdowns : fond brand #110E40, border subtil, radius 10px, shadow forte
  * Chaque item : titre 13.5px 600 + description 11.5px 400
  * Animation : opacity + translateY(-6px) → visible au hover parent
  * Flèche triangulaire en haut du dropdown
- Droite : "Assistance" → /assistance + "Se connecter" → /connexion (liens texte) + bouton "Réserver maintenant" → /reservation (accent)

MOBILE (< 1024px) :
- Logo + bouton hamburger seulement
- Hamburger → drawer latéral droit (Framer Motion AnimatePresence)
- Dans le drawer : tous les liens groupés par catégorie + bouton CTA

- Liens hover : couleur accent #FFC300
- Bouton CTA : fond accent, couleur brand, radius 8px, hover accent-light
- Font : Barlow 500 pour liens, 700 pour CTA

Stack : Next.js + TypeScript + Tailwind + Framer Motion + Lucide React
```

---

### Section 2 : HERO ⚡

> **Sonnet 4.5 + Extended Thinking** (OBLIGATOIRE)

```
Génère uniquement la section HERO pour SCOD VTC : src/components/sections/Hero.tsx

C'est LA section la plus importante du site. Qualité MAXIMUM.

LAYOUT :
- Full viewport height (min-h-screen), padding-top 68px (hauteur navbar)
- Image background plein écran en position absolute (véhicule premium)
  * Utiliser next/image avec priority, fill, object-cover
  * Overlay gradient de gauche à droite :
    rgba(10,9,32,0.92) 0% → rgba(10,9,32,0.82) 35% → rgba(10,9,32,0.45) 60% → rgba(10,9,32,0.15) 100%
- Grain texture en pseudo-element (fractalNoise SVG, opacity 0.025)
- Contenu positionné à gauche : padding 80px 72px, max-width 620px

CONTENU :
- Headline : Barlow Condensed 900, clamp(42px, 4.8vw, 66px), blanc
  * "Réservez votre VTC" en blanc + "partout au Sénégal" en accent #FFC300
  * line-height 1.0, letter-spacing -0.01em

- Sous-headline : Barlow 400, 15px, blanc 72% opacité, max-width 440px
  * "Aéroport AIBD, déplacements pro, événements familiaux — tarif fixe en FCFA, chauffeur confirmé dès la réservation."

- Formulaire de réservation :
  * Input départ : icône pin accent, placeholder "Adresse de départ"
  * Input arrivée : icône cercle, placeholder "Adresse d'arrivée"
  * Row 3 colonnes : select date | select heure | select minutes
  * Bouton pleine largeur : "Consulter les prix" + icône flèche
  * Style inputs : fond rgba(255,255,255,0.08), border rgba(255,255,255,0.14)
  * Focus : border accent + glow rgba(255,195,0,0.15)
  * Bouton : fond accent, couleur brand, Barlow 700 15.5px

- 6 badges réassurance en grille 2x3 :
  * ⭐ Chauffeur confirmé dès la réservation
  * ✓ Tarif fixe FCFA garanti
  * 📅 Réservation jusqu'à 1 an à l'avance
  * 📊 Adaptation retard vol AIBD
  * 🔒 Paiement 100% sécurisé
  * 📍 Partout au Sénégal
  * Style : icône SVG 14px + texte Barlow 400 12.5px blanc 72%

ANIMATIONS (Framer Motion) :
- Entrée séquencée fadeUp :
  * Headline : delay 0.1s, duration 0.7s
  * Sous-headline : delay 0.2s
  * Formulaire : delay 0.3s
  * Badges : delay 0.45s
- Easing : [0.22, 1, 0.36, 1]
- Input focus : transition border + background 200ms
- Bouton hover : accent-light + translateY(-1px)

RESPONSIVE :
- <= 960px : padding 60px 36px, max-width 100%, masquer nav desktop
- <= 600px : padding 48px 20px, badges 1 colonne, row date/heure 2 colonnes

Stack : Next.js + TypeScript + Tailwind + Framer Motion
Ref : Uber hero, Linear.app hero, Vercel hero
```

---

### Section 3 : FLOTTE / VÉHICULES

> Sonnet 4.5 (standard)

```
Génère uniquement la section FLOTTE pour SCOD VTC : src/components/sections/FleetSection.tsx

FOND : dark (#070B14)

HEADER :
- Tag "NOTRE FLOTTE" en accent uppercase 12px 700, lignes décoratives
- Titre Barlow Condensed 900 clamp(38px,5vw,60px) blanc : "Découvrez nos véhicules"
- Sous-titre 17px blanc, max-width 560px

FILTRES :
- Pills horizontaux centrés : Tous | Berline | SUV | VIP | PMR
- Pill actif : fond accent, couleur brand, font-weight 700, shadow glow accent
- Pill inactif : transparent, border rgba blanc, hover background subtil
- Animation de transition au clic

GRILLE : 3 cols desktop, 2 tablette, 1 mobile, gap 24px

CARTE VÉHICULE (pour chaque véhicule) :
- Fond #0D1322, border #1A2235, radius 16px
- Zone image 200px : gradient radial subtil, image centrée contain
  * Badge catégorie (electric vert, luxe or, premium violet, accessible bleu)
- Contenu : titre Barlow Condensed 800 22px, description 13px, meta (pax + bagages en 12.5px)
- Prix : "À partir de" 11px + montant Barlow Condensed 800 26px accent
- Bouton CTA : border accent, fond transparent, hover slide-fill accent
- Hover card : translateY(-6px) scale(1.01) + shadow intense + border accent
- Hover image : translateY(-8px) scale(1.04)

VÉHICULES (données statiques pour le MVP) :
1. BMW Série 5 — Berline, 4 pax, 3 bagages, Essence, 55 000 FCFA
2. Tesla Model S — Berline, 4 pax, 2 bagages, Électrique, 54 000 FCFA
3. Tesla Model X — SUV, 6 pax, 4 bagages, Électrique, 53 000 FCFA
4. Peugeot 3008 — SUV, 4 pax, 4 bagages, Diesel, 55 000 FCFA
5. Mercedes Classe S — Berline Luxe, 4 pax, 3 bagages, Hybride, 60 000 FCFA
6. Van Access — PMR, 4 pax, 4 bagages, Diesel, 60 000 FCFA

MODAL VÉHICULE (Radix Dialog) :
- Header : nom + type
- Stats en ligne : passagers, bagages, carburant, prix min, catégorie
- Section chauffeur : avatar initiale cercle, nom, rating étoiles, meta, badge "Disponible"
- Équipements : grille 3 colonnes avec check accent
- Règles (accordion) : annulation, acompte 30%, attente incluse, suppléments (AIBD +2000, nuit +5000, zone>50km +10000)
- Footer sticky : bouton "Réserver maintenant" brand

Scroll reveal avec IntersectionObserver ou Framer Motion whileInView.

Stack : Next.js + TypeScript + Tailwind + Framer Motion + Radix Dialog
Ref : Uber fleet page, Linear product cards
```

---

### Section 4 : SERVICES

> Sonnet 4.5 (standard)

```
Génère uniquement la section SERVICES pour SCOD VTC : src/components/sections/ServicesSection.tsx

FOND : blanc (#FAFBFC)
PADDING : 120px vertical

HEADER :
- Tag "NOS SERVICES" accent + dot décoratif
- Titre Barlow Condensed 900 clamp(32px,5vw,52px) : "Solutions adaptées à tous vos besoins" avec "besoins" en gradient accent
- Sous-titre 17px gris

TOGGLE (Radix Tabs ou custom) :
- Pill switch : Particulier | Entreprise
- Fond gris #E5E7EB, padding 5px, radius 12px
- Actif : fond blanc, shadow, font-weight 600
- Animation de transition entre les deux vues (fade + slide)

GRILLE : 3 cols desktop, 2 tablette, 1 mobile, gap 28px

CARTES PARTICULIER :
1. Transfert Aéroport (badge "Populaire" accent) — 45 000 FCFA — 45-60 min
   Features : tarif fixe, suivi vol, 15 min attente, pancarte nominative
   Lien → /services/transfert-aeroport
2. Trajets Quotidiens — 25 000 FCFA/h
   Lien → /commander
3. Sorties en Famille — 35 000 FCFA/h — sièges enfants, flexibilité
   Lien → /reservation
4. Occasions Spéciales — 45 000 FCFA/j — mariages, véhicules décorés
   Lien → /services/evenements
5. Navette Inter-régions — 40 000 FCFA — destinations multiples
   Lien → /reservation
6. Mise à Disposition — 120 000 FCFA/j — chauffeur dédié
   Lien → /entreprises/chauffeur-disposition

CARTES ENTREPRISE :
1. Trajets Collaborateurs (badge "Populaire") — sur devis
   Lien → /entreprises/trajets-pro
2. Accueil Clients & Partenaires — sur devis
   Lien → /entreprises/trajets-pro
3. Événements Corporate — sur devis
   Lien → /services/evenements

CHAQUE CARTE :
- Image aspect-ratio 4/3, hover zoom scale(1.06)
- Titre Barlow Condensed 800 22px + description 13.5px + tag durée avec icône horloge
- 4 features avec check accent
- Footer : prix "à partir de" + bouton CTA (lien vers la page dédiée)
- Hover : translateY(-8px) + shadow + border accent
- Card populaire : border accent + shadow accent-glow

Stack : Next.js + TypeScript + Tailwind + Framer Motion + Radix Tabs
Ref : Uber for Business services, Notion features grid
```

---

### Section 5 : CONTACT & FAQ

> Sonnet 4.5 (standard)

```
Génère uniquement la section CONTACT & FAQ pour SCOD VTC : src/components/sections/ContactFAQ.tsx

FOND : blanc
PADDING : 120px vertical
LAYOUT : 2 colonnes asymétriques sur desktop (35% sticky gauche / 65% droite), empilé sur mobile

COLONNE GAUCHE (sticky sur scroll) :
- Tag "BESOIN D'AIDE ?" accent
- Titre Barlow Condensed 900 >= 36px : "Questions fréquentes"
- Description 15px gris
- Bouton CTA : "Contactez-nous" fond brand, hover → orange #FF9500 + translateY(-2px) + shadow
  → lien vers /assistance
- Lien téléphone : +221 77 123 45 67 (hover accent)
- Lien "Voir toutes les questions →" vers /faq
- Card stats (fond gris, border) avec 3 lignes :
  * 4.8/5 satisfaction client
  * 15 min d'attente offerte aéroport
  * +2 000 trajets réalisés

COLONNE DROITE — 6 questions FAQ (Radix Accordion) :
- Question 1 ouverte par défaut

1. "Comment réserver un chauffeur privé ?"
   → 2 blocs : "En ligne (recommandé)" avec 4 étapes numérotées + "Par téléphone/WhatsApp"
   → Note grise : SMS de confirmation avec détails chauffeur

2. "Comment connaître le prix de ma course ?"
   → Bloc : obtenir tarif (3 étapes) + bloc : ce qui est inclus (4 items)
   → Tip accent : prix garanti même en cas d'embouteillage

3. "Quelle gamme de véhicule choisir ?"
   → 4 blocs gamme avec tag couleur : BERLINE (or), SUV (or), VAN VIP (violet), PMR (bleu)
   → Tip : pour transfert aéroport, privilégier SUV ou Van

4. "Comment retrouver mon chauffeur à l'aéroport AIBD ?"
   → Bloc processus 4 étapes ordonnées
   → Tip : renseigner numéro de vol pour suivi temps réel

5. "Que se passe-t-il si mon vol est en retard ?"
   → Grille 2 colonnes : "Vol renseigné" (suivi auto, 15 min offertes) vs "Vol non renseigné" (appeler)
   → Tip : pas de frais supplémentaires si vol renseigné

6. "Quels modes de paiement acceptez-vous ?"
   → Grille 3 colonnes : Mobile Money (OM, Wave, Free Money via PayTech) | CB internationales (Visa, Mastercard via Stripe) | Autres (espèces, Wave Business pour entreprises)
   → Bloc entreprises : facturation mensuelle Wave Business
   → Note : paiement en fin de course

STYLE FAQ :
- Bouton question : Barlow 600 17px, hover couleur brand
- Chevron : rotation 180° quand ouvert, fond accent-soft
- Réponses : Barlow 400 15px, line-height 1.75
- Blocs internes : fond #F9FAFB, border, radius 10px
- Tips : fond accent-soft 7%, border accent 20%, icône info, texte ambre

Stack : Next.js + TypeScript + Tailwind + Framer Motion + Radix Accordion
Ref : Stripe FAQ, Intercom help center
```

---

### Section 6 : CTA FINAL ⚡

> **Sonnet 4.5 + Extended Thinking** (Recommandé)

```
Génère uniquement la section CTA FINALE pour SCOD VTC : src/components/sections/CTASection.tsx

Dernier levier de conversion. Zéro distraction. Impact maximum.

- Fond : gradient brand-dark avec grain texture subtil
- Headline Barlow Condensed 900 >= 48px blanc centré :
  "Réservez votre chauffeur en 30 secondes"
- Sous-headline 18px blanc 70% :
  "Tarif fixe garanti. Chauffeur confirmé immédiatement. Annulation gratuite jusqu'à 24h."
- 1 bouton CTA grande taille centré → lien vers /commander :
  * Fond accent, couleur brand, Barlow 700 17px
  * Padding 18px 40px, radius 10px
  * Hover : accent-light + translateY(-2px) + shadow glow
  * Animation subtile : pulse ou glow léger en boucle
- 3 badges en ligne sous le bouton : "Tarif fixe" + "Paiement sécurisé" + "7j/7"
- Espacement vertical >= 120px
- Responsive : tout centré, headline réduit sur mobile

Stack : Next.js + TypeScript + Tailwind + Framer Motion
Ref : Resend CTA, Railway CTA, Planetscale CTA
```

---

### Section 7 : FOOTER

> Sonnet 4.5 (standard)

```
Génère uniquement le FOOTER pour SCOD VTC : src/components/layout/Footer.tsx

- Fond : brand-dark #0A0920
- 4 colonnes desktop (1 mobile : empilé) :
  * Col 1 : Logo SCOD VTC + tagline "Votre chauffeur privé au Sénégal" + icônes RS (Instagram, Facebook, LinkedIn, WhatsApp)
  * Col 2 "Services" :
    - Transfert aéroport → /services/transfert-aeroport
    - Commander course → /commander
    - Location véhicule → /location
    - Transport événementiel → /services/evenements
    - Mise à disposition → /entreprises/chauffeur-disposition
  * Col 3 "Entreprise" :
    - À propos → /a-propos
    - Trajets pro → /entreprises/trajets-pro
    - Devenir chauffeur → /devenir-chauffeur
    - Pourquoi SCOD VTC → /pourquoi-scod
    - FAQ → /faq
  * Col 4 "Légal" :
    - CGV → /legal/cgv
    - Politique de confidentialité → /legal/confidentialite
    - Mentions légales → /legal/mentions-legales
    - Contact → /assistance
- Liens : Barlow 400 14px blanc 60%, hover accent
- Icônes RS : SVG 20px, hover accent + scale(1.1)
- Séparateur border-top 1px subtil
- Bas : copyright Barlow 400 12px gris + badges paiement (Orange Money, Wave, Free Money, Visa, Mastercard, Stripe)

Stack : Next.js + TypeScript + Tailwind + Lucide React
Ref : Linear footer, Vercel footer
```

---

## PARTIE B — PAGES COMMANDER & RÉSERVATION (Sections 8 à 9)

---

### Section 8 : PAGE COMMANDER UNE COURSE ⚡

> **Sonnet 4.5 + Extended Thinking** (Recommandé — Expérience Uber-like)

```
Génère la PAGE COMMANDER UNE COURSE : src/app/(public)/commander/page.tsx

Expérience similaire à l'écran principal d'Uber. Réservation en 3 clics maximum.
C'est LE flux prioritaire du site. Impact maximum sur la conversion.

LAYOUT :
- Split screen desktop : 55% formulaire gauche / 45% carte temps réel droite
- Mobile : formulaire plein écran, carte en arrière-plan

FORMULAIRE (côté gauche) :
- Titre Barlow Condensed 900 36px : "Où allez-vous ?"
- Input départ avec icône pin accent + bouton "Ma position" (géolocalisation auto)
- Input arrivée avec Google Places Autocomplete
- Suggestions rapides (3 destinations populaires) :
  * ✈️ Aéroport AIBD
  * 🏨 Radisson Blu Dakar
  * 🏢 Plateau (Centre-ville)
- Toggle : "Maintenant" | "Planifier" (date + heure si planifié)
- Sélection véhicule : 3 cards horizontales radio (Confort / Premium / VIP)
  * Chaque card : icône véhicule + nom + capacité + prix estimé
  * Card sélectionnée : border accent + fond accent-soft
- Estimation prix en temps réel : distance + durée + prix affiché en gros (Barlow Condensed 800 32px accent)
- Bouton "Commander" pleine largeur accent → déclenche la résa

CARTE (côté droit) :
- Google Maps avec thème sombre personnalisé
- Marqueurs départ (pin accent) et arrivée (pin brand)
- Polyline du trajet en accent #FFC300
- Mise à jour dynamique quand les adresses changent
- Zoom auto pour contenir les 2 points

MOBILE :
- Map en fond, formulaire en bottom sheet (drawer) sliding up
- Ref : Uber mobile app, Bolt app

Stack : Next.js + TypeScript + Tailwind + Framer Motion + Google Maps + react-hook-form + Zod
Ref : Uber main screen, Bolt booking flow
```

---

### Section 9 : PAGE RÉSERVATION (Stepper) ⚡

> **Sonnet 4.5 + Extended Thinking** (Core business)

```
Génère la PAGE de RÉSERVATION complète : src/app/(public)/reservation/page.tsx

Stepper horizontal animé en 5 étapes. C'est le cœur du business pour les réservations à l'avance.

ÉTAPE 1 — TRAJET :
- Google Places Autocomplete pour départ et arrivée
- Carte Google Maps montrant le trajet avec polyline
- Calcul distance + durée affichés en temps réel
- Bouton "Continuer" accent

ÉTAPE 2 — DATE & HEURE :
- Date picker élégant (pas de select natif HTML)
- Sélection heure par créneaux de 15 min (06:00 à 23:00)
- Option "Au plus tôt" mise en avant
- Champ optionnel "Numéro de vol" (pour suivi AIBD)

ÉTAPE 3 — VÉHICULE :
- Cards véhicule sélectionnables (radio-style avec border accent quand sélectionné)
- Prix calculé dynamiquement selon distance + gamme
- Affichage du chauffeur assigné (avatar, nom, note, expérience)

ÉTAPE 4 — RÉCAPITULATIF :
- Résumé : carte miniature du trajet + horaire + véhicule + chauffeur
- Détail prix : base + suppléments (AIBD +2000, nuit +5000, zone>50km +10000) = TOTAL
- Politique d'annulation visible

ÉTAPE 5 — PAIEMENT :
- 7 méthodes de paiement organisées en 3 catégories :
  * Mobile Money (via PayTech) : Orange Money, Wave, Free Money
    → Redirection PayTech pour validation mobile money (callback URL)
  * Carte bancaire (via Stripe) : Visa, Mastercard, Amex, Apple Pay, Google Pay
    → Stripe Elements intégré pour la saisie carte (PCI compliant)
  * Autres : Espèces (paiement au chauffeur), Wave Business (facturation entreprise)
- Chaque méthode : icône/logo + nom + description courte
- Méthode sélectionnée : border accent + check vert + fond accent-soft
- Acompte 30% pour confirmer (calculé et affiché dynamiquement)
- Bouton "Confirmer la réservation" accent
- Confirmation : écran succès animé + envoi SMS Twilio + email Resend

STEPPER :
- Barre de progression animée en haut
- Étapes : numéro + label, couleur accent quand validée, gris quand future
- Transitions entre étapes : slide horizontal + fade (Framer Motion AnimatePresence)
- Boutons "Retour" et "Continuer" en bas de chaque étape

RESPONSIVE : stepper vertical sur mobile, formulaires pleine largeur

Stack : Next.js + TypeScript + Tailwind + Framer Motion + react-hook-form + Zod + Google Maps + Stripe Elements
Ref : Uber booking flow, Stripe Checkout
```

---

## PARTIE C — PAGES SERVICES DÉDIÉES (Sections 10 à 13)

---

### Section 10 : PAGE TRANSFERT AÉROPORT AIBD ⚡

> **Sonnet 4.5 + Extended Thinking** (Recommandé — Page la plus visitée après la home)

```
Génère la PAGE TRANSFERT AÉROPORT : src/app/(public)/services/transfert-aeroport/page.tsx

Page la plus visitée après la home. Service phare de SCOD VTC.

HERO :
- Image aéroport AIBD en background, overlay gradient brand
- Titre Barlow Condensed 900 clamp(38px,5vw,58px) blanc : "Transfert Aéroport" + "AIBD" en accent
- Sous-titre : "Dakar ↔ Aéroport Blaise Diagne — Tarif fixe, chauffeur avec pancarte"
- Badge "Service le + populaire" accent, animation pulse subtil

PRICING CARDS :
- 3 cartes côte à côte :
  * Confort (BMW 5 / Peugeot 3008) — 45 000 FCFA — 4 pax, 3 bagages
  * Premium (Tesla S / Mercedes S) — 55 000 FCFA — 4 pax, 3 bagages — badge "Recommandé"
  * VIP (Range Rover / Van) — 65 000 FCFA — 6 pax, 5 bagages
- Carte Premium mise en avant (scale 1.05, border accent, badge "Recommandé")
- Chaque carte : prix en Barlow Condensed 800 32px accent, bouton CTA → /reservation

COMMENT ÇA MARCHE :
- Timeline verticale 4 étapes numérotées avec icônes accent :
  1. Réservez en ligne (formulaire ou WhatsApp)
  2. Confirmation SMS avec nom et photo du chauffeur
  3. Votre chauffeur vous attend avec pancarte nominative
  4. Trajet confortable jusqu'à votre destination

INCLUS DANS LE TARIF :
- Grille 2x3 avec check accent :
  * ✓ Tarif fixe garanti (pas de compteur)
  * ✓ 15 minutes d'attente offertes
  * ✓ Suivi de vol en temps réel
  * ✓ Pancarte nominative
  * ✓ Eau et chargeur à bord
  * ✓ Aide aux bagages

SUPPLÉMENTS :
- Table claire : Nuit (22h-6h) +5 000 FCFA | Zone hors Dakar >50km +10 000 FCFA

FORMULAIRE RÉSERVATION RAPIDE :
- Intégré en bas, champ arrivée pré-rempli "Aéroport AIBD"
- Champ numéro de vol mis en avant avec icône avion
- Bouton "Réserver mon transfert" accent → /reservation

AVIS CLIENTS :
- 3 testimonials avec avatar, nom, note étoiles, commentaire, date

CTA Final : "Réservez votre transfert AIBD dès maintenant" + bouton accent

Stack : Next.js + TypeScript + Tailwind + Framer Motion
Ref : Uber airport page, Blacklane airport transfer
```

---

### Section 11 : PAGE TRANSPORT ÉVÉNEMENTIEL

> Sonnet 4.5 (standard)

```
Génère la PAGE TRANSPORT ÉVÉNEMENTIEL : src/app/(public)/services/evenements/page.tsx

HERO :
- Image mariage/événement premium, overlay gradient brand
- Titre Barlow Condensed 900 clamp(36px,5vw,56px) blanc : "Transport" + "événementiel" en accent
- Sous-titre : "Mariages, galas, séminaires — une flotte premium pour vos événements"

TYPES D'ÉVÉNEMENTS :
- Grille 2x2 desktop :
  * 💍 Mariages & Cérémonies — véhicules décorés, chauffeur en costume
  * 🎉 Soirées & Galas — transport invités, navette
  * 🏢 Séminaires & Congrès — navette groupe, ponctualité garantie
  * 🎓 Cérémonies officielles — Mercedes Classe S, protocole

FORMULES :
- 3 cards côte à côte :
  * Essentiel (1 véhicule) — à partir de 45 000 FCFA
  * Confort (2-3 véhicules) — à partir de 120 000 FCFA — badge "Populaire"
  * Prestige (flotte complète) — sur devis
- Chaque formule : liste features + prix + bouton CTA

GALERIE :
- Grille photos événements (masonry ou grille 3 colonnes)

FORMULAIRE DEVIS :
- Type d'événement (select), date, nombre d'invités, lieu, besoins spécifiques
- Bouton "Demander un devis gratuit" accent

Stack : Next.js + TypeScript + Tailwind + Framer Motion + react-hook-form + Zod
Ref : Blacklane events, Uber Events
```

---

### Section 12 : PAGE LOCATION DE VÉHICULE

> Sonnet 4.5 (standard)

```
Génère la PAGE LOCATION DE VÉHICULE : src/app/(public)/location/page.tsx

Page dédiée pour la location de véhicule avec chauffeur.

HERO :
- Background image véhicule premium, overlay gradient brand
- Titre Barlow Condensed 900 clamp(36px,5vw,56px) blanc : "Louez un véhicule" + "avec chauffeur" en accent
- Sous-titre : "Journée, demi-journée ou longue durée — partout au Sénégal"

FORMULAIRE DE LOCATION :
- Card blanche flottante, shadow lg, radius 16px, max-width 680px centrée
- Champs :
  * Type de location (select) : Demi-journée (4h) | Journée (8h) | Semaine | Sur mesure
  * Date de début (date picker)
  * Durée
  * Lieu de prise en charge (Google Places Autocomplete)
  * Nombre de passagers
  * Besoins spécifiques (textarea)
- Bouton "Obtenir un devis" accent

GRILLE VÉHICULES DISPONIBLES À LA LOCATION :
- Cards similaires à FleetSection mais avec tarifs journaliers
- Prix : "À partir de 120 000 FCFA/jour"
- Badge "Chauffeur inclus" accent sur chaque card

AVANTAGES :
- Grille 4 colonnes avec icônes accent :
  * 🚗 Chauffeur professionnel inclus
  * ⛽ Carburant inclus
  * 📋 Assurance tous risques
  * 🔄 Kilométrage illimité

FAQ LOCATION (3 questions) :
- Accordion compact (Radix Accordion)

CTA : "Besoin d'un devis personnalisé ? Contactez-nous" → /assistance

Stack : Next.js + TypeScript + Tailwind + Framer Motion + Radix Dialog + react-hook-form + Zod
Ref : Sixt location, Europcar premium
```

---

### Section 13 : PAGE CHAUFFEUR À DISPOSITION

> Sonnet 4.5 (standard)

```
Génère la PAGE CHAUFFEUR À DISPOSITION : src/app/(public)/entreprises/chauffeur-disposition/page.tsx

HERO :
- Image chauffeur professionnel devant véhicule premium, overlay gradient brand
- Titre Barlow Condensed 900 clamp(36px,5vw,56px) blanc : "Votre chauffeur" + "à disposition" en accent
- Sous-titre : "Un chauffeur dédié pour votre journée, semaine ou mois"

FORMULES :
- 3 cards côte à côte :
  * Demi-journée (4h) — 60 000 FCFA — Berline Confort
  * Journée (8h) — 120 000 FCFA — au choix — badge "Populaire"
  * Semaine (5 jours) — 500 000 FCFA — véhicule dédié + chauffeur attitré

CE QUI EST INCLUS :
- Grille 2x3 avec check accent :
  * ✓ Chauffeur professionnel formé
  * ✓ Véhicule climatisé premium
  * ✓ Carburant inclus
  * ✓ Kilométrage illimité en zone urbaine
  * ✓ Eau et chargeur à bord
  * ✓ Flexibilité itinéraire

CAS D'USAGE :
- 4 cards illustrées :
  * CEO & Dirigeants — déplacements quotidiens, discrétion
  * Délégations étrangères — accueil VIP, multilangue
  * Tournages & Productions — logistique transport
  * Semaines professionnelles — chauffeur attitré

FORMULAIRE RÉSERVATION :
- Date de début, durée, type de véhicule, lieu, besoins spécifiques
- Bouton "Réserver mon chauffeur" accent

Stack : Next.js + TypeScript + Tailwind + Framer Motion + react-hook-form + Zod
Ref : Blacklane chauffeur service
```

---

## PARTIE D — PAGES ENTREPRISES (Sections 14 à 15)

---

### Section 14 : PAGE LANDING ENTREPRISES

> Sonnet 4.5 (standard)

```
Génère la PAGE LANDING ENTREPRISES : src/app/(public)/entreprises/page.tsx

Page vitrine B2B. Premier point d'entrée pour les entreprises.

HERO :
- Fond brand-dark, pas d'image
- Titre Barlow Condensed 900 clamp(38px,5vw,58px) blanc : "SCOD VTC pour les" + "entreprises" en accent
- Sous-titre : "Simplifiez les déplacements professionnels de votre équipe"
- 2 boutons : "Demander une démo" (accent) → formulaire bas de page + "Découvrir l'offre" (ghost blanc) → scroll down

3 OFFRES PRINCIPALES :
- Cards linkées vers les pages dédiées :
  * Trajets Collaborateurs → /entreprises/trajets-pro
  * Chauffeur à Disposition → /entreprises/chauffeur-disposition
  * Événements Corporate → /services/evenements

AVANTAGES ENTREPRISE :
- Grille 3x2 avec icônes accent :
  * 📊 Dashboard de suivi — tous les trajets en temps réel
  * 💳 Facturation centralisée — Wave Business ou virement
  * 📋 Reporting — export CSV/PDF par collaborateur
  * 🔒 Politique de transport — plafond, horaires, zones
  * 👤 Comptes collaborateurs — chaque employé a son compte
  * 🚗 Flotte dédiée — véhicules et chauffeurs attitrés

LOGOS CONFIANCE :
- "Ils nous font confiance" — 6 logos placeholders entreprises

FORMULAIRE CONTACT ENTREPRISE :
- Nom entreprise, NINEA, nom contact, téléphone, email, nombre de collaborateurs
- Bouton "Créer mon compte entreprise" accent

Stack : Next.js + TypeScript + Tailwind + Framer Motion + react-hook-form + Zod
Ref : Uber for Business landing, Kapten Pro
```

---

### Section 15 : PAGE TRAJETS PRO

> Sonnet 4.5 (standard)

```
Génère la PAGE TRAJETS PRO : src/app/(public)/entreprises/trajets-pro/page.tsx

Landing B2B détaillée pour les trajets collaborateurs.

HERO :
- Fond brand-dark
- Titre Barlow Condensed 900 blanc : "Simplifiez les déplacements" + "de vos équipes" en accent
- Sous-titre : "Facturation centralisée, reporting mensuel, véhicules premium"
- 2 boutons : "Demander une démo" (accent) + "Nous contacter" (ghost blanc) → /assistance

COMMENT ÇA MARCHE :
- 3 étapes horizontales avec icônes numérotées :
  1. Créez votre compte entreprise
  2. Invitez vos collaborateurs
  3. Ils réservent, vous êtes facturé mensuellement (Wave Business)

AVANTAGES DÉTAILLÉS :
- Grille 3 colonnes avec icônes :
  * Dashboard de suivi trajets
  * Facturation Wave Business centralisée
  * Reporting CSV/PDF par collaborateur
  * Politique de transport configurable
  * Comptes collaborateurs individuels
  * Flotte premium dédiée

PRICING ENTREPRISE :
- "À partir de 25 000 FCFA/trajet"
- Remises volume :
  * 10+ trajets/mois = -10%
  * 50+ trajets/mois = -20%
  * 100+ trajets/mois = -30%
- Table pricing claire et lisible

FORMULAIRE :
- Nom entreprise, NINEA, contact, nombre de collaborateurs, volume estimé/mois
- Bouton "Créer mon compte entreprise" accent

Stack : Next.js + TypeScript + Tailwind + Framer Motion + react-hook-form + Zod
Ref : Uber for Business, Kapten Pro
```

---

## PARTIE E — PAGES INFORMATIVES (Sections 16 à 19)

---

### Section 16 : PAGE POURQUOI SCOD VTC

> Sonnet 4.5 (standard)

```
Génère la PAGE POURQUOI SCOD VTC : src/app/(public)/pourquoi-scod/page.tsx

Page de conviction. Différenciation vs taxis et concurrents.

HERO :
- Fond blanc, centré
- Titre Barlow Condensed 900 clamp(36px,5vw,56px) :
  "Pourquoi choisir" + "SCOD VTC" en gradient brand→accent
- Sous-titre : "Le premier service VTC premium 100% sénégalais"

COMPARATIF :
- Table responsive stylisée : SCOD VTC vs Taxi classique vs Autres VTC
- Lignes : Tarif fixe garanti, Véhicules premium, Chauffeur identifié avant course,
  Suivi temps réel, Paiement mobile money (OM, Wave), Facturation entreprise,
  Réservation à l'avance, Transfert aéroport dédié
- SCOD VTC : tout en ✓ vert accent — les autres avec des ✗ rouges ou "Partiel"

CHIFFRES CLÉS :
- Grille 4 colonnes animées (compteur qui monte au scroll) :
  * 2 000+ trajets réalisés
  * 4.8/5 satisfaction client
  * 15 min attente max aéroport
  * 6 véhicules premium

NOS VALEURS :
- 3 cards avec icônes premium :
  * 🛡️ Sécurité — chauffeurs vérifiés, véhicules assurés, géolocalisation temps réel
  * 💎 Excellence — véhicules haut de gamme, propreté irréprochable, eau à bord
  * 🤝 Confiance — prix transparent, pas de surprise, avis clients vérifiés

TÉMOIGNAGES :
- Carousel 3 avis clients avec photo, nom, note étoiles, texte, date

CTA : "Testez l'expérience SCOD VTC" + bouton accent → /commander

Stack : Next.js + TypeScript + Tailwind + Framer Motion
Ref : Uber "Why Uber" page, about pages premium
```

---

### Section 17 : PAGE FAQ COMPLÈTE

> Sonnet 4.5 (standard)

```
Génère la PAGE FAQ COMPLÈTE : src/app/(public)/faq/page.tsx

Version étendue de la section FAQ home. Page dédiée avec recherche et filtres.

HERO :
- Fond brand-dark, centré
- Titre Barlow Condensed 900 blanc : "Centre d'aide"
- Barre de recherche grande : input blanc, icône loupe, placeholder "Rechercher une question..."
- Filtrage en temps réel des questions au fur et à mesure de la saisie

CATÉGORIES (Radix Tabs) :
- Tabs horizontaux scrollables : Toutes | Réservation | Paiement | Véhicules | Aéroport | Entreprises | Annulation
- Chaque tab filtre les questions de sa catégorie
- Tab actif : fond accent, couleur brand

QUESTIONS (18 minimum, Radix Accordion) :

RÉSERVATION :
1. "Comment réserver un chauffeur privé ?" (même contenu que home)
2. "Comment modifier ma réservation ?" → étapes + délais
3. "Puis-je réserver pour quelqu'un d'autre ?" → oui, champ "passager"
4. "Quelle est la zone de couverture ?" → Dakar, Thiès, Saint-Louis, Saly, Touba...
5. "Les sièges enfants sont-ils disponibles ?" → oui, à préciser à la réservation

PAIEMENT :
6. "Quels modes de paiement acceptez-vous ?" (même contenu que home, enrichi)
7. "Comment fonctionne le paiement Wave Business ?" → facturation entreprise mensuelle
8. "Puis-je payer par carte internationale (Stripe) ?" → Visa, MC, Amex, Apple Pay, Google Pay
9. "Quand suis-je débité ?" → acompte 30% à la réservation, solde en fin de course

VÉHICULES :
10. "Quelle gamme de véhicule choisir ?" (même contenu que home)
11. "Les véhicules sont-ils climatisés ?" → oui, tous, température réglable

AÉROPORT :
12. "Comment retrouver mon chauffeur à l'aéroport AIBD ?" (même contenu que home)
13. "Que se passe-t-il si mon vol est en retard ?" (même contenu que home)
14. "Le tarif transfert aéroport est-il fixe ?" → oui, aucun supplément embouteillage

ENTREPRISES :
15. "Comment créer un compte entreprise ?" → formulaire + validation 24h
16. "Comment fonctionne la facturation mensuelle ?" → Wave Business, virement, export PDF

ANNULATION :
17. "Comment annuler et être remboursé ?" → gratuit > 24h, 50% < 24h, 100% < 2h
18. "Quels sont les suppléments possibles ?" → AIBD +2000, nuit +5000, zone >50km +10000

SIDEBAR (desktop, sticky) :
- Card "Besoin d'aide ?" fond accent-soft avec :
  * Bouton WhatsApp (vert) → wa.me/221771234567
  * Bouton Appeler → tel:+221771234567
  * Bouton Email → contact@scodvtc.sn
  * Horaires : 7j/7, 6h-23h

Stack : Next.js + TypeScript + Tailwind + Framer Motion + Radix Accordion + Radix Tabs
Ref : Stripe Support, Intercom Help Center, Uber Help
```

---

### Section 18 : PAGE ASSISTANCE / CONTACT

> Sonnet 4.5 (standard)

```
Génère la PAGE ASSISTANCE : src/app/(public)/assistance/page.tsx

Centre de contact complet. Page de confiance.

HERO :
- Fond brand-dark, centré
- Titre Barlow Condensed 900 clamp(36px,5vw,52px) blanc : "Comment pouvons-nous" + "vous aider ?" en accent

CARDS CONTACT :
- Grille 2x2, gap 24px :
  * 📞 Téléphone — +221 77 123 45 67 — "Réponse immédiate" — bouton "Appeler"
  * 💬 WhatsApp — lien direct wa.me — "Réponse en < 5 min" — bouton "Écrire sur WhatsApp"
  * ✉️ Email — contact@scodvtc.sn — "Réponse en < 2h" — bouton "Envoyer un email"
  * 📍 Bureau — Adresse Dakar — Google Maps embed miniature — bouton "Voir sur la carte"

FORMULAIRE CONTACT :
- Card blanche, shadow, max-width 640px centrée
- Objet (select) : Réservation, Réclamation, Partenariat, Entreprise, Autre
- Nom, email, téléphone, message (textarea)
- Bouton "Envoyer" accent → /api/contact
- Feedback succès : "Message envoyé ! Nous vous répondons sous 2h."

URGENCES :
- Bandeau accent : "Course en cours ? Appelez directement votre chauffeur depuis votre SMS de confirmation"

HORAIRES :
- Grille 2 colonnes :
  * Service client : Lun-Dim 6h-23h
  * Transfert aéroport : 24h/24, 7j/7

FAQ RAPIDE :
- 3 questions les plus fréquentes (accordion compact)
- Lien "Voir toutes les questions →" vers /faq

Stack : Next.js + TypeScript + Tailwind + Framer Motion + react-hook-form + Zod
Ref : Uber Help, Stripe Contact
```

---

### Section 19 : PAGE DEVENIR CHAUFFEUR

> Sonnet 4.5 (standard)

```
Génère la PAGE DEVENIR CHAUFFEUR : src/app/(public)/devenir-chauffeur/page.tsx

Page de recrutement chauffeurs. Essentielle pour la croissance de la flotte.

HERO :
- Image chauffeur professionnel souriant à côté d'un véhicule premium, overlay gradient brand
- Titre Barlow Condensed 900 clamp(36px,5vw,56px) blanc : "Devenez chauffeur" + "SCOD VTC" en accent
- Sous-titre : "Rejoignez le premier réseau VTC premium du Sénégal"
- Bouton "Postuler maintenant" accent → scroll vers formulaire

AVANTAGES CHAUFFEUR :
- Grille 3x2 avec icônes accent :
  * 💰 Revenus attractifs — commissions compétitives + pourboires
  * 📅 Flexibilité — choisissez vos horaires
  * 🚗 Véhicules fournis — conduite de véhicules premium
  * 📱 Application dédiée — gestion des courses simplifiée
  * 🎓 Formation — formation continue au service premium
  * 🏥 Couverture — assurance et avantages sociaux

COMMENT ÇA MARCHE :
- 4 étapes timeline :
  1. Postulez en ligne (formulaire ci-dessous)
  2. Entretien et vérification (48h)
  3. Formation au service premium (1 journée)
  4. Commencez à conduire et gagner

CRITÈRES :
- Card fond accent-soft avec check list :
  * ✓ Permis B depuis 3+ ans
  * ✓ Casier judiciaire vierge
  * ✓ Expérience en transport appréciée
  * ✓ Présentation soignée
  * ✓ Connaissance de Dakar et environs

FORMULAIRE CANDIDATURE :
- Nom, prénom, téléphone, email
- Numéro permis, années d'expérience
- Disponibilité (select) : temps plein | temps partiel | week-ends
- Upload CV (optionnel, drag & drop ou click)
- Bouton "Envoyer ma candidature" accent → /api/driver/apply
- Feedback succès : "Candidature reçue ! Nous vous contactons sous 48h."

Stack : Next.js + TypeScript + Tailwind + Framer Motion + react-hook-form + Zod
Ref : Uber driver page, Bolt driver recruitment
```

---

### Section 20 : PAGE À PROPOS

> Sonnet 4.5 (standard)

```
Génère la PAGE À PROPOS : src/app/(public)/a-propos/page.tsx

HERO :
- Fond brand-dark, centré
- Titre Barlow Condensed 900 blanc : "À propos de" + "SCOD VTC" en accent
- Sous-titre : "Le premier service VTC premium 100% sénégalais"

NOTRE HISTOIRE :
- Texte narratif élégant avec Barlow 400 16px, line-height 1.8
- Timeline visuelle : création → première course → expansion → aujourd'hui

NOTRE MISSION :
- Card grande, fond accent-soft, border accent :
  "Offrir à chaque Sénégalais, chaque visiteur et chaque entreprise un service de transport
   à la hauteur de leurs ambitions. Sécurisé, ponctuel, premium."

L'ÉQUIPE :
- 3-4 cards membres fondateurs : photo, nom, rôle, courte bio

NOS CHIFFRES :
- Même grille que "Pourquoi SCOD VTC" : 2000+ trajets, 4.8/5, 15 min, 6 véhicules

CTA : "Rejoignez l'aventure" → 2 boutons : "Réserver" → /commander | "Devenir chauffeur" → /devenir-chauffeur

Stack : Next.js + TypeScript + Tailwind + Framer Motion
Ref : Linear about, Vercel about
```

---

## PARTIE F — AUTHENTIFICATION & ESPACE CLIENT (Sections 21 à 23)

---

### Section 21 : PAGES CONNEXION & INSCRIPTION ⚡

> **Sonnet 4.5 + Extended Thinking** (Recommandé — Porte d'entrée utilisateur)

```
Génère les PAGES AUTH :
- src/app/(auth)/connexion/page.tsx
- src/app/(auth)/inscription/page.tsx

CONNEXION (/connexion) :
- Split screen desktop : 50% formulaire gauche fond blanc / 50% image véhicule premium droite avec overlay brand
- Mobile : formulaire plein écran, image masquée

- Logo SCOD VTC en haut à gauche
- Titre Barlow Condensed 900 32px brand : "Bon retour"
- Sous-titre Barlow 400 15px gris : "Connectez-vous pour gérer vos réservations"

- Connexion par OTP SMS (méthode principale — contexte Sénégal) :
  * Input téléphone avec indicatif +221 pré-rempli (drapeau 🇸🇳)
  * Bouton "Recevoir le code" accent pleine largeur
  * Écran 2 : 6 inputs digits OTP (auto-focus, auto-submit quand complet)
  * Timer : "Renvoyer le code dans 30s" → "Renvoyer le code" cliquable

- Séparateur "ou" avec lignes de chaque côté

- Connexion email :
  * Input email + input mot de passe (toggle show/hide)
  * Lien "Mot de passe oublié ?" → modale OTP email

- Bouton Google OAuth (icône G + "Continuer avec Google") — secondaire, border gris

- Bas : "Pas encore de compte ?" + lien "Créez-en un" → /inscription

INSCRIPTION (/inscription) :
- Même layout split screen
- Titre : "Créez votre compte"
- Sous-titre : "Réservez votre premier trajet en 30 secondes"

- Étape 1 : Input téléphone +221 → Bouton "Recevoir le code" → Input OTP 6 digits
- Étape 2 (après validation OTP) : Prénom, Nom, Email (optionnel)
- Checkbox : "J'accepte les CGV" avec lien → /legal/cgv
- Bouton "Créer mon compte" accent

- Bas : "Déjà un compte ?" + lien "Connectez-vous" → /connexion

Supabase Auth pour le backend (OTP SMS via Twilio).
Tous les formulaires avec react-hook-form + Zod.

Stack : Next.js + TypeScript + Tailwind + Framer Motion + Supabase Auth + react-hook-form + Zod
Ref : Uber login, Bolt login, Stripe login
```

---

### Section 22 : DASHBOARD CLIENT ⚡

> **Sonnet 4.5 + Extended Thinking** (Recommandé — Espace personnel critique)

```
Génère le DASHBOARD CLIENT complet avec layout + 3 sous-pages :

LAYOUT DASHBOARD : src/components/layout/DashboardLayout.tsx
- Sidebar gauche fixe (280px desktop, drawer mobile) + contenu droit
- Sidebar :
  * Avatar utilisateur (initiales si pas de photo) + prénom + téléphone
  * Navigation : icône + label pour chaque lien :
    - 📋 Mes réservations → /mon-compte/reservations
    - 👤 Mon profil → /mon-compte/profil
    - 💳 Mes paiements → /mon-compte/paiements
    - 🚪 Déconnexion
  * Lien actif : fond accent-soft + border-left 3px accent + couleur brand
  * Lien inactif : gris, hover fond gris subtil
- Mobile : hamburger → sidebar en drawer (Framer Motion)
- Header top : "Mon espace" + bouton "Nouvelle réservation" accent → /commander

PAGE 1 — MES RÉSERVATIONS : src/app/(dashboard)/mon-compte/reservations/page.tsx
- Tabs (Radix Tabs) : À venir | En cours | Passées | Annulées
- Tab actif : border-bottom accent, font-weight 600
- Card réservation :
  * Date + heure en Barlow Condensed 800 18px brand
  * Trajet : départ → arrivée avec icône trajet verticale (pin → cercle)
  * Véhicule + chauffeur (mini avatar initiales + nom + note ⭐)
  * Statut (Badge) : Confirmée (vert), En cours (bleu pulsing), Terminée (gris), Annulée (rouge)
  * Prix en Barlow Condensed 800 20px accent
  * Actions (boutons ghost) : "Modifier" | "Annuler" | "Suivre" → /suivi/[id] | "Rebook" | "Voir reçu"
- Empty state : illustration SVG + "Aucune réservation" + CTA "Réservez votre premier trajet" accent → /commander

PAGE 2 — MON PROFIL : src/app/(dashboard)/mon-compte/profil/page.tsx
- Card info : Avatar modifiable + Prénom + Nom + Téléphone (non modifiable) + Email
- Adresses favorites (ajouter/supprimer) : domicile, bureau, aéroport
- Préférences :
  * Véhicule favori (select : Berline / SUV / VIP)
  * Température (select : Fraîche / Normale / Chaude)
  * Eau à bord (toggle)
- Bouton "Sauvegarder les modifications" accent

PAGE 3 — MES PAIEMENTS : src/app/(dashboard)/mon-compte/paiements/page.tsx
- Moyens de paiement enregistrés :
  * Wave (icône + numéro masqué ****67) — badge "Par défaut"
  * Orange Money (icône + numéro masqué)
  * Carte Stripe (icône Visa + ****4242)
  * Bouton "Ajouter un moyen de paiement" → modale : PayTech (OM, Wave, Free) | Stripe (CB)
- Historique des transactions :
  * Table : Date | Trajet (résumé) | Montant | Méthode (icône) | Statut (badge)
  * Pagination ou infinite scroll
  * Export CSV bouton ghost

Stack : Next.js + TypeScript + Tailwind + Framer Motion + Supabase + Radix Tabs
Ref : Uber rider dashboard, Bolt app history
```

---

### Section 23 : PAGE SUIVI COURSE TEMPS RÉEL ⚡

> **Sonnet 4.5 + Extended Thinking** (Recommandé — Différenciateur Uber-like)

```
Génère la PAGE SUIVI COURSE TEMPS RÉEL : src/app/(public)/suivi/[bookingId]/page.tsx

Page accessible après confirmation de réservation. Lien envoyé par SMS.
C'est LE différenciateur vs les taxis classiques au Sénégal.

LAYOUT :
- Carte Google Maps plein écran (100vh) avec overlay UI

CARTE :
- Thème sombre personnalisé
- Position chauffeur en temps réel : marqueur voiture animé (rotation selon direction)
  → Données via Supabase Realtime (subscribe au channel booking:[id])
- Point de départ (pin accent) et point d'arrivée (pin brand)
- Polyline du trajet prévu en accent, polyline parcouru en vert
- Zoom auto pour contenir chauffeur + destination

BOTTOM CARD (slide up, 30% de la hauteur) :
- Handle de drag en haut (trait gris, drag pour expand)
- Statut actuel avec icône animée :
  * 🚗 "En route vers vous" — ETA dynamique ("Arrivée dans 8 min")
  * 📍 "Votre chauffeur est arrivé" — notification + vibration
  * 🛣️ "En course" — ETA vers destination
  * ✅ "Course terminée" — bouton noter + récapitulatif
- Barre de progression horizontale 4 étapes avec icônes

INFOS CHAUFFEUR (dans la bottom card) :
- Photo ronde + nom Barlow 600 16px + note ⭐ 4.8
- Véhicule : "BMW Série 5 — DK-1234-AA"
- 2 boutons ronds :
  * 📞 Appeler (vert) → tel:
  * 💬 SMS (brand) → sms:

TOP BAR (overlay sur la carte) :
- Fond blanc/blur, shadow
- Gauche : bouton retour ← + "Réservation #12345"
- Droite : "ETA 8 min" badge accent

RESPONSIVE :
- Mobile : carte 60vh + bottom card 40vh, swipeable
- Desktop : carte 70% gauche + panel 30% droite

FALLBACK (si pas de données temps réel) :
- Afficher les infos statiques de la réservation
- Message "Le suivi en temps réel sera disponible quand votre chauffeur partira"

Stack : Next.js + TypeScript + Tailwind + Framer Motion + Google Maps + Supabase Realtime
Ref : Uber ride tracking, Bolt live map, Lyft ride
```

---

## PARTIE G — PAGES LÉGALES (Section 24)

---

### Section 24 : PAGES LÉGALES

> Sonnet 4.5 (standard)

```
Génère les 3 PAGES LÉGALES pour SCOD VTC :
- src/app/(public)/legal/cgv/page.tsx
- src/app/(public)/legal/confidentialite/page.tsx
- src/app/(public)/legal/mentions-legales/page.tsx

LAYOUT COMMUN :
- Navbar + Footer standards
- Max-width 720px centré, padding 80px vertical
- Titre Barlow Condensed 900 36px brand
- Contenu : Barlow 400 15px, line-height 1.8, couleur gris foncé
- Sous-titres : Barlow 700 20px brand
- Listes : puces accent
- Dernière mise à jour en haut : "Mis à jour le [date]"

CGV (/legal/cgv) :
- Articles : objet, conditions de réservation, tarifs et paiement (PayTech, Stripe, Wave Business, espèces),
  annulation et remboursement, responsabilités, assurance, réclamations, droit applicable (Sénégal)

CONFIDENTIALITÉ (/legal/confidentialite) :
- Sections : données collectées, finalités, stockage (Supabase), partage avec tiers
  (Google Maps, PayTech, Stripe, Twilio, Resend), droits utilisateurs, cookies, contact DPO

MENTIONS LÉGALES (/legal/mentions-legales) :
- Éditeur : SCOD VTC, forme juridique, siège social Dakar, NINEA
- Hébergeur : Vercel Inc.
- Directeur de publication
- Contact

Stack : Next.js + TypeScript + Tailwind
```

---

# PHASE 5 — DEBUG, REFACTOR & OPTIMISATION

> **Modèle : Claude Opus 4.5** · Durée : 5-7 jours

### Étape 5.1 : Audit complet

Repasser à **Opus 4.5** :

```
Audite le projet SCOD VTC complet comme un senior lead engineer.
Le projet comprend 24 pages et 3 providers de paiement (PayTech, Stripe, Wave Business).

Vérifie CHAQUE point :

1. STRUCTURE : Organisation composants, réutilisabilité, imports, zéro duplication
2. TYPESCRIPT : aucun "any", tous les types définis, interfaces exportées
3. PERFORMANCE : bundle size, lazy loading (dynamic imports pour Modal, Maps, Stripe), next/image partout
4. ACCESSIBILITÉ : ARIA labels, navigation clavier, contraste WCAG AA, focus-visible
5. SÉCURITÉ : validation Zod server-side, XSS prevention, CSRF, env variables, webhooks Stripe/PayTech signés
6. SEO : meta tags sur chaque page, Open Graph, JSON-LD structured data, sitemap.xml, robots.txt
7. RESPONSIVE : test 320px, 768px, 1024px, 1440px — pixel perfect sur TOUTES les 24 pages
8. UX : loading states (skeletons), error states, success feedback, empty states, 404 page
9. LIGHTHOUSE : objectif > 90 sur Performance, Accessibility, SEO, Best Practices
10. PAIEMENTS : vérifier les flux PayTech (callback/webhook), Stripe (webhook signing), Wave Business
11. AUTH : vérifier le flux OTP SMS, la protection des routes dashboard, la déconnexion
12. NAVIGATION : vérifier que CHAQUE lien du menu pointe vers une page existante

Pour chaque problème : description + impact + code de correction.
```

### Étape 5.2 : Harmonisation

Toujours dans **Sonnet 4.5** :

```
Vérifie la cohérence globale de TOUTES les 24 pages du site SCOD VTC :

- Espacements identiques entre TOUTES les sections (padding 100-120px)
- Typographie : même échelle partout (Barlow Condensed titres, Barlow corps)
- Couleurs : brand #110E40 et accent #FFC300 utilisés de manière cohérente
- Animations : même timing partout (200-500ms, easing cubic-bezier(0.22,1,0.36,1))
- Transitions fluides entre les sections lors du scroll
- Hero de chaque page : même pattern (image + overlay + titre + sous-titre)
- CTAs : même style partout (accent, Barlow 700, radius 8px, hover translateY(-1px))
- Cards : même radius (16px), même hover (translateY(-6px)), même shadow
- Formulaires : même style inputs, même validation, même feedback
- Navigation : tous les liens fonctionnels, breadcrumb si pertinent
- Footer : badges paiement à jour (Orange Money, Wave, Free Money, Visa, Mastercard, Stripe)
- Mobile : tester CHAQUE page individuellement sur 320px

Corrige les incohérences. Code uniquement les corrections nécessaires.
```

---

## Anti-Patterns à ÉVITER

| ❌ Anti-pattern | 💥 Symptôme | ✅ Solution |
|----------------|------------|------------|
| Prompt vague | Design générique Bootstrap | Spécifier typo, espacement, couleurs, références |
| Page entière en 1 prompt | Code désordonné, qualité inégale | **TOUJOURS section par section** |
| Mauvais modèle / phase | Sonnet pour archi = vision courte | Opus analyse/archi, Sonnet génération |
| Pas de contraintes | Layout template basique | 5+ contraintes visuelles par prompt |
| Oublier mobile-first | Responsive cassé | Préciser mobile-first dans CHAQUE prompt |
| Stack non précisée | IA choisit une stack aléatoire | Toujours Next.js + TS + Tailwind + Framer Motion |
| Sauter l'analyse | Architecture incohérente | Phase 1 Opus OBLIGATOIRE |
| Pas de design system | Couleurs/typo différentes par section | Tokens Tailwind en Phase 3, ne jamais dévier |
| Pages menu sans contenu | Liens morts, UX cassée | CHAQUE élément du menu a sa page dédiée |
| Un seul provider paiement | Perte de clients internationaux | PayTech (local) + Stripe (international) + Wave Business |

---

## Checklist Finale

- [ ] Analyse faite avec Opus 4.5 AVANT tout code
- [ ] Architecture validée avec Opus 4.5, décisions assumées
- [ ] 24 pages identifiées et routées
- [ ] Chaque section générée SÉPARÉMENT avec Sonnet 4.5
- [ ] Hero et CTA ont utilisé Extended Thinking
- [ ] Commander course + Dashboard + Auth + Suivi ont utilisé Extended Thinking
- [ ] Chaque prompt contenait 5+ contraintes visuelles
- [ ] Stack précisée dans chaque prompt
- [ ] Mobile-first testé (320px, 768px, 1024px)
- [ ] Références premium citées (Uber, Stripe, Linear)
- [ ] Zéro prompt générique sans contrainte
- [ ] Tous les liens du menu pointent vers une page existante
- [ ] Paiement PayTech (OM, Wave, Free Money) fonctionnel
- [ ] Paiement Stripe (CB internationales) fonctionnel
- [ ] Paiement Wave Business (entreprises) fonctionnel
- [ ] Auth OTP SMS fonctionnel
- [ ] Dashboard client complet (réservations, profil, paiements)
- [ ] Suivi course temps réel fonctionnel
- [ ] Pages légales (CGV, confidentialité, mentions) présentes
- [ ] Harmonisation globale vérifiée en Phase 5
- [ ] Lighthouse > 90 sur les 4 métriques

---

## Estimation

| Phase | Durée | Modèle | Tokens estimés |
|-------|-------|--------|----------------|
| Phase 1 : Analyse | 2-3 jours | Opus 4.5 | 15K - 25K |
| Phase 2 : Architecture | 2-3 jours | Opus 4.5 | 25K - 40K |
| Phase 3 : Setup | 1-2 jours | Sonnet 4.5 | 10K - 18K |
| Phase 4A : Home (7 sections) | 8-12 jours | Sonnet 4.5 | 70K - 120K |
| Phase 4B : Commander + Réservation | 4-6 jours | Sonnet 4.5 + ET | 35K - 60K |
| Phase 4C : Pages services (4 sections) | 4-6 jours | Sonnet 4.5 | 30K - 50K |
| Phase 4D : Pages entreprises (2 sections) | 2-3 jours | Sonnet 4.5 | 15K - 25K |
| Phase 4E : Pages info (4 sections) | 3-4 jours | Sonnet 4.5 | 25K - 40K |
| Phase 4F : Auth + Dashboard + Suivi | 5-7 jours | Sonnet 4.5 + ET | 45K - 75K |
| Phase 4G : Pages légales | 1 jour | Sonnet 4.5 | 5K - 10K |
| Phase 5 : Debug & Optim | 5-7 jours | Opus 4.5 | 35K - 60K |
| **TOTAL** | **35-53 jours** | **Opus + Sonnet** | **310K - 523K** |

---

*Analyser avec Opus · Structurer avec Opus · Générer section par section avec Sonnet · Extended Thinking pour Hero, CTA, Commander, Dashboard, Auth & Suivi · PayTech + Stripe + Wave Business · 24 pages complètes · Chaque élément du menu a sa page · 5+ contraintes par prompt · Penser senior product designer = **APPLICATION PREMIUM NIVEAU UBER PRO**.*
