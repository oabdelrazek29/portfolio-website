/**
 * Minimal footer — no logo mark or framework credit (per request).
 */

import { siteConfig } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-zinc-400 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex gap-6">
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-purple-200"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-purple-200"
          >
            LinkedIn
          </a>
          <a href={`mailto:${siteConfig.email}`} className="transition hover:text-purple-200">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
