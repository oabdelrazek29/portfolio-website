"use client";

/**
 * Featured projects section with alternating rows, hover glow, and detail modal.
 * Main data source is `/data/projects.js`.
 */

import { motion } from "framer-motion";
import { useState } from "react";
import { projects } from "../../../data/projects";
import { SceneLine, SceneStagger } from "@/components/ui/SceneText";
import { ProjectModal } from "./ProjectModal";

type ProjectItem = {
  title: string;
  status: string;
  shortDescription: string;
  description: string;
  image: string;
  github: string;
  demo: string;
  stack?: string[];
  focus?: string[];
};

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const scene = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      <section id="projects" className="relative px-5 py-20 md:px-8 md:py-28">
        <div className="pointer-events-none absolute -right-12 top-20 h-44 w-44 rounded-full bg-purple-500/12 blur-3xl" />
        <motion.div
          className="mx-auto max-w-6xl"
          variants={scene}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20%" }}
        >
          <SceneStagger>
            <SceneLine>
              <p className="text-sm uppercase tracking-[0.22em] text-purple-300/85">Main Focus</p>
            </SceneLine>
            <SceneLine delay={0.08}>
              <h2 className="mt-3 text-4xl font-medium tracking-[-0.02em] text-white md:text-5xl">
                Featured Projects
              </h2>
            </SceneLine>
            <SceneLine delay={0.16}>
              <p className="mt-4 max-w-2xl text-base font-light leading-[1.72] text-zinc-300">
                A curated showcase of in-progress systems, organized by intent, architecture, and
                current software priorities.
              </p>
            </SceneLine>
          </SceneStagger>

          <div className="mt-14 space-y-8">
            {projects.map((project: ProjectItem, index: number) => (
              <motion.button
                key={project.title}
                type="button"
                layoutId={`project-card-${project.title}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.95, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3 }}
                onClick={() => setActiveProject(project)}
                className={`group grid w-full overflow-hidden rounded-3xl border border-purple-500/25 bg-black/50 text-left transition-all duration-500 hover:border-purple-400/50 hover:shadow-[0_0_34px_rgba(122,0,255,0.3)] md:grid-cols-12 ${
                  index % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                }`}
              >
                <div className="relative min-h-[220px] md:col-span-7">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 20%, rgba(122,0,255,0.35), rgba(0,0,0,0.15) 50%), linear-gradient(135deg, rgba(106,13,173,0.5), rgba(58,80,255,0.25), rgba(0,0,0,0.5))",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-purple-100">
                    Image Placeholder
                  </div>
                </div>

                <div className="relative p-6 md:col-span-5 md:p-8">
                  <p className="text-xs font-normal uppercase tracking-[0.18em] text-purple-300/80">
                    {String(index + 1).padStart(2, "0")} / Selected Work
                  </p>
                  <h3 className="text-2xl font-medium text-white transition-transform duration-400 group-hover:-translate-y-1">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-[1.7] text-zinc-300 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                    {project.shortDescription}
                  </p>
                  {project.stack?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <span className="mt-5 inline-block text-sm text-purple-200/90 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                    View Details
                  </span>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 block w-fit text-xs text-purple-300/80 underline-offset-4 transition hover:text-purple-200 hover:underline"
                  >
                    Open GitHub
                  </a>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
