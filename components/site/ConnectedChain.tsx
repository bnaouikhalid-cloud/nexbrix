"use client";

import { useCallback, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Tick } from "@/components/ui/ProductWindow";
import { chainPanels } from "./ChainPanels";
import { chain } from "@/lib/content";

const STEPS = chain.steps.length; // 7
const LAST = STEPS - 1;
const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ nodes */

function ChainNode({
  index,
  state,
  label,
  onSelect,
}: {
  index: number;
  state: "past" | "active" | "future";
  label: string;
  onSelect: (i: number) => void;
}) {
  const shell =
    state === "active"
      ? "border-tartan bg-tartan text-mint scale-110 shadow-[0_0_16px_rgba(10,41,36,0.2)] ring-2 ring-tartan/20"
      : state === "past"
        ? "border-tartan/40 bg-mint/45 text-tartan hover:border-tartan"
        : "border-rule bg-paper text-ink-40 group-hover:border-tartan/40 group-hover:text-ink";

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-current={state === "active" ? "step" : undefined}
      title={`Step ${index + 1}: ${label}`}
      className="group flex flex-col items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-tartan focus-visible:ring-offset-4 rounded-[6px]"
    >
      <span
        aria-hidden="true"
        className={`flex h-9 w-9 items-center justify-center rounded-[5px] border transition-all duration-500 ease-[var(--ease-out-quint)] ${shell}`}
      >
        {state === "past" ? (
          <Tick className="h-3.5 w-3.5" />
        ) : (
          <span className="num text-[0.6875rem] font-medium leading-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </span>
      <span
        className={`label-mono-sm transition-colors duration-500 ${
          state === "active"
            ? "text-ink font-semibold"
            : state === "past"
              ? "text-ink-55"
              : "text-ink-40 group-hover:text-ink"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

/* ------------------------------------------------------- desktop: pinned */

function ChainStage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.max(0, Math.min(LAST, Math.round(v * LAST)));
    setActive((prev) => (prev === next ? prev : next));
  });

  /** Clicking a node scrolls the page to that link in the chain. */
  const goTo = useCallback((i: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    const top = el.offsetTop + (i / LAST) * scrollable;
    window.scrollTo({
      top,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);

  const step = chain.steps[active];

  return (
    <div ref={wrapRef} className="relative hidden h-[520vh] lg:block">
      <div className="sticky top-0 flex h-svh min-h-[40rem] flex-col justify-center">
        <div className="shell-wide">
          {/* stage header */}
          <div className="flex items-center justify-between gap-6 border-b border-rule pb-5">
            <SectionLabel index="03">{chain.eyebrow}</SectionLabel>
            <span className="num text-[0.8125rem] text-ink-40">
              <span className="text-ink">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="px-1.5">/</span>
              {String(STEPS).padStart(2, "0")}
            </span>
          </div>

          {/* the rail */}
          <div className="relative mt-10">
            <div
              aria-hidden="true"
              className="absolute top-[1.125rem] h-px bg-rule"
              style={{ left: `${100 / (STEPS * 2)}%`, right: `${100 / (STEPS * 2)}%` }}
            >
              <motion.div style={{ width: fill }} className="relative h-full bg-tartan">
                <span className="absolute -right-px top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-[1px] bg-mint" />
              </motion.div>
            </div>
            <ul
              className="relative grid"
              style={{ gridTemplateColumns: `repeat(${STEPS}, minmax(0, 1fr))` }}
            >
              {chain.steps.map((s, i) => (
                <li key={s.key} className="flex justify-center">
                  <ChainNode
                    index={i}
                    label={s.key}
                    state={i === active ? "active" : i < active ? "past" : "future"}
                    onSelect={goTo}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* the story */}
          <div className="mt-14 grid grid-cols-12 items-start gap-x-12 xl:mt-16">
            <div className="col-span-5">
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <h3 className="display-1 text-ink">{step.key}</h3>
                <p className="mt-6 max-w-[26ch] text-[1.1875rem] leading-[1.58] text-ink-70">
                  {step.copy}
                </p>
              </motion.div>

              {/* every link feeds the next one */}
              <div
                className={`mt-10 flex items-center gap-3 transition-opacity duration-500 ${
                  active < LAST ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={active >= LAST}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-mint node-live" />
                <span className="label-mono-sm text-ink-40">
                  {chain.steps[Math.min(active + 1, LAST)].key}
                </span>
                <span className="h-px w-10 bg-rule" />
              </div>
            </div>

            <div className="col-span-6 col-start-7 xl:col-span-5 xl:col-start-8">
              <div className="relative h-[23rem]">
                {chainPanels.map((Panel, i) => (
                  <motion.div
                    key={chain.steps[i].key}
                    aria-hidden={i !== active}
                    initial={false}
                    animate={{
                      opacity: i === active ? 1 : 0,
                      y: i === active ? 0 : 10,
                    }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className={`absolute inset-x-0 top-0 ${
                      i === active ? "" : "pointer-events-none"
                    }`}
                  >
                    <Panel />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------- small screens: vertical timeline */

function ChainTimelineStep({
  index,
  step,
  Panel,
}: {
  index: number;
  step: { key: string; copy: string };
  Panel: React.ComponentType;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const [seen, setSeen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.6 && !seen) setSeen(true);
  });

  const lit = seen || reduce;

  return (
    <li ref={ref} className="relative grid grid-cols-[2.25rem_1fr] gap-x-4 pb-12 last:pb-0">
      {/* rail */}
      {index < LAST ? (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-[1.125rem] top-9 w-px -translate-x-1/2 bg-rule"
        >
          <motion.span style={{ height: fill }} className="block w-full bg-tartan" />
        </span>
      ) : null}

      <span
        aria-hidden="true"
        className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-[5px] border transition-colors duration-700 ${
          lit
            ? "border-tartan bg-tartan text-mint"
            : "border-rule bg-paper text-ink-40"
        }`}
      >
        <span className="num text-[0.6875rem] font-medium leading-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>

      <div className="min-w-0 pt-1">
        <h3 className="display-3 text-ink">{step.key}</h3>
        <p className="mt-2.5 max-w-[42ch] text-[1rem] leading-[1.6] text-ink-70">
          {step.copy}
        </p>
        <div className="mt-6 max-w-[26rem]">
          <Panel />
        </div>
      </div>
    </li>
  );
}

function ChainTimeline() {
  return (
    <div className="shell lg:hidden">
      <SectionLabel index="03" className="mb-6">
        {chain.eyebrow}
      </SectionLabel>
      <h2 className="display-2 mb-14 max-w-[18ch] text-ink">{chain.headline}</h2>
      <ol className="relative">
        {chain.steps.map((step, i) => (
          <ChainTimelineStep
            key={step.key}
            index={i}
            step={step}
            Panel={chainPanels[i]}
          />
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ export */

export function ConnectedChain() {
  return (
    <section
      id="connected-chain"
      data-theme="light"
      aria-labelledby="chain-heading"
      className="relative bg-paper py-20 sm:py-24 lg:py-0"
    >
      {/* intro — scrolls away before the stage pins */}
      <div className="shell hidden lg:block lg:pb-4 lg:pt-32">
        <Reveal delay={0.02}>
          <h2 id="chain-heading" className="display-1 max-w-[19ch] text-ink">
            {chain.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="label-mono mt-9 flex items-center gap-3 text-ink-40">
            <span aria-hidden="true" className="h-px w-10 bg-rule" />
            Scroll
          </p>
        </Reveal>
      </div>

      <ChainStage />
      <ChainTimeline />
    </section>
  );
}
