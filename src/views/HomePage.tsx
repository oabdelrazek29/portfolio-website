"use client";

/**
 * Composes all on-page sections. This file is the "single page" body.
 * Tweak section order here; edit copy/data in src/data/portfolio.ts.
 *
 * Note: We use `src/views/` instead of `src/pages/` because Next.js reserves
 * `pages/` for the legacy Pages Router — see README "Project structure".
 */

import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FutureSection } from "@/components/sections/FutureSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import type { GitHubRepo } from "@/lib/github";

type HomePageProps = {
  githubRepos: GitHubRepo[];
};

export function HomePage({ githubRepos }: HomePageProps) {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 28, filter: "blur(14px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeroSection />
        <AboutSection />
        <FutureSection />
        <ProjectsSection githubRepos={githubRepos} />
        <SkillsSection />
        <ResumeSection />
        <ContactSection />
        <Footer />
      </motion.main>
    </>
  );
}
