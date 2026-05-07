/**
 * Consolidated reducer: EVENT → deterministic STATE updates + append-only logs.
 *
 * Event sourcing lite: replay is not implemented yet, but the shape is intentional.
 */

import { evaluateEidolon } from "../eidolon/engine";
import type { ArcadiaOsStateShape, ArcadiaView, LogRecord } from "../types";

export type ArcadiaOsAction =
  | { type: "BOOT"; sessionId: string }
  | { type: "VIEW"; view: ArcadiaView }
  | { type: "TOGGLE_LEARNING" }
  | { type: "LOG_APPEND"; entries: Omit<LogRecord, "ts">[] }
  | { type: "NASA_SUCCESS"; snapshot: Partial<ArcadiaOsStateShape["nasa_cache"]> }
  | { type: "NASA_ERROR"; message: string }
  | { type: "DIAG_SUCCESS"; snapshot: Partial<ArcadiaOsStateShape["system_metrics_cache"]> }
  | { type: "DIAG_ERROR"; message: string }
  | { type: "UI_REFRESH"; slice: keyof ArcadiaOsStateShape["ui"]; value: boolean }
  | { type: "EIDOLON_CLEAR_BANNER" };

const MAX_LOGS = 260;

export function arcadiaReducer(state: ArcadiaOsStateShape, action: ArcadiaOsAction): ArcadiaOsStateShape {
  const pushLogs = (
    incoming: Omit<LogRecord, "ts">[],
    logs: LogRecord[],
  ): LogRecord[] =>
    [...logs, ...incoming.map((entry) => ({ ...entry, ts: Date.now() }))].slice(-MAX_LOGS);

  switch (action.type) {
    case "BOOT":
      return {
        ...state,
        session_id: action.sessionId,
        logs: pushLogs(
          [
            {
              level: "STATE",
              scope: "BOOT",
              message: `ARCADIA Space Observation session anchored — id=${action.sessionId}`,
            },
          ],
          state.logs,
        ),
      };
    case "VIEW": {
      const nextLogs = pushLogs(
        [
          {
            level: "EVENT",
            scope: "NAV",
            message: `user opened ${action.view}`,
          },
        ],
        state.logs,
      );
      let next: ArcadiaOsStateShape = {
        ...state,
        active_module: action.view,
        last_action: `view:${action.view}`,
        logs: nextLogs,
      };
      if (action.view === "eidolon") {
        next = {
          ...next,
          logs: pushLogs(
            [
              {
                level: "UI",
                scope: "BRAIN_TAB",
                message: "[UI] Rendering EIDOLON panel without route navigation (SPA view swap).",
              },
            ],
            next.logs,
          ),
          last_action: "opened_eidolon",
        };
        const brain = evaluateEidolon(next, "opened_eidolon");
        next = {
          ...next,
          logs: [...next.logs, ...brain.insights].slice(-MAX_LOGS),
          ui: {
            ...next.ui,
            eidolon_insight: brain.banner || next.ui.eidolon_insight,
          },
        };
      }
      return next;
    }
    case "TOGGLE_LEARNING": {
      const on = !state.learning_mode;
      return {
        ...state,
        learning_mode: on,
        logs: pushLogs(
          [
            {
              level: "EVENT",
              scope: "LEARN",
              message: `[EVENT] Teach mode toggled → ${on ? "ON" : "OFF"} (explainers surface in UI panels).`,
            },
          ],
          state.logs,
        ),
      };
    }
    case "LOG_APPEND":
      return { ...state, logs: pushLogs(action.entries, state.logs) };
    case "NASA_SUCCESS": {
      const mergedNasa = { ...state.nasa_cache, ...action.snapshot };
      let nextState: ArcadiaOsStateShape = {
        ...state,
        nasa_cache: mergedNasa,
        logs: pushLogs(
          [
            {
              level: "STATE",
              scope: "NASA",
              message:
                `[STATE] nasa_cache updated (cached=${mergedNasa.neo?.cache?.hit ?? "?"} feeds). Bundled at=${mergedNasa.last_bundle_at_ms ?? "?"}`,
            },
            {
              level: "SPACE",
              scope: "FEED",
              message: `[SPACE] bundle ingested APOD + NEO + Mars + DONKI gst rows=${mergedNasa.donkiGst?.events?.length ?? "?"}`,
            },
          ],
          state.logs,
        ),
        ui: { ...state.ui, nasaRefreshing: false },
      };

      nextState.system_status = mergedNasa.last_error ? "DEGRADED" : "ONLINE";

      nextState = applyEidolonLayer(nextState, "nasa_bundle");
      return nextState;
    }
    case "NASA_ERROR": {
      let nextState: ArcadiaOsStateShape = {
        ...state,
        ui: { ...state.ui, nasaRefreshing: false },
        nasa_cache: {
          ...state.nasa_cache,
          last_error: action.message,
        },
        logs: pushLogs(
          [{ level: "ERROR", scope: "NASA", message: `[ERROR] NASA fetch failed gracefully: ${action.message}` }],
          state.logs,
        ),
        system_status: "DEGRADED",
      };
      nextState = applyEidolonLayer(nextState, "nasa_error");
      return nextState;
    }
    case "DIAG_SUCCESS":
      return applyEidolonLayer(
        {
          ...state,
          system_metrics_cache: { ...state.system_metrics_cache, ...action.snapshot },
          logs: pushLogs(
            [
              {
                level: "SYSTEM",
                scope: "HOST",
                message: `[SYSTEM] diagnostics snapshot fetched at=${action.snapshot.fetched_at_ms ?? "?"} rss=${action.snapshot.rss_mb?.toFixed?.(2) ?? "?"}MB`,
              },
            ],
            state.logs,
          ),
          ui: { ...state.ui, diagRefreshing: false },
          system_status: "ONLINE",
        },
        "diag_bundle",
      );
    case "DIAG_ERROR":
      return applyEidolonLayer(
        {
          ...state,
          ui: { ...state.ui, diagRefreshing: false },
          logs: pushLogs(
            [{ level: "WARN", scope: "HOST", message: `[WARN] diagnostics failed softly: ${action.message}` }],
            state.logs,
          ),
          system_status: state.system_status === "ONLINE" ? "DEGRADED" : state.system_status,
        },
        "diag_error",
      );
    case "UI_REFRESH":
      return {
        ...state,
        ui: { ...state.ui, [action.slice]: action.value },
      };
    case "EIDOLON_CLEAR_BANNER":
      return { ...state, ui: { ...state.ui, eidolon_insight: "" } };
    default:
      return state;
  }
}

function applyEidolonLayer(state: ArcadiaOsStateShape, hint: string): ArcadiaOsStateShape {
  const synthesis = evaluateEidolon(state, state.last_action);
  let logs = [...state.logs];
  synthesis.insights.forEach((entry) => {
    logs = [...logs, entry].slice(-MAX_LOGS);
  });
  return {
    ...state,
    logs,
    ui: { ...state.ui, eidolon_insight: synthesis.banner || state.ui.eidolon_insight },
    last_action: hint,
  };
}

/** Initial shape — avoid mutating literals per render. */
export function createArcadiaBootState(sessionIdFallback: string): ArcadiaOsStateShape {
  return {
    system_status: "OFFLINE",
    active_module: "dashboard",
    last_action: "init",
    session_id: sessionIdFallback,
    nasa_cache: {},
    system_metrics_cache: {},
    logs: [],
    learning_mode: false,
    ui: { nasaRefreshing: false, diagRefreshing: false, eidolon_insight: "" },
  };
}
