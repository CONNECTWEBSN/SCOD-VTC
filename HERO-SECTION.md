# SCOD VTC - Section Hero

Documentation complète de la section Hero premium.

## 🎯 Vue d'Ensemble

Section Hero full viewport avec formulaire de réservation intégré, animations Framer Motion et design premium inspiré d'Uber, Linear et Vercel.

---

## 📐 Layout

### Structure
- **Height:** Full viewport (`min-h-screen`)
- **Padding-top:** 68px (hauteur navbar)
- **Z-index layers:**
  - Z-0: Background image
  - Z-10: Grain texture overlay
  - Z-20: Content

### Background
- **Image:** `/images/hero/hero-bg.svg` (placeholder)
- **next/image:** `fill`, `priority`, `object-cover`
- **Overlay gradient:** Linear gradient gauche → droite
  - 0%: `rgba(10,9,32,0.92)` - Opaque gauche
  - 35%: `rgba(10,9,32,0.82)`
  - 60%: `rgba(10,9,32,0.45)`
  - 100%: `rgba(10,9,32,0.15)` - Transparent droite

### Grain Texture
- **Type:** fractalNoise SVG
- **Opacity:** 0.025
- **Position:** Absolute overlay
- **Pointer-events:** none

### Content Container
- **Max-width:** 620px
- **Padding:**
  - Desktop (lg): 72px horizontal, 80px vertical
  - Tablet (sm): 36px horizontal, 60px vertical
  - Mobile: 20px horizontal, 48px vertical
- **Position:** Gauche du viewport

---

## 📝 Contenu

### 1. Headline
```
"Réservez votre VTC partout au Sénégal"
```

**Styles:**
- **Font:** Barlow Condensed 900
- **Size:** `clamp(42px, 4.8vw, 66px)`
- **Color:** 
  - "Réservez votre VTC" → `white`
  - "partout au Sénégal" → `#FFC300` (accent)
- **Line-height:** 1.0
- **Letter-spacing:** -0.01em
- **Animation:** fadeUp, delay 0.1s, duration 0.7s

### 2. Sous-headline
```
"Aéroport AIBD, déplacements pro, événements familiaux — 
tarif fixe en FCFA, chauffeur confirmé dès la réservation."
```

**Styles:**
- **Font:** Barlow 400
- **Size:** 15px
- **Color:** `white` avec 72% opacité
- **Max-width:** 440px
- **Line-height:** relaxed
- **Animation:** fadeUp, delay 0.2s

### 3. Formulaire de Réservation

#### Input Départ
- **Placeholder:** "Adresse de départ"
- **Icône:** MapPin (Lucide), accent color
- **Position icône:** Gauche (left-4)

#### Input Arrivée
- **Placeholder:** "Adresse d'arrivée"
- **Icône:** Circle (Lucide), white/60
- **Position icône:** Gauche (left-4)

#### Date & Heure (3 colonnes)
- **Select Date:** Options: Aujourd'hui, Demain, Choisir...
- **Select Heure:** 00h-23h (24 options)
- **Select Minutes:** 00, 15, 30, 45

**Grid responsive:**
- Desktop: 3 colonnes (sm:grid-cols-3)
- Mobile: 2 colonnes (grid-cols-2)
- Minutes: col-span-2 sur mobile, col-span-1 desktop

#### Styles Inputs/Selects
- **Height:** 54px
- **Background:** `rgba(255,255,255,0.08)`
- **Border:** `rgba(255,255,255,0.14)`
- **Backdrop-blur:** sm
- **Font:** Barlow 400, 15px
- **Text:** white
- **Placeholder:** white/50
- **Padding:** pl-12 (avec icône), pr-4
- **Border-radius:** input (10px)

**États:**
- **Default:** border white/14, bg white/08
- **Focus:**
  - Border: accent
  - Background: white/12
  - Ring: 4px accent/15 (glow effect)
  - Outline: none
  - Transition: 200ms

#### Bouton CTA
```
"Consulter les prix" + ArrowRight icon
```

