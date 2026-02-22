"use client";

import {
  Car,
  MapPin,
  Phone,
  CreditCard,
  Wallet,
  Building2,
  Banknote,
} from "lucide-react";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  SectionHeader,
  Stepper,
  PaymentMethodCard,
  type PaymentMethod,
} from "@/components/ui";

const paymentMethods: PaymentMethod[] = [
  {
    type: "paytech",
    name: "Mobile Money",
    description: "Orange Money, Wave, Free Money",
    icon: <Wallet className="h-6 w-6 text-accent" />,
    supported: ["Orange Money", "Wave", "Free Money"],
  },
  {
    type: "stripe",
    name: "Carte Bancaire",
    description: "Visa, Mastercard, Amex, Apple Pay",
    icon: <CreditCard className="h-6 w-6 text-accent" />,
    supported: ["Visa", "Mastercard", "Amex", "Apple Pay"],
  },
  {
    type: "wave_business",
    name: "Wave Business",
    description: "Facturation entreprise",
    icon: <Building2 className="h-6 w-6 text-accent" />,
    supported: ["Facturation mensuelle"],
  },
  {
    type: "cash",
    name: "Espèces",
    description: "Paiement au chauffeur",
    icon: <Banknote className="h-6 w-6 text-accent" />,
    supported: ["FCFA"],
  },
];

export default function UIShowcasePage() {
  return (
    <main className="min-h-screen bg-grey-50 py-12">
      <div className="container-custom space-y-16">
        <div className="text-center">
          <h1 className="heading-1 mb-4 text-brand">
            SCOD VTC Design System
          </h1>
          <p className="body-lg text-grey-600">
            Composants UI du design system
          </p>
        </div>

        <section className="space-y-8">
          <SectionHeader
            tag="Composants"
            title="Buttons"
            subtitle="Boutons avec variants, sizes et états"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card variant="service">
              <CardHeader>
                <CardTitle className="text-lg">Primary</CardTitle>
                <CardDescription>Accent background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                <Button variant="primary" size="sm" fullWidth>
                  Small
                </Button>
                <Button variant="primary" size="md" fullWidth>
                  Medium
                </Button>
                <Button variant="primary" size="lg" fullWidth>
                  Large
                </Button>
                <Button
                  variant="primary"
                  icon={Car}
                  iconPosition="left"
                  fullWidth
                >
                  Avec icône
                </Button>
                <Button variant="primary" loading fullWidth>
                  Loading...
                </Button>
              </CardContent>
            </Card>

            <Card variant="service">
              <CardHeader>
                <CardTitle className="text-lg">Secondary</CardTitle>
                <CardDescription>Brand background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                <Button variant="secondary" size="sm" fullWidth>
                  Small
                </Button>
                <Button variant="secondary" size="md" fullWidth>
                  Medium
                </Button>
                <Button variant="secondary" size="lg" fullWidth>
                  Large
                </Button>
                <Button
                  variant="secondary"
                  icon={MapPin}
                  iconPosition="right"
                  fullWidth
                >
                  Avec icône
                </Button>
              </CardContent>
            </Card>

            <Card variant="service">
              <CardHeader>
                <CardTitle className="text-lg">Ghost</CardTitle>
                <CardDescription>Transparent background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                <Button variant="ghost" size="sm" fullWidth>
                  Small
                </Button>
                <Button variant="ghost" size="md" fullWidth>
                  Medium
                </Button>
                <Button variant="ghost" size="lg" fullWidth>
                  Large
                </Button>
                <Button variant="ghost" icon={Phone} fullWidth>
                  Avec icône
                </Button>
              </CardContent>
            </Card>

            <Card variant="service">
              <CardHeader>
                <CardTitle className="text-lg">Danger</CardTitle>
                <CardDescription>Error background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                <Button variant="danger" size="sm" fullWidth>
                  Small
                </Button>
                <Button variant="danger" size="md" fullWidth>
                  Medium
                </Button>
                <Button variant="danger" size="lg" fullWidth>
                  Large
                </Button>
                <Button variant="danger" disabled fullWidth>
                  Disabled
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader
            tag="Formulaires"
            title="Inputs"
            subtitle="Champs de saisie avec variants light et dark"
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <Card variant="service">
              <CardHeader>
                <CardTitle>Variant Light</CardTitle>
                <CardDescription>Pour formulaires sur fond clair</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
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
                  variant="light"
                />
                <Input
                  label="Email avec erreur"
                  placeholder="exemple@email.com"
                  error="Cette adresse email est invalide"
                  variant="light"
                />
              </CardContent>
            </Card>

            <div className="rounded-card bg-gradient-to-br from-brand via-brand-dark to-brand-hover p-8">
              <h3 className="mb-2 font-sans text-2xl font-bold text-white">
                Variant Dark
              </h3>
              <p className="mb-6 text-white/70">
                Pour formulaires sur fond sombre
              </p>
              <div className="space-y-4">
                <Input
                  label="Adresse de départ"
                  placeholder="Ex: Plateau, Dakar"
                  icon={MapPin}
                  variant="dark"
                />
                <Input
                  label="Téléphone"
                  placeholder="+221 XX XXX XX XX"
                  icon={Phone}
                  variant="dark"
                />
                <Input
                  label="Email"
                  placeholder="exemple@email.com"
                  variant="dark"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader
            tag="Cards"
            title="Cards"
            subtitle="4 variants de cartes avec hover effects"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card variant="vehicle" interactive>
              <h3 className="mb-2 font-sans text-xl font-bold text-white">
                Vehicle Card
              </h3>
              <p className="text-sm text-white/80">
                Fond sombre dégradé avec border accent au hover
              </p>
            </Card>

            <Card variant="service" interactive>
              <h3 className="mb-2 font-sans text-xl font-bold text-grey-900">
                Service Card
              </h3>
              <p className="text-sm text-grey-600">
                Fond blanc avec shadow et border au hover
              </p>
            </Card>

            <Card variant="stat" interactive>
              <h3 className="mb-2 font-sans text-xl font-bold text-accent-hover">
                Stat Card
              </h3>
              <p className="text-sm text-grey-700">
                Fond accent dégradé avec border accent au hover
              </p>
            </Card>

            <Card variant="pricing" interactive>
              <h3 className="mb-2 font-sans text-xl font-bold text-grey-900">
                Pricing Card
              </h3>
              <p className="text-sm text-grey-600">
                Fond blanc avec border 2px au hover
              </p>
            </Card>
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader
            tag="Badges"
            title="Badges"
            subtitle="Tags pour véhicules et services"
          />
          <Card variant="service">
            <CardContent className="flex flex-wrap gap-3 pt-6">
              <Badge variant="electric">Électrique</Badge>
              <Badge variant="luxe">Luxe</Badge>
              <Badge variant="premium">Premium</Badge>
              <Badge variant="accessible">PMR</Badge>
              <Badge variant="popular">Populaire</Badge>
              <Badge variant="default">Standard</Badge>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8">
          <SectionHeader
            tag="Navigation"
            title="Stepper"
            subtitle="Indicateur de progression pour le flow de réservation"
          />
          <Card variant="service">
            <CardContent className="pt-6">
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
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8">
          <SectionHeader
            tag="Paiement"
            title="Payment Method Cards"
            subtitle="Sélection du moyen de paiement"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {paymentMethods.map((method) => (
              <PaymentMethodCard
                key={method.type}
                method={method}
                selected={method.type === "paytech"}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
