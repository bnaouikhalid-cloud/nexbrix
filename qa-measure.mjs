import puppeteer from "puppeteer-core";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const widths = [1600, 1440, 1280, 1024, 834, 768, 430, 375];
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
for (const w of widths) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 1800));
  const r = await page.evaluate(() => {
    const h1 = document.querySelector("#hero-heading");
    const cs = getComputedStyle(h1);
    const lh = parseFloat(cs.lineHeight);
    const lines = [...h1.querySelectorAll("span.block.overflow-hidden")].map((s) => {
      const inner = s.querySelector("span");
      return { t: inner.textContent.slice(0, 14), visualLines: Math.round(s.getBoundingClientRect().height / lh) };
    });
    const doc = document.documentElement;
    return { fs: cs.fontSize, lh, lines, overflow: doc.scrollWidth - window.innerWidth, pageH: document.body.scrollHeight };
  });
  console.log(w, JSON.stringify(r));
  await page.close();
}
await browser.close();
