/**
 * Vehicle types
 */

export type VehicleCategory = "berline" | "suv" | "luxe" | "van" | "pmr";

export type VehicleStatus = "available" | "in_use" | "maintenance" | "retired";

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  category: VehicleCategory;
  passengerCapacity: number;
  luggageCapacity: number;
  hasWifi: boolean;
  hasWater: boolean;
  hasCharger: boolean;
  hasChildSeat: boolean;
  isWheelchairAccessible: boolean;
  imageUrl: string;
  galleryUrls?: string[];
  basePricePerKm: number;
  minPrice: number;
  hourlyRate?: number;
  dailyRate?: number;
  status: VehicleStatus;
  currentDriverId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleWithDriver extends Vehicle {
  driver?: {
    id: string;
    name: string;
    photoUrl?: string;
    rating: number;
    totalTrips: number;
  };
}
