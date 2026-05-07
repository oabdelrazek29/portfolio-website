import { NextResponse } from "next/server";

import { NASA_KEY, NASA_TTL_MS, readThroughCache, type CacheEnvelope } from "../../_shared";

export const runtime = "nodejs";

/** In-memory TTL cache for APOD responses (warm lambda / single instance reuse). */
let apodCache: CacheEnvelope<{ apod: Record<string, unknown> }> | null = null;

export async function GET() {
  try {
    const result = await readThroughCache(apodCache, NASA_TTL_MS, async () => {
      const key = NASA_KEY();
      const upstream = await fetch(
        `https://api.nasa.gov/planetary/apod?thumbs=true&api_key=${encodeURIComponent(key)}`,
        { next: { revalidate: 600 } },
      );
      if (!upstream.ok) {
        throw new Error(`APOD upstream ${upstream.status}`);
      }
      const apod = await upstream.json();
      return { apod };
    });
    apodCache = { atMs: result.fetchedAtMs, payload: result.data };

    return NextResponse.json({
      ...result.data,
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
