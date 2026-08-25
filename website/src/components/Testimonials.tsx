"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import { EASE, VIEWPORT_ONCE } from "@/lib/motion";

/* Prompt 10 — avatar switcher + crossfading uppercase quote.

   TODO (content swap): Replace this placeholder with 1–2 real quotes from
   Lade Stack users, beta testers, or LinkedIn feedback. Keep the same object
   shape — set `avatar` to an image path for a real photo, or leave it null to
   render the initials circle. */

const EASE_OUT = [...EASE.out] as [number, number, number, number];

const TESTIMONIALS = [
  {
    name: "Lade Stack",
    role: "Community feedback · 4.1★ average · 150+ ratings",
    avatar: null, // TODO: swap in real user quotes + photos as feedback comes in
    quote:
      "8K+ developers build with Lade Stack tools — rated 4.1/5 across 150+ community reviews, with every tool free and no sign-up required.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = TESTIMONIALS[active];

  return (
    <section id="testimonials" className="section-pad relative z-10 bg-bg">
      <SectionLabel className="mb-6">Testimonials</SectionLabel>

      <motion.h2
        initial={reduced ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="heading-giant text-center"
      >
        What People Say
      </motion.h2>

      <div className="mx-auto mt-20 grid max-w-[1200px] grid-cols-1 items-start gap-12 px-6 lg:grid-cols-[auto_1fr] lg:gap-20">
        {/* Avatar stack */}
        <div className="flex gap-4 lg:flex-col" role="tablist" aria-label="Client testimonials">
          {TESTIMONIALS.map((t, i) => {
            const isActive = i === active;
            return (
              <button
                key={t.name}
                role="tab"
                aria-selected={isActive}
                aria-label={`Show testimonial from ${t.name}`}
                onClick={() => setActive(i)}
                className={`relative shrink-0 overflow-hidden rounded-full transition-all duration-300 ${
                  isActive
                    ? "h-[110px] w-[110px] ring-2 ring-white/25"
                    : "h-[72px] w-[72px] opacity-60 hover:opacity-85"
                }`}
              >
                {t.avatar ? (
                  <Image
                    src={t.avatar}
                    alt={`Portrait of ${t.name}`}
                    fill
                    sizes="110px"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-raised font-heading text-[28px] font-semibold uppercase text-muted">
                    {t.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quote panel */}
        <div aria-live="polite">
          <span aria-hidden className="block select-none text-[64px] leading-none text-ink">
            ❝
          </span>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="mt-4"
            >
              <p className="max-w-[640px] text-[clamp(18px,1.6vw,24px)] font-medium uppercase leading-[1.5] text-ink">
                {current.quote}
              </p>
              <footer className="mt-8">
                <p className="text-[16px] font-semibold text-ink">{current.name}</p>
                <p className="mt-1 text-[14px] text-muted">{current.role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
