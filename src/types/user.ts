/**
 * User types
 */

export type UserRole = "client" | "driver" | "admin" | "super_admin";

export interface User {
  id: string;
  email?: string;
  phone: string;
  phoneVerified: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  role: UserRole;
  preferredLanguage: string;
  preferredPaymentMethod?: string;
  notificationSms: boolean;
  notificationEmail: boolean;
  notificationPush: boolean;
  companyId?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  isActive: boolean;
}

export interface UserPreferences {
  language: string;
  currency: string;
  notifications: {
    sms: boolean;
    email: boolean;
    push: boolean;
  };
  defaultPaymentMethod?: string;
  savedAddresses?: Array<{
    id: string;
    label: string;
    address: string;
    latitude: number;
    longitude: number;
  }>;
}

export interface UserWithCompany extends User {
  company?: {
    id: string;
    name: string;
    plan: string;
  };
}
