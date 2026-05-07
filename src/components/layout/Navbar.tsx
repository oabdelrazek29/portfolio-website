"use client";

/**
 * Sticky navigation with a transparent-to-dark transition on scroll.
 * Keep link hrefs synced with section ids in the page.
 */

import { AnimatePresence, motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Resume", href: "/#resume" },
  { label: "History", href: "/#history" },
  { label: "Working On", href: "/#working-on" },
  { label: "Notes", href: "/#notes" },
  { label: "Lab", href: "/#lab" },
  { label: "Arcadia preview", href: "/arcadia-demo" },
  { label: "ARCADIA OS", href: "/arcadia-os" },
  { label: "Contact", href: "/#contact" },
];

function navLinkActive(pathname: string | null, activeSection: string, href: string) {
  const p = pathname ?? "";
  if (href.startsWith("/#")) return p === "/" && href === `/#${activeSection}`;
  return p === href;
}

export function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [sectionProgress, setSectionProgress] = useState(0);
  const navBg = useTransform(scrollY, [0, 180], [0.2, 0.88]);
  const backdrop = useMotionTemplate`rgba(0,0,0,${navBg})`;
  const topButtonOpacity = useTransform(scrollY, [120, 520], [0, 1]);
  const topButtonY = useTransform(scrollY, [120, 520], [14, 0]);
  const sectionIds = useMemo(
    () => links.map((link) => link.href.replace("/#", "")).filter((id) => id.length > 0),
    [],
  );

  const onNavigate = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isLocalHash = href.startsWith("#");
    const isHomeHash = href.startsWith("/#") && window.location.pathname === "/";
    if (isLocalHash || isHomeHash) {
      e.preventDefault();
      const hash = href.startsWith("/#") ? href.replace("/", "") : href;
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const getActiveSection = () => {
      let current = sectionIds[0] ?? "home";
      let bestDistance = Number.POSITIVE_INFINITY;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const targetLine = window.innerHeight * 0.35;
        const distance = Math.abs(rect.top - targetLine);
        if (rect.top <= window.innerHeight * 0.55 && distance < bestDistance) {
          bestDistance = distance;
          current = id;
        }
      });

      setActiveSection(current);

      const activeIndex = Math.max(0, sectionIds.indexOf(current));
      const activeEl = document.getElementById(current);
      let withinSection = 0;

      if (activeEl) {
        const rect = activeEl.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const startOffset = viewportHeight * 0.35;
        const traversed = startOffset - rect.top;
        const sectionTravel = Math.max(1, rect.height + viewportHeight * 0.25);
        withinSection = Math.min(1, Math.max(0, traversed / sectionTravel));
      }

      const totalSections = Math.max(1, sectionIds.length);
      const progress = Math.min(1, (activeIndex + withinSection) / totalSections);
      setSectionProgress(progress);
    };

    getActiveSection();
    window.addEventListener("scroll", getActiveSection, { passive: true });
    window.addEventListener("resize", getActiveSection);

    return () => {
      window.removeEventListener("scroll", getActiveSection);
      window.removeEventListener("resize", getActiveSection);
    };
  }, [pathname, sectionIds]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 shadow-[0_0_12px_rgba(122,0,255,0.55)]"
        style={{ scaleX: sectionProgress }}
      />
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.08] backdrop-blur-md md:backdrop-blur-xl"
        style={{ backgroundColor: backdrop }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link
            href="/#home"
            onClick={(e) => onNavigate(e, "/#home")}
            className="shrink-0 text-sm font-semibold tracking-[0.18em] text-zinc-100 transition hover:text-white"
          >
            OMAR ABDELRAZEK
          </Link>

          <nav
            className="hidden max-w-[70vw] items-center gap-4 overflow-x-auto text-sm md:flex md:max-w-none md:gap-7"
            aria-label="Primary"
          >
            {links.map((l) => (
              <span key={l.href} className="relative">
                <Link
                  href={l.href}
                  onClick={(e) => onNavigate(e, l.href)}
                  className={`relative transition ${
                    navLinkActive(pathname, activeSection, l.href)
                      ? "text-purple-200"
                      : "text-zinc-300 hover:text-purple-200"
                  }`}
                >
                  {l.label}
                </Link>
                {navLinkActive(pathname, activeSection, l.href) ? (
                  <motion.span
                    layoutId="active-nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </span>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-zinc-200 md:hidden"
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="border-t border-white/10 bg-black/85 px-4 pb-4 pt-3 backdrop-blur-md md:hidden"
            >
              <div className="flex flex-wrap gap-2">
                {links.map((l) => {
                  const active = navLinkActive(pathname, activeSection, l.href);
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={(e) => onNavigate(e, l.href)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${
                        active
                          ? "border-purple-300/60 bg-purple-500/20 text-purple-100"
                          : "border-white/15 text-zinc-300"
                      }`}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>

      <motion.button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ opacity: topButtonOpacity, y: topButtonY }}
        className="fixed bottom-6 right-6 z-50 rounded-full border border-purple-400/40 bg-black/70 px-3 py-2 text-xs text-purple-100 shadow-[0_0_20px_rgba(122,0,255,0.28)] backdrop-blur-md transition hover:border-purple-300/60 hover:text-white"
      >
        Top
      </motion.button>
    </>
  );
}
