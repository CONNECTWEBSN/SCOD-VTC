# SCOD VTC - Composants UI

Documentation des composants UI du design system SCOD VTC.

## 📦 Composants Créés

### 1. Button

Bouton avec 4 variants et 3 tailles.

**Variants:**
- `primary` - Background accent (#FFC300), text brand
- `secondary` - Background brand (#110E40), text white
- `ghost` - Transparent, minimal
- `danger` - Background error, pour actions destructives

**Sizes:**
- `sm` - Height 9 (36px)
- `md` - Height 11 (44px)
- `lg` - Height 14 (56px)

**Props:**
```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  className?: string;
}
```

**Features:**
- ✅ Loading state avec spinner
- ✅ Support icônes Lucide (gauche ou droite)
- ✅ Hover: translateY(-1px) + ajustement couleur
- ✅ Focus-visible: outline accent
- ✅ Transition: 200ms cubic-bezier(0.22, 1, 0.36, 1)
- ✅ Active state: scale(0.98)
- ✅ Font: Barlow 600-700

**Usage:**
```tsx
import { Button } from "@/components/ui";
import { Car } from "lucide-react";

<Button variant="primary" size="md">
  Réserver
</Button>

<Button variant="secondary" icon={Car} loading>
  Chargement...
</Button>
```

---

### 2. Input

Champ de saisie avec 2 variants (light/dark).

**Variants:**
- `light` - Fond blanc, pour formulaires sur fond clair
- `dark` - Fond semi-transparent avec backdrop-blur, pour hero/sections sombres

**Props:**
```typescript
interface InputProps {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  variant?: "light" | "dark";
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}
```

**Features:**
- ✅ Label optionnel
- ✅ Icône à gauche (Lucide)
- ✅ Message d'erreur avec style error
- ✅ Focus: border accent + glow effect (ring)
- ✅ Variant dark avec glassmorphism
- ✅ Accessibility: aria-invalid, aria-describedby
- ✅ Height: 12 (48px)
- ✅ Font: Barlow 400

**Usage:**
```tsx
import { Input } from "@/components/ui";
import { MapPin, Phone } from "lucide-react";

<Input
  label="Adresse de départ"
  placeholder="Ex: Plateau, Dakar"
  icon={MapPin}
  variant="light"
/>

<Input
  label="Téléphone"
  placeholder="+221 XX XXX XX XX"
  icon={Phone}
  error="Numéro invalide"
  variant="light"
/>

{/* Sur fond sombre */}
<Input
  label="Email"
  placeholder="votre@email.com"
  variant="dark"
/>
```

---

### 3. Card

Card avec 4 variants et effets hover sophistiqués.

**Variants:**
- `vehicle` - Dégradé brand sombre, border white/10
- `service` - Fond blanc, shadow md, border grey
- `stat` - Dégradé accent, border accent
- `pricing` - Fond blanc, border-2 grey

**Props:**
```typescript
interface CardProps {
  variant?: "vehicle" | "service" | "stat" | "pricing";
  interactive?: boolean; // Ajoute cursor-pointer
  className?: string;
}
```

**Composants associés:**
- `CardHeader` - En-tête de la card
- `CardTitle` - Titre (font-display, 2xl, bold)
- `CardDescription` - Description (text-sm, grey-600)
- `CardContent` - Contenu principal
- `CardFooter` - Footer

**Features:**
- ✅ Hover: translateY(-6px) + shadow-xl + border accent
- ✅ Transition: 450ms ease-out
- ✅ Radius: 16px
- ✅ Interactive prop pour cursor-pointer

**Usage:**
```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui";

<Card variant="vehicle" interactive>
  <CardHeader>
    <CardTitle>BMW Série 5</CardTitle>
    <CardDescription>Berline premium</CardDescription>
  </CardHeader>
  <CardContent>
    <p>4 passagers · Climatisation · WiFi</p>
  </CardContent>
  <CardFooter>
    <Button>Réserver</Button>
  </CardFooter>
</Card>
```

---

### 4. Badge

Badge avec 6 variants pour tags.

**Variants:**
- `electric` - Vert (véhicules électriques)
- `luxe` - Or accent (gamme luxe)
- `premium` - Violet (#7C3AED)
- `accessible` - Bleu info (PMR)
- `popular` - Accent avec fond accent (populaire)
- `default` - Gris neutre

**Props:**
```typescript
interface BadgeProps {
  variant?: "electric" | "luxe" | "premium" | "accessible" | "popular" | "default";
  className?: string;
}
```

**Features:**
- ✅ Uppercase + tracking-wider
- ✅ Border teinté (30% opacity)
- ✅ Background soft (10% opacity)
- ✅ Rounded-pill (9999px)
- ✅ Text-xs, font-semibold
- ✅ Padding: px-3 py-1

**Usage:**
```tsx
import { Badge } from "@/components/ui";

<Badge variant="electric">Électrique</Badge>
<Badge variant="luxe">Luxe</Badge>
<Badge variant="premium">Premium</Badge>
<Badge variant="accessible">PMR</Badge>
<Badge variant="popular">Populaire</Badge>
```

---

### 5. SectionHeader

En-tête de section avec tag décoratif.

**Props:**
```typescript
interface SectionHeaderProps {
  tag?: string; // Petit texte uppercase
  title: string; // Titre principal (gros)
  subtitle?: string; // Sous-titre
  centered?: boolean; // Par défaut true
  className?: string;
}
```

**Features:**
- ✅ Tag avec lignes décoratives accent de chaque côté
- ✅ Tag: uppercase, tracking-widest, text-accent
- ✅ Title: font-display 4xl-6xl, font-extrabold
- ✅ Subtitle: max-w-3xl, text-lg, grey-600
- ✅ Centré par défaut

**Usage:**
```tsx
import { SectionHeader } from "@/components/ui";

<SectionHeader
  tag="Notre Flotte"
  title="Véhicules Premium"
  subtitle="BMW, Tesla, Mercedes. Des véhicules haut de gamme pour vos déplacements au Sénégal."
/>

<SectionHeader
  title="Pourquoi SCOD VTC ?"
  centered={false}
/>
```

---

### 6. Stepper

Indicateur de progression pour le flow de réservation.

**Props:**
```typescript
interface Step {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number; // Index de l'étape actuelle
  completedSteps?: number[]; // Index des étapes complétées
  orientation?: "horizontal" | "vertical";
  className?: string;
}
```

**Features:**
- ✅ Horizontal sur desktop avec barre de progression animée
- ✅ Compact sur mobile (progress bar + label actuel)
- ✅ Vertical en mode vertical
- ✅ Étape active: accent avec shadow-glow
- ✅ Étape complétée: success avec check icon
- ✅ Étape future: gris
- ✅ Barre de progression: width basé sur currentStep
- ✅ Transition: 500ms ease-out

**Usage:**
```tsx
import { Stepper } from "@/components/ui";

<Stepper
  steps={[
    { label: "Trajet", description: "Départ et arrivée" },
    { label: "Date & Heure", description: "Quand partir ?" },
    { label: "Véhicule", description: "Choisir votre VTC" },
    { label: "Options", description: "Services additionnels" },
    { label: "Paiement", description: "Finaliser" },
  ]}
  currentStep={2}
  completedSteps={[0, 1]}
  orientation="horizontal"
/>
```

---

### 7. PaymentMethodCard

Card de sélection de moyen de paiement.

**Props:**
```typescript
interface PaymentMethod {
  type: "paytech" | "stripe" | "wave_business" | "cash";
  name: string;
  description: string;
  icon: React.ReactNode;
  supported: string[]; // ["Orange Money", "Wave", ...]
}

interface PaymentMethodCardProps {
  method: PaymentMethod;
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
}
```

**Features:**
- ✅ Border accent + bg accent-soft quand sélectionné
- ✅ Check icon en haut à droite si sélectionné
- ✅ Icône/logo dans un container 12x12
- ✅ Liste des moyens supportés en badges
- ✅ Hover: border-accent/50
- ✅ Transition: 200ms
- ✅ Bouton natif (type="button") pour accessibilité

**Usage:**
```tsx
import { PaymentMethodCard } from "@/components/ui";
import { Wallet } from "lucide-react";

const method = {
  type: "paytech" as const,
  name: "Mobile Money",
  description: "Orange Money, Wave, Free Money",
  icon: <Wallet className="h-6 w-6 text-accent" />,
  supported: ["Orange Money", "Wave", "Free Money"],
};

<PaymentMethodCard
  method={method}
  selected={selectedMethod === "paytech"}
  onSelect={() => setSelectedMethod("paytech")}
/>
```

---

## 🎨 Design Tokens Utilisés

### Couleurs
- `brand` (#110E40) - Bleu marine profond
- `brand-hover` (#1C1870)
- `accent` (#FFC300) - Or
- `accent-hover` (#E6B000)
- `accent-soft` (rgba(255,195,0,0.10))
- `success` (#10B981)
- `error` (#EF4444)
- `info` (#3B82F6)
- `grey-*` (50-900)

### Typographie
- `font-display` - Barlow Condensed (700-900)
- `font-body` - Barlow (300-700)

### Border Radius
- `rounded-card` - 16px
- `rounded-btn` - 8px
- `rounded-input` - 10px
- `rounded-pill` - 9999px

### Transitions
- Duration: 200ms (normal), 450ms (card hover), 500ms (stepper)
- Easing: cubic-bezier(0.22, 1, 0.36, 1) - spring effect

### Shadows
- `shadow-md` - Standard
- `shadow-lg` - Hover buttons
- `shadow-xl` - Hover cards
- `shadow-glow-accent` - Active stepper step

---

## 📄 Barrel Export

Tous les composants sont exportés depuis `@/components/ui`:

```tsx
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  SectionHeader,
  Stepper,
  PaymentMethodCard,
} from "@/components/ui";
```

---

## 🎯 Page de Démonstration

Une page showcase complète est disponible sur `/ui-showcase` pour tester tous les composants en action.

**Features de la page:**
- Tous les variants de Button (primary, secondary, ghost, danger)
- Tous les sizes (sm, md, lg)
- États loading et disabled
- Input light et dark avec erreurs
- 4 variants de Card avec hover
- Tous les variants de Badge
- SectionHeader avec/sans tag
- Stepper horizontal
- PaymentMethodCard avec sélection

---

## ✅ Checklist Qualité

Tous les composants respectent:

- ✅ TypeScript strict avec interfaces exportées
- ✅ Tailwind + cn() pour merge de classes
- ✅ Support className en prop
- ✅ Tokens design system (pas de couleurs en dur)
- ✅ Animations fluides (Framer Motion prêt)
- ✅ Accessibility (aria labels, focus-visible)
- ✅ Responsive (mobile-first)
- ✅ Performance (React.forwardRef, memo si nécessaire)

---

**7 composants UI créés et documentés ! 🎉**
