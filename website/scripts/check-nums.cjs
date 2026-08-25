const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3457", { waitUntil: "networkidle" });
  await page.waitForTimeout(4000);
  const r = await page.evaluate(() => {
    const els = [...document.querySelectorAll("div")].filter(d => d.className.includes("text-shadow") && d.className.includes("right-5"));
    const rect = els[0]?.getBoundingClientRect();
    return { right: rect?.right, transform: els[0] ? getComputedStyle(els[0]).transform : null };
  });
  console.log(JSON.stringify(r));
  await page.screenshot({ path: process.env.TEMP + "\\opencode\\audit\\check-360.png" });
  await browser.close();
})();
