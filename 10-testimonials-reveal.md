# Prompt 10 — Testimonials Section

## Role
Senior front-end engineer. Stack: **Next.js + Tailwind + Framer Motion**. Depends on `01` (tokens/motion), `06` (section label). This prompt builds the "Trusted by Clients" testimonial section.

## Reference Description (measured from the recording)
Below the "▪ Testimonials" label and the giant heading **"TRUSTED BY CLIENTS"**, a two-column composition:

- **Left column:** a vertical stack of **three circular avatars**. The active testimonial's avatar is LARGE (~110px, full color, thin white/gray ring); the other two are smaller (~72px), dimmed (~60% opacity), stacked below with 16px gaps. (The recording does not show clicking them — implement switching anyway as the natural behavior, defaulting to the first.)
- **Right column:** a large decorative quotation mark glyph (~64px, white, serif-style "❝") at the top-left of the quote, then the quote text in **uppercase, ~22–24px, medium weight, line-height 1.5, white**, max-width ~640px, then 32px below: the author name **"Sarah Johnson"** (16px semibold white) and role **"Founder, NovaTech"** (14px, muted #8a8a8e), left-aligned.

Quote copy (exact):
"WORKING WITH MILAN WAS A FANTASTIC EXPERIENCE. THE WEBSITE DESIGN WAS MODERN, INTUITIVE, AND EXCEEDED OUR EXPECTATIONS. COMMUNICATION WAS SMOOTH, AND EVERY DETAIL WAS THOUGHTFULLY CRAFTED."

Prepare two additional placeholder testimonials (invent plausible names/roles/companies) for the switcher.

## Implementation

### Layout
```tsx
<div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-start
                max-w-[1200px] mx-auto">
  <div className="flex lg:flex-col gap-4">{/* avatars */}</div>
  <div>{/* quote mark, blockquote, attribution */}</div>
</div>
```
- On mobile the avatar row becomes horizontal above the quote.
- Section: `id="testimonials"`, standard padding, heading via `fadeUp whileInView once`.

### Avatar states
| State | Size | Opacity | Ring |
|---|---|---|---|
| Active | 110px | 100% | `ring-2 ring-white/25` |
| Inactive | 72px | 60% | none |
| Hover (inactive) | 72px | 85% | — |
| Focus-visible | — | 100% | white outline 2px |

Transitions: `all 300ms EASE.soft`. Size change animates `width/height` (or scale wrapper) — acceptable as it's a discrete user action, not scroll-linked.

### Switching animation (Framer Motion `AnimatePresence`, mode="wait")
On selecting an avatar, the quote block exits (`opacity 0, y -12px`, 250ms) and the new one enters (`opacity 0, y 16px → 1, 0`, 400ms `EASE.out`). The active avatar scales up while the previous shrinks/dims.

### Content
- Quote mark: use the character `❝` or an SVG double-quote, `text-ink`, 56–72px, `mb-4`, `select-none aria-hidden`.
- `<blockquote>` wraps the quote `<p>`; `<footer>` holds name/role. Uppercase via CSS (`uppercase`), keep source copy in normal case for screen readers.

## Accessibility
- Avatars are `<button>` elements with `aria-pressed` (or `role="tab"`/`aria-selected` pattern with the quote as the tabpanel — tab pattern preferred if you implement arrow-key navigation).
- Announce changes politely: wrap the quote panel in `aria-live="polite"`.
- Alt text per avatar: "Portrait of Sarah Johnson".
- Reduced motion: switch content instantly (no exit/enter animation).

## Acceptance Criteria
- [ ] Composition matches: avatar stack left (first large/color, others small/dim), quote mark + uppercase quote + name/role right.
- [ ] Clicking an inactive avatar promotes it (grows, undims) and crossfades the quote.
- [ ] Keyboard: avatars focusable and operable; focus ring visible; changes announced via aria-live.
- [ ] Exact quote copy and attribution rendered; uppercase applied via CSS not source.
- [ ] Reduced motion: instant swap.
