"use client";

/**
 * Global animated background system.
 * Reusable across all sections to keep the whole page alive with subtle motion.
 */

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black" aria-hidden>
      {isDesktop ? (
        <>
          {/* Desktop: static layered gradients for max smoothness */}
          <div className="absolute -left-[14%] -top-[8%] h-[54vmax] w-[54vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(122,0,255,0.25),rgba(106,13,173,0.14),transparent_72%)] blur-[120px]" />
          <div className="absolute right-[-16%] top-[20%] h-[48vmax] w-[48vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(106,13,173,0.24),rgba(58,80,255,0.14),transparent_72%)] blur-[130px]" />
        </>
      ) : (
        <>
          {/* Mobile/tablet: keep motion where GPU load is lower for this layout */}
          <motion.div
            className="absolute -left-[14%] -top-[8%] h-[54vmax] w-[54vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(122,0,255,0.25),rgba(106,13,173,0.14),transparent_72%)] blur-[120px]"
            animate={{ x: [0, 28, 0], y: [0, 16, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 28, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute right-[-16%] top-[20%] h-[48vmax] w-[48vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(106,13,173,0.24),rgba(58,80,255,0.14),transparent_72%)] blur-[130px]"
            animate={{ x: [0, -24, 0], y: [0, -14, 0], scale: [1.03, 0.98, 1.03] }}
            transition={{ duration: 32, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          />
        </>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72),rgba(0,0,0,0.38)_40%,rgba(0,0,0,0.94))]" />
    </div>
  );
}
