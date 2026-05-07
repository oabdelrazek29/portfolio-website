"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

type PageTransitionProps = {
  children: React.ReactNode;
};

/**
 * Route-aware motion wrapper WITHOUT AnimatePresence "wait + exit fade".
 *
 * Why the old version caused black flashes
 * -----------------------------------------
 * Combining `AnimatePresence mode="wait"` with `exit={{ opacity: 0 }}` waits for the
 * *entire* outgoing subtree—including your page content—to animate to invisible before
 * the next page mounts. During that gap the viewport can appear empty/black. On slower
 * devices or heavy pages this feels like a "crash".
 *
 * What production dashboards usually do instead
 * ----------------------------------------------
 * Avoid full-route opacity pulses. Keep shell chrome (nav/footer) static; optionally
 * soften content enter only (`initial` modest, no exit-to-zero).
 *
 * SPA note: Next.js keeps one React tree; we only remap `children`. We do NOT rely on full
 * document reload—that would discard client state entirely.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0.97 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className="min-h-[50vh]"
    >
      {children}
    </motion.div>
  );
}
