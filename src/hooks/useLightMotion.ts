"use client";

/**
 * True on small viewports or when the user asked the OS to reduce motion.
 * Use this to skip expensive CSS filters (blur) and heavy parallax on phones.
 */

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function useLightMotion(): boolean {
  const prefersReduced = useReducedMotion() ?? false;
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setIsNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return prefersReduced || isNarrow;
}
