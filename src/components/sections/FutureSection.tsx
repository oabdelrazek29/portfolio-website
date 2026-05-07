"use client";

/**
 * Upcoming projects — PHANTOM (WFIF) plus placeholders. Copy in portfolio.ts.
 */

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { futureAmbitions } from "@/data/portfolio";
import { useLightMotion } from "@/hooks/useLightMotion";

export function FutureSection() {
  const light = useLightMotion();

  return (
    <SectionReveal id="future" className="relative z-10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-300/90">
          Precision &amp; presence
        </p>
        <SectionHeading>Upcoming projects</SectionHeading>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Work in progress — detailed builds and demos will link from here when ready.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {futureAmbitions.map((card, i) => (
            <motion.div
              key={`${card.title}-${i}`}
              className={card.wide ? "md:col-span-2" : ""}
              initial={
                light
                  ? { opacity: 0, y: 20 }
                  : { opacity: 0, y: 36, filter: "blur(10px)" }
              }
              whileInView={
                light
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                delay: i * 0.1,
                duration: light ? 0.5 : 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={light ? undefined : { transformPerspective: 1000 }}
              whileHover={
                light
                  ? undefined
                  : {
                      y: -6,
                      rotateX: 4,
                      rotateY: i % 2 === 0 ? 2 : -2,
                      transition: { type: "spring", stiffness: 320, damping: 24 },
                    }
              }
            >
              <GlassCard
                className={`h-full p-6 md:p-8 ${
                  card.placeholder ? "border-dashed border-purple-400/25 bg-white/[0.03]" : ""
                }`}
              >
                <h3 className="font-display text-xl font-semibold text-white md:text-2xl">{card.title}</h3>
                <div className="mt-4 space-y-4 text-sm leading-relaxed md:text-base">
                  {card.body.split("\n\n").map((para, j) => (
                    <p
                      key={j}
                      className={card.placeholder ? "italic text-zinc-500" : "text-zinc-300"}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
