/**
 * Shared types and price calculation utilities for the 5-step reservation flow.
 */

// ─── Address ─────────────────────────────────────────────────────────────────

export interface AddressValue {
  address: string;
  placeId?: string;
  latitude?: number;
  longitude?: number;
}

export const EMPTY_ADDRESS: AddressValue = { address: "" };

// ─── Vehicle ──────────────────────────────────────────────────────────────────

export type VehicleClass = "confort" | "premium" | "vip";

export interface VehicleInfo {
  id: VehicleClass;
  name: string;
  subtitle: string;
  capacity: number;
  luggage: number;
  features: string[];
  basePrice: number;
  pricePerKm: number;
}

export const VEHICLES: VehicleInfo[] = [
  {
    id: "confort",
    name: "Confort",
    subtitle: "Berline · Peugeot 3008 ou similaire",
    capacity: 4,
    luggage: 3,
    features: ["Climatisation", "WiFi", "Eau minérale"],
    basePrice: 25000,
    pricePerKm: 750,
  },
  {
    id: "premium",
    name: "Premium",
    subtitle: "Berline Luxe · BMW Série 5 ou similaire",
    capacity: 4,
    luggage: 3,
    features: ["Eau minérale", "Chargeur", "Presse quotidienne"],
    basePrice: 40000,
    pricePerKm: 1100,
  },
  {
    id: "vip",
    name: "VIP",
    subtitle: "Grand Luxe · Tesla Model S ou Mercedes Classe S",
    capacity: 4,
    luggage: 3,
    features: ["Champagne", "Tapis rouge", "Chargeur sans fil"],
    basePrice: 60000,
    pricePerKm: 1500,
  },
];

// ─── Driver mock data ─────────────────────────────────────────────────────────

export interface DriverInfo {
  name: string;
  initials: string;
  rating: number;
  trips: number;
  experience: string;
  languages: string[];
}

export const MOCK_DRIVERS: Record<VehicleClass, DriverInfo> = {
  confort: {
    name: "Mamadou Diallo",
    initials: "MD",
    rating: 4.7,
    trips: 1240,
    experience: "3 ans",
    languages: ["Wolof", "Français"],
  },
  premium: {
    name: "Ibrahima Sow",
    initials: "IS",
    rating: 4.9,
    trips: 2100,
    experience: "5 ans",
    languages: ["Wolof", "Français", "Anglais"],
  },
  vip: {
    name: "Ousmane Ndiaye",
    initials: "ON",
    rating: 5.0,
    trips: 890,
    experience: "7 ans",
    languages: ["Wolof", "Français", "Anglais", "Espagnol"],
  },
};

// ─── Payment ──────────────────────────────────────────────────────────────────

export type PaymentMethodId =
  | "orange-money"
  | "wave"
  | "free-money"
  | "card"
  | "apple-pay"
  | "google-pay"
  | "cash"
  | "wave-business";

// ─── Reservation state ────────────────────────────────────────────────────────

export interface ReservationData {
  // Step 1 — Trajet
  pickup: AddressValue;
  dropoff: AddressValue;
  distanceKm: number;
  durationMin: number;

  // Step 2 — Date & heure
  date: string;        // YYYY-MM-DD
  time: string;        // HH:MM
  isEarliest: boolean;
  flightNumber: string;

  // Step 3 — Véhicule
  vehicleClass: VehicleClass;

  // Step 5 — Paiement
  paymentMethod: PaymentMethodId | null;
}

export const DEFAULT_RESERVATION: ReservationData = {
  pickup: EMPTY_ADDRESS,
  dropoff: EMPTY_ADDRESS,
  distanceKm: 0,
  durationMin: 0,
  date: "",
  time: "",
  isEarliest: false,
  flightNumber: "",
  vehicleClass: "premium",
  paymentMethod: null,
};

// ─── Price calculation ────────────────────────────────────────────────────────

export interface PriceBreakdown {
  base: number;
  perKm: number;
  aibdSupplement: number;
  nightSupplement: number;
  zoneSupplement: number;
  total: number;
  deposit: number;
}

function isNightTime(time: string): boolean {
  if (!time) return false;
  const h = parseInt(time.split(":")[0], 10);
  return h >= 22 || h < 6;
}

function isAIBDAddress(address: string): boolean {
  const lower = address.toLowerCase();
  return lower.includes("aibd") || lower.includes("blaise diagne");
}

export function calculatePrice(
  vehicleClass: VehicleClass,
  distanceKm: number,
  time: string,
  pickupAddress: string,
  dropoffAddress: string
): PriceBreakdown {
  const vehicle = VEHICLES.find((v) => v.id === vehicleClass)!;
  const base = vehicle.basePrice;
  const perKm = Math.round(distanceKm * vehicle.pricePerKm);
  const aibdSupplement =
    isAIBDAddress(pickupAddress) || isAIBDAddress(dropoffAddress) ? 2000 : 0;
  const nightSupplement = isNightTime(time) ? 5000 : 0;
  const zoneSupplement = distanceKm > 50 ? 10000 : 0;
  const total = base + perKm + aibdSupplement + nightSupplement + zoneSupplement;
  const deposit = Math.round(total * 0.3);
  return { base, perKm, aibdSupplement, nightSupplement, zoneSupplement, total, deposit };
}

export function formatFcfa(amount: number): string {
  return new Intl.NumberFormat("fr-SN", { maximumFractionDigits: 0 }).format(amount);
}

export function generateBookingRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "SCO-";
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}
