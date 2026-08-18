import Image from "next/image";
import {
  Buildings,
  Globe,
  HandCoins,
  HandHeart,
  HandsClapping,
  Medal,
  PresentationChart,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";

import { Container } from "@/components/ui/container";
import { fees } from "@/lib/site";

const values = [
  {
    icon: Globe,
    title: "Transparent",
    description: `Every rupee is traceable, and our ${fees.platformFeePercent}% fee is shown before you give.`,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
  },
  {
    icon: PresentationChart,
    title: "Accountable",
    description: "We answer to our donors and to the communities we serve.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85",
  },
  {
    icon: HandHeart,
    title: "Community Driven",
    description: "Local solutions, built for lasting and sustainable change.",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=85",
  },
  {
    icon: Medal,
    title: "Proven Impact",
    description: "Measurable results, reported back to you every quarter.",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=85",
  },
];

const stats = [
  { icon: UsersThree, value: "2.4M+", label: "Lives Impacted" },
  { icon: Buildings, value: "1,200+", label: "Communities Reached" },
  { icon: HandsClapping, value: "3,500+", label: "Volunteers Engaged" },
  { icon: HandCoins, value: "₹92Cr+", label: "Funds Raised" },
];

export function Values() {
  return (
    <section className="relative overflow-hidden py-14 lg:py-20">
      {/* Warm wash behind the band */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent,rgba(245,133,31,0.06)_45%,transparent)]"
      />

      <Container>
        {/* ---------------- Value cards ---------------- */}
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {values.map(
            ({ title, description, image }) => (
              <li
                key={title}
                className="group relative aspect-4/5 overflow-hidden rounded-2xl bg-ink"
              >
                {/* Image */}
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/5" />

                {/* Context */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-[20px] text-white">
                    {title}
                  </h3>

                  <p className="mt-2 text-[13px] leading-relaxed text-white/80">
                    {description}
                  </p>
                </div>
              </li>
            ),
          )}
        </ul>

        {/* ---------------- Stats strip ---------------- */}
        <dl className="mt-6 grid gap-8 rounded-2xl bg-[linear-gradient(100deg,var(--color-accent-tint),rgba(253,238,220,0.35))] px-8 py-9 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:gap-4 lg:px-10">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-4 lg:justify-start"
            >
              <Icon
                className="h-10 w-10 shrink-0 text-accent"
                weight="duotone"
              />

              <div>
                <dd className="font-display text-[28px] leading-none text-ink">
                  {value}
                </dd>

                <dt className="mt-1.5 text-xs font-medium text-muted">
                  {label}
                </dt>
              </div>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}