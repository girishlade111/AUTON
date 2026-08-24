# Prompt 06 — Section Label Pattern (Eyebrow Badges)

## Role
Senior front-end engineer. Stack: **Next.js + Tailwind + Framer Motion**. Depends on `01` (tokens/motion). This prompt defines the small recurring **section eyebrow label** used above every section heading in the reference: a small **green square bullet + white label text**, e.g. `▪ About Me`, `▪ Services`, `▪ My Work`, `▪ My Skill`, `▪ Testimonials`, `▪ Contact`.

## Reference Description
Centered above each section's giant heading sits a tiny label: a ~7px **green square** (not a circle — square with a subtle glow) followed by 4–6px of space and a short label in 15–16px medium-weight white text ("About Me", "Services", "My Work", "My Skill", "Testimonials", "Contact"). In the recording these labels appear as each section scrolls into view — they are part of the section's entrance cascade (they lead the heading).

## Component API

```tsx
<SectionLabel>About Me</SectionLabel>
```

Renders:

```tsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
  transition={{ duration: 0.5, ease: EASE.out }}
  className="flex items-center justify-center gap-2"
>
  <span className="pulse-square" aria-hidden />
  <span className="text-[15px] font-medium text-ink">{children}</span>
</motion.div>
```

## Styling Spec
- Square bullet: `h-[7px] w-[7px] bg-accent` (square, `border-radius: 1px`), with `box-shadow: 0 0 8px rgba(34,197,94,0.55)` glow.
- Label text: 15px, `font-medium`, `text-ink`, `tracking-wide`.
- Gap between square and text: `8px`.
- Placement: `mb-6` (24px) above the section heading, horizontally centered (`mx-auto`).

## Micro-animation (optional but recommended)
Give the square a soft 2s breathing loop: `@keyframes labelPulse { 0%,100% { box-shadow: 0 0 6px rgba(34,197,94,.45); } 50% { box-shadow: 0 0 12px rgba(34,197,94,.8); } }` — `animation: labelPulse 2.4s ease-in-out infinite`. Disable under reduced motion.

## Usage Map (where this component goes — for all other prompts)
| Section | Label text |
|---|---|
| About | `About Me` |
| Services | `Services` |
| Projects | `My Work` |
| Skills | `My Skill` |
| Testimonials | `Testimonials` |
| Contact | `Contact` |

## Accessibility
- The label is decorative context — the section's `<h2>` carries the real heading. Mark the bullet `aria-hidden`.
- Green-on-black square is non-text decoration; no contrast requirement, but the label text must be ≥ 4.5:1 (white passes).
- Entrance animation skipped under `prefers-reduced-motion`.

## Acceptance Criteria
- [ ] Single reusable `<SectionLabel>` component used by all six sections.
- [ ] Square (not round) green bullet with glow, 7px, centered label, 24px below-gap to heading.
- [ ] Fades up 16px on first viewport entry, `once: true`.
- [ ] Pulse loop (if enabled) stops under reduced motion.
