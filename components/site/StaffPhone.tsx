"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PhoneMockup, PhoneTabs } from "@/components/ui/PhoneMockup";
import { Tick } from "@/components/ui/ProductWindow";

const EASE = [0.22, 1, 0.36, 1] as const;
const TABS = ["Roster", "Avail", "Clock", "Hours", "Stock"] as const;
const SCREEN_TITLES = [
  "This week",
  "Your availability",
  "Attendance",
  "Timesheet",
  "Stock count",
] as const;

const rowBase =
  "flex items-center justify-between gap-3 border-b border-rule-soft px-4 py-3 last:border-b-0";

/* ------------------------------------------------------------------ screens */

function ScreenRoster() {
  const shifts = [
    { day: "Fri", time: "3:00pm–10:00pm", area: "Floor" },
    { day: "Sat", time: "8:00am–4:00pm", area: "Kitchen" },
    { day: "Sun", time: "5:00pm–9:00pm", area: "Floor" },
  ];
  return (
    <ul>
      {shifts.map((s) => (
        <li key={s.day} className={rowBase}>
          <span className="flex flex-col gap-1">
            <span className="text-[0.8125rem] font-medium leading-none">
              {s.day} · {s.time}
            </span>
            <span className="label-mono-sm text-ink-40">{s.area}</span>
          </span>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-[1px] bg-mint"
          />
        </li>
      ))}
    </ul>
  );
}

function ScreenAvailability() {
  const days = [
    { day: "Mon", on: false },
    { day: "Tue", on: true },
    { day: "Wed", on: true },
    { day: "Thu", on: false },
  ];
  return (
    <div>
      <ul>
        {days.map((d) => (
          <li key={d.day} className={rowBase}>
            <span className="text-[0.8125rem] text-ink-70">{d.day}</span>
            <span
              aria-hidden="true"
              className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${
                d.on ? "justify-end bg-tartan" : "justify-start bg-tartan/15"
              }`}
            >
              <span
                className={`h-4 w-4 rounded-full ${
                  d.on ? "bg-mint" : "bg-paper"
                }`}
              />
            </span>
          </li>
        ))}
      </ul>
      <div className="px-4 pb-4 pt-4">
        <span className="label-mono-sm flex h-10 items-center justify-center rounded-[5px] bg-ink text-paper">
          Submit
        </span>
      </div>
    </div>
  );
}

function ScreenClock() {
  return (
    <div className="flex flex-col items-center gap-5 px-4 py-7">
      <span className="label-mono-sm text-ink-40">Tapped in</span>
      <span className="num text-[2.5rem] font-medium leading-none tracking-[-0.03em]">
        3:02pm
      </span>
      <span className="flex items-center gap-2 rounded-[4px] border border-tartan/35 bg-mint/45 px-2.5 py-1.5 text-tartan">
        <Tick className="h-3 w-3" />
        <span className="label-mono-sm">On shift</span>
      </span>
      <span className="mt-1 h-px w-full bg-rule-soft" />
      <span className="flex w-full items-center justify-between">
        <span className="label-mono-sm text-ink-40">Elapsed</span>
        <span className="num text-[0.875rem] font-medium">6h 58m</span>
      </span>
    </div>
  );
}

function ScreenTimesheet() {
  const rows = [
    { day: "Mon", hours: "7h 30m" },
    { day: "Tue", hours: "6h 45m" },
    { day: "Wed", hours: "8h 00m" },
  ];
  return (
    <div>
      <ul>
        {rows.map((r) => (
          <li key={r.day} className={rowBase}>
            <span className="text-[0.8125rem] text-ink-70">{r.day}</span>
            <span className="num text-[0.8125rem] font-medium">{r.hours}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-3 bg-tartan px-4 py-3.5">
        <span className="label-mono-sm text-paper/55">Week total</span>
        <span className="num text-[1.125rem] font-medium leading-none text-mint">
          22h 15m
        </span>
      </div>
    </div>
  );
}

function ScreenStock() {
  const items = [
    { item: "Chicken breast", qty: "12.4 kg", done: true },
    { item: "Milk 2L", qty: "18 ea", done: true },
    { item: "Tomatoes", qty: "6.1 kg", done: false },
  ];
  return (
    <ul>
      {items.map((i) => (
        <li key={i.item} className={rowBase}>
          <span className="flex min-w-0 items-center gap-2.5">
            <span
              aria-hidden="true"
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] border ${
                i.done
                  ? "border-tartan/40 bg-mint/50 text-tartan"
                  : "border-rule text-transparent"
              }`}
            >
              <Tick className="h-2.5 w-2.5" />
            </span>
            <span className="truncate text-[0.8125rem] text-ink-70">
              {i.item}
            </span>
          </span>
          <span className="num shrink-0 text-[0.8125rem] font-medium">
            {i.qty}
          </span>
        </li>
      ))}
    </ul>
  );
}

const screens = [
  ScreenRoster,
  ScreenAvailability,
  ScreenClock,
  ScreenTimesheet,
  ScreenStock,
];

/* ------------------------------------------------------------------- phone */

/**
 * The employee side of NexBrix: five jobs, one app. Cycles on its own,
 * stops the moment someone interacts with it, and every tab is a real
 * button so it works from the keyboard.
 */
export function StaffPhone() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const reduce = useReducedMotion();

  const select = useCallback((i: number) => {
    setActive(i);
    setHeld(true);
  }, []);

  useEffect(() => {
    if (held || reduce) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % screens.length),
      3600
    );
    return () => window.clearInterval(id);
  }, [held, reduce]);

  const Screen = screens[active];

  return (
    <div
      onMouseEnter={() => setHeld(true)}
      onFocusCapture={() => setHeld(true)}
      className="relative"
    >
      <PhoneMockup label="The NexBrix staff app">
        <div className="flex h-[21.5rem] flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-rule px-4 pb-3">
            <span className="label-mono-sm text-ink-55">
              {SCREEN_TITLES[active]}
            </span>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-mint node-live"
            />
          </div>

          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <Screen />
              </motion.div>
            </AnimatePresence>
          </div>

          <PhoneTabs tabs={TABS} active={active} onSelect={select} />
        </div>
      </PhoneMockup>
    </div>
  );
}
