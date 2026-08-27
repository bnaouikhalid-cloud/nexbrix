"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { ProductWindow, Row, Chip, Tick } from "@/components/ui/ProductWindow";
import { purchasing } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 12"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="square"
      vectorEffect="non-scaling-stroke"
      className={`h-3 w-5 shrink-0 ${className}`}
    >
      <path d="M0 6h17M13 2.2 16.8 6 13 9.8" />
    </svg>
  );
}

/** Ordered 20 → Delivered 18 → Invoiced 20 → 2 to check */
function Ledger() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
      {purchasing.ledger.map((cell, i) => {
        const isDiff = i === purchasing.ledger.length - 1;
        return (
          <Fragment key={cell.label}>
            <div
              className={`flex flex-col justify-center gap-2 px-3.5 py-4 ${
                isDiff ? "bg-tartan" : ""
              } ${i < 2 ? "border-b border-rule-soft sm:border-b-0" : ""} ${
                i % 2 === 0 ? "border-r border-rule-soft sm:border-r-0" : ""
              }`}
            >
              <span
                className={`num text-[1.5rem] font-medium leading-none tracking-[-0.025em] lg:text-[1.75rem] ${
                  isDiff ? "text-mint" : "text-ink"
                }`}
              >
                {cell.value}
              </span>
              <span
                className={`label-mono-sm ${
                  isDiff ? "text-paper/55" : "text-ink-40"
                }`}
              >
                {cell.label}
              </span>
            </div>
            {i < purchasing.ledger.length - 1 ? (
              <div className="hidden items-center justify-center sm:flex">
                <Arrow className="text-tartan/40" />
              </div>
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}

/** The three documents behind the numbers above. */
const documents = [
  { name: "Purchase order", ref: "PO-2481", qty: "20", flagged: false },
  { name: "Delivery docket", ref: "DD-1180", qty: "18", flagged: false },
  { name: "Supplier invoice", ref: "INV-90312", qty: "20", flagged: true },
];

/** Order ✓ → Delivery ✓ → Invoice ✓ → Approved for payment */
function ApprovalChain() {
  const reduce = useReducedMotion();

  return (
    <ol className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
      {purchasing.approval.map((label, i) => {
        const isLast = i === purchasing.approval.length - 1;
        return (
          <motion.li
            key={label}
            className="relative flex items-center gap-4 lg:block"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: i * 0.14, ease: EASE }}
          >
            {/* rail */}
            <span
              aria-hidden="true"
              className="absolute left-[1.0625rem] top-9 h-[calc(100%-1.25rem)] w-px bg-rule sm:hidden"
            />
            <span
              aria-hidden="true"
              className={`absolute left-9 right-4 top-[1.0625rem] hidden h-px bg-rule lg:block ${
                isLast ? "lg:hidden" : ""
              }`}
            />

            <span
              className={`relative z-10 flex h-[2.125rem] w-[2.125rem] shrink-0 items-center justify-center rounded-[5px] border ${
                isLast
                  ? "border-tartan bg-tartan text-mint"
                  : "border-tartan/40 bg-mint/45 text-tartan"
              }`}
            >
              <Tick className="h-3.5 w-3.5" />
            </span>

            <span
              className={`label-mono block lg:mt-4 ${
                isLast ? "text-ink" : "text-ink-55"
              }`}
            >
              {label}
            </span>
          </motion.li>
        );
      })}
    </ol>
  );
}

/**
 * Section 04. A focused split: the statement on the left, one believable
 * purchase order on the right with the mismatch already found, then the
 * clean run underneath it as a full-width band.
 */
export function PurchasingMatching() {
  return (
    <section
      id="purchasing"
      data-theme="light"
      aria-labelledby="purchasing-heading"
      className="section-y bg-paper"
    >
      <div className="shell">
        <div className="grid grid-cols-1 items-start gap-x-12 gap-y-12 lg:grid-cols-12">
          {/* -------------------------------------------------- statement */}
          <div className="lg:col-span-5">
            <Reveal y={10}>
              <SectionLabel index="04">{purchasing.eyebrow}</SectionLabel>
            </Reveal>

            {/* the three supplied sentences, set as one flowing statement */}
            <Reveal delay={0.05}>
              <h2 id="purchasing-heading" className="display-2 mt-7 text-ink">
                {purchasing.headline.join(" ")}
              </h2>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-8 max-w-[34ch] text-[1.0625rem] leading-[1.6] text-ink-70">
                {purchasing.support}
              </p>
            </Reveal>

            <Reveal delay={0.36}>
              <p className="sr-only">{purchasing.ledgerLine}</p>
            </Reveal>
          </div>

          {/* ------------------------------------------------ purchase order */}
          <Reveal delay={0.1} y={22} className="lg:col-span-6 lg:col-start-7">
            <ProductWindow
              path="PO #2481 · Meatsmith Co."
              meta="Chicken breast"
              live
              className="lg:translate-y-2"
            >
              <Ledger />

              <div className="border-t border-rule">
                <div className="flex items-center gap-3 px-3.5 pb-1.5 pt-3">
                  <span className="label-mono-sm text-ink-40">Document</span>
                  <span className="label-mono-sm ml-auto w-10 text-right text-ink-40">
                    Qty
                  </span>
                  <span className="w-[5.5rem]" />
                </div>
                {documents.map((doc) => (
                  <Row key={doc.ref}>
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 shrink-0 rounded-[1px] ${
                        doc.flagged ? "bg-mint" : "bg-tartan/25"
                      }`}
                    />
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="truncate text-[0.8125rem] leading-none text-ink-70">
                        {doc.name}
                      </span>
                      <span className="label-mono-sm text-ink-40">{doc.ref}</span>
                    </span>
                    <span className="num ml-auto w-10 text-right text-[0.8125rem] font-medium">
                      {doc.qty}
                    </span>
                    <span className="flex w-[5.5rem] justify-end">
                      {doc.flagged ? (
                        <Chip state="flag">2 to check</Chip>
                      ) : (
                        <Chip state="good">
                          <Tick />
                        </Chip>
                      )}
                    </span>
                  </Row>
                ))}
              </div>
            </ProductWindow>
          </Reveal>
        </div>

        {/* ------------------------------------------------- the clean run */}
        <div className="mt-16 border-t border-rule pt-10 sm:mt-20 lg:mt-24">
          <p className="sr-only">{purchasing.approvalLine}</p>
          <div aria-hidden="true">
            <ApprovalChain />
          </div>
        </div>
      </div>
    </section>
  );
}
