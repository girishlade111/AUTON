# Prompt 02 — Hero Section: Layout & Entrance Animation

## Role
Senior front-end engineer. Stack: **Next.js + Tailwind + Framer Motion + Lenis**. Tokens and motion vocabulary come from prompt file `01-global-design-tokens-motion-foundations.md` — reuse `EASE`, `DUR`, `fadeUp`, `staggerParent`. This prompt builds the hero section (viewport 1) of the AUTON portfolio and its page-load entrance animation.

## Reference Description (what the recorded site shows)
A full-viewport black hero. A studio portrait of a young man (short brown hair, black crew-neck, neutral expression, soft key light) sits centered and fades into pure black at its bottom/edges. A giant wordmark **"Auton Foster"** in a vertical gradient (white at the cap-line fading to dark gray at the baseline) overlaps the portrait's lower half — the neck/chin area renders BEHIND the text. Top-left: circular white logo mark. Top-right: green pulsing dot + "available for work". Left-middle: two-line tagline "Designing Digital Experiences / That Inspire" with a handwritten script signature "Auton Foster" beneath it. Right-middle: the year "2026" split into two stacked condensed numerals "20" / "26". Bottom-center: a fixed dark pill navigation (built in prompt 04 — just reserve space here). A "Made in Framer" badge exists in the reference — omit it.

## Layout Specification (desktop 1920×1080 reference)

```
┌──────────────────────────────────────────────────────────┐
│ (logo)                                    • available…   │  top bar, absolute, padding 40px
│                          [PORTRAIT]                      │  centered, ~700px wide
│ Auton Foster (giant gradient wordmark)                   │  full-width, baseline ≈ 62% vh
│ Designing Digital          (portrait      20             │
│ Experiences That Inspire    fades         26             │  left/right columns ≈ 58% vh
│ ~signature~                 to black)                    │
│                                                          │
│                 [ fixed nav pill — prompt 04 ]           │  bottom: 24px
└──────────────────────────────────────────────────────────┘
```

- Section: `relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-bg`.
- **Portrait**: centered horizontally, top ≈ `6vh`, width `clamp(320px, 36vw, 700px)`, natural aspect. Apply a mask so it melts into the background: `mask-image: linear-gradient(to bottom, black 55%, transparent 96%)` plus a subtle radial mask on the sides. The image itself should be the **landscape outpainted asset from prompt 14** placed as a centered layer (the outpainted black sides guarantee seamless blending) — or the original portrait with the CSS mask above.
- **Wordmark**: absolutely positioned, full-bleed (`left:0; right:0`), centered text, top ≈ `38vh`. `font-display font-extrabold`, size `clamp(72px, 13vw, 210px)`, `white-space: nowrap`, `letter-spacing: -0.02em`, `z-index: 20` (above portrait), `pointer-events: none`.
  - Gradient text: `background: linear-gradient(180deg, #ffffff 0%, #e8e8e8 35%, #6a6a6a 78%, #3f3f42 100%); -webkit-background-clip: text; color: transparent;`
- **Top-left logo**: 44px circular mark (inline SVG: white ring with a stylized "A" and an orbit notch), `absolute top-8 left-8`.
- **Availability badge**: `absolute top-8 right-8 flex items-center gap-2.5`, text 15px `text-ink/90`. Dot: 9px circle `bg-accent` with a **ping animation** (Tailwind `animate-ping` on a wrapping span, plus static dot on top).
- **Left column** (`absolute left-8 top-[56%]`): tagline, 16–17px, `text-ink`, line-height 1.45, two lines; below it (16px gap) the signature in script font, ~40px, slightly rotated `-4deg`.
- **Right column** (`absolute right-8 top-[56%] text-right`): "20" and "26" stacked, heading font (Oswald/Anton), ~clamp(56px, 5vw, 92px), line-height 1.05, gap 8px between them.

## Entrance Animation (page load — runs once)

The reference recording starts after load, so implement the standard entrance implied by the template's language: a **staggered fade-up cascade**, top-of-hierarchy first. Sequence (all `EASE.out`):

| # | Element | Initial → Final | Delay | Duration |
|---|---|---|---|---|
| 1 | Portrait | `opacity 0, scale 1.04, y 24px` → `1, 1, 0` | 0.00s | 1.1s |
| 2 | Wordmark | `opacity 0, y 60px` → `1, 0` | 0.15s | 1.0s |
| 3 | Logo | `opacity 0, y -16px` → `1, 0` | 0.45s | 0.6s |
| 4 | Availability badge | `opacity 0, y -16px` → `1, 0` | 0.55s | 0.6s |
| 5 | Tagline | `opacity 0, y 24px` → `1, 0` | 0.60s | 0.7s |
| 6 | Signature | `opacity 0, y 24px, rotate -8deg` → `1, 0, -4deg` | 0.72s | 0.7s |
| 7 | "20" | `opacity 0, x 32px` → `1, 0` | 0.66s | 0.7s |
| 8 | "26" | `opacity 0, x 32px` → `1, 0` | 0.76s | 0.7s |
| 9 | Nav pill | `opacity 0, y 24px` → `1, 0` | 0.90s | 0.6s |

Implementation: a single `motion.div` per element using the table's values; drive with `initial`/`animate` (not `whileInView`) since this is the load sequence. Wrap the whole hero in `overflow-hidden` so the wordmark's `y: 60px` start never creates a scrollbar flash.

**Signature micro-detail (required):** animate the signature with an SVG path-draw feel — simplest acceptable version: `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)` over 0.9s at delay 0.72s (a left-to-right "handwriting" wipe) instead of a plain fade.

## Responsive Rules
- ≤768px: portrait width `min(80vw, 420px)`; wordmark wraps is NOT allowed — keep `nowrap` and let `13vw` scale it; left/right columns stack: tagline block moves to `bottom-[18%] left-5`, the "20/26" block to `bottom-[18%] right-5`; top bar padding 20px.
- Height ≤700px: reduce portrait top to `2vh` and wordmark top to `34vh`.

## Accessibility & States
- Wordmark is decorative → render as `<h1>` with `sr-only` full text "Auton Foster — Designing Digital Experiences That Inspire" and `aria-hidden` on the visual gradient span.
- Availability badge: `role="status"`.
- All entrance animations skipped (final state) when `usePrefersReducedMotion()` is true.
- Portrait `alt="Portrait of Auton Foster"`.

## Acceptance Criteria
- [ ] Load sequence matches the table order/timing; total sequence completes ≤ 2.0s.
- [ ] Wordmark gradient reads white→dark gray top-to-bottom and overlaps the portrait with portrait behind text.
- [ ] Portrait has no visible hard edges — seamless melt into `#000`.
- [ ] Green dot pulses continuously; badge text legible (≥4.5:1 contrast).
- [ ] No layout shift (CLS = 0) during entrance; no horizontal scrollbar at any breakpoint.
- [ ] `prefers-reduced-motion` renders the final hero instantly.
