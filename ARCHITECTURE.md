# SCOD VTC — Architecture Technique Complète

> Version 1.0 | Février 2026
> Stack : Next.js 15 + TypeScript + Tailwind 4 + Supabase + PayTech + Stripe + Wave Business

---

## 1. STRUCTURE DES DOSSIERS

```
scod-vtc/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx                              → Home (Hero + sections)
│   │   │   ├── commander/page.tsx                    → Commander une course (résa rapide Uber-like)
│   │   │   ├── reservation/page.tsx                  → Réservation complète (stepper 5 étapes)
│   │   │   ├── location/page.tsx                     → Location de véhicule avec chauffeur
│   │   │   ├── services/
│   │   │   │   ├── transfert-aeroport/page.tsx       → Transfert AIBD (page dédiée)
│   │   │   │   └── evenements/page.tsx               → Transport événementiel (page dédiée)
│   │   │   ├── entreprises/
│   │   │   │   ├── page.tsx                          → Landing entreprises
│   │   │   │   ├── trajets-pro/page.tsx              → Trajets collaborateurs (page dédiée)
│   │   │   │   └── chauffeur-disposition/page.tsx    → Chauffeur à disposition (page dédiée)
│   │   │   ├── pourquoi-scod/page.tsx                → Pourquoi SCOD VTC
│   │   │   ├── faq/page.tsx                          → FAQ complète avec recherche
│   │   │   ├── assistance/page.tsx                   → Centre d'aide & contact
│   │   │   ├── devenir-chauffeur/page.tsx            → Recrutement chauffeurs
│   │   │   ├── a-propos/page.tsx                     → À propos de SCOD VTC
│   │   │   ├── suivi/[bookingId]/page.tsx            → Suivi course temps réel
│   │   │   └── legal/
│   │   │       ├── cgv/page.tsx                      → Conditions générales
│   │   │       ├── confidentialite/page.tsx          → Politique de confidentialité
│   │   │       └── mentions-legales/page.tsx         → Mentions légales
│   │   ├── (auth)/
│   │   │   ├── layout.tsx                            → Layout auth (centré, minimal)
│   │   │   ├── connexion/page.tsx                    → Login (OTP SMS + Email)
│   │   │   └── inscription/page.tsx                  → Register
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx                            → Layout dashboard (sidebar)
│   │   │   ├── mon-compte/page.tsx                   → Dashboard client (overview)
│   │   │   ├── mon-compte/reservations/page.tsx      → Historique réservations
│   │   │   ├── mon-compte/profil/page.tsx            → Profil & préférences
│   │   │   └── mon-compte/paiements/page.tsx         → Moyens de paiement
│   │   ├── (admin)/
│   │   │   ├── layout.tsx                            → Layout admin (sidebar pro)
│   │   │   ├── dashboard/page.tsx                    → Admin overview (KPIs, graphiques)
│   │   │   ├── reservations/page.tsx                 → Gestion réservations
│   │   │   ├── chauffeurs/page.tsx                   → Gestion chauffeurs
│   │   │   ├── vehicules/page.tsx                    → Gestion flotte
│   │   │   ├── clients/page.tsx                      → Gestion clients
│   │   │   ├── entreprises/page.tsx                  → Comptes entreprises
│   │   │   ├── paiements/page.tsx                    → Suivi paiements
│   │   │   └── candidatures/page.tsx                 → Candidatures chauffeurs
│   │   ├── api/
│   │   │   ├── booking/
│   │   │   │   ├── create/route.ts
│   │   │   │   ├── cancel/route.ts
│   │   │   │   ├── estimate/route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── payment/
│   │   │   │   ├── paytech/route.ts
│   │   │   │   ├── stripe/route.ts
│   │   │   │   ├── wave-business/route.ts
│   │   │   │   └── webhook/
│   │   │   │       ├── paytech/route.ts
│   │   │   │       └── stripe/route.ts
│   │   │   ├── auth/
│   │   │   │   └── otp/
│   │   │   │       ├── send/route.ts
│   │   │   │       └── verify/route.ts
│   │   │   ├── fleet/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── tracking/
│   │   │   │   └── [bookingId]/route.ts
│   │   │   ├── user/
│   │   │   │   ├── bookings/route.ts
│   │   │   │   ├── profile/route.ts
│   │   │   │   └── payments/route.ts
│   │   │   ├── driver/
│   │   │   │   └── apply/route.ts
│   │   │   └── contact/route.ts
│   │   ├── layout.tsx                                → Root layout
│   │   ├── not-found.tsx                             → 404 page
│   │   ├── error.tsx                                 → Error boundary
│   │   └── loading.tsx                               → Global loading
│   │
│   ├── components/
│   │   ├── ui/                                       → Primitifs UI (shadcn/ui + custom)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── spinner.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── stepper.tsx
│   │   │   ├── date-picker.tsx
│   │   │   ├── time-picker.tsx
│   │   │   ├── phone-input.tsx
│   │   │   ├── star-rating.tsx
│   │   │   └── index.ts                              → Barrel export
│   │   │
│   │   ├── layout/                                   → Structure pages
│   │   │   ├── navbar.tsx
│   │   │   ├── navbar-mobile.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── page-wrapper.tsx
│   │   │   ├── section-wrapper.tsx
│   │   │   ├── dashboard-layout.tsx
│   │   │   ├── admin-layout.tsx
│   │   │   └── auth-layout.tsx
│   │   │
│   │   ├── sections/                                 → Sections réutilisables
│   │   │   ├── hero.tsx
│   │   │   ├── hero-booking-form.tsx
│   │   │   ├── fleet-grid.tsx
│   │   │   ├── vehicle-card.tsx
│   │   │   ├── services-toggle.tsx
│   │   │   ├── services-grid.tsx
│   │   │   ├── why-scod.tsx
│   │   │   ├── testimonials.tsx
│   │   │   ├── testimonial-card.tsx
│   │   │   ├── faq-section.tsx
│   │   │   ├── faq-item.tsx
│   │   │   ├── cta-section.tsx
│   │   │   ├── cta-banner.tsx
│   │   │   ├── stats-bar.tsx
│   │   │   ├── trust-badges.tsx
│   │   │   ├── partners-logos.tsx
│   │   │   ├── payment-methods.tsx
│   │   │   └── contact-form.tsx
│   │   │
│   │   ├── booking/                                  → Flow réservation
│   │   │   ├── booking-stepper.tsx
│   │   │   ├── step-trajet.tsx
│   │   │   ├── step-datetime.tsx
│   │   │   ├── step-vehicle.tsx
│   │   │   ├── step-options.tsx
│   │   │   ├── step-recap.tsx
│   │   │   ├── step-payment.tsx
│   │   │   ├── address-autocomplete.tsx
│   │   │   ├── route-preview.tsx
│   │   │   ├── price-breakdown.tsx
│   │   │   ├── vehicle-selector.tsx
│   │   │   ├── passenger-counter.tsx
│   │   │   ├── luggage-counter.tsx
│   │   │   └── booking-confirmation.tsx
│   │   │
│   │   ├── tracking/                                 → Suivi temps réel
│   │   │   ├── live-map.tsx
│   │   │   ├── driver-marker.tsx
│   │   │   ├── route-polyline.tsx
│   │   │   ├── driver-card.tsx
│   │   │   ├── status-bar.tsx
│   │   │   ├── eta-display.tsx
│   │   │   ├── trip-timeline.tsx
│   │   │   └── contact-driver.tsx
│   │   │
│   │   ├── payment/                                  → Paiements multi-provider
│   │   │   ├── payment-method-selector.tsx
│   │   │   ├── paytech-form.tsx
│   │   │   ├── stripe-form.tsx
│   │   │   ├── wave-business-form.tsx
│   │   │   ├── mobile-money-picker.tsx
│   │   │   ├── card-element.tsx
│   │   │   ├── payment-status.tsx
│   │   │   ├── invoice-preview.tsx
│   │   │   └── receipt.tsx
│   │   │
│   │   ├── driver/                                   → Chauffeurs
│   │   │   ├── driver-profile-card.tsx
│   │   │   ├── driver-rating.tsx
│   │   │   ├── driver-badge.tsx
│   │   │   └── application-form.tsx
│   │   │
│   │   ├── dashboard/                                → Composants dashboard
│   │   │   ├── booking-list.tsx
│   │   │   ├── booking-card.tsx
│   │   │   ├── stats-card.tsx
│   │   │   ├── quick-actions.tsx
│   │   │   ├── payment-methods-list.tsx
│   │   │   └── notification-center.tsx
│   │   │
│   │   └── admin/                                    → Composants admin
│   │       ├── data-table.tsx
│   │       ├── filters-bar.tsx
│   │       ├── kpi-card.tsx
│   │       ├── chart-wrapper.tsx
│   │       ├── booking-detail-modal.tsx
│   │       ├── driver-detail-modal.tsx
│   │       └── export-button.tsx
│   │
│   ├── lib/                                          → Utilitaires & SDK
│   │   ├── cn.ts                                     → clsx + tailwind-merge
│   │   ├── utils.ts                                  → Helpers généraux
│   │   ├── format.ts                                 → Formatage (prix, dates, téléphone)
│   │   ├── validation.ts                             → Schemas Zod
│   │   ├── supabase/
│   │   │   ├── client.ts                             → Client browser
│   │   │   ├── server.ts                             → Client server
│   │   │   ├── admin.ts                              → Client admin (service role)
│   │   │   └── middleware.ts                         → Auth middleware
│   │   ├── paytech/
│   │   │   ├── client.ts                             → SDK PayTech
│   │   │   ├── types.ts                              → Types PayTech
│   │   │   └── webhook.ts                            → Vérification webhook
│   │   ├── stripe/
│   │   │   ├── client.ts                             → Stripe client
│   │   │   ├── server.ts                             → Stripe server
│   │   │   └── webhook.ts                            → Vérification webhook
│   │   ├── wave-business/
│   │   │   ├── client.ts                             → SDK Wave Business
│   │   │   └── types.ts                              → Types Wave Business
│   │   ├── google-maps/
│   │   │   ├── loader.ts                             → Loader Google Maps
│   │   │   ├── autocomplete.ts                       → Places Autocomplete
│   │   │   ├── directions.ts                         → Directions API
│   │   │   ├── distance-matrix.ts                    → Distance Matrix API
│   │   │   └── geocoding.ts                          → Geocoding
│   │   ├── twilio/
│   │   │   ├── client.ts                             → Client Twilio
│   │   │   └── templates.ts                          → Templates SMS
│   │   ├── resend/
│   │   │   ├── client.ts                             → Client Resend
│   │   │   └── templates/                            → Templates emails
│   │   │       ├── booking-confirmation.tsx
│   │   │       ├── payment-receipt.tsx
│   │   │       ├── driver-assigned.tsx
│   │   │       └── invoice.tsx
│   │   └── constants.ts                              → Constantes globales
│   │
│   ├── hooks/                                        → Custom hooks
│   │   ├── use-booking.ts                            → Logique réservation
│   │   ├── use-booking-store.ts                      → Store Zustand booking
│   │   ├── use-fleet.ts                              → Données flotte
│   │   ├── use-auth.ts                               → Authentification
│   │   ├── use-user.ts                               → Données utilisateur
│   │   ├── use-tracking.ts                           → Suivi temps réel
│   │   ├── use-payment.ts                            → Gestion paiement
│   │   ├── use-google-maps.ts                        → Google Maps hooks
│   │   ├── use-autocomplete.ts                       → Autocomplete adresse
│   │   ├── use-directions.ts                         → Calcul itinéraire
│   │   ├── use-media-query.ts                        → Responsive
│   │   ├── use-scroll-lock.ts                        → Lock scroll modales
│   │   ├── use-local-storage.ts                      → Persistance locale
│   │   └── use-toast.ts                              → Notifications toast
│   │
│   ├── stores/                                       → State management (Zustand)
│   │   ├── booking-store.ts                          → État réservation
│   │   ├── auth-store.ts                             → État auth
│   │   └── ui-store.ts                               → État UI (modales, drawers)
│   │
│   ├── types/                                        → Types TypeScript
│   │   ├── index.ts                                  → Barrel export
│   │   ├── vehicle.ts                                → Vehicle, VehicleCategory
│   │   ├── booking.ts                                → Booking, BookingStatus, BookingStep
│   │   ├── user.ts                                   → User, UserRole, UserPreferences
│   │   ├── driver.ts                                 → Driver, DriverStatus
│   │   ├── payment.ts                                → Payment, PaymentMethod, PaymentProvider
│   │   ├── company.ts                                → Company, CompanyPlan
│   │   ├── location.ts                               → Address, Coordinates, Route
│   │   ├── review.ts                                 → Review, Rating
│   │   └── api.ts                                    → API Response types
│   │
│   ├── styles/
│   │   └── globals.css                               → Design tokens, base styles
│   │
│   └── middleware.ts                                 → Auth + routing middleware
│
├── public/
│   ├── images/
│   │   ├── logo/
│   │   │   ├── scod-logo.svg
│   │   │   ├── scod-logo-white.svg
│   │   │   └── scod-icon.svg
│   │   ├── vehicles/
│   │   │   ├── bmw-serie-5.webp
│   │   │   ├── tesla-model-s.webp
│   │   │   ├── tesla-model-x.webp
│   │   │   ├── range-rover.webp
│   │   │   ├── mercedes-classe-s.webp
│   │   │   ├── mercedes-classe-v.webp
│   │   │   └── van-pmr.webp
│   │   ├── hero/
│   │   │   └── hero-bg.webp
│   │   ├── icons/
│   │   │   ├── orange-money.svg
│   │   │   ├── wave.svg
│   │   │   ├── free-money.svg
│   │   │   ├── visa.svg
│   │   │   ├── mastercard.svg
│   │   │   ├── amex.svg
│   │   │   ├── apple-pay.svg
│   │   │   └── google-pay.svg
│   │   └── patterns/
│   │       └── grain.png
│   ├── fonts/
│   │   └── (Barlow via Google Fonts CDN)
│   └── favicon.ico
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_users.sql
│   │   ├── 002_vehicles.sql
│   │   ├── 003_drivers.sql
│   │   ├── 004_bookings.sql
│   │   ├── 005_payments.sql
│   │   ├── 006_companies.sql
│   │   ├── 007_reviews.sql
│   │   ├── 008_driver_applications.sql
│   │   └── 009_rls_policies.sql
│   ├── seed.sql                                      → Données initiales
│   └── functions/
│       ├── calculate-price.sql                       → Calcul prix côté DB
│       └── assign-driver.sql                         → Attribution chauffeur
│
├── .env.local                                        → Variables environnement
├── .env.example                                      → Template env
├── next.config.ts                                    → Config Next.js
├── tailwind.config.ts                                → Config Tailwind
├── tsconfig.json                                     → Config TypeScript
├── components.json                                   → Config shadcn/ui
├── package.json
└── README.md
```

