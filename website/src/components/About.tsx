"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import SectionLabel from "@/components/SectionLabel";

/* Prompt 05 — scroll-linked word-by-word text reveal (reversible).
   Words scrub from #3d3d3f to #ffffff as the block travels 85% → 25% of viewport. */

const STATEMENT =
  "I'm a passionate designer and developer dedicated to creating modern, user-focused digital experiences. From building strong brand identities to designing intuitive interfaces and developing responsive websites, I help businesses transform ideas into impactful digital products.";

const WORDS = STATEMENT.split(" ");

function Word({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const color = useTransform(progress, range, ["#3d3d3f", "#ffffff"]);
  return (
    <motion.span
      aria-hidden
      style={{ color }}
      className="mr-[0.28em] inline-block will-change-[color]"
    >
      {children}
    </motion.span>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  const total = WORDS.length;

  return (
    <section id="about" className="section-pad relative z-10 bg-bg">
      <SectionLabel className="mb-6">About Me</SectionLabel>

      <div ref={ref} className="relative mx-auto max-w-[1400px] px-6">
        {/* Decorative bracket rules flanking the text block */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden lg:block">
          <div className="absolute left-0 top-1/2 flex w-[11vw] items-center">
            <span className="h-[10px] w-[4px] bg-line" />
            <span className="h-px flex-1 bg-line" />
            <span className="h-[10px] w-[4px] bg-line" />
          </div>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block">
          <div className="absolute right-0 top-1/2 flex w-[11vw] items-center">
            <span className="h-[10px] w-[4px] bg-line" />
            <span className="h-px flex-1 bg-line" />
            <span className="h-[10px] w-[4px] bg-line" />
          </div>
        </div>

        <p
          aria-label={STATEMENT}
          className="text-center font-body font-semibold uppercase leading-[1.15] tracking-[0.01em]"
          style={{ fontSize: "clamp(28px, 3.4vw, 54px)" }}
        >
          {WORDS.map((word, i) => {
            if (reduced) {
              return (
                <span key={i} className="mr-[0.28em] inline-block text-ink">
                  {word}
                </span>
              );
            }
            const start = (i / total) * 0.9;
            const end = Math.min(start + (0.1 / total) * 3, 1);
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}
