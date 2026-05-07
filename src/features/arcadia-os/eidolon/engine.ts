/**
 * EIDOLON — lightweight rule reaction layer over ARCADIA state.
 *
 * This is NOT "conscious AI"; it is a transparent policy surface you can evolve into richer
 * agents later. Outputs are deterministic strings you can inspect, log, unit test.
 */

import type { ArcadiaOsStateShape, LogRecord } from "../types";

/** Summarise NEO feed buckets for heuristic checks. */
function neoStats(buckets: Record<string, unknown[]>) {
  let hazardous = 0;
  let count = 0;
  let minKm: number | null = null;

  for (const list of Object.values(buckets)) {
    if (!Array.isArray(list)) continue;
    for (const neo of list) {
      if (!neo || typeof neo !== "object") continue;
      const n = neo as Record<string, unknown>;
      count += 1;
      if (n.is_potentially_hazardous_asteroid === true) hazardous += 1;
      const approaches = n.close_approach_data as unknown[] | undefined;
      const first = Array.isArray(approaches) ? approaches[0] : undefined;
      const md =
        first && typeof first === "object" && first !== null
          ? (first as Record<string, Record<string, string>>).miss_distance
          : undefined;
      const km = md?.kilometers ? parseFloat(md.kilometers) : NaN;
      if (!Number.isNaN(km)) {
        minKm = minKm === null ? km : Math.min(minKm, km);
      }
    }
  }

  return { hazardous, count, minKm };
}

/** Given new state snapshot + recent action hint, propose log lines / UI insight copy. */
export function evaluateEidolon(
  state: ArcadiaOsStateShape,
  lastActionHint: string,
): { insights: LogRecord[]; banner: string } {
  const lines: LogRecord[] = [];

  let banner = "";

  const memRatio = state.system_metrics_cache.memory_used_ratio;
  if (memRatio != null && memRatio > 0.9) {
    lines.push({
      ts: Date.now(),
      level: "AGENT",
      scope: "LOAD",
      message:
        "Host memory pressure high — consider closing background workloads or widening cache TTL (operational heuristic, not a diagnosis).",
    });
    banner = "EIDOLON: memory pressure heuristic tripped.";
  }

  const load = state.system_metrics_cache.load_avg_1m ?? 0;
  if (load > osLoadThreshold(state.system_metrics_cache.cpus ?? 8)) {
    lines.push({
      ts: Date.now(),
      level: "AGENT",
      scope: "LOAD",
      message: `Load average (${load.toFixed(2)}) elevated vs CPU heuristic — throttle polling or widen refresh windows.`,
    });
    banner ||= "EIDOLON: elevated host load heuristic.";
  }

  const neo = state.nasa_cache.neo;
  if (neo?.buckets) {
    const s = neoStats(neo.buckets);
    if (s.hazardous > 0) {
      lines.push({
        ts: Date.now(),
        level: "AGENT",
        scope: "NEO",
        message: `${s.hazardous} potentially hazardous NEO classifications in window — escalation is organisational policy (not autonomy).`,
      });
      banner ||= "EIDOLON: PHA classifications present in feed.";
    }
    if (s.minKm != null && s.minKm < 1_500_000) {
      lines.push({
        ts: Date.now(),
        level: "AGENT",
        scope: "NEO",
        message: `Close approach nominal distance (${(s.minKm / 1000).toFixed(0)} thousand km listed) merits human review.`,
      });
    }
  }

  // Synthetic behaviour when user interacts with Brain tab (teaching breadcrumb).
  if (lastActionHint === "opened_eidolon") {
    lines.push({
      ts: Date.now(),
      level: "AGENT",
      scope: "BRAIN",
      message:
        "Manual inspection requested — continuing passive monitoring loops and structured logging only.",
    });
  }

  return { insights: lines, banner: banner.trim() };
}

/** Very rough heuristic: CPUs * cores as soft ceiling guidance for load averages. */
function osLoadThreshold(cpus: number) {
  return Math.max(2, cpus * 1.75);
}
