"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * A number that counts up to its target the first time it scrolls into view.
 *
 * The server renders the *final* value, so the real figure is what ships in
 * the HTML — good for no-JS, for crawlers, and for anyone who has asked for
 * reduced motion. Only after hydration does the count rewind to `from` and
 * play forward, and the rewind happens in a layout effect so the reader never
 * sees the final value flash first.
 *
 * Frames are written straight to `textContent` rather than through state:
 * the digits change ~60x a second and nothing else on the page depends on
 * them, so there is no reason to re-render the tree for each tick.
 */

/** Slow-out curve — quick off the mark, long settle onto the final digit. */
const ease = [0.16, 1, 0.3, 1] as const;

type CountUpProps = {
  /** The value to land on. */
  to: number;
  /** The value to start from. */
  from?: number;
  /** Decimal places to hold fixed, e.g. `1` keeps the `.4` in `2.4M`. */
  decimals?: number;
  /** Seconds the count takes to run. */
  duration?: number;
  /** Rendered before the number, e.g. `"₹"`. */
  prefix?: string;
  /** Rendered after the number, e.g. `"M+"`. */
  suffix?: string;
  className?: string;
};

export function CountUp({
  to,
  from = 0,
  decimals = 0,
  duration = 2,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const reducedMotion = useReducedMotion();

  const format = (value: number) =>
    `${prefix}${value.toLocaleString("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;

  // Rewind before the browser paints, so the hydrated markup (which carries
  // the final value) is never visibly replaced.
  useLayoutEffect(() => {
    if (reducedMotion || !ref.current) return;
    ref.current.textContent = format(from);
    // Re-running on every prop change would restart a finished count, and the
    // effect only ever needs to fire once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !inView) return;

    const controls = animate(from, to, {
      duration,
      ease,
      onUpdate: (value) => {
        if (ref.current) ref.current.textContent = format(value);
      },
    });

    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reducedMotion, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {format(to)}
    </span>
  );
}
