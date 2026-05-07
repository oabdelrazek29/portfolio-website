/**
 * Client-side mirrors of ARCADIA `arcadia.space.science.neo_interpret` (browser-safe).
 */

const EM_KM = 384_400;

export function summarizeNeoBuckets(buckets: Record<string, unknown[]>): string[] {
  const lines: string[] = [];
  let total = 0;
  let pha = 0;
  let closestKm: number | null = null;
  let closestName = "";
  let relVAtClosest: number | null = null;

  for (const list of Object.values(buckets)) {
    if (!Array.isArray(list)) continue;
    for (const neo of list) {
      if (!neo || typeof neo !== "object") continue;
      const n = neo as Record<string, unknown>;
      total += 1;
      if (n.is_potentially_hazardous_asteroid === true) pha += 1;

      const cas = n.close_approach_data as unknown[] | undefined;
      if (!Array.isArray(cas) || !cas[0] || typeof cas[0] !== "object") continue;
      const first = cas[0] as Record<string, unknown>;

      let km: number | null = null;
      const md = first.miss_distance as Record<string, string> | undefined;
      if (md?.kilometers) {
        km = Number.parseFloat(md.kilometers);
        if (!Number.isFinite(km)) km = null;
      }

      let rel: number | null = null;
      const rv = first.relative_velocity as Record<string, string> | undefined;
      if (rv?.kilometers_per_second) {
        rel = Number.parseFloat(rv.kilometers_per_second);
        if (!Number.isFinite(rel)) rel = null;
      }

      const name = String(n.name ?? "unknown");
      if (km !== null && (closestKm === null || km < closestKm)) {
        closestKm = km;
        closestName = name;
        relVAtClosest = rel;
      }
    }
  }

  lines.push(`Listed objects (feed window aggregation): ${total}`);
  lines.push(`PHA classification count (NASA tagging, not sensationalism): ${pha}`);

  if (closestKm !== null) {
    const frac = closestKm / EM_KM;
    lines.push(`Closest catalogue approach in this snapshot: "${closestName}" ≈ ${closestKm.toLocaleString()} km (~${frac.toFixed(3)} × mean Earth–Moon distance)`);
    if (relVAtClosest !== null) {
      lines.push(`Catalog relative speed at listed encounter: ~${relVAtClosest.toFixed(2)} km/s`);
    }
  }

  lines.push(
    `"Potentially Hazardous Asteroid" is a monitoring priority taxonomy based on orbital parameters and size proxies — refine risk with orbital uncertainty propagation, not vibes.`,
  );

  return lines;
}
