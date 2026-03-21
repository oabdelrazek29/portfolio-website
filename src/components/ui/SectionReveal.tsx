"use client";

/**
 * Scroll-driven reveal: blur + slide + fade. Used to wrap major sections.
 * Tweak `viewport.margin` if sections animate too early/late on your screen.
 */

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  id?: string;
  className?: string;
} & Omit<HTMLMotionProps<"section">, "children">;

export function SectionReveal({ children, id, className = "", ...rest }: SectionRevealProps) {
  return (
    <motion.section
      id={id}
      className={`scroll-mt-28 ${className}`}
      initial={{ opacity: 0, y: 48, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
