"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PhoneMockup, PhoneTabs } from "@/components/ui/PhoneMockup";
import { Tick } from "@/components/ui/ProductWindow";
import {
  GlyphBox,
  GlyphChat,
  GlyphClock,
  GlyphInvoice,
  GlyphSheet,
} from "@/components/ui/Glyphs";

const EASE = [0.22, 1, 0.36, 1] as const;

const glyph = "h-[0.875rem] w-[0.875rem]";

const TABS = [
  { label: "Roster", icon: <GlyphSheet className={glyph} /> },
  { label: "Avail", icon: <GlyphChat className={glyph} /> },
  { label: "Clock", icon: <GlyphClock className={glyph} /> },
  { label: "Hours", icon: <GlyphInvoice className={glyph} /> },
  { label: "Stock", icon: <GlyphBox className={glyph} /> },
] as const;

const SCREEN_TITLES = [
  "This week",
  "Your availability",
  "Attendance",
  "Timesheet",
  "Stock count",
] as const;

const rowBase =
  "flex items-center justify-between gap-3 border-b border-rule-soft px-3.5 py-3 last:border-b-0";

/** Every screen fills the handset and anchors its summary to the bottom. */
const screenBase = "flex h-full flex-col";

/* ------------------------------------------------------------------ screens */

function ScreenRoster() {
  const shifts = [
    { day: "Mon", time: "4:00pm–9:00pm", area: "Floor" },
    { day: "Tue", time: "11:00am–4:00pm", area: "Kitchen" },
    { day: "Wed", time: "5:00pm–10:00pm", area: "Floor" },
    { day: "Thu", time: "9:00am–3:00pm", area: "Kitchen" },
    { day: "Fri", time: "3:00pm–10:00pm", area: "Floor" },
    { day: "Sat", time: "8:00am–4:00pm", area: "Kitchen" },
    { day: "Sun", time: "5:00pm–9:00pm", area: "Floor" },
  ];
  return (
    <div className={screenBase}>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ul>
          {shifts.map((s) => (
            <li key={s.day} className={rowBase}>
              <span className="flex min-w-0 flex-col gap-1.5">
                <span className="truncate text-[0.75rem] font-medium leading-none">
                  {s.day} · {s.time}
                </span>
                <span className="label-mono-sm text-[0.5625rem] text-ink-40">
                  {s.area}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-[1px] bg-mint"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-rule px-3.5 py-2.5">
        <span className="label-mono-sm text-[0.5625rem] text-ink-40">
          7 shifts
        </span>
        <span className="num text-[0.75rem] font-medium leading-none">
          40h 00m
        </span>
      </div>
    </div>
  );
}

function ScreenAvailability() {
  const days = [
    { day: "Mon", on: false },
    { day: "Tue", on: true },
    { day: "Wed", on: true },
    { day: "Thu", on: false },
    { day: "Fri", on: true },
    { day: "Sat", on: true },
    { day: "Sun", on: false },
  ];
  return (
    <div className={screenBase}>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ul>
          {days.map((d) => (
            <li key={d.day} className={rowBase}>
              <span className="text-[0.75rem] text-ink-70">{d.day}</span>
              <span
                aria-hidden="true"
                className={`flex h-[1.125rem] w-8 items-center rounded-full p-0.5 transition-colors ${
                  d.on ? "justify-end bg-tartan" : "justify-start bg-tartan/15"
                }`}
              >
                <span
                  className={`h-[0.875rem] w-[0.875rem] rounded-full ${
                    d.on ? "bg-mint" : "bg-paper"
                  }`}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-3.5 pb-3.5 pt-3.5">
        <span className="label-mono-sm flex h-9 items-center justify-center rounded-[5px] bg-ink text-[0.5625rem] text-paper">
          Submit
        </span>
      </div>
    </div>
  );
}

function ScreenClock() {
  return (
    <div className={screenBase}>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-3.5">
        <span className="label-mono-sm text-[0.5625rem] text-ink-40">
          Tapped in
        </span>
        <span className="num text-[2rem] font-medium leading-none tracking-[-0.03em]">
          3:02pm
        </span>
        <span className="flex items-center gap-1.5 rounded-[4px] border border-tartan/35 bg-mint/45 px-2 py-1.5 text-tartan">
          <Tick className="h-2.5 w-2.5" />
          <span className="label-mono-sm text-[0.5625rem]">On shift</span>
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-rule px-3.5 py-2.5">
        <span className="label-mono-sm text-[0.5625rem] text-ink-40">
          Elapsed
        </span>
        <span className="num text-[0.75rem] font-medium leading-none">
          6h 58m
        </span>
      </div>
    </div>
  );
}

function ScreenTimesheet() {
  const rows = [
    { day: "Mon", hours: "7h 30m" },
    { day: "Tue", hours: "6h 45m" },
    { day: "Wed", hours: "8h 00m" },
    { day: "Thu", hours: "7h 15m" },
    { day: "Fri", hours: "6h 30m" },
    { day: "Sat", hours: "5h 45m" },
    { day: "Sun", hours: "—" },
  ];
  return (
    <div className={screenBase}>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ul>
          {rows.map((r) => (
            <li key={r.day} className={rowBase}>
              <span className="text-[0.75rem] text-ink-70">{r.day}</span>
              <span className="num text-[0.75rem] font-medium">{r.hours}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between gap-3 bg-tartan px-3.5 py-3">
        <span className="label-mono-sm text-[0.5625rem] text-paper/55">
          Week total
        </span>
        <span className="num text-[1rem] font-medium leading-none text-mint">
          41h 45m
        </span>
      </div>
    </div>
  );
}

function ScreenStock() {
  const items = [
    { item: "Chicken breast", qty: "12.4", unit: "kg", done: true },
    { item: "Milk 2L", qty: "18", unit: "ea", done: true },
    { item: "Tomatoes", qty: "6.1", unit: "kg", done: true },
    { item: "Olive oil 4L", qty: "3", unit: "ea", done: true },
    { item: "Butter 500g", qty: "9", unit: "ea", done: true },
    { item: "Cream 1L", qty: "7", unit: "ea", done: true },
    { item: "Bacon 2kg", qty: "4.2", unit: "kg", done: true },
    { item: "Salmon fillet", qty: "5.8", unit: "kg", done: false },
    { item: "Parmesan", qty: "2.1", unit: "kg", done: false },
  ];
  return (
    <div className={screenBase}>
      <div className="flex items-center justify-between gap-3 border-b border-rule-soft px-3.5 py-1.5">
        <span className="label-mono-sm text-[0.5rem] text-ink-40">Item</span>
        <span className="label-mono-sm text-[0.5rem] text-ink-40">On hand</span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ul>
          {items.map((i) => (
            <li key={i.item} className={rowBase}>
              <span className="flex min-w-0 items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[2px] border ${
                    i.done
                      ? "border-tartan/40 bg-mint/50 text-tartan"
                      : "border-rule text-transparent"
                  }`}
                >
                  <Tick className="h-2 w-2" />
                </span>
                <span className="truncate text-[0.75rem] text-ink-70">
                  {i.item}
                </span>
              </span>
              <span className="num shrink-0 text-[0.75rem] font-medium">
                {i.qty}
                <span className="ml-1 text-ink-40">{i.unit}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-rule px-3.5 py-2.5">
        <span className="label-mono-sm text-[0.5625rem] text-ink-40">
          7 of 9 counted
        </span>
        <span className="label-mono-sm rounded-[3px] border border-mint bg-mint/45 px-1.5 py-1 text-[0.5rem] text-tartan">
          Counting
        </span>
      </div>
    </div>
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
      3600,
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
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-rule px-3.5 pb-2.5 pt-2">
          <span className="label-mono-sm text-[0.5625rem] text-ink-55">
            {SCREEN_TITLES[active]}
          </span>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-mint node-live"
          />
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className="h-full"
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
      </PhoneMockup>
    </div>
  );
}
