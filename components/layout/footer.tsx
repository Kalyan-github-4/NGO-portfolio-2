import Link from "next/link";
import {
  CaretRight,
  Clock,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  Phone,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";

import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { site, socialLinks } from "@/lib/site";

const socialIcons = {
  Facebook: FacebookLogo,
  X: XLogo,
  Instagram: InstagramLogo,
  LinkedIn: LinkedinLogo,
  YouTube: YoutubeLogo,
} as const;

const linkGroups = [
  {
    title: "Quick Links",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Programs", href: "/programs" },
      { label: "Our Impact", href: "/impact" },
      { label: "Get Involved", href: "/volunteer" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Our Causes",
    links: [
      { label: "Education", href: "/programs/education" },
      { label: "Healthcare", href: "/programs/healthcare" },
      { label: "Clean Water", href: "/programs/clean-water" },
      { label: "Food & Nutrition", href: "/programs/nutrition" },
      { label: "Child Protection", href: "/programs/child-protection" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Donate Now", href: "/donate" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Fundraise", href: "/fundraise" },
      { label: "Partner With Us", href: "/partner" },
      { label: "FAQs", href: "/faq" },
    ],
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Sitemap", href: "/sitemap" },
];

export function Footer() {
  // Baked in at build time for statically prerendered pages — a rebuild
  // refreshes it, which is fine for a copyright line.
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand text-white/70">
      <Container>
        <Reveal className="grid gap-10 pt-10 pb-6 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr] lg:gap-8">
          {/* ---------------- Brand ---------------- */}
          <RevealItem>
            <Logo tone="light" />

            <p className="mt-5 max-w-60 text-[13px] leading-relaxed">
              We are committed to creating a better world for children and
              communities in need.
            </p>

            <ul className="mt-6 flex items-center">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.label];

                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid h-9 w-9 place-items-center text-white"
                    >
                      <Icon className="h-5 w-5"/>
                    </a>
                  </li>
                );
              })}
            </ul>
          </RevealItem>

          {/* ---------------- Link groups ---------------- */}
          {linkGroups.map((group) => (
            <RevealItem as="nav" key={group.title} aria-label={group.title}>
              <h2 className="font-display text-[16px] text-white">
                {group.title}
              </h2>

              <ul className="mt-5 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-[13px] transition-colors hover:text-white"
                    >
                      <CaretRight
                        className="h-3 w-3 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-0.5"
                        weight="bold"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}

          {/* ---------------- Contact ---------------- */}
          <RevealItem>
            <h2 className="font-display text-[16px] text-white">Contact Us</h2>

            <ul className="mt-5 space-y-3.5 text-[13px]">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center">
                  <MapPin className="h-4 w-4 text-white" />
                </span>
                <address className="not-italic leading-relaxed">
                  {site.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>

              <li className="flex items-center gap-2.5">
                <span className="grid h-6 w-6 shrink-0 place-items-center ">
                  <Phone className="h-4 w-4 text-white" weight="fill" />
                </span>
                <a
                  href={site.phoneHref}
                  className="transition-colors hover:text-white"
                >
                  {site.phone}
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <span className="grid h-6 w-6 shrink-0 place-items-center ">
                  <EnvelopeSimple className="h-4 w-4 text-white" />
                </span>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <span className="grid h-6 w-6 shrink-0 place-items-center ">
                  <Clock className="h-4 w-4 text-white" />
                </span>
                {site.officeHours}
              </li>
            </ul>
          </RevealItem>
        </Reveal>
      </Container>

      {/*
        ---------------- Bottom bar ----------------

        The bar is the last content on the page, so the offset it rises from
        would extend the document past the footer's painted box and expose a
        strip of the body's cream ground beneath it. The clip that contains
        that offset has to sit *inside* the scroll trigger: an
        IntersectionObserver clips its target against every ancestor, so a
        `Reveal` that clipped its own moving content would have nothing left
        to intersect and would never fire at all.
      */}
      <Reveal className="relative z-10 border-t border-white/10">
        <div className="overflow-clip">
          <Container>
            <RevealItem className="flex flex-col items-center gap-5 py-2 lg:flex-row lg:justify-between">
              <p className="text-[12.5px]">
                © {year} {site.legalName}. All rights reserved.
              </p>

              <ul className="flex flex-wrap items-center justify-center gap-x-9 gap-y-2 text-[12.5px]">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <ButtonLink
                href="/donate"
                variant="accent"
                className="rounded-full"
              >
                Donate Now
              </ButtonLink>
            </RevealItem>
          </Container>
        </div>
      </Reveal>
    </footer>
  );
}
