"use client";

/**
 * Resume CTA — set `siteConfig.resumeUrl` when you host a PDF or external link.
 */

import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { siteConfig } from "@/data/portfolio";

export function ResumeSection() {
  const url = siteConfig.resumeUrl;

  return (
    <SectionReveal id="resume" className="relative z-10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-300/90">Resume</p>
        <SectionHeading>Experience &amp; credentials</SectionHeading>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Placeholder for your résumé — add a PDF under <code className="text-purple-300/90">/public/assets/</code>{" "}
          and set <code className="text-purple-300/90">resumeUrl</code> in{" "}
          <code className="text-purple-300/90">portfolio.ts</code>, or use any public link.
        </p>

        <motion.div
          className="mt-12 max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <GlassCard className="p-8 md:p-10">
            {url ? (
              <>
                <p className="text-zinc-300">Download or open the latest version.</p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <GlowButton href={url} className="min-w-[10rem]">
                    View resume
                  </GlowButton>
                </div>
              </>
            ) : (
              <>
                <p className="font-medium text-zinc-100">Résumé not linked yet</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{siteConfig.resumePlaceholderNote}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <GlowButton href="#contact" className="opacity-90">
                    Request CV
                  </GlowButton>
                </div>
              </>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </SectionReveal>
  );
}
