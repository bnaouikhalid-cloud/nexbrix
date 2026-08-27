import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { footer } from "@/lib/content";

/** Column widths — Solutions carries the longest labels, so it gets more room. */
const spans: Record<string, string> = {
  Product: "lg:col-span-2",
  Solutions: "lg:col-span-3",
  Resources: "lg:col-span-3",
  Company: "lg:col-span-2",
};

/**
 * A quiet, structured finish. The wordmark sits on white with clear space,
 * and the rail that has run the length of the page terminates on the rule
 * above it.
 */
export function Footer() {
  return (
    <footer
      data-theme="light"
      className="relative bg-paper"
      aria-label="Site footer"
    >
      <div className="shell">
        {/* terminating node on the page-long rail */}
        <div className="relative border-t border-rule">
          <span
            aria-hidden="true"
            className="absolute -top-[3px] left-0 h-1.5 w-1.5 rounded-[1px] bg-tartan"
          />
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 pb-14 pt-16 sm:grid-cols-4 lg:grid-cols-12 lg:gap-x-10 lg:pb-16 lg:pt-20">
          <div className="col-span-2 sm:col-span-4 lg:col-span-2">
            <Logo height={24} />
          </div>

          {footer.columns.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className={spans[column.title] ?? "lg:col-span-2"}
            >
              <h2 className="label-mono font-mono text-ink-40">{column.title}</h2>
              <ul className="mt-6 flex flex-col gap-3.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="group inline-flex items-start gap-2 text-[0.9375rem] leading-snug text-ink-70 transition-colors duration-200 hover:text-ink"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.5em] h-1 w-1 shrink-0 rounded-[1px] bg-transparent transition-colors duration-200 group-hover:bg-mint"
                      />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-rule py-7 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {footer.legal.map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="label-mono-sm text-ink-40 transition-colors duration-200 hover:text-ink"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <p className="label-mono-sm text-ink-40">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
