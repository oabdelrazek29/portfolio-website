"use client";

/**
 * Skills: chip list from `skills` in `portfolio.ts` plus banner art from `siteConfig`.
 */

import { motion } from "framer-motion";
import { SceneLine, SceneStagger } from "@/components/ui/SceneText";
import { siteConfig, skills } from "@/data/portfolio";

export function SkillsSection() {
  const banner =
    siteConfig.skillsBannerImage && typeof siteConfig.skillsBannerImage === "string"
      ? siteConfig.skillsBannerImage
      : null;

  return (
    <section id="skills" className="relative px-5 py-20 md:px-8 md:py-28">
      <motion.div
        className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12 md:items-start"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="md:col-span-7">
          <SceneStagger>
            <SceneLine>
              <p className="text-sm uppercase tracking-[0.2em] text-purple-300/85">
                Core Capabilities
              </p>
            </SceneLine>
            <SceneLine delay={0.08}>
              <h2 className="mt-3 text-4xl font-medium tracking-[-0.02em] text-white md:text-5xl">
                Skills
              </h2>
            </SceneLine>
          </SceneStagger>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {skills.map((skill, index) => (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.86, delay: index * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, scale: 1.03 }}
                className="rounded-full border border-purple-400/35 bg-[#150b21]/80 px-4 py-2 text-sm font-normal text-purple-100 shadow-[0_0_20px_rgba(122,0,255,0.18)]"
              >
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {banner ? (
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.88, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5"
          >
            <div
              className="min-h-[220px] overflow-hidden rounded-2xl border border-purple-400/30 bg-zinc-950 shadow-[0_0_26px_rgba(122,0,255,0.18)] md:min-h-[320px]"
              style={{
                backgroundImage: [
                  "linear-gradient(125deg, rgba(24,8,42,0.55) 0%, rgba(0,0,0,0.1) 100%)",
                  `url('${banner}')`,
                ].join(", "),
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}
