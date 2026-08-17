# Saath — NGO Donation Platform

A transparent donation platform connecting verified Indian NGOs with donors.

## Scope

| # | Feature | Status |
| - | ------- | ------ |
| 1 | NGO profile and registration | planned |
| 2 | Online donation collection | planned |
| 3 | Payment gateway integration | planned |
| 4 | Automated donation receipts | planned |
| 5 | Donor dashboard and donation history | planned |
| 6 | NGO admin dashboard | planned |
| 7 | Donation tracking and reporting | planned |
| 8 | Fully responsive UI | in progress |
| 9 | Secure backend and database | planned |
| 10 | Transparent service fee / commission model | fee math done (`lib/fees.ts`), UI planned |

### Fee transparency

The complete fee structure must be visible to **both** donors and NGOs — in the
donation checkout, on the receipt, and in both dashboards. All numbers come from
`calculateFees()` in [lib/fees.ts](lib/fees.ts); rates live in `fees` in
[lib/site.ts](lib/site.ts). Never recompute a fee inline.

Current model: 2.5% platform fee + 2% payment gateway fee + 18% GST on those
fees. Donors can optionally cover fees so the NGO receives 100%.

## Current structure

```
my-app/
├── app/
│   ├── layout.tsx          # root layout, fonts, metadata
│   ├── page.tsx            # home page (Navbar + Hero)
│   └── globals.css         # Tailwind v4 theme tokens
├── components/
│   ├── layout/
│   │   ├── logo.tsx
│   │   └── navbar.tsx      # sticky nav + mobile sheet (client component)
│   ├── home/
│   │   └── hero.tsx
│   └── ui/
│       ├── button.tsx      # Button / ButtonLink, 4 variants
│       ├── container.tsx
│       └── icons.tsx       # dependency-free inline SVGs
├── lib/
│   ├── site.ts             # brand config, nav links, fee rates
│   ├── fees.ts             # fee breakdown math + INR formatting
│   └── utils.ts            # cn()
├── types/
│   └── index.ts            # User, Ngo, Cause, Donation, Receipt
└── public/
    └── india.png           # hero artwork
```

## Planned structure

```
app/
├── (marketing)/            # about, causes, ngos, impact, blog, contact, fees
├── donate/                 # donation checkout + fee breakdown
├── ngo/
│   ├── register/           # NGO onboarding + KYC upload
│   └── [slug]/             # public NGO profile
├── (auth)/login, /signup
├── dashboard/              # donor: history, receipts, recurring gifts
├── admin/                  # NGO admin: donations, payouts, reports
└── api/
    ├── donations/
    ├── webhooks/razorpay/  # payment confirmation (verify signature!)
    └── receipts/

lib/
├── db/                     # schema + client
├── auth/                   # sessions, RBAC
├── payments/               # gateway client, signature verification
└── receipts/               # PDF generation + email
```

## Conventions

- Next.js 16 App Router, React 19, TypeScript, Tailwind v4. No `src/` folder.
- Read `node_modules/next/dist/docs/` before using an unfamiliar Next API —
  this Next version has breaking changes (see `AGENTS.md`).
- Server Components by default; add `"use client"` only where interactivity
  requires it.
- Design tokens (`brand`, `accent`, `cream`, `ink`, `muted`, `line`) are defined
  in `app/globals.css` — use them instead of raw hex or stock Tailwind colors.

## Notes / open questions

- **Brand name is a placeholder.** "Saath" and the phone number in
  `lib/site.ts` are stand-ins; change them in that one file.
- Payment gateway not chosen yet (Razorpay assumed for the fee rates).
