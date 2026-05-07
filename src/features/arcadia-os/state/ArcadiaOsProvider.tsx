"use client";

/**
 * Global provider — React Context as the SPA "singleton state machine".
 *
 * Why Context + reducer instead of Redux/Zustand for now?
 * - Zero new dependencies; pedagogical codebase stays approachable.
 * - Pattern matches how many internal dashboards bootstrap before extracting stores.
 */

import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";

import type { ArcadiaOsStateShape, ArcadiaView } from "../types";
import {
  arcadiaReducer,
  createArcadiaBootState,
  type ArcadiaOsAction,
} from "./reducer";

type ArcadiaCtx = {
  state: ArcadiaOsStateShape;
  dispatch: React.Dispatch<ArcadiaOsAction>;
  navigate: (view: ArcadiaView) => void;
  toggleLearning: () => void;
  refreshNasa: () => Promise<void>;
  refreshDiagnostics: () => Promise<void>;
};

const Ctx = createContext<ArcadiaCtx | undefined>(undefined);

function useSessionBootstrapId() {
  return useMemo(() => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
    return `SID-${Math.random().toString(16).slice(2)}`;
  }, []);
}

export function ArcadiaOsProvider({ children }: { children: React.ReactNode }) {
  const sid = useSessionBootstrapId();
  const [state, dispatch] = useReducer(arcadiaReducer, sid, createArcadiaBootState);

  useEffect(() => {
    dispatch({ type: "BOOT", sessionId: sid });
  }, [sid]);

  const navigate = useCallback((view: ArcadiaView) => dispatch({ type: "VIEW", view }), []);
  const toggleLearning = useCallback(() => dispatch({ type: "TOGGLE_LEARNING" }), []);

  const refreshDiagnostics = useCallback(async () => {
    dispatch({ type: "UI_REFRESH", slice: "diagRefreshing", value: true });
    try {
      const res = await fetch("/api/arcadia/diagnostics");
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error ?? res.statusText);
      dispatch({
        type: "DIAG_SUCCESS",
        snapshot: {
          fetched_at_ms: body.fetched_at_ms,
          uptime_s: body.uptime_s,
          load_avg_1m: body.load_avg_1m,
          memory_used_ratio: body.memory?.used_ratio,
          heap_used_mb: body.memory?.heap_used_mb,
          rss_mb: body.memory?.rss_mb,
          platform: body.platform,
          cpus: body.cpus,
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      dispatch({ type: "DIAG_ERROR", message });
    }
  }, []);

  const refreshNasa = useCallback(async () => {
    dispatch({ type: "UI_REFRESH", slice: "nasaRefreshing", value: true });
    try {
      const [apodRes, neoRes, marsRes] = await Promise.all([
        fetch("/api/arcadia/nasa/apod"),
        fetch("/api/arcadia/nasa/neo"),
        fetch("/api/arcadia/nasa/mars"),
      ]);
      const apodBody = await apodRes.json();
      const neoBody = await neoRes.json();
      const marsBody = await marsRes.json();
      const parts: string[] = [];
      if (!apodRes.ok || apodBody.error) parts.push(`APOD:${apodBody.error ?? apodRes.status}`);
      if (!neoRes.ok || neoBody.error) parts.push(`NEO:${neoBody.error ?? neoRes.status}`);
      if (!marsRes.ok || marsBody.error) parts.push(`MARS:${marsBody.error ?? marsRes.status}`);
      if (parts.length === 3) {
        dispatch({ type: "NASA_ERROR", message: parts.join(" · ") });
        return;
      }
      dispatch({
        type: "NASA_SUCCESS",
        snapshot: {
          apod: (apodBody.apod ?? null) as ArcadiaOsStateShape["nasa_cache"]["apod"],
          neo: neoRes.ok && !neoBody.error
            ? {
                element_count: neoBody.element_count,
                buckets: neoBody.buckets ?? {},
                cache: neoBody.cache,
              }
            : undefined,
          marsPhotos:
            marsRes.ok && !marsBody.error && Array.isArray(marsBody.photos) ? marsBody.photos : undefined,
          last_bundle_at_ms: Date.now(),
          ...(parts.length ? { last_error: parts.join(" · ") } : { last_error: undefined }),
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      dispatch({ type: "NASA_ERROR", message });
    }
  }, []);

  /** Initial hydrate + disciplined polling intervals (respect API TTL). */
  useEffect(() => {
    void refreshDiagnostics();
    void refreshNasa();
    const diagId = window.setInterval(() => {
      void refreshDiagnostics();
    }, 12_000);
    const nasaId = window.setInterval(() => {
      void refreshNasa();
    }, 240_000);
    return () => {
      window.clearInterval(diagId);
      window.clearInterval(nasaId);
    };
  }, [refreshDiagnostics, refreshNasa]);

  const value = useMemo<ArcadiaCtx>(
    () => ({ state, dispatch, navigate, toggleLearning, refreshNasa, refreshDiagnostics }),
    [state, dispatch, navigate, toggleLearning, refreshNasa, refreshDiagnostics],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useArcadiaOs(): ArcadiaCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useArcadiaOs must render under ArcadiaOsProvider");
  return v;
}
