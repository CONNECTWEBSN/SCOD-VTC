# SCOD VTC - Section Contact & FAQ

Documentation complète de la section ContactFAQ avec layout asymétrique et accordion Radix.

## 🎯 Vue d'Ensemble

Section FAQ avec layout 2 colonnes asymétrique (35/65), colonne gauche sticky et 6 questions accordion détaillées.

---

## 🎨 Design

### Fond & Padding
- **Background:** blanc
- **Padding:** 120px vertical

### Layout Desktop
- **Grid:** 35% / 65% (asymétrique)
- **Gap:** 64px (lg:gap-16)
- **Colonne gauche:** Sticky top-24
- **Colonne droite:** Accordion scrollable

### Layout Mobile
- **Grid:** 1 colonne empilée
- **Gap:** 48px

---

## 📍 Colonne Gauche (Sticky)

### Header
- **Tag:** "BESOIN D'AIDE ?"
  - Dots: 6px cercle accent de chaque côté
  - Font: Barlow 700, 12px uppercase
  - Color: accent
  - Tracking: widest

- **Titre:** "Questions fréquentes"
  - Font: Barlow Condensed 900
  - Size: 40px (4xl) desktop, 48px (5xl) large
  - Color: grey-900
  - Tracking: tight

- **Description:**
  - Size: 15px
  - Color: grey-600
  - Leading: relaxed

### Bouton CTA
- **Text:** "Contactez-nous" + ArrowRight icon
- **Style:**
  - Height: 48px (h-12)
  - Background: brand
  - Color: white
  - Font: Barlow 600, 14px
  - Shadow: md
  - **Hover:**
    - Background: #FF9500 (orange)
    - Transform: translateY(-2px)
    - Shadow: lg
    - Icon: translateX(2px)
  - Transition: 300ms
- **Link:** `/assistance`

### Contact Links
- **Téléphone:** +221 77 123 45 67
  - Icon: Phone (Lucide)
  - Link: tel:+221771234567
  - Hover: color accent

- **Toutes les questions:** "Voir toutes les questions →"
  - Icon: ArrowRight
  - Link: /faq
  - Hover: color accent

### Stats Card
- **Background:** grey-50
- **Border:** grey-200
- **Padding:** 24px
- **Border-radius:** xl (12px)

**3 Stats:**

1. **4.8/5**
   - Icon: Star (fill accent)
   - Label: "Satisfaction client"
   - Font: Barlow Condensed 700, 24px (2xl)

2. **15 min d'attente offerte**
   - Icon: Clock accent
   - Label: "Transfert aéroport AIBD"
   - Font: 14px semibold

3. **+2 000**
   - Icon: TrendingUp accent
   - Label: "Trajets réalisés"
   - Font: Barlow Condensed 700, 24px (2xl)

**Icon Container:**
- Size: 40px circle
- Background: accent/10
- Icon: accent, 20px

---

## 📋 Colonne Droite (Accordion)

### Structure Accordion (Radix)
- **Type:** single
- **Collapsible:** true
- **Default open:** item "1"
- **Gap:** 16px (space-y-4)

### Item Styles

**Container:**
- Border: 2px grey-100
- Border-radius: 2xl (24px)
- Background: white
- **State open:**
  - Border: accent
  - Shadow: lg
- Transition: 300ms

**Trigger (Question):**
- Padding: 24px (p-6)
- Font: Barlow 600, 17px
- Color: grey-900
- **Hover:**
  - Color: brand
- **Chevron:**
  - Size: 32px circle (h-8 w-8)
  - Background: accent/10
  - **Hover:** accent/20
  - **Open:**
    - Rotate: 180deg
    - Background: accent
    - Color: brand
  - Transition: 300ms

**Content:**
- Padding: 0 24px 24px
- Font: Barlow 400, 15px
- Line-height: 1.75
- Color: grey-700
- **Animation:**
  - Down: accordion-down 200ms
  - Up: accordion-up 200ms

---

## ❓ 6 Questions FAQ

### 1. Comment réserver un chauffeur privé ?

