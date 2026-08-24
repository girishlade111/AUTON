# Prompt 01 — Global Design Tokens & Motion Foundations

## Role
You are a senior front-end engineer building an animated dark-theme personal portfolio called **AUTON** (persona: "Auton Foster", designer & developer) in **Next.js (App Router) + Tailwind CSS + Framer Motion + TypeScript**. This file defines the shared design tokens and motion system that EVERY other prompt file (02–13) depends on. Set this up first, exactly as specified, before implementing any section.

## Objective
Create a `tokens` layer (Tailwind config extension + CSS variables) and a reusable motion vocabulary (easing curves, durations, reusable variants) so all sections animate with one consistent feel.

## 1. Color Tokens (semantic, use these — never raw hex in components)

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#000000` | Page background |
| `--color-surface` | `#0f0f10` | Raised surfaces (cards, nav pill) |
| `--color-surface-raised` | `#1a1a1b` | Hover surfaces, input fields |
| `--color-text-primary` | `#ffffff` | Primary text, headings |
| `--color-text-dim` | `#3d3d3f` | Unrevealed text (about section), inactive icons |
| `--color-text-muted` | `#8a8a8e` | Secondary text, descriptions |
| `--color-line` | `#262628` | Hairline dividers (1px) |
| `--color-line-soft` | `#1c1c1e` | Column guide lines, ghost rules |
| `--color-accent` | `#22c55e` | Green status dot ("available for work", section label bullets) |
| `--color-row-active` | `#ffffff` | Expanded service row background |
| `--color-row-active-text` | `#0a0a0a` | Text on expanded (white) rows |

Tailwind mapping: `bg`, `surface`, `raised`, `ink` (primary), `dim`, `muted`, `line`, `line-soft`, `accent`, `row-active`.

## 2. Typography Tokens

- **Display font** (giant wordmark "Auton Foster"): geometric sans, ExtraBold/Bold — use **Poppins** (weights 600/700/800) via `next/font/google`. Letter-spacing: `-0.02em`.
- **Heading font** (section headings "SERVICES THAT DRIVE BRANDS", row titles, project names, footer links): condensed uppercase display — use **Oswald** (weights 500/600/700) or **Anton**. Always `uppercase`, letter-spacing `0.01em`, line-height `0.95–1.05`.
- **Body font**: **Inter** (400/500/600).
- **Script font** (signature "Auton Foster" in hero): **Mrs Saint Delafield** or **Great Vibes**, size ~40px.

Type scale (desktop → mobile):
- Hero wordmark: `clamp(72px, 13vw, 210px)`
- Section heading: `clamp(48px, 8.5vw, 150px)`
- Ghost watermark text: `clamp(90px, 12vw, 190px)`
- About statement: `clamp(28px, 3.4vw, 54px)`, weight 600, line-height 1.15, `uppercase`
- Service row title: `clamp(28px, 3vw, 46px)`
- Project label: `clamp(22px, 2.2vw, 34px)`
- Body/base: 16px; small: 14px; micro-labels: 14–16px.

## 3. Spacing & Radius Tokens

- Section vertical padding: `clamp(80px, 10vw, 160px)` top and bottom.
- Content max-width: `1440px`, horizontal padding `clamp(20px, 4vw, 64px)`.
- Radii: `radius-sm: 12px` (thumbnails), `radius-md: 16–20px` (project images), `radius-pill: 100px` (nav, buttons, avatars).

## 4. Motion Foundations (Framer Motion)

Define once in `lib/motion.ts` and reuse everywhere:

```ts
export const EASE = {
  out:   [0.16, 1, 0.3, 1],    // "easeOutExpo-like" — entrances, reveals
  inOut: [0.65, 0, 0.35, 1],   // symmetric — color/background wipes
  soft:  [0.25, 0.46, 0.45, 0.94],
};

export const DUR = {
  fast:   0.35,   // hovers, small UI
  base:   0.6,    // standard reveals
  slow:   0.9,    // large text/image entrances
  hero:   1.1,    // hero load sequence steps
};
```

Reusable variants (export these):
- `fadeUp`: `opacity 0→1`, `y: 40px→0`, duration `DUR.slow`, ease `EASE.out`.
- `fadeIn`: opacity only, `DUR.base`.
- `staggerParent`: `staggerChildren: 0.08, delayChildren: 0.1`.
- Viewport config for ALL scroll-triggered reveals: `viewport={{ once: true, margin: "-15% 0px -15% 0px" }}` (exception: the about word-reveal in prompt 05 is NOT `once` — it is scroll-linked and reversible).

## 5. Global Setup Requirements

1. **Background**: `bg-bg text-ink antialiased`, `overflow-x: clip` on body (giant text must never cause horizontal scroll).
2. **Selection style**: white background, black text (`selection:bg-white selection:text-black`).
3. **Scrollbar**: keep native (visible) — matches reference; do not hide.
4. **Smooth scroll**: install `lenis` (or `@studio-freight/lenis`) with `lerp: 0.1`, `wheelMultiplier: 1`, synced to Framer Motion via requestAnimationFrame. All other prompts assume Lenis smooth scrolling is active. (Detailed in prompt 13.)
5. **Reduced motion**: create a `usePrefersReducedMotion` hook (or Framer Motion's `useReducedMotion`). When true: all entrance animations render final state instantly, the marquee stops (static row), parallax is disabled, word-reveal shows fully white text. This is mandatory (WCAG 2.2 AA).
6. **Focus-visible**: global rule — `*:focus-visible { outline: 2px solid #fff; outline-offset: 3px; border-radius: 4px; }`. Never remove focus indicators.
7. **Images**: all mockup/portrait images via `next/image`, explicit width/height, `priority` only on the hero portrait.

## Acceptance Criteria
- [ ] All tokens resolvable via Tailwind classes (`bg-bg`, `text-dim`, `border-line`, etc.).
- [ ] `lib/motion.ts` exports `EASE`, `DUR`, `fadeUp`, `fadeIn`, `staggerParent`.
- [ ] Lenis smooth scroll active; no `scroll-behavior: smooth` CSS conflict.
- [ ] With `prefers-reduced-motion: reduce`, page renders fully visible with zero animation.
- [ ] No horizontal overflow at 360px, 768px, 1280px, 1920px widths.
- [ ] Keyboard Tab shows visible white focus ring on every interactive element.
