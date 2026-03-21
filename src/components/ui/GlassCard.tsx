import type { ReactNode } from "react";

/**
 * Glassmorphism surface — pairs with `.glass-panel` in `src/app/globals.css`.
 * Add padding via className when you use it.
 */

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div className={`glass-panel rounded-[1.75rem] ${className}`}>{children}</div>
  );
}
