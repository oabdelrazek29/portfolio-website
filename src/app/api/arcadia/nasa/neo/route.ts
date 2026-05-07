import { NextResponse } from "next/server";

import { NASA_KEY, NASA_TTL_MS, readThroughCache, type CacheEnvelope } from "../../_shared";

export const runtime = "nodejs";

let neoCache: CacheEnvelope<{ feed: Record<string, unknown>; element_count: number }> | null =
  null;

function isoDateUTC(d: Date) {
  return d.toISOString().slice(0, 10);
}

export async function GET() {
  try {
    const result = await readThroughCache(neoCache, NASA_TTL_MS, async () => {
      const key = NASA_KEY();
      const start = isoDateUTC(new Date());
      const end = isoDateUTC(new Date(Date.now() + 86400000));
      const upstream = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${encodeURIComponent(key)}`,
        { next: { revalidate: 600 } },
      );
      if (!upstream.ok) {
        throw new Error(`NEO upstream ${upstream.status}`);
      }
      const body = await upstream.json();
      return {
        feed: body.near_earth_objects ?? {},
        element_count: body.element_count ?? 0,
      };
    });

    neoCache = { atMs: result.fetchedAtMs, payload: result.data };

    return NextResponse.json({
      element_count: result.data.element_count,
      buckets: result.data.feed,
      cache: {
        hit: result.cached,
        fetched_at_ms: result.fetchedAtMs,
        ttl_hint_ms: NASA_TTL_MS,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
