import puppeteer from "puppeteer-core";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
for (const w of [834, 768, 430, 375]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 1200));
  const bad = await page.evaluate(() => {
    const winW = window.innerWidth;
    const out = [];
    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0) return;
      if (r.right > winW + 1 || r.left < -1) {
        const parent = el.parentElement;
        const pr = parent ? parent.getBoundingClientRect() : null;
        // only report the outermost offender in a chain
        if (pr && (pr.right > winW + 1 || pr.left < -1)) return;
        out.push(`${el.tagName.toLowerCase()} [${String(el.className).slice(0,90)}] L${Math.round(r.left)} R${Math.round(r.right)} W${Math.round(r.width)}`);
      }
    });
    return out.slice(0, 10);
  });
  console.log("==", w, "==");
  bad.forEach((b) => console.log("  " + b));
  await page.close();
}
await browser.close();
