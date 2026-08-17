import Link from "next/link";
import {
  ArrowRight,
  BowlFood,
  Drop,
  GraduationCap,
  ShieldCheck,
  Stethoscope,
} from "@phosphor-icons/react/dist/ssr";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const programs = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Providing quality education and learning resources.",
    href: "/programs/education",
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    description: "Access to essential healthcare and medical support.",
    href: "/programs/healthcare",
  },
  {
    icon: Drop,
    title: "Clean Water",
    description: "Clean water access and improved sanitation.",
    href: "/programs/clean-water",
  },
  {
    icon: BowlFood,
    title: "Food & Nutrition",
    description: "Nutritious meals and support for healthy growth.",
    href: "/programs/nutrition",
  },
  {
    icon: ShieldCheck,
    title: "Child Protection",
    description: "Protecting children's rights and ensuring their safety.",
    href: "/programs/child-protection",
  },
];

export function Programs() {
  return (
    <section className="bg-cream py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Our Programs"
          title="Programs That Create Lasting Change"
          subtitle="We focus on sustainable programs that empower communities and help children build a better future."
        />

        <ul className="mt-11 grid gap-7 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
  {programs.map(({ icon: Icon, title, description, href }) => (
    <li key={title} className="group">
      <Link
        href={href}
        className="flex h-full min-h-70 flex-col items-center rounded-xl bg-white px-6 py-9 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
      >
        <Icon
          className="h-10 w-10 text-accent transition-transform duration-300 group-hover:scale-110"
          weight="duotone"
        />

        <h3 className="mt-5 font-display text-[18px] text-ink">
          {title}
        </h3>

        <p className="mt-3 text-[13px] leading-relaxed text-muted">
          {description}
        </p>

        <span className="mt-auto pt-7 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-ink transition-colors group-hover:text-accent">
          Learn More
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>
    </li>
  ))}
</ul>
      </Container>
    </section>
  );
}
