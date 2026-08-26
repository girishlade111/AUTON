"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { EASE } from "@/lib/motion";

/* Prompt 02 — Hero layout + staggered load cascade.
   Prompt 03 — whole composition parallaxes out at ~0.55x scroll speed.

   Layout measured from the reference recording (1920×1080):
   - Portrait: full-bleed cover, subject centered, melts into black at bottom.
   - Wordmark: ~91vw wide, cap-top ≈ 42vh, gradient white → #3f3f42.
   - Tagline top ≈ 69vh / signature top ≈ 76.5vh (left 64px).
   - "20 / 26" top ≈ 64vh (right 64px), ~115px condensed numerals. */

const EASE_OUT = [...EASE.out] as [number, number, number, number];

export default function Hero() {
  const reduced = useReducedMotion();

  /* Prompt 03: scroll-linked parallax exit */
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 800], [0, 440]);
  const heroY = useSpring(rawY, { stiffness: 120, damping: 30, mass: 0.4 });
  const heroOpacity = useTransform(scrollY, [0, 620], [1, 0]);

  const parallaxStyle = reduced
    ? undefined
    : { y: heroY, opacity: heroOpacity };

  const entrance = reduced
    ? false
    : ({ opacity: 0, scale: 1.04 } as const);

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-bg"
    >
      {/* Parallax group: portrait + wordmark + columns */}
      <motion.div style={parallaxStyle} className="absolute inset-0">
        {/* Portrait — full-bleed, subject centered, baked black fade at bottom.
            Extended above the viewport so the hairline sits near the top edge
            (matches reference framing). */}
        <motion.div
          initial={entrance}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE_OUT }}
          className="absolute inset-x-0 -top-[7%] h-[114%]"
        >
          {/* TODO: Replace /images/hero-portrait.jpg with your real professional
              photo (16:9 landscape, black studio background — see prompt 14 for
              the outpainting recipe). Container/crop must stay unchanged. */}
          <Image
            src="/images/hero-portrait.jpg"
            alt="Portrait of Girish Lade"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top [mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)]"
          />
        </motion.div>

        {/* Giant gradient wordmark over the portrait */}
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 1.0, ease: EASE_OUT }}
          aria-label="Girish Lade — Building AI-Powered Tools That Empower Developers"
          className="pointer-events-none absolute inset-x-0 top-[37.5%] z-20 select-none text-center"
        >
          <span
            aria-hidden
            className="wordmark-gradient whitespace-nowrap font-display text-[clamp(48px,14vw,270px)] font-extrabold leading-none tracking-[-0.02em]"
          >
            Girish Lade
          </span>
        </motion.h1>

        {/* Left column: tagline + signature (grouped so spacing can't collapse) */}
        <div className="absolute left-6 top-[65%] z-20 md:left-16 md:top-[69%]">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: EASE_OUT }}
            className="[text-shadow:0_2px_18px_rgba(0,0,0,0.55)] text-[16px] font-medium leading-[1.45] text-ink md:text-[19px]"
          >
            Building AI-Powered Tools
            <br />
            That Empower Developers
          </motion.p>

          {/* Signature — handwriting-style wipe (script font, real name) */}
          <motion.div
            initial={
              reduced ? false : { opacity: 0, y: 24, rotate: -8, clipPath: "inset(0 100% 0 0)" }
            }
            animate={{ opacity: 1, y: 0, rotate: -4, clipPath: "inset(0 0% 0 0)" }}
            transition={{ delay: 0.72, duration: 0.9, ease: EASE_OUT }}
            className="mt-2.5 md:mt-3"
          >
            <span className="[text-shadow:0_2px_18px_rgba(0,0,0,0.55)] font-script text-[34px] leading-none text-ink md:text-[44px]">
              Girish Lade
            </span>
          </motion.div>
        </div>

        {/* Right column: 20 / 26 */}
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.66, duration: 0.7, ease: EASE_OUT }}
          className="[text-shadow:0_2px_18px_rgba(0,0,0,0.55)] absolute right-5 top-[61%] z-20 text-right font-heading text-[clamp(52px,13vw,115px)] font-semibold leading-[1.09] text-ink sm:top-[63%] sm:text-[clamp(64px,6vw,115px)] md:right-16"
        >
          20
          <br />
          26
        </motion.div>
      </motion.div>

      {/* Top bar — normal flow, no parallax */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6, ease: EASE_OUT }}
        className="absolute left-5 top-6 z-30 md:left-14 md:top-8"
      >
        <Image
          src="/images/logo.png"
          alt="Girish Lade logo"
          unoptimized
          width={72}
          height={72}
          className="h-[52px] w-[52px] rounded-[14px] shadow-[0_6px_24px_rgba(34,197,94,0.35)] md:h-[70px] md:w-[70px] md:rounded-[18px]"
        />
      </motion.div>
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6, ease: EASE_OUT }}
        role="status"
        className="absolute right-5 top-6 z-30 flex items-center gap-2.5 md:right-20 md:top-[52px]"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <span className="text-[15px] text-ink/90 md:text-[16px]">available for work</span>
      </motion.div>
    </section>
  );
}
