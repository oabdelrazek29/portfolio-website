"use client";

/**
 * Global animated background system.
 * Reusable across all sections to keep the whole page alive with subtle motion.
 */

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black" aria-hidden>
      <motion.div
        className="absolute -left-[18%] -top-[10%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(122,0,255,0.28),rgba(106,13,173,0.16),transparent_72%)] blur-[170px]"
        animate={{ x: [0, 60, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-20%] top-[18%] h-[52vmax] w-[52vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(106,13,173,0.26),rgba(58,80,255,0.15),transparent_72%)] blur-[180px]"
        animate={{ x: [0, -50, 0], y: [0, -25, 0], scale: [1.05, 0.96, 1.05] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-30%] left-[15%] h-[56vmax] w-[56vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(58,80,255,0.16),rgba(122,0,255,0.14),transparent_72%)] blur-[190px]"
        animate={{ x: [0, 40, 0], y: [0, -35, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72),rgba(0,0,0,0.38)_40%,rgba(0,0,0,0.94))]" />
    </div>
  );
}
