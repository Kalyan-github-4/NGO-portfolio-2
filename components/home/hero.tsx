import Image from "next/image";

import { Container } from "@/components/ui/container";
import {
  HeroReveal,
  HeroRevealItem,
  HeroStagger,
} from "@/components/home/hero-reveal";
import { ButtonLink } from "@/components/ui/button";
import { Heart, Play } from "@phosphor-icons/react/dist/ssr";
import { heroStats } from "@/lib/site";

/** Scattered confetti dots, positioned to echo the reference layout. */
const dots = [
  { className: "left-[40%] top-[7%] h-7 w-7 bg-accent", delay: "0s" },
  { className: "left-[45%] top-[52%] h-2.5 w-2.5 bg-dot-green", delay: "1.1s" },
  { className: "right-[6%] top-[28%] h-3 w-3 bg-dot-red", delay: "0.6s" },
  { className: "left-[56%] bottom-[14%] h-3 w-3 bg-dot-blue", delay: "1.7s" },
  { className: "left-[28%] top-[62%] h-2 w-2 bg-accent/60", delay: "2.1s" },
];

const supporters = [
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    alt: "Supporter",
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    alt: "Supporter",
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    alt: "Supporter",
  },
  {
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    alt: "Supporter",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative dots */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        {dots.map((dot) => (
          <span
            key={dot.className}
            style={{ animationDelay: dot.delay }}
            className={`absolute rounded-full ${dot.className}`}
          />
        ))}
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 pb-16 pt-10 lg:min-h-[calc(100dvh-5rem)] lg:grid-cols-[1fr_1.02fr] lg:gap-6 lg:pb-24 lg:pt-4">
          {/* ---------------- Copy ---------------- */}
          <HeroStagger className="order-2 max-w-xl lg:order-1">
            <HeroRevealItem className="mt-6">
              <h1 className="font-display text-[clamp(2.25rem,4.8vw,3.6rem)] leading-[1.08] tracking-[-0.03em] text-ink">
                Building Hope.
                <br />
                Creating <span className="text-accent">Change.</span>
                <br />
                Transforming Lives.
              </h1>
            </HeroRevealItem>

            <HeroRevealItem className="mt-6">
              <p className="max-w-md text-[17px] leading-relaxed text-muted font-semibold">
                Together, we can build a world where every child has the
                opportunity to live, learn, and thrive.
              </p>
            </HeroRevealItem>

            <HeroRevealItem className="mt-9 flex flex-wrap items-center gap-3.5">
              <ButtonLink href="/donate" variant="primary" size="lg" className="rounded-xl">
                <Heart className="h-4.5 w-4.5" />
                Donate Now
              </ButtonLink>

              <ButtonLink href="/impact" variant="explore" size="lg" className="rounded-xl">
                Explore Our Work
                <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-white">
                  <Play className="h-3.5 w-3.5" weight="fill" />
                </span>
              </ButtonLink>
            </HeroRevealItem>

            {/* Social proof */}
            <HeroRevealItem className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {supporters.map((person) => (
                  <div
                    key={person.image}
                    className="relative h-11 w-11 overflow-hidden rounded-full ring-3 ring-cream"
                  >
                    <Image
                      src={person.image}
                      alt={person.alt}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted">
                Join{" "}
                <span className="font-bold text-ink">
                  {heroStats.supporters}
                </span>{" "}
                {heroStats.supportersLabel}
              </p>
            </HeroRevealItem>
          </HeroStagger>

          {/* ---------------- Artwork ---------------- */}
          <HeroReveal from="right" className="order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-140 lg:max-w-none">
              <Image
                src="/india-3-webp.webp"
                alt="A map of India filled with a photograph of smiling children"
                width={500}
                height={500}
                priority
                sizes="(max-width: 1024px) 90vw, 46vw"
                className="h-auto w-full"
              />
            </div>
          </HeroReveal>
        </div>
      </Container>
    </section>
  );
}
