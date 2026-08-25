"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import { EASE, VIEWPORT_ONCE } from "@/lib/motion";

/* Prompt 08 — staggered editorial project grid with column guides.
   Content: the five live Lade Stack products. Each card links to its
   production URL and uses a brand-exact product visual. */

const EASE_OUT = [...EASE.out] as [number, number, number, number];

const PROJECTS = [
  {
    name: "GB Coder",
    tagline: "AI-powered code playground",
    url: "https://code.ladestack.in",
    img: "/images/project-gbcoder.png",
    w: 816,
    h: 616,
    wrap: "lg:col-span-5 lg:col-start-1",
    sizes: "(min-width:1024px) 42vw, 92vw",
  },
  {
    name: "Image Tools",
    tagline: "Free browser-based image toolkit",
    url: "https://img.ladestack.in",
    img: "/images/project-imgtools.png",
    w: 396,
    h: 264,
    wrap: "lg:col-span-3 lg:col-start-10 lg:mt-6",
    sizes: "(min-width:1024px) 24vw, 92vw",
  },
  {
    name: "Lade Stack",
    tagline: "The flagship AI developer platform",
    url: "https://ladestack.in",
    img: "/images/project-ladestack.png",
    w: 1086,
    h: 816,
    wrap: "lg:col-span-7 lg:col-start-6 lg:-mt-10",
    sizes: "(min-width:1024px) 56vw, 92vw",
  },
  {
    name: "LS PDF",
    tagline: "17 free online PDF tools",
    url: "https://pdf.ladestack.in",
    img: "/images/project-lspdf.png",
    w: 822,
    h: 604,
    wrap: "lg:col-span-5 lg:col-start-1",
    sizes: "(min-width:1024px) 42vw, 92vw",
  },
  {
    name: "Driving Vibes",
    tagline: "Ad-free music streaming for drivers",
    url: "https://drive.ladestack.in",
    img: "/images/project-drivingvibes.png",
    w: 396,
    h: 296,
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
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} — ${project.tagline} (opens in a new tab)`}
                className="group block"
              >
                <div className="relative w-full overflow-hidden rounded-[20px] ring-1 ring-line-soft transition-shadow duration-500 group-hover:shadow-[0_24px_80px_rgba(99,102,241,0.25)]">
                  <Image
                    src={project.img}
                    alt={`${project.name} — ${project.tagline}`}
                    width={project.w}
                    height={project.h}
                    sizes={project.sizes}
                    className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-5 flex items-baseline gap-3 font-heading text-[clamp(22px,2.2vw,34px)] font-semibold uppercase leading-none text-ink">
                  {project.name}
                  <span
                    aria-hidden
                    className="inline-block translate-y-[1px] text-[0.6em] text-accent opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    ↗
                  </span>
                </h3>
                <p className="mt-1.5 text-[14px] text-muted md:text-[15px]">
                  {project.tagline}
                </p>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
