"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/portfolio";

/**
 * Global footer: navigation + repos tab link (not bare profile landing).
 */
export function SiteFooter() {
  const reposUrl =
    typeof siteConfig.githubUrl === "string" && siteConfig.githubUrl.includes("github.com")
      ? siteConfig.githubUrl
      : "https://github.com/oabdelrazek29?tab=repositories";

  return (
    <footer className="relative z-10 border-t border-white/[0.08] px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <p className="text-sm text-zinc-300">
            Omar Abdelrazek <span className="text-zinc-500">/ Building intelligent systems</span>
          </p>
          <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
            Available for selected collaborations
          </span>
        </motion.div>

        <div className="flex flex-wrap items-center gap-5 text-sm text-zinc-400">
          <Link href="/#projects" className="transition hover:text-purple-200">
            Projects
          </Link>
          <Link href="/resume" className="transition hover:text-purple-200">
            Resume
          </Link>
          <Link href="/history" className="transition hover:text-purple-200">
            History
          </Link>
          <Link href="/working-on" className="transition hover:text-purple-200">
            Working On
          </Link>
          <Link href="/arcadia-demo" className="transition hover:text-purple-200">
            Arcadia preview
          </Link>
          <a
            href={reposUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-purple-200"
          >
            GitHub
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="transition hover:text-purple-200"
          >
            Email
          </a>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Omar Abdelrazek</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="transition hover:text-purple-200"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
