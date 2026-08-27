/**
 * The repeating editorial device that binds the page together:
 * a folio number, a short rule, then the section's eyebrow.
 */
export function SectionLabel({
  index,
  children,
  tone = "light",
  className = "",
}: {
  index: string;
  children?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const numberTone = tone === "dark" ? "text-mint" : "text-tartan";
  const ruleTone = tone === "dark" ? "bg-mint/35" : "bg-tartan/25";
  const textTone = tone === "dark" ? "text-paper/65" : "text-ink-55";

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <span className={`label-mono ${numberTone}`}>{index}</span>
      <span aria-hidden="true" className={`h-px w-8 shrink-0 ${ruleTone}`} />
      {children ? (
        <span className={`label-mono ${textTone}`}>{children}</span>
      ) : null}
    </div>
  );
}

/** Bare mono eyebrow, no folio. */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={`label-mono ${
        tone === "dark" ? "text-mint" : "text-tartan"
      } ${className}`}
    >
      {children}
    </p>
  );
}
