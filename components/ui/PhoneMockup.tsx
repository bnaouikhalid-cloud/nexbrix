import type { ReactNode } from "react";

/**
 * Employee-facing device frame. Kept plain — no glare, no bezel gradients —
 * so the screen content is what reads. Proportions follow a real handset
 * (9:19), and the bezel radius is concentric with the screen's so the
 * corners nest instead of fighting each other.
 */
export function PhoneMockup({
  children,
  className = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`relative w-[13.5rem] shrink-0 rounded-[2.125rem] bg-ink p-[0.3125rem] shadow-lift ring-1 ring-ink/90 sm:w-[15rem] ${className}`}
      role="group"
      aria-label={label}
    >
      <div className="relative flex aspect-[9/19] flex-col overflow-hidden rounded-[1.8125rem] bg-paper">
        {/* camera island */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[0.4375rem] z-20 h-[1.0625rem] w-[3.25rem] -translate-x-1/2 rounded-full bg-ink"
        />

        <StatusBar />

        <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>

        {/* home indicator */}
        <div className="flex justify-center pb-[0.4375rem] pt-1.5">
          <span
            aria-hidden="true"
            className="h-[3px] w-[34%] rounded-full bg-ink/20"
          />
        </div>
      </div>
    </div>
  );
}

/** The handset's own chrome — clock left, radios right, island between. */
function StatusBar() {
  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-center justify-between px-3.5 pb-1.5 pt-[0.5625rem]"
    >
      <span className="num text-[0.5625rem] font-semibold leading-none text-ink">
        3:02
      </span>
      <span className="flex items-center gap-[3px] text-ink/70">
        {/* signal */}
        <svg
          viewBox="0 0 14 10"
          className="h-[7px] w-[10px]"
          fill="currentColor"
        >
          <rect x="0" y="7" width="2.4" height="3" rx="0.5" />
          <rect x="3.6" y="5" width="2.4" height="5" rx="0.5" />
          <rect x="7.2" y="2.6" width="2.4" height="7.4" rx="0.5" />
          <rect x="10.8" y="0" width="2.4" height="10" rx="0.5" />
        </svg>
        {/* wifi */}
        <svg
          viewBox="0 0 14 10"
          className="h-[7px] w-[10px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        >
          <path d="M1 3.4a8.4 8.4 0 0 1 12 0" />
          <path d="M3.4 6a5 5 0 0 1 7.2 0" />
          <circle cx="7" cy="8.6" r="0.5" fill="currentColor" stroke="none" />
        </svg>
        {/* battery */}
        <svg viewBox="0 0 22 10" className="h-[7px] w-[15px]" fill="none">
          <rect
            x="0.6"
            y="0.6"
            width="18"
            height="8.8"
            rx="2.2"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.1"
          />
          <rect
            x="2.3"
            y="2.3"
            width="12"
            height="5.4"
            rx="1.2"
            fill="currentColor"
          />
          <path
            d="M20.4 3.6v2.8a1.7 1.7 0 0 0 0-2.8Z"
            fill="currentColor"
            fillOpacity="0.45"
          />
        </svg>
      </span>
    </div>
  );
}

/** Bottom tab bar for the employee app. */
export function PhoneTabs({
  tabs,
  active,
  onSelect,
}: {
  tabs: readonly { label: string; icon: ReactNode }[];
  active: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <div
      className="mt-auto grid shrink-0 border-t border-rule bg-shell/60 px-1 pb-1 pt-1"
      style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
    >
      {tabs.map((tab, i) => {
        const isActive = i === active;
        return (
          <button
            key={tab.label}
            type="button"
            onClick={() => onSelect?.(i)}
            aria-pressed={isActive}
            className={`group relative flex flex-col items-center gap-1 rounded-[6px] py-1.5 outline-none transition-colors duration-300 active:scale-95 focus-visible:ring-1 focus-visible:ring-tartan ${
              isActive ? "bg-tartan/[0.07]" : "hover:bg-tartan/[0.03]"
            }`}
          >
            <span
              aria-hidden="true"
              className={`transition-colors duration-300 ${
                isActive ? "text-tartan" : "text-ink-40 group-hover:text-ink-55"
              }`}
            >
              {tab.icon}
            </span>
            <span
              className={`label-mono-sm text-[0.5rem] tracking-[0.06em] transition-colors duration-300 ${
                isActive
                  ? "font-semibold text-tartan"
                  : "text-ink-40 group-hover:text-ink-55"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
