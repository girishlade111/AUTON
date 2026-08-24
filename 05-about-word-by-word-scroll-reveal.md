# Prompt 05 — About Section: Scroll-Linked Word-by-Word Text Reveal

## Role
Senior front-end engineer. Stack: **Next.js + Tailwind + Framer Motion + Lenis**. Depends on `01` (tokens/motion). This prompt implements the About section — the most distinctive scroll effect in the reference recording.

## Reference Description (measured from the recording)
A single large uppercase statement, centered, max-width ~1400px:

> "I'M A PASSIONATE DESIGNER AND DEVELOPER DEDICATED TO CREATING MODERN, USER-FOCUSED DIGITAL EXPERIENCES. FROM BUILDING STRONG BRAND IDENTITIES TO DESIGNING INTUITIVE INTERFACES AND DEVELOPING RESPONSIVE WEBSITES, I HELP BUSINESSES TRANSFORM IDEAS INTO IMPACTFUL DIGITAL PRODUCTS."

Every word starts **dim gray (#3d3d3f)**. As the user scrolls, words turn **white one by one, in reading order**, driven directly by scroll position (NOT time). Verified in the recording: at ~6.4s only "I'M" was white; by ~9.7s all words were white; when scrolling back up at ~46s, previously-white words **re-dimmed** — so the effect is fully reversible and scroll-scrubbed. Above the text sits the "• About Me" label (green square bullet — prompt 06). Flanking the text block at its vertical middle are two decorative horizontal hairlines running in from the viewport edges, each ending in a small square bracket marker (like crop marks) — left line ends at ~12% from the left edge, right line starts at ~87%.

## Implementation (Framer Motion scroll-linked, reversible)

### Text splitting
Split the statement into words at build time (a small utility `splitWords(text)` that returns an array, preserving punctuation). Render:

```tsx
<p className="about-statement" aria-label={fullText}>
  {words.map((word, i) => (
    <motion.span key={i} aria-hidden className="inline-block mr-[0.28em] will-change-[color]">
      {word}
    </motion.span>
  ))}
</p>
```

### Scroll → progress mapping
```tsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start 0.85", "start 0.25"],  // reveal runs while the block travels 85%→25% of viewport
});
```

### Per-word color (two acceptable implementations — pick A)
**A (recommended, GPU-friendly):** each word is a `motion.span` whose `color` is driven by a `useTransform(scrollYProgress, [start_i, end_i], ["#3d3d3f", "#ffffff"])` where:
- `total = words.length`
- `start_i = (i / total) * 0.9`
- `end_i = start_i + 0.1 / total * 3` (each word's transition spans a small window so ~3 words are mid-fade at once — matches the soft edge seen in the recording)

**B (simpler):** one `useMotionValueEvent(scrollYProgress, "change", v => setActiveCount(Math.floor(v * total)))` and set `color` via class toggle with `transition: color 0.25s linear`. Acceptable fallback if A stutters on low-end devices.

### Styling
- `font-body font-semibold uppercase text-center`
- `font-size: clamp(28px, 3.4vw, 54px)`, `line-height: 1.15`, `letter-spacing: 0.01em`
- `max-w-[1400px] mx-auto px-6`
- Section padding: `py-[clamp(100px,12vw,180px)]`, `id="about"`, `relative z-10 bg-bg` (must occlude the parallaxing hero — see prompt 03).

### Decorative bracket rules
Absolutely-positioned pair at `top: 50%` of the text block:
- Left: `absolute left-0 w-[11vw] h-px bg-line` ending with a 10×10px square outline marker (border 1px `bg-line`) at its right end, plus a 4×10px filled tick — replicate the "crop mark" look: `▪—` (small filled square, then line).
- Right: mirror at `right-0`.
- Hide below `lg` breakpoint.
- These are static (no animation observed in the recording).

## Scroll Feel Tuning
- The reveal window (`"start 0.85"` → `"start 0.25"`) should complete right as the Services label enters the viewport — verify against the recording rhythm (~3.5s of casual scrolling).
- Words must fade individually (a visible "reading frontier" between white and gray words at all mid-progress points), never in whole-line chunks.
- Reversibility: scrolling up must re-dim words in reverse order with no hysteresis.

## Accessibility
- The `<p>` carries `aria-label` with the full statement; word spans are `aria-hidden` so screen readers read one clean sentence instead of 40 fragments.
- Contrast: the DIM state (#3d3d3f on #000) is intentionally below AA — acceptable because it is a transient animation state and the final state is #ffffff (21:1). With `prefers-reduced-motion`, render all words white immediately (final state).
- No `will-change` overuse: apply only to word spans, and only `color`/`opacity` animate.

## Acceptance Criteria
- [ ] Words turn white strictly in reading order, tied to scroll position (scrubbing up/down reverses cleanly).
- [ ] At mid-scroll, a soft frontier of ~2–4 partially-faded words is visible between white and gray.
- [ ] Reveal completes when the block's top reaches ~25% viewport height.
- [ ] No CLS from word splitting (reserve layout with the final text; splitting must not change line breaks at any breakpoint).
- [ ] Screen reader announces the full sentence once.
- [ ] Reduced motion: fully white text, no scroll linkage.
