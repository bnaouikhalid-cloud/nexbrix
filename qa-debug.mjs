import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  defaultViewport: { width: 1440, height: 900 },
});
const page = await browser.newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 2500));
const info = await page.evaluate(() => {
  const h1 = document.querySelector("#hero-heading");
  const cs = getComputedStyle(h1);
  const spans = [...h1.querySelectorAll("span > span")].map((s) => {
    const r = s.getBoundingClientRect();
    const c = getComputedStyle(s);
    return { text: s.textContent.slice(0, 22), top: Math.round(r.top), h: Math.round(r.height), transform: c.transform, opacity: c.opacity, fs: c.fontSize };
  });
  return {
    h1: { fs: cs.fontSize, lh: cs.lineHeight, ff: cs.fontFamily.slice(0, 60), rect: h1.getBoundingClientRect().toJSON() },
    spans,
    reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
