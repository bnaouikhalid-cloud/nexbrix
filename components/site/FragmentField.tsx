"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  GlyphSheet,
  GlyphMail,
  GlyphTruck,
  GlyphInvoice,
  GlyphPos,
  GlyphClock,
  GlyphChat,
} from "@/components/ui/Glyphs";
import { problem } from "@/lib/content";

/** Where each object sits before NexBrix pulls it onto the rail. */
const scatter = [
  { x: -12, y: -30, r: -7 },
  { x: 9, y: 26, r: 5 },
  { x: -7, y: -16, r: 4 },
  { x: 14, y: 30, r: -5 },
  { x: -10, y: 20, r: 6 },
  { x: 7, y: -26, r: -4 },
  { x: 12, y: 14, r: 7 },
];

const glyphs = [
  GlyphSheet,
  GlyphMail,
  GlyphTruck,
  GlyphInvoice,
  GlyphPos,
  GlyphClock,
  GlyphChat,
];

function Fragment({
  label,
  index,
  progress,
  connected,
}: {
  label: string;
  index: number;
  progress: MotionValue<number>;
  connected: boolean;
}) {
  const s = scatter[index];
  const Glyph = glyphs[index];
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const x = useTransform(progress, [0, 1], [isDesktop ? `${s.x}%` : "0%", "0%"]);
  const y = useTransform(progress, [0, 1], [`${s.y}%`, "0%"]);
  const rotate = useTransform(progress, [0, 1], [s.r, 0]);
  const opacity = useTransform(progress, [0, 0.4], [0.5, 1]);

  return (
    <motion.li
      style={{ x, y, rotate, opacity }}
      className="relative z-10 lg:min-w-0 lg:flex-1"
    >
      {/* stub joining the card to the vertical rail on small screens */}
      <span
        aria-hidden="true"
        className="absolute right-full top-1/2 h-px w-7 -translate-y-1/2 bg-rule lg:hidden"
      />
      <div
        className={`flex items-center gap-2.5 rounded-[5px] border bg-paper px-3 py-2.5 transition-[border-color,box-shadow] duration-700 lg:flex-col lg:gap-3 lg:px-2 lg:py-4 ${
          connected
            ? "border-tartan/35 shadow-panel"
            : "border-rule shadow-[0_1px_0_0_rgb(10_41_36_/_0.03)]"
        }`}
      >
        <Glyph
          className={`transition-colors duration-700 ${
            connected ? "text-tartan" : "text-ink-40"
          }`}
        />
        <span
          className={`label-mono-sm whitespace-nowrap transition-colors duration-700 lg:text-[0.5625rem] ${
            connected ? "text-ink" : "text-ink-55"
          }`}
        >
          {label}
        </span>
        <span
          aria-hidden="true"
          className={`ml-auto h-1.5 w-1.5 shrink-0 rounded-[1px] transition-colors duration-700 lg:ml-0 ${
            connected ? "bg-mint" : "bg-tartan/20"
          }`}
        />
      </div>
    </motion.li>
  );
}

/**
 * Seven places the day's information currently lives — scattered while you
 * scroll toward them, pulled onto one rail by the time you arrive.
 */
export function FragmentField() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [connected, setConnected] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "center 0.6"],
  });

  // Reduced motion: everything is simply shown in its settled state.
  const progress = useTransform(scrollYProgress, (v) => (reduce ? 1 : v));

  useMotionValueEvent(progress, "change", (v) => setConnected(v > 0.8));

  const railFill = useTransform(progress, [0.25, 0.95], ["0%", "100%"]);

  return (
    // the scattered state reaches past the measure, so it is clipped
    // horizontally only — vertical shadows still breathe.
    <div ref={ref} className="relative overflow-x-clip">
      {/* horizontal rail (desktop) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-rule lg:block"
      >
        <motion.div style={{ width: railFill }} className="h-full bg-tartan/45" />
      </div>

      {/* vertical rail (small screens) */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-2 w-px bg-rule lg:hidden"
      >
        <motion.div style={{ height: railFill }} className="w-full bg-tartan/45" />
      </div>

      <ul className="relative flex flex-col gap-3 pl-9 lg:flex-row lg:items-center lg:gap-3 lg:pl-0">
        {problem.fragments.map((label, i) => (
          <Fragment
            key={label}
            label={label}
            index={i}
            progress={progress}
            connected={connected}
          />
        ))}
      </ul>
    </div>
  );
}
