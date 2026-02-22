# SCOD VTC

Service de chauffeur privé premium au Sénégal. Réservation en ligne de VTC avec chauffeur professionnel. Flotte premium : BMW, Tesla, Mercedes, Range Rover.

## 🚀 Stack Technique

- **Framework** : Next.js 15 App Router
- **Language** : TypeScript (strict mode)
- **Styling** : Tailwind CSS 4 + Framer Motion
- **UI Components** : Radix UI + shadcn/ui
- **Database** : Supabase (PostgreSQL + Auth + Realtime)
- **Maps** : Google Maps Platform
- **Payments** :
  - PayTech (Orange Money, Wave, Free Money)
  - Stripe (CB internationales, Apple Pay, Google Pay)
  - Wave Business (facturation entreprise)
- **SMS** : Twilio
- **Email** : Resend
- **Forms** : React Hook Form + Zod
- **State Management** : Zustand (à venir)

## 📁 Structure du Projet

```
scod-vtc/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/           # Pages publiques
│   │   ├── (auth)/             # Authentification
│   │   ├── (dashboard)/        # Dashboard client
│   │   ├── (admin)/            # Dashboard admin
│   │   └── api/                # API routes
│   ├── components/
│   │   ├── ui/                 # Composants UI de base
│   │   ├── layout/             # Layouts (Navbar, Footer, etc.)
│   │   ├── sections/           # Sections réutilisables
│   │   ├── booking/            # Flow de réservation
│   │   ├── tracking/           # Suivi temps réel
│   │   ├── payment/            # Composants paiement
│   │   ├── driver/             # Composants chauffeurs
│   │   ├── dashboard/          # Dashboard client
│   │   └── admin/              # Dashboard admin
│   ├── lib/                    # Utilitaires & SDK
│   │   ├── supabase/           # Client Supabase
│   │   ├── paytech/            # SDK PayTech
│   │   ├── stripe/             # Client Stripe
│   │   ├── wave-business/      # SDK Wave Business
│   │   ├── google-maps/        # Google Maps helpers
│   │   ├── twilio/             # Client Twilio
│   │   ├── resend/             # Client Resend
│   │   ├── cn.ts               # clsx + tailwind-merge
│   │   └── constants.ts        # Constantes globales
│   ├── hooks/                  # Custom React hooks
│   ├── stores/                 # State management (Zustand)
│   ├── types/                  # TypeScript types
│   └── styles/
│       └── globals.css         # Design system CSS
├── public/
│   └── images/                 # Images statiques
├── tailwind.config.ts          # Configuration Tailwind
├── tsconfig.json               # Configuration TypeScript
├── next.config.ts              # Configuration Next.js
└── package.json
```

## 🎨 Design System

### Couleurs

- **Brand** : `#110E40` (bleu marine profond)
- **Accent** : `#FFC300` (or)
- **Neutrals** : Échelle de gris (50-900)
- **Semantic** : success, warning, error, info

### Typographie

- **Display** : Barlow Condensed (700-900) → Titres, prix
- **Body** : Barlow (300-700) → Texte, boutons, inputs

### Espacement

Système 8px : 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128

### Border Radius

- Cards : `16px`
- Buttons : `8px`
- Inputs : `10px`
- Pills : `9999px`

## 🛠️ Installation

1. **Cloner le projet**

```bash
git clone https://github.com/votre-org/scod-vtc.git
cd scod-vtc
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer les variables d'environnement**

Copier `.env.example` vers `.env.local` et remplir les valeurs :

```bash
cp .env.example .env.local
```

Variables requises :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `PAYTECH_API_KEY`
- `STRIPE_SECRET_KEY`
- etc.

4. **Lancer le serveur de développement**

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 📦 Scripts Disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build production
- `npm run start` - Démarrer en production
- `npm run lint` - Linter ESLint
- `npm run type-check` - Vérification TypeScript

## 🗄️ Base de Données

Le schéma Supabase se trouve dans `/supabase/migrations/`.

Tables principales :
- `users` - Utilisateurs
- `vehicles` - Véhicules
- `drivers` - Chauffeurs
- `bookings` - Réservations
- `payments` - Paiements
- `companies` - Entreprises
- `reviews` - Avis
- `driver_applications` - Candidatures chauffeurs

## 🔐 Authentification

Authentification via Supabase Auth avec :
- OTP SMS (via Twilio)
- Magic link email
- Session persistante

## 💳 Paiements

### PayTech (Mobile Money Sénégal)
- Orange Money
- Wave
- Free Money

### Stripe (CB Internationales)
- Visa, Mastercard, Amex
- Apple Pay, Google Pay

### Wave Business
- Facturation entreprise
- Paiements récurrents

## 🗺️ Google Maps

Services utilisés :
- Places Autocomplete
- Directions API
- Distance Matrix API
- Maps JavaScript API

## 📱 Features

- ✅ Réservation en ligne (immédiate ou programmée)
- ✅ Suivi temps réel avec position du chauffeur
- ✅ Paiement multi-provider (mobile money + CB)
- ✅ Transfert aéroport AIBD avec prix fixe
- ✅ Location à l'heure / à la journée
- ✅ Comptes entreprises avec facturation
- ✅ Système de notation chauffeurs
- ✅ Notifications SMS et email
- ✅ Dashboard client et admin
- ✅ Responsive design (mobile-first)

## 🚧 Roadmap

### Phase 1 : MVP (4 semaines)
- [x] Setup projet
- [x] Design system
- [ ] Homepage
- [ ] Flow de réservation
- [ ] Paiement PayTech
- [ ] Confirmation et suivi basique

### Phase 2 : Core Features (3 semaines)
- [ ] Authentification OTP
- [ ] Dashboard client
- [ ] Suivi temps réel
- [ ] Paiement Stripe
- [ ] Notifications SMS

### Phase 3 : Business (3 semaines)
- [ ] Dashboard admin
- [ ] Gestion chauffeurs
- [ ] Comptes entreprises
- [ ] Wave Business
- [ ] Reporting

### Phase 4 : Polish (2 semaines)
- [ ] Animations Framer Motion
- [ ] PWA
- [ ] Performance
- [ ] Tests E2E
- [ ] Documentation

## 📄 License

Propriétaire - SCOD VTC © 2026

## 📞 Contact

- **Email** : contact@scod-vtc.sn
- **Support** : support@scod-vtc.sn
- **Téléphone** : +221 77 123 45 67
