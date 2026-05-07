import { NextResponse } from "next/server";
import os from "node:os";

export const runtime = "nodejs";

/**
 * Host diagnostics snapshot (no `psutil` — Node builtins only so deploy works on Vercel).
 *
 * Why this lives on the API layer: you never expose raw process stats to browsers without
 * a gate; dashboards poll a JSON endpoint instead of shelling `top`.
 */
export async function GET() {
  try {
    const mem = process.memoryUsage();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedRatio = totalMem > 0 ? (totalMem - freeMem) / totalMem : 0;

    return NextResponse.json({
      fetched_at_ms: Date.now(),
      uptime_s: os.uptime(),
      hostname: os.hostname(),
      platform: os.platform(),
      arch: os.arch(),
      cpus: os.cpus().length,
      load_avg_1m: os.loadavg()[0],
      memory: {
        total_mb: totalMem / 1024 / 1024,
        free_mb: freeMem / 1024 / 1024,
        used_ratio: usedRatio,
        heap_used_mb: mem.heapUsed / 1024 / 1024,
        heap_total_mb: mem.heapTotal / 1024 / 1024,
        rss_mb: mem.rss / 1024 / 1024,
      },
      process: {
        node_version: process.version,
        pid: process.pid,
        cpu_usage_user_us: process.cpuUsage().user,
        cpu_usage_sys_us: process.cpuUsage().system,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
