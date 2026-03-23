"use client";

import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";

const placeholders = [
  "Experiment Placeholder A",
  "Experiment Placeholder B",
  "UI Prototype Placeholder",
  "System Design Draft Placeholder",
];

export default function LabPage() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10 px-5 pb-20 pt-32 md:px-8">
        <section className="mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-sm uppercase tracking-[0.2em] text-purple-300/85"
          >
            Lab
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.82, delay: 0.16, ease: "easeOut" }}
            className="mt-3 text-5xl font-medium text-white"
          >
            Experimental Workspace
          </motion.h1>
        </section>

        <section className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
          {placeholders.map((item, index) => (
            <motion.article
              key={item}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="rounded-xl border border-purple-500/25 bg-black/45 p-5"
            >
              <h2 className="text-lg font-medium text-white">{item}</h2>
              <p className="mt-2 text-sm font-light leading-7 text-zinc-300">
                Replace this block with a real prototype, system note, or implementation draft.
              </p>
            </motion.article>
          ))}
        </section>
      </main>
    </>
  );
}
