"use client";

/**
 * Hero section with controlled stacked reveal.
 * Motion is intentionally calm: one heading motion, then subtext, then paragraph.
 */

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import { useCallback } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const heroName = "Omar Abdelrazek";
const subtitle = "Engineer. Builder. Creator of intelligent systems.";
const titleChars = heroName.split("");
const titleSequence = {
  hidden: {},
  show: { transition: { staggerChildren: 0.022, delayChildren: 0.1 } },
};
const titleChar = {
  hidden: { opacity: 0, y: 9, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.66, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 26, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 26, damping: 20 });
  const parallaxX = useTransform(smoothX, [0, 1], [-3, 3]);
  const parallaxY = useTransform(smoothY, [0, 1], [-3, 3]);
  const glowOpacity = useTransform(smoothX, [0, 0.5, 1], [0.2, 0.34, 0.2]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width;
    const y = (e.clientY - bounds.top) / bounds.height;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen items-center scroll-mt-24 px-5 pb-20 pt-32 md:px-8"
    >
      <motion.div
        className="mx-auto w-full max-w-6xl"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20%" }}
        style={{ x: parallaxX, y: parallaxY }}
      >
        <motion.div className="relative max-w-5xl" variants={item}>
          <motion.span
            className="pointer-events-none absolute -inset-3 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(122,0,255,0.25),transparent_70%)] blur-2xl"
            style={{ opacity: glowOpacity }}
          />
          <motion.h1
            variants={titleSequence}
            className="relative font-sans text-4xl font-semibold leading-[1.14] tracking-[-0.015em] text-white transition-colors duration-500 hover:text-purple-100 md:text-6xl"
          >
            {titleChars.map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                variants={titleChar}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        <motion.p
          variants={item}
          transition={{ duration: 0.96, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          className="mt-6 max-w-2xl text-xl font-normal text-purple-100/95 md:text-2xl"
        >
          {subtitle}
        </motion.p>

        <motion.p
          variants={item}
          transition={{ duration: 0.96, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
          className="mt-6 max-w-3xl text-base font-light leading-[1.72] text-zinc-300 md:text-lg"
        >
          I design and build systems that think, adapt, and push boundaries — from software to
          autonomous machines.
        </motion.p>

        <motion.div
          variants={item}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.44 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <GlowButton href="#projects">View Projects</GlowButton>
          <GlowButton href="#contact" className="from-[#12031f]/70 to-[#2a0b3c]/70">
            Contact Me
          </GlowButton>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
