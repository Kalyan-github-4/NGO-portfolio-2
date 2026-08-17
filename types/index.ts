/**
 * Shared domain types. These describe the shapes the UI expects; the database
 * schema and API layer will be built against them.
 */

export type UserRole = "donor" | "ngo_admin" | "platform_admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
};

export type NgoStatus = "pending" | "verified" | "suspended" | "rejected";

export type Ngo = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logoUrl?: string;
  coverImageUrl?: string;
  city: string;
  state: string;
  status: NgoStatus;
  /** Indian NGO compliance identifiers. */
  registrationNumber: string;
  pan?: string;
  has80G: boolean;
  has12A: boolean;
  hasFCRA: boolean;
  createdAt: string;
};

export type Cause = {
  id: string;
  ngoId: string;
  slug: string;
  title: string;
  summary: string;
  imageUrl?: string;
  goalAmount: number;
  raisedAmount: number;
  category: string;
  isActive: boolean;
};

export type DonationStatus =
  | "created"
  | "pending"
  | "succeeded"
  | "failed"
  | "refunded";

export type Donation = {
  id: string;
  donorId: string;
  ngoId: string;
  causeId?: string;
  /** Gross amount the donor pledged, in INR. */
  amount: number;
  /** Amount actually captured by the gateway. */
  chargedAmount: number;
  donorCoveredFees: boolean;
  platformFee: number;
  paymentGatewayFee: number;
  gst: number;
  ngoReceives: number;
  status: DonationStatus;
  isAnonymous: boolean;
  gatewayPaymentId?: string;
  receiptNumber?: string;
  createdAt: string;
};

export type Receipt = {
  id: string;
  donationId: string;
  receiptNumber: string;
  issuedAt: string;
  pdfUrl: string;
  /** Set when the NGO has 80G status and the receipt is tax-deductible. */
  is80GEligible: boolean;
};
