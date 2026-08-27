"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Single reveal primitive used site-wide so every entrance shares one
 * easing curve and one distance. Motion is opt-out under reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
  as = "div",
  once = true,
  amount = 0.4,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "p";
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Stagger container for lists of revealing children. */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * Headline that reveals line by line from behind a clip.
 *
 * The viewport observer has to sit on the outer element: an intersection
 * rect is clipped by every `overflow: hidden` ancestor, so observing the
 * translated inner line would report it as permanently out of view.
 */
export function RevealLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      className={`block ${className}`}
      initial={reduce ? "shown" : "clipped"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.25 }}
    >
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            variants={{
              clipped: { y: "110%", opacity: 0 },
              shown: { y: "0%", opacity: 1 },
            }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.085,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
