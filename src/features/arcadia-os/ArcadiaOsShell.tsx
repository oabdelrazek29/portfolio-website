"use client";

/**
 * Full-screen ARCADIA + EIDOLON workspace.
 *
 * **Navigation stability:** sidebar buttons toggle `VIEW` dispatches instead of `<Link>`
 * routes. SPA view swaps reuse this mounted tree — aligning with enterprise dashboards where
 * the outer shell persists while inner panels hydrate data asynchronously.
 */

import { Navbar } from "@/components/layout/Navbar";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { summarizeGstEvents } from "./science/gstInterpret";
import { summarizeNeoBuckets } from "./science/neoInterpret";
import {
  ORBIT_SCENARIO_A_EARTH_MOON,
  ORBIT_SCENARIO_B_LEO,
  ORBIT_SCENARIO_C_FLYBY,
} from "./science/orbitScenarios";
import { TeachRibbon } from "./teach";
import { ArcadiaOsErrorBoundary } from "./ArcadiaOsErrorBoundary";
import { useArcadiaOs } from "./state/ArcadiaOsProvider";
import type { ArcadiaView } from "./types";

const NAV: { key: ArcadiaView; label: string; hint: string }[] = [
  { key: "dashboard", label: "Live snapshot", hint: "Bundle freshness + host slice" },
  { key: "nasa", label: "NASA raw feed", hint: "APOD, NEO window, rover frames, DONKI GST (7d)" },
  { key: "science", label: "Science board", hint: "Calm interpretation of catalogue JSON, not sensationalism" },
  { key: "simulations", label: "Orbit vignettes", hint: "Text-only translunar / LEO / flyby timelines" },
  { key: "system", label: "System telemetry", hint: "Node diagnostics from API route (polling)" },
  { key: "logs", label: "Observation log", hint: `[SPACE]/[SCIENCE]/[SIM]/… tags` },
  { key: "eidolon", label: "Heuristic alerts", hint: "Operational rule reactions (explicitly not personality AI)" },
  { key: "learning", label: "Architecture primer", hint: "How SPA dashboards stay stable vs full reload sites" },
];

function fmt(ms?: number) {
  if (!ms) return "—";
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    month: "short",
    day: "numeric",
  }).format(new Date(ms));
}

