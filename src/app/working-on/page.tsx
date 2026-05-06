"use client";

import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";

const activeItems = [
  "ARCADIA, lesson track plus first telemetry logger prototype on my machine",
  "Portfolio site copy and upcoming projects, PHANTOM and ARCADIA front and center",
  "PHANTOM simulation polish, visualization and documentation passes",
  "Lab and Working On pages kept honest as real experiments replace placeholders",
];

export default function WorkingOnPage() {
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
            Working On
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.82, delay: 0.16, ease: "easeOut" }}
            className="mt-3 text-5xl font-medium text-white"
          >
            Current Development Log
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.76, delay: 0.26, ease: "easeOut" }}
            className="mt-5 max-w-3xl text-base font-light leading-[1.72] text-zinc-300"
          >
            Use this page as a lightweight changelog for active work and in-progress ideas.
          </motion.p>
        </section>

        <section className="mx-auto mt-12 max-w-5xl space-y-4">
          {activeItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="rounded-xl border border-purple-500/25 bg-black/45 px-5 py-4 text-zinc-200"
            >
              {item}
            </motion.div>
          ))}
        </section>
      </main>
    </>
  );
}
