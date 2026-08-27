import { Tick } from "./ProductWindow";

export type NodeState = "past" | "active" | "future";

/**
 * Square nodes, not circles — the chain is built out of blocks, which is
 * also where the name comes from. Used on the connected-chain rail and on
 * the smaller category / approval rails.
 */
export function WorkflowNode({
  index,
  label,
  state,
  tone = "light",
  size = "md",
}: {
  index: number;
  label: string;
  state: NodeState;
  tone?: "light" | "dark";
  size?: "sm" | "md";
}) {
  const dark = tone === "dark";
  const box = size === "sm" ? "h-7 w-7" : "h-9 w-9";

  const shell =
    state === "active"
      ? dark
        ? "border-mint bg-mint text-tartan"
        : "border-tartan bg-tartan text-mint"
      : state === "past"
        ? dark
          ? "border-mint/55 bg-mint/15 text-mint"
          : "border-tartan/45 bg-mint/40 text-tartan"
        : dark
          ? "border-rule-dark bg-transparent text-paper/40"
          : "border-rule bg-paper text-ink-40";

  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={`${box} flex shrink-0 items-center justify-center rounded-[4px] border transition-colors duration-500 ease-[var(--ease-out-quint)] ${shell}`}
      >
        {state === "past" ? (
          <Tick />
        ) : (
          <span className="num text-[0.6875rem] font-medium leading-none">
            {String(index).padStart(2, "0")}
          </span>
        )}
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

/**
 * The connector between two nodes. `progress` (0–1) fills it with Super Mint
 * to show data moving from one operation to the next.
 */
export function RailSegment({
  progress,
  tone = "light",
  vertical = false,
  className = "",
}: {
  progress: number;
  tone?: "light" | "dark";
  vertical?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <span
      aria-hidden="true"
      className={`relative block ${
        vertical ? "w-px flex-none" : "h-px flex-1"
      } ${dark ? "bg-mint/20" : "bg-tartan/18"} ${className}`}
    >
      <span
        className={`absolute left-0 top-0 ${
          vertical ? "w-full" : "h-full"
        } bg-mint transition-[height,width] duration-700 ease-[var(--ease-out-quint)]`}
        style={
          vertical
            ? { height: `${clamped * 100}%` }
            : { width: `${clamped * 100}%` }
        }
      />
    </span>
  );
}

/** A small brick used as a bullet / tick mark on rails. */
export function Brick({
  filled = false,
  tone = "light",
  className = "",
}: {
  filled?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <span
      aria-hidden="true"
      className={`h-1.5 w-1.5 shrink-0 rounded-[1px] transition-colors duration-500 ${
        filled ? "bg-mint" : dark ? "bg-paper/25" : "bg-tartan/25"
      } ${className}`}
    />
  );
}
