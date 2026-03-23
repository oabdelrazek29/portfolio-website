"use client";

/**
 * Skills section with staggered reveal.
 * Add/edit skills in the `skills` array below.
 */

import { motion } from "framer-motion";

const skills = [
  "Java",
  "Python",
  "JavaScript",
  "React",
  "AI Systems",
  "Simulation Development",
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative px-5 py-20 md:px-8 md:py-28">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm uppercase tracking-[0.2em] text-purple-300/85"
        >
          Core Capabilities
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.82, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-4xl font-medium tracking-[-0.02em] text-white md:text-5xl"
        >
          Skills
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.86, delay: index * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, scale: 1.03 }}
              className="rounded-full border border-purple-400/35 bg-[#150b21]/80 px-4 py-2 text-sm font-normal text-purple-100 shadow-[0_0_20px_rgba(122,0,255,0.18)]"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
