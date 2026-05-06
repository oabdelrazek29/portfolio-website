"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";
import { ArcadiaDemo } from "@/components/arcadia/ArcadiaDemo";

const ARCADIA_REPO = "https://github.com/oabdelrazek29/ARCADIA";

export default function ArcadiaDemoPage() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10 px-5 pb-24 pt-32 md:px-8">
        <section className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="text-sm uppercase tracking-[0.22em] text-purple-300/85"
          >
            ARCADIA
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.08 }}
            className="mt-3 rounded-2xl border border-purple-400/35 bg-purple-950/25 p-5 text-[15px] leading-relaxed text-zinc-200 md:text-[16px]"
          >
            <p className="font-medium text-purple-100">Important distinction</p>
            <p className="mt-2 text-zinc-300">
              This webpage is{" "}
              <strong className="font-medium text-purple-100">not</strong> where ARCADIA source code lives. This canvas
              is only JavaScript animation so a visitor can watch one noisy tracking lesson without installing Python.
              Real code is in your ARCADIA GitHub repo under the Python package{" "}
              <code className="mx-1 rounded border border-white/10 bg-black/40 px-1.5 py-0.5 text-purple-100">arcadia</code>
              ,
              usual command after editable install reads{" "}
              <code className="rounded border border-white/10 bg-black/40 px-1.5 py-0.5 text-purple-100">
                python -m arcadia sim ...
              </code>
              exporting the same CSV style math offline on your laptop.
            </p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.12 }}
            className="mt-8 text-4xl font-medium tracking-[-0.02em] text-white md:text-5xl"
          >
            Lesson preview noisy track plus alpha beta filter animation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 max-w-3xl font-light leading-[1.75] text-zinc-400 md:text-[17px]"
          >
            Gray path scripted motion, red fuzzy dots pretend broken sensor readings, cyan smooth curve pretends fused
            estimate. Slider noise and gains mimic what you tweak in Lesson 03. Pause export tail CSV from your session
            for notes only.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.75 }}
            className="mt-6 flex flex-wrap gap-3 text-sm"
          >
            <Link
              href={ARCADIA_REPO}
              className="rounded-xl border border-purple-400/55 bg-purple-950/35 px-4 py-2 text-purple-100 transition hover:border-purple-300/70 hover:text-white"
            >
              View ARCADIA on GitHub
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-white/15 px-4 py-2 text-zinc-300 transition hover:border-purple-400/45 hover:text-purple-100"
            >
              Back to home
            </Link>
            <Link
              href="/lab"
              className="rounded-xl border border-white/15 px-4 py-2 text-zinc-300 transition hover:border-purple-400/45 hover:text-purple-100"
            >
              Lab notes
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.85 }}
            className="mt-12"
          >
            <ArcadiaDemo />
          </motion.div>
        </section>
      </main>
    </>
  );
}