---

## 2. DESIGN SYSTEM COMPLET

### 2.1 Palette de couleurs

```css
:root {
  /* Brand */
  --brand: #110E40;
  --brand-dark: #0A0920;
  --brand-hover: #1C1870;
  --brand-light: #2A2680;
  --brand-muted: rgba(17, 14, 64, 0.08);

  /* Accent (Or) */
  --accent: #FFC300;
  --accent-hover: #E6B000;
  --accent-light: #FFD440;
  --accent-soft: rgba(255, 195, 0, 0.10);
  --accent-muted: rgba(255, 195, 0, 0.20);

  /* Neutrals */
  --white: #FFFFFF;
  --grey-50: #F9FAFB;
  --grey-100: #F3F4F6;
  --grey-200: #E5E7EB;
  --grey-300: #D1D5DB;
  --grey-400: #9CA3AF;
  --grey-500: #6B7280;
  --grey-600: #4B5563;
  --grey-700: #374151;
  --grey-800: #1F2937;
  --grey-900: #111827;

  /* Semantic */
  --success: #10B981;
  --success-soft: rgba(16, 185, 129, 0.10);
  --warning: #F59E0B;
  --warning-soft: rgba(245, 158, 11, 0.10);
  --error: #EF4444;
  --error-soft: rgba(239, 68, 68, 0.10);
  --info: #3B82F6;
  --info-soft: rgba(59, 130, 246, 0.10);

  /* Surfaces */
  --surface-primary: var(--white);
  --surface-secondary: var(--grey-50);
  --surface-elevated: var(--white);
  --surface-overlay: rgba(17, 14, 64, 0.60);

  /* Text */
  --text-primary: var(--grey-900);
  --text-secondary: var(--grey-600);
  --text-tertiary: var(--grey-400);
  --text-inverse: var(--white);
  --text-brand: var(--brand);
  --text-accent: var(--accent);

  /* Borders */
  --border-default: var(--grey-200);
  --border-hover: var(--grey-300);
  --border-focus: var(--brand);
  --border-accent: var(--accent);
}
```

