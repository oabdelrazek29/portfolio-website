"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useLightMotion } from "@/hooks/useLightMotion";

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

function buildSceneContainer(light: boolean) {
  if (light) {
    return {
      hidden: { opacity: 0, y: 10 },
      show: (cfg: { delayChildren: number; stagger: number }) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.9, 0.3, 1],
          delayChildren: cfg.delayChildren,
          staggerChildren: Math.min(cfg.stagger, 0.04),
        },
      }),
    };
  }
  return {
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
}

function buildLineItem(light: boolean) {
  if (light) {
    return {
      hidden: { opacity: 0, y: 8 },
      show: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, delay, ease: [0.25, 0.9, 0.3, 1] },
      }),
    };
  }
  return {
    hidden: { opacity: 0, y: 10, filter: "blur(2px)" },
    show: (delay: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.62, delay, ease: [0.25, 0.9, 0.3, 1] },
    }),
  };
}

export function SceneStagger({
  children,
  className = "",
  delayChildren = 0.02,
  stagger = 0.06,
}: SceneStaggerProps) {
  const light = useLightMotion();
  const sceneContainer = buildSceneContainer(light);

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
  const light = useLightMotion();
  const lineItem = buildLineItem(light);

  return (
    <motion.div className={className} variants={lineItem} custom={delay}>
      {children}
    </motion.div>
  );
}
