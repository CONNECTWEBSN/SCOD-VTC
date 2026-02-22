"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays, User, CreditCard, LogOut,
  Plus, Menu, X, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────────────────────
   Nav items
───────────────────────────────────────────────────────── */

const NAV_ITEMS = [
  {
    href:  "/mon-compte/reservations",
    icon:  CalendarDays,
    label: "Mes réservations",
  },
  {
    href:  "/mon-compte/profil",
    icon:  User,
    label: "Mon profil",
  },
  {
    href:  "/mon-compte/paiements",
    icon:  CreditCard,
    label: "Mes paiements",
  },
];

/* ─────────────────────────────────────────────────────────
   Mock user
───────────────────────────────────────────────────────── */

const MOCK_USER = {
  firstName: "Moussa",
  lastName:  "Sarr",
  phone:     "+221 77 123 45 67",
  initials:  "MS",
};

/* ─────────────────────────────────────────────────────────
   Sidebar content
───────────────────────────────────────────────────────── */

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center justify-between border-b border-grey-100 px-6 py-5">
        <Link href="/" className="font-sans text-[18px] font-bold tracking-[-0.02em] text-brand">
          SCOD <span className="text-accent">VTC</span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-grey-400 transition-colors hover:bg-grey-100 hover:text-grey-700"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* User avatar */}
      <div className="border-b border-grey-100 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-hover font-sans text-[16px] font-bold text-white shadow-md">
            {MOCK_USER.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate font-sans text-[14px] font-semibold text-grey-900">
              {MOCK_USER.firstName} {MOCK_USER.lastName}
            </p>
            <p className="truncate text-[12px] text-grey-500">{MOCK_USER.phone}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 font-sans text-[14px] font-medium transition-all duration-150",
                active
                  ? "bg-accent/8 text-brand"
                  : "text-grey-600 hover:bg-grey-100 hover:text-grey-900"
              )}
            >
              {/* accent left bar */}
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-accent transition-all duration-200",
                  active ? "opacity-100" : "opacity-0 group-hover:opacity-30"
                )}
              />
              <Icon
                className={cn(
                  "h-4.5 w-4.5 shrink-0 transition-colors",
                  active ? "text-accent" : "text-grey-400 group-hover:text-grey-600"
                )}
              />
              {label}
              {active && (
                <ChevronRight className="ml-auto h-3.5 w-3.5 text-accent" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-grey-100 px-3 py-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-sans text-[14px] font-medium text-grey-500 transition-colors hover:bg-red-50 hover:text-red-600">
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          Déconnexion
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Layout
───────────────────────────────────────────────────────── */

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-grey-50">

      {/* ── Desktop sidebar ──────────────────────────── */}
      <aside className="hidden w-[280px] shrink-0 border-r border-grey-200 bg-white lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {/* ── Mobile drawer ────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-brand-dark/50 backdrop-blur-sm lg:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-[300px] border-r border-grey-200 bg-white shadow-2xl lg:hidden"
            >
              <SidebarContent onClose={() => setDrawerOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main ─────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-grey-200 bg-white px-5 shadow-sm sm:px-8">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="rounded-lg p-1.5 text-grey-500 transition-colors hover:bg-grey-100 lg:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-sans text-[18px] font-bold tracking-[-0.02em] text-grey-900">
              Mon espace
            </h1>
          </div>

          <Link href="/commander">
            <motion.span
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-accent px-4 py-2 font-sans text-[13px] font-bold uppercase tracking-[0.02em] text-brand shadow-md shadow-accent/20 transition-colors hover:bg-accent-light"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nouvelle réservation</span>
              <span className="sm:hidden">Réserver</span>
            </motion.span>
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 px-5 py-8 sm:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
