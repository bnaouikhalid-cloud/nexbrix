import type { ReactNode } from "react";

/**
 * Small operational card used in composed visuals (hero, problem section).
 * One label, one payload — never a card full of charts.
 */
export function DataCard({
  label,
  status,
  children,
  tone = "light",
  className = "",
}: {
  label: string;
  status?: ReactNode;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={`rounded-[6px] border ${
        dark
          ? "border-rule-dark bg-tartan"
          : "border-rule bg-paper shadow-panel"
      } ${className}`}
    >
      <div
        className={`flex items-center justify-between gap-3 border-b px-3 py-2 ${
          dark ? "border-rule-dark-soft" : "border-rule-soft"
        }`}
      >
        <span
          className={`label-mono-sm ${dark ? "text-paper/60" : "text-ink-55"}`}
        >
          {label}
        </span>
        {status}
      </div>
      <div className="px-3 py-3">{children}</div>
    </div>
  );
}
