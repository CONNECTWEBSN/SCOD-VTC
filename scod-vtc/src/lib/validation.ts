import { z } from "zod";

/**
 * Validation schemas for SCOD VTC forms
 */

/**
 * Phone number validation (Senegal format)
 */
export const phoneSchema = z
  .string()
  .min(9, "Numéro de téléphone invalide")
  .regex(/^(\+221)?[0-9]{9}$/, "Format: +221XXXXXXXXX ou XXXXXXXXX");

/**
 * Email validation
 */
export const emailSchema = z
  .string()
  .email("Adresse email invalide")
  .min(1, "Email requis");

/**
 * Booking form validation
 */
export const bookingFormSchema = z.object({
  pickup: z.object({
    address: z.string().min(3, "Adresse de départ requise"),
    latitude: z.number(),
    longitude: z.number(),
    instructions: z.string().optional(),
  }),
  dropoff: z.object({
    address: z.string().min(3, "Adresse d'arrivée requise"),
    latitude: z.number(),
    longitude: z.number(),
    instructions: z.string().optional(),
  }),
  scheduledAt: z.date().min(new Date(), "La date doit être dans le futur"),
  vehicleId: z.string().uuid("Véhicule invalide"),
  passengerCount: z
    .number()
    .min(1, "Au moins 1 passager")
    .max(8, "Maximum 8 passagers"),
  luggageCount: z.number().min(0).max(10).optional(),
  passengerName: z.string().optional(),
  passengerPhone: phoneSchema.optional(),
  flightNumber: z.string().optional(),
  notes: z.string().max(500, "Maximum 500 caractères").optional(),
  options: z.record(z.boolean()).optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

/**
 * User profile validation
 */
export const userProfileSchema = z.object({
  firstName: z.string().min(2, "Prénom requis (min 2 caractères)"),
  lastName: z.string().min(2, "Nom requis (min 2 caractères)"),
  email: emailSchema.optional(),
  phone: phoneSchema,
  preferredLanguage: z.enum(["fr", "en", "wo"]),
  notificationSms: z.boolean(),
  notificationEmail: z.boolean(),
  notificationPush: z.boolean(),
});

export type UserProfileData = z.infer<typeof userProfileSchema>;

/**
 * Contact form validation
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: emailSchema,
  phone: phoneSchema.optional(),
  subject: z.string().min(3, "Sujet requis"),
  message: z
    .string()
    .min(10, "Message trop court (min 10 caractères)")
    .max(1000, "Message trop long (max 1000 caractères)"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Driver application validation
 */
export const driverApplicationSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: emailSchema,
  phone: phoneSchema,
  dateOfBirth: z.date().max(
    new Date(Date.now() - 21 * 365 * 24 * 60 * 60 * 1000),
    "Vous devez avoir au moins 21 ans"
  ),
  address: z.string().min(5, "Adresse complète requise"),
  city: z.string().min(2, "Ville requise"),
  licenseNumber: z.string().min(5, "Numéro de permis requis"),
  licenseIssueDate: z.date(),
  yearsDrivingExperience: z
    .number()
    .min(2, "Minimum 2 ans d'expérience requis"),
  hasVtcExperience: z.boolean(),
  vtcExperienceDetails: z.string().optional(),
  ownsVehicle: z.boolean(),
  vehicleBrand: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleYear: z.number().optional(),
  motivation: z
    .string()
    .min(50, "Décrivez votre motivation (min 50 caractères)")
    .max(1000, "Maximum 1000 caractères"),
  availability: z.enum(["full_time", "part_time", "weekends"]),
  preferredZones: z.array(z.string()).min(1, "Sélectionnez au moins une zone"),
  languages: z.array(z.string()).min(1, "Sélectionnez au moins une langue"),
});

export type DriverApplicationData = z.infer<typeof driverApplicationSchema>;

/**
 * OTP verification validation
 */
export const otpSchema = z.object({
  phone: phoneSchema,
  code: z.string().length(6, "Le code doit contenir 6 chiffres"),
});

export type OtpData = z.infer<typeof otpSchema>;

/**
 * Review validation
 */
export const reviewSchema = z.object({
  rating: z.number().min(1, "Note requise").max(5, "Note maximum 5"),
  comment: z
    .string()
    .min(10, "Commentaire trop court (min 10 caractères)")
    .max(500, "Commentaire trop long (max 500 caractères)")
    .optional(),
  ratingPunctuality: z.number().min(1).max(5).optional(),
  ratingCleanliness: z.number().min(1).max(5).optional(),
  ratingDriving: z.number().min(1).max(5).optional(),
  ratingCommunication: z.number().min(1).max(5).optional(),
});

export type ReviewData = z.infer<typeof reviewSchema>;
