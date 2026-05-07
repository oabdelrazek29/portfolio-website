import type { Metadata } from "next";

import { ArcadiaOsApp } from "@/features/arcadia-os/ArcadiaOsApp";

export const metadata: Metadata = {
  title: "ARCADIA OS | Omar Abdelrazek",
  description:
    "Live ARCADIA operating dashboard preview with NASA aggregates, diagnostics, EIDOLON heuristics, and embedded teaching overlays.",
};

/**
 * SPA-style route: no secondary layout file so we inherit RootLayout cleanly.
 *
 * Rendering `ArcadiaOsApp` ensures context + visuals mount together exactly once — avoiding hydration
 * split-brain bugs where SSR shell differs from hydrated client subtree.
 */

export default function ArcadiaOsPage() {
  return <ArcadiaOsApp />;
}
