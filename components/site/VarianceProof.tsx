"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { variance } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/** 10kg of 12kg — the bar scale is the actual figure, so the overhang is real. */
const EXPECTED_PCT = (10 / 12) * 100;
const OVER_PCT = 100 - EXPECTED_PCT;

function Operator({ children }: { children: string }) {
  return (
    <span
      aria-hidden="true"
      className="num hidden shrink-0 self-center text-[1.25rem] text-mint/50 sm:block"
    >
      {children}
    </span>
  );
}

function Fact({
  value,
  unit,
  emphasis = false,
}: {
  value: string;
  unit: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2.5">
      <span
        className={`num text-[2rem] font-medium leading-none tracking-[-0.03em] sm:text-[2.5rem] lg:text-[3rem] ${
          emphasis ? "text-mint" : "text-paper"
        }`}
      >
        {value}
      </span>
      <span className="label-mono-sm text-paper/45">{unit}</span>
    </div>
  );
}

function Bar({
  label,
  value,
  over,
  delay,
}: {
  label: string;
  value: string;
  over?: boolean;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const width = over ? "100%" : `${EXPECTED_PCT}%`;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between gap-4">
        <span className="label-mono-sm text-paper/50">{label}</span>
        <span
          className={`num text-[0.9375rem] font-medium ${
            over ? "text-mint" : "text-paper"
          }`}
        >
          {value}
        </span>
      </div>
      <div className="h-3 w-full rounded-[2px] bg-white/[0.06]">
        <motion.div
          className="flex h-full overflow-hidden rounded-[2px]"
          initial={reduce ? { width } : { width: 0 }}
          whileInView={{ width }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, delay, ease: EASE }}
        >
          <span
            className="h-full bg-paper/80"
            style={{ width: over ? `${EXPECTED_PCT}%` : "100%" }}
          />
          {over ? (
            <span className="h-full bg-mint" style={{ width: `${OVER_PCT}%` }} />
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}

/**
 * The canonical proof point. Figures are locked: 50 dishes, 200g per dish,
 * 10kg expected, 12kg actually used, +2kg / $24. The overhang on the second
 * bar is drawn to scale, so the discrepancy reads before the copy does.
 */
export function VarianceProof() {
  const reduce = useReducedMotion();

  return (
    <section
      id="variance"
      data-theme="dark"
      aria-labelledby="variance-heading"
      className="section-y relative overflow-hidden bg-ink text-paper"
    >
      <div
        aria-hidden="true"
        className="grid-paper-dark pointer-events-none absolute inset-0 opacity-60"
        style={{
          maskImage:
            "radial-gradient(120% 80% at 50% 0%, #000 10%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(120% 80% at 50% 0%, #000 10%, transparent 85%)",
        }}
      />

      <div className="shell relative">
        <div className="grid grid-cols-1 gap-x-12 gap-y-9 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal y={10}>
              <SectionLabel index="03" tone="dark" />
            </Reveal>
            <h2
              id="variance-heading"
              className="display-2 mt-6 text-paper"
            >
              <RevealLines lines={variance.headline} delay={0.05} />
            </h2>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-16">
            <Reveal delay={0.1}>
              <p className="text-[0.9375rem] leading-[1.7] text-paper/60">
                {variance.body}
              </p>
            </Reveal>
          </div>
        </div>

        {/* ----------------------------------------------- the instrument */}
        <Reveal delay={0.05} y={22} className="mt-14 sm:mt-16 lg:mt-20">
          <div className="rounded-lg border border-rule-dark bg-white/[0.02] p-5 sm:p-8 lg:p-10">
            {/* the sum */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:flex sm:items-stretch sm:gap-6 lg:gap-10">
              <Fact value={variance.facts[0].value} unit={variance.facts[0].unit} />
              <Operator>×</Operator>
              <Fact value={variance.facts[1].value} unit={variance.facts[1].unit} />
              <Operator>=</Operator>
              <Fact value={variance.facts[2].value} unit={variance.facts[2].unit} />
              <Operator>≠</Operator>
              <Fact
                value={variance.facts[3].value}
                unit={variance.facts[3].unit}
                emphasis
              />
            </div>

            {/* the comparison, drawn to scale */}
            <div className="mt-10 border-t border-rule-dark pt-8 sm:mt-12 sm:pt-10">
              <div className="flex flex-col gap-6">
                <Bar label={variance.facts[2].raw} value="10kg" delay={0.1} />
                <Bar label={variance.facts[3].raw} value="12kg" over delay={0.3} />

                {/* the overhang, measured */}
                <div className="relative h-8">
                  <motion.div
                    aria-hidden="true"
                    className="absolute right-0 top-0 flex flex-col items-center"
                    style={{ width: `${OVER_PCT}%` }}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: -6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, delay: 0.95, ease: EASE }}
                  >
                    <span className="h-2 w-full border-x border-b border-mint/45" />
                    <span className="num mt-2 whitespace-nowrap text-[0.6875rem] font-medium tracking-[0.08em] text-mint">
                      {variance.result.amount}
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* the result */}
            <motion.div
              className="mt-12 flex flex-col gap-5 border-t border-rule-dark pt-8 sm:mt-14 sm:flex-row sm:items-end sm:gap-10 sm:pt-10"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
            >
              <div className="flex items-end gap-6 sm:gap-10">
                <span className="num text-[3.5rem] font-medium leading-[0.85] tracking-[-0.04em] text-mint sm:text-[5rem] lg:text-[6.5rem]">
                  {variance.result.amount}
                </span>
                <span aria-hidden="true" className="mb-3 h-12 w-px bg-mint/25 sm:mb-4 sm:h-16" />
                <span className="num text-[3.5rem] font-medium leading-[0.85] tracking-[-0.04em] text-mint sm:text-[5rem] lg:text-[6.5rem]">
                  {variance.result.cost}
                </span>
              </div>
              <span className="label-mono text-paper/45 sm:mb-4">
                {variance.result.label}
              </span>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
