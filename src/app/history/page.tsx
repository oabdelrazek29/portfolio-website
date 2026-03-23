"use client";

import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";

const timeline = [
  {
    period: "2026 - Present",
    role: "Current Role Placeholder",
    note: "Describe your current position, system ownership, and measurable outcomes.",
  },
  {
    period: "2024 - 2026",
    role: "Previous Role Placeholder",
    note: "Add details on backend/frontend responsibilities and notable delivery milestones.",
  },
  {
    period: "2022 - 2024",
    role: "Early Experience Placeholder",
    note: "Include internships, research work, or engineering projects with clear impact.",
  },
];

export default function HistoryPage() {
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
            Employment History
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.82, delay: 0.16, ease: "easeOut" }}
            className="mt-3 text-5xl font-medium text-white"
          >
            Professional Timeline
          </motion.h1>
        </section>

        <section className="mx-auto mt-12 max-w-5xl space-y-5">
          {timeline.map((item, index) => (
            <motion.article
              key={item.period}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.82, delay: index * 0.12, ease: "easeOut" }}
              className="rounded-2xl border border-purple-500/25 bg-black/45 p-6"
            >
              <p className="text-sm text-purple-200">{item.period}</p>
              <h2 className="mt-1 text-xl font-medium text-white">{item.role}</h2>
              <p className="mt-3 text-sm font-light leading-7 text-zinc-300">{item.note}</p>
            </motion.article>
          ))}
        </section>
      </main>
    </>
  );
}
