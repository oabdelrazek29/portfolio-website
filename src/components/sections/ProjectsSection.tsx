"use client";

/**
 * Live GitHub repos when the API returns data (opens repo in a new tab).
 * If the fetch fails or username is unset, falls back to `projects` in portfolio.ts + modal.
 */

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { BubbleTitle } from "@/components/ui/BubbleTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import type { GitHubRepo } from "@/lib/github";
import { projects } from "@/data/portfolio";
import type { Project } from "@/data/portfolio";
import { siteConfig } from "@/data/portfolio";
import { ProjectModal } from "./ProjectModal";

type ProjectsSectionProps = {
  githubRepos: GitHubRepo[];
};

export function ProjectsSection({ githubRepos }: ProjectsSectionProps) {
  const [active, setActive] = useState<Project | null>(null);
  const useGithub = githubRepos.length > 0;

  return (
    <>
      <SectionReveal id="projects" className="relative z-10 px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-400/80">Selected work</p>
          <SectionHeading>Projects</SectionHeading>
          <p className="mt-4 max-w-xl text-zinc-500">
            {useGithub ? (
              <>
                Pulled from your public GitHub — set <code className="text-purple-400/80">githubUsername</code> or
                a real <code className="text-purple-400/80">githubUrl</code> in{" "}
                <code className="text-purple-400/80">portfolio.ts</code>. Each card opens the repository.
              </>
            ) : (
              <>
                Connect GitHub via <code className="text-purple-400/80">portfolio.ts</code> (username / URL). Until
                then, sample projects below — click for detail.
              </>
            )}
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {useGithub
              ? githubRepos.map((repo, i) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ delay: i * 0.06, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformPerspective: 960 }}
                    whileHover={{
                      y: -10,
                      rotateX: 4,
                      rotateY: -3,
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 320, damping: 22 },
                    }}
                    className="group relative block overflow-hidden rounded-[1.75rem] border border-purple-400/28 bg-[#16141f]/90 text-left shadow-[0_0_36px_-18px_rgba(139,92,246,0.35)] transition hover:border-purple-300/45"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden bg-gradient-to-br from-purple-950/90 via-zinc-950 to-indigo-950/80">
                      <div className="absolute inset-0 opacity-40 mix-blend-soft-light">
                        <div className="absolute -left-1/4 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-purple-500/30 to-transparent blur-3xl" />
                        <div className="absolute bottom-0 right-0 h-2/3 w-2/3 rounded-full bg-violet-600/20 blur-3xl" />
                      </div>
                      <div className="relative flex h-full flex-col justify-between p-5">
                        <span className="w-fit rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] uppercase tracking-widest text-purple-200/80">
                          GitHub
                        </span>
                        <div>
                          <p className="font-mono text-xs text-zinc-500">{repo.language ?? "—"}</p>
                          <p className="mt-1 text-xs text-zinc-500">★ {repo.stargazers_count}</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-white/5 p-5">
                      <h3 className="text-white">
                        <BubbleTitle variant="project" phase={i * 0.1}>
                          {repo.name}
                        </BubbleTitle>
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-zinc-500">
                        {repo.description || "No description provided."}
                      </p>
                      {repo.topics?.length ? (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {repo.topics.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="rounded-md border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 text-[10px] text-purple-200/80"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </motion.a>
                ))
              : projects.map((project, i) => (
                  <motion.button
                    key={project.id}
                    type="button"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformPerspective: 960 }}
                    whileHover={{
                      y: -8,
                      rotateX: 3,
                      scale: 1.01,
                      transition: { type: "spring", stiffness: 320, damping: 22 },
                    }}
                    onClick={() => setActive(project)}
                    className="group relative overflow-hidden rounded-[1.75rem] border border-purple-400/28 bg-[#16141f]/90 text-left shadow-[0_0_36px_-18px_rgba(139,92,246,0.35)] transition hover:border-purple-300/45"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <motion.div
                        className="h-full w-full"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Image
                          src={project.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/50 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        initial={false}
                      >
                        <span className="text-xs font-medium uppercase tracking-widest text-purple-300">Open</span>
                        <span className="inline-block">
                          <BubbleTitle variant="project" phase={i * 0.12}>
                            {project.title}
                          </BubbleTitle>
                        </span>
                      </motion.div>
                    </div>
                    <div className="border-t border-white/5 p-5">
                      <h3 className="text-white">
                        <BubbleTitle variant="project" phase={i * 0.12 + 0.05}>
                          {project.title}
                        </BubbleTitle>
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">{project.tagline}</p>
                      {project.repoUrl ? (
                        <p className="mt-2 text-xs text-purple-400/70">
                          Or open{" "}
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline-offset-2 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            repo
                          </a>
                        </p>
                      ) : null}
                    </div>
                  </motion.button>
                ))}
          </div>

          {!useGithub ? (
            <p className="mt-8 text-center text-sm text-zinc-600">
              Profile:{" "}
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400/80 hover:underline"
              >
                {siteConfig.githubUrl}
              </a>
            </p>
          ) : null}
        </div>
      </SectionReveal>

      {!useGithub ? <ProjectModal project={active} onClose={() => setActive(null)} /> : null}
    </>
  );
}
