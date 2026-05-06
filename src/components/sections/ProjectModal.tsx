"use client";

/**
 * Project detail modal with premium fade + scale transitions.
 * Edit fields in `/data/projects.js` to control modal content.
 */

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { GlowButton } from "@/components/ui/GlowButton";

type ProjectModalProps = {
  project: {
    title: string;
    status: string;
    shortDescription: string;
    description: string;
    image?: string;
    github: string;
    demo?: string;
    stack?: string[];
    focus?: string[];
  } | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

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

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[300] flex items-end justify-center p-4 sm:items-center md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
        >
          <motion.button
            type="button"
            aria-label="Close project"
            className="absolute inset-0 bg-black/72 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative z-[301] max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-purple-400/30 bg-[#0a0713]/95 p-6 shadow-[0_0_44px_rgba(122,0,255,0.26)] md:p-8"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-purple-400/40 hover:text-white"
            >
              ×
            </button>

            <div
              className="h-48 rounded-2xl border border-white/10 bg-cover bg-center"
              style={
                project.image
                  ? {
                      backgroundImage: [
                        "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.08) 85%)",
                        `url('${project.image}')`,
                      ].join(", "),
                    }
                  : {
                      backgroundImage:
                        "radial-gradient(circle_at_20%_20%,rgba(122,0,255,0.4),rgba(0,0,0,0.2)_45%),linear-gradient(140deg,rgba(106,13,173,0.45),rgba(58,80,255,0.25),rgba(0,0,0,0.7))",
                    }
              }
            />

            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-purple-300/80">Project Detail</p>
            <h2 id="project-modal-title" className="mt-2 text-3xl font-medium text-white">
              {project.title}
            </h2>
            <p className="mt-2 text-sm text-purple-200/90">Status: {project.status}</p>
            <div className="mt-4 space-y-4 text-base font-light leading-[1.75] text-zinc-300">
              {project.description.split("\n\n").map((paragraph, paragraphIndex) => (
                <p key={`paragraph-${paragraphIndex}`}>{paragraph.trim()}</p>
              ))}
            </div>

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
                <p className="text-sm font-normal text-white">Current focus</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-light leading-7 text-zinc-300">
                  {project.focus.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <GlowButton
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="from-[#160525]/70 to-[#2a0d3c]/70"
              >
                Open repository
              </GlowButton>
              {project.demo ? (
                project.demo.startsWith("http") ? (
                  <GlowButton href={project.demo} target="_blank" rel="noopener noreferrer">
                    Live demo
                  </GlowButton>
                ) : (
                  <GlowButton href={project.demo}>Live demo</GlowButton>
                )
              ) : null}
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
