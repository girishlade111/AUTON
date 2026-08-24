# Prompt 13 — Global Smooth Scrolling & Anchor Navigation

## Role
Senior front-end engineer. Stack: **Next.js (App Router) + TypeScript + Lenis**. Depends on `01`. This prompt wires the **inertial smooth scrolling** that the entire reference site's feel depends on, plus reliable anchor navigation from the nav pill and footer.

## Reference Description
The reference (a Framer site) exhibits eased, slightly inertial scrolling — wheel input glides and settles rather than stepping. Section-to-section navigation (clicking "Services" in the bottom pill at ~40s of the recording) produces a **long, smooth eased glide** from the footer up to the services section (~1.5–2s travel), passing through intermediate sections. All scroll-linked effects (hero parallax in prompt 03, word reveal in prompt 05) stay perfectly synced to this smoothed scroll position.

## Implementation

### 1. Lenis provider
```bash
npm i lenis
```

```tsx
// components/SmoothScroll.tsx  ("use client")
import Lenis from "lenis";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // native scrolling

    const lenis = new Lenis({
      lerp: 0.1,            // smoothing strength (lower = floatier). 0.1 matches the reference glide.
      wheelMultiplier: 1,
      touchMultiplier: 1.4, // keep touch snappy on mobile
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);

    // Expose for anchor clicks (see below)
    (window as any).__lenis = lenis;
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); (window as any).__lenis = undefined; };
  }, []);

  return <>{children}</>;
}
```

- Wrap `<SmoothScroll>` around the page content in the root layout (client boundary; keep server components inside).
- **Framer Motion sync:** `useScroll()` from Framer Motion reads native scroll position, which Lenis drives — they stay in sync automatically because Lenis scrolls the actual window. Do NOT use Lenis' `content`/`wrapper` options (keep window scrolling).
- Anchor scrolling with browser default must be disabled: no `scroll-behavior: smooth` in CSS (Lenis replaces it; the two conflict).

### 2. Anchor navigation helper
```tsx
// lib/scrollTo.ts
export function scrollToSection(hash: string, offset = -80) {
  const lenis = (window as any).__lenis;
  const target = document.querySelector(hash);
  if (!target) return;
  if (lenis) lenis.scrollTo(target as HTMLElement, { offset, duration: 1.4 });
  else (target as HTMLElement).scrollIntoView({ behavior: "auto", block: "start" });
}
```

- Use in BOTH navs (prompt 04 pill and prompt 12 footer): `onClick={(e) => { e.preventDefault(); scrollToSection("#services"); }}`.
- The `offset: -80` lands section headings comfortably below the viewport top, matching the recording's framing.
- Duration ~1.4s for long travels (footer → services) reproduces the recorded glide; Lenis scales travel time automatically with distance when using `duration`.

### 3. Route-level hygiene
- On route change (single-page template — likely N/A), call `lenis.scrollTo(0, { immediate: true })`.
- When any modal/overlay opens: `lenis.stop()`; on close: `lenis.start()`.

### 4. Reduced motion / fallbacks
- With `prefers-reduced-motion: reduce`, Lenis is never initialized (native scroll) and `scrollToSection` uses `scrollIntoView({ behavior: "auto" })`.
- Keyboard scrolling (Tab, Space, PageDown, arrow keys) works natively — Lenis only intercepts wheel/touch by default; verify no interference with `:focus-visible` scrolling (`scrollIntoView` on focus is fine).

## Integration Checklist with Other Prompts
| Consumer | Requirement |
|---|---|
| 03 hero parallax | reads `useScroll()` — works because Lenis drives window scroll |
| 05 word reveal | same — scrubbing stays smooth under Lenis lerp |
| 04 nav pill | uses `scrollToSection` with preventDefault |
| 12 footer links | same |

## Acceptance Criteria
- [ ] Wheel scrolling glides with visible inertia and settles softly (lerp 0.1 feel), matching the reference.
- [ ] Clicking "Services" in the bottom pill from the footer glides up through all sections in ~1.4s and lands with the services heading ~80px below the top edge.
- [ ] All scroll-linked animations (hero parallax, word reveal) remain butter-smooth with no desync jitter.
- [ ] No `scroll-behavior: smooth` in any stylesheet.
- [ ] Reduced motion: native scrolling, instant anchor jumps.
- [ ] No interference with keyboard scrolling or focus management.
