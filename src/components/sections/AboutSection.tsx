"use client";

/**
 * About section.
 * The text below is intentionally hard-coded per request for brand consistency.
 */

import { motion } from "framer-motion";
import { SceneLine, SceneStagger } from "@/components/ui/SceneText";

export function AboutSection() {
  return (
    <section id="about" className="relative px-5 py-20 md:px-8 md:py-28">
      <motion.div
        className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-purple-500/25 bg-black/45 p-8 md:grid-cols-12 md:items-center md:p-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="md:col-span-7">
          <SceneStagger>
            <SceneLine>
              <p className="text-sm uppercase tracking-[0.2em] text-purple-300/85">About</p>
            </SceneLine>
            <SceneLine delay={0.08}>
              <h2 className="mt-3 text-4xl font-medium tracking-[-0.02em] text-white md:text-5xl">
                Who I Am
              </h2>
            </SceneLine>
            <SceneLine delay={0.16}>
              <p className="mt-6 max-w-2xl font-light leading-[1.72] text-zinc-300">
                I am a developer and engineer focused on building intelligent systems that connect
                software with real-world applications. My work spans AI, simulation, and advanced
                engineering concepts, with a focus on creating tools that evolve and adapt.
              </p>
            </SceneLine>
          </SceneStagger>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.82, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5"
        >
          <div className="h-72 rounded-2xl border border-purple-400/30 bg-[radial-gradient(circle_at_25%_30%,rgba(122,0,255,0.45),rgba(0,0,0,0.15)_50%),linear-gradient(140deg,rgba(106,13,173,0.38),rgba(58,80,255,0.22),rgba(0,0,0,0.62))] shadow-[0_0_30px_rgba(122,0,255,0.2)]">
            <div className="flex h-full items-end justify-start p-4">
              <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-purple-100">
                Placeholder Image
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
