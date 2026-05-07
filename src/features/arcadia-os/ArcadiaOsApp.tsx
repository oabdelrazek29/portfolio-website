"use client";

import { ArcadiaOsProvider } from "./state/ArcadiaOsProvider";
import { ArcadiaOsShell } from "./ArcadiaOsShell";

/** Root client chunk for `/arcadia-os` — mounts global store + SPA shell together. */

export function ArcadiaOsApp() {
  return (
    <ArcadiaOsProvider>
      <ArcadiaOsShell />
    </ArcadiaOsProvider>
  );
}
