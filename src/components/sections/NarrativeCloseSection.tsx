"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GlowButton } from "@/components/ui/GlowButton";
import { SceneLine, SceneStagger } from "@/components/ui/SceneText";

export function NarrativeCloseSection() {
  return (
    <section className="relative px-5 py-20 md:px-8 md:py-28">
      <motion.div
        className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-purple-500/25 bg-black/45 p-8 md:p-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.96, ease: [0.22, 1, 0.36, 1] }}
      >
        <SceneStagger>
          <SceneLine>
            <p className="text-sm uppercase tracking-[0.2em] text-purple-300/85">Next Step</p>
          </SceneLine>
          <SceneLine delay={0.08}>
            <h2 className="mt-3 max-w-3xl text-4xl font-medium tracking-[-0.02em] text-white md:text-5xl">
              If one system stands out, open the detail and let&apos;s discuss how it can be
              extended.
            </h2>
          </SceneLine>
          <SceneLine delay={0.16}>
            <p className="mt-5 max-w-3xl text-base font-light leading-[1.72] text-zinc-300">
              This portfolio is structured as a working system. Each section can be expanded with
              live demos, technical notes, and deeper implementation details as new work is
              published.
            </p>
          </SceneLine>
        </SceneStagger>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.78, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <GlowButton href="/#projects">Review Projects</GlowButton>
          <GlowButton href="/#contact" className="from-[#12031f]/70 to-[#2a0b3c]/70">
            Start a Conversation
          </GlowButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.78, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap gap-5 text-sm text-zinc-400"
        >
          <Link href="/resume" className="transition hover:text-purple-200">
            Resume
          </Link>
          <Link href="/history" className="transition hover:text-purple-200">
            History
          </Link>
          <Link href="/working-on" className="transition hover:text-purple-200">
            Working On
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
