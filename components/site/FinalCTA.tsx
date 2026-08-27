import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button, TextLink } from "@/components/ui/Button";
import { chain, finalCta } from "@/lib/content";

/**
 * Section 06. The closing statement, on the deepest surface on the page.
 * The chain from section 03 reappears behind it at low contrast, still
 * carrying a pulse — the same system, still running.
 */
export function FinalCTA() {
  return (
    <section
      id="book-a-demo"
      data-theme="dark"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-tartan text-paper"
    >
      {/* --------------------------------------------------- deep background */}
      <div
        aria-hidden="true"
        className="grid-paper-dark pointer-events-none absolute inset-0 opacity-70"
        style={{
          maskImage:
            "radial-gradient(100% 70% at 20% 10%, #000 5%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(100% 70% at 20% 10%, #000 5%, transparent 80%)",
        }}
      />

      {/* ----------------------------------------------------- the closing */}
      <div className="shell relative py-24 sm:py-28 lg:py-36">
        <Reveal y={10}>
          <SectionLabel index="06" tone="dark" />
        </Reveal>

        <Reveal delay={0.06}>
          <h2
            id="cta-heading"
            className="display-1 mt-8 max-w-[20ch] text-paper"
          >
            {finalCta.lead}
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-10 border-t border-rule-dark pt-12 lg:mt-20 lg:grid-cols-12 lg:pt-14">
          <Reveal delay={0.1} className="lg:col-span-6">
            <p className="max-w-[46ch] text-[1.0625rem] leading-[1.68] text-paper/65">
              {finalCta.body}
            </p>
          </Reveal>

          <Reveal delay={0.16} className="lg:col-span-5 lg:col-start-8">
            <div className="flex flex-col items-start gap-8">
              <Button
                href="#book-a-demo"
                variant="mint"
                size="lg"
                trailing={
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-tartan/40 transition-colors duration-300 group-hover:bg-tartan"
                  />
                }
              >
                {finalCta.button}
              </Button>

              <ul className="flex flex-col gap-4">
                {finalCta.links.map((link) => (
                  <li key={link.text}>
                    <TextLink href={link.href} tone="dark">
                      {link.text}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* ------------------------------- the chain, still running underneath */}
        <div
          aria-hidden="true"
          className="mt-20 hidden border-t border-rule-dark pt-12 lg:block"
        >
          <div className="relative">
            <svg
              viewBox="0 0 1000 2"
              preserveAspectRatio="none"
              className="h-0.5 w-full"
            >
              <line
                x1="0"
                y1="1"
                x2="1000"
                y2="1"
                stroke="var(--color-mint)"
                strokeOpacity="0.16"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1="0"
                y1="1"
                x2="1000"
                y2="1"
                stroke="var(--color-mint)"
                strokeOpacity="0.7"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="rail-pulse"
              />
            </svg>
            <ul
              className="absolute inset-x-0 top-0 grid -translate-y-1/2"
              style={{
                gridTemplateColumns: `repeat(${chain.steps.length}, minmax(0, 1fr))`,
              }}
            >
              {chain.steps.map((s) => (
                <li key={s.key} className="flex flex-col items-center gap-4">
                  <span className="h-2 w-2 rounded-[1px] border border-mint/35 bg-tartan" />
                  <span className="label-mono-sm text-mint/25">{s.key}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
