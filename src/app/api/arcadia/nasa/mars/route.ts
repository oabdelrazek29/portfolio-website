import { NextResponse } from "next/server";

import { NASA_KEY, NASA_TTL_MS, readThroughCache, type CacheEnvelope } from "../../_shared";

export const runtime = "nodejs";

/** Latest Curiosity thumbnails — bounded photo count to keep payloads small. */
let marsCache: CacheEnvelope<{ photos: Record<string, unknown>[] }> | null = null;

export async function GET() {
  try {
    const result = await readThroughCache(marsCache, NASA_TTL_MS, async () => {
      const key = NASA_KEY();
      const upstream = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${encodeURIComponent(key)}`,
        { next: { revalidate: 900 } },
      );
      if (!upstream.ok) {
        throw new Error(`Mars upstream ${upstream.status}`);
      }
      const body = await upstream.json();
      const raw = Array.isArray(body.latest_photos) ? body.latest_photos : [];
      const photos = raw.slice(0, 6);
      return { photos };
    });

    marsCache = { atMs: result.fetchedAtMs, payload: result.data };

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