**Styles:**
- **Height:** 58px
- **Width:** 100%
- **Background:** accent (#FFC300)
- **Color:** brand (#110E40)
- **Font:** Barlow 700, 15.5px
- **Shadow:** lg accent/20
- **Border-radius:** btn (8px)

**États:**
- **Hover:**
  - Background: accent-light
  - Transform: translateY(-0.5px)
  - Shadow: xl accent/30
  - Icône: translateX(0.5px)
- **Focus-visible:**
  - Outline: none
  - Ring: 2px accent
  - Ring-offset: 2px brand-dark

**Animation:** fadeUp, delay 0.3s

### 4. Badges de Réassurance (6 items)

```
⭐ Chauffeur confirmé dès la réservation
✓ Tarif fixe FCFA garanti
📅 Réservation jusqu'à 1 an à l'avance
📊 Adaptation retard vol AIBD
🔒 Paiement 100% sécurisé
📍 Partout au Sénégal
```

**Grid:**
- Desktop: 2 colonnes (sm:grid-cols-2)
- Mobile: 1 colonne
- Gap: 3 (12px), lg:gap-x-4 lg:gap-y-3.5

**Style item:**
- **Background:** white/06 + backdrop-blur-sm
- **Padding:** px-3.5 py-2.5
- **Border-radius:** lg (12px)
- **Flex:** items-center gap-2.5

**Icône:**
- **Size:** 14x14px
- **Color:** accent
- **Icons:** Star, Check, Calendar, TrendingUp, Lock, MapPinned (Lucide)

**Texte:**
- **Font:** Barlow 400, 12.5px
- **Color:** white/72
- **Line-height:** snug

**Animation:** fadeUp, delay 0.45s

---

## 🎬 Animations (Framer Motion)

### fadeUpVariants
```typescript
{
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1] as const, // Spring easing
    },
  }),
}
```

### Séquence d'Entrée
1. **Headline** → delay 0.1s
2. **Sous-headline** → delay 0.2s
3. **Formulaire** → delay 0.3s
4. **Badges** → delay 0.45s

### Transitions Inputs
- **Duration:** 200ms (duration-normal)
- **Properties:** border-color, background-color
- **Focus:** Glow effect avec ring accent/15

### Transitions Bouton
- **Hover:** 200ms spring
- **Transform:** translateY(-0.5px)
- **Icon:** translateX(0.5px) group-hover

---

## 📱 Responsive

### Desktop (>= 1024px)
- Padding: 72px horizontal, 80px vertical
- Max-width: 620px
- Content aligné à gauche
- Date/Heure: 3 colonnes
- Badges: 2 colonnes

### Tablet (>= 640px && < 1024px)
- Padding: 36px horizontal, 60px vertical
- Max-width: 100%
- Date/Heure: 3 colonnes
- Badges: 2 colonnes

### Mobile (< 640px)
- Padding: 20px horizontal, 48px vertical
- Headline: min 42px
- Date/Heure: 2 colonnes (Minutes sur 2 colonnes)
- Badges: 1 colonne

---

## 🎨 Design Tokens Utilisés

### Couleurs
- `brand` (#110E40) - Texte bouton
- `brand-dark` (#0A0920) - Overlay gauche
- `accent` (#FFC300) - CTA, icônes, headline accent
- `accent-light` (#FFD440) - Hover bouton
- `white` - Texte, inputs
- `white/08` - Background inputs
- `white/14` - Border inputs
- `white/50` - Placeholder
- `white/72` - Texte secondaire

### Fonts
- `font-display` (Barlow Condensed) - Headline 900
- `font-body` (Barlow) - Tout le reste 400-700

### Spacing
- Padding container: 20px → 72px
- Gap badges: 12px
- Input height: 54px
- Button height: 58px

### Border Radius
- `rounded-input` (10px) - Inputs, selects
- `rounded-btn` (8px) - Bouton
- `rounded-lg` (12px) - Badges

### Shadows
- `shadow-lg` - Bouton default
- `shadow-xl` - Bouton hover
- `shadow-accent/20` - Bouton default tint
- `shadow-accent/30` - Bouton hover tint

---

## 🔧 Props Interface

```typescript
interface HeroProps {
  className?: string;
}
```

**Usage:**
```tsx
import { Hero } from "@/components/sections/hero";

<Hero />
```

---

## 📦 Dépendances

- `next/image` - Image optimization
- `framer-motion` - Animations
- `lucide-react` - Icons
- `@/components/ui/Button` - Composant Button (non utilisé mais importé)
- `@/lib/cn` - Class merge utility

---

## ✅ Features Implémentées

- ✅ Full viewport hero avec background image
- ✅ Overlay gradient sophistiqué
- ✅ Grain texture overlay
- ✅ Headline clamp responsive
- ✅ Formulaire de réservation 5 champs
- ✅ 6 badges de réassurance
- ✅ Animations Framer Motion séquencées
- ✅ Focus states avec glow effect
- ✅ Hover states avec micro-animations
- ✅ 100% responsive mobile/tablet/desktop
- ✅ TypeScript strict (0 erreurs)
- ✅ Accessibility (labels, focus-visible)

---

## 🚀 Performance

- **Image:** Priority loading (LCP)
- **SVG inline:** Grain texture (pas de requête HTTP)
- **Motion:** GPU-accelerated transforms
- **CSS:** Tailwind utilities (no runtime CSS)

---

## 🎯 Prochaines Améliorations

1. **Remplacer hero-bg.svg** par une vraie photo de véhicule premium
2. **Intégrer Google Maps Autocomplete** pour les inputs adresse
3. **Ajouter DatePicker UI** pour sélection date complète
4. **Connecter au backend** (estimation prix, validation)
5. **Ajouter analytics** (tracking form interactions)
6. **A/B testing** variants CTA button text

---

## 📸 Screenshots

Page accessible sur `http://localhost:3000`

---

**Section Hero premium créée avec succès ! 🎉**

Date : 21 février 2026
TypeScript : ✅ 0 erreurs
Animations : ✅ Framer Motion
Responsive : ✅ Mobile-first
Performance : ✅ Optimisée
