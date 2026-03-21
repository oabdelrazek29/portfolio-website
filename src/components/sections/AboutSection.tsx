"use client";

/**
 * About copy comes from `siteConfig` in src/data/portfolio.ts.
 * When you add aboutImage, drop a file in /public and set siteConfig.aboutImage.
 */

import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { siteConfig } from "@/data/portfolio";

export function AboutSection() {
  return (
    <SectionReveal id="about" className="relative z-10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-300/90">
          About
        </p>
        <SectionHeading>At a glance</SectionHeading>
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_320px] md:items-start">
          <GlassCard className="p-8 md:p-10">
            <div className="space-y-6 text-base leading-relaxed text-zinc-300">
              {siteConfig.about.split("\n\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </GlassCard>

          {/* Image slot: wire up when siteConfig.aboutImage is set */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-purple-400/25 bg-gradient-to-br from-purple-800/25 to-[#1a1724] shadow-aura-sm">
            {siteConfig.aboutImage ? (
              <Image
                src={siteConfig.aboutImage}
                alt="Profile"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <span className="text-4xl text-purple-500/40">◇</span>
                <p className="mt-4 text-sm text-zinc-500">
                  Placeholder for your photo.
                  <br />
                  Set <code className="text-purple-300/80">aboutImage</code> in{" "}
                  <code className="text-purple-300/80">portfolio.ts</code>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
