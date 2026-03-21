"use client";

/**
 * Primary CTA: purple aura, hover scale, click ripple.
 * Pass `href` for anchor CTAs, or use as `button` with `onClick`.
 */

import { motion, type HTMLMotionProps } from "framer-motion";
import { useState, type ReactNode } from "react";

type GlowButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  /** Defaults to `button`; use `submit` inside forms. */
  type?: "button" | "submit" | "reset";
} & Omit<HTMLMotionProps<"button">, "children" | "type">;

export function GlowButton({
  children,
  href,
  className = "",
  type = "button",
  onClick,
  ...rest
}: GlowButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const triggerRipple = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((prev) => [
      ...prev,
      { x: e.clientX - rect.left, y: e.clientY - rect.top, id },
    ]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  };

  const sharedClass =
    "ripple-wrap relative inline-flex items-center justify-center overflow-hidden rounded-full " +
    "border border-purple-300/45 bg-gradient-to-r from-purple-500/30 via-violet-500/25 to-indigo-500/28 " +
    "px-8 py-3 text-sm font-medium text-white shadow-aura transition-shadow " +
    "hover:border-purple-200/50 hover:shadow-[0_0_40px_rgba(192,132,252,0.38)] " +
    className;

  const ripplesLayer = (
    <>
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/30 mix-blend-overlay"
          style={{ left: r.x, top: r.y, width: 10, height: 10, x: "-50%", y: "-50%" }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 32, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
      <span className="relative z-[1]">{children}</span>
    </>
  );

  const hover3d = {
    scale: 1.05,
    y: -3,
    rotateX: -4,
    boxShadow: "0 0 36px rgba(192,132,252,0.4), 0 16px 36px rgba(0,0,0,0.28)",
    transition: { type: "spring" as const, stiffness: 400, damping: 24 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={sharedClass}
        style={{ transformPerspective: 640 }}
        whileHover={hover3d}
        whileTap={{ scale: 0.97 }}
        onClick={triggerRipple}
      >
        {ripplesLayer}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={sharedClass}
      style={{ transformPerspective: 640 }}
      whileHover={hover3d}
      whileTap={{ scale: 0.97 }}
      onClick={(e) => {
        triggerRipple(e);
        onClick?.(e);
      }}
      {...rest}
    >
      {ripplesLayer}
    </motion.button>
  );
}
