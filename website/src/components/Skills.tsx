"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import { EASE, VIEWPORT_ONCE } from "@/lib/motion";

/* Prompt 09 — infinite leftward logo marquee, constant speed, seamless loop. */

const EASE_OUT = [...EASE.out] as [number, number, number, number];

const TOOLS = [
  { name: "Tailwind CSS", img: "/images/icon-tailwind.png", w: 135 },
  { name: "JavaScript", img: "/images/icon-js.png", w: 84 },
  { name: "Framer", img: "/images/icon-framer.png", w: 84 },
  { name: "Webflow", img: "/images/icon-webflow.png", w: 130 },
  { name: "Figma", img: "/images/icon-figma.png", w: 104 },
  { name: "Photoshop", img: "/images/icon-ps.png", w: 92 },
  { name: "Illustrator", img: "/images/icon-ai.png", w: 92 },
];

function LogoSet({ ariaHidden }: { ariaHidden: boolean }) {
  return (
    <>
      {TOOLS.map((tool) => (
        <Image
          key={tool.name + (ariaHidden ? "-dup" : "")}
          src={tool.img}
          unoptimized
          alt={ariaHidden ? "" : tool.name}
          aria-hidden={ariaHidden}
          width={tool.w}
          height={92}
          className="h-[clamp(56px,5.5vw,84px)] w-auto mix-blend-screen"
        />
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
        Skills that drive results
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
