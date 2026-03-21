"use client";

/**
 * Deep charcoal base + layered purple/indigo glow — smooth, rich blend.
 */

import { motion } from "framer-motion";

const BG = "#0a0910";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ backgroundColor: BG }} aria-hidden>
      <div className="absolute inset-0 bg-velvet-mesh opacity-[0.92]" />

      <div
        className="animate-smoke absolute -left-[25%] top-[5%] h-[70vmin] w-[90vmin] rounded-[45%] bg-gradient-to-br from-zinc-500/10 via-purple-600/14 to-transparent blur-[92px]"
        style={{ animationDelay: "-8s" }}
      />
      <div className="animate-smoke-slow absolute -right-[20%] top-[35%] h-[60vmin] w-[75vmin] rounded-[50%] bg-gradient-to-bl from-violet-500/14 via-indigo-700/12 to-transparent blur-[100px]" />
      <div
        className="animate-smoke-drift absolute bottom-[-15%] left-[10%] h-[55vmin] w-[85vmin] rounded-[48%] bg-gradient-to-t from-violet-800/16 via-transparent to-transparent blur-[110px] opacity-[0.75]"
        style={{ animationDelay: "-20s" }}
      />
      <div className="animate-purple-ribbon absolute left-[5%] top-[60%] h-[40vmin] w-[55vmin] rounded-full bg-purple-500/18 blur-[74px]" />
      <div
        className="animate-purple-ribbon-2 absolute right-[8%] top-[15%] h-[35vmin] w-[45vmin] rounded-full bg-indigo-400/14 blur-[70px]"
        style={{ animationDelay: "-30s" }}
      />

      <motion.div
        className="absolute -left-[20%] top-[10%] h-[55vmin] w-[55vmin] rounded-full bg-gradient-to-br from-purple-500/22 via-violet-600/14 to-transparent blur-[100px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.42, 0.68, 0.42] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-15%] top-[25%] h-[45vmin] w-[45vmin] rounded-full bg-gradient-to-bl from-indigo-500/18 via-purple-600/12 to-transparent blur-[92px]"
        animate={{ scale: [1.08, 1, 1.08], x: [0, -18, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[25%] h-[50vmin] w-[50vmin] rounded-full bg-gradient-to-t from-violet-600/18 via-fuchsia-500/10 to-transparent blur-[112px]"
        animate={{ y: [0, -28, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10, 9, 16, 0.75) 0%, transparent 42%, rgba(10, 9, 16, 0.97) 100%)",
        }}
      />
    </div>
  );
}