### 2.2 Typographie

```css
:root {
  /* Font Families */
  --font-display: 'Barlow Condensed', sans-serif;
  --font-body: 'Barlow', sans-serif;

  /* Font Sizes (rem) */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  --text-6xl: 3.75rem;     /* 60px */
  --text-7xl: 4.5rem;      /* 72px */
  --text-8xl: 6rem;        /* 96px */

  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.1;
  --leading-snug: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;

  /* Font Weights */
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  --font-black: 900;

  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

**Règles d'usage typographique :**

| Élément | Font | Taille | Poids | Ligne | Tracking |
|---------|------|--------|-------|-------|----------|
| Hero H1 | Barlow Condensed | 72-96px | 900 | 1.0 | -0.02em |
| Section H2 | Barlow Condensed | 48-60px | 800 | 1.1 | -0.02em |
| Card Title | Barlow Condensed | 24-30px | 700 | 1.2 | -0.01em |
| Prix | Barlow Condensed | 36-48px | 800 | 1.0 | 0 |
| Nom véhicule | Barlow Condensed | 20-24px | 700 | 1.2 | 0 |
| Body Large | Barlow | 18px | 400 | 1.6 | 0 |
| Body | Barlow | 16px | 400 | 1.5 | 0 |
| Body Small | Barlow | 14px | 400 | 1.5 | 0 |
| Button | Barlow | 14-16px | 600 | 1.0 | 0.02em |
| Input | Barlow | 16px | 400 | 1.5 | 0 |
| Label | Barlow | 14px | 500 | 1.0 | 0 |
| Meta/Caption | Barlow | 12-14px | 400 | 1.4 | 0.01em |
| Badge | Barlow | 12px | 600 | 1.0 | 0.02em |
| Nav Link | Barlow | 14-15px | 500 | 1.0 | 0 |

### 2.3 Spacing (système 8px)

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* Section spacing */
  --section-y-sm: var(--space-12);   /* 48px */
  --section-y-md: var(--space-16);   /* 64px */
  --section-y-lg: var(--space-20);   /* 80px */
  --section-y-xl: var(--space-24);   /* 96px */

  /* Container */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1400px;
  --container-padding: var(--space-4);
}
```

### 2.4 Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 8px;       /* Buttons */
  --radius-lg: 12px;
  --radius-xl: 16px;      /* Cards */
  --radius-2xl: 24px;
  --radius-3xl: 32px;
  --radius-full: 9999px;  /* Pills, avatars */

  /* Semantic */
  --radius-button: var(--radius-md);
  --radius-input: 10px;
  --radius-card: var(--radius-xl);
  --radius-modal: var(--radius-2xl);
  --radius-badge: var(--radius-full);
  --radius-avatar: var(--radius-full);
}
```

### 2.5 Shadows

```css
:root {
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.10), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.10), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  /* Glow effects */
  --shadow-glow-accent: 0 0 20px rgba(255, 195, 0, 0.30);
  --shadow-glow-accent-lg: 0 0 40px rgba(255, 195, 0, 0.40);
  --shadow-glow-brand: 0 0 20px rgba(17, 14, 64, 0.20);

  /* Card shadows */
  --shadow-card: var(--shadow-md);
  --shadow-card-hover: var(--shadow-xl);
  --shadow-modal: var(--shadow-2xl);
  --shadow-dropdown: var(--shadow-lg);
}
```

### 2.6 Transitions & Animations

```css
:root {
  /* Durations */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;

  /* Easings */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Transitions prédéfinies */
  --transition-colors: color var(--duration-fast) var(--ease-default),
                       background-color var(--duration-fast) var(--ease-default),
                       border-color var(--duration-fast) var(--ease-default);
  --transition-transform: transform var(--duration-normal) var(--ease-spring);
  --transition-shadow: box-shadow var(--duration-normal) var(--ease-default);
  --transition-opacity: opacity var(--duration-normal) var(--ease-default);
  --transition-all: all var(--duration-normal) var(--ease-spring);
}
```

### 2.7 Z-Index Scale

```css
:root {
  --z-base: 0;
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-fixed: 30;
  --z-modal-backdrop: 40;
  --z-modal: 50;
  --z-popover: 60;
  --z-tooltip: 70;
  --z-toast: 80;
  --z-max: 9999;
}
```

---

## 3. COMPOSANTS UI (Liste complète)

### 3.1 Button

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'destructive';
  size: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
}
```

