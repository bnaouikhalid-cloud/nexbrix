"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ProductWindow, Chip, Tick } from "@/components/ui/ProductWindow";

const EASE = [0.22, 1, 0.36, 1] as const;

/** One pass through the product: frame, headline numbers, the proof, the paperwork. */
const SEQUENCE = {
  window: 0.06,
  kpi: 0.32,
  kpiStep: 0.09,
  consumption: 0.64,
  expected: 0.8,
  actual: 0.96,
  phone: 1.12,
  purchasing: 1.26,
  staff: 1.42,
} as const;

/** Top-line read-outs. Sample operational data for one venue, one week. */
const kpis = [
  { value: "$18,240", label: "Stock value" },
  { value: "6", label: "Open orders" },
  { value: "3", label: "Deliveries" },
] as const;

/** The purchase order behind the flagged line. */
const purchaseCounts = [
  { value: "20", label: "Ordered" },
  { value: "18", label: "Delivered" },
  { value: "20", label: "Invoiced" },
] as const;

/** Lines on the phone's count sheet. */
const countRows = [
  { item: "Chicken breast", qty: "12.4", done: true },
  { item: "Milk 2L", qty: "18", done: true },
  { item: "Tomatoes", qty: "6.1", done: true },
  { item: "Olive oil 4L", qty: "3", done: false },
] as const;

