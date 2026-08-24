# Prompt 11 — Contact Section & Form

## Role
Senior front-end engineer. Stack: **Next.js + Tailwind + Framer Motion**. Depends on `01` (tokens/motion), `06` (section label). This prompt builds the contact section — heading, info column, and the minimal underline-style form.

## Reference Description (measured from the recording)
Below the "▪ Contact" label and the giant heading **"START A CONVERSATION"**, a two-column layout:

**Left column (info):**
- Intro (uppercase, ~15px, white, max-width 380px, line-height 1.5): "HAVE A PROJECT IN MIND? I'D LOVE TO HEAR ABOUT YOUR IDEAS AND HELP BRING THEM TO LIFE."
- Three info rows, each: label in condensed uppercase muted (~14px, #8a8a8e) above a value in white (~16px):
  - EMAIL → hello@autonfoster.com (mailto link)
  - PHONE → +1 (555) 555-2847 (tel link)
  - LOCATION → San Francisco, California, USA (plain text)
- Below: four social icons in a row (LinkedIn, Behance, GitHub, Instagram), ~20px, white, ~24px apart.

**Right column (form):** fields stacked with 36px gaps, each field = tiny uppercase label (~11px, muted, letter-spaced) above a **borderless input with only a 1px bottom border** (`#3a3a3d`):
- FULL NAME (text) — placeholder none visible; label-only
- EMAIL ADDRESS (email)
- PROJECT TYPE (select dropdown, native select styled dark, chevron on right)
- MESSAGE (textarea, 4–5 rows)
- Full-width **"Send Message"** pill button: white background, black text, `rounded-full`, ~52px tall, at the bottom.

## Form Field States (mandatory)

| State | Bottom border | Label | Notes |
|---|---|---|---|
| Default | `#3a3a3d` | muted | — |
| Hover | `#55555a` | — | — |
| Focus | `#ffffff` (2px) | white | NO outline ring — the border IS the indicator; keep `focus-visible` outline off for these inputs only, border change is the focus indicator |
| Filled | `#55555a` | — | — |
| Error | `#ef4444` + 12px error text below field | — | on invalid submit |
| Disabled | `#2a2a2d`, text 40% | — | — |

**Send Message button states:** default white/black → hover `#e5e5e5` → active `#d4d4d4` → loading: text swaps to a 16px spinner (border spinner) + "Sending…", button disabled → success: text "Message Sent ✓" for 3s → error: red-tinted text. All transitions 250ms.

## Submit Behavior
- Client-side validation (required: name, valid email, message ≥ 10 chars; project type optional).
- Wire `onSubmit` to a server action or `POST /api/contact` stub that resolves after 900ms (placeholder for real backend). Show the loading/success states above.
- Honeypot field (hidden input) for spam.

## Entrance Animation
- Left column: `fadeUp whileInView once` (delay 0).
- Form fields: staggered `fadeUp` (y 24px, 0.5s each, `staggerChildren 0.07`) once the section enters.
- Heading + label: standard section cascade.

## Layout & Responsive
- Grid: `grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24`, `id="contact"`, max-width 1200px centered.
- Mobile: info column above form; social icons keep 44px hit areas (wrap icon in a 44px flex box).
- Inputs: `w-full bg-transparent py-3 text-[16px] text-ink placeholder:text-transparent` (labels always visible — no floating labels).

## Accessibility
- Every input has a real `<label htmlFor>` (the tiny uppercase labels ARE the labels).
- Select has an accessible name; style `option` for dark mode (`bg-surface text-ink`); keep native dropdown behavior on mobile.
- Error messages: `aria-describedby` linking input to its error text + `aria-invalid="true"`.
- Button: `aria-busy` while loading; success announced via `role="status"`.
- Social icons: `<a>` with `aria-label` ("LinkedIn profile" etc.), `rel="noopener noreferrer"`, visible focus ring.
- Reduced motion: fields render without stagger.

## Acceptance Criteria
- [ ] Two-column composition matches reference (info left, underline form right).
- [ ] All seven field/button states implemented and visually verifiable.
- [ ] Submit shows loading → success sequence with correct aria attributes.
- [ ] Validation errors appear per-field with red border + message, focus moves to first invalid field.
- [ ] Keyboard-only completion of the form is possible; focus indicator (white bottom border) always visible.
- [ ] Exact copy: intro text, EMAIL/PHONE/LOCATION values, field labels, "Send Message".
