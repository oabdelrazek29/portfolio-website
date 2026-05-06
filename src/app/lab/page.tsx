"use client";

import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";

const labItems: { title: string; body: string }[] = [
  {
    title: "ARCADIA telemetry stub",
    body: `A small Python program that appends timestamped CSV rows like a ground station log. It lives in the ARCADIA folder on disk, separate from this Next site.

When you are learning, readable logs beat clever binaries. This prototype is reference material for habits I will reuse in bigger autonomy stacks.`,
  },
  {
    title: "PHANTOM WiFi scene",
    body: `Interactive 3D view of modeled signal behavior in space. Useful for intuition before any claim about sensing in the real world.

Public details will track the main PHANTOM writeup when the next milestone is ready.`,
  },
  {
    title: "Portfolio UI slices",
    body: `Motion, glass cards, and section flow on this site are also a lab. Small layout experiments land here first so the main homepage stays cohesive.`,
  },
  {
    title: "Room for the next build",
    body: `This slot is intentionally open. When a new prototype deserves a public note, it lands here with context and honest limits.`,
  },
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
          {labItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="rounded-xl border border-purple-500/25 bg-black/45 p-5"
            >
              <h2 className="text-lg font-medium text-white">{item.title}</h2>
              <p className="mt-2 text-sm font-light leading-7 text-zinc-300 whitespace-pre-line">
                {item.body}
              </p>
            </motion.article>
          ))}
        </section>
      </main>
    </>
  );
}
