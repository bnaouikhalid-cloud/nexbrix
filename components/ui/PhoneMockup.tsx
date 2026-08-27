import type { ReactNode } from "react";

/**
 * Employee-facing device frame. Kept plain — no glare, no bezel gradients —
 * so the screen content is what reads.
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
      className={`relative w-[17.5rem] shrink-0 rounded-[2.25rem] border border-ink/85 bg-ink p-[0.4375rem] shadow-lift sm:w-[19rem] ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="relative overflow-hidden rounded-[1.875rem] bg-paper">
        {/* speaker slot */}
        <div className="flex h-8 items-center justify-center">
          <span
            aria-hidden="true"
            className="h-1 w-12 rounded-full bg-ink/12"
          />
        </div>
        {children}
      </div>
    </div>
  );
}

/** Bottom tab bar for the employee app. */
export function PhoneTabs({
  tabs,
  active,
  onSelect,
}: {
  tabs: readonly string[];
  active: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <div
      className="mt-auto grid border-t border-rule bg-shell/60"
      style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
    >
      {tabs.map((tab, i) => {
        const isActive = i === active;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onSelect?.(i)}
            aria-pressed={isActive}
            className={`group relative flex flex-col items-center gap-1.5 py-2.5 outline-none transition-all duration-300 active:scale-95 focus-visible:ring-1 focus-visible:ring-tartan focus-visible:ring-inset ${
              isActive ? "bg-tartan/5" : "hover:bg-tartan/[0.02]"
            }`}
          >
            {isActive ? (
              <span
                aria-hidden="true"
                className="absolute inset-x-2 top-0 h-0.5 rounded-full bg-tartan"
              />
            ) : null}
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-[1px] transition-colors duration-300 ${
                isActive ? "bg-tartan" : "bg-tartan/25 group-hover:bg-tartan/50"
              }`}
            />
            <span
              className={`label-mono-sm text-[0.5625rem] tracking-[0.06em] transition-colors duration-300 ${
                isActive ? "text-tartan font-semibold" : "text-ink-40 group-hover:text-ink-55"
              }`}
            >
              {tab}
            </span>
          </button>
        );
      })}
    </div>
  );
}
