"use client";

/**
 * Layered gradients behind the site.
 * Phones get smaller blur only static layers so Safari and Chrome stay smooth.
 * Desktop gets larger soft orbs without continuous animation to save GPU budget.
 */

import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [lite, setLite] = useState(true);

  useEffect(() => {
    const mNarrow = window.matchMedia("(max-width: 1023px)");
    const mReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setLite(mNarrow.matches || mReduce.matches);
    sync();
    mNarrow.addEventListener("change", sync);
    mReduce.addEventListener("change", sync);
    return () => {
      mNarrow.removeEventListener("change", sync);
      mReduce.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black" aria-hidden>
      {lite ? (
        <>
          <div className="absolute -left-[12%] -top-[6%] h-[min(70vmin,420px)] w-[min(70vmin,420px)] rounded-full bg-[radial-gradient(circle_at_center,rgba(122,0,255,0.2),rgba(106,13,173,0.12),transparent_70%)] blur-3xl" />
          <div className="absolute -right-[10%] top-[18%] h-[min(65vmin,380px)] w-[min(65vmin,380px)] rounded-full bg-[radial-gradient(circle_at_center,rgba(106,13,173,0.2),rgba(58,80,255,0.12),transparent_70%)] blur-3xl" />
        </>
      ) : (
        <>
          <div className="absolute -left-[14%] -top-[8%] h-[54vmax] w-[54vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(122,0,255,0.25),rgba(106,13,173,0.14),transparent_72%)] blur-[120px]" />
          <div className="absolute right-[-16%] top-[20%] h-[48vmax] w-[48vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(106,13,173,0.24),rgba(58,80,255,0.14),transparent_72%)] blur-[130px]" />
        </>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72),rgba(0,0,0,0.38)_40%,rgba(0,0,0,0.94))]" />
    </div>
  );
}
