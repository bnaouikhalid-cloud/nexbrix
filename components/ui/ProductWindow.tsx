import type { ReactNode } from "react";

/**
 * The frame every NexBrix product visual sits in. Deliberately not a
 * browser/laptop chrome: it's an application panel with a breadcrumb, a
 * venue clock and a sync state — the things an operator actually looks at.
 */
export function ProductWindow({
  path,
  meta,
  children,
  tone = "light",
  live = false,
  className = "",
  bodyClassName = "",
}: {
  path: string;
  meta?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  live?: boolean;
  className?: string;
  bodyClassName?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={`overflow-hidden rounded-lg border ${
        dark
          ? "border-rule-dark bg-tartan"
          : "border-rule bg-paper shadow-panel"
      } ${className}`}
    >
      <div
        className={`flex h-10 items-center justify-between gap-4 border-b px-3.5 ${
          dark ? "border-rule-dark bg-white/[0.03]" : "border-rule bg-shell/70"
        }`}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              live ? "bg-mint node-live" : dark ? "bg-mint/40" : "bg-tartan/35"
            }`}
          />
          <span
            className={`label-mono-sm truncate ${
              dark ? "text-paper/70" : "text-ink-55"
            }`}
          >
            {path}
          </span>
        </div>
        {meta ? (
          <span
            className={`label-mono-sm shrink-0 ${
              dark ? "text-paper/45" : "text-ink-40"
            }`}
          >
            {meta}
          </span>
        ) : null}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

/** A row of the operational tables used inside product windows. */
export function Row({
  children,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={`flex items-center gap-3 border-b px-3.5 py-2.5 last:border-b-0 ${
        tone === "dark" ? "border-rule-dark-soft" : "border-rule-soft"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** Status chip. Mint is reserved for the confirmed / matched state. */
export function Chip({
  children,
  state = "neutral",
  className = "",
}: {
  children: ReactNode;
  state?: "neutral" | "good" | "flag" | "dark";
  className?: string;
}) {
  const styles = {
    neutral: "border-rule text-ink-55 bg-transparent",
    good: "border-mint bg-mint/45 text-tartan",
    flag: "border-tartan bg-tartan text-mint",
    dark: "border-rule-dark text-paper/70 bg-white/[0.04]",
  }[state];

  return (
    <span
      className={`label-mono-sm inline-flex items-center gap-1.5 rounded-[3px] border px-1.5 py-1 ${styles} ${className}`}
    >
      {children}
    </span>
  );
}

/** The check used throughout the approval chain. */
export function Tick({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="square"
      className={`h-3 w-3 ${className}`}
    >
      <path d="M2 6.4 4.7 9 10 3.2" />
    </svg>
  );
}
