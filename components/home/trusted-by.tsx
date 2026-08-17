import { Container } from "@/components/ui/container";
import Image from "next/image";

type Partner = {
  name: string;
  width: number;
  /**
   * Path to a logo file in `public/partners/`. When absent the name renders as
   * a styled wordmark, so the rail works before the artwork lands.
   */
  logo?: string;
  /** Wordmark styling, used only when `logo` is absent. */
  className?: string;
};

const partners: Partner[] = [
  {
    name: "UNICEF",
    width: 82,
    className: "text-[19px] font-bold tracking-[0.02em]",
  },
  {
    name: "World Vision",
    width: 105,
    className: "font-display text-[18px] tracking-tight",
  },
  {
    name: "CARE",
    width: 70,
    className: "text-[19px] font-extrabold tracking-[0.06em]",
  },
  {
    name: "Save the Children",
    width: 120,
    className: "text-[14px] font-bold uppercase tracking-[0.06em]",
  },
  {
    name: "GlobalGiving",
    width: 110,
    className: "text-[17px] font-semibold tracking-tight",
  },
  {
    name: "Pratham",
    width: 90,
    className: "font-display text-[18px] tracking-tight",
  },
];

export function TrustedBy() {
  const railPartners = [...partners, ...partners];

  return (
    <section
      aria-label="Organizations"
      className="overflow-hidden bg-white"
    >
      <Container>
        <div className="flex items-center gap-8 py-6">
          {/* Static label */}
          <span className="relative z-10 shrink-0 bg-white pr-2 text-[15px] font-semibold text-muted">
            Trusted by
          </span>

          {/* Animated rail */}
          <div className="relative min-w-0 flex-1 overflow-hidden">
            {/* Left fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-white to-transparent" />

            {/* Right fade */}
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-white to-transparent" />

            <div
              className="flex w-max animate-trusted-rail items-center"
              // The rail is duplicated for the seamless loop, so the copy is
              // decorative — screen readers only announce the first set.
            >
              {railPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  aria-hidden={index >= partners.length}
                  className="relative mr-14 flex h-9 shrink-0 items-center justify-center lg:mr-20"
                  style={{ width: partner.width }}
                >
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes={`${partner.width}px`}
                      className="object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                    />
                  ) : (
                    <span
                      className={`whitespace-nowrap text-center leading-tight text-muted/70 transition-colors duration-300 hover:text-brand ${partner.className ?? ""}`}
                    >
                      {partner.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
