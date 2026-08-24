"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/* Prompt 06 — green square bullet + label, used above every section heading */
export default function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.5, ease: EASE.out }}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <span
        aria-hidden
        className="animate-label-glow h-[7px] w-[7px] rounded-[1px] bg-accent"
      />
      <span className="text-[15px] font-medium tracking-wide text-ink">
        {children}
      </span>
    </motion.div>
  );
}
