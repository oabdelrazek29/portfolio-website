"use client";

import React, { type ErrorInfo, type ReactNode } from "react";

/**
 * Lightweight error boundary so one failed panel sketch does not wipe the SPA black.
 *
 * React error boundaries catch render errors descendants throw; uncaught rejects from async
 * work still require try/catch inside fetch handlers — we attach both concepts in teaching.
 */

type BoundaryState = { err: Error | null; info: ErrorInfo | null };

export class ArcadiaOsErrorBoundary extends React.Component<
  { children: ReactNode },
  BoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { err: null, info: null };
  }

  static getDerivedStateFromError(err: Error): BoundaryState {
    return { err, info: null };
  }

  componentDidCatch(err: Error, info: ErrorInfo) {
    this.setState({ err, info });
  }

  render() {
    if (this.state.err) {
      return (
        <div className="rounded-2xl border border-red-500/40 bg-red-950/30 p-6 text-red-100">
          <p className="font-medium">ARCADIA OS contained a rendering fault.</p>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap text-xs text-red-200/90">
            {String(this.state.err)}
          </pre>
          <button
            type="button"
            onClick={() => this.setState({ err: null, info: null })}
            className="mt-6 rounded-xl border border-red-300/60 px-4 py-2 text-sm hover:bg-red-500/15"
          >
            Reset boundary
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
