# SCOD VTC - Section Services

Documentation complète de la section ServicesSection avec toggle Particulier/Entreprise.

## 🎯 Vue d'Ensemble

Section d'affichage des services avec switch Radix Tabs entre offres Particuliers et Entreprises, cartes détaillées et animations sophistiquées.

---

## 🎨 Design

### Fond & Padding
- **Background:** `#FAFBFC` (gris très clair)
- **Padding:** 120px vertical

### Header
- **Tag:** "NOS SERVICES"
  - Dots décoratifs: 6px cercle accent de chaque côté
  - Font: Barlow 700, 12px uppercase
  - Color: accent
  - Tracking: widest

- **Titre:** "Solutions adaptées à tous vos besoins"
  - Font: Barlow Condensed 900
  - Size: clamp(32px, 5vw, 52px)
  - Color: grey-900
  - "besoins": gradient accent → accent-hover
  - Tracking: tight

- **Sous-titre:**
  - Size: 17px
  - Color: grey-600
  - Max-width: 560px
  - Leading: relaxed

---

## 🔄 Toggle Tabs (Radix)

### Structure
- **Container:** inline-flex
- **Background:** grey-200 (#E5E7EB)
- **Padding:** 6px (p-1.5)
- **Border-radius:** xl (12px)
- **Gap:** 4px

### Pills Styles

**Inactif:**
- Background: transparent
- Color: grey-600
- Hover: grey-900
- Font: Barlow 500, 14px

**Actif:**
- Background: white
- Color: grey-900
- Font-weight: 600 (semibold)
- Shadow: md
- Transition: 300ms

### Tabs Values
```typescript
"particular" | "business"
```

---

## 🗂️ Grille Services

### Layout
- **Desktop (lg):** 3 colonnes
- **Tablet (sm):** 2 colonnes
- **Mobile:** 1 colonne
- **Gap:** 28px (gap-7)

### Animation Container
- **AnimatePresence:** mode="wait"
- **Key:** activeTab (remount on change)
- **Initial:** opacity 0, y 20
- **Animate:** opacity 1, y 0
- **Exit:** opacity 0, y -20
- **Duration:** 400ms

---

## 🃏 Carte Service

### Structure
- **Link:** Next.js Link vers page dédiée
- **Background:** white
- **Border:** 2px
  - Normal: grey-100
  - Popular: accent + shadow-accent/10
- **Border-radius:** 2xl (24px)
- **Overflow:** hidden

### Image Zone (aspect-ratio 4/3)
- **Background:** Gradient grey-50 → grey-100
- **Content:** Placeholder SVG centered
- **Badge "Populaire":** Position absolute top-4 right-4

**Hover Image:**
- Transform: scale(1.06)
- Transition: 500ms
- On group hover

### Content (padding 24px)

**Titre:**
- Font: Barlow Condensed 800
- Size: 22px
- Color: grey-900

**Description:**
- Size: 13.5px
- Color: grey-600
- Leading: relaxed
- Margin-bottom: 16px

**Tag Durée (si présent):**
- Icon: Clock (Lucide)
- Size: 12.5px
- Color: grey-500
- Format: "45-60 min"

**Features (4 items):**
- Icon: Check accent
- Text: 13px grey-700
- Space-y: 10px (2.5)
- List style: flex items-start gap-2

**Footer:**
- Border-top: grey-100
- Padding-top: 20px
- Flex: justify-between items-center

**Prix:**
- Label: "À partir de" 11px uppercase grey-400
- Montant: Barlow Condensed 800, 20px (xl), accent
- Format: 
  - Prix fixe: "45 000 FCFA"
  - Horaire: "25 000 FCFA/heure"
  - Devis: "Sur devis"

**Bouton Flèche:**
- Size: 40px cercle (h-10 w-10)
- Background: accent/10
- Icon: ArrowRight accent
- Hover: bg accent + text brand
- Transition: 300ms

### Animations Carte

**Hover:**
- Transform: translateY(-8px)
- Shadow: 2xl
- Border: accent (si pas déjà)
- Transition: 500ms

**Scroll Reveal:**
- Initial: opacity 0, y 30
- Animate: opacity 1, y 0
- Duration: 500ms
- Delay: index * 0.1s (stagger)

---

## 📋 Services Particuliers (6)

### 1. Transfert Aéroport
- **Badge:** Populaire
- **Prix:** 45 000 FCFA
- **Durée:** 45-60 min
- **Features:**
  - Tarif fixe garanti
  - Suivi de vol automatique
  - 15 min d'attente incluses
  - Pancarte nominative
- **Link:** `/services/transfert-aeroport`

### 2. Trajets Quotidiens
- **Prix:** 25 000 FCFA/heure
- **Features:**
  - Réservation immédiate
  - Chauffeur confirmé
  - Paiement flexible
  - Annulation gratuite 2h
- **Link:** `/commander`

### 3. Sorties en Famille
- **Prix:** 35 000 FCFA/heure
- **Features:**
  - Sièges enfants disponibles
  - Flexibilité horaires
  - Véhicules spacieux
  - Trajet sécurisé
- **Link:** `/reservation`

### 4. Occasions Spéciales
- **Prix:** 45 000 FCFA/jour
- **Features:**
  - Décoration personnalisée
  - Champagne offert
  - Flexibilité totale
  - Photos souvenirs
- **Link:** `/services/evenements`

### 5. Navette Inter-régions
- **Prix:** 40 000 FCFA
- **Features:**
  - Destinations multiples
  - Pause confort incluse
  - Eau et snacks offerts
  - Tarif dégressif groupe
- **Link:** `/reservation`

### 6. Mise à Disposition
- **Prix:** 120 000 FCFA/jour
- **Features:**
  - Chauffeur dédié 8h
  - Kilométrage illimité Dakar
  - Modifications en temps réel
  - Véhicule premium
- **Link:** `/entreprises/chauffeur-disposition`

---

## 🏢 Services Entreprise (3)

### 1. Trajets Collaborateurs
- **Badge:** Populaire
- **Prix:** Sur devis
- **Features:**
  - Facturation mensuelle
  - Reporting détaillé
  - Gestion multi-utilisateurs
  - Support prioritaire
- **Link:** `/entreprises/trajets-pro`

### 2. Accueil Clients & Partenaires
- **Prix:** Sur devis
- **Features:**
  - Véhicules premium
  - Chauffeurs multilingues
  - Accueil personnalisé
  - Discrétion garantie
- **Link:** `/entreprises/trajets-pro`

### 3. Événements Corporate
- **Prix:** Sur devis
- **Features:**
  - Flotte dédiée
  - Coordinateur événement
  - Planning sur-mesure
  - Tarifs négociés
- **Link:** `/services/evenements`

---

## 🎬 Animations

### Scroll Reveal (Framer Motion whileInView)

**Header:**
- Initial: opacity 0, y 20
- Animate: opacity 1, y 0
- Duration: 600ms
- Viewport: once

**Toggle:**
- Delay: 100ms

**Grid Container:**
- AnimatePresence mode="wait"
- Key change triggers full remount

**Cartes:**
- Stagger: 100ms per card (index * 0.1s)
- Initial: opacity 0, y 30
- Duration: 500ms

### Toggle Transition
- Pill actif/inactif: 300ms smooth
- Grid exit/enter: 400ms fade + slide vertical

### Hover Effects
- Image zoom: 500ms scale(1.06)
- Card lift: 500ms translateY(-8px)
- Arrow button: 300ms bg + color
- Border accent: smooth transition

---

## 📱 Responsive

### Desktop (>= 1024px)
- Grid: 3 colonnes
- Card content optimal
- Full features visible

### Tablet (>= 640px && < 1024px)
- Grid: 2 colonnes
- Adjust spacing

### Mobile (< 640px)
- Grid: 1 colonne
- Full width cards
- Maintain all features

---

## 🔧 Props Interface

```typescript
interface ServicesSectionProps {
  className?: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  duration?: string;
  price: string;
  priceNote?: string; // "/heure", "/jour"
  features: string[]; // 4 features
  image: string;
  popular?: boolean;
  link: string;
}
```

**Usage:**
```tsx
import { ServicesSection } from "@/components/sections/services-section";

<ServicesSection />
```

---

## 📦 Dépendances

- `framer-motion` - Animations + AnimatePresence
- `@radix-ui/react-tabs` - Toggle Particulier/Entreprise
- `next/link` - Navigation vers pages services
- `lucide-react` - Icons (Clock, Check, ArrowRight)
- `@/components/ui/Badge` - Badge "Populaire"
- `@/lib/cn` - Class merge
- `@/lib/format` - formatPrice()

---

## ✅ Features Implémentées

- ✅ Header avec tag dots + titre gradient
- ✅ Toggle Radix Tabs Particulier/Entreprise
- ✅ 6 services Particuliers avec données complètes
- ✅ 3 services Entreprise avec données complètes
- ✅ Grille responsive 3/2/1 colonnes
- ✅ Cartes avec image aspect-ratio 4/3
- ✅ Tag durée avec horloge (si présent)
- ✅ 4 features avec check accent par carte
- ✅ Prix formatés (fixe/horaire/devis)
- ✅ Badge "Populaire" sur services phares
- ✅ Bouton arrow avec hover fill
- ✅ Hover card: lift + shadow + border accent
- ✅ AnimatePresence pour transition smooth
- ✅ Scroll reveal staggered
- ✅ TypeScript strict (0 erreurs)
- ✅ Links vers pages dédiées
- ✅ 100% responsive

---

## 🚀 Prochaines Améliorations

1. **Remplacer placeholders SVG** par vraies photos services
2. **Ajouter CTAs secondaires** (ex: "En savoir plus")
3. **Testimonials** par service
4. **Calculateur de prix** interactif
5. **Filtres avancés** (prix, durée, type)
6. **Comparateur** services Particulier vs Entreprise
7. **FAQ par service** (accordion)
8. **Booking direct** depuis la carte

---

## 🎯 Design Inspirations

- **Uber for Business** - Services grid
- **Notion Features** - Clean cards layout
- **Linear Pricing** - Toggle elegant

---

**Section Services premium créée avec succès ! 🎉**

Date : 21 février 2026
TypeScript : ✅ 0 erreurs
Toggle : ✅ Radix Tabs
Animations : ✅ Framer Motion AnimatePresence
Services : ✅ 6 Particuliers + 3 Entreprise
Responsive : ✅ Mobile-first
