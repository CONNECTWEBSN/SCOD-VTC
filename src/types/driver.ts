/**
 * Driver types
 */

export type DriverStatus = "available" | "on_trip" | "offline" | "suspended";

export interface Driver {
  id: string;
  userId: string;
  licenseNumber: string;
  licenseExpiry: string;
  vtcCardNumber: string;
  vtcCardExpiry: string;
  vehicleId?: string;
  totalTrips: number;
  ratingAverage: number;
  ratingCount: number;
  yearsExperience: number;
  languages: string[];
  currentLatitude?: number;
  currentLongitude?: number;
  lastLocationUpdate?: string;
  status: DriverStatus;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DriverWithUser extends Driver {
  user: {
    firstName: string;
    lastName: string;
    phone: string;
    avatarUrl?: string;
  };
  vehicle?: {
    brand: string;
    model: string;
    color: string;
    licensePlate: string;
    imageUrl: string;
  };
}

export interface DriverLocation {
  driverId: string;
  latitude: number;
  longitude: number;
  heading: number;
  speed: number;
  etaMinutes: number;
  timestamp: string;
}
