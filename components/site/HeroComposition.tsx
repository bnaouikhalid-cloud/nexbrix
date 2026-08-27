"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DataCard } from "@/components/ui/DataCard";
import { Chip, Tick } from "@/components/ui/ProductWindow";
import { QuantityBar } from "@/components/ui/MetricCard";

const EASE = [0.22, 1, 0.36, 1] as const;

const SEQUENCE = {
  count: 0.15,
  purchase: 1.14,
  purchaseValues: [1.28, 1.43, 1.58],
  consumption: 2.12,
  expected: 2.28,
  actual: 2.62,
  variance: 3.3,
  staff: 3.82,
} as const;

const connectorSegments = [
  { d: "M18 26 L18 47 L64 47", delay: 0.54, duration: 0.6 },
  { d: "M64 47 L64 55", delay: 1.76, duration: 0.42 },
  { d: "M64 74 L64 84 L30 84 L30 90", delay: 2.92, duration: 0.5 },
  { d: "M61 92 L64 92", delay: 3.56, duration: 0.24 },
] as const;

/** Stock lines shown in the count card. Sample operational data. */
const countRows = [
  { item: "Chicken breast", qty: "12.4", unit: "kg", done: true },
  { item: "Milk 2L", qty: "18", unit: "ea", done: true },
  { item: "Tomatoes", qty: "6.1", unit: "kg", done: false },
];

