import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  /** "light" inverts the mark and type for use on the dark green footer. */
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn("group flex items-center gap-2.5", className)}
    >
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Outer heart — the community holding the cause. */}
        <path
          d="M20 35S4 26 4 15.5C4 10 8.2 6 13.2 6c2.9 0 5.6 1.5 6.8 3.8C21.2 7.5 23.9 6 26.8 6 31.8 6 36 10 36 15.5 36 26 20 35 20 35Z"
          fill="none"
          stroke={isLight ? "#ffffff" : "var(--color-brand)"}
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        {/* Inner heart — the gift itself. */}
        <path
          d="M20 27.5s-8.5-4.9-8.5-10.6c0-3 2.2-5.1 4.9-5.1 1.5 0 2.9.8 3.6 2 .7-1.2 2.1-2 3.6-2 2.7 0 4.9 2.1 4.9 5.1 0 5.7-8.5 10.6-8.5 10.6Z"
          fill="var(--color-accent)"
        />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[21px]",
            isLight ? "text-white" : "text-ink",
          )}
        >
          {site.name}
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
            isLight ? "text-white/60" : "text-muted",
          )}
        >
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
