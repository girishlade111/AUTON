const { chromium } = require("playwright");

const OUT = process.env.TEMP + "\\opencode\\audit";
const fs = require("fs");
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "mobile-360", width: 360, height: 740, ua: "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36" },
  { name: "mobile-390", width: 390, height: 844, ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1" },
  { name: "tablet-768", width: 768, height: 1024, ua: "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1" },
  { name: "desktop-1440", width: 1440, height: 900, ua: undefined },
];

(async () => {
  const browser = await chromium.launch();
  const report = [];

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: vp.width < 800,
      hasTouch: vp.width < 800,
      userAgent: vp.ua,
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));

    await page.goto("http://localhost:3457", { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);

    // overflow check
    const overflow = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const wide = [];
      document.querySelectorAll("*").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.right > winW + 2 || r.left < -2)) {
          const cs = getComputedStyle(el);
          if (cs.position === "fixed") return;
          if ((el.closest('[aria-hidden="true"]') || el).getAttribute?.("aria-hidden") === "true") return;
          wide.push({ tag: el.tagName, cls: String(el.className).slice(0, 80), right: Math.round(r.right), left: Math.round(r.left), w: Math.round(r.width) });
        }
      });
      return { docW, winW, overflowing: wide.slice(0, 12) };
    });

    // navpill size
    const nav = await page.evaluate(() => {
      const n = document.querySelector('nav[aria-label="Primary"]');
      if (!n) return null;
      const r = n.getBoundingClientRect();
      return { w: Math.round(r.width), left: Math.round(r.left), right: Math.round(r.right), vw: window.innerWidth };
    });

    // hero overlap sanity: tagline bottom vs signature top etc.
    const hero = await page.evaluate(() => {
      const h1 = document.querySelector("h1 span");
      const tag = [...document.querySelectorAll("p")].find((p) => p.textContent.includes("Building AI-Powered"));
      const sig = document.querySelector(".font-script");
      const nums = [...document.querySelectorAll("div.font-heading, div[class*='font-heading']")].map(d=>d.getBoundingClientRect());
      return {
        h1w: h1 ? Math.round(h1.getBoundingClientRect().width) : null,
        vw: window.innerWidth,
        tagRect: tag ? JSON.parse(JSON.stringify(tag.getBoundingClientRect())) : null,
        sigTop: sig ? Math.round(sig.getBoundingClientRect().top) : null,
        numRects: nums.map(r=>({top:Math.round(r.top),bottom:Math.round(r.bottom)})),
      };
    });

    // full page screenshot
    await page.screenshot({ path: `${OUT}\\${vp.name}-full.png`, fullPage: true });
    await page.screenshot({ path: `${OUT}\\${vp.name}-hero.png` });

    report.push({ viewport: vp.name, overflow, nav, hero, errors: errors.slice(0, 6) });
    await ctx.close();
  }

  await browser.close();
  fs.writeFileSync(OUT + "\\report.json", JSON.stringify(report, null, 2));
  console.log("AUDIT DONE -> " + OUT);
})();
