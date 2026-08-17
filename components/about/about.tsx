import Image from "next/image";
import { CheckCircle, Play } from "@phosphor-icons/react/dist/ssr";

import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

/**
 * Placeholder stock photography — replace with your own programme photos
 * (shot with the subjects' consent) before launch. Local files in
 * `public/about/` need no `remotePatterns` entry in next.config.ts.
 */
const photos = {
  main: {
    src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&h=900&fit=crop",
    alt: "A child supported by one of our education programmes",
  },
  upper: {
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=500&fit=crop",
    alt: "Children gathered outside a community learning centre",
  },
  lower: {
    src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&h=500&fit=crop",
    alt: "Families reached by our clean water programme",
  },
};

const commitments = [
  "Education for every child",
  "Clean water and sanitation",
  "Healthcare and nutrition",
  "Emergency relief and support",
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* ---------------- Photo cluster ---------------- */}
          <div className="relative mx-auto w-full max-w-135">
            {/* Dotted world-map backdrop. Sits at z-0 rather than -z-10: a
                negative index would drop it behind the page's own background
                and make it disappear. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
              style={{
                maskImage:
                  "radial-gradient(ellipse 85% 80% at 50% 50%, #000 55%, transparent 95%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 85% 80% at 50% 50%, #000 55%, transparent 95%)",
              }}
            >
              <Image
                src="/earth-map.png"
                alt=""
                width={707}
                height={353}
                sizes="(max-width: 1024px) 110vw, 55vw"
                className="w-[175%] max-w-none opacity-70"
              />
            </div>

            {/* Decorative dots */}
            <span
              aria-hidden="true"
              className="absolute left-[6%] top-[14%] z-10 h-4 w-4 rounded-full bg-accent"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-[16%] right-[4%] z-10 h-3.5 w-3.5 rounded-full bg-dot-green"
            />

            {/* Aspect box keeps the circles locked together as it scales */}
            <div className="relative z-10 aspect-square">
              {/* Main portrait */}
              <div className="absolute left-[12%] top-[6%] h-[76%] w-[76%] overflow-hidden rounded-full ring-8 ring-white shadow-[0_30px_60px_-30px_rgba(20,17,15,0.5)]">
                <Image
                  src={photos.main.src}
                  alt={photos.main.alt}
                  fill
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  className="object-cover"
                />
              </div>

              {/* Upper-right circle */}
              <div className="absolute right-0 top-[16%] h-[34%] w-[34%] overflow-hidden rounded-full ring-6 ring-white shadow-[0_20px_40px_-24px_rgba(20,17,15,0.5)]">
                <Image
                  src={photos.upper.src}
                  alt={photos.upper.alt}
                  fill
                  sizes="(max-width: 1024px) 26vw, 13vw"
                  className="object-cover"
                />
              </div>

              {/* Lower-left circle */}
              <div className="absolute bottom-[6%] left-0 h-[26%] w-[26%] overflow-hidden rounded-full ring-6 ring-white shadow-[0_20px_40px_-24px_rgba(20,17,15,0.5)]">
                <Image
                  src={photos.lower.src}
                  alt={photos.lower.alt}
                  fill
                  sizes="(max-width: 1024px) 20vw, 10vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* ---------------- Copy ---------------- */}
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              About Us
            </p>

            <h2 className="mt-4 font-display text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.15] tracking-[-0.02em] text-ink">
              Empowering Communities.
              <br />
              Inspiring Change.
            </h2>

            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted">
              {site.legalName} is a non-profit organization dedicated to
              improving the lives of vulnerable children and communities across
              India.
            </p>

            <ul className="mt-7 space-y-3.5">
              {commitments.map((commitment) => (
                <li key={commitment} className="flex items-center gap-3">
                  <CheckCircle
                    className="h-5 w-5 shrink-0 text-accent"
                    weight="fill"
                  />
                  <span className="text-[15px] text-ink/80">{commitment}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <ButtonLink href="/about" variant="primary" className="rounded-xl px-7 py-4 disabled:opacity-60">
                Learn More
              </ButtonLink>

              <ButtonLink href="/story" variant="explore" className="rounded-xl">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-white">
                  <Play className="h-3.5 w-3.5" weight="fill" />
                </span>
                Watch Our Story
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
