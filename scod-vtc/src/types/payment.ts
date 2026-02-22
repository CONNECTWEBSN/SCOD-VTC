/**
 * Payment types
 */

export type PaymentStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "refunded"
  | "partially_refunded";

export type PaymentProvider = "paytech" | "stripe" | "wave_business" | "cash";

export type PaymentMethod =
  | "orange_money"
  | "wave"
  | "free_money"
  | "visa"
  | "mastercard"
  | "amex"
  | "apple_pay"
  | "google_pay"
  | "cash"
  | "invoice";

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  companyId?: string;
  amount: number;
  currency: string;
  provider: PaymentProvider;
  method: PaymentMethod;
  providerPaymentId?: string;
  providerTransactionId?: string;
  status: PaymentStatus;
  errorCode?: string;
  errorMessage?: string;
  refundAmount?: number;
  refundReason?: string;
  refundedAt?: string;
  providerMetadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface PaymentMethodInfo {
  id: string;
  type: PaymentMethod;
  provider: PaymentProvider;
  label: string;
  lastFour?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  metadata?: Record<string, unknown>;
}

export interface PaymentIntent {
  paymentId: string;
  clientSecret?: string;
  paymentUrl?: string;
  status: PaymentStatus;
}
