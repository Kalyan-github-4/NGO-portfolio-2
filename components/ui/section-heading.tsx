import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>

      <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.18] tracking-[-0.02em] text-ink">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
