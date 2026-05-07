"use client";

import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";
import { useLightMotion } from "@/hooks/useLightMotion";

export default function ResumePage() {
  const light = useLightMotion();

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
            Resume
          </motion.p>
          <motion.h1
            initial={
              light ? { opacity: 0, y: 24 } : { opacity: 0, y: 40, filter: "blur(6px)" }
            }
            whileInView={
              light ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: "blur(0px)" }
            }
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: light ? 0.45 : 0.82, delay: 0.16, ease: "easeOut" }}
            className="mt-3 text-5xl font-medium text-white"
          >
            Resume Snapshot
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.76, delay: 0.26, ease: "easeOut" }}
            className="mt-5 max-w-3xl text-base font-light leading-[1.72] text-zinc-300"
          >
            This page is a working resume layout. Replace each block with your final education,
            experience, and project metrics when you are ready.
          </motion.p>
        </section>

        <section className="mx-auto mt-12 grid max-w-5xl gap-6">
          {[
            "Core Summary",
            "Technical Skills",
            "Selected Projects",
            "Education",
            "Certifications",
          ].map((item, index) => (
            <motion.article
              key={item}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.82, delay: index * 0.12, ease: "easeOut" }}
              className="rounded-2xl border border-purple-500/25 bg-black/45 p-6"
            >
              <h2 className="text-xl font-medium text-white">{item}</h2>
              <p className="mt-3 text-sm font-light leading-7 text-zinc-300">
                Placeholder content for {item.toLowerCase()}. Add concise bullet points with
                outcomes, tools, and responsibilities.
              </p>
            </motion.article>
          ))}
        </section>
      </main>
    </>
  );
}
