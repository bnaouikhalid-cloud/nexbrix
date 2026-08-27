import { Button, ArrowTip, CtaDot } from "@/components/ui/Button";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { HeroComposition } from "./HeroComposition";
import { hero } from "@/lib/content";

/**
 * Section 01. The statement runs the full measure so the three sentences
 * hold their own lines at their largest size; the body, the actions and the
 * live composition sit underneath in an asymmetric row, and the category
 * rail closes the section — introducing the chain motif on first paint.
 */
export function Hero() {
  return (
    <section
      id="product"
      data-theme="light"
      aria-labelledby="hero-heading"
      className="relative pt-[7rem] sm:pt-[8rem] lg:pt-[9.5rem]"
    >
      <div className="shell">
        <Reveal y={10}>
          <p className="label-mono flex items-center gap-3 text-tartan">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-[1px] bg-mint ring-1 ring-tartan/30"
            />
            {hero.eyebrow}
          </p>
        </Reveal>

        <h1 id="hero-heading" className="display-1 mt-7 text-ink sm:mt-8">
          <RevealLines lines={hero.headline} delay={0.08} />
        </h1>

        {/* On desktop the row margin sets the headline-to-composition gap; the
            body column adds the balance back so the copy keeps its old start. */}
        <div className="mt-12 grid grid-cols-1 items-start gap-x-10 gap-y-14 lg:mt-9 lg:grid-cols-12">
          {/* --------------------------------------------- body + actions */}
          <div className="lg:col-span-5 lg:pt-7">
            <Reveal delay={0.35} y={14}>
              <p className="text-[1.0625rem] leading-[1.62] text-ink-70">
                {hero.body}
              </p>
            </Reveal>

            <Reveal delay={0.45} y={14}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button
                  href="#book-a-demo"
                  variant="solid"
                  size="lg"
                  trailing={<CtaDot />}
                >
                  {hero.primaryCta}
                </Button>
                <Button
                  href="#connected-chain"
                  variant="outline"
                  size="lg"
                  trailing={<ArrowTip />}
                >
                  {hero.secondaryCta}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* --------------------------------------------------- composition */}
          <div className="lg:col-span-6 lg:col-start-7">
            <HeroComposition />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------ category rail */}
      <Reveal delay={0.6} y={0}>
        <div className="shell mt-16 sm:mt-20 lg:mt-24">
          <div className="border-t border-rule pt-5">
            <ul className="flex flex-wrap items-center gap-x-1 gap-y-3">
              {hero.categories.map((category, i) => (
                <li key={category} className="flex items-center gap-1">
                  <span className="flex items-center gap-2.5 pr-1">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-[1px] bg-tartan"
                    />
                    <span className="label-mono text-ink-70">{category}</span>
                  </span>
                  {i < hero.categories.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="mr-1 hidden h-px w-8 bg-rule sm:block lg:w-16"
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
