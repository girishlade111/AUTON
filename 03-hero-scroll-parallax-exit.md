# Prompt 03 — Hero Scroll Parallax Exit

## Role
Senior front-end engineer. Stack: **Next.js + Tailwind + Framer Motion + Lenis**. Depends on: `01` (tokens/motion) and `02` (hero markup). This prompt adds the hero's **scroll-linked parallax exit** — the signature motion of the reference site.

## Reference Description (measured from the recording)
When the user scrolls away from the hero, the ENTIRE hero composition (portrait, gradient wordmark, tagline, signature, "20/26" numerals) does **not** scroll at page speed — it visibly lags behind, drifting out at roughly **half the scroll velocity (~0.5× parallax factor)**. Measured from the video: while the page scrolled ~330px, the hero content moved only ~165px; over the next ~330px it moved ~260px (factor ≈ 0.5–0.8×, use **0.55×**). The effect makes the hero feel heavy and cinematic as the About section slides up over it. The fixed bottom nav (prompt 04) does NOT participate — it stays pinned.

## Implementation

### Structure
Wrap all parallax-participating hero children (portrait layer, wordmark, left column, right column — NOT the top bar logo/badge, which can scroll normally) in one container:

```tsx
<section ref={heroRef} className="relative h-[100svh] overflow-hidden">
  <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
    {/* portrait, wordmark, tagline+signature, 20/26 */}
  </motion.div>
  {/* top bar (logo + badge) — normal flow, no parallax */}
</section>
```

### Scroll linkage (Framer Motion `useScroll` + `useTransform`)
```tsx
const { scrollY } = useScroll();
const heroY = useTransform(scrollY, [0, 800], [0, 440]);      // 0.55× parallax factor
const heroOpacity = useTransform(scrollY, [0, 620], [1, 0]);  // gentle fade while exiting
```

- **Parallax translate**: map scroll `0→800px` to `y: 0→440px` (factor 0.55). The hero content moves DOWN-relative slower than the page, i.e. it lags and exits later than a normal element.
- **Opacity fade**: fade the whole composition from `1→0` across `0→620px` of scroll so it dissolves before the About text fully arrives (prevents visual collision with the About heading).
- Use `useSpring(heroY, { stiffness: 120, damping: 30, mass: 0.4 })` on the `y` value for a subtle inertial lag that pairs with Lenis smooth scroll.
- **Do NOT** use `position: sticky/fixed` for this — it is a transform-based parallax on a normally-flowing section.

### Layering during exit
- The hero section must be `z-index: 0`; the About section that follows must be `z-index: 10` with `bg-bg` so it slides over the lagging hero cleanly.
- `overflow-hidden` on the hero section so the translated wordmark never paints outside the viewport.

### Reduced motion
When `usePrefersReducedMotion()` is true: skip both transforms (`y` stays 0, opacity stays 1); the hero scrolls away normally.

## Tuning Notes
- If the About heading feels crowded during the hand-off, raise the fade end from 620→520px.
- The parallax factor must feel "heavy but responsive": if it feels floaty, raise stiffness to 160; if it stutters on trackpads, lower `wheelMultiplier` in Lenis to 0.9.
- Verify at 60fps: transforms only (`transform`, `opacity`) — never animate `top/margin`.

## Accessibility
- All parallax values are decorative; content order and semantics are unchanged.
- The hero `<h1>` remains in the DOM and readable by screen readers regardless of visual transform.
- Keyboard scrolling (Space/PageDown) produces the same linked effect — verify no jank with keyboard-driven scrolls.

## Acceptance Criteria
- [ ] Scrolling 400px moves hero content ~220px (0.55×), verified visually side-by-side with the reference video.
- [ ] Hero composition fades out fully by ~620px of scroll; no overlap collision with the About section text.
- [ ] Motion runs on compositor properties only; no scroll-linked layout thrash (check DevTools Performance: no long frames > 50ms during scroll).
- [ ] Fixed nav pill (prompt 04) remains perfectly static during the entire exit.
- [ ] Reduced-motion users get a normal, non-parallax hero exit.