| Variant | Background | Text | Border | Usage |
|---------|-----------|------|--------|-------|
| primary | brand | white | none | CTA principal |
| secondary | grey-100 | grey-900 | none | Action secondaire |
| outline | transparent | brand | brand | Alternative |
| ghost | transparent | grey-600 | none | Navigation, actions subtiles |
| accent | accent | brand | none | CTA urgents, réserver |
| destructive | error | white | none | Supprimer, annuler |

| Size | Height | Padding X | Font Size | Icon Size |
|------|--------|-----------|-----------|-----------|
| sm | 32px | 12px | 13px | 16px |
| md | 40px | 16px | 14px | 18px |
| lg | 48px | 24px | 16px | 20px |
| xl | 56px | 32px | 18px | 24px |

### 3.2 Input

```typescript
interface InputProps {
  variant: 'default' | 'filled' | 'flushed';
  size: 'sm' | 'md' | 'lg';
  error?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
}
```

### 3.3 Card

```typescript
interface CardProps {
  variant: 'default' | 'elevated' | 'outlined' | 'interactive' | 'premium';
  padding: 'none' | 'sm' | 'md' | 'lg';
  radius: 'md' | 'lg' | 'xl';
}
```

| Variant | Background | Shadow | Border | Hover Effect |
|---------|-----------|--------|--------|--------------|
| default | white | sm | grey-200 | none |
| elevated | white | lg | none | shadow-xl on hover |
| outlined | white | none | grey-200 | border-brand on hover |
| interactive | white | md | none | translateY(-4px) + shadow-xl |
| premium | gradient brand | glow-accent | none | scale(1.02) |

### 3.4 Badge

```typescript
interface BadgeProps {
  variant: 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent' | 'brand';
  size: 'sm' | 'md' | 'lg';
  dot?: boolean;
  removable?: boolean;
}
```

### 3.5 Modal / Dialog

```typescript
interface ModalProps {
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  position: 'center' | 'top' | 'bottom';
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
}
```

| Size | Max Width | Usage |
|------|-----------|-------|
| sm | 400px | Confirmations |
| md | 500px | Formulaires simples |
| lg | 600px | Formulaires complexes |
| xl | 800px | Contenu riche |
| full | 100vw - 40px | Galeries, maps |

### 3.6 Stepper

```typescript
interface StepperProps {
  steps: Step[];
  currentStep: number;
  orientation: 'horizontal' | 'vertical';
  variant: 'dots' | 'numbers' | 'icons' | 'progress';
  showLabels?: boolean;
  allowClickNavigation?: boolean;
}

interface Step {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  status: 'pending' | 'current' | 'completed' | 'error';
}
```

### 3.7 DatePicker / TimePicker

```typescript
interface DatePickerProps {
  mode: 'single' | 'range';
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  locale: 'fr-SN';
  showTimePicker?: boolean;
  timeIntervals: 15 | 30 | 60;
}
```

### 3.8 PhoneInput

```typescript
interface PhoneInputProps {
  defaultCountry: 'SN';
  preferredCountries: ['SN', 'FR', 'US', 'GB'];
  onlyCountries?: string[];
  format: 'national' | 'international';
}
```

### 3.9 StarRating

```typescript
interface StarRatingProps {
  value: number;
  max: 5;
  size: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  precision: 0.5 | 1;
  showValue?: boolean;
}
```

### 3.10 Toast

```typescript
interface ToastProps {
  variant: 'default' | 'success' | 'error' | 'warning' | 'info';
  position: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
  duration: number; // ms, 0 = persistent
  dismissible?: boolean;
  action?: { label: string; onClick: () => void };
}
```

---

## 4. ARCHITECTURE DES PAGES (27 pages)

### 4.1 Pages Publiques

| Route | Rendu | Sections | Priorité | Description |
|-------|-------|----------|----------|-------------|
| `/` | SSG + ISR (1h) | Hero, FleetGrid, ServicesToggle, WhyScod, Testimonials, FAQ, CTA, Footer | P0 | Homepage, vitrine |
| `/commander` | CSR | HeroBookingForm (simplifié), QuickEstimate, VehiclePreview | P0 | Résa rapide style Uber |
| `/reservation` | CSR | Stepper 5 étapes, Map, PriceBreakdown | P0 | Résa complète |
| `/location` | SSG | Hero, DurationSelector, VehicleGrid, PriceTable, FAQ | P1 | Location avec chauffeur |
| `/services/transfert-aeroport` | SSG | Hero AIBD, FixedPrices, BookingForm, FAQ | P0 | Transfert aéroport |
| `/services/evenements` | SSG | Hero, EventTypes, Gallery, Quote Form | P1 | Événementiel |
| `/entreprises` | SSG | Hero B2B, Features, Pricing, ContactForm | P1 | Landing entreprises |
| `/entreprises/trajets-pro` | SSG | Hero, Benefits, Integration, ContactForm | P1 | Trajets collaborateurs |
| `/entreprises/chauffeur-disposition` | SSG | Hero, Pricing, BookingForm | P2 | Chauffeur dédié |
| `/pourquoi-scod` | SSG | Hero, Values, Team, Stats, CTA | P2 | Page marque |
| `/faq` | SSG + ISR | SearchBar, Categories, AccordionFAQ | P1 | FAQ complète |
| `/assistance` | SSG | ContactForm, FAQ, LiveChat CTA | P1 | Support |
| `/devenir-chauffeur` | SSG | Hero, Benefits, Requirements, ApplicationForm | P1 | Recrutement |
| `/a-propos` | SSG | Story, Team, Values, Press | P2 | À propos |
| `/suivi/[bookingId]` | SSR | LiveMap, DriverCard, StatusBar, ETA, Timeline | P0 | Suivi temps réel |
| `/legal/cgv` | SSG | Markdown content | P3 | CGV |
| `/legal/confidentialite` | SSG | Markdown content | P3 | Privacy |
| `/legal/mentions-legales` | SSG | Markdown content | P3 | Mentions |

### 4.2 Pages Auth

| Route | Rendu | Sections | Priorité |
|-------|-------|----------|----------|
| `/connexion` | CSR | PhoneInput, OTPInput, SocialButtons | P0 |
| `/inscription` | CSR | RegistrationForm (3 steps), Verification | P0 |

### 4.3 Pages Dashboard Client

| Route | Rendu | Sections | Priorité |
|-------|-------|----------|----------|
| `/mon-compte` | SSR | WelcomeCard, UpcomingBookings, QuickActions, RecentTrips | P0 |
| `/mon-compte/reservations` | SSR | BookingFilters, BookingList, Pagination | P0 |
| `/mon-compte/profil` | SSR | ProfileForm, PreferencesForm, NotificationSettings | P1 |
| `/mon-compte/paiements` | SSR | PaymentMethodsList, AddPaymentMethod, TransactionHistory | P1 |

### 4.4 Pages Admin

| Route | Rendu | Sections | Priorité |
|-------|-------|----------|----------|
| `/admin/dashboard` | SSR | KPIs, RevenueChart, BookingsChart, RecentActivity | P1 |
| `/admin/reservations` | SSR | Filters, DataTable, BookingDetailModal | P0 |
| `/admin/chauffeurs` | SSR | Filters, DataTable, DriverDetailModal, StatusToggle | P1 |
| `/admin/vehicules` | SSR | Filters, DataTable, VehicleForm | P1 |
| `/admin/clients` | SSR | Filters, DataTable, ClientDetailModal | P2 |
| `/admin/entreprises` | SSR | CompanyList, ContractDetails, Invoicing | P2 |
| `/admin/paiements` | SSR | PaymentFilters, TransactionTable, Reconciliation | P1 |
| `/admin/candidatures` | SSR | ApplicationList, ReviewModal, StatusActions | P2 |

