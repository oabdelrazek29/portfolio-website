"use client";

/**
 * Section titles (Outfit) — gentle idle drift + spring hover.
 */

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
};

export function SectionHeading({
  children,
  className = "font-display mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl",
}: SectionHeadingProps) {
  return (
    <motion.h2
      className={className}
      style={{ transformPerspective: 960 }}
      animate={{
        y: [0, -2.5, 0],
        rotateZ: [0, 0.25, 0, -0.25, 0],
        scale: [1, 1.006, 1],
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.02,
        y: -4,
        rotateX: 3.5,
        rotateY: -2,
        transition: { type: "spring", stiffness: 380, damping: 24 },
      }}
    >
      {children}
    </motion.h2>
  );
}
