/**
 * Calm interpretation of NASA DONKI geomagnetic storm (GST) catalogue rows.
 * Mirrors the tone of ARCADIA `solar_interpret`: operational context, not alarmism.
 */

function parseKpObserved(entry: unknown): number | null {
  if (!entry || typeof entry !== "object") return null;
  const o = entry as Record<string, unknown>;
  const raw = o.observedKp ?? o.kpIndex;
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw === "string") {
    const n = Number.parseFloat(raw);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

export function summarizeGstEvents(events: Record<string, unknown>[]): string[] {
  const lines: string[] = [];
  if (!events.length) {
    lines.push("No GST rows in the cached 7-day window (quiet conditions or upstream empty set).");
    return lines;
  }

  lines.push(`Geomagnetic storm catalogue rows (DONKI GST, 7-day window): ${events.length}`);

  let maxKp: number | null = null;
  for (const ev of events) {
    const idx = ev.allKpIndex;
    if (!Array.isArray(idx)) continue;
    for (const row of idx) {
      const kp = parseKpObserved(row);
      if (kp !== null && (maxKp === null || kp > maxKp)) maxKp = kp;
    }
  }

  if (maxKp !== null) {
    lines.push(
      `Maximum catalogued Kp in this slice: ${maxKp.toFixed(1)} (planetary index; higher values correlate with stronger auroral currents and magnetospheric compression).`,
    );
  }

  lines.push(
    "Stronger storms can induce surface electric fields affecting long conductors (power grids, pipelines) and increase satellite drag via thermosphere heating; comms/GNSS effects depend on latitude and storm phase.",
  );

  return lines;
}
