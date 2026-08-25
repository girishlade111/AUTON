const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3457", { waitUntil: "networkidle" });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: process.env.TEMP + "\\opencode\\audit\\pill-crop.png", clip: { x: 0, y: 640, width: 360, height: 100 } });
  await browser.close();
})();
