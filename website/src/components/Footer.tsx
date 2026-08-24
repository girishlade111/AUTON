"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT_ONCE, staggerParent } from "@/lib/motion";
import { scrollToSection } from "@/lib/scrollTo";

/* Prompt 12 — giant solid-white wordmark, hover-underline nav links, copyright.
   pb clearance keeps the fixed bottom nav pill from overlapping content. */

const EASE_OUT = [...EASE.out] as [number, number, number, number];

const LINKS = [
  { label: "About", hash: "#about" },
  { label: "Services", hash: "#services" },
  { label: "Project", hash: "#projects" },
  { label: "My Skill", hash: "#skills" },
  { label: "Testimonials", hash: "#testimonials" },
  { label: "Contact", hash: "#contact" },
];

export default function Footer() {
  const reduced = useReducedMotion();

  return (
    <footer className="relative z-10 bg-bg pb-[150px] pt-[clamp(80px,10vw,140px)]">
      <motion.p
        initial={reduced ? false : { opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        aria-hidden
        className="select-none text-center font-display text-[clamp(64px,11vw,180px)] font-extrabold leading-[0.95] tracking-[-0.02em] text-ink max-sm:whitespace-normal sm:whitespace-nowrap"
      >
        Auton Foster
      </motion.p>
      <h2 className="sr-only">Auton Foster — footer navigation</h2>

      <motion.ul
        variants={staggerParent}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
      >
        {LINKS.map((link) => (
          <motion.li
            key={link.label}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: EASE_OUT },
              },
            }}
          >
            <a
              href={link.hash}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.hash);
              }}
              className="footer-link py-2 font-heading text-[15px] font-medium uppercase tracking-[0.04em] text-ink"
            >
              {link.label}
            </a>
          </motion.li>
        ))}
      </motion.ul>

      <p className="mt-8 text-center text-[13.5px] text-muted">
        ©2026 Auton. All rights reserved.
      </p>
    </footer>
  );
}