**Bloc "En ligne (recommandé)":**
- 4 étapes numérotées
- Badge: cercle accent avec numéro blanc
- Steps:
  1. Saisir départ + arrivée
  2. Choisir date + heure
  3. Sélectionner véhicule
  4. Valider + payer

**Bloc "Par téléphone / WhatsApp":**
- Numéro: +221 77 123 45 67 (bold brand)
- Description guidage conseiller

**Note grise:**
- Background: grey-50
- Border: grey-200
- Text: SMS confirmation avec détails chauffeur

---

### 2. Comment connaître le prix de ma course ?

**Bloc "Obtenir un tarif":**
- 3 étapes numérotées
- Steps:
  1. Renseigner trajet
  2. Consulter prix par gamme
  3. Tarif définitif garanti

**Bloc "Ce qui est inclus":**
- 4 items avec bullet accent
- Items:
  - Distance + durée
  - Attente 15 min
  - WiFi + eau + chargeur
  - Péage + parking

**Tip accent:**
- Background: accent/7%
- Border: accent/20%
- Icon: Info ambre (#D97706)
- Text: Prix garanti même embouteillages

---

### 3. Quelle gamme de véhicule choisir ?

**4 Blocs gamme:**

1. **BERLINE**
   - Badge gradient: accent → accent-hover
   - Véhicules: BMW Série 5, Mercedes Classe E
   - Usage: 1-3 pax, pro, rendez-vous

2. **SUV**
   - Badge gradient: accent → accent-hover
   - Véhicules: Tesla Model X, Peugeot 3008
   - Usage: Familles, bagages, confort

3. **VAN VIP**
   - Badge gradient: violet #7C3AED → #6D28D9
   - Véhicules: Mercedes Classe V, 6 places
   - Usage: Groupes, événements, aéroport

4. **PMR**
   - Badge gradient: info → #2563EB
   - Véhicules: Van accessible
   - Usage: Rampe électrique, fixations

**Tip:**
- Privilégier SUV/Van pour AIBD (espace bagages)

---

### 4. Comment retrouver mon chauffeur à l'aéroport AIBD ?

**Processus 4 étapes:**
1. Sortie principale
2. Pancarte nominative
3. Présentation + bagages
4. Direction destination

**Tip:**
- Renseigner numéro de vol pour suivi temps réel

---

### 5. Que se passe-t-il si mon vol est en retard ?

**Grid 2 colonnes:**

**Vol renseigné (vert):**
- Background: green-50
- Border: green-200
- Icon: Check vert
- Features:
  - Suivi auto
  - Ajustement chauffeur
  - 15 min offertes
  - Aucune action

**Vol non renseigné (gris):**
- Background: grey-50 (#F9FAFB)
- Border: grey-200
- Icon: ! gris
- Actions:
  - Appeler chauffeur
  - Communiquer retard
  - Attente facturée après 15 min
  - Supplément possible

**Tip:**
- Pas de frais si vol renseigné

---

### 6. Quels modes de paiement acceptez-vous ?

**Grid 3 colonnes:**

1. **Mobile Money**
   - Orange Money
   - Wave
   - Free Money
   - Via PayTech

2. **CB Internationales**
   - Visa
   - Mastercard
   - Amex
   - Via Stripe

3. **Autres**
   - Espèces (FCFA)
   - Wave Business
   - Pour entreprises

**Bloc Facturation entreprise:**
- Facturation mensuelle Wave Business
- Reporting détaillé
- Gestion multi-utilisateurs

**Note:**
- Paiement en ligne (réservation) ou fin de course

---

## 🎨 Styles Internes

### Blocs Réponses
- **Background:** #F9FAFB
- **Border:** grey-200
- **Padding:** 20px (p-5)
- **Border-radius:** xl (12px)

### Tips (Accent)
- **Background:** accent/7% (rgba accent 0.07)
- **Border:** accent/20%
- **Icon:** Info ambre #D97706
- **Text:** ambre foncé #92400E
- **Padding:** 16px (p-4)
- **Border-radius:** lg (12px)
- **Gap:** 12px (flex gap-3)

### Notes (Grises)
- **Background:** grey-50
- **Border:** grey-200
- **Padding:** 16px (p-4)
- **Text:** 14px grey-600
- **Border-radius:** lg

### Listes Numérotées
- **Badge:** cercle 24px (h-6 w-6)
- **Background:** accent
- **Color:** brand
- **Font:** Barlow 700, 12px (xs)
- **Gap:** 12px items

### Listes Bullets
- **Bullet:** 6px cercle accent (h-1.5 w-1.5)
- **Gap:** 8px
- **Text:** 15px grey-700

---

## 🎬 Animations

### Scroll Reveal (Framer Motion whileInView)

**Colonne gauche:**
- Initial: opacity 0, x -20
- Animate: opacity 1, x 0
- Duration: 600ms
- Viewport: once

**Colonne droite:**
- Initial: opacity 0, x 20
- Animate: opacity 1, x 0
- Duration: 600ms
- Delay: 200ms

### Accordion Animations
- **Open:** accordion-down 200ms ease-out
- **Close:** accordion-up 200ms ease-out
- **Chevron:** rotate 180deg 300ms
- **Border:** color accent 300ms

### Hover Effects
- CTA button: translateY(-2px) + bg orange
- Phone link: color accent
- Chevron: bg accent/20 → accent

---

## 📱 Responsive

### Desktop (>= 1024px)
- Grid: 35% / 65%
- Colonne gauche: sticky top-24
- FAQ: 2 cols pour comparaisons (vol, paiements)
- Stats card: 3 items verticaux

### Tablet (>= 640px && < 1024px)
- Grid: 1 colonne empilée
- FAQ: 2 cols maintenues
- Colonne gauche: non sticky

### Mobile (< 640px)
- Grid: 1 colonne
- FAQ: 1 colonne (sauf paiements 3 cols)
- Stats: maintain layout
- Padding réduit

---

## 🔧 Props Interface

```typescript
interface ContactFAQProps {
  className?: string;
}
```

**Usage:**
```tsx
import { ContactFAQ } from "@/components/sections/contact-faq";

<ContactFAQ />
```

---

## 📦 Dépendances

- `framer-motion` - Scroll reveal
- `@radix-ui/react-accordion` - Accordion
- `next/link` - Navigation
- `lucide-react` - Icons (ChevronDown, Phone, Info, ArrowRight, Star, Clock, TrendingUp)
- `@/lib/cn` - Class merge

---

## ✅ Features Implémentées

- ✅ Layout asymétrique 35/65
- ✅ Colonne gauche sticky
- ✅ Header avec tag dots
- ✅ Bouton CTA hover orange + lift
- ✅ Contact links (téléphone + FAQ)
- ✅ Stats card avec 3 metrics
- ✅ Accordion Radix 6 questions
- ✅ Question 1 ouverte par défaut
- ✅ Contenu riche avec blocs structurés
- ✅ Tips accent avec icon Info
- ✅ Notes grises
- ✅ Listes numérotées avec badges
- ✅ Grid comparaisons (vol, paiements)
- ✅ Animations scroll reveal
- ✅ Animations accordion native
- ✅ Hover effects sophistiqués
- ✅ TypeScript strict (0 erreurs)
- ✅ 100% responsive

---

## 🚀 Prochaines Améliorations

1. **Search FAQ** - Barre de recherche avec filtrage
2. **Categories** - Filtres par catégorie (réservation, paiement, etc.)
3. **Feedback** - "Cette réponse vous a-t-elle aidé ?"
4. **Live Chat** - Widget Intercom / Crisp
5. **Video tutorials** - Embed vidéos dans réponses
6. **Related questions** - Suggestions à la fin de chaque réponse
7. **Analytics** - Track questions les plus consultées

---

## 🎯 Design Inspirations

- **Stripe FAQ** - Layout asymétrique sticky
- **Intercom Help Center** - Accordion + search
- **Linear Support** - Clean minimal design

---

**Section Contact & FAQ premium créée avec succès ! 🎉**

Date : 21 février 2026
TypeScript : ✅ 0 erreurs
Accordion : ✅ Radix native animations
Layout : ✅ Asymétrique 35/65 sticky
Questions : ✅ 6 FAQ complètes
Responsive : ✅ Mobile-first