---

## 5. MODÈLE DE DONNÉES (Supabase)

### 5.1 Table `users`

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  phone TEXT UNIQUE NOT NULL,
  phone_verified BOOLEAN DEFAULT false,
  email_verified BOOLEAN DEFAULT false,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'driver', 'admin', 'super_admin')),
  
  -- Préférences
  preferred_language TEXT DEFAULT 'fr',
  preferred_payment_method TEXT,
  notification_sms BOOLEAN DEFAULT true,
  notification_email BOOLEAN DEFAULT true,
  notification_push BOOLEAN DEFAULT true,
  
  -- Entreprise (si applicable)
  company_id UUID REFERENCES companies(id),
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_login_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  
  CONSTRAINT email_or_phone CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_company ON users(company_id);
```

### 5.2 Table `vehicles`

```sql
CREATE TYPE vehicle_category AS ENUM ('berline', 'suv', 'luxe', 'van', 'pmr');
CREATE TYPE vehicle_status AS ENUM ('available', 'in_use', 'maintenance', 'retired');

CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Infos véhicule
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  license_plate TEXT UNIQUE NOT NULL,
  color TEXT NOT NULL,
  
  -- Catégorie et capacité
  category vehicle_category NOT NULL,
  passenger_capacity INTEGER NOT NULL CHECK (passenger_capacity >= 1 AND passenger_capacity <= 8),
  luggage_capacity INTEGER NOT NULL CHECK (luggage_capacity >= 0),
  
  -- Features
  has_wifi BOOLEAN DEFAULT false,
  has_water BOOLEAN DEFAULT false,
  has_charger BOOLEAN DEFAULT true,
  has_child_seat BOOLEAN DEFAULT false,
  is_wheelchair_accessible BOOLEAN DEFAULT false,
  
  -- Médias
  image_url TEXT NOT NULL,
  gallery_urls TEXT[],
  
  -- Tarification
  base_price_per_km DECIMAL(10, 2) NOT NULL,
  min_price DECIMAL(10, 2) NOT NULL,
  hourly_rate DECIMAL(10, 2), -- Pour location
  daily_rate DECIMAL(10, 2),  -- Pour location longue durée
  
  -- Statut
  status vehicle_status DEFAULT 'available',
  current_driver_id UUID REFERENCES drivers(id),
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  CONSTRAINT valid_year CHECK (year >= 2018 AND year <= EXTRACT(YEAR FROM now()) + 1)
);

CREATE INDEX idx_vehicles_category ON vehicles(category);
CREATE INDEX idx_vehicles_status ON vehicles(status);
```

### 5.3 Table `drivers`

```sql
CREATE TYPE driver_status AS ENUM ('available', 'on_trip', 'offline', 'suspended');

CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  
  -- Infos professionnelles
  license_number TEXT NOT NULL UNIQUE,
  license_expiry DATE NOT NULL,
  vtc_card_number TEXT NOT NULL,
  vtc_card_expiry DATE NOT NULL,
  
  -- Véhicule assigné
  vehicle_id UUID REFERENCES vehicles(id),
  
  -- Statistiques
  total_trips INTEGER DEFAULT 0,
  rating_average DECIMAL(3, 2) DEFAULT 5.00 CHECK (rating_average >= 1 AND rating_average <= 5),
  rating_count INTEGER DEFAULT 0,
  years_experience INTEGER DEFAULT 0,
  
  -- Langues parlées
  languages TEXT[] DEFAULT ARRAY['fr'],
  
  -- Localisation temps réel
  current_latitude DECIMAL(10, 8),
  current_longitude DECIMAL(11, 8),
  last_location_update TIMESTAMPTZ,
  
  -- Statut
  status driver_status DEFAULT 'offline',
  is_verified BOOLEAN DEFAULT false,
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  CONSTRAINT valid_rating CHECK (rating_average IS NULL OR (rating_average >= 1 AND rating_average <= 5))
);

CREATE INDEX idx_drivers_status ON drivers(status);
CREATE INDEX idx_drivers_vehicle ON drivers(vehicle_id);
CREATE INDEX idx_drivers_location ON drivers USING gist (
  ll_to_earth(current_latitude, current_longitude)
) WHERE current_latitude IS NOT NULL;
```

### 5.4 Table `bookings`

```sql
CREATE TYPE booking_status AS ENUM (
  'pending',           -- En attente de paiement
  'confirmed',         -- Payé, en attente du chauffeur
  'driver_assigned',   -- Chauffeur assigné
  'driver_en_route',   -- Chauffeur en route vers pickup
  'arrived',           -- Chauffeur arrivé au point de pickup
  'in_progress',       -- Course en cours
  'completed',         -- Course terminée
  'cancelled',         -- Annulée
  'no_show'            -- Client absent
);

CREATE TYPE booking_type AS ENUM (
  'immediate',         -- Course immédiate
  'scheduled',         -- Course programmée
  'airport_transfer',  -- Transfert aéroport
  'hourly_rental',     -- Location à l'heure
  'daily_rental',      -- Location à la journée
  'event'              -- Événement
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT UNIQUE NOT NULL, -- SCOD-XXXXXX
  
  -- Relations
  user_id UUID NOT NULL REFERENCES users(id),
  driver_id UUID REFERENCES drivers(id),
  vehicle_id UUID REFERENCES vehicles(id),
  company_id UUID REFERENCES companies(id), -- Si résa entreprise
  
  -- Type de réservation
  booking_type booking_type NOT NULL DEFAULT 'immediate',
  
  -- Trajet
  pickup_address TEXT NOT NULL,
  pickup_latitude DECIMAL(10, 8) NOT NULL,
  pickup_longitude DECIMAL(11, 8) NOT NULL,
  pickup_instructions TEXT,
  
  dropoff_address TEXT NOT NULL,
  dropoff_latitude DECIMAL(10, 8) NOT NULL,
  dropoff_longitude DECIMAL(11, 8) NOT NULL,
  dropoff_instructions TEXT,
  
  -- Arrêts intermédiaires (JSON array)
  stops JSONB DEFAULT '[]',
  
  -- Timing
  scheduled_at TIMESTAMPTZ NOT NULL,
  pickup_at TIMESTAMPTZ,         -- Heure réelle de prise en charge
  dropoff_at TIMESTAMPTZ,        -- Heure réelle d'arrivée
  
  -- Passagers et bagages
  passenger_count INTEGER NOT NULL DEFAULT 1 CHECK (passenger_count >= 1),
  luggage_count INTEGER DEFAULT 0 CHECK (luggage_count >= 0),
  
  -- Infos passager (si différent du booker)
  passenger_name TEXT,
  passenger_phone TEXT,
  
  -- Distance et durée estimées
  estimated_distance_km DECIMAL(10, 2),
  estimated_duration_min INTEGER,
  
  -- Tarification
  base_price DECIMAL(10, 2) NOT NULL,
  distance_price DECIMAL(10, 2) DEFAULT 0,
  time_price DECIMAL(10, 2) DEFAULT 0,
  extras_price DECIMAL(10, 2) DEFAULT 0,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  discount_code TEXT,
  total_price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'XOF', -- FCFA
  
  -- Options
  options JSONB DEFAULT '{}', -- child_seat, water, etc.
  
  -- Notes
  notes TEXT,
  internal_notes TEXT, -- Admin only
  
  -- Statut
  status booking_status DEFAULT 'pending',
  cancellation_reason TEXT,
  cancelled_by UUID REFERENCES users(id),
  cancelled_at TIMESTAMPTZ,
  
  -- Flight info (pour transferts aéroport)
  flight_number TEXT,
  flight_origin TEXT,
  flight_arrival_time TIMESTAMPTZ,
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  CONSTRAINT valid_passenger_count CHECK (passenger_count >= 1 AND passenger_count <= 8),
  CONSTRAINT valid_price CHECK (total_price >= 0)
);

CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_driver ON bookings(driver_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_scheduled ON bookings(scheduled_at);
CREATE INDEX idx_bookings_reference ON bookings(reference);
CREATE INDEX idx_bookings_company ON bookings(company_id);
```

### 5.5 Table `payments`

```sql
CREATE TYPE payment_status AS ENUM (
  'pending',
  'processing',
  'completed',
  'failed',
  'refunded',
  'partially_refunded'
);

CREATE TYPE payment_provider AS ENUM (
  'paytech',        -- Orange Money, Wave, Free Money
  'stripe',         -- CB internationales
  'wave_business',  -- Facturation entreprise
  'cash'            -- Espèces
);

CREATE TYPE payment_method AS ENUM (
  'orange_money',
  'wave',
  'free_money',
  'visa',
  'mastercard',
  'amex',
  'apple_pay',
  'google_pay',
  'cash',
  'invoice'  -- Facturation entreprise
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relations
  booking_id UUID NOT NULL REFERENCES bookings(id),
  user_id UUID NOT NULL REFERENCES users(id),
  company_id UUID REFERENCES companies(id), -- Si paiement entreprise
  
  -- Montants
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'XOF',
  
  -- Provider et méthode
  provider payment_provider NOT NULL,
  method payment_method NOT NULL,
  
  -- Références externes
  provider_payment_id TEXT, -- ID côté PayTech/Stripe
  provider_transaction_id TEXT,
  
  -- Statut
  status payment_status DEFAULT 'pending',
  
  -- Détails erreur (si échec)
  error_code TEXT,
  error_message TEXT,
  
  -- Remboursement
  refund_amount DECIMAL(10, 2),
  refund_reason TEXT,
  refunded_at TIMESTAMPTZ,
  
  -- Métadonnées provider
  provider_metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  
  CONSTRAINT valid_amount CHECK (amount > 0)
);

CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_provider ON payments(provider);
CREATE INDEX idx_payments_provider_id ON payments(provider_payment_id);
```

### 5.6 Table `companies`

```sql
CREATE TYPE company_plan AS ENUM ('starter', 'business', 'enterprise');

CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Infos entreprise
  name TEXT NOT NULL,
  legal_name TEXT NOT NULL,
  registration_number TEXT, -- NINEA
  tax_id TEXT, -- NIF
  
  -- Contact
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  billing_email TEXT,
  
  -- Adresse
  address TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Dakar',
  country TEXT DEFAULT 'SN',
  
  -- Plan et facturation
  plan company_plan DEFAULT 'starter',
  billing_cycle TEXT DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'quarterly', 'yearly')),
  credit_limit DECIMAL(12, 2) DEFAULT 0,
  current_balance DECIMAL(12, 2) DEFAULT 0,
  
  -- Contact principal
  primary_contact_id UUID REFERENCES users(id),
  
  -- Wave Business
  wave_business_id TEXT, -- ID compte Wave Business
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  
  CONSTRAINT valid_balance CHECK (current_balance <= credit_limit)
);

CREATE INDEX idx_companies_name ON companies(name);
CREATE INDEX idx_companies_plan ON companies(plan);
```

### 5.7 Table `reviews`

```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relations
  booking_id UUID NOT NULL UNIQUE REFERENCES bookings(id),
  user_id UUID NOT NULL REFERENCES users(id),
  driver_id UUID NOT NULL REFERENCES drivers(id),
  
  -- Note et commentaire
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  
  -- Catégories de notation
  rating_punctuality INTEGER CHECK (rating_punctuality >= 1 AND rating_punctuality <= 5),
  rating_cleanliness INTEGER CHECK (rating_cleanliness >= 1 AND rating_cleanliness <= 5),
  rating_driving INTEGER CHECK (rating_driving >= 1 AND rating_driving <= 5),
  rating_communication INTEGER CHECK (rating_communication >= 1 AND rating_communication <= 5),
  
  -- Réponse du chauffeur
  driver_response TEXT,
  driver_responded_at TIMESTAMPTZ,
  
  -- Modération
  is_published BOOLEAN DEFAULT true,
  is_flagged BOOLEAN DEFAULT false,
  moderation_notes TEXT,
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_reviews_driver ON reviews(driver_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
```

### 5.8 Table `driver_applications`

```sql
CREATE TYPE application_status AS ENUM (
  'submitted',
  'documents_pending',
  'under_review',
  'interview_scheduled',
  'approved',
  'rejected'
);

CREATE TABLE driver_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Infos candidat
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  
  -- Adresse
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  
  -- Permis et expérience
  license_number TEXT NOT NULL,
  license_issue_date DATE NOT NULL,
  years_driving_experience INTEGER NOT NULL,
  has_vtc_experience BOOLEAN DEFAULT false,
  vtc_experience_details TEXT,
  
  -- Véhicule (si propriétaire)
  owns_vehicle BOOLEAN DEFAULT false,
  vehicle_brand TEXT,
  vehicle_model TEXT,
  vehicle_year INTEGER,
  
  -- Documents (URLs Supabase Storage)
  license_front_url TEXT,
  license_back_url TEXT,
  id_card_url TEXT,
  vtc_card_url TEXT,
  criminal_record_url TEXT, -- Casier judiciaire
  photo_url TEXT,
  
  -- Motivation
  motivation TEXT,
  availability TEXT, -- full_time, part_time, weekends
  preferred_zones TEXT[], -- Dakar, Thies, etc.
  
  -- Langues
  languages TEXT[] DEFAULT ARRAY['fr'],
  
  -- Statut
  status application_status DEFAULT 'submitted',
  rejection_reason TEXT,
  
  -- Review
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  interview_date TIMESTAMPTZ,
  interview_notes TEXT,
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  CONSTRAINT valid_experience CHECK (years_driving_experience >= 2)
);

CREATE INDEX idx_applications_status ON driver_applications(status);
CREATE INDEX idx_applications_email ON driver_applications(email);
CREATE INDEX idx_applications_phone ON driver_applications(phone);
```

### 5.9 Row Level Security (RLS)

```sql
-- Enable RLS sur toutes les tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_applications ENABLE ROW LEVEL SECURITY;

