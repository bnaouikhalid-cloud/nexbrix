import { ProductWindow, Row, Chip, Tick } from "@/components/ui/ProductWindow";
import { QuantityBar } from "@/components/ui/MetricCard";

/**
 * Seven views of the same week's data, one per link in the chain. Every
 * number is carried forward from the panel before it — 20 ordered becomes
 * 18 received becomes the 2 flagged on the invoice, and the 12kg counted
 * becomes the 12kg compared against 50 dishes of 200g.
 */

const cellLabel = "label-mono-sm text-ink-40";
const cellValue = "num text-[0.8125rem] font-medium text-ink";

/* ------------------------------------------------------------------ COUNT */
function PanelCount() {
  const rows = [
    { item: "Chicken breast", onHand: "12.4", par: "15.0", low: true },
    { item: "Milk 2L", onHand: "18", par: "24", low: true },
    { item: "Tomatoes", onHand: "6.1", par: "6.0", low: false },
    { item: "Olive oil 4L", onHand: "3", par: "3", low: false },
  ];

  return (
    <ProductWindow path="Stock count · Cool room 1" meta="Tue 07:42" live>
      <div className="flex items-center justify-between px-3.5 pb-2 pt-3">
        <span className={cellLabel}>Item</span>
        <span className="flex gap-6">
          <span className={`${cellLabel} w-14 text-right`}>On hand</span>
          <span className={`${cellLabel} w-10 text-right`}>Par</span>
        </span>
      </div>
      <div className="border-t border-rule-soft">
        {rows.map((r) => (
          <Row key={r.item}>
            <span className="flex min-w-0 items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-4 w-4 items-center justify-center rounded-[2px] border border-tartan/40 bg-mint/50 text-tartan"
              >
                <Tick className="h-2.5 w-2.5" />
              </span>
              <span className="truncate text-[0.8125rem] text-ink-70">
                {r.item}
              </span>
            </span>
            <span className="ml-auto flex shrink-0 gap-6">
              <span className={`${cellValue} w-14 text-right`}>{r.onHand}</span>
              <span
                className={`num w-10 text-right text-[0.8125rem] ${
                  r.low ? "text-tartan" : "text-ink-40"
                }`}
              >
                {r.par}
              </span>
            </span>
          </Row>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-rule bg-shell/60 px-3.5 py-2.5">
        <span className={cellLabel}>4 of 4 counted</span>
        <Chip state="good">
          <Tick /> Complete
        </Chip>
      </div>
    </ProductWindow>
  );
}

/* ------------------------------------------------------------------ ORDER */
function PanelOrder() {
  const lines = [
    { item: "Chicken breast", need: "20", unit: "kg" },
    { item: "Milk 2L", need: "24", unit: "ea" },
  ];

  return (
    <ProductWindow path="Purchase order · Draft" meta="Meatsmith Co.">
      <div className="px-3.5 pb-1 pt-3">
        <span className={cellLabel}>Below par · suggested order</span>
      </div>
      <div className="mt-2 border-t border-rule-soft">
        {lines.map((l) => (
          <Row key={l.item}>
            <span className="truncate text-[0.8125rem] text-ink-70">
              {l.item}
            </span>
            <span className="ml-auto flex items-center gap-2">
              <span className={cellValue}>{l.need}</span>
              <span className="label-mono-sm text-ink-40">{l.unit}</span>
            </span>
          </Row>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 px-3.5 py-3">
        <span className={cellLabel}>PO #2481</span>
        <span className="label-mono-sm inline-flex items-center gap-2 rounded-[4px] bg-ink px-3 py-2 text-paper">
          Send order
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-mint" />
        </span>
      </div>
    </ProductWindow>
  );
}

/* ---------------------------------------------------------------- RECEIVE */
function PanelReceive() {
  return (
    <ProductWindow path="Delivery · PO #2481" meta="Thu 06:15" live>
      <div className="grid grid-cols-2 divide-x divide-rule-soft border-b border-rule-soft">
        <div className="flex flex-col gap-1.5 px-3.5 py-3.5">
          <span className="num text-[1.5rem] font-medium leading-none tracking-[-0.02em]">
            20
          </span>
          <span className={cellLabel}>Ordered</span>
        </div>
        <div className="flex flex-col gap-1.5 px-3.5 py-3.5">
          <span className="num text-[1.5rem] font-medium leading-none tracking-[-0.02em]">
            18
          </span>
          <span className={cellLabel}>Received</span>
        </div>
      </div>
      <Row>
        <span className="truncate text-[0.8125rem] text-ink-70">
          Chicken breast
        </span>
        <span className="ml-auto flex items-center gap-2">
          <span className={cellValue}>18 kg</span>
        </span>
      </Row>
      <div className="flex items-center justify-between gap-3 px-3.5 py-3">
        <span className={cellLabel}>Recorded at the door</span>
        <Chip state="flag">2 short</Chip>
      </div>
    </ProductWindow>
  );
}

/* ------------------------------------------------------------------ MATCH */
function PanelMatch() {
  const rows = [
    { k: "Purchase order", v: "20", state: "ok" as const },
    { k: "Delivery docket", v: "18", state: "ok" as const },
    { k: "Supplier invoice", v: "20", state: "flag" as const },
  ];

  return (
    <ProductWindow path="Invoice match · INV-90312" meta="Meatsmith Co." live>
      <div className="pt-1">
        {rows.map((r) => (
          <Row key={r.k}>
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 shrink-0 rounded-[1px] ${
                r.state === "flag" ? "bg-mint" : "bg-tartan/25"
              }`}
            />
            <span className="truncate text-[0.8125rem] text-ink-70">{r.k}</span>
            <span className="ml-auto flex items-center gap-2">
              <span className={cellValue}>{r.v}</span>
            </span>
          </Row>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-rule bg-tartan px-3.5 py-3.5">
        <span className="label-mono-sm text-paper/60">Difference</span>
        <span className="num text-[1.125rem] font-medium leading-none text-mint">
          2 to check
        </span>
      </div>
    </ProductWindow>
  );
}

/* ---------------------------------------------------------------- CONSUME */
function PanelConsume() {
  const rows = [
    { k: "Opening count", v: "6.4 kg" },
    { k: "Received", v: "18.0 kg" },
    { k: "Closing count", v: "12.4 kg" },
  ];

  return (
    <ProductWindow path="Consumption · Week 34" meta="Chicken breast">
      <div className="pt-1">
        {rows.map((r) => (
          <Row key={r.k}>
            <span className="truncate text-[0.8125rem] text-ink-70">{r.k}</span>
            <span className={`${cellValue} ml-auto`}>{r.v}</span>
          </Row>
        ))}
      </div>
      <div className="flex flex-col gap-3 px-3.5 py-3.5">
        <div className="flex items-center justify-between">
          <span className={cellLabel}>Actually used</span>
          <span className="num text-[1.5rem] font-medium leading-none tracking-[-0.02em]">
            12kg
          </span>
        </div>
        <QuantityBar percent={100} variant="over" />
      </div>
    </ProductWindow>
  );
}

/* ---------------------------------------------------------------- COMPARE */
function PanelCompare() {
  return (
    <ProductWindow path="Sales → recipe · Week 34" meta="Chicken dish" live>
      <div className="flex items-center gap-3 border-b border-rule-soft px-3.5 py-3">
        <span className="num text-[1.5rem] font-medium leading-none tracking-[-0.02em]">
          50
        </span>
        <span className={cellLabel}>dishes sold</span>
        <span aria-hidden="true" className="ml-auto h-5 w-px bg-rule" />
        <span className="num text-[1.5rem] font-medium leading-none tracking-[-0.02em]">
          200g
        </span>
        <span className={cellLabel}>per dish</span>
      </div>
      <div className="flex flex-col gap-3.5 px-3.5 py-4">
        <div className="flex items-center justify-between">
          <span className={cellLabel}>Should have used</span>
          <span className="num text-[0.875rem] font-medium">10kg</span>
        </div>
        <QuantityBar percent={83} />
        <div className="flex items-center justify-between pt-1">
          <span className="label-mono-sm text-tartan">Actually used</span>
          <span className="num text-[0.875rem] font-medium">12kg</span>
        </div>
        <QuantityBar percent={100} variant="over" />
      </div>
    </ProductWindow>
  );
}

/* ------------------------------------------------------------- UNDERSTAND */
function PanelUnderstand() {
  return (
    <ProductWindow path="Variance · Week 34" meta="Chicken breast" live>
      <div className="flex items-end justify-between gap-4 border-b border-rule-soft px-3.5 py-4">
        <span className="flex flex-col gap-2">
          <span className={cellLabel}>Difference</span>
          <span className="num text-[2.5rem] font-medium leading-none tracking-[-0.03em] text-tartan">
            +2kg
          </span>
        </span>
        <span className="flex flex-col items-end gap-2">
          <span className={cellLabel}>Cost</span>
          <span className="num text-[2.5rem] font-medium leading-none tracking-[-0.03em] text-tartan">
            $24
          </span>
        </span>
      </div>
      <div className="flex flex-col">
        <Row>
          <span className={cellLabel}>Expected</span>
          <span className={`${cellValue} ml-auto`}>10kg</span>
        </Row>
        <Row>
          <span className={cellLabel}>Actual</span>
          <span className={`${cellValue} ml-auto`}>12kg</span>
        </Row>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-rule bg-shell/60 px-3.5 py-2.5">
        <span className={cellLabel}>Flagged for review</span>
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-mint node-live"
        />
      </div>
    </ProductWindow>
  );
}

export const chainPanels = [
  PanelCount,
  PanelOrder,
  PanelReceive,
  PanelMatch,
  PanelConsume,
  PanelCompare,
  PanelUnderstand,
];
