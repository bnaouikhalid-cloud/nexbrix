import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = process.argv[2] || "shots";
const W = Number(process.argv[3] || 1440);
const H = Number(process.argv[4] || 900);
const LABEL = process.argv[5] || `${W}`;
const STEPS = Number(process.argv[6] || 14);

fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
  defaultViewport: { width: W, height: H, deviceScaleFactor: 1 },
});

const page = await browser.newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await sleep(1400);

const total = await page.evaluate(() => document.body.scrollHeight);
console.log(`${LABEL}: page height ${total}px, viewport ${W}x${H}`);

const maxScroll = total - H;
for (let i = 0; i < STEPS; i++) {
  const y = Math.round((maxScroll * i) / (STEPS - 1));
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await sleep(900);
  const f = path.join(OUT, `${LABEL}-${String(i).padStart(2, "0")}.png`);
  await page.screenshot({ path: f });
}

// horizontal overflow check
const overflow = await page.evaluate(() => {
  const docW = document.documentElement.scrollWidth;
  const winW = window.innerWidth;
  const bad = [];
  if (docW > winW + 1) {
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > winW + 1 || r.left < -1) {
        bad.push(
          `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 70)} → ${Math.round(r.left)}..${Math.round(r.right)}`
        );
      }
    });
  }
  return { docW, winW, bad: bad.slice(0, 12) };
});
console.log(`${LABEL}: overflow`, JSON.stringify(overflow, null, 1));

await browser.close();
