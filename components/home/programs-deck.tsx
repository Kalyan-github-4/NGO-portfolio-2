"use client";

import { useSyncExternalStore } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * Scroll-triggered reveal for the Programs grid.
 *
 * The cards arrive stacked behind the middle one — a slightly fanned deck —
 * then peel outward into their grid columns, centre card first. The card
 * markup itself stays in the server component; only the motion wrappers are
 * client-side, so the images and links are still server-rendered.
 */

const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * The viewport width is an external store, so subscribe to it directly rather
 * than mirroring it into state from an effect (same idiom as the navbar's
 * scroll listener).
 */
function useIsDesktop() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const list = window.matchMedia(DESKTOP_QUERY);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => true,
  );
}

/** Slow-out curve — fast to leave the deck, long settle into place. */
const ease = [0.22, 1, 0.36, 1] as const;

/** How long the deck holds together before the cards spread. */
const DECK_HOLD = 0.28;

type CardCustom = {
  /** Signed column distance from the centre card: -2 … 0 … 2. */
  offset: number;
};

/**
 * Desktop: cards start translated onto the centre column, shrunk and fanned a
 * couple of degrees so the stack reads as layered rather than as one card.
 * Distance from centre drives both the fade-in order and the spread order.
 */
const deckVariants: Variants = {
  hidden: ({ offset }: CardCustom) => ({
    opacity: 0,
    // Percentages are of the card's own width, so one column step is 100%.
    x: `${offset * -100}%`,
    y: 14,
    scale: offset === 0 ? 0.94 : 0.88,
    rotate: offset * 2.2,
  }),
  visible: ({ offset }: CardCustom) => {
    const distance = Math.abs(offset);
    return {
      opacity: 1,
      x: "0%",
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        // The deck fades in first, centre card leading, and only then unfurls.
        opacity: { duration: 0.5, delay: distance * 0.07, ease: "easeOut" },
        default: {
          duration: 0.95,
          delay: DECK_HOLD + distance * 0.11,
          ease,
        },
      },
    };
  },
};

/**
 * Mobile / tablet: the grid is one or two columns, so there is no centre to
 * stack behind. The cards rise and settle in source order instead.
 */
const stackVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: ({ index }: { index: number }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: index * 0.08, ease },
  }),
};

/** Reduced motion: no travel, just a gentle fade so nothing pops in. */
const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export function ProgramsDeck({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.ul
      className={className}
      initial="hidden"
      whileInView="visible"
      // `once` keeps it a one-time reveal; `amount` waits until the grid is
      // meaningfully on screen so the deck isn't spent while off-view.
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.ul>
  );
}

export function ProgramCard({
  index,
  total,
  className,
  children,
}: {
  index: number;
  total: number;
  className?: string;
  children: React.ReactNode;
}) {
  const isDesktop = useIsDesktop();
  const reducedMotion = useReducedMotion();

  const centerIndex = Math.floor(total / 2);
  const offset = index - centerIndex;

  const variants = reducedMotion
    ? fadeVariants
    : isDesktop
      ? deckVariants
      : stackVariants;

  return (
    <motion.li
      className={className}
      variants={variants}
      custom={{ offset, index }}
      // Centre card on top of the stack, then outward, so the deck layers in
      // the same order it unfurls.
      style={{ zIndex: total - Math.abs(offset) }}
    >
      {children}
    </motion.li>
  );
}
