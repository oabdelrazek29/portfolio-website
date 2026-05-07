"use client";

/**
 * Browser mirror of `python -m arcadia shell` Phase 1 — boot, dashboard, ARC> REPL.
 * Same commands as the real package: status | log [n] | help | exit
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const MODULES = ["CORE", "MEMORY", "PLANNER", "INTERFACE"] as const;

function makeSessionId(): string {
  const a: number[] = [];
  for (let i = 0; i < 6; i++) a.push(Math.floor(Math.random() * 256));
  return a.map((x) => x.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function healthFromSession(sid: string): Record<string, number> {
  const spice = [...sid].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 37;
  return {
    CORE_LOAD: Math.min(100, 28 + (spice % 15)),
    MEM_BUS: Math.min(100, 44 + (spice % 20)),
    PLANNER_Q: Math.min(100, 12 + (spice % 10)),
    IF_PIPE: Math.min(100, 22 + (spice % 18)),
  };
}

function bar(percent: number, w = 24): string {
  const p = Math.max(0, Math.min(100, percent));
  const filled = Math.round((p / 100) * w);
  return "[" + "#".repeat(filled) + ".".repeat(w - filled) + "]";
}

type Line = { id: string; text: string; kind: "out" | "cmd" | "sys" };

export function ArcadiaTerminalDemo() {
  const [lines, setLines] = useState<Line[]>([]);
  const [bootDone, setBootDone] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [activeMods, setActiveMods] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"ONLINE" | "OFFLINE">("ONLINE");
  const logRef = useRef<HTMLPreElement>(null);
  const logBufferRef = useRef<string[]>([]);
  const idRef = useRef(0);

  const push = useCallback((text: string, kind: Line["kind"] = "out") => {
    idRef.current += 1;
    setLines((prev) => [...prev, { id: `l-${idRef.current}`, text, kind }]);
    if (kind === "out" && text.startsWith("[")) {
      logBufferRef.current.push(text.trim());
      if (logBufferRef.current.length > 400) logBufferRef.current.shift();
    }
  }, []);

  const health = useMemo(() => (sessionId ? healthFromSession(sessionId) : {}), [sessionId]);

  useEffect(() => {
    const sid = makeSessionId();
    setSessionId(sid);
    const tick = (ms: number) => new Promise((r) => setTimeout(r, ms));

    void (async () => {
      push("", "sys");
      push("  ARCADIA / Phase 1 — modular terminal foundation (browser preview)", "sys");
      push("  (Run the real REPL locally: python -m arcadia shell)", "sys");
      await tick(120);
      push("  [ARCADIA] [|/-\\|] initializing…", "sys");
      await tick(520);
      push("", "sys");
      push(`[INFO] Session established — id=${sid}`, "out");
      await tick(200);
      for (const m of MODULES) {
        await tick(90);
        setActiveMods((prev) => [...prev, m]);
        push(`[MODULE] ${m} subsystem linked — dependencies satisfied for this stage`, "out");
      }
      await tick(100);
      push("[TASK] Synthetic health probes injected into dashboard buffers.", "out");
      push("[INFO] Boot complete — command processor ready.", "out");
      setBootDone(true);
    })();
  }, [push]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const printDashboard = useCallback(() => {
    if (!sessionId) return;
    const mods = activeMods.length ? activeMods.join(", ") : "(none)";
    const rows = [
      "",
      "+---------------------------------------------------------------------+",
      "|  ARCADIA SYSTEM DASHBOARD (browser)                                 |",
      "+---------------------------------------------------------------------+",
      `|  Status         : ${status.padEnd(54)} |`,
      `|  Session        : ${sessionId.padEnd(54)} |`,
      `|  Modules        : ${mods.padEnd(54)} |`,
      "+---------------------------------------------------------------------+",
      "|  Health (simulated)                                                 |",
      "+---------------------------------------------------------------------+",
    ];
    Object.entries(health)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([label, val]) => {
        rows.push(`|  ${label.padEnd(12)} ${val.toFixed(1).padStart(5)}%  ${bar(val).padEnd(44)} |`);
      });
    rows.push("+---------------------------------------------------------------------+", "");
    rows.forEach((r) => push(r, "out"));
  }, [sessionId, activeMods, status, health, push]);

  useEffect(() => {
    if (bootDone && sessionId) printDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once after boot
  }, [bootDone]);

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      if (!cmd) return;
      push(`ARC> ${cmd}`, "cmd");

      const parts = cmd.split(/\s+/);
      const name = parts[0].toLowerCase();

      if (status === "OFFLINE") {
        push("  [ERROR] System offline. Reload the page to reboot.", "out");
        return;
      }

      push(`[INFO] Shell received command: ${name}`, "out");

      if (name === "help") {
        push("[TASK] Executing help display", "out");
        push("  === ARCADIA Phase 1 — command reference ===", "out");
        push("  status   System + session + modules + health.", "out");
        push("  log [n]  Last n log lines (default 24).", "out");
        push("  help     This screen.", "out");
        push("  exit     Shutdown (offline).", "out");
        return;
      }

      if (name === "status") {
        push("[TASK] Executing status check", "out");
        push("  === STATUS REPORT ===", "out");
        push(`  Overall        : ${status}`, "out");
        push(`  Session ID      : ${sessionId}`, "out");
        push(`  Modules online : ${activeMods.join(", ") || "(none)"}`, "out");
        Object.entries(health).forEach(([k, v]) => push(`    - ${k}: ${v.toFixed(1)}%`, "out"));
        return;
      }

      if (name === "log") {
        push("[TASK] Dumping recent structured log lines", "out");
        let n = 24;
        if (parts[1]) {
          const x = parseInt(parts[1], 10);
          if (!Number.isNaN(x)) n = Math.min(200, Math.max(1, x));
        }
        push(`  === LOG (last ${Math.min(n, logBufferRef.current.length)} lines) ===`, "out");
        logBufferRef.current.slice(-n).forEach((l) => push(`  ${l}`, "out"));
        return;
      }

      if (name === "exit" || name === "quit") {
        push("[INFO] Operator requested shutdown — graceful teardown", "out");
        push("[WARNING] INTERFACE offline — session end", "out");
        setStatus("OFFLINE");
        return;
      }

      push(`[ERROR] Unknown command '${name}' — type help`, "out");
    },
    [push, sessionId, activeMods, status, health],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-purple-500/35 bg-[#06020d] font-mono text-[13px] leading-relaxed text-zinc-300 shadow-[0_0_40px_rgba(122,0,255,0.2)]">
      <div className="border-b border-purple-500/25 bg-black/50 px-4 py-2 text-xs uppercase tracking-[0.2em] text-purple-300/90">
        ARCADIA Phase 1 — terminal preview
      </div>
      <pre
        ref={logRef}
        className="max-h-[min(480px,60vh)] overflow-y-auto whitespace-pre-wrap break-words px-4 py-3"
      >
        {lines.map((line) => (
          <span
            key={line.id}
            className={
              line.kind === "cmd"
                ? "text-cyan-300/95"
                : line.kind === "sys"
                  ? "text-zinc-500"
                  : "text-zinc-200"
            }
          >
            {line.text}
            {"\n"}
          </span>
        ))}
      </pre>
      <form onSubmit={onSubmit} className="flex gap-2 border-t border-white/10 bg-black/60 px-4 py-3">
        <span className="shrink-0 text-cyan-400/90">ARC&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!bootDone || status === "OFFLINE"}
          placeholder={bootDone ? "type status, log, help, exit" : "booting…"}
          className="min-w-0 flex-1 bg-transparent text-zinc-100 outline-none placeholder:text-zinc-600 disabled:opacity-50"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <button
          type="submit"
          disabled={!bootDone || status === "OFFLINE"}
          className="rounded-lg border border-purple-400/40 px-3 py-1 text-xs text-purple-100 transition hover:border-purple-300/70 disabled:opacity-40"
        >
          Run
        </button>
      </form>
    </div>
  );
}
