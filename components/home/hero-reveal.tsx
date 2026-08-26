"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * Entrance wrappers for the two hero columns.
 *
 * The copy rises up from below — headline, then paragraph, then buttons, then
 * social proof, one after another — while the artwork slides in leftward from
 * the right. Only these wrappers are client-side: the headline, buttons and
 * the `priority` hero image stay in the server component, so the LCP image is
 * still in the initial HTML.
 */

/**
 * Ease-out cubic. Gentler off the mark than the expo curve used elsewhere,
 * which spends most of its budget on a near-static settle and reads as a
 * snap at these longer durations.
 */
const ease = [0.33, 1, 0.68, 1] as const;

/** Seconds each element takes to travel. */
const DURATION = 1.2;

/** Seconds between one staggered item starting and the next. */
const STAGGER = 0.18;

/** How far each element travels, in px. */
const DISTANCE = 64;

/** Seconds to wait before anything moves — lets the navbar land first. */
const DELAY = 0.25;

/** Where content starts, relative to its laid-out position. */
const offsets = {
  bottom: { y: DISTANCE },
  right: { x: DISTANCE },
} as const;

type Direction = keyof typeof offsets;

/**
 * A column that travels in as one piece. Used for the artwork, which has
 * nothing inside it worth revealing separately.
 */
export function HeroReveal({
  from,
  className,
  children,
}: {
  from: Direction;
  className?: string;
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { ...offsets[from], opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: DURATION, ease, delay: DELAY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * The container holds no animation of its own; it exists to hand each
 * `HeroRevealItem` its turn. Children passed in from the server component
 * still render inside this provider, so the variants propagate to them.
 */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: DELAY, staggerChildren: STAGGER },
  },
};

/** `custom` carries the direction so one variant serves every item. */
const itemVariants: Variants = {
  hidden: (from: Direction) => ({ ...offsets[from], opacity: 0 }),
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: DURATION, ease },
  },
};

/** A column whose children arrive one by one rather than together. */
export function HeroStagger({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : "hidden"}
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** One step of a `HeroStagger`. */
export function HeroRevealItem({
  from = "bottom",
  className,
  children,
}: {
  from?: Direction;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div custom={from} variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
