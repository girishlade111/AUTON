import type { Variants } from "framer-motion";

/* ── Easing curves (prompt 01) ─────────────────────────────── */
export const EASE = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  soft: [0.25, 0.46, 0.45, 0.94] as const,
};

/* ── Durations ─────────────────────────────────────────────── */
export const DUR = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  hero: 1.1,
};

/* ── Viewport config for scroll-triggered reveals ──────────── */
export const VIEWPORT_ONCE = {
  once: true,
  margin: "-15% 0px -15% 0px",
} as const;

/* ── Reusable variants ─────────────────────────────────────── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.base, ease: EASE.out } },
};

export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};
