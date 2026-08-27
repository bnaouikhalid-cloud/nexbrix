import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "mint" | "outline" | "outline-dark";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-[5px] " +
  "font-semibold tracking-[0.005em] transition-[transform,background-color,color,border-color,box-shadow] " +
  "duration-200 ease-[var(--ease-out-quint)] active:translate-y-px select-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-[3.25rem] px-7 text-base",
};

const variants: Record<Variant, string> = {
  /* Primary conversion action on light surfaces. */
  solid:
    "bg-ink text-paper hover:bg-tartan shadow-[0_1px_0_0_rgb(255_255_255_/_0.12)_inset]",
  /* Primary conversion action on Tartan Green surfaces. */
  mint: "bg-mint text-tartan hover:bg-paper",
  /* Secondary on light. */
  outline:
    "border border-rule text-ink bg-paper hover:border-tartan hover:bg-shell",
  /* Secondary on dark. */
  "outline-dark":
    "border border-rule-dark text-paper hover:border-mint hover:text-mint",
};

export function Button({
  href,
  children,
  variant = "solid",
  size = "md",
  className = "",
  trailing,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  trailing?: ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "children" | "className">) {
  return (
    <Link
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {trailing}
    </Link>
  );
}

/** The arrow used on secondary/tertiary actions. Slides on hover. */
export function ArrowTip({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

/** Small dot that fills with Super Mint on hover — used on the primary CTA. */
export function CtaDot() {
  return (
    <span
      aria-hidden="true"
      className="relative h-1.5 w-1.5 rounded-full bg-mint/45 transition-all duration-300 ease-[var(--ease-out-quint)] group-hover:bg-mint group-hover:shadow-[0_0_0_4px_rgb(189_235_207_/_0.18)]"
    />
  );
}

/** Underlined text link with a mint rule that draws in on hover. */
export function TextLink({
  href,
  children,
  tone = "light",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-baseline gap-2 text-[0.9375rem] leading-snug ${
        tone === "dark" ? "text-mint" : "text-tartan"
      } ${className}`}
    >
      <span
        className={`relative pb-1 ${
          tone === "dark"
            ? "shadow-[inset_0_-1px_0_0_rgb(189_235_207_/_0.35)]"
            : "shadow-[inset_0_-1px_0_0_rgb(10_41_36_/_0.25)]"
        }`}
      >
        {children}
        <span
          aria-hidden="true"
          className={`absolute bottom-0 left-0 h-px w-0 transition-[width] duration-400 ease-[var(--ease-out-quint)] group-hover:w-full ${
            tone === "dark" ? "bg-mint" : "bg-tartan"
          }`}
        />
      </span>
      <ArrowTip />
    </Link>
  );
}
