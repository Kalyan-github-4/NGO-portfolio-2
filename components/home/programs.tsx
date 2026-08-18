import Image from "next/image";
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
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=85",
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    description: "Access to essential healthcare and medical support.",
    href: "/programs/healthcare",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85",
  },
  {
    icon: Drop,
    title: "Clean Water",
    description: "Clean water access and improved sanitation.",
    href: "/programs/clean-water",
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=85",
  },
  {
    icon: BowlFood,
    title: "Food & Nutrition",
    description: "Nutritious meals and support for healthy growth.",
    href: "/programs/nutrition",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85",
  },
  {
    icon: ShieldCheck,
    title: "Child Protection",
    description:
      "Protecting children's rights and ensuring their safety.",
    href: "/programs/child-protection",
    image:
      "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=900&q=85",
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

        <ul className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {programs.map(
            ({ icon: Icon, title, description, href, image }) => (
              <li key={title} className="group">
                <Link
                  href={href}
                  className="relative flex min-h-80 h-full overflow-hidden rounded-2xl bg-ink"
                >
                  {/* Background image */}
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                  {/* Icon */}
                  <div className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-xl bg-white/90 text-accent shadow-sm backdrop-blur-sm">
                    <Icon
                      className="h-5.5 w-5.5"
                      weight="duotone"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mt-auto w-full p-5">
                    <h3 className="font-display text-[18px] text-white">
                      {title}
                    </h3>

                    <p className="mt-2 text-[12.5px] leading-relaxed text-white/75">
                      {description}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold text-white transition-colors group-hover:text-accent">
                      Learn More
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            ),
          )}
        </ul>
      </Container>
    </section>
  );
}