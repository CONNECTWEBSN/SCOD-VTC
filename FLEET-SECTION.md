# SCOD VTC - Section Flotte

Documentation complète de la section FleetSection avec modal détaillé.

## 🎯 Vue d'Ensemble

Section d'affichage de la flotte avec filtres par catégorie, cartes véhicules premium et modal détaillé avec informations complètes.

---

## 🎨 Design

### Fond
- **Background:** `#070B14` (dark navy)
- **Padding:** py-20 (desktop), py-24 (large)

### Header
- **Tag:** "NOTRE FLOTTE"
  - Font: Barlow 700, 12px uppercase
  - Color: accent
  - Tracking: widest
  - Lignes décoratives: gradient accent de chaque côté

- **Titre:** "Découvrez nos véhicules"
  - Font: Barlow Condensed 900
  - Size: clamp(38px, 5vw, 60px)
  - Color: white
  - Tracking: tight

- **Sous-titre:**
  - Size: 17px
  - Color: white/70
  - Max-width: 560px
  - Leading: relaxed

---

## 🔍 Filtres

### Pills horizontaux
- **Layout:** Flex wrap, centrés
- **Gap:** 12px

### Pill Styles

**Actif:**
- Background: accent (#FFC300)
- Color: brand (#110E40)
- Font-weight: 700 (bold)
- Shadow: shadow-glow-accent
- Padding: px-6 py-2.5
- Border-radius: pill (9999px)

**Inactif:**
- Background: transparent
- Border: 1px white/20
- Color: white/80
- Hover: bg white/5
- Transition: 300ms

### Catégories
```typescript
[
  { id: "all", label: "Tous" },
  { id: "berline", label: "Berline" },
  { id: "suv", label: "SUV" },
  { id: "luxe", label: "VIP" },
  { id: "pmr", label: "PMR" },
]
```

---

## 🚗 Grille Véhicules

### Layout
- **Desktop (lg):** 3 colonnes
- **Tablet (sm):** 2 colonnes
- **Mobile:** 1 colonne
- **Gap:** 24px

---

## 🃏 Carte Véhicule

### Structure
- **Background:** `#0D1322`
- **Border:** `#1A2235`, 1px
- **Border-radius:** 16px (card)
- **Overflow:** hidden

### Zone Image (200px height)
- **Background:** Gradient radial `from-accent/5 to-transparent`
- **Content:** Placeholder SVG car centered
- **Badge:** Position absolute top-4 right-4
  - Variants: electric (vert), luxe (or), premium (violet), accessible (bleu)

**Animations Image:**
- Default: centered
- Hover: translateY(-8px) scale(1.04)
- Transition: 500ms

### Contenu (padding 24px)

**Titre:**
- Font: Barlow Condensed 800
- Size: 22px
- Color: white

**Description:**
- Size: 13px
- Color: white/60
- Margin-bottom: 16px

**Meta (passagers + bagages):**
- Font: 12.5px
- Color: white/50
- Icons: Users, Briefcase (Lucide)
- Gap: 16px

**Prix:**
- Label "À partir de": 11px uppercase, white/40, tracking-wide
- Montant: Barlow Condensed 800, 26px, accent
- Format: formatPrice() (ex: "55 000 FCFA")

**Bouton CTA:**
- Height: 48px
- Width: 100%
- Border: 2px accent
- Background: transparent
- Color: accent
- Font: Barlow 700, 14px
- Border-radius: btn (8px)
- **Hover:**
  - Background: accent (slide-fill from left)
  - Color: brand
  - Transition: 300ms

### Animations Carte

**Hover:**
- Transform: translateY(-6px) scale(1.01)
- Border: accent
- Shadow: 2xl
- Transition: 450ms ease

**Scroll Reveal:**
- Initial: opacity 0, y 30
- WhileInView: opacity 1, y 0
- Duration: 500ms
- Delay: index * 0.1s (stagger)

---

## 🚗 Données Véhicules

### Structure Type
```typescript
interface Vehicle {
  id: string;
  name: string;
  type: string;
  category: "berline" | "suv" | "luxe" | "pmr";
  badge: "electric" | "luxe" | "premium" | "accessible";
  passengers: number;
  luggage: number;
  fuel: string;
  basePrice: number;
  image: string;
  description: string;
  driver: {
    name: string;
    rating: number;
    trips: number;
    available: boolean;
  };
  features: string[];
}
```

### 6 Véhicules MVP

1. **BMW Série 5**
   - Berline, 4 pax, 3 bag, Essence
   - 55 000 FCFA
   - Badge: luxe

2. **Tesla Model S**
   - Berline, 4 pax, 2 bag, Électrique
   - 54 000 FCFA
   - Badge: electric

3. **Tesla Model X**
   - SUV, 6 pax, 4 bag, Électrique
   - 53 000 FCFA
   - Badge: electric

4. **Peugeot 3008**
   - SUV, 4 pax, 4 bag, Diesel
   - 55 000 FCFA
   - Badge: premium

5. **Mercedes Classe S**
   - Berline Luxe, 4 pax, 3 bag, Hybride
   - 60 000 FCFA
   - Badge: luxe

6. **Van Access**
   - PMR, 4 pax, 4 bag, Diesel
   - 60 000 FCFA
   - Badge: accessible

---

## 📱 Modal Véhicule (Radix Dialog)

### Structure
- **Max-width:** 2xl (672px)
- **Max-height:** 90vh
- **Overflow:** scroll
- **Background:** `#0D1322`
- **Border:** `#1A2235`
- **Border-radius:** 2xl (24px)
- **Shadow:** 2xl

### Header (sticky top)
- **Background:** `#0D1322/95` + backdrop-blur
- **Border-bottom:** `#1A2235`
- **Padding:** 24px

**Titre:**
- Font: Barlow Condensed 800
- Size: 30px (3xl)
- Color: white

**Description:**
- Size: 14px
- Color: white/60

**Close Button:**
- Position: top-right
- Icon: X (Lucide)
- Hover: bg white/5

### Stats Grid (5 colonnes, 2 mobile)
- **Background:** `#070B14`
- **Border:** `#1A2235`
- **Padding:** 12px
- **Border-radius:** lg

Items:
1. Passagers (Users icon)
2. Bagages (Briefcase icon)
3. Carburant (Fuel icon)
4. Prix min (accent)
5. Catégorie (Badge)

### Body (padding 24px)

#### Section Chauffeur
- **Background:** `#070B14`
- **Border:** `#1A2235`
- **Padding:** 20px
- **Border-radius:** xl

**Avatar:**
- Size: 56px (14)
- Background: accent
- Color: brand
- Font: Barlow Condensed 900
- Content: Initiales (ex: "AD")

**Info:**
- Nom: font-semibold, white
- Rating: Star icon accent + nombre
- Trips: "X courses"
- Badge "Disponible": variant electric

#### Équipements
- **Grid:** 3 colonnes (2 mobile)
- **Gap:** 12px

**Item:**
- Background: `#070B14`
- Border: `#1A2235`
- Padding: 12px
- Border-radius: lg
- Icon: Check accent
- Text: 14px white/80

**Features inclus:** (6 par véhicule)
- Climatisation
- WiFi gratuit
- Chargeur USB/sans fil
- Eau minérale
- Confort (cuir, etc.)
- Technologie (GPS, etc.)

#### Règles (Accordion custom)
**3 sections:**

1. **Politique d'annulation**
   - Gratuite jusqu'à 2h avant
   - Remboursement 3-5 jours

2. **Acompte requis**
   - 30% à la réservation
   - Solde au chauffeur

3. **Suppléments**
   - AIBD: +2 000 FCFA
   - Nuit (22h-6h): +5 000 FCFA
   - Zone >50km: +10 000 FCFA
   - Attente: 15 min gratuites

**Style Accordion:**
- Background: `#070B14`
- Border: `#1A2235`
- Border-radius: lg
- Button: hover bg white/5
- Icon: ChevronDown (rotate 180° if open)

### Footer (sticky bottom)
- **Background:** `#0D1322/95` + backdrop-blur
- **Border-top:** `#1A2235`
- **Padding:** 24px

**Layout:**
- Flex responsive (column mobile, row desktop)
- Prix à gauche
- Bouton à droite

**Prix:**
- Label: 14px white/60
- Montant: Barlow Condensed 800, 30px, accent

**Bouton "Réserver maintenant":**
- Height: 56px
- Background: brand
- Color: white
- Font: Barlow 700, 16px
- Padding: 0 32px
- Border-radius: btn
- Hover: bg brand-hover + translateY(-0.5px) + shadow-xl
- Transition: 300ms

---

## 🎬 Animations

### Scroll Reveal (Framer Motion whileInView)

**Header:**
- Initial: opacity 0, y 20
- Animate: opacity 1, y 0
- Duration: 600ms
- Viewport: once

**Filtres:**
- Delay: 100ms

**Cartes:**
- Stagger: 100ms per card
- Initial: opacity 0, y 30
- Duration: 500ms

### Modal Animations (Radix)
- **Overlay:** fade-in/out
- **Content:** zoom-in 95% + slide-in from center
- **Duration:** Radix default (200ms)

---

## 📱 Responsive

### Desktop (>= 1024px)
- Grid: 3 colonnes
- Modal stats: 5 colonnes
- Modal équipements: 3 colonnes

### Tablet (>= 640px && < 1024px)
- Grid: 2 colonnes
- Modal stats: 5 colonnes
- Modal équipements: 3 colonnes

### Mobile (< 640px)
- Grid: 1 colonne
- Modal stats: 2 colonnes
- Modal équipements: 2 colonnes
- Modal footer: colonne (prix au-dessus, bouton en-dessous)

---

## 🔧 Props Interface

```typescript
interface FleetSectionProps {
  className?: string;
}
```

**Usage:**
```tsx
import { FleetSection } from "@/components/sections/fleet-section";

<FleetSection />
```

---

## 📦 Dépendances

- `framer-motion` - Animations scroll reveal
- `@radix-ui/react-dialog` - Modal
- `lucide-react` - Icons
- `@/components/ui/Badge` - Badges catégories
- `@/lib/cn` - Class merge
- `@/lib/format` - formatPrice()

---

## ✅ Features Implémentées

- ✅ Header avec tag décoratif
- ✅ 5 filtres pills avec état actif/inactif
- ✅ Grille responsive 3/2/1 colonnes
- ✅ 6 cartes véhicules avec données statiques
- ✅ Hover effects sophistiqués (translateY + scale + glow)
- ✅ Modal Radix Dialog full-featured
- ✅ Section chauffeur avec avatar + rating
- ✅ Grille équipements (6 items)
- ✅ Accordion règles (3 sections)
- ✅ Footer modal sticky avec prix + CTA
- ✅ Scroll reveal animations
- ✅ TypeScript strict (0 erreurs)
- ✅ 100% responsive

---

## 🚀 Prochaines Améliorations

1. **Remplacer placeholders SVG** par vraies photos véhicules
2. **Connecter à Supabase** (données dynamiques)
3. **Ajouter filtres avancés** (prix, passagers, électrique only)
4. **Intégrer calendrier** disponibilités chauffeurs
5. **Bouton "Réserver"** → redirect vers /reservation avec vehicleId
6. **Ajouter galerie photos** dans modal (carousel)
7. **Reviews chauffeur** dans modal

---

**Section Flotte premium créée avec succès ! 🎉**

Date : 21 février 2026
TypeScript : ✅ 0 erreurs
Modal : ✅ Radix Dialog
Animations : ✅ Framer Motion
Responsive : ✅ Mobile-first
