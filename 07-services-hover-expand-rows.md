# Prompt 07 — Services Section: Hover-Expand Rows

## Role
Senior front-end engineer. Stack: **Next.js + Tailwind + Framer Motion + Lenis**. Depends on `01` (tokens), `06` (section label). This prompt builds the Services section — the reference site's richest interaction: five list rows that **expand into a white strip on hover**, revealing a tilted photo and a description.

## Reference Description (measured from the recording)
Below the "▪ Services" label and the giant two-line condensed heading **"SERVICES THAT DRIVE BRANDS"** (centered, ~150px, Oswald/Anton) sits a full-width list of five rows separated by 1px hairlines (#262628):

`BRAND IDENTITY / MARKETING / WEB DEVELOPMENT / UI UX DESIGN / GRAPHICS DESIGN`

**Collapsed row:** ~150px tall, title left-aligned with ~110px left padding, condensed uppercase white ~44px, hairline dividers top and bottom.

**Hovered row (verified frame-by-frame at 9.5–18s):**
1. A **white background strip** expands to fill the row (animating through gray mid-states — a color/opacity wipe, ~0.35s).
2. The title color inverts **white → black**.
3. A **photo thumbnail** (~380×260px, `border-radius: 16px`, **rotated ≈ −6°**, soft drop shadow) scales/fades in at the horizontal center-left (~38% across), **overflowing the strip's top and bottom edges** (~40px overhang each side) — it pops out of the row.
4. A **description** (15–16px, dark gray #3f3f42, max-width ~420px, left-aligned) fades in on the right side (~72% across).

**Moving hover between rows:** the old row collapses through gray while the new one expands simultaneously (crossfade, no gap). **Mouse leave:** reverse animation back to black.

Row content (exact copy):
- BRAND IDENTITY — "Build a memorable brand with unique logos, typography, color palettes, and visual systems."
- MARKETING — "Design social media graphics, banners, presentations, and promotional assets that strengthen your brand."
- WEB DEVELOPMENT — "Create responsive, fast, and SEO-friendly websites with clean code and seamless performance."
- UI UX DESIGN — "Design intuitive websites, mobile apps, dashboards, and SaaS products that deliver exceptional user experiences."
- GRAPHICS DESIGN — "Produce professional print and digital designs, including brochures, business cards, posters, and marketing materials."

Each row has a distinct photo (team collaborating / designer at monitor / devs at screens / UI wireframes + color swatches / print designer at desk) — use dark-neutral stock photos, `grayscale-[15%]`.

## Implementation

### Row anatomy
```tsx
<li className="service-row group relative border-t border-line last:border-b
               transition-colors duration-[350ms] ease-in-out"
    style={{ transitionProperty: "background-color" }}
    onMouseEnter={...} onMouseLeave={...}>
  <div className="relative flex min-h-[150px] items-center px-[clamp(24px,6vw,110px)]">
    <h3 className="row-title ...">BRAND IDENTITY</h3>
    {/* expanded layer */}
    <motion.img ... className="pointer-events-none absolute left-[38%] top-1/2 z-10
      w-[clamp(240px,20vw,380px)] aspect-[380/260] rounded-2xl object-cover
      -translate-y-1/2 rotate-[-6deg] shadow-[0_24px_60px_rgba(0,0,0,0.35)]" />
    <motion.p ... className="pointer-events-none absolute right-[6%] top-1/2 -translate-y-1/2
      w-[min(420px,30vw)] text-[15px] leading-relaxed text-[#3f3f42]" />
  </div>
</li>
```

### Animation choreography (per row, Framer Motion `AnimatePresence`-free — use variants driven by `isHovered`)

| Element | Collapsed | Hovered | Transition |
|---|---|---|---|
| Row background | `#000000` (transparent over page) | `#ffffff` | `background-color 350ms EASE.inOut` |
| Title color | `#ffffff` | `#0a0a0a` | `color 350ms EASE.inOut` |
| Photo | `opacity 0, scale 0.7, rotate -14deg` | `opacity 1, scale 1, rotate -6deg` | `450ms EASE.out`, delay 60ms |
| Description | `opacity 0, y 12px` | `opacity 1, y 0` | `400ms EASE.out`, delay 100ms |

- Because the photo overhangs the row, the `<li>` needs `overflow-visible` and `z-index` raised while hovered (`hover:z-20` via class toggle) so the image paints above adjacent rows' hairlines.
- The white strip is the row's own background-color transition — do NOT use a scaling overlay div (the recording shows a clean color wipe through gray, which `background-color` transition reproduces naturally).
- Keyboard parity: make each row a `<button>` (or give it `tabIndex={0}` + `onFocus`/`onBlur` mirroring hover) — expanding on focus is REQUIRED for keyboard users. `Enter` scrolls to `#contact`.
- On touch devices (no hover): rows expand on tap (toggle `isHovered` on click), one open at a time; tapping the open row collapses it.

### Section wrapper
- `id="services"`, `py-[clamp(90px,10vw,150px)]`, heading via `motion.h2` `fadeUp` on `whileInView` (`once: true`), then `mt-16` the `<ul>`.
- Heading: `font-heading text-[clamp(48px,8.5vw,150px)] leading-[0.98] text-center uppercase`, two lines: "SERVICES THAT DRIVE" / "BRANDS" (`<br/>` at the recorded break).

## Performance
- Animate only `background-color`, `color`, `opacity`, `transform` — all compositable or cheap paints.
- Photos: `next/image`, `loading="lazy"`, explicit dimensions, `sizes="(min-width:1024px) 20vw, 60vw"`.
- No layout shift: the expanded layer is absolutely positioned inside the fixed-height row.

## Accessibility
- Row titles are `<h3>` inside a section with `<h2>` "Services that drive brands" (visually uppercase via CSS, semantic text normal case).
- Expanded description must be in the DOM always (visually hidden when collapsed via opacity, NOT `display:none`) so it remains available to screen readers and SEO.
- Focus-visible: 2px white inset outline on the row button; expanded state on focus identical to hover.
- Reduced motion: skip scale/rotate entrance — photo and description appear instantly with the background color change (keep the color wipe, it is opacity-class motion but acceptable; or make it instant).

## Acceptance Criteria
- [ ] Hover expands row to white with black title, tilted photo (−6°) overhanging the strip, description right — matching the recorded composition.
- [ ] Moving cursor between adjacent rows crossfades smoothly (both rows animate simultaneously, no flicker).
- [ ] Mouse-leave reverses fully to the collapsed black row.
- [ ] Keyboard focus opens a row; Enter navigates to contact; Escape collapses.
- [ ] Touch: tap toggles; only one row open at a time.
- [ ] 60fps during hover sweeps across all five rows; no CLS.
