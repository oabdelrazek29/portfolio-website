"use client";

/**
 * Fixed minimal nav: smooth-scrolls to section ids (#hero, #about, ...).
 * Add a link here when you add a new section — keep href in sync with section id on the page.
 */

import { motion, useScroll, useMotionTemplate, useTransform } from "framer-motion";
import { useCallback } from "react";
import { BubbleTitle } from "@/components/ui/BubbleTitle";
import { siteConfig } from "@/data/portfolio";

const links = [
  { label: "About", href: "#about" },
  { label: "Future", href: "#future" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 120], [0.35, 0.72]);
  const backdrop = useMotionTemplate`rgba(0,0,0,${navBg})`;

  const onNavigate = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.08]"
      style={{ backgroundColor: backdrop }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 backdrop-blur-xl md:px-8">
        <a
          href="#hero"
          onClick={(e) => onNavigate(e, "#hero")}
          className="shrink-0 text-left transition hover:opacity-95"
        >
          <BubbleTitle variant="nav" phase={0.15}>
            {siteConfig.name}
          </BubbleTitle>
        </a>

        <nav
          className="flex max-w-[65vw] items-center gap-4 overflow-x-auto pb-0.5 text-sm sm:max-w-none sm:gap-8 md:text-[0.9375rem]"
          aria-label="Primary"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => onNavigate(e, l.href)}
              className="shrink-0 text-zinc-300 transition hover:text-purple-100"
            >
              {l.label}
            </a>
          ))}
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-purple-300/90 transition hover:text-purple-100"
          >
            GitHub
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
