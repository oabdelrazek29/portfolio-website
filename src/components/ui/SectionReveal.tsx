"use client";

/**
 * Scroll-driven reveal. Blur removed on small viewports to keep phones smooth.
 */

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { useLightMotion } from "@/hooks/useLightMotion";

type SectionRevealProps = {
  children: ReactNode;
  id?: string;
  className?: string;
} & Omit<HTMLMotionProps<"section">, "children">;

export function SectionReveal({ children, id, className = "", ...rest }: SectionRevealProps) {
  const light = useLightMotion();

  const initial = light
    ? { opacity: 0, y: 20 }
    : { opacity: 0, y: 48, filter: "blur(12px)" };
  const animate = light
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.section
      id={id}
      className={`scroll-mt-28 ${className}`}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
      transition={{ duration: light ? 0.45 : 0.85, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