function Step({
  children,
  delay,
  x = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  x?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, x }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Quantity bar that fills on entrance. Matches QuantityBar's geometry — it
 * exists separately only so the fill can be driven off the hero sequence.
 */
function FillBar({
  percent,
  delay,
  over = false,
}: {
  percent: number;
  delay: number;
  over?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-[2px] bg-tartan/[0.07]">
      <motion.div
        className={`h-full rounded-[2px] ${over ? "bg-mint" : "bg-tartan"}`}
        initial={reduce ? false : { width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.72, delay: reduce ? 0 : delay, ease: EASE }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ desktop */

function Dashboard() {
  return (
    <ProductWindow
      path="Dashboard · Harbour Kitchen"
      meta="Week 34"
      live
      className="hover:shadow-lift transition-shadow duration-500"
    >
      {/* headline read-outs */}
      <div className="grid grid-cols-3 divide-x divide-rule-soft border-b border-rule-soft">
        {kpis.map((kpi, i) => (
          <Step
            key={kpi.label}
            delay={SEQUENCE.kpi + i * SEQUENCE.kpiStep}
            className="flex flex-col gap-2 px-3.5 py-2.5"
          >
            <span className="num text-[1.0625rem] font-medium leading-none tracking-[-0.02em] text-ink">
              {kpi.value}
            </span>
            <span className="label-mono-sm text-ink-40">{kpi.label}</span>
          </Step>
        ))}
      </div>

      {/* sales against consumption — the number the whole site is about */}
      <div className="border-b border-rule-soft px-3.5 py-3.5">
        <Step delay={SEQUENCE.consumption}>
          <span className="label-mono-sm block truncate text-ink-55">
            Sales → consumption · Chicken breast
          </span>
        </Step>

        {/* the readable half of the panel stays clear of the phone */}
        <div className="mt-3.5 flex flex-col gap-2.5 lg:max-w-[66%] xl:max-w-[72%]">
          <div className="flex items-center gap-3">
            <span className="label-mono-sm w-[4rem] shrink-0 text-ink-40">
              Expected
            </span>
            <span className="num w-[2.5rem] shrink-0 text-[0.8125rem] font-medium text-ink">
              10kg
            </span>
            <div className="min-w-0 flex-1">
              <FillBar percent={83} delay={SEQUENCE.expected} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="label-mono-sm w-[4rem] shrink-0 text-tartan">
              Actual
            </span>
            <span className="num w-[2.5rem] shrink-0 text-[0.8125rem] font-medium text-ink">
              12kg
            </span>
            <div className="min-w-0 flex-1">
              <FillBar percent={100} delay={SEQUENCE.actual} over />
            </div>
          </div>
        </div>

        <Step delay={SEQUENCE.actual + 0.18} className="mt-3.5 flex">
          <span className="flex items-center gap-2.5 rounded-[5px] border border-tartan bg-tartan px-2.5 py-1.5">
            <span className="num text-[1rem] font-medium leading-none tracking-[-0.02em] text-mint">
              +2kg
            </span>
            <span aria-hidden="true" className="h-5 w-px bg-mint/25" />
            <span className="flex flex-col gap-1">
              <span className="num text-[0.75rem] font-medium leading-none text-paper">
                $24
              </span>
              <span className="label-mono-sm text-[0.5625rem] text-paper/70">
                Variance
              </span>
            </span>
          </span>
        </Step>
      </div>

      {/* purchasing and deliveries — kept left so the phone never hides it */}
      <Step
        delay={SEQUENCE.purchasing}
        className="border-b border-rule-soft px-3.5 py-3"
      >
        <div className="flex items-center gap-2">
          <span className="label-mono-sm min-w-0 truncate text-ink-55">
            PO #2481 · Meatsmith Co.
          </span>
          <Chip state="flag" className="shrink-0">
            2 to check
          </Chip>
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          {purchaseCounts.map((count, i) => (
            <span key={count.label} className="flex items-center gap-1.5">
              {i > 0 ? (
                <span
                  aria-hidden="true"
                  className="h-3 w-px bg-rule-soft"
                />
              ) : null}
              <span className="num text-[0.8125rem] font-medium leading-none text-ink">
                {count.value}
              </span>
              <span className="label-mono-sm text-ink-40">{count.label}</span>
            </span>
          ))}
        </div>
      </Step>

      {/* who is on, right now */}
      <Step
        delay={SEQUENCE.staff}
        className="flex items-center gap-2.5 px-3.5 py-2"
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-mint node-live"
        />
        <span className="label-mono-sm truncate text-ink-55">
          4 on shift · Fri 3:00pm–10:00pm
        </span>
      </Step>
    </ProductWindow>
  );
}

/* ------------------------------------------------------------------- mobile */

function CountPhone() {
  return (
    <div className="relative w-[9rem] rounded-[1.375rem] border border-ink/85 bg-ink p-[0.3125rem] shadow-lift xl:w-[9.5rem]">
      <div className="overflow-hidden rounded-[1.125rem] bg-paper">
        {/* speaker slot */}
        <div className="flex h-[1.625rem] items-center justify-center">
          <span
            aria-hidden="true"
            className="h-[3px] w-8 rounded-full bg-ink/12"
          />
        </div>

        {/* screen header */}
        <div className="border-b border-rule px-2 pb-2.5">
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-mint node-live"
            />
            <span className="label-mono-sm text-[0.5625rem] text-ink-40">
              Stock count
            </span>
          </span>
          <span className="mt-2 block text-[0.6875rem] font-medium leading-none text-ink">
            Cool room 1
          </span>
        </div>

        {/* column header */}
        <div className="flex items-center justify-between gap-2 border-b border-rule-soft px-2 py-1.5">
          <span className="label-mono-sm text-[0.5rem] text-ink-40">Item</span>
          <span className="label-mono-sm text-[0.5rem] text-ink-40">
            On hand
          </span>
        </div>

        {/* the count itself */}
        <ul>
          {countRows.map((row) => (
            <li
              key={row.item}
              className="flex items-center gap-1 border-b border-rule-soft px-2 py-[0.5rem] last:border-b-0"
            >
              <span
                aria-hidden="true"
                className={`flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-[2px] border ${
                  row.done
                    ? "border-tartan/40 bg-mint/50 text-tartan"
                    : "border-rule text-transparent"
                }`}
              >
                <Tick className="h-1.5 w-1.5" />
              </span>
              <span className="min-w-0 flex-1 truncate text-[0.625rem] leading-none text-ink-70">
                {row.item}
              </span>
              <span className="num shrink-0 text-[0.625rem] font-medium leading-none text-ink">
                {row.qty}
              </span>
            </li>
          ))}
        </ul>

        {/* progress */}
        <div className="flex items-center justify-between gap-2 border-t border-rule px-2 py-2.5">
          <span className="label-mono-sm text-[0.5rem] text-ink-40">3 of 4</span>
          <span className="label-mono-sm rounded-[3px] border border-mint bg-mint/45 px-1.5 py-1 text-[0.5rem] text-tartan">
            Counting
          </span>
        </div>

        {/* tab bar */}
        <div className="grid grid-cols-3 border-t border-rule bg-shell/60">
          {["Clock", "Hours", "Stock"].map((tab) => {
            const active = tab === "Stock";
            return (
              <span
                key={tab}
                className={`relative flex flex-col items-center gap-1 py-2 ${
                  active ? "bg-tartan/5" : ""
                }`}
              >
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-2 top-0 h-0.5 rounded-full bg-tartan"
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className={`h-1 w-1 rounded-[1px] ${
                    active ? "bg-tartan" : "bg-tartan/25"
                  }`}
                />
                <span
                  className={`label-mono-sm text-[0.5rem] tracking-[0.06em] ${
                    active ? "font-semibold text-tartan" : "text-ink-40"
                  }`}
                >
                  {tab}
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * The hero visual: the NexBrix desktop dashboard an operator opens in the
 * morning, with the phone their staff count stock on laid over it. One
 * system, two surfaces — stock, purchasing, deliveries, consumption,
 * variance and staff all reading off the same week.
 */
export function HeroComposition() {
  return (
    <div className="relative lg:h-[391px]">
      {/* mint wash, weighted toward the device corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-4 -inset-y-12 -z-20 sm:-inset-x-8 lg:-inset-x-10"
        style={{
          backgroundImage:
            "radial-gradient(58% 52% at 74% 62%, rgba(189, 235, 207, 0.55), transparent 70%)",
        }}
      />

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

      {/* tartan bracket above the dashboard, mint bracket under the phone */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-3.5 -top-3.5 hidden h-14 w-14 rounded-tl-lg border-l border-t border-tartan/25 lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-2.5 -right-2.5 hidden h-[277px] w-[9rem] rounded-[1.375rem] border border-mint lg:block xl:w-[9.5rem]"
      />

      <div className="flex flex-col items-end gap-5 lg:block">
        <Step
          delay={SEQUENCE.window}
          className="w-full lg:absolute lg:left-0 lg:top-0 lg:w-[82%] xl:w-[86%]"
        >
          <Dashboard />
        </Step>

        <Step
          delay={SEQUENCE.phone}
          x={16}
          className="relative z-10 lg:absolute lg:right-0 lg:top-[106px]"
        >
          <CountPhone />
        </Step>
      </div>
    </div>
  );
}
