"use client";

import { motion, useReducedMotion } from "framer-motion";
import { scrollToSection } from "@/lib/scrollTo";

/* Prompt 04 — fixed bottom-center navigation pill, visible on every section */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  { label: "About", hash: "#about" },
  { label: "Services", hash: "#services" },
  { label: "Products", hash: "#projects" },
  { label: "Contact", hash: "#contact" },
];

export default function NavPill() {
  const reduced = useReducedMotion();

  const go = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    scrollToSection(hash);
  };

  return (
    <motion.nav
      aria-label="Primary"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6, ease: EASE_OUT }}
      className="fixed left-1/2 z-50 -translate-x-1/2 bottom-[calc(env(safe-area-inset-bottom)+14px)] md:bottom-[calc(env(safe-area-inset-bottom)+32px)]"
    >
      <div className="no-scrollbar flex max-w-[calc(100vw-16px)] items-center gap-0 overflow-x-auto whitespace-nowrap rounded-full bg-[#2b2b2d]/95 p-1 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md min-[420px]:gap-1 min-[420px]:p-1.5 sm:p-2 md:max-w-none md:overflow-visible">
        <ul className="flex shrink-0 items-center">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.hash}
                onClick={(e) => go(e, link.hash)}
                className="rounded-full px-[7px] py-[11px] text-[12.5px] font-medium text-ink/90 transition-colors duration-300 hover:bg-white/8 hover:text-ink active:bg-white/12 min-[420px]:px-3.5 min-[420px]:text-[13px] sm:px-6 sm:py-[17px] sm:text-[17px]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="https://ladestack.in"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-[#4a4a4d] px-2 py-[11px] text-[12.5px] font-medium text-white transition-colors duration-300 hover:bg-white hover:text-black active:bg-white/90 min-[420px]:px-3.5 min-[420px]:text-[13px] sm:px-6 sm:py-[17px] sm:text-[17px]"
        >
          <span className="sm:hidden">Lade Stack</span>
          <span className="hidden sm:inline">Explore Lade Stack</span>
        </a>
      </div>
    </motion.nav>
  );
}
