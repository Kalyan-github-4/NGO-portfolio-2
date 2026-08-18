import { ArrowLeft, Heart, Wrench } from "@phosphor-icons/react/dist/ssr";

import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

/**
 * Placeholder body for routes that are linked from the nav/footer but not
 * built yet. Rendered instead of a 404 so the site never dead-ends a visitor —
 * the page keeps its navbar and footer and simply says the section is coming.
 */
export function UnderConstruction({
  title,
  showDonate = true,
}: {
  title?: string;
  /** Hidden on the donate placeholder itself, so the CTA never self-links. */
  showDonate?: boolean;
}) {
  return (
    <section className="bg-cream">
      <Container>
        <div className="mx-auto flex min-h-[62vh] max-w-xl flex-col items-center justify-center py-20 text-center">
          {/* Decorative confetti dots, echoing the marketing sections. */}
          <div aria-hidden="true" className="mb-7 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-dot-red" />
            <span className="h-2 w-2 rounded-full bg-dot-blue" />
            <span className="h-2 w-2 rounded-full bg-dot-green" />
          </div>

          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-accent-tint text-accent">
            <Wrench className="h-7 w-7" weight="fill" />
          </span>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Coming soon
          </p>

          <h1 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.18] tracking-[-0.02em] text-ink">
            {title ? `${title} is under construction` : "This section is under construction"}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            We&apos;re still building this page. Everything else on the site
            works as usual — head back home, or support a verified NGO right
            now.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/" variant="outline" className="group rounded-xl">
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to home
            </ButtonLink>

            {showDonate && (
              <ButtonLink href="/donate" variant="accent" className="rounded-xl">
                <Heart className="h-4 w-4" />
                Donate Now
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
