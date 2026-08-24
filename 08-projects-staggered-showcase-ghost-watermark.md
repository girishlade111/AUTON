# Prompt 08 — Projects Section: Staggered Showcase + Ghost Watermark Text

## Role
Senior front-end engineer. Stack: **Next.js + Tailwind + Framer Motion**. Depends on `01` (tokens/motion), `06` (section label). This prompt builds the "My Work" projects section with its staggered two-column rhythm and the giant low-contrast watermark text behind featured images.

## Reference Description (measured from the recording)
Below the "▪ My Work" label and the giant centered heading **"CRAFTED WITH PURPOSE"**, five projects are laid out in a staggered editorial grid (NOT uniform cards):

| Order | Project | Size / position | Extra |
|---|---|---|---|
| 1 | **VISIONAI** | LARGE — left column, ~44% page width, laptop mockup on gray concrete | — |
| 2 | **HARBOR** | SMALL — right column, ~26% width, offset ~180px HIGHER than VISIONAI's bottom (sits higher, creating a diagonal rhythm), laptop on white desk | — |
| 3 | **CROWN LOW** | LARGE — right-of-center, ~52% width, Apple-studio-monitor mockup, dark | **Giant ghost text "Crown Law" behind it** |
| 4 | **THE WATCH** | LARGE — left column, luxury watch e-commerce screenshot (gold/brown) | ghost text "THE WATCH" inside image top |
| 5 | **LATEE** | SMALL — right column, tablet mockup, coffee brand site | — |

- Every image: `border-radius: 20px`, no border, dark-friendly.
- **Labels** below each image: project name in condensed uppercase (Oswald/Anton), `clamp(22px, 2.2vw, 34px)`, white, left-aligned under the image, 20px below.
- **Ghost watermark** (CROWN LOW): the words "Crown Law" in the display font (Poppins ExtraBold, NOT condensed), `clamp(90px, 12vw, 190px)`, color `#1f1f22` (barely visible on black — ~8% white), positioned behind/above the monitor image, overlapping its top edge, `z-index` BELOW the image. It scrolls with the section (no independent parallax detected in the recording — it is anchored to the project block).
- **Column guides:** two full-height 1px vertical hairlines (`#1c1c1e`) at ~25% and ~85% page width, running through the whole section behind the content (visible in the recording as faint vertical lines). `hidden lg:block`.
- Vertical gaps between projects: ~140px desktop; the stagger is created with margin-top offsets on the right column items (`lg:mt-[180px]` on HARBOR, etc.).

## Entrance Animation (scroll-triggered, once)
Each project block (image + label as one unit) uses `fadeUp` on `whileInView` (`once: true, margin: "-15%"`), with a **subtle scale settle**: `initial={{ opacity: 0, y: 60, scale: 0.96 }}` → `whileInView={{ opacity: 1, y: 0, scale: 1 }}`, duration 0.9s, ease `EASE.out`. Stagger siblings by 0.12s when two enter together.
Ghost text: `initial={{ opacity: 0 }}` → `whileInView={{ opacity: 1 }}`, duration 1.2s (it emerges slowly behind the image).

## Optional hover (not in recording — keep extremely subtle or omit)
Slight `scale: 1.015` on image hover with 400ms ease; do NOT add overlays/cursors — the reference has none.

## Structure & Responsive
- Grid: `grid grid-cols-1 lg:grid-cols-12 gap-y-[120px] lg:gap-y-[140px]` with items placed via column spans (`lg:col-span-5`, `lg:col-span-4`, `lg:col-span-7` …) and `lg:mt-[180px]` offsets for the stagger.
- Mobile: single column, natural order, ghost text scaled by clamp, column guides hidden.
- Images via `next/image` with explicit aspect ratios: large `4:3.2`, small `4:3`, monitor `16:10`, tablet `4:5`. `loading="lazy"`, `sizes` per column span.

## Accessibility
- Each project is a link target or article: `<article>` with `<h3>` project name; wrap image+label in one `<a href="#" aria-label="View project: VisionAI">` if links are desired (reference shows no visible link affordance — acceptable to keep non-interactive, then no focus ring needed).
- Ghost text `aria-hidden="true"` (decorative, duplicates the project name).
- Alt text describes the mockup: e.g. "VisionAI website shown on a laptop".
- Entrance animations skipped under reduced motion.

## Acceptance Criteria
- [ ] Staggered rhythm matches the reference: HARBOR visibly higher than VISIONAI; CROWN LOW right-of-center with ghost text behind; alternating large/small.
- [ ] Ghost "Crown Law" text sits BEHIND the monitor image, ~8% white, emerges with a slow fade.
- [ ] Faint vertical column guides at 25%/85% on desktop only.
- [ ] Labels are condensed uppercase below each image, left-aligned.
- [ ] No horizontal overflow from ghost text at any breakpoint (clip within section).
- [ ] Entrance: fade-up + 0.96→1 scale settle, once per project, staggered when simultaneous.
