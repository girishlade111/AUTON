"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import { EASE, VIEWPORT_ONCE } from "@/lib/motion";

/* Prompt 08 — staggered editorial project grid with column guides.
   Content: real Lade Stack products. The template has exactly 5 slots, so the
   top-4 recommended products are joined by LS CLI to fill every slot without
   changing the grid.

   NOTE (content swap): the images below are placeholders from the reference
   video. TODO: Replace each /images/project-*.png with a real screenshot of
   the product (same aspect ratio — keep filenames). */

const EASE_OUT = [...EASE.out] as [number, number, number, number];

const PROJECTS = [
  {
    name: "LadeStack Coder",
    img: "/images/project-coder.png", // TODO: real screenshot — code.ladestack.in
    w: 817,
    h: 617,
    wrap: "lg:col-span-5 lg:col-start-1",
    sizes: "(min-width:1024px) 42vw, 92vw",
  },
  {
    name: "LadeDesign",
    img: "/images/project-designed.png", // TODO: real screenshot — design.ladestack.in
    w: 397,
    h: 265,
    wrap: "lg:col-span-3 lg:col-start-10 lg:mt-6",
    sizes: "(min-width:1024px) 24vw, 92vw",
  },
  {
    name: "LadeStack Notes",
    img: "/images/project-notes.png", // TODO: real screenshot — RAG chat / flashcards UI
    w: 1087,
    h: 817,
    wrap: "lg:col-span-7 lg:col-start-6 lg:-mt-10",
    sizes: "(min-width:1024px) 56vw, 92vw",
  },
  {
    name: "LS PDF",
    img: "/images/project-pdf.png", // TODO: real screenshot — pdf.ladestack.in
    w: 822,
    h: 605,
    wrap: "lg:col-span-5 lg:col-start-1",
    sizes: "(min-width:1024px) 42vw, 92vw",
  },
  {
    name: "LS CLI",
    img: "/images/project-cli.png", // TODO: real screenshot — terminal session
    w: 397,
    h: 297,
    wrap: "lg:col-span-3 lg:col-start-10 lg:mt-24",
    sizes: "(min-width:1024px) 24vw, 92vw",
  },
];

export default function Projects() {
  const reduced = useReducedMotion();

  return (
    <section id="projects" className="section-pad relative z-10 overflow-clip bg-bg">
      {/* Column guides */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute inset-y-0 left-[25%] w-px bg-line-soft" />
        <div className="absolute inset-y-0 left-[85%] w-px bg-line-soft" />
      </div>

      <div className="container-auton relative">
        <SectionLabel className="mb-6">My Work</SectionLabel>

        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="heading-giant mb-24 text-center"
        >
          Products I&rsquo;ve Shipped
        </motion.h2>

        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-y-[140px]">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.name}
              initial={reduced ? false : { opacity: 0, y: 60, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: (i % 2) * 0.12 }}
              className={project.wrap}
            >
              <div className="relative w-full overflow-hidden rounded-[20px]">
                <Image
                  src={project.img}
                  alt={`${project.name} — product screenshot`}
                  width={project.w}
                  height={project.h}
                  sizes={project.sizes}
                  className="h-auto w-full"
                />
              </div>
              <h3 className="mt-5 font-heading text-[clamp(22px,2.2vw,34px)] font-semibold uppercase leading-none text-ink">
                {project.name}
              </h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
