"use client";

/**
 * Project detail modal with premium fade + scale transitions.
 * Edit fields in `/data/projects.js` to control modal content.
 */

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { GlowButton } from "@/components/ui/GlowButton";

type ProjectModalProps = {
  project: {
    title: string;
    status: string;
    shortDescription: string;
    description: string;
    github: string;
    demo: string;
    stack?: string[];
    focus?: string[];
  } | null;
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
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.button
            type="button"
            aria-label="Close project"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.article
            layoutId={`project-card-${project.title}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative z-[101] w-full max-w-2xl rounded-3xl border border-purple-400/30 bg-[#0a0713]/95 p-6 shadow-[0_0_44px_rgba(122,0,255,0.26)] md:p-8"
            initial={{ opacity: 0, y: 28, scale: 0.94, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 16, scale: 0.96, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-purple-400/40 hover:text-white"
            >
              ×
            </button>

            <div className="h-48 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(122,0,255,0.4),rgba(0,0,0,0.2)_45%),linear-gradient(140deg,rgba(106,13,173,0.45),rgba(58,80,255,0.25),rgba(0,0,0,0.7))]" />

            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-purple-300/80">Project Detail</p>
            <h2 id="project-modal-title" className="mt-2 text-3xl font-medium text-white">
              {project.title}
            </h2>
            <p className="mt-2 text-sm text-purple-200/90">Status: {project.status}</p>
            <p className="mt-4 text-base font-light leading-[1.75] text-zinc-300">
              {project.description}
            </p>

            {project.stack?.length ? (
              <div className="mt-6">
                <p className="text-sm font-normal text-white">Software Stack</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {project.focus?.length ? (
              <div className="mt-6">
                <p className="text-sm font-normal text-white">Current Focus</p>
                <ul className="mt-3 space-y-2 text-sm font-light leading-7 text-zinc-300">
                  {project.focus.map((line) => (
                    <li key={line}>- {line}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <GlowButton href={project.github} className="from-[#160525]/70 to-[#2a0d3c]/70">
                View GitHub
              </GlowButton>
              <GlowButton href={project.demo}>
                Live Demo
              </GlowButton>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
