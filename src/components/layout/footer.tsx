"use client";

import * as React from "react";
import Link from "next/link";
import { Instagram, Facebook, Linkedin, Phone } from "lucide-react";
import { cn } from "@/lib/cn";

const footerLinks = {
  services: [
    { label: "Transfert aéroport", href: "/services/transfert-aeroport" },
    { label: "Commander course", href: "/commander" },
    { label: "Location véhicule", href: "/location" },
    { label: "Transport événementiel", href: "/services/evenements" },
    { label: "Mise à disposition", href: "/entreprises/chauffeur-disposition" },
  ],
  company: [
    { label: "À propos", href: "/a-propos" },
    { label: "Trajets pro", href: "/entreprises/trajets-pro" },
    { label: "Devenir chauffeur", href: "/devenir-chauffeur" },
    { label: "Pourquoi SCOD VTC", href: "/pourquoi-scod" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "CGV", href: "/legal/cgv" },
    { label: "Politique de confidentialité", href: "/legal/confidentialite" },
    { label: "Mentions légales", href: "/legal/mentions-legales" },
    { label: "Contact", href: "/assistance" },
  ],
};

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/scodvtc",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/scodvtc",
    icon: Facebook,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/scodvtc",
    icon: Linkedin,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/221771234567",
    icon: Phone,
  },
];

const paymentMethods = [
  { name: "Orange Money", color: "#FF6B00" },
  { name: "Wave", color: "#00D9A5" },
  { name: "Free Money", color: "#E31E24" },
  { name: "Visa", color: "#1A1F71" },
  { name: "Mastercard", color: "#EB001B" },
  { name: "Stripe", color: "#635BFF" },
];

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("bg-[#0A0920] text-white", className)}>
      <div className="container-custom py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Col 1 - Logo & Social */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="mb-4 inline-block text-h3-inverse"
            >
              SCOD <span className="text-accent">VTC</span>
            </Link>
            <p className="text-sm-inverse mb-6">
              Votre chauffeur privé au Sénégal
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/60 transition-all duration-300 hover:scale-110 hover:bg-accent/10 hover:text-accent"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Col 2 - Services */}
          <div>
            <h3 className="text-label-inverse mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm-inverse transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Entreprise */}
          <div>
            <h3 className="text-label-inverse mb-4">
              Entreprise
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm-inverse transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Légal */}
          <div>
            <h3 className="text-label-inverse mb-4">
              Légal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm-inverse transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="my-8 border-t border-white/10 lg:my-12" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          {/* Copyright */}
          <p className="text-sm-inverse text-center lg:text-left">
            © {currentYear} SCOD VTC. Tous droits réservés.
          </p>

          {/* Payment Methods */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="flex h-8 items-center rounded border border-white/10 bg-white/5 px-3 transition-colors duration-200 hover:border-white/20"
                title={method.name}
              >
                <span className="text-sm-inverse" style={{ fontWeight: "var(--weight-medium)" }}>
                  {method.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
