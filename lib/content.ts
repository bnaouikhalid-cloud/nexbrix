/**
 * NexBrix homepage copy.
 *
 * Every string in this file is transcribed VERBATIM from the
 * "NexBrix Homepage Design Competition - Creative Brief (v2)" PDF.
 * Do not rewrite, paraphrase or "improve" any of it, and do not alter
 * the canonical proof-point figures (50 / 200g / 10kg / 12kg / +2kg / $24).
 * Layout may reflow this copy; the words themselves are locked.
 */

export const nav = {
  links: [
    { label: "Product", href: "#product" },
    { label: "Solutions", href: "#solutions" },
    { label: "Resources", href: "#resources" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
  ],
  login: { label: "Login", href: "#login" },
  cta: { label: "Book a Demo", href: "#book-a-demo" },
} as const;

export const hero = {
  eyebrow: "BUILT FOR HOSPITALITY",
  headline: [
    "Know what you have.",
    "Know what you use.",
    "Know where your money goes.",
  ],
  body: "NexBrix connects your stock, purchasing, deliveries, sales and staff operations — so you can spot waste, make better decisions and protect your margins.",
  categories: ["Stock", "Purchasing", "Deliveries", "Sales", "Staff"],
  primaryCta: "Book a Demo",
  secondaryCta: "See How It Works",
} as const;

export const problem = {
  index: "02",
  headline: "You can't control what you can't see.",
  body: "Stock gets counted. Orders are sent. Deliveries arrive. Invoices come later. Sales sit in your POS. Staff work their shifts — and it all lives in separate spreadsheets, emails and systems.",
  resolve:
    "NexBrix brings it together, so you can see the bigger picture without adding more complexity.",
  fragments: [
    "Stock Sheet",
    "Email Order",
    "Delivery",
    "Invoice",
    "POS",
    "Timesheet",
    "WhatsApp",
  ],
} as const;

export const chain = {
  index: "03",
  eyebrow: "THE CONNECTED CHAIN, PROVEN",
  headline: "From today's stock count to the numbers that matter.",
  steps: [
    { key: "COUNT", copy: "See what you actually have." },
    {
      key: "ORDER",
      copy: "See what needs replenishing and create the purchase order.",
    },
    {
      key: "RECEIVE",
      copy: "Record what actually arrived when the supplier delivers it.",
    },
    {
      key: "MATCH",
      copy: "Automatically compare invoices with deliveries and flag anything that doesn't match.",
    },
    { key: "CONSUME", copy: "See what stock has actually been used." },
    {
      key: "COMPARE",
      copy: "Compare actual consumption with what your sales and recipes say should have been used.",
    },
    {
      key: "UNDERSTAND",
      copy: "See the differences and get a clearer picture of where your money is going.",
    },
  ],
} as const;

/**
 * CANONICAL PROOF POINT — figures are locked site-wide.
 * 50 dishes / 200g per dish / 10kg expected / 12kg actually used / +2kg / $24
 */
export const variance = {
  headline: ["You sold 50 chicken dishes.", "Your stock says you used 12kg, not 10kg."],
  facts: [
    { value: "50", unit: "dishes sold", raw: "50 dishes sold" },
    { value: "200g", unit: "per dish", raw: "200g per dish" },
    { value: "10kg", unit: "expected", raw: "10kg expected" },
    { value: "12kg", unit: "actually used", raw: "12kg actually used" },
  ],
  result: { amount: "+2kg", cost: "$24", label: "variance" },
  body: "Waste? Over-portioning? Staff meals? Recipe issue? Recording error? Something else? NexBrix connects sales, recipes and stock data so the difference — and what it costs you — is visible.",
} as const;

export const purchasing = {
  index: "04",
  eyebrow: "PURCHASING & INVOICE MATCHING",
  headline: [
    "Know what you ordered.",
    "Know what arrived.",
    "Know what you're paying for.",
  ],
  ledger: [
    { label: "Ordered", value: "20" },
    { label: "Delivered", value: "18" },
    { label: "Invoiced", value: "20" },
    { label: "Difference", value: "2 to check" },
  ],
  ledgerLine: "Ordered 20 → Delivered 18 → Invoiced 20 → 2 to check",
  approval: ["Order", "Delivery", "Invoice", "Approved for payment"],
  approvalLine: "Order ✓ → Delivery ✓ → Invoice ✓ → Approved for payment",
  support: "No more chasing someone to ask what arrived last Tuesday.",
} as const;

export const staff = {
  index: "05",
  eyebrow: "STAFF, SIMPLIFIED",
  headline: "Your staff shouldn't need a different app for every job.",
  body: "Check a roster. Submit availability. Clock in and out. Enter a timesheet. Count stock — all in one simple place.",
  flow: ["Arrive", "Tap", "Work", "Tap", "Done"],
} as const;

export const finalCta = {
  index: "06",
  lead: "Built by people who've run hospitality businesses themselves — for one venue or several.",
  body: "See what NexBrix could look like in your business. Show us how you currently manage stock, purchasing and staff — we'll show you how NexBrix can bring the workflow together.",
  button: "Book a Demo",
  links: [
    { text: "Simple pricing for hospitality businesses. See plans", href: "#pricing" },
    { text: "Free tools, even before you're a customer", href: "#resources" },
  ],
} as const;

export const footer = {
  columns: [
    {
      title: "Product",
      links: ["Platform", "Integrations", "Pricing"],
    },
    {
      title: "Solutions",
      links: [
        "Control Stock & Reduce Waste",
        "Simplify Ordering & Supplier Payments",
        "Know the Hours Your Team Actually Worked",
        "See Where Your Money Is Going",
      ],
    },
    {
      title: "Resources",
      links: [
        "Stocktake Template",
        "Food Cost Calculator",
        "Labour Cost Calculator",
        "Opening & Closing Checklist",
      ],
    },
    {
      title: "Company",
      links: ["About", "Book a Demo", "Start Free"],
    },
  ],
  legal: ["Privacy Policy", "Terms of Service"],
  copyright: "© NexBrix",
} as const;
