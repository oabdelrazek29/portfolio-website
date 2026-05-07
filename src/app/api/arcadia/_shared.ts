/**
 * Shared helpers for ARCADIA API routes — teaching "cache TTL" patterns.
 *
 * Real systems throttle upstream APIs (billing, quotas, stability). Serving stale data
 * for a few seconds is often better than failing the UI on every spike.
 */

export const NASA_KEY = () => process.env.NASA_API_KEY ?? "DEMO_KEY";

/** Default cache window for NASA content (milliseconds). */
export const NASA_TTL_MS = 300_000; // 5 minutes

/** Server-side TTL cache envelope. */
export type CacheEnvelope<T> = { atMs: number; payload: T };

export function readThroughCache<T>(
  cache: CacheEnvelope<T> | null,
  ttlMs: number,
  loader: () => Promise<T>,
): Promise<{ cached: boolean; fetchedAtMs: number; data: T }> {
  const now = Date.now();
  if (cache && now - cache.atMs < ttlMs) {
    return Promise.resolve({ cached: true, fetchedAtMs: cache.atMs, data: cache.payload });
  }
  return loader().then((data) => ({
    cached: false,
    fetchedAtMs: now,
    data,
  }));
}
