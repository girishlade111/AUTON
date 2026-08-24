# Prompt 09 — Skills Section: Infinite Logo Marquee

## Role
Senior front-end engineer. Stack: **Next.js + Tailwind + Framer Motion**. Depends on `01` (tokens/motion), `06` (section label). This prompt builds the skills section with its **continuously scrolling logo marquee**.

## Reference Description (measured from the recording)
Below the "▪ My Skill" label and the giant heading **"SKILLS THAT DRIVE RESULTS"** runs a single horizontal row of tool logos that **scrolls continuously leftward, infinitely, independent of user scroll** (verified: icons shift left between consecutive frames while the page is stationary). Logos visible: **Tailwind CSS, JavaScript, Framer, Webflow, Figma, Photoshop, Illustrator**. Styling: monochrome **dim gray (#6b6b6e)**, each ~72–88px tall, uniform visual weight, spaced ~250px apart center-to-center, vertically centered, edge-to-edge across the full viewport width (logos are cut off at both edges — no container padding). No hover pause was demonstrated; keep a slow, constant speed.

## Implementation (CSS animation — preferred for a perpetual loop)

### Structure
```tsx
<div className="marquee-mask relative overflow-hidden py-[clamp(40px,6vw,80px)]" aria-label="Tools and technologies">
  <div className="marquee-track flex w-max items-center gap-[clamp(90px,10vw,170px)] pr-[clamp(90px,10vw,170px)]">
    {[...logos, ...logos].map((Logo, i) => (
      <Logo key={i} aria-hidden={i >= logos.length} className="h-[clamp(56px,5.5vw,84px)] w-auto text-[#6b6b6e]" />
    ))}
  </div>
</div>
```

### CSS
```css
.marquee-track {
  animation: marquee-left 28s linear infinite;
  will-change: transform;
}
@keyframes marquee-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }  /* -50% works because content is duplicated once */
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}
```

- **Speed**: 28s per half-loop (≈ slow drift matching the recording). Keep `linear` — no easing, it must never pulse.
- **Duplication**: render the logo set exactly twice; the track width must be ≥ 2× viewport. With 7 logos at ~250px pitch (~1750px set width), this holds on screens up to ~1750px wide — for ultrawide (>1750px), render the set 3× and animate to `-33.333%`.
- **Edge treatment**: the recording shows logos simply cut at the viewport edge. Optionally add a soft mask: `mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent)` — acceptable refinement, not required.

### Logos
Use inline SVGs (Simple Icons paths) for: Tailwind CSS, JavaScript (JS square badge), Framer, Webflow, Figma, Adobe Photoshop, Adobe Illustrator. Monochrome via `fill="currentColor"`. Store as React components in `components/logos/`.

## Section Wrapper
- `id="skills"`, standard section padding; heading `fadeUp whileInView once`; marquee below with `mt-16`.
- Heading: same giant condensed style as other sections, single line on desktop ("SKILLS THAT DRIVE RESULTS"), wraps naturally on mobile.

## Accessibility
- The marquee is decorative repetition: the duplicated set gets `aria-hidden`, and the container exposes one `aria-label`. Better: include a visually-hidden `<ul>` listing the seven tools for screen readers, and mark the animated track `aria-hidden="true"`.
- Reduced motion: animation off; logos render as a static, evenly spaced single row (allow horizontal scroll `overflow-x-auto` if they exceed the viewport, or wrap to two rows).
- Pause on hover is NOT required (reference keeps it moving); if added, also pause on `:focus-within`.

## Performance
- Pure `transform` animation = compositor-only, zero JS per frame.
- `will-change: transform` on the track only.
- SVGs are inline (no network requests); total logo set < 15KB.

## Acceptance Criteria
- [ ] Logos scroll left continuously at constant speed, seamless loop with no visible jump/seam at the wrap point.
- [ ] Logos are monochrome dim gray, uniform height ~72–88px desktop, cut off at viewport edges.
- [ ] Loop speed ~28s per cycle; identical feel to reference recording.
- [ ] Screen readers announce the tool list once (not duplicated).
- [ ] Reduced motion: static row, no animation, no content loss.
- [ ] 60fps on low-end hardware (no layout/paint work per frame).
