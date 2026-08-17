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
  },
  {
    icon: PresentationChart,
    title: "Accountable",
    description: "We answer to our donors and to the communities we serve.",
  },
  {
    icon: HandHeart,
    title: "Community Driven",
    description: "Local solutions, built for lasting and sustainable change.",
  },
  {
    icon: Medal,
    title: "Proven Impact",
    description: "Measurable results, reported back to you every quarter.",
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
          {values.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="group rounded-2xl  bg-white p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 "
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <Icon className="h-7 w-7" />
              </span>

              <h3 className="mt-5 font-display text-[19px] text-ink">{title}</h3>

              <p className="mx-auto mt-2.5 max-w-60 text-[13px] leading-relaxed text-muted">
                {description}
              </p>
            </li>
          ))}
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
