/**
 * Booking types
 */

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "driver_assigned"
  | "driver_en_route"
  | "arrived"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show";

export type BookingType =
  | "immediate"
  | "scheduled"
  | "airport_transfer"
  | "hourly_rental"
  | "daily_rental"
  | "event";

export type BookingStep =
  | "trajet"
  | "datetime"
  | "vehicle"
  | "options"
  | "recap"
  | "payment";

export interface Location {
  address: string;
  latitude: number;
  longitude: number;
  instructions?: string;
}

export interface BookingStop extends Location {
  order: number;
}

export interface Booking {
  id: string;
  reference: string;
  userId: string;
  driverId?: string;
  vehicleId?: string;
  companyId?: string;
  bookingType: BookingType;
  pickup: Location;
  dropoff: Location;
  stops?: BookingStop[];
  scheduledAt: string;
  pickupAt?: string;
  dropoffAt?: string;
  passengerCount: number;
  luggageCount: number;
  passengerName?: string;
  passengerPhone?: string;
  estimatedDistanceKm?: number;
  estimatedDurationMin?: number;
  basePrice: number;
  distancePrice: number;
  timePrice: number;
  extrasPrice: number;
  discountAmount: number;
  discountCode?: string;
  totalPrice: number;
  currency: string;
  options?: Record<string, boolean>;
  notes?: string;
  internalNotes?: string;
  status: BookingStatus;
  cancellationReason?: string;
  cancelledBy?: string;
  cancelledAt?: string;
  flightNumber?: string;
  flightOrigin?: string;
  flightArrivalTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingFormData {
  pickup: Location;
  dropoff: Location;
  stops?: BookingStop[];
  scheduledAt: Date;
  vehicleId: string;
  passengerCount: number;
  luggageCount: number;
  passengerName?: string;
  passengerPhone?: string;
  flightNumber?: string;
  options?: Record<string, boolean>;
  notes?: string;
}

export interface BookingEstimate {
  vehicleCategory: string;
  vehicleName: string;
  distanceKm: number;
  durationMin: number;
  basePrice: number;
  totalPrice: number;
  currency: string;
}
