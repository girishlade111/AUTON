"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import { EASE, VIEWPORT_ONCE, fadeUp } from "@/lib/motion";
import { scrollToSection } from "@/lib/scrollTo";

/* Prompt 07 — services list: rows wipe to white on hover/focus, title inverts,
   a tilted photo pops in center-left, description fades in on the right. */

const EASE_OUT = [...EASE.out] as [number, number, number, number];
const EASE_INOUT = [...EASE.inOut] as [number, number, number, number];

/* NOTE (content swap): images below are placeholders from the reference video.
   TODO: Replace each /images/service-*.jpg with a real screenshot of the
   matching Lade Stack tool (same crop/aspect — the tilted display is CSS). */

const SERVICES = [
  {
    title: "AI Product Development",
    img: "/images/service-brand.jpg", // TODO: real screenshot (e.g. LadeStack Coder)
    desc: "Designing and building AI-powered SaaS tools from concept to production, using LLM APIs (NVIDIA NIM, Gemini) for real functionality, not just wrappers.",
  },
  {
    title: "Full-Stack Development",
    img: "/images/service-marketing.jpg", // TODO: real screenshot (e.g. LadeStack dashboard)
    desc: "React, Next.js, Vite, Node.js — building fast, client-first, no-login web apps that solve real developer problems.",
  },
  {
    title: "UI/UX Design",
    img: "/images/service-webdev.jpg", // TODO: real screenshot (e.g. LadeDesign flow output)
    desc: "Crafting clean, functional interfaces for developer tools, prioritizing speed and clarity over decoration.",
  },
  {
    title: "AI-Directed (Vibe) Coding",
    img: "/images/service-uiux.jpg", // TODO: real screenshot (e.g. LS CLI terminal session)
    desc: "Using Claude Code, Cursor, and Gemini CLI to architect and ship production apps solo, at a pace normal solo dev can't match.",
  },
  {
    title: "Product Strategy & Positioning",
    img: "/images/service-graphics.jpg", // TODO: real screenshot (e.g. ladestack.in landing page)
    desc: "Scoping MVPs, picking defensible niches, avoiding AI-wrapper traps, and shipping for a global audience.",
  },
];

const photoVariants = {
  closed: { opacity: 0, scale: 0.7, rotate: -14 },
  open: {
    opacity: 1,
    scale: 1,
    rotate: -6,
    transition: { duration: 0.45, ease: EASE_OUT, delay: 0.06 },
  },
};

const descVariants = {
  closed: { opacity: 0, y: 12 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT, delay: 0.1 },
  },
};

export default function Services() {
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion();

  return (
    <section id="services" className="section-pad relative z-10 bg-bg">
      <SectionLabel className="mb-6">Services</SectionLabel>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="heading-giant text-center"
      >
        What I Build
      </motion.h2>

      <ul className="mt-16">
        {SERVICES.map((service, i) => {
          const isActive = active === i;
          return (
            <li
              key={service.title}
              className="relative border-t border-line last:border-b"
              style={{ zIndex: isActive ? 20 : 1 }}
            >
              <a
                href="#contact"
                aria-expanded={isActive}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
                onFocus={() => setActive(i)}
                onBlur={() => setActive((cur) => (cur === i ? null : cur))}
                onClick={(e) => {
                  /* Touch: first tap expands, second tap navigates */
                  const touch = window.matchMedia("(hover: none)").matches;
                  if (touch && !isActive) {
                    e.preventDefault();
                    setActive(i);
                    return;
                  }
                  e.preventDefault();
                  scrollToSection("#contact");
                }}
                className="group block w-full transition-colors duration-[350ms]"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)",
                  backgroundColor: isActive ? "#ffffff" : "rgba(0,0,0,0)",
                }}
              >
                <div className="relative flex min-h-[clamp(150px,22vh,240px)] flex-col items-start px-[clamp(24px,6vw,110px)] py-6 lg:flex-row lg:items-center lg:py-0">
                  <h3
                    className="font-heading text-[clamp(28px,3vw,46px)] font-semibold uppercase leading-none transition-colors duration-[350ms]"
                    style={{
                      transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)",
                      color: isActive ? "#0a0a0a" : "#ffffff",
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Desktop expanded layer: tilted photo + description */}
                  <div className="pointer-events-none absolute left-[38%] top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <motion.div
                      aria-hidden
                      animate={reduced ? "open" : isActive ? "open" : "closed"}
                      variants={photoVariants}
                      className="relative aspect-[368/248] w-[clamp(240px,20vw,380px)]"
                    >
                      <Image
                        src={service.img}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 20vw, 60vw"
                        className="rounded-2xl object-cover shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
                      />
                    </motion.div>
                  </div>
                  <div className="pointer-events-none absolute right-[6%] top-1/2 z-10 hidden w-[min(420px,30vw)] -translate-y-1/2 lg:block">
                    <motion.p
                      animate={reduced ? "open" : isActive ? "open" : "closed"}
                      variants={descVariants}
                      className="text-[15px] leading-relaxed text-[#3f3f42]"
                    >
                      {service.desc}
                    </motion.p>
                  </div>

                  {/* Mobile expanded layer: stacked under the title */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE_OUT }}
                      className="mt-4 w-full lg:hidden"
                    >
                      <div className="relative mb-3 aspect-[368/248] w-full max-w-[300px] -rotate-6">
                        <Image
                          src={service.img}
                          alt=""
                          fill
                          sizes="60vw"
                          className="rounded-xl object-cover shadow-[0_16px_40px_rgba(0,0,0,0.3)]"
                        />
                      </div>
                      <p className="text-[14px] leading-relaxed text-[#3f3f42]">
                        {service.desc}
                      </p>
                    </motion.div>
                  )}
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
