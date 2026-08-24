"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import { EASE, VIEWPORT_ONCE } from "@/lib/motion";

/* Prompt 10 — avatar switcher + crossfading uppercase quote */

const EASE_OUT = [...EASE.out] as [number, number, number, number];
const EASE_SOFT = [...EASE.soft] as [number, number, number, number];

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Founder, NovaTech",
    avatar: "/images/avatar-1.jpg",
    quote:
      "Working with Milan was a fantastic experience. The website design was modern, intuitive, and exceeded our expectations. Communication was smooth, and every detail was thoughtfully crafted.",
  },
  {
    name: "Daniel Reyes",
    role: "CEO, Brightline Studio",
    avatar: "/images/avatar-2.jpg",
    quote:
      "Auton delivered our platform ahead of schedule without cutting a single corner. The attention to detail and the polish of the final product genuinely surprised our whole team.",
  },
  {
    name: "Emily Carter",
    role: "Product Lead, Loopwork",
    avatar: "/images/avatar-3.jpg",
    quote:
      "From the first call to the final handoff, everything was clear, fast, and precise. Our conversion rate jumped within weeks of launching the new design.",
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
        Trusted by Clients
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
                <Image
                  src={t.avatar}
                  alt={`Portrait of ${t.name}`}
                  fill
                  sizes="110px"
                  className="object-cover"
                />
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
