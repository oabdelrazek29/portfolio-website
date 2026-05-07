import type { ReactNode } from "react";
import type { ArcadiaOsStateShape } from "./types";

/**
 * Conditional explainer ribbons — Teach Mode overlays copy without rewriting core UI.
 */

export function TeachRibbon({
  state,
  children,
}: {
  state: ArcadiaOsStateShape;
  children: ReactNode;
}) {
  if (!state.learning_mode) return null;
  return (
    <aside className="mb-6 rounded-xl border border-amber-400/35 bg-amber-950/20 p-4 text-sm leading-relaxed text-amber-100/95">
      {children}
    </aside>
  );
}
