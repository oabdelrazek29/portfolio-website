"use client";

/**
 * Full-screen detail view for a project. Data comes from the clicked card.
 * Close: overlay click, Escape, or the × button.
 */

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { BubbleTitle } from "@/components/ui/BubbleTitle";
import type { Project } from "@/data/portfolio";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.button
            type="button"
            aria-label="Close project"
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="glass-panel relative z-[101] max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-purple-500/25 p-6 shadow-aura md:p-10"
            initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(12px)" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-purple-400/40 hover:text-white"
            >
              ×
            </button>

            <div className="relative mt-2 aspect-video w-full overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 48rem"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <h2 id="project-modal-title" className="mt-8 text-white">
              <BubbleTitle variant="projectModal" phase={0.25}>
                {project.title}
              </BubbleTitle>
            </h2>
            <p className="mt-2 text-purple-300/90">{project.tagline}</p>
            <p className="mt-6 leading-relaxed text-zinc-400">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1 text-xs text-purple-200/90"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-purple-400/45 bg-purple-500/15 px-6 py-2.5 text-sm text-white shadow-aura-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Live demo
                </motion.a>
              )}
              {project.repoUrl && (
                <motion.a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-6 py-2.5 text-sm text-zinc-300 transition hover:border-purple-400/35 hover:text-white"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Source
                </motion.a>
              )}
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
