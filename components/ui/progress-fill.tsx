"use client";

import { motion, type Variants } from "motion/react";

/**
 * The filled portion of a progress bar, grown from empty to its real value.
 *
 * It carries variants but no `initial`/`animate` of its own, so it inherits
 * the reveal state of whichever `Reveal` it sits inside — the bar fills as
 * its card lands, rather than running off a scroll trigger of its own. That
 * also means reduced motion is handled upstream: the container renders
 * straight to `visible` and the bar is simply full.
 *
 * `width` rather than `scaleX`: the fill has a rounded cap, and scaling would
 * stretch it into an ellipse. The bar is a few pixels tall, so the layout
 * cost is not worth trading the shape for.
 */

/** Ease-out cubic — matches the reveal the fill is sequenced with. */
const ease = [0.33, 1, 0.68, 1] as const;

const fillVariants: Variants = {
  hidden: { width: "0%" },
  visible: (percent: number) => ({
    width: `${percent}%`,
    // Let the card settle for a beat before the bar starts to run.
    transition: { duration: 1.1, ease, delay: 0.15 },
  }),
};

export function ProgressFill({
  percent,
  className,
}: {
  /** How full the bar should end up, 0–100. */
  percent: number;
  className?: string;
}) {
  return (
    <motion.div custom={percent} variants={fillVariants} className={className} />
  );
}
