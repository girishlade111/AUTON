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
   Prompt 03 — whole composition parallaxes out at ~0.55x scroll speed. */

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
    : ({ opacity: 0, scale: 1.04, y: 24 } as const);

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-bg"
    >
      {/* Parallax group: portrait + wordmark + columns */}
      <motion.div style={parallaxStyle} className="absolute inset-0">
        {/* Portrait — melts into black at the bottom */}
        <motion.div
          initial={entrance}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE_OUT }}
          className="absolute left-1/2 top-0 w-[130vw] -translate-x-1/2 min-[480px]:w-[min(94vw,1350px)]"
        >
          <Image
            src="/images/hero-portrait.png"
            alt="Portrait of Auton Foster"
            width={1920}
            height={1080}
            priority
            className="h-auto w-full [mask-image:linear-gradient(to_bottom,black_42%,transparent_88%)]"
          />
        </motion.div>

        {/* Scrim — keeps the wordmark legible over the bright shirt */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[30vh] z-10 h-[46vh] bg-gradient-to-b from-transparent via-black/45 to-black"
        />

        {/* Giant gradient wordmark over the portrait */}
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 1.0, ease: EASE_OUT }}
          aria-label="Auton Foster — Designing Digital Experiences That Inspire"
          className="pointer-events-none absolute left-0 right-0 top-[37vh] z-20 select-none text-center"
        >
          <span
            aria-hidden
            className="wordmark-gradient whitespace-nowrap font-display text-[clamp(44px,13vw,210px)] font-extrabold leading-[1.05] tracking-[-0.02em]"
          >
            Auton Foster
          </span>
        </motion.h1>

        {/* Left column: tagline */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: EASE_OUT }}
          className="absolute bottom-[24%] left-5 z-20 md:left-8 md:top-[57%] md:bottom-auto"
        >
          <p className="text-[16px] leading-[1.45] text-ink md:text-[17px]">
            Designing Digital Experiences
            <br />
            That Inspire
          </p>
        </motion.div>

        {/* Signature — handwriting-style wipe */}
        <motion.div
          initial={
            reduced ? false : { opacity: 0, y: 24, rotate: -8, clipPath: "inset(0 100% 0 0)" }
          }
          animate={{ opacity: 1, y: 0, rotate: -4, clipPath: "inset(0 0% 0 0)" }}
          transition={{ delay: 0.72, duration: 0.9, ease: EASE_OUT }}
          className="absolute bottom-[15%] left-5 z-20 md:left-8 md:top-[68%] md:bottom-auto"
        >
          <Image
            src="/images/signature.png"
            alt="Auton Foster signature"
            unoptimized
            width={180}
            height={64}
            className="w-[110px] mix-blend-screen md:w-[130px]"
          />
        </motion.div>

        {/* Right column: 20 / 26 */}
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.66, duration: 0.7, ease: EASE_OUT }}
          className="absolute bottom-[26%] right-5 z-20 text-right font-heading text-[clamp(56px,5vw,92px)] font-semibold leading-[1.05] text-ink md:right-8 md:top-[57%] md:bottom-auto"
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
        className="absolute left-5 top-6 z-30 md:left-8 md:top-8"
      >
        <Image
          src="/images/logo.png"
          alt=""
          unoptimized
          aria-hidden
          width={72}
          height={72}
          className="h-11 w-11 mix-blend-screen"
        />
      </motion.div>
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6, ease: EASE_OUT }}
        role="status"
        className="absolute right-5 top-6 z-30 flex items-center gap-2.5 md:right-8 md:top-8"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <span className="text-[15px] text-ink/90">available for work</span>
      </motion.div>
    </section>
  );
}
