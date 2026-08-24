# Prompt 04 — Sticky Bottom Navigation Pill

## Role
Senior front-end engineer. Stack: **Next.js + Tailwind + Framer Motion + Lenis**. Depends on `01` (tokens). This prompt builds the **fixed bottom-center navigation pill** that persists across the entire page (visible in every frame of the reference recording, from hero to footer).

## Reference Description
A horizontally-centered, dark gray, fully-rounded pill floats ~24px above the bottom viewport edge at all times. It contains five items: text links **About, Services, Project, Contact** and a **"Get Now"** button styled as a lighter-gray inner pill at the right end. The pill stays identical in every section (no hide-on-scroll, no background morph). In the reference, clicking a link smooth-scrolls the page to that section (detailed in prompt 13; wire the anchors here).

## Layout Specification

- Container: `fixed bottom-6 left-1/2 -translate-x-1/2 z-50`.
- Pill: `flex items-center gap-1 rounded-full bg-[#2b2b2d]/95 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md`.
- Links: `rounded-full px-5 py-2.5 text-[15px] font-medium text-ink/85 transition-colors duration-300`.
- "Get Now" button: `rounded-full bg-[#4a4a4d] px-5 py-2.5 text-[15px] font-semibold text-white transition-colors duration-300`.
- Mobile (≤640px): keep all five items but shrink padding (`px-3.5 py-2`, 14px text); the pill must never wrap to two lines — use `whitespace-nowrap` and allow it to span up to `calc(100vw - 24px)`.

## Component States (mandatory — all five items)

| State | Link | Get Now button |
|---|---|---|
| Default | `text-ink/85`, transparent bg | `bg-[#4a4a4d] text-white` |
| Hover | `text-ink` (100%), `bg-white/8` | `bg-white text-black` |
| Focus-visible | 2px white outline, offset 3px | same |
| Active (pressed) | `bg-white/12` | `bg-white/90` |
| Current section (optional enhancement) | `bg-white/10 text-ink` while its section is in view (IntersectionObserver) | — |

Transitions: `transition-colors duration-300 ease-out` on all.

## Behavior
- Each link is an `<a href="#about">` etc. pointing to section ids: `#about`, `#services`, `#projects`, `#contact`. "Project" maps to `#projects` (the reference labels the section "My Work" but the nav says "Project").
- Smooth scrolling itself is handled by Lenis (prompt 13) — use Lenis' `scrollTo` on click (prevent default), with `offset: -80` and duration ~1.2s so the target section header lands comfortably below the top.
- Entrance: on page load the pill fades up (`opacity 0, y 24px → 1, 0`, 0.6s, delay 0.9s — last step of the hero cascade in prompt 02).
- The pill must NOT hide/show on scroll direction (reference keeps it permanently visible).

## Accessibility
- `<nav aria-label="Primary">` wrapping a `<ul>` of links.
- "Get Now" is an `<a href="#contact">` styled as a button (it routes to contact in the reference template).
- Focus-visible ring must be visible against both the dark pill and the page background.
- Hit area ≥ 44×44px per item (adjust padding on mobile to comply).
- `prefers-reduced-motion`: Lenis scrollTo falls back to instant jump (`behavior: auto`).

## Acceptance Criteria
- [ ] Pill is horizontally centered, 24px from bottom, above all section content (`z-50`), visible in every section including footer.
- [ ] Hover states match the table; transitions are 300ms color-only (no layout shift).
- [ ] Clicking each link smooth-scrolls to the correct section (with Lenis active) and focus moves logically.
- [ ] No overlap with footer content at the page end (footer needs `pb-32` clearance — coordinate with prompt 12).
- [ ] Keyboard: Tab order = About → Services → Project → Contact → Get Now; visible focus rings throughout.