export function ArcadiaOsShell() {
  const { state, navigate, toggleLearning, refreshNasa, refreshDiagnostics } = useArcadiaOs();

  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <div className="relative z-10 min-h-[calc(100vh-4rem)] px-4 pb-16 pt-[5.75rem] md:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full shrink-0 space-y-3 lg:w-60">
            <p className="text-xs uppercase tracking-[0.26em] text-purple-300/90">Observation desk</p>
            <nav className="flex flex-row flex-wrap gap-2 lg:flex-col" aria-label="ARCADIA views">
              {NAV.map((item) => {
                const active = state.active_module === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    aria-current={active ? "page" : undefined}
                    onClick={() => navigate(item.key)}
                    className={`rounded-xl px-4 py-2 text-left text-sm transition md:w-full ${
                      active
                        ? "border border-purple-400/60 bg-purple-500/20 text-purple-100"
                        : "border border-white/10 bg-black/35 text-zinc-300 hover:border-purple-400/40"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="hidden rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-zinc-400 lg:block">
              <p className="font-medium text-purple-200/90">Session</p>
              <p className="mt-2 break-all font-mono text-zinc-300">{state.session_id}</p>
              <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
                Sidebar buttons intentionally avoid Next.js routing to keep this shell mounted.
                Same pattern as Grafana / Opsgenie single-page workspaces.
              </p>
              <button
                type="button"
                className={`mt-4 w-full rounded-lg border px-3 py-2 text-xs uppercase tracking-[0.2em] ${
                  state.learning_mode
                    ? "border-amber-300/55 bg-amber-500/20 text-amber-100"
                    : "border-purple-400/35 text-purple-200"
                }`}
                onClick={toggleLearning}
              >
                Teach mode {state.learning_mode ? "on" : "off"}
              </button>
              <button
                type="button"
                className="mt-2 w-full rounded-lg border border-white/15 px-3 py-2 text-xs text-zinc-300 hover:border-purple-400/40"
                onClick={() => {
                  void refreshDiagnostics();
                  void refreshNasa();
                }}
              >
                Manual refresh pulse
              </button>
            </div>
          </aside>

          <main className="min-h-[480px] flex-1 rounded-3xl border border-purple-500/25 bg-black/45 p-5 shadow-inner md:p-8">
            <header className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-purple-300/90">
                  ARCADIA Space Observation System
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <h1 className="font-display text-3xl tracking-tight text-white md:text-4xl">
                    Live space intelligence workspace
                  </h1>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${
                      state.system_status === "ONLINE"
                        ? "border-emerald-400/50 text-emerald-200"
                        : state.system_status === "DEGRADED"
                          ? "border-amber-400/50 text-amber-100"
                          : "border-red-400/55 text-red-200"
                    }`}
                  >
                    {state.system_status}
                  </span>
                </div>
                <p className="mt-2 max-w-3xl text-sm text-zinc-400">
                  Public NASA/DONKI JSON feeds flow through TTL-cached Route Handlers, get interpreted calmly in the
                  Science board, and pair with deterministic text orbit vignettes — educational instrumentation, not
                  fiction.&nbsp; SPA buttons below avoid full navigations so state stays warm while data refreshes on
                  intervals.
                </p>
              </div>
              {state.ui.eidolon_insight ? (
                <div className="rounded-2xl border border-cyan-400/35 bg-cyan-950/30 px-4 py-3 text-sm text-cyan-100 md:max-w-sm">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/85">Heuristic alert</p>
                  <p className="mt-2 leading-relaxed text-cyan-50">{state.ui.eidolon_insight}</p>
                </div>
              ) : null}
            </header>

            <ArcadiaOsErrorBoundary>
              <Panels />
            </ArcadiaOsErrorBoundary>
          </main>
        </div>
      </div>
    </>
  );
}

function Panels() {
  const { state } = useArcadiaOs();
  switch (state.active_module) {
    case "dashboard":
      return <Dashboard />;
    case "nasa":
      return <NasaPanel />;
    case "science":
      return <SciencePanel />;
    case "simulations":
      return <SimulationsPanel />;
    case "system":
      return (
        <div>
          <TeachRibbon state={state}>
            Diagnostics route (`/api/arcadia/diagnostics`) runs on the server where Node builtins are
            available. Browsers poll it on an interval rather than probing `psutil` locally — avoids leaking
            host stats to strangers.
          </TeachRibbon>
          <DiagnosticsPanel />
        </div>
      );
    case "logs":
      return <LogsPanel />;
    case "eidolon":
      return <EidolonPanel />;
    case "learning":
      return <LearningPanel />;
    default:
      return (
        <p className="text-zinc-500">
          Unknown view — programmatic guard should have prevented reaching this fallback.
        </p>
      );
  }
}

function Dashboard() {
  const { state, refreshNasa } = useArcadiaOs();
  const apodThumb = state.nasa_cache.apod?.thumbnail_url || state.nasa_cache.apod?.url;
  return (
    <div className="space-y-6">
      <TeachRibbon state={state}>
        Dashboard is glue: stitched readouts referencing the cached NASA bundle + diagnostics snapshot +
        aggregated logs. Keeping this state in one reducer ensures every panel reads coherent timestamps.
      </TeachRibbon>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-purple-300/90">Dataplane</p>
          <p className="mt-4 text-lg text-white">NASA telemetry bundle</p>
          <dl className="mt-6 space-y-3 text-sm text-zinc-300">
            <div className="flex justify-between gap-4">
              <dt>Bundle age</dt>
              <dd className="text-right">{fmt(state.nasa_cache.last_bundle_at_ms)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>NEO counts</dt>
              <dd className="text-right">{state.nasa_cache.neo?.element_count ?? "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Rover thumbnails</dt>
              <dd className="text-right">{state.nasa_cache.marsPhotos?.length ?? 0}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>DONKI GST rows (7d)</dt>
              <dd className="text-right">{state.nasa_cache.donkiGst?.events?.length ?? "—"}</dd>
            </div>
          </dl>
          <button
            type="button"
            disabled={state.ui.nasaRefreshing}
            className="mt-6 rounded-xl border border-purple-400/40 px-4 py-2 text-xs text-purple-100 disabled:opacity-40"
            onClick={() => void refreshNasa()}
          >
            {state.ui.nasaRefreshing ? "Refreshing…" : "Fetch NASA pulse"}
          </button>
          {state.nasa_cache.last_error ? (
            <p className="mt-4 text-xs text-amber-200/85">Partial error: {state.nasa_cache.last_error}</p>
          ) : null}
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <DiagnosticsPanel condensed />
        </div>
      </div>
      {typeof apodThumb === "string" && apodThumb.length > 0 ? (
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          {/* Remote APOD thumbnails require explicit opt-in */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={apodThumb} alt={state.nasa_cache.apod?.title ?? "APOD"} className="h-64 w-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent p-5 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-100/85">NASA APOD</p>
            <p className="text-lg">{state.nasa_cache.apod?.title ?? "Untitled"}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DiagnosticsPanel({ condensed }: { condensed?: boolean }) {
  const { state, refreshDiagnostics } = useArcadiaOs();
  const metrics = state.system_metrics_cache;

  const body = (
    <>
      <p className="text-xs uppercase tracking-[0.25em] text-purple-300/90">Diagnostics</p>
      <p className="mt-4 text-lg text-white">Host snapshot</p>
      <dl className="mt-6 space-y-3 text-sm text-zinc-300">
        <div className="flex justify-between gap-4">
          <dt>Uptime</dt>
          <dd className="text-right">{metrics.uptime_s != null ? `${(metrics.uptime_s / 3600).toFixed(1)}h` : "—"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>RAM used ratio</dt>
          <dd className="text-right">{metrics.memory_used_ratio != null ? `${(metrics.memory_used_ratio * 100).toFixed(1)}%` : "—"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Heap / RSS</dt>
          <dd className="text-right">
            {metrics.heap_used_mb != null ? `${metrics.heap_used_mb.toFixed(0)}` : "?"} /
            {" "}
            {metrics.rss_mb != null ? `${metrics.rss_mb.toFixed(0)} MB` : "?"}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Load (1m)</dt>
          <dd className="text-right">{metrics.load_avg_1m != null ? metrics.load_avg_1m.toFixed(2) : "—"}</dd>
        </div>
      </dl>
      <button
        type="button"
        disabled={state.ui.diagRefreshing}
        onClick={() => void refreshDiagnostics()}
        className={`mt-6 rounded-xl border border-emerald-400/40 px-4 py-2 text-xs text-emerald-100 disabled:opacity-40 ${condensed ? "" : ""}`}
      >
        {state.ui.diagRefreshing ? "Sampling…" : "Capture metrics"}
      </button>
      <p className="mt-4 text-[11px] text-zinc-500">Captured {fmt(metrics.fetched_at_ms)} · {metrics.platform ?? "?"} · CPUs {metrics.cpus ?? "?"}</p>
    </>
  );

  return condensed ? <div>{body}</div> : (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="rounded-2xl border border-white/10 bg-black/40 p-8">{body}</div>
    </div>
  );
}

function NasaPanel() {
  const { state, refreshNasa } = useArcadiaOs();

  const neoLists = Object.entries(state.nasa_cache.neo?.buckets ?? {}).flatMap(([date, list]) =>
    Array.isArray(list)
      ? list.slice(0, 4).map((neo: unknown) => ({
          date,
          neo: neo as Record<string, unknown>,
        }))
      : [],
  ).slice(0, 12);

  return (
    <div className="space-y-10">
      <TeachRibbon state={state}>
        NASA routes share a TTL cache with `readThroughCache` so visitors do not unintentionally slam public
        API keys. Showing `cache.hit` in the inspector teaches observability parity with production gateways.
      </TeachRibbon>
      <button
        type="button"
        disabled={state.ui.nasaRefreshing}
        onClick={() => void refreshNasa()}
        className="rounded-xl border border-purple-400/55 px-4 py-2 text-sm text-purple-100 disabled:opacity-40"
      >
        {state.ui.nasaRefreshing ? "Retrieving orbitals…" : "Refresh bundles"}
      </button>

      <section className="space-y-3">
        <h2 className="text-xl text-white">Astronomy Picture of the Day</h2>
        <p className="text-xs text-zinc-500">{state.nasa_cache.apod?.explanation?.slice(0, 460) ?? "…"}</p>
      </section>

      <section>
        <h2 className="text-xl text-white">Near-Earth snapshots</h2>
        <p className="text-sm text-zinc-400">{state.nasa_cache.neo?.element_count ?? "?"} aggregates in tracked window · updated {fmt(state.nasa_cache.neo?.cache?.fetched_at_ms)}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {neoLists.map(({ date, neo }, neoIdx) => (
            <div
              key={`${date}-${String(neo.name ?? "neo")}-${neo.neo_reference_id ?? neoIdx}`}
              className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm"
            >
              <p className="font-medium text-purple-100">{String(neo.name ?? "Rock")}</p>
              <p className="mt-2 text-xs text-zinc-500">{date}</p>
              <p className={`mt-2 text-xs uppercase tracking-[0.2em] ${neo.is_potentially_hazardous_asteroid ? "text-red-300" : "text-zinc-400"}`}>
                {neo.is_potentially_hazardous_asteroid ? "Potential hazard flagged" : "Nominal"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl text-white">Curiosity latest frames</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(state.nasa_cache.marsPhotos ?? []).slice(0, 6).map((p, idx) => {
            const img = typeof p.img_src === "string" ? p.img_src : "";
            const id = typeof p.id === "number" ? String(p.id) : String(idx);
            return img ? (
              <figure key={`mars-${id}`} className="overflow-hidden rounded-2xl border border-white/12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`Mars rover ${id}`} className="h-44 w-full object-cover" loading="lazy" />
              </figure>
            ) : null;
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xl text-white">Space weather — geomagnetic storms (DONKI GST)</h2>
        <p className="text-sm text-zinc-400">
          {state.nasa_cache.donkiGst?.events?.length ?? 0} events in cached window · updated{" "}
          {fmt(state.nasa_cache.donkiGst?.cache?.fetched_at_ms)} · cache hit{" "}
          {String(state.nasa_cache.donkiGst?.cache?.hit ?? "—")}
        </p>
        <ul className="mt-4 space-y-3 text-sm text-zinc-300">
          {(state.nasa_cache.donkiGst?.events ?? []).slice(0, 6).map((ev, i) => {
            const id = ev.gstID != null ? String(ev.gstID) : `row-${i}`;
            const start = ev.startTime != null ? String(ev.startTime) : "—";
            return (
              <li key={id} className="rounded-xl border border-white/10 bg-black/35 px-4 py-3">
                <p className="font-mono text-xs text-purple-200/90">{id}</p>
                <p className="mt-1 text-xs text-zinc-500">Start {start}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function SciencePanel() {
  const { state } = useArcadiaOs();
  const neoBuckets = (state.nasa_cache.neo?.buckets ?? {}) as Record<string, unknown[]>;
  const neoLines = summarizeNeoBuckets(neoBuckets);
  const gstLines = summarizeGstEvents(state.nasa_cache.donkiGst?.events ?? []);

  return (
    <div className="space-y-10">
      <TeachRibbon state={state}>
        This panel turns catalogue JSON into distance scale and storm context: same numbers as the raw feed, with
        explicit units and conservative language (PHA is a monitoring taxonomy, not a headline).
      </TeachRibbon>

      <section className="rounded-2xl border border-white/10 bg-black/40 p-6">
        <h2 className="text-lg text-white">Near-Earth object window</h2>
        <p className="mt-2 text-xs text-zinc-500">
          NEO feed updated {fmt(state.nasa_cache.neo?.cache?.fetched_at_ms)} · elements{" "}
          {state.nasa_cache.neo?.element_count ?? "—"}
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-300">
          {neoLines.map((line, idx) => (
            <li key={`neo-${idx}`}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-white/10 bg-black/40 p-6">
        <h2 className="text-lg text-white">Geomagnetic environment (GST)</h2>
        <p className="mt-2 text-xs text-zinc-500">
          DONKI cache {fmt(state.nasa_cache.donkiGst?.cache?.fetched_at_ms)} · hit{" "}
          {String(state.nasa_cache.donkiGst?.cache?.hit ?? "—")}
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-300">
          {gstLines.map((line, idx) => (
            <li key={`gst-${idx}`}>{line}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function SimulationsPanel() {
  const { state, dispatch } = useArcadiaOs();

  const scenarios: { key: string; title: string; lines: readonly string[] }[] = [
    { key: "a", title: "A · Conceptual Earth → Moon transfer", lines: ORBIT_SCENARIO_A_EARTH_MOON },
    { key: "b", title: "B · LEO stability primer", lines: ORBIT_SCENARIO_B_LEO },
    { key: "c", title: "C · Asteroid flyby geometry", lines: ORBIT_SCENARIO_C_FLYBY },
  ];

  function logScenarioLoaded(title: string, lineCount: number) {
    dispatch({
      type: "LOG_APPEND",
      entries: [
        {
          level: "SIM",
          scope: "ORBIT",
          message: `[SIM] scenario loaded: ${title} (${lineCount} lines, text-only vignette)`,
        },
      ],
    });
  }

  return (
    <div className="space-y-8">
      <TeachRibbon state={state}>
        These are step-based explainers, not numerical integrators: they teach free-fall orbits and maneuver
        vocabulary the same way mission-control briefings use timelines before opening a propagator.
      </TeachRibbon>
      {scenarios.map((s) => (
        <article key={s.key} className="rounded-2xl border border-cyan-500/25 bg-[#061014]/80 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg text-cyan-50">{s.title}</h2>
            <button
              type="button"
              className="rounded-lg border border-cyan-400/40 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-cyan-100 hover:border-cyan-300/60"
              onClick={() => logScenarioLoaded(s.title, s.lines.filter((x) => x.trim().length > 0).length)}
            >
              Log load
            </button>
          </div>
          <pre className="mt-4 whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-zinc-300">
            {s.lines.join("\n")}
          </pre>
        </article>
      ))}
    </div>
  );
}

function LogsPanel() {
  const { state } = useArcadiaOs();

  const tail = [...state.logs].slice(-220).reverse();
  return (
    <div>
      <TeachRibbon state={state}>
        Logs interleave scopes like production tracing: `[EVENT]` intent, `[STATE]` datastore changes, `[SPACE]`
        feed ingestion, `[SCIENCE]` interpretation hooks, `[SIM]` vignette loads, `[AGENT]` EIDOLON heuristics,
        `[SYSTEM]` host metrics.
      </TeachRibbon>
      <pre className="max-h-[520px] overflow-auto rounded-2xl border border-white/10 bg-black/60 p-4 font-mono text-[11px] leading-relaxed text-zinc-300">
        {tail.map((l, idx) => (
          <div key={`${l.ts}-${l.scope}-${idx}-${l.message.slice(0, 48)}`}>
            [{l.level}] {fmt(l.ts)} [{l.scope}] {l.message}
          </div>
        ))}
      </pre>
    </div>
  );
}

function EidolonPanel() {
  const { state } = useArcadiaOs();

  const agentLines = [...state.logs].filter((l) => l.level === "AGENT");

  return (
    <div className="space-y-6">
      <TeachRibbon state={state}>
        EIDOLON consumes the same Redux-level snapshot your UI sees — no mystical side channel.
        Responses are scripted heuristics (rule engine) mirroring Tier-1 alerting runbooks until you evolve ML.
      </TeachRibbon>
      <section className="rounded-3xl border border-cyan-500/35 bg-[#081018]/80 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/90">EIDOLON stream</p>
        {agentLines.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-400">
            Silence is normal until NASA bundles or telemetry exceed heuristics. Visit NASA/System tabs to hydrate.
          </p>
        ) : (
          <ul className="mt-6 space-y-4 text-sm text-cyan-50">
            {[...agentLines].reverse().map((ln) => (
              <li key={`${ln.ts}-${ln.message}`} className="border-b border-white/10 pb-3">
                {ln.message}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function LearningPanel() {
  const { state } = useArcadiaOs();
  const topics = [
    {
      title: "SPA vs full reload",
      body: `This route keeps one persistent React shell. Sidebar buttons mutate context state instead of unmounting the entire viewport — preventing the blackout class of failures caused by layering exit fades over whole layouts.`,
    },
    {
      title: "Events → handlers → logs",
      body: `Each interaction dispatches reducer actions producing append-only telemetry. Mirrors event-driven backends (Kafka, CQRS introductions) albeit in miniature.`,
    },
    {
      title: "Caches & NASA quotas",
      body: `Server routes memoize upstream JSON for TTL windows. Operational lesson: dashboards never scrape primary APIs synchronously per click.`,
    },
    {
      title: "Interpretation vs raw JSON",
      body: `Catalogue APIs ship structured blobs for machines first. A science board layer adds units, distance scale, and operational context so humans do not misread PHA tags or Kp indices as entertainment headlines.`,
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-sm uppercase tracking-[0.3em] text-purple-200/85">Architectural study hall</p>
      <div className="grid gap-4 md:grid-cols-2">
        {topics.map((topic) => (
          <article key={topic.title} className="rounded-2xl border border-white/10 bg-black/50 p-5 text-sm leading-relaxed text-zinc-300">
            <h3 className="font-medium text-white">{topic.title}</h3>
            <p className="mt-3">{topic.body}</p>
          </article>
        ))}
      </div>
      <TeachRibbon state={state}>Toggle persists — every other tab now overlays amber teaching ribbons.</TeachRibbon>
    </div>
  );
}
