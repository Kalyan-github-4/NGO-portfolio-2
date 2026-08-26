"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * Scroll-triggered slide-up reveal.
 *
 * `Reveal` is the trigger. Given a `from` it travels in as one piece; given
 * `RevealItem` children instead, it holds still and hands each of them its
 * turn in sequence once the group scrolls into view. The markup itself can
 * stay in a server component; only these wrappers are client-side.
 *
 * Both take an `as` prop so the wrapper can be the semantic element the
 * layout already needs (a `ul` of `li`, a `dl`) rather than an extra `div`
 * shoved between them.
 */

/** Ease-out cubic — leaves gently, travels across the whole duration. */
const ease = [0.33, 1, 0.68, 1] as const;

/** Seconds each item takes to travel. */
const DURATION = 0.9;

/** Seconds between one item starting and the next. */
const STAGGER = 0.12;

/** How far each item travels, in px. */
const DISTANCE = 40;

/** Where content starts, relative to its laid-out position. */
const offsets = {
  bottom: { y: DISTANCE },
  left: { x: -DISTANCE },
  right: { x: DISTANCE },
} as const;

type Direction = keyof typeof offsets;

/**
 * Waits until a fifth of the group is on screen, so the reveal reads as a
 * response to scrolling rather than something already finished by the time it
 * is looked at.
 *
 * `amount` rather than a negative `margin`: a margin shrinks the viewport's
 * bottom edge, and the last element on a page can never rise above it — it
 * would sit in its hidden state forever. A fraction of the element itself has
 * no such floor.
 */
const viewport = { once: true, amount: 0.2 } as const;

const elements = {
  div: motion.div,
  ul: motion.ul,
  li: motion.li,
  dl: motion.dl,
  p: motion.p,
  h2: motion.h2,
  nav: motion.nav,
} as const;

type ElementName = keyof typeof elements;

/** For a `Reveal` that only sequences its children and never moves itself. */
const stillVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER } },
};

/**
 * Shared by a travelling `Reveal` and every `RevealItem`. `custom` carries
 * the direction, so one variant serves them all.
 */
const travelVariants: Variants = {
  hidden: (from: Direction) => ({ ...offsets[from], opacity: 0 }),
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: DURATION, ease, staggerChildren: STAGGER },
  },
};

type RevealProps = {
  as?: ElementName;
  className?: string;
  /**
   * Forwarded explicitly. TypeScript exempts hyphenated JSX attributes from
   * excess-property checking, so an unhandled `aria-label` here would be
   * dropped silently rather than reported — landmarks would quietly lose
   * their names.
   */
  "aria-label"?: string;
  children: ReactNode;
};

export function Reveal({
  as = "div",
  from,
  className,
  "aria-label": ariaLabel,
  children,
}: RevealProps & {
  /** Set to travel in as one piece; omit to sequence children instead. */
  from?: Direction;
}) {
  const reducedMotion = useReducedMotion();
  // The map returns a union of motion components, which JSX cannot accept a
  // single prop shape for; they share this one.
  const Element = elements[as] as typeof motion.div;

  return (
    <Element
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={viewport}
      custom={from}
      variants={from ? travelVariants : stillVariants}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Element>
  );
}

export function RevealItem({
  as = "div",
  from = "bottom",
  className,
  "aria-label": ariaLabel,
  children,
}: RevealProps & {
  /** Which side the item starts on. */
  from?: Direction;
}) {
  const Element = elements[as] as typeof motion.div;

  return (
    <Element
      custom={from}
      variants={travelVariants}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Element>
  );
}
