/**
 * Central site configuration.
 *
 * Everything that is brand- or copy-specific lives here so the rest of the UI
 * stays generic. Change the name/phone once and it updates everywhere.
 */

export const site = {
  name: "HopeBridge",
  legalName: "HopeBridge Foundation",
  tagline: "Foundation",
  description:
    "A transparent donation platform connecting verified Indian NGOs with donors who want to see exactly where every rupee goes.",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  email: "hello@hopebridge.org",
  /** Placeholder registered address — replace with the real one. */
  addressLines: ["12 Hope Street, Andheri East", "Mumbai 400069, India"],
  officeHours: "Mon – Fri, 9 AM – 6 PM",
} as const;

export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "X", href: "https://x.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
] as const;

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Causes", href: "/causes" },
  { label: "NGOs", href: "/ngos" },
  { label: "Impact", href: "/impact" },
  { label: "Blog", href: "/blog" },
  {
    label: "Pages",
    href: "#",
    children: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Fee structure", href: "/fees" },
      { label: "Register your NGO", href: "/ngo/register" },
      { label: "Donor dashboard", href: "/dashboard" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/**
 * The transparent fee model — a core promise of the platform, so it is defined
 * in one place and rendered verbatim to both donors and NGOs.
 *
 * All percentages are of the gross donation amount unless noted.
 */
export const fees = {
  /** Saath's own commission for running the platform. */
  platformFeePercent: 2.5,
  /** Passed through from the payment gateway (typical Indian card/UPI rate). */
  paymentGatewayFeePercent: 2,
  /** GST charged by the government on the fees above (not on the donation). */
  gstOnFeesPercent: 18,
  /** Donors may opt to cover all fees so the NGO receives 100%. */
  donorCanCoverFees: true,
} as const;

export const heroStats = {
  supporters: "25,000+",
  supportersLabel: "supporters across India",
} as const;
