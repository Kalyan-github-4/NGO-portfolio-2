import { fees } from "@/lib/site";

export type FeeBreakdown = {
  /** What the donor entered. */
  donationAmount: number;
  /** What the donor is actually charged (includes fees if they cover them). */
  chargedAmount: number;
  platformFee: number;
  paymentGatewayFee: number;
  gst: number;
  totalFees: number;
  /** What lands in the NGO's account. */
  ngoReceives: number;
  /** Share of the donation the NGO keeps, e.g. 94.7 */
  ngoReceivesPercent: number;
  donorCoveredFees: boolean;
};

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Single source of truth for the fee split. Both the donation checkout and the
 * NGO/donor dashboards must render numbers from here — never recompute inline.
 */
export function calculateFees(
  donationAmount: number,
  donorCoversFees = false,
): FeeBreakdown {
  const platformFee = round2((donationAmount * fees.platformFeePercent) / 100);
  const paymentGatewayFee = round2(
    (donationAmount * fees.paymentGatewayFeePercent) / 100,
  );
  const gst = round2(
    ((platformFee + paymentGatewayFee) * fees.gstOnFeesPercent) / 100,
  );
  const totalFees = round2(platformFee + paymentGatewayFee + gst);

  const ngoReceives = donorCoversFees
    ? donationAmount
    : round2(donationAmount - totalFees);
  const chargedAmount = donorCoversFees
    ? round2(donationAmount + totalFees)
    : donationAmount;

  return {
    donationAmount,
    chargedAmount,
    platformFee,
    paymentGatewayFee,
    gst,
    totalFees,
    ngoReceives,
    ngoReceivesPercent: donationAmount
      ? round2((ngoReceives / donationAmount) * 100)
      : 0,
    donorCoveredFees: donorCoversFees,
  };
}

/**
 * Indian-format currency. Pass `decimals: 0` for display figures such as
 * campaign totals; keep the default for anything money-exact like receipts.
 */
export function formatINR(amount: number, decimals = 2) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(amount);
}
