"use client";

/**
 * Hero: name + short bold summary lines (see `heroSummaryLines` in portfolio.ts).
 */

import { motion } from "framer-motion";
import { BubbleTitle } from "@/components/ui/BubbleTitle";
import { GlowButton } from "@/components/ui/GlowButton";
import { siteConfig } from "@/data/portfolio";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-[100svh] flex-col justify-center scroll-mt-28 px-5 pb-24 pt-32 md:px-8"
    >
      <motion.div
        className="mx-auto w-full max-w-6xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-purple-300/85"
        >
          Portfolio / 2025
        </motion.p>
        <motion.h1 variants={item} className="max-w-5xl">
          <BubbleTitle variant="hero" sheen phase={0}>
            {siteConfig.name}
          </BubbleTitle>
        </motion.h1>
        <motion.div variants={item} className="mt-8 max-w-2xl space-y-4">
          {siteConfig.heroSummaryLines.map((line, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? "text-xl font-bold leading-snug tracking-tight text-white md:text-2xl"
                  : "text-base font-medium leading-relaxed text-zinc-100 md:text-lg"
              }
            >
              {line}
            </p>
          ))}
        </motion.div>
        <motion.div variants={item} className="mt-12 flex flex-wrap gap-4">
          <GlowButton href="#projects">View work</GlowButton>
          <GlowButton href="#contact">Let&apos;s talk</GlowButton>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0910] to-transparent" />
    </section>
  );
}
