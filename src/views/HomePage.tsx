"use client";

/**
 * This file is the page-level composition layer.
 * Reorder sections here without touching each section's internal logic.
 */

import { motion } from "framer-motion";
import { useEffect } from "react";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { useLightMotion } from "@/hooks/useLightMotion";
import { Navbar } from "@/components/layout/Navbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExtendedSections } from "@/components/sections/ExtendedSections";
import { HeroSection } from "@/components/sections/HeroSection";
import { NarrativeCloseSection } from "@/components/sections/NarrativeCloseSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
export function HomePage() {
  const light = useLightMotion();

  useEffect(() => {
    document.documentElement.classList.add("scene-scroll-active");
    document.body.classList.add("scene-scroll-active");
    return () => {
      document.documentElement.classList.remove("scene-scroll-active");
      document.body.classList.remove("scene-scroll-active");
    };
  }, []);

  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <motion.main
        initial={light ? { opacity: 0 } : { opacity: 0, filter: "blur(4px)" }}
        animate={light ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: light ? 0.45 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="scene-scroll relative z-10 transform-gpu"
      >
        <div className="scene-step">
          <HeroSection />
        </div>
        <div className="scene-step">
          <ProjectsSection />
        </div>
        <section className="px-5 pt-4 md:px-8">
          <div className="mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-purple-500/35 to-transparent" />
        </section>
        <div className="scene-step">
          <AboutSection />
        </div>
        <div className="scene-step">
          <SkillsSection />
        </div>
        <section className="px-5 pt-4 md:px-8">
          <div className="mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-purple-500/25 to-transparent" />
        </section>
        <div className="scene-step">
          <ExtendedSections />
        </div>
        <div className="scene-step">
          <NarrativeCloseSection />
        </div>
        <div className="scene-step">
          <ContactSection />
        </div>
      </motion.main>
    </>
  );
}
