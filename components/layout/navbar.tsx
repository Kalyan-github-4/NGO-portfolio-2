"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import {
  CaretDown,
  X,
  Heart,
  List,
  Phone,
  MagnifyingGlass,
  User,
} from "@phosphor-icons/react";
import { navLinks, site, type NavLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Window scroll position is an external store, so subscribe to it directly
 * rather than mirroring it into state from an effect.
 */
const subscribeToScroll = (onStoreChange: () => void) => {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
};
const hasScrolled = () => window.scrollY > 8;
const hasScrolledOnServer = () => false;

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    hasScrolled,
    hasScrolledOnServer,
  );

  // Close the mobile sheet whenever the route changes. Adjusting state during
  // render is React's recommended alternative to setState inside an effect —
  // it re-renders before the browser paints, with no cascading commit.
  const [sheetPathname, setSheetPathname] = useState(pathname);
  if (pathname !== sheetPathname) {
    setSheetPathname(pathname);
    setMobileOpen(false);
  }

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (link: NavLink) =>
    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-shadow duration-300",
        scrolled
          ? "bg-cream/85 shadow-[0_1px_0_0_var(--color-line),0_8px_24px_-20px_rgba(20,17,15,0.6)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
        <nav className="flex h-20 items-center justify-between gap-6 w-full px-10">
          <Logo />

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-3 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label} className="group relative">
                <Link
                  href={link.href}
                  className={cn(
                    "relative flex items-center gap-1 rounded-full px-3 py-2 text-[15px] font-medium transition-colors",
                    isActive(link)
                      ? "text-brand"
                      : "text-ink/75 hover:text-brand",
                  )}
                >
                  {link.label}
                  {link.children && (
                    <CaretDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                  <span
                    className={cn(
                      "absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand transition-transform duration-300",
                      isActive(link)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>

                {link.children && (
                  <div className="invisible absolute left-0 top-full z-50 w-60 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <ul className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-[0_24px_60px_-24px_rgba(20,17,15,0.35)]">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink/80 transition-colors hover:bg-brand-tint hover:text-brand"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right-hand actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-1 pr-1 text-sm font-semibold text-ink transition-colors hover:text-brand xl:flex"
            >
              <span className="grid h-10 w-10 place-items-center text-accent">
                <Phone className="h-4 w-4" weight="fill"/>
              </span>
              {site.phone}
            </a>

            <button
              type="button"
              aria-label="Search"
              className="hidden h-10 w-10 place-items-center rounded-full text-ink/70 transition-colors hover:bg-black/5 hover:text-brand sm:grid"
            >
              <MagnifyingGlass className="h-5 w-5" />
            </button>

            <Link
              href="/login"
              aria-label="Sign in"
              className="hidden h-10 w-10 place-items-center rounded-full text-ink/70 transition-colors hover:bg-black/5 hover:text-brand sm:grid"
            >
              <User className="h-5 w-5" />
            </Link>

            <ButtonLink href="/donate" variant="accent" className="hidden sm:inline-flex rounded-full">
              <Heart className="h-4 w-4" />
              Donate Now
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="grid h-11 w-11 place-items-center text-ink lg:hidden"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <List className="h-7 w-7" />
              )}
            </button>
          </div>
        </nav>


      {/* Mobile sheet */}
      <div
        className={cn(
          "fixed inset-x-0 top-20 z-40 origin-top overflow-y-auto border-t border-line bg-cream px-5 pb-8 pt-4 transition-all duration-300 lg:hidden",
          mobileOpen
            ? "max-h-[calc(100dvh-5rem)] opacity-100"
            : "pointer-events-none max-h-0 -translate-y-2 opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  "block rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                  isActive(link)
                    ? "bg-brand-tint text-brand"
                    : "text-ink hover:bg-black/5",
                )}
              >
                {link.label}
              </Link>
              {link.children && (
                <ul className="mb-1 ml-4 border-l border-line pl-3">
                  {link.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-brand"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-col gap-3">
          <ButtonLink href="/donate" variant="accent" size="lg">
            <Heart className="h-4 w-4" />
            Donate Now
          </ButtonLink>
          <ButtonLink href="/login" variant="outline" size="lg">
            <User className="h-4 w-4" />
            Sign in
          </ButtonLink>
          <a
            href={site.phoneHref}
            className="mt-1 flex items-center justify-center gap-2 text-sm font-semibold text-muted"
          >
            <Phone className="h-4 w-4 text-accent" />
            {site.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
