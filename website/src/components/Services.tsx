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

const SERVICES = [
  {
    title: "Brand Identity",
    img: "/images/service-brand.jpg",
    desc: "Build a memorable brand with unique logos, typography, color palettes, and visual systems.",
  },
  {
    title: "Marketing",
    img: "/images/service-marketing.jpg",
    desc: "Design social media graphics, banners, presentations, and promotional assets that strengthen your brand.",
  },
  {
    title: "Web Development",
    img: "/images/service-webdev.jpg",
    desc: "Create responsive, fast, and SEO-friendly websites with clean code and seamless performance.",
  },
  {
    title: "UI UX Design",
    img: "/images/service-uiux.jpg",
    desc: "Design intuitive websites, mobile apps, dashboards, and SaaS products that deliver exceptional user experiences.",
  },
  {
    title: "Graphics Design",
    img: "/images/service-graphics.jpg",
    desc: "Produce professional print and digital designs, including brochures, business cards, posters, and marketing materials.",
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
        Services that drive
        <br />
        Brands
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
