/**
 * Canonical shape for ARCADIA OS frontend state ("single source of truth").
 *
 * Centralised state prevents contradictory UI: dashboards read one object graph instead of a
 * dozen `useState` islands that silently disagree after async races.
 */

export type SystemStatusOnline = "ONLINE" | "DEGRADED" | "OFFLINE";

/** SPA view keys — swapped without Next.js navigation (stable mount). */
export type ArcadiaView =
  | "dashboard"
  | "nasa"
  | "science"
  | "simulations"
  | "system"
  | "logs"
  | "eidolon"
  | "learning";

export type LogLevel =
  | "EVENT"
  | "STATE"
  | "SYSTEM"
  | "AGENT"
  | "UI"
  | "WARN"
  | "ERROR"
  | "SPACE"
  | "SCIENCE"
  | "SIM";

export type LogRecord = {
  ts: number;
  level: LogLevel;
  scope: string;
  message: string;
};

export type NASAApodCached = {
  title?: string;
  url?: string;
  thumbnail_url?: string;
  explanation?: string;
  date?: string;
  media_type?: string;
};

export type NASAFeedSnapshot = {
  element_count?: number;
  buckets: Record<string, unknown[]>;
  cache?: { hit?: boolean; fetched_at_ms?: number };
};

export type MarsPhotoThumb = Record<string, unknown>;

export type DonkiGstSnapshot = {
  events: Record<string, unknown>[];
  cache?: { hit?: boolean; fetched_at_ms?: number };
};

export type NasaCaches = {
  apod?: NASAApodCached | null;
  neo?: NASAFeedSnapshot | null;
  marsPhotos?: MarsPhotoThumb[];
  donkiGst?: DonkiGstSnapshot | null;
  last_error?: string;
  last_bundle_at_ms?: number;
};

export type SystemMetricsCached = {
  fetched_at_ms?: number;
  uptime_s?: number;
  load_avg_1m?: number;
  memory_used_ratio?: number;
  heap_used_mb?: number;
  rss_mb?: number;
  platform?: string;
  cpus?: number;
};

export type ArcadiaOsStateShape = {
  system_status: SystemStatusOnline;
  active_module: ArcadiaView;
  last_action: string;
  session_id: string;
  nasa_cache: NasaCaches;
  system_metrics_cache: SystemMetricsCached;
  logs: LogRecord[];
  learning_mode: boolean;
  ui: {
    nasaRefreshing: boolean;
    diagRefreshing: boolean;
    eidolon_insight: string;
  };
};
