"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

type SceneStaggerProps = {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  stagger?: number;
};

type SceneLineProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const sceneContainer = {
  hidden: { opacity: 0, y: 12, filter: "blur(2px)" },
  show: (cfg: { delayChildren: number; stagger: number }) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
      ease: [0.25, 0.9, 0.3, 1],
      delayChildren: cfg.delayChildren,
      staggerChildren: cfg.stagger,
    },
  }),
};

const lineItem = {
  hidden: { opacity: 0, y: 10, filter: "blur(2px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.62,
      delay,
      ease: [0.25, 0.9, 0.3, 1],
    },
  }),
};

export function SceneStagger({
  children,
  className = "",
  delayChildren = 0.02,
  stagger = 0.06,
}: SceneStaggerProps) {
  return (
    <motion.div
      className={className}
      variants={sceneContainer}
      custom={{ delayChildren, stagger }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
    >
      {children}
    </motion.div>
  );
}

export function SceneLine({ children, className = "", delay = 0 }: SceneLineProps) {
  return (
    <motion.div className={className} variants={lineItem} custom={delay}>
      {children}
    </motion.div>
  );
}
