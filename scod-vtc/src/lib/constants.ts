/**
 * Global constants for SCOD VTC application
 */

export const APP_NAME = "SCOD VTC";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scod-vtc.sn";
export const APP_DESCRIPTION =
  "Service de chauffeur privé premium au Sénégal";

/**
 * Business constants
 */
export const CONTACT = {
  phone: "+221 77 123 45 67",
  email: "contact@scod-vtc.sn",
  support: "support@scod-vtc.sn",
  address: "Dakar, Sénégal",
} as const;

/**
 * Booking constants
 */
export const BOOKING = {
  MIN_ADVANCE_HOURS: 1,
  MAX_ADVANCE_DAYS: 30,
  MIN_PASSENGERS: 1,
  MAX_PASSENGERS: 8,
  CANCELLATION_DEADLINE_HOURS: 2,
} as const;

/**
 * Payment constants
 */
export const PAYMENT = {
  CURRENCY: "XOF",
  CURRENCY_SYMBOL: "FCFA",
  MIN_AMOUNT: 5000,
  VAT_RATE: 0.18,
} as const;

/**
 * Vehicle categories
 */
export const VEHICLE_CATEGORIES = {
  BERLINE: "berline",
  SUV: "suv",
  LUXE: "luxe",
  VAN: "van",
  PMR: "pmr",
} as const;

/**
 * Booking statuses
 */
export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  DRIVER_ASSIGNED: "driver_assigned",
  DRIVER_EN_ROUTE: "driver_en_route",
  ARRIVED: "arrived",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  NO_SHOW: "no_show",
} as const;

/**
 * Payment providers
 */
export const PAYMENT_PROVIDERS = {
  PAYTECH: "paytech",
  STRIPE: "stripe",
  WAVE_BUSINESS: "wave_business",
  CASH: "cash",
} as const;

/**
 * Payment methods
 */
export const PAYMENT_METHODS = {
  ORANGE_MONEY: "orange_money",
  WAVE: "wave",
  FREE_MONEY: "free_money",
  VISA: "visa",
  MASTERCARD: "mastercard",
  AMEX: "amex",
  APPLE_PAY: "apple_pay",
  GOOGLE_PAY: "google_pay",
  CASH: "cash",
  INVOICE: "invoice",
} as const;

/**
 * User roles
 */
export const USER_ROLES = {
  CLIENT: "client",
  DRIVER: "driver",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
} as const;

/**
 * Driver statuses
 */
export const DRIVER_STATUS = {
  AVAILABLE: "available",
  ON_TRIP: "on_trip",
  OFFLINE: "offline",
  SUSPENDED: "suspended",
} as const;

/**
 * Routes
 */
export const ROUTES = {
  HOME: "/",
  COMMANDER: "/commander",
  RESERVATION: "/reservation",
  LOCATION: "/location",
  SERVICES: {
    TRANSFERT_AEROPORT: "/services/transfert-aeroport",
    EVENEMENTS: "/services/evenements",
  },
  ENTREPRISES: {
    INDEX: "/entreprises",
    TRAJETS_PRO: "/entreprises/trajets-pro",
    CHAUFFEUR_DISPOSITION: "/entreprises/chauffeur-disposition",
  },
  POURQUOI_SCOD: "/pourquoi-scod",
  FAQ: "/faq",
  ASSISTANCE: "/assistance",
  DEVENIR_CHAUFFEUR: "/devenir-chauffeur",
  A_PROPOS: "/a-propos",
  SUIVI: (bookingId: string) => `/suivi/${bookingId}`,
  LEGAL: {
    CGV: "/legal/cgv",
    CONFIDENTIALITE: "/legal/confidentialite",
    MENTIONS_LEGALES: "/legal/mentions-legales",
  },
  AUTH: {
    CONNEXION: "/connexion",
    INSCRIPTION: "/inscription",
  },
  DASHBOARD: {
    MON_COMPTE: "/mon-compte",
    RESERVATIONS: "/mon-compte/reservations",
    PROFIL: "/mon-compte/profil",
    PAIEMENTS: "/mon-compte/paiements",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    RESERVATIONS: "/admin/reservations",
    CHAUFFEURS: "/admin/chauffeurs",
    VEHICULES: "/admin/vehicules",
    CLIENTS: "/admin/clients",
    ENTREPRISES: "/admin/entreprises",
    PAIEMENTS: "/admin/paiements",
    CANDIDATURES: "/admin/candidatures",
  },
} as const;

/**
 * API routes
 */
export const API_ROUTES = {
  BOOKING: {
    CREATE: "/api/booking/create",
    CANCEL: "/api/booking/cancel",
    ESTIMATE: "/api/booking/estimate",
    GET: (id: string) => `/api/booking/${id}`,
  },
  PAYMENT: {
    PAYTECH: "/api/payment/paytech",
    STRIPE: "/api/payment/stripe",
    WAVE_BUSINESS: "/api/payment/wave-business",
    WEBHOOK_PAYTECH: "/api/payment/webhook/paytech",
    WEBHOOK_STRIPE: "/api/payment/webhook/stripe",
  },
  AUTH: {
    OTP_SEND: "/api/auth/otp/send",
    OTP_VERIFY: "/api/auth/otp/verify",
  },
  FLEET: "/api/fleet",
  TRACKING: (bookingId: string) => `/api/tracking/${bookingId}`,
  USER: {
    BOOKINGS: "/api/user/bookings",
    PROFILE: "/api/user/profile",
    PAYMENTS: "/api/user/payments",
  },
  DRIVER: {
    APPLY: "/api/driver/apply",
  },
  CONTACT: "/api/contact",
} as const;

/**
 * Feature flags
 */
export const FEATURES = {
  ENABLE_CASH_PAYMENT:
    process.env.NEXT_PUBLIC_ENABLE_CASH_PAYMENT === "true",
  ENABLE_APPLE_PAY: process.env.NEXT_PUBLIC_ENABLE_APPLE_PAY === "true",
  ENABLE_GOOGLE_PAY: process.env.NEXT_PUBLIC_ENABLE_GOOGLE_PAY === "true",
} as const;
