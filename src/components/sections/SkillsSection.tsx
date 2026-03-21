"use client";

/**
 * Skills: Python & Physics plus others — scroll on small screens, grid on md+.
 */

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { skills } from "@/data/portfolio";

export function SkillsSection() {
  return (
    <SectionReveal id="skills" className="relative z-10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-300/90">Toolkit</p>
        <SectionHeading>Skills</SectionHeading>
        <p className="mt-4 max-w-xl text-zinc-400">
          Includes Python and Physics — hover a bubble for a light lift and glow.
        </p>

        <div className="skills-scroll relative mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pt-2 md:snap-none md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0 md:pt-0 lg:grid-cols-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="snap-center shrink-0 md:snap-none"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 720 }}
              whileHover={{
                scale: 1.06,
                rotateY: 5,
                rotateX: -3,
                transition: { type: "spring", stiffness: 420, damping: 20 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={
                  "flex min-w-[7.5rem] items-center gap-3 rounded-full border border-purple-400/35 " +
                  "bg-gradient-to-br from-white/[0.1] via-purple-500/10 to-[#1a1724]/90 px-5 py-3 " +
                  "shadow-[0_10px_32px_-14px_rgba(0,0,0,0.4),0_0_28px_-10px_rgba(167,139,250,0.3)] " +
                  "transition-[box-shadow,border-color] duration-300 hover:border-purple-300/50 " +
                  "hover:shadow-[0_14px_40px_-12px_rgba(0,0,0,0.35),0_0_36px_-6px_rgba(192,132,252,0.38)]"
                }
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-purple-300/30 bg-[#1a1724]/80 text-xs font-semibold text-purple-100">
                  {skill.icon}
                </span>
                <span className="font-display text-sm font-semibold tracking-tight text-white md:text-base">
                  {skill.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
