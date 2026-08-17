import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";

import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

const reasons = [
  "100% Secure Donations",
  "Regular Updates and Reports",
  "Dedicated to Long-term Impact",
  "Local Teams, Global Standards",
];

type Story = {
  slug: string;
  title: string;
  /** ISO date — rendered through <time> so it stays machine-readable. */
  date: string;
  category: string;
  /** Optional until real photography lands; falls back to a branded banner. */
  image?: string;
  imageAlt?: string;
};

const stories: Story[] = [
  {
    slug: "new-school-rural-community",
    title: "New School Opens in Rural Community",
    date: "2026-08-10",
    category: "News",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Children learning in a classroom",
  },
  {
    slug: "clean-water-project",
    title: "Clean Water Project Changes Lives",
    date: "2026-08-05",
    category: "Updates",
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Clean water flowing from a tap",
  },
  {
    slug: "health-camp-families",
    title: "Health Camp Brings Hope to Families",
    date: "2026-07-28",
    category: "Stories",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Healthcare professional providing medical care",
  },
];

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function WhyChooseUs() {
  return (
    <section className="bg-cream pb-16 lg:pb-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] lg:gap-14">
          {/* ---------------- Why choose us ---------------- */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Why Choose Us
            </p>

            <h2 className="mt-3 font-display text-[clamp(1.5rem,2.4vw,1.9rem)] leading-[1.2] tracking-[-0.02em] text-ink">
              Why Thousands
              <br />
              Trust {site.name}
            </h2>

            <ul className="mt-6 space-y-3">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-center gap-2.5">
                  <CheckCircle className="h-5 w-5 shrink-0 text-brand-light" />
                  <span className="text-[13.5px] text-ink/80">{reason}</span>
                </li>
              ))}
            </ul>

            <ButtonLink
              href="/donate"
              variant="primary"
              className="mt-7 rounded-xl px-7 py-4 disabled:opacity-60"
            >
              Donate Now
            </ButtonLink>
          </div>

          {/* ---------------- Latest news ---------------- */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Latest News &amp; Stories
            </p>

            <ul className="mt-5 grid gap-6 sm:grid-cols-3">
              {stories.map((story) => (
                <li key={story.slug} className="group">
                  <Link href={`/blog/${story.slug}`} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-brand-tint">
                      {story.image ? (
                        <Image
                          src={story.image}
                          alt={story.imageAlt ?? story.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 22vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full bg-[linear-gradient(135deg,var(--color-brand-tint),var(--color-accent-tint))]" />
                      )}
                    </div>

                    <h3 className="mt-3.5 font-display text-[15px] leading-snug text-ink transition-colors group-hover:text-brand">
                      {story.title}
                    </h3>

                    <p className="mt-2 flex items-center gap-2 text-[11.5px] text-muted">
                      <time dateTime={story.date}>
                        {dateFormatter.format(new Date(story.date))}
                      </time>
                      <span aria-hidden="true">•</span>
                      <span>{story.category}</span>
                    </p>

                    <span className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-ink transition-colors group-hover:text-accent">
                      Read More
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-1.5 text-[13px] font-bold text-ink transition-colors hover:text-accent"
              >
                View All News
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
