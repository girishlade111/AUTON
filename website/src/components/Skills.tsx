"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import { BRAND_ICONS } from "@/lib/brand-icons";
import { EASE, VIEWPORT_ONCE } from "@/lib/motion";

/* Prompt 09 — infinite leftward logo marquee, constant speed, seamless loop.
   Content: Girish Lade's actual stack (official single-color brand SVGs). */

const EASE_OUT = [...EASE.out] as [number, number, number, number];

const TOOLS: { name: string; icon: string }[] = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "NVIDIA NIM / LLM APIs", icon: "nvidia" },
  { name: "Supabase", icon: "supabase" },
  { name: "Claude Code", icon: "claude" },
];

function LogoSet({ ariaHidden }: { ariaHidden: boolean }) {
  return (
    <>
      {TOOLS.map((tool) => (
        <svg
          key={tool.name + (ariaHidden ? "-dup" : "")}
          viewBox="0 0 24 24"
          role="img"
          aria-label={ariaHidden ? undefined : tool.name}
          aria-hidden={ariaHidden || undefined}
          className="h-[clamp(56px,5.5vw,84px)] w-[clamp(56px,5.5vw,84px)] fill-[#6b6b6e]"
        >
          <path d={BRAND_ICONS[tool.icon]} />
        </svg>
      ))}
    </>
  );
}

export default function Skills() {
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="section-pad relative z-10 overflow-clip bg-bg">
      <SectionLabel className="mb-6">My Skill</SectionLabel>

      <motion.h2
        initial={reduced ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="heading-giant text-center"
      >
        Tools I build with
      </motion.h2>

      {/* Screen-reader list (single announcement) */}
      <ul className="sr-only">
        {TOOLS.map((tool) => (
          <li key={tool.name}>{tool.name}</li>
        ))}
      </ul>

      <div
        aria-hidden
        className="mt-16 overflow-hidden py-[clamp(20px,3vw,40px)] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div
          className={`flex w-max items-center gap-[clamp(90px,10vw,170px)] pr-[clamp(90px,10vw,170px)] ${
            reduced ? "" : "animate-marquee-left will-change-transform"
          }`}
        >
          <LogoSet ariaHidden />
          <LogoSet ariaHidden />
        </div>
      </div>
    </section>
  );
}