function RevealStep({
  children,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.48, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * The hero visual: four live operations from four different parts of the
 * business, wired together. The connecting rails carry a Super Mint pulse so
 * the composition reads as one system rather than four cards.
 */
export function HeroComposition() {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      {/* fine operational grid, faded at the edges */}
      <div
        aria-hidden="true"
        className="grid-paper pointer-events-none absolute -inset-x-4 -inset-y-8 -z-10 opacity-70 sm:-inset-x-6"
        style={{
          maskImage:
            "radial-gradient(75% 65% at 55% 45%, #000 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(75% 65% at 55% 45%, #000 20%, transparent 100%)",
        }}
      />

      {/* connective rails — desktop only, drawn behind the cards */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 -z-[5] hidden h-full w-full lg:block"
      >
        <g
          fill="none"
          stroke="var(--color-tartan)"
          strokeOpacity="0.28"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        >
          {connectorSegments.map((segment) => (
            <motion.path
              key={segment.d}
              d={segment.d}
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: reduce ? 0 : segment.duration,
                delay: reduce ? 0 : segment.delay,
                ease: EASE,
              }}
            />
          ))}
        </g>
        {/* A quiet packet moves through the completed chain every few seconds. */}
        <g
          fill="none"
          stroke="var(--color-mint)"
          strokeWidth="1.75"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        >
          {connectorSegments.map((segment, index) => (
            <motion.path
              key={`pulse-${segment.d}`}
              d={segment.d}
              pathLength={1}
              strokeDasharray="0.08 0.92"
              initial={{ opacity: 0, strokeDashoffset: 0.08 }}
              animate={
                reduce
                  ? { opacity: 0 }
                  : {
                      opacity: [0, 0.5, 0.5, 0],
                      strokeDashoffset: [0.08, -0.25, -0.58, -0.92],
                    }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      duration: 1.05,
                      delay: 4.5 + index * 0.18,
                      ease: "linear",
                      repeat: Infinity,
                      repeatDelay: 4.9,
                    }
              }
            />
          ))}
        </g>
      </svg>

      <div className="flex flex-col gap-4 lg:gap-0">
        {/* 01 — STOCK */}
        <RevealStep delay={SEQUENCE.count} className="lg:w-[86%]">
          <DataCard
            label="Today's count · Cool room 1"
            status={
              <span className="label-mono-sm text-ink-40">07:42</span>
            }
            className="hover:shadow-lift transition-shadow duration-500"
          >
            <ul className="flex flex-col">
              {countRows.map((row) => (
                <li
                  key={row.item}
                  className="flex items-center justify-between gap-3 border-b border-rule-soft py-2 last:border-b-0 last:pb-0 first:pt-0"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] border ${
                        row.done
                          ? "border-tartan/40 bg-mint/50 text-tartan"
                          : "border-rule text-transparent"
                      }`}
                    >
                      <Tick className="h-2.5 w-2.5" />
                    </span>
                    <span className="truncate text-[0.875rem] text-ink-70">
                      {row.item}
                    </span>
                  </span>
                  <span className="num shrink-0 text-[0.875rem] font-medium text-ink">
                    {row.qty}
                    <span className="ml-1 text-ink-40">{row.unit}</span>
                  </span>
                </li>
              ))}
            </ul>
          </DataCard>
        </RevealStep>

        {/* 02 — PURCHASING + DELIVERIES */}
        <RevealStep delay={SEQUENCE.purchase} className="lg:mt-11 lg:ml-[26%] lg:w-[74%]">
          <DataCard
            label="PO #2481 · Meatsmith Co."
            status={<Chip state="flag">2 to check</Chip>}
            className="hover:shadow-lift transition-shadow duration-500"
          >
            <div className="grid grid-cols-3 divide-x divide-rule-soft">
              {[
                { k: "Ordered", v: "20" },
                { k: "Delivered", v: "18" },
                { k: "Invoiced", v: "20" },
              ].map((c, i) => (
                <motion.div
                  key={c.k}
                  className={`flex flex-col gap-1.5 ${i === 0 ? "pr-3" : "px-3"} ${
                    i === 2 ? "pr-0" : ""
                  }`}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.34,
                    delay: reduce ? 0 : SEQUENCE.purchaseValues[i],
                    ease: EASE,
                  }}
                >
                  <span className="num text-[1.375rem] font-medium leading-none tracking-[-0.02em]">
                    {c.v}
                  </span>
                  <span className="label-mono-sm text-ink-40">{c.k}</span>
                </motion.div>
              ))}
            </div>
          </DataCard>
        </RevealStep>

        {/* 03 — SALES → CONSUMPTION */}
        <RevealStep delay={SEQUENCE.consumption} className="lg:mt-10 lg:w-[68%]">
          <DataCard
            label="Sales → consumption · Chicken breast"
            status={<span className="label-mono-sm text-ink-40">Week 34</span>}
            className="hover:shadow-lift transition-shadow duration-500"
          >
            <div className="flex flex-col gap-3">
              <motion.div
                className="flex flex-col gap-3"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.38,
                  delay: reduce ? 0 : SEQUENCE.expected,
                  ease: EASE,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="label-mono-sm text-ink-40">Expected</span>
                  <span className="num text-[0.875rem] font-medium">10kg</span>
                </div>
                <QuantityBar percent={83} />
              </motion.div>
              <motion.div
                className="flex flex-col gap-3"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.38,
                  delay: reduce ? 0 : SEQUENCE.actual,
                  ease: EASE,
                }}
              >
                <div className="flex items-center justify-between gap-3 pt-1">
                  <span className="label-mono-sm text-tartan">Actual</span>
                  <span className="num text-[0.875rem] font-medium">12kg</span>
                </div>
                <QuantityBar percent={100} variant="over" />
              </motion.div>
            </div>
          </DataCard>
        </RevealStep>

        {/* variance read-out + staff — the two ends of the chain */}
        <div className="flex flex-wrap items-stretch gap-4 lg:mt-8 lg:ml-[30%]">
          <RevealStep delay={SEQUENCE.variance}>
            <div className="flex items-center gap-3 rounded-[6px] border border-tartan bg-tartan px-3.5 py-3">
              <span className="num text-[1.5rem] font-medium leading-none tracking-[-0.02em] text-mint">
                +2kg
              </span>
              <span aria-hidden="true" className="h-7 w-px bg-mint/25" />
              <span className="flex flex-col gap-1">
                <span className="num text-[0.9375rem] font-medium leading-none text-paper">
                  $24
                </span>
                <span className="label-mono-sm text-paper/50">Variance</span>
              </span>
            </div>
          </RevealStep>

          <RevealStep delay={SEQUENCE.staff}>
            <div className="flex h-full items-center gap-3 rounded-[6px] border border-rule bg-paper px-3.5 py-3">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-mint"
              />
              <span className="flex flex-col gap-1">
                <span className="text-[0.8125rem] leading-none font-medium">
                  On shift · 4
                </span>
                <span className="label-mono-sm text-ink-40">
                  Fri 3:00pm–10:00pm
                </span>
              </span>
            </div>
          </RevealStep>
        </div>
      </div>
    </div>
  );
}
