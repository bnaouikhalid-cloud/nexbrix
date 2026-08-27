import Image from "next/image";
import Link from "next/link";

/**
 * Supplied brand asset. Never recoloured, stretched, skewed or filtered —
 * it is only ever placed on white / near-white surfaces with clear space,
 * which is why the header and footer stay light throughout the page.
 */
export function Logo({
  height = 22,
  className = "",
  priority = false,
}: {
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const width = Math.round(height * 3.966); // native 4395 × 1108

  return (
    <Link
      href="#top"
      aria-label="NexBrix — home"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/brand/nexbrix-logo.png"
        alt="NexBrix"
        width={width}
        height={height}
        priority={priority}
        sizes={`${width}px`}
        style={{ width, height }}
      />
    </Link>
  );
}

/** NB monogram, same rules as the wordmark. */
export function LogoMark({
  height = 18,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  const width = Math.round(height * 1.427); // native 3322 × 2327

  return (
    <Image
      src="/brand/nexbrix-icon.png"
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      sizes={`${width}px`}
      style={{ width, height }}
      className={className}
    />
  );
}
