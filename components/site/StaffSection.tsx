import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { StaffPhone } from "./StaffPhone";
import { staff } from "@/lib/content";

/**
 * Section 05. Deliberately the lightest part of the page: fewer rules, a
 * single Super Mint field, one device. Arrive → Tap → Work → Tap → Done
 * runs underneath as the smallest chain on the site.
 */
export function StaffSection() {
  return (
    <section
      id="staff"
      data-theme="light"
      aria-labelledby="staff-heading"
      className="section-y border-y border-rule bg-shell"
    >
      <div className="shell">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-14 lg:grid-cols-12">
          {/* -------------------------------------------------- statement */}
          <div className="lg:col-span-5">
            <Reveal y={10}>
              <SectionLabel index="05">{staff.eyebrow}</SectionLabel>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 id="staff-heading" className="display-2 mt-7 max-w-[15ch] text-ink">
                {staff.headline}
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="lede mt-8 max-w-[36ch]">{staff.body}</p>
            </Reveal>
          </div>

          {/* ------------------------------------------------------- device */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1} y={24}>
              <div className="relative isolate flex justify-center overflow-hidden rounded-lg bg-mint px-6 py-12 sm:px-10 sm:py-16">
                <Image
                  src="/hospitality/staff-cafe.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-tartan/25"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-lg border border-tartan/15"
                />
                <div className="relative z-10">
                  <StaffPhone />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---------------------------------------------- Arrive → … → Done */}
        <Reveal y={10}>
          <div className="mt-16 border-t border-rule pt-8 sm:mt-20">
            <ol className="flex flex-wrap items-center gap-x-1 gap-y-4">
              {staff.flow.map((step, i) => {
                const isTap = step === "Tap";
                return (
                  <li key={`${step}-${i}`} className="flex items-center gap-1">
                    <span className="flex items-center gap-2.5 pr-1">
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-[1px] ${
                          isTap ? "bg-mint ring-1 ring-tartan/30" : "bg-tartan"
                        }`}
                      />
                      <span
                        className={`label-mono ${
                          isTap ? "text-tartan" : "text-ink-70"
                        }`}
                      >
                        {step}
                      </span>
                    </span>
                    {i < staff.flow.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="mr-1 hidden h-px w-8 bg-rule sm:block lg:w-16"
                      />
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
