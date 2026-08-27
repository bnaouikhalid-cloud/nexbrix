import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { GlyphNodes } from "@/components/ui/Glyphs";
import { FragmentField } from "./FragmentField";
import { problem } from "@/lib/content";

/**
 * Section 02. Editorial split at the top — statement against body copy —
 * then the fragmentation-to-connection visual runs full width beneath it.
 */
export function ProblemSection() {
  return (
    <section
      id="solutions"
      data-theme="light"
      aria-labelledby="problem-heading"
      className="section-y relative mt-16 border-y border-rule bg-shell sm:mt-20 lg:mt-24"
    >
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal y={10}>
              <SectionLabel index="02" />
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                id="problem-heading"
                className="display-2 mt-6 max-w-[16ch] text-ink"
              >
                {problem.headline}
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pt-14">
            <Reveal delay={0.12}>
              <p className="text-[1.0625rem] leading-[1.66] text-ink-70">
                {problem.body}
              </p>
            </Reveal>
          </div>
        </div>

        {/* ------------------------------------------- fragments → one rail */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <FragmentField />
        </div>

        {/* ------------------------------------------------------- resolution */}
        <Reveal delay={0.05}>
          <div className="mt-14 flex flex-col gap-6 border-t border-rule pt-8 sm:mt-16 lg:flex-row lg:items-start lg:gap-14">
            <div className="flex items-center gap-3 lg:w-[22%] lg:shrink-0">
              <GlyphNodes className="text-tartan" />
              <span className="label-mono text-ink-55">NexBrix</span>
            </div>
            <p className="display-3 max-w-[28ch] text-ink lg:max-w-[34ch]">
              {problem.resolve}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