-- Users: voir son propre profil
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Vehicles: tout le monde peut voir les véhicules disponibles
CREATE POLICY "Anyone can view available vehicles"
  ON vehicles FOR SELECT
  USING (status = 'available');

-- Bookings: voir ses propres réservations
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Drivers peuvent voir leurs courses assignées
CREATE POLICY "Drivers can view assigned bookings"
  ON bookings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM drivers
      WHERE drivers.user_id = auth.uid()
      AND drivers.id = bookings.driver_id
    )
  );

-- Payments: voir ses propres paiements
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

-- Reviews: tout le monde peut voir les avis publiés
CREATE POLICY "Anyone can view published reviews"
  ON reviews FOR SELECT
  USING (is_published = true);

CREATE POLICY "Users can create reviews for their bookings"
  ON reviews FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = booking_id
      AND bookings.user_id = auth.uid()
      AND bookings.status = 'completed'
    )
  );

-- Admin bypass (via service role ou custom claim)
CREATE POLICY "Admins have full access"
  ON users FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'super_admin')
    )
  );
```

---

## 6. INTÉGRATIONS TIERCES

### 6.1 Google Maps Platform

| API | Usage | Quotas estimés |
|-----|-------|----------------|
| Places Autocomplete | Saisie adresses | 10K req/mois |
| Directions API | Calcul itinéraire | 5K req/mois |
| Distance Matrix API | Estimation prix | 5K req/mois |
| Maps JavaScript API | Affichage cartes | Unlimited |
| Geocoding API | Reverse geocoding | 2K req/mois |

**Configuration :**
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=xxx
GOOGLE_MAPS_SERVER_API_KEY=xxx (pour Distance Matrix côté serveur)
```

**Restrictions API Key :**
- Browser key : HTTP referrers (scod-vtc.sn, localhost)
- Server key : IP restriction (serveur Vercel)

### 6.2 PayTech (Paiements Mobile Money Sénégal)

**Providers supportés :**
- Orange Money
- Wave
- Free Money

**Flow de paiement :**
1. Client choisit méthode → `POST /api/payment/paytech`
2. API crée une transaction PayTech → renvoie URL de paiement
3. Redirection vers page PayTech (ou USSD)
4. Client paye → PayTech envoie webhook
5. `POST /api/payment/webhook/paytech` → met à jour statut

**Variables d'environnement :**
```env
PAYTECH_API_KEY=xxx
PAYTECH_SECRET_KEY=xxx
PAYTECH_ENV=production # ou test
PAYTECH_WEBHOOK_SECRET=xxx
PAYTECH_IPN_URL=https://scod-vtc.sn/api/payment/webhook/paytech
PAYTECH_SUCCESS_URL=https://scod-vtc.sn/suivi/{bookingId}
PAYTECH_CANCEL_URL=https://scod-vtc.sn/reservation?error=cancelled
```

### 6.3 Stripe (CB Internationales)

**Méthodes supportées :**
- Visa, Mastercard, Amex
- Apple Pay, Google Pay

**Flow de paiement :**
1. `POST /api/payment/stripe` → crée PaymentIntent
2. Frontend utilise Stripe Elements
3. Client entre CB → `stripe.confirmPayment()`
4. Stripe envoie webhook → `POST /api/payment/webhook/stripe`

**Variables d'environnement :**
```env
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

### 6.4 Wave Business (Facturation Entreprise)

**Fonctionnalités :**
- Facturation mensuelle/trimestrielle
- Paiements récurrents
- Reporting et exports

**Flow entreprise :**
1. Admin crée compte entreprise avec Wave Business ID
2. Courses facturées sur compte entreprise
3. Fin de période → génération facture
4. Paiement via Wave Business ou virement

**Variables d'environnement :**
```env
WAVE_BUSINESS_API_KEY=xxx
WAVE_BUSINESS_MERCHANT_ID=xxx
```

### 6.5 Twilio (SMS)

**Usages :**
- OTP authentification
- Confirmation réservation
- Notification chauffeur assigné
- Rappel course (J-1, H-1)
- Notification arrivée chauffeur

**Templates SMS :**
```
OTP: "Votre code SCOD VTC : {code}. Valable 5 min."
CONFIRMATION: "SCOD VTC: Résa #{ref} confirmée pour le {date} à {heure}. {vehicule}. Chauffeur: {driver}."
DRIVER_ASSIGNED: "Votre chauffeur {name} arrive dans {eta} min. {vehicule} {plaque}."
REMINDER: "Rappel SCOD VTC: Course demain {date} à {heure}. Départ: {pickup}."
```

**Variables d'environnement :**
```env
TWILIO_ACCOUNT_SID=xxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+221xxxxxxxx
```

### 6.6 Resend (Emails)

**Templates emails :**
- Confirmation de réservation (avec QR code)
- Reçu de paiement
- Facture entreprise
- Chauffeur assigné
- Rappel course
- Demande d'avis post-course
- Confirmation candidature chauffeur

**Variables d'environnement :**
```env
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL=noreply@scod-vtc.sn
RESEND_REPLY_TO=support@scod-vtc.sn
```

### 6.7 Supabase Realtime

**Canaux :**
- `booking:{bookingId}` → Statut course, position chauffeur
- `driver:{driverId}` → Nouvelles courses assignées
- `admin:bookings` → Nouvelles réservations (dashboard admin)

**Payload position chauffeur :**
```typescript
{
  driver_id: string;
  latitude: number;
  longitude: number;
  heading: number; // Direction en degrés
  speed: number; // km/h
  eta_minutes: number;
  timestamp: string;
}
```

---

## 7. API ROUTES

### 7.1 Booking

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/booking/create` | Créer une réservation | User |
| POST | `/api/booking/cancel` | Annuler une réservation | User |
| GET | `/api/booking/[id]` | Détails réservation | User/Driver/Admin |
| PUT | `/api/booking/[id]` | Modifier réservation | User (si pending) |
| GET | `/api/booking/estimate` | Estimation prix | Public |

**POST /api/booking/create**
```typescript
// Request
{
  booking_type: 'immediate' | 'scheduled' | 'airport_transfer';
  pickup: {
    address: string;
    latitude: number;
    longitude: number;
    instructions?: string;
  };
  dropoff: {
    address: string;
    latitude: number;
    longitude: number;
    instructions?: string;
  };
  stops?: Array<{ address: string; latitude: number; longitude: number }>;
  scheduled_at: string; // ISO 8601
  vehicle_id: string;
  passenger_count: number;
  luggage_count?: number;
  passenger_name?: string;
  passenger_phone?: string;
  flight_number?: string;
  options?: {
    child_seat?: boolean;
    water?: boolean;
  };
  notes?: string;
  payment_method: PaymentMethod;
  discount_code?: string;
}

// Response
{
  booking: Booking;
  payment_url?: string; // Si PayTech
  client_secret?: string; // Si Stripe
}
```

**GET /api/booking/estimate**
```typescript
// Request (query params)
{
  pickup_lat: number;
  pickup_lng: number;
  dropoff_lat: number;
  dropoff_lng: number;
  vehicle_category?: VehicleCategory;
  passenger_count?: number;
}

// Response
{
  estimates: Array<{
    vehicle_category: VehicleCategory;
    vehicle_name: string;
    distance_km: number;
    duration_min: number;
    base_price: number;
    total_price: number;
    currency: 'XOF';
  }>;
}
```

