import Image from "next/image";
import { ArrowRight, UsersThree } from "@phosphor-icons/react/dist/ssr";

import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealItem } from "@/components/ui/reveal";

const volunteerPhoto:
  | {
      src: string;
      alt: string;
      width: number;
      height: number;
    }
  | undefined = {
  src: "/volunteer.png",
  alt: "Volunteers in branded t-shirts smiling and waving",
  width: 937,
  height: 266,
};

export function VolunteerCTA() {
  return (
    <section className="bg-cream">
      <Container>
        <div className="relative overflow-hidden rounded-t-2xl bg-[linear-gradient(105deg,var(--color-accent-tint),#f7ece1)]">
          <div className="relative grid min-h-[250px] md:grid-cols-[40%_60%] lg:min-h-[275px]">
            {/* Copy */}
            <Reveal className="relative z-10 flex flex-col justify-center px-6 py-6 lg:px-8 lg:py-7">
              <RevealItem
                as="p"
                className="text-xs font-bold uppercase tracking-[0.2em] text-accent"
              >
                Become a Volunteer
              </RevealItem>

              <RevealItem as="h2" className="mt-2.5 font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] tracking-[-0.02em] text-ink">
                Be the Change.
                <br />
                Volunteer Today!
              </RevealItem>

              <RevealItem
                as="p"
                className="mt-3 max-w-sm text-[13px] leading-relaxed text-muted"
              >
                Join our community of volunteers and make a difference in
                someone&apos;s life.
              </RevealItem>

              <RevealItem className="mt-5 w-fit">
                <ButtonLink
                  href="/volunteer"
                  variant="primary"
                  className="group rounded-xl"
                >
                  Explore Opportunities
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </ButtonLink>
              </RevealItem>
            </Reveal>

            {/* Image — 60% column */}
            <Reveal
              from="right"
              className="relative min-h-[210px] self-stretch overflow-visible md:min-h-0"
            >
              {/* Dotted world-map backdrop, same asset as the About section */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
                style={{
                  maskImage:
                    "radial-gradient(ellipse 80% 75% at 50% 55%, #000 50%, transparent 92%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 80% 75% at 50% 55%, #000 50%, transparent 92%)",
                }}
              >
                <Image
                  src="/earth-map.png"
                  alt=""
                  width={707}
                  height={353}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="w-[115%] max-w-none opacity-60"
                />
              </div>

              {volunteerPhoto ? (
                <Image
                  src={volunteerPhoto.src}
                  alt={volunteerPhoto.alt}
                  width={volunteerPhoto.width}
                  height={volunteerPhoto.height}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="absolute bottom-0 left-1/2 z-10 h-auto w-[127%] max-w-none -translate-x-1/2"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="grid h-full w-full place-items-center"
                >
                  <UsersThree
                    className="h-20 w-20 text-brand/20"
                    weight="duotone"
                  />
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}