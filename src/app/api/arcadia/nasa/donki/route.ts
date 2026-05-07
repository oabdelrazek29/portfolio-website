import { NextResponse } from "next/server";

import { NASA_KEY, NASA_TTL_MS, readThroughCache, type CacheEnvelope } from "../../_shared";

export const runtime = "nodejs";

/**
 * Geomagnetic storms (GST) via NASA DONKI — weekly window JSON array.
 */

let donkiGstCache: CacheEnvelope<{ gst: Record<string, unknown>[] }> | null = null;

function isoUtcDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export async function GET() {
  try {
    const result = await readThroughCache(donkiGstCache, NASA_TTL_MS, async () => {
      const key = NASA_KEY();
      const end = new Date();
      const start = new Date(end.getTime() - 7 * 86400000);
      const url = [
        "https://api.nasa.gov/DONKI/GST?",
        `startDate=${isoUtcDate(start)}&endDate=${isoUtcDate(end)}`,
        `&api_key=${encodeURIComponent(key)}`,
      ].join("");
      const upstream = await fetch(url, { next: { revalidate: 900 } });
      if (!upstream.ok) {
        throw new Error(`DONKI GST upstream ${upstream.status}`);
      }
      const body = (await upstream.json()) as unknown;
      const gst = Array.isArray(body) ? (body as Record<string, unknown>[]) : [];
      return { gst };
    });

    donkiGstCache = { atMs: result.fetchedAtMs, payload: result.data };

    return NextResponse.json({
      gst: result.data.gst,
      cache: { hit: result.cached, fetched_at_ms: result.fetchedAtMs, ttl_hint_ms: NASA_TTL_MS },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
