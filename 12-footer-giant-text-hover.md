# Prompt 12 — Footer: Giant Wordmark, Link Hover Underlines

## Role
Senior front-end engineer. Stack: **Next.js + Tailwind + Framer Motion**. Depends on `01` (tokens/motion). This prompt builds the footer — the closing statement of the page.

## Reference Description (measured from the recording)
On pure black, centered top-to-bottom:
1. A **giant "Auton Foster" wordmark** in the display font (Poppins ExtraBold), solid white (NO gradient — unlike the hero), `clamp(64px, 11vw, 180px)`, single line, full-width centered.
2. ~48px below: a **horizontal nav row** of six links in condensed uppercase (Oswald/Anton, ~15–16px, white, letter-spacing 0.04em, ~28px gaps):
   `ABOUT · SERVICES · PROJECT · MY SKILL · TESTIMONIALS · CONTACT`
3. ~32px below: copyright line, 13–14px muted (#8a8a8e): `©2026 Auton. Powered by Framer. Created By ShovonDhali` — adapt to your credits (e.g. "©2026 Auton. All rights reserved.") but keep the three-part rhythm.
4. The recording shows **hover underline** on footer links: an underline appears under the hovered link (verified at 31–36s: ABOUT, SERVICES, PROJECT, MY SKILL, TESTIMONIALS, CONTACT each underlined as the cursor passed).

## Link Hover Animation (the key detail)
Underline slides in from the left (not a plain `text-decoration`):

```css
.footer-link { position: relative; }
.footer-link::after {
  content: ""; position: absolute; left: 0; bottom: -4px;
  height: 1.5px; width: 100%; background: currentColor;
  transform: scaleX(0); transform-origin: left;
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-link:hover::after, .footer-link:focus-visible::after { transform: scaleX(1); }
```

On mouse-out the underline retracts to the RIGHT? — No: with `transform-origin: left` on both states it retracts leftward; the reference is consistent with this simple version. Keep it.

## Layout Spec
- `<footer id="footer" className="relative bg-bg pt-[clamp(80px,10vw,140px)] pb-[150px]">`
  - **`pb-150px` minimum** — mandatory clearance so the fixed bottom nav pill (prompt 04) never overlaps the copyright line.
- Wordmark: `<p className="font-display font-extrabold text-center leading-none whitespace-nowrap" style={{ fontSize: "clamp(64px, 11vw, 180px)", letterSpacing: "-0.02em" }}>Auton Foster</p>` — `aria-hidden` if the footer already has a text alternative; otherwise it's the footer heading (`<h2 className="sr-only">` companion).
- Nav: `<ul className="flex flex-wrap justify-center gap-x-7 gap-y-3 mt-12">` — links point to `#about #services #projects #skills #testimonials #contact` (note: "MY SKILL" → `#skills`, "PROJECT" → `#projects`).
- Copyright: `mt-8 text-center text-[13.5px] text-muted`.
- Entrance: wordmark `fadeUp whileInView once` (y 50px, 0.9s), links stagger in 60ms apart, copyright last.

## Responsive
- ≤640px: wordmark may wrap to two lines ("Auton" / "Foster") — set `whitespace-normal` and `leading-[0.95]`; nav wraps to two rows; keep 44px hit areas on links (add `py-2`).
- The wordmark must never overflow horizontally: with `11vw` sizing, "Auton Foster" (12 chars) fits — verify at 360px.

## Accessibility
- Links are real anchors with descriptive accessible names (visible text suffices).
- Focus-visible: white 2px outline offset 3px PLUS the underline (focus shows both).
- Reduced motion: no entrance animation; underline appears instantly (transition-duration: 0).

## Acceptance Criteria
- [ ] Solid-white giant wordmark (no gradient), centered, single line desktop / two lines mobile.
- [ ] Six condensed-uppercase links in the exact order above, each with the slide-in underline on hover AND focus.
- [ ] Underline animates scaleX from left over 300ms with the expo-out curve.
- [ ] Copyright line present, muted, centered.
- [ ] ≥150px bottom padding — nav pill never overlaps footer content at page end.
- [ ] No horizontal overflow at 360px.
