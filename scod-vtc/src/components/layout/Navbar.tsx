"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Car,
  Calendar,
  KeyRound,
  Plane,
  PartyPopper,
  Building2,
  Briefcase,
  UserCog,
} from "lucide-react";
import { cn } from "@/lib/cn";

interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: NavLink[];
}

const navigationItems: NavItem[] = [
  {
    label: "Commander",
    dropdown: [
      {
        label: "Commander course",
        href: "/commander",
        description: "Réservation rapide en 30 secondes",
        icon: <Car className="w-4 h-4" />,
      },
      {
        label: "Réserver un trajet",
        href: "/reservation",
        description: "Planifiez votre course à l'avance",
        icon: <Calendar className="w-4 h-4" />,
      },
      {
        label: "Louer un véhicule",
        href: "/location",
        description: "Avec chauffeur, à la journée ou plus",
        icon: <KeyRound className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Particuliers",
    dropdown: [
      {
        label: "Transfert aéroport",
        href: "/services/transfert-aeroport",
        description: "Dakar ↔ AIBD, tarif fixe garanti",
        icon: <Plane className="w-4 h-4" />,
      },
      {
        label: "Transport événementiel",
        href: "/services/evenements",
        description: "Mariages, galas, cérémonies",
        icon: <PartyPopper className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Entreprises",
    dropdown: [
      {
        label: "Offre entreprises",
        href: "/entreprises",
        description: "Solutions transport pour votre équipe",
        icon: <Building2 className="w-4 h-4" />,
      },
      {
        label: "Trajets pro",
        href: "/entreprises/trajets-pro",
        description: "Déplacements collaborateurs",
        icon: <Briefcase className="w-4 h-4" />,
      },
      {
        label: "Chauffeur à disposition",
        href: "/entreprises/chauffeur-disposition",
        description: "Chauffeur dédié à la journée",
        icon: <UserCog className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "FAQ",
    href: "/faq",
  },
];

function DesktopNavItem({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.href) {
    return (
      <Link
        href={item.href}
        className="text-body transition-colors duration-200 hover:text-accent"
        style={{ fontWeight: "var(--weight-medium)", color: "var(--color-text-secondary)" }}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          "flex items-center gap-1.5 text-body transition-colors duration-200 hover:text-accent",
          isOpen && "text-accent"
        )}
        style={{ fontWeight: "var(--weight-medium)", color: isOpen ? "var(--accent)" : "var(--color-text-secondary)" }}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && item.dropdown && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[280px] bg-brand rounded-[10px] border border-white/10 shadow-2xl overflow-hidden z-50"
          >
            {/* Arrow */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-brand border-l border-t border-white/10 rotate-45" />

            <div className="relative py-2">
              {item.dropdown.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors duration-150 group"
                >
                  {link.icon && (
                    <div className="mt-0.5 text-accent group-hover:text-accent-light transition-colors">
                      {link.icon}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="text-body-sm mb-0.5 group-hover:text-accent transition-colors" style={{ fontWeight: "var(--weight-semibold)", color: "var(--color-text-inverse)" }}>
                      {link.label}
                    </div>
                    {link.description && (
                      <div className="text-sm-inverse" style={{ lineHeight: "var(--leading-snug)" }}>
                        {link.description}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[380px] bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <Image
                  src="/cars/logo/logo-scod-vtc.png"
                  alt="SCOD VTC"
                  width={150}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-grey-600 hover:text-brand transition-colors"
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* CTA Button */}
              <Link
                href="/reservation"
                onClick={onClose}
                className="block w-full rounded-btn bg-accent py-3.5 text-center text-cta text-brand uppercase transition-colors duration-200 hover:bg-accent-light mb-6"
              >
                Réserver maintenant
              </Link>

              {/* Navigation */}
              <nav className="space-y-6">
                {navigationItems.map((item) => (
                  <div key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="text-body block transition-colors hover:text-accent"
                        style={{ fontWeight: "var(--weight-semibold)", color: "var(--color-text-primary)" }}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        <div className="text-label mb-3" style={{ color: "var(--color-text-muted)" }}>
                          {item.label}
                        </div>
                        <div className="space-y-2 pl-2">
                          {item.dropdown?.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={onClose}
                              className="flex items-start gap-3 py-2 group"
                            >
                              {link.icon && (
                                <div className="mt-0.5 text-accent">
                                  {link.icon}
                                </div>
                              )}
                              <div>
                                <div className="text-body transition-colors group-hover:text-accent" style={{ fontWeight: "var(--weight-medium)", color: "var(--color-text-primary)" }}>
                                  {link.label}
                                </div>
                                {link.description && (
                                  <div className="text-sm mt-0.5">
                                    {link.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </nav>

              {/* Footer Links */}
              <div className="mt-8 pt-6 border-t border-grey-200 space-y-3">
                <Link
                  href="/assistance"
                  onClick={onClose}
                  className="text-body block transition-colors hover:text-accent"
                  style={{ fontWeight: "var(--weight-medium)", color: "var(--color-text-secondary)" }}
                >
                  Assistance
                </Link>
                <Link
                  href="/connexion"
                  onClick={onClose}
                  className="text-body block transition-colors hover:text-accent"
                  style={{ fontWeight: "var(--weight-medium)", color: "var(--color-text-secondary)" }}
                >
                  Se connecter
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-[16px] border-b border-grey-200 shadow-sm"
            : "bg-white/80 backdrop-blur-[16px]"
        )}
      >
        <div className="max-w-[1920px] mx-auto px-6 lg:px-[52px]">
          <div className="flex items-center justify-between h-[68px]">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/cars/logo/logo-scod-vtc.png"
                alt="SCOD VTC"
                width={180}
                height={48}
                className="h-12 w-auto object-contain mix-blend-multiply"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigationItems.map((item) => (
                <DesktopNavItem key={item.label} item={item} />
              ))}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href="/assistance"
                className="text-body transition-colors duration-200 hover:text-accent"
                style={{ fontWeight: "var(--weight-medium)", color: "var(--color-text-secondary)" }}
              >
                Assistance
              </Link>
              <Link
                href="/connexion"
                className="text-body transition-colors duration-200 hover:text-accent"
                style={{ fontWeight: "var(--weight-medium)", color: "var(--color-text-secondary)" }}
              >
                Se connecter
              </Link>
              <Link
                href="/reservation"
                className="rounded-btn bg-accent px-6 py-2.5 text-cta text-brand uppercase transition-colors duration-200 hover:bg-accent-light"
              >
                Réserver maintenant
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -mr-2 text-grey-700 hover:text-brand transition-colors"
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
