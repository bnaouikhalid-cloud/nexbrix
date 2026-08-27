/**
 * A tiny, uniform glyph set. 16px grid, 1.25 stroke, square caps — drawn to
 * label operational objects, never as decoration.
 */
type GlyphProps = { className?: string };

const base = "h-4 w-4 shrink-0";

function Svg({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={`${base} ${className}`}
    >
      {children}
    </svg>
  );
}

export function GlyphSheet({ className }: GlyphProps) {
  return (
    <Svg className={className}>
      <rect x="2.5" y="2" width="11" height="12" />
      <path d="M2.5 6h11M6.5 6v8M2.5 10h11" />
    </Svg>
  );
}

export function GlyphMail({ className }: GlyphProps) {
  return (
    <Svg className={className}>
      <rect x="2" y="3.5" width="12" height="9" />
      <path d="m2 4.5 6 4.5 6-4.5" />
    </Svg>
  );
}

export function GlyphTruck({ className }: GlyphProps) {
  return (
    <Svg className={className}>
      <path d="M1.5 4h8v7h-8zM9.5 6.5h3l2 2.5v2h-5z" />
      <circle cx="4.5" cy="12.5" r="1.2" />
      <circle cx="11.5" cy="12.5" r="1.2" />
    </Svg>
  );
}

export function GlyphInvoice({ className }: GlyphProps) {
  return (
    <Svg className={className}>
      <path d="M3.5 1.8h9v12.4l-2-1.2-2 1.2-2-1.2-2 1.2z" />
      <path d="M6 5.5h4M6 8.5h4" />
    </Svg>
  );
}

export function GlyphPos({ className }: GlyphProps) {
  return (
    <Svg className={className}>
      <rect x="2" y="2.5" width="12" height="8" />
      <path d="M5.5 13.5h5M8 10.5v3M4.5 5h3" />
    </Svg>
  );
}

export function GlyphClock({ className }: GlyphProps) {
  return (
    <Svg className={className}>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5V8l2.5 1.6" />
    </Svg>
  );
}

export function GlyphChat({ className }: GlyphProps) {
  return (
    <Svg className={className}>
      <path d="M2.5 2.5h11v8h-6l-3.5 3v-3h-1.5z" />
    </Svg>
  );
}

export function GlyphBox({ className }: GlyphProps) {
  return (
    <Svg className={className}>
      <path d="m8 1.8 5.5 3v6.4L8 14.2 2.5 11.2V4.8z" />
      <path d="M2.5 4.8 8 7.9l5.5-3.1M8 7.9v6.3" />
    </Svg>
  );
}

export function GlyphNodes({ className }: GlyphProps) {
  return (
    <Svg className={className}>
      <rect x="1.6" y="6.4" width="3.2" height="3.2" />
      <rect x="11.2" y="2" width="3.2" height="3.2" />
      <rect x="11.2" y="10.8" width="3.2" height="3.2" />
      <path d="M4.8 8h3.4V3.6h3M8.2 8v4.4h3" />
    </Svg>
  );
}
