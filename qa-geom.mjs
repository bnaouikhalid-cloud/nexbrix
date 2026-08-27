import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
for (const w of [1440, 1280]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: 1000 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 2200));
  const g = await page.evaluate(() => {
    const svg = document.querySelector("svg.rail-host") || document.querySelector("#hero-heading");
    const comp = document.querySelector('[data-comp="hero"]') || document.querySelectorAll("section#top .lg\:col-start-7")[0];
    const box = comp.getBoundingClientRect();
    const kids = [...comp.querySelectorAll(":scope > div > div")].map((el) => {
      const r = el.getBoundingClientRect();
      return {
        cls: String(el.className).slice(0, 40),
        x: +(((r.left - box.left) / box.width) * 100).toFixed(1),
        r: +(((r.right - box.left) / box.width) * 100).toFixed(1),
        y: +(((r.top - box.top) / box.height) * 100).toFixed(1),
        b: +(((r.bottom - box.top) / box.height) * 100).toFixed(1),
      };
    });
    return { box: { w: Math.round(box.width), h: Math.round(box.height) }, kids };
  });
  console.log(w, JSON.stringify(g, null, 1));
  await page.close();
}
await browser.close();