### 7.2 Payment

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/payment/paytech` | Initier paiement PayTech | User |
| POST | `/api/payment/stripe` | Créer PaymentIntent Stripe | User |
| POST | `/api/payment/wave-business` | Facturation Wave Business | Admin |
| POST | `/api/payment/webhook/paytech` | Webhook PayTech | Public (signature) |
| POST | `/api/payment/webhook/stripe` | Webhook Stripe | Public (signature) |

**POST /api/payment/paytech**
```typescript
// Request
{
  booking_id: string;
  method: 'orange_money' | 'wave' | 'free_money';
  phone_number: string;
}

// Response
{
  payment_id: string;
  payment_url: string; // URL PayTech
  status: 'pending';
}
```

**POST /api/payment/stripe**
```typescript
// Request
{
  booking_id: string;
  method: 'visa' | 'mastercard' | 'amex' | 'apple_pay' | 'google_pay';
}

// Response
{
  payment_id: string;
  client_secret: string; // Pour Stripe.js
  status: 'pending';
}
```

### 7.3 Auth

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/auth/otp/send` | Envoyer OTP SMS | Public |
| POST | `/api/auth/otp/verify` | Vérifier OTP | Public |

**POST /api/auth/otp/send**
```typescript
// Request
{
  phone: string; // Format international +221xxxxxxxxx
}

// Response
{
  success: boolean;
  message: string;
  expires_at: string; // ISO 8601
}
```

### 7.4 Fleet

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/api/fleet` | Liste véhicules disponibles | Public |
| GET | `/api/fleet/[id]` | Détails véhicule | Public |

**GET /api/fleet**
```typescript
// Request (query params)
{
  category?: VehicleCategory;
  min_passengers?: number;
  min_luggage?: number;
}

// Response
{
  vehicles: Array<{
    id: string;
    brand: string;
    model: string;
    category: VehicleCategory;
    passenger_capacity: number;
    luggage_capacity: number;
    image_url: string;
    base_price_per_km: number;
    features: string[];
  }>;
}
```

### 7.5 Tracking

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/api/tracking/[bookingId]` | Position chauffeur temps réel | User |

**GET /api/tracking/[bookingId]**
```typescript
// Response
{
  booking_status: BookingStatus;
  driver: {
    id: string;
    name: string;
    photo_url: string;
    phone: string;
    rating: number;
    vehicle: {
      brand: string;
      model: string;
      color: string;
      license_plate: string;
    };
  };
  position: {
    latitude: number;
    longitude: number;
    heading: number;
    updated_at: string;
  };
  eta_minutes: number;
  route_polyline: string; // Encoded polyline
}
```

### 7.6 User

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/api/user/bookings` | Historique réservations | User |
| PUT | `/api/user/profile` | Mise à jour profil | User |
| GET | `/api/user/payments` | Historique paiements | User |

### 7.7 Driver

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/driver/apply` | Candidature chauffeur | Public |

### 7.8 Contact

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/contact` | Formulaire contact | Public |

---

## 8. VARIABLES D'ENVIRONNEMENT

```env
# App
NEXT_PUBLIC_APP_URL=https://scod-vtc.sn
NEXT_PUBLIC_APP_NAME=SCOD VTC

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=xxx
GOOGLE_MAPS_SERVER_API_KEY=xxx

# PayTech
PAYTECH_API_KEY=xxx
PAYTECH_SECRET_KEY=xxx
PAYTECH_ENV=production
PAYTECH_WEBHOOK_SECRET=xxx

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Wave Business
WAVE_BUSINESS_API_KEY=xxx
WAVE_BUSINESS_MERCHANT_ID=xxx

# Twilio
TWILIO_ACCOUNT_SID=xxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+221xxxxxxxx

# Resend
RESEND_API_KEY=re_xxx

# Feature flags
NEXT_PUBLIC_ENABLE_CASH_PAYMENT=true
NEXT_PUBLIC_ENABLE_APPLE_PAY=true
NEXT_PUBLIC_ENABLE_GOOGLE_PAY=true
```

---

## 9. DÉCISIONS TECHNIQUES ASSUMÉES

### 9.1 State Management
**Décision : Zustand + React Query**
- Zustand pour l'état UI (modales, stepper, panier)
- React Query (TanStack Query) pour le server state (bookings, fleet)
- Pas de Redux : trop verbose pour ce projet

### 9.2 Forms
**Décision : React Hook Form + Zod**
- Validation côté client avec Zod
- Réutilisation des schémas côté serveur (API validation)
- Composants inputs contrôlés via Controller

### 9.3 Animations
**Décision : Framer Motion uniquement**
- Pas de CSS animations complexes
- Variants Framer Motion pour cohérence
- AnimatePresence pour les transitions de pages

### 9.4 Auth
**Décision : Supabase Auth + OTP SMS custom**
- Supabase Auth pour la gestion des sessions
- OTP SMS via Twilio (plus fiable que Supabase Phone Auth)
- Magic link email en fallback

### 9.5 Paiements
**Décision : PayTech prioritaire, Stripe secondaire**
- 80% des paiements seront Mobile Money (Orange Money, Wave)
- PayTech = provider principal (local, FCFA natif)
- Stripe = CB internationales (touristes, diaspora)
- Cash = toujours supporté (réalité du marché sénégalais)

### 9.6 Images
**Décision : Supabase Storage + next/image**
- Photos véhicules optimisées en .webp
- Lazy loading natif
- Pas de CDN externe (Supabase suffit)

### 9.7 Emails
**Décision : Resend + React Email**
- Templates en React (react.email)
- Preview dans Storybook
- Pas de MJML (trop complexe)

### 9.8 Temps réel
**Décision : Supabase Realtime**
- Suffisant pour le suivi de position
- Pas besoin de WebSockets custom
- Fallback polling toutes les 10s si connexion instable

### 9.9 SEO
**Décision : Metadata API Next.js 15**
- generateMetadata pour pages dynamiques
- Sitemap généré automatiquement
- robots.txt statique

### 9.10 Internationalisation
**Décision : Français uniquement (v1)**
- Pas de next-intl
- Textes hardcodés en français
- i18n prévu pour v2 (anglais, wolof)

---

## 10. PRIORITÉS D'IMPLÉMENTATION

### Phase 1 : MVP (4 semaines)
1. Setup projet (Next.js, Tailwind, shadcn/ui, Supabase)
2. Design system (tokens, composants de base)
3. Homepage
4. Flow de réservation complet
5. Paiement PayTech (Orange Money, Wave)
6. Confirmation et suivi basique

### Phase 2 : Core Features (3 semaines)
1. Authentification OTP
2. Dashboard client
3. Suivi temps réel (carte)
4. Paiement Stripe
5. Notifications SMS

### Phase 3 : Business (3 semaines)
1. Dashboard admin
2. Gestion chauffeurs
3. Comptes entreprises
4. Wave Business facturation
5. Reporting

### Phase 4 : Polish (2 semaines)
1. Animations Framer Motion
2. PWA (manifest, service worker)
3. Performance (Core Web Vitals)
4. Tests E2E
5. Documentation

---

*Document généré le 21 février 2026*
*Version 1.0 — Architecture initiale*
