"use client";

/**
 * ARCADIA navigation toy: synthetic 2D trajectory, Gaussian measurements, alpha-beta estimate.
 * Mirrors projects/p01_navigation_stub/sim_loop.py constants for parity.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Vec2 = { x: number; y: number };

function randn(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function truthAt(tSeconds: number): Vec2 {
  const x = 120 * Math.sin(0.35 * tSeconds);
  const y = 80 * Math.sin(0.55 * tSeconds + 0.9);
  return { x, y };
}

class AxisAlphaBeta {
  x = 0;
  v = 0;
  constructor(public alpha: number, public beta: number) {}

  reset(init: number) {
    this.x = init;
    this.v = 0;
  }

  step(measurement: number, dt: number) {
    const xPred = this.x + this.v * dt;
    const residual = measurement - xPred;
    this.x = xPred + this.alpha * residual;
    this.v += (this.beta / dt) * residual;
  }
}

function formatRow(t: number, truth: Vec2, meas: Vec2, est: Vec2): string {
  return `${t.toFixed(5)},${truth.x.toFixed(3)},${truth.y.toFixed(3)},${meas.x.toFixed(3)},${meas.y.toFixed(3)},${est.x.toFixed(3)},${est.y.toFixed(3)}`;
}

export function ArcadiaDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(true);
  const [noiseSigma, setNoiseSigma] = useState(3.5);
  const [alpha, setAlpha] = useState(0.35);
  const [beta, setBeta] = useState(0.08);
  const [telemetryText, setTelemetryText] = useState("warming up");

  const stateRef = useRef({
    t: 0,
    filtX: new AxisAlphaBeta(0.35, 0.08),
    filtY: new AxisAlphaBeta(0.35, 0.08),
    seeded: false,
    trailTruth: [] as Vec2[],
    trailMeas: [] as Vec2[],
    trailEst: [] as Vec2[],
    telemetry: [] as string[],
    lastFrame: performance.now(),
    hudFrame: 0,
  });

  useEffect(() => {
    stateRef.current.filtX.alpha = alpha;
    stateRef.current.filtX.beta = beta;
    stateRef.current.filtY.alpha = alpha;
    stateRef.current.filtY.beta = beta;
  }, [alpha, beta]);

  const csvHeader = useMemo(() => "t_s,truth_x,truth_y,meas_x,meas_y,est_x,est_y", []);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = cssW / 2;
    const cy = cssH / 2;

    ctx.fillStyle = "#06020d";
    ctx.fillRect(0, 0, cssW, cssH);

    const s = stateRef.current;
    const scale = Math.min(cssW, cssH) / 320;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    const gridStep = 40;
    ctx.strokeStyle = "rgba(122,0,255,0.12)";
    ctx.lineWidth = 1 / scale;
    for (let g = -220; g <= 220; g += gridStep) {
      ctx.beginPath();
      ctx.moveTo(g, -220);
      ctx.lineTo(g, 220);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-220, g);
      ctx.lineTo(220, g);
      ctx.stroke();
    }

    const drawTrail = (pts: Vec2[], color: string, width: number, alphaVal: number) => {
      if (pts.length < 2) return;
      ctx.strokeStyle = color;
      ctx.globalAlpha = alphaVal;
      ctx.lineWidth = width / scale;
      ctx.lineJoin = ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    drawTrail(s.trailTruth, "rgba(148,163,184,0.35)", 5, 1);
    drawTrail(s.trailMeas, "rgba(248,113,113,0.45)", 2, 1);
    drawTrail(s.trailEst, "rgba(34,211,238,0.9)", 4, 1);

    ctx.fillStyle = "#e2e8f0";
    const tr = s.trailTruth[s.trailTruth.length - 1];
    if (tr) {
      ctx.beginPath();
      ctx.arc(tr.x, tr.y, 4.5 / scale, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "#22d3ee";
    const fe = s.trailEst[s.trailEst.length - 1];
    if (fe) {
      ctx.beginPath();
      ctx.arc(fe.x, fe.y, 4 / scale, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    ctx.font = "11px system-ui, sans-serif";
    ctx.fillStyle = "rgba(196,181,253,0.9)";
    ctx.fillText("silver path ground truth", 12, cssH - 56);
    ctx.fillStyle = "rgba(248,113,113,0.95)";
    ctx.fillText("red trace noisy samples", 12, cssH - 40);
    ctx.fillStyle = "rgba(34,211,238,0.95)";
    ctx.fillText("cyan filtered alpha beta estimate", 12, cssH - 24);
  }, []);

  useEffect(() => {
    let raf = 0;
    const dtNominal = 1 / 60;

    const loop = (now: number) => {
      const s = stateRef.current;
      s.lastFrame = now;

      if (running) {
        const truth = truthAt(s.t);
        const meas = { x: truth.x + randn() * noiseSigma, y: truth.y + randn() * noiseSigma };

        if (!s.seeded) {
          s.filtX.reset(meas.x);
          s.filtY.reset(meas.y);
          s.seeded = true;
        } else {
          s.filtX.step(meas.x, dtNominal);
          s.filtY.step(meas.y, dtNominal);
        }

        const est: Vec2 = { x: s.filtX.x, y: s.filtY.x };

        const push = (arr: Vec2[], v: Vec2, cap: number) => {
          arr.push(v);
          if (arr.length > cap) arr.shift();
        };

        push(s.trailTruth, truth, 480);
        push(s.trailMeas, meas, 120);
        push(s.trailEst, est, 480);

        const row = formatRow(s.t, truth, meas, est);
        s.telemetry.push(row);
        if (s.telemetry.length > 40) s.telemetry.shift();

        s.t += dtNominal;

        s.hudFrame += 1;
        if (s.hudFrame % 18 === 0) {
          setTelemetryText(s.telemetry.length ? s.telemetry.join("\n") : "warming up");
        }
      }

      drawFrame();

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, noiseSigma, drawFrame]);

  const reset = () => {
    const s = stateRef.current;
    s.t = 0;
    s.seeded = false;
    s.trailTruth = [];
    s.trailMeas = [];
    s.trailEst = [];
    s.telemetry = [];
    s.lastFrame = performance.now();
    setTelemetryText("warming up");
  };

  const downloadCsv = () => {
    const s = stateRef.current;
    const body = [csvHeader, ...s.telemetry].join("\n");
    const blob = new Blob([body], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "arcadia_demo_tail.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-black/50 shadow-[0_0_40px_rgba(122,0,255,0.15)]">
          <canvas ref={canvasRef} className="h-[min(420px,55vh)] w-full" />
        </div>

        <div className="space-y-5 rounded-2xl border border-purple-500/25 bg-black/45 p-5 text-sm text-zinc-300">
          <p className="text-xs uppercase tracking-[0.2em] text-purple-300/90">Controls</p>

          <label className="flex flex-col gap-1">
            <span className="text-zinc-400">measurement noise sigma {noiseSigma.toFixed(1)}</span>
            <input
              type="range"
              min={0}
              max={14}
              step={0.25}
              value={noiseSigma}
              onChange={(e) => setNoiseSigma(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-zinc-400">alpha {alpha.toFixed(2)}</span>
            <input
              type="range"
              min={0.05}
              max={0.95}
              step={0.01}
              value={alpha}
              onChange={(e) => setAlpha(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-zinc-400">beta {beta.toFixed(2)}</span>
            <input
              type="range"
              min={0.01}
              max={0.5}
              step={0.01}
              value={beta}
              onChange={(e) => setBeta(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setRunning((v) => !v)}
              className="rounded-xl border border-purple-400/50 bg-purple-950/40 px-4 py-2 text-purple-100 transition hover:border-purple-300/70"
            >
              {running ? "Pause" : "Run"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-xl border border-white/15 px-4 py-2 text-zinc-200 transition hover:border-purple-400/50"
            >
              Reset trails
            </button>
            <button
              type="button"
              onClick={downloadCsv}
              className="rounded-xl border border-white/15 px-4 py-2 text-zinc-200 transition hover:border-purple-400/50"
            >
              Export tail CSV
            </button>
          </div>

          <p className="leading-relaxed text-xs text-zinc-500">
            Same path law and filter family as the ARCADIA repo `sim_loop.py`. High noise shows why
            layered estimators exist before you hand motion commands to real actuators.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-[11px] leading-5 text-zinc-400">
        <p className="mb-2 text-zinc-500">{csvHeader}</p>
        <pre className="whitespace-pre">{telemetryText}</pre>
      </div>
    </div>
  );
}
