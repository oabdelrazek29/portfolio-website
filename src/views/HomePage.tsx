"use client";

/**
 * This file is the page-level composition layer.
 * Reorder sections here without touching each section's internal logic.
 */

import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExtendedSections } from "@/components/sections/ExtendedSections";
import { HeroSection } from "@/components/sections/HeroSection";
import { NarrativeCloseSection } from "@/components/sections/NarrativeCloseSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
export function HomePage() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="relative z-10 md:snap-y md:snap-proximity"
      >
        <div className="md:snap-start">
          <HeroSection />
        </div>
        <div className="md:snap-start">
          <ProjectsSection />
        </div>
        <section className="px-5 pt-4 md:px-8">
          <div className="mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-purple-500/35 to-transparent" />
        </section>
        <div className="md:snap-start">
          <AboutSection />
        </div>
        <div className="md:snap-start">
          <SkillsSection />
        </div>
        <section className="px-5 pt-4 md:px-8">
          <div className="mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-purple-500/25 to-transparent" />
        </section>
        <div className="md:snap-start">
          <ExtendedSections />
        </div>
        <div className="md:snap-start">
          <NarrativeCloseSection />
        </div>
        <div className="md:snap-start">
          <ContactSection />
        </div>
      </motion.main>
    </>
  );
}
