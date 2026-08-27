import type { ReactNode } from "react";

/**
 * A single read-out. Value first at large size, label underneath —
 * the way an operator scans a number before they read the word.
 */
export function MetricCard({
  value,
  label,
  tone = "light",
  emphasis = false,
  size = "md",
  className = "",
}: {
  value: ReactNode;
  label: string;
  tone?: "light" | "dark";
  emphasis?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dark = tone === "dark";
  const valueSize = {
    sm: "text-[1.375rem]",
    md: "text-[1.75rem] sm:text-[2rem]",
    lg: "text-[2.5rem] sm:text-[3rem]",
  }[size];

  return (
    <div
      className={`flex flex-col gap-2 border p-3.5 sm:p-4 ${
        emphasis
          ? dark
            ? "border-mint/45 bg-mint/[0.07]"
            : "border-tartan bg-tartan"
          : dark
            ? "border-rule-dark bg-white/[0.03]"
            : "border-rule bg-paper"
      } rounded-[6px] ${className}`}
    >
      <span
        className={`num font-medium leading-none tracking-[-0.02em] ${valueSize} ${
          emphasis
            ? dark
              ? "text-mint"
              : "text-mint"
            : dark
              ? "text-paper"
              : "text-ink"
        }`}
      >
        {value}
      </span>
      <span
        className={`label-mono-sm ${
          emphasis
            ? dark
              ? "text-mint/70"
              : "text-mint/70"
            : dark
              ? "text-paper/50"
              : "text-ink-40"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/** Horizontal quantity bar used for expected vs. actual comparisons. */
export function QuantityBar({
  percent,
  tone = "light",
  variant = "base",
  className = "",
}: {
  percent: number;
  tone?: "light" | "dark";
  variant?: "base" | "over";
  className?: string;
}) {
  const dark = tone === "dark";
  const track = dark ? "bg-white/[0.07]" : "bg-tartan/[0.07]";
  const fill =
    variant === "over" ? "bg-mint" : dark ? "bg-paper/85" : "bg-tartan";

  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-[2px] ${track} ${className}`}>
      <div
        className={`h-full rounded-[2px] ${fill}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
