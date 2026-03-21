"use client";

/**
 * 3D bubble labels (name + project titles) — smooth multi-axis idle motion + hover.
 * Fonts: `font-display` (Outfit) from layout.
 */

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type BubbleTitleVariant = "hero" | "nav" | "footer" | "project" | "projectModal";

const variantClass: Record<BubbleTitleVariant, string> = {
  hero:
    "rounded-2xl md:rounded-3xl px-5 py-4 md:px-8 md:py-5 font-display text-4xl font-semibold leading-[1.12] tracking-tight md:text-6xl lg:text-7xl",
  nav: "rounded-xl px-2.5 py-1.5 font-display text-xs font-semibold leading-tight tracking-tight sm:px-3 sm:py-2 sm:text-sm md:px-4 md:text-base",
  footer: "rounded-xl px-2.5 py-1 font-display text-sm font-semibold",
  project:
    "rounded-xl px-3 py-1.5 font-display text-base font-semibold leading-tight md:text-lg md:px-3.5 md:py-2",
  projectModal:
    "rounded-2xl px-4 py-3 font-display text-2xl font-semibold leading-tight md:px-6 md:py-4 md:text-4xl",
};

type BubbleTitleProps = {
  children: ReactNode;
  variant: BubbleTitleVariant;
  sheen?: boolean;
  className?: string;
  phase?: number;
};

export function BubbleTitle({
  children,
  variant,
  sheen = false,
  className = "",
  phase = 0,
}: BubbleTitleProps) {
  const t = variant === "hero" ? 1 : variant === "nav" ? 0.65 : 0.85;
  const duration = variant === "hero" ? 15 : variant === "nav" ? 11 : 12;

  return (
    <span className={`bubble-3d-wrap inline-block ${className}`}>
      <motion.span
        className={`bubble-3d-inner ${variantClass[variant]}`}
        animate={{
          y: [0, -5 * t, -2 * t, 0],
          x: [0, 2.5 * t, -2.5 * t, 0],
          rotateX: [2, 5.5, 3.5, 2],
          rotateY: [-2, 2.5, -1.5, -2],
          rotateZ: [0, 0.35, 0, -0.35, 0],
          scale: [1, 1.018, 1.01, 1],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1],
          delay: phase * 1.8,
        }}
        style={{ transformStyle: "preserve-3d" }}
        whileHover={
          variant === "project" || variant === "projectModal"
            ? { scale: 1.05, rotateY: 5, rotateX: -2.5, transition: { type: "spring", stiffness: 380, damping: 20 } }
            : {
                scale: 1.035,
                rotateY: 3.5,
                rotateX: -1.5,
                transition: { type: "spring", stiffness: 400, damping: 22 },
              }
        }
      >
        <span className={sheen ? "text-sheen" : "text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)]"}>
          {children}
        </span>
      </motion.span>
    </span>
  );
}
