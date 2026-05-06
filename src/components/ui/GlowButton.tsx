"use client";

/**
 * Shared premium button system.
 * Use this across sections for consistent glow and motion behavior.
 */

import { motion, type HTMLMotionProps } from "framer-motion";
import { type AnchorHTMLAttributes, type ReactNode } from "react";

type GlowButtonProps = {
  children: ReactNode;
  href?: string;
  /** When `href` is set, forwarded to `<a>` (opens other sites safely with `noopener`). */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: string;
  className?: string;
  /** Defaults to `button`; use `submit` inside forms. */
  type?: "button" | "submit" | "reset";
} & Omit<HTMLMotionProps<"button">, "children" | "type">;

export function GlowButton({
  children,
  href,
  target,
  rel,
  className = "",
  type = "button",
  onClick,
  ...rest
}: GlowButtonProps) {
  const sharedClass =
    "inline-flex items-center justify-center rounded-xl border border-purple-400/45 " +
    "bg-gradient-to-r from-[#6a0dad]/70 to-[#7a00ff]/75 px-6 py-3 text-sm font-medium text-white " +
    "shadow-[0_0_24px_rgba(122,0,255,0.28)] transition-all duration-300 " +
    "hover:border-purple-300/60 hover:shadow-[0_0_34px_rgba(122,0,255,0.42)] " +
    className;

  const hoverFx = {
    scale: 1.03,
    y: -2,
    boxShadow: "0 0 38px rgba(122,0,255,0.5)",
    transition: { duration: 0.28, ease: "easeInOut" as const },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={sharedClass}
        whileHover={hoverFx}
        whileTap={{ scale: 0.98 }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(122,0,255,0.26)",
            "0 0 30px rgba(122,0,255,0.36)",
            "0 0 20px rgba(122,0,255,0.26)",
          ],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={sharedClass}
      whileHover={hoverFx}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      animate={{
        boxShadow: [
          "0 0 20px rgba(122,0,255,0.24)",
          "0 0 28px rgba(122,0,255,0.34)",
          "0 0 20px rgba(122,0,255,0.24)",
        ],
      }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
