"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SceneLine, SceneStagger } from "@/components/ui/SceneText";

const sectionMeta = [
  {
    id: "resume",
    eyebrow: "Resume",
    title: "Resume Snapshot",
    body: "A structured overview of experience, technical strengths, and project outcomes. This section is intentionally modular so you can expand each block as your work evolves.",
    bullets: ["Core Summary", "Technical Skills", "Selected Projects", "Education"],
    href: "/resume",
  },
  {
    id: "history",
    eyebrow: "History",
    title: "Employment Timeline",
    body: "A clean timeline format for documenting roles, scope of work, and measurable delivery impact across each stage of your experience.",
    bullets: ["Current Role Placeholder", "Previous Role Placeholder", "Early Experience Placeholder"],
    href: "/history",
  },
  {
    id: "working-on",
    eyebrow: "Working On",
    title: "Current Development Log",
    body: "A lightweight area for active tasks, experiments, and implementation notes. Keep it current to show momentum and direction.",
    bullets: [
      "ARCADIA lesson track and telemetry prototype",
      "Site copy aligned with PHANTOM and ARCADIA",
      "PHANTOM polish and docs",
    ],
    href: "/working-on",
  },
  {
    id: "notes",
    eyebrow: "Notes",
    title: "Freeform Notes",
    body: "Use this section for architecture notes, future ideas, and references before they are promoted to polished project content.",
    bullets: ["Architecture notes", "Interface ideas", "Research references"],
    href: "/notes",
  },
  {
    id: "lab",
    eyebrow: "Lab",
    title: "Experimental Workspace",
    body: "A sandbox for rapid prototypes and system drafts. Useful for testing interaction patterns or technical concepts before production.",
    bullets: ["ARCADIA telemetry and live `/arcadia-demo`", "PHANTOM WiFi scene", "Portfolio UI experiments"],
    href: "/lab",
  },
];

export function ExtendedSections() {
  return (
    <>
      {sectionMeta.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className="scene-step relative px-5 py-20 md:px-8 md:py-28"
        >
          <motion.div
            className={`pointer-events-none absolute ${
              index % 2 === 0 ? "-left-16 top-12" : "-right-16 top-16"
            } h-40 w-40 rounded-full bg-purple-500/15 blur-3xl`}
            animate={{ y: [0, -14, 0], x: [0, index % 2 === 0 ? 6 : -6, 0], opacity: [0.2, 0.34, 0.2] }}
            transition={{ duration: 15 + index, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="mx-auto max-w-6xl">
            <div
              className={`grid gap-8 rounded-3xl border border-purple-500/20 bg-black/40 p-6 md:p-8 ${
                index % 2 === 0 ? "md:grid-cols-[1.1fr_0.9fr]" : "md:grid-cols-[0.9fr_1.1fr]"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.96, ease: [0.22, 1, 0.36, 1] }}
                className={index % 2 === 0 ? "" : "md:order-2"}
              >
                <SceneStagger>
                  <SceneLine>
                    <p className="text-sm uppercase tracking-[0.2em] text-purple-300/85">
                      {section.eyebrow}
                    </p>
                  </SceneLine>
                  <SceneLine delay={0.08}>
                    <h2 className="mt-3 text-4xl font-medium tracking-[-0.02em] text-white md:text-5xl">
                      {section.title}
                    </h2>
                  </SceneLine>
                  <SceneLine delay={0.16}>
                    <p className="mt-5 max-w-2xl text-base font-light leading-[1.72] text-zinc-300">
                      {section.body}
                    </p>
                  </SceneLine>
                  <SceneLine delay={0.22} className="mt-7">
                    <Link
                      href={section.href}
                      className="inline-flex rounded-xl border border-purple-400/40 bg-black/40 px-4 py-2 text-sm text-purple-200 transition hover:border-purple-300/60 hover:text-purple-100"
                    >
                      Open standalone {section.eyebrow.toLowerCase()} page
                    </Link>
                  </SceneLine>
                </SceneStagger>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.94, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className={index % 2 === 0 ? "" : "md:order-1"}
              >
                <div className="grid gap-3">
                  {section.bullets.map((item, itemIdx) => (
                    <motion.article
                      key={item}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -1.5 }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{
                        duration: 0.82,
                        delay: itemIdx * 0.12 + 0.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="rounded-xl border border-white/10 bg-black/40 p-4 transition-shadow duration-300 hover:shadow-[0_0_18px_rgba(122,0,255,0.22)]"
                    >
                      <p className="text-xs uppercase tracking-[0.16em] text-purple-300/70">
                        {String(itemIdx + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-2 text-sm font-light text-zinc-200">{item}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
