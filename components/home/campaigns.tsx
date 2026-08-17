import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Drop,
  ForkKnife,
  GraduationCap,
  Heart,
} from "@phosphor-icons/react/dist/ssr";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { formatINR } from "@/lib/fees";

type Campaign = {
  slug: string;
  title: string;
  raised: number;
  goal: number;
  /**
   * Real photo of the campaign. Leave undefined and the card falls back to a
   * branded banner — better an honest placeholder than stock photography
   * standing in for a specific fundraiser.
   */
  image?: string;
  imageAlt?: string;
  /** Used by the fallback banner. */
  icon: typeof Heart;
};

const campaigns: Campaign[] = [
  {
    slug: "build-schools",
    title: "Build Schools for Rural India",
    raised: 2500000,
    goal: 5000000,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Children learning together in a classroom",
    icon: GraduationCap,
  },
  {
    slug: "clean-water-for-all",
    title: "Clean Water for All",
    raised: 1800000,
    goal: 4000000,
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Clean water flowing from a tap",
    icon: Drop,
  },
  {
    slug: "feed-a-child",
    title: "Feed a Child",
    raised: 1230000,
    goal: 3000000,
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Children receiving support",
    icon: ForkKnife,
  },
];

export function Campaigns() {
  return (
    <section className="bg-cream pb-20 pt-4 lg:pb-24">
      <Container>
        <SectionHeading
          eyebrow="Featured Campaigns"
          title="Support Our Current Campaigns"
          subtitle="Your support can bring hope and change to those who need it most."
        />

        <ul className="mt-11 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => {
            const percent = Math.min(
              100,
              Math.round((campaign.raised / campaign.goal) * 100),
            );
            const Icon = campaign.icon;

            return (
              <li
                key={campaign.slug}
                className="group overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1"
              >
                {/* Banner */}
                <div className="relative h-48 overflow-hidden bg-brand-tint">
                  {campaign.image ? (
                    <>
                      <Image
                        src={campaign.image}
                        alt={campaign.imageAlt ?? campaign.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                    </>
                  ) : (
                    <div className="grid h-full place-items-center bg-[linear-gradient(135deg,var(--color-brand-tint),var(--color-accent-tint))]">
                      <Icon
                        className="h-12 w-12 text-brand/35"
                        weight="duotone"
                      />
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="font-display text-[17px] leading-snug text-ink">
                    {campaign.title}
                  </h3>

                  <div className="mt-4 flex items-baseline justify-between text-[12.5px]">
                    <span className="text-muted">
                      Raised:{" "}
                      <span className="font-semibold text-ink">
                        {formatINR(campaign.raised, 0)}
                      </span>
                    </span>
                    <span className="text-muted">
                      Goal:{" "}
                      <span className="font-semibold text-ink">
                        {formatINR(campaign.goal, 0)}
                      </span>
                    </span>
                  </div>

                  {/* Progress */}
                  <div
                    role="progressbar"
                    aria-valuenow={percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${campaign.title}: ${percent}% of goal raised`}
                    className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-line/70"
                  >
                    <div
                      style={{ width: `${percent}%` }}
                      className="h-full rounded-full bg-linear-to-r from-brand to-accent"
                    />
                  </div>

                  <div className="mt-5 flex justify-center">
                    <ButtonLink
                      href={`/donate?campaign=${campaign.slug}`}
                      variant="accent"
                      size="sm"
                    >
                      <Heart className="h-4 w-4"/>
                      Donate Now
                    </ButtonLink>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="/campaigns"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-ink transition-colors hover:text-accent"
          >
            View All Campaigns
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
