const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3457", { waitUntil: "networkidle" });
  await page.waitForTimeout(4000);
  const r = await page.evaluate(() => {
    // pill bottom ~ y=695, x=70 (over "About")
    const el = document.elementFromPoint(70, 695);
    const chain = [];
    let cur = el;
    while (cur && chain.length < 5) { chain.push(cur.tagName + "." + String(cur.className).slice(0, 60)); cur = cur.parentElement; }
    // also check images near bottom
    const imgs = [...document.querySelectorAll("img")].map(i => ({ src: i.src.split("/").pop(), r: JSON.parse(JSON.stringify(i.getBoundingClientRect())) })).filter(i => i.r.top > 500);
    return { at: chain, imgs };
  });
  console.log(JSON.stringify(r, null, 1));
  await browser.close();
})();
