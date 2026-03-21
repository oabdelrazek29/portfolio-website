"use client";

/**
 * Contact form is front-end only (demo). Wire `onSubmit` to your API, Formspree, etc.
 * Email display pulls from siteConfig — keep it in sync with your real inbox.
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { siteConfig } from "@/data/portfolio";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // REPLACE: connect to your backend or form service
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
  };

  return (
    <SectionReveal id="contact" className="relative z-10 px-5 py-24 md:px-8 md:pb-40 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-300/90">
          Contact
        </p>
        <SectionHeading>Let&apos;s build something quiet loud</SectionHeading>
        <p className="mt-4 max-w-xl text-zinc-500">
          Direct line:{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-purple-300 underline-offset-4 hover:text-purple-200 hover:underline"
          >
            {siteConfig.email}
          </a>
        </p>

        <GlassCard className="mx-auto mt-14 max-w-xl p-8 md:p-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="text-sm text-zinc-400">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className="input-aura mt-2 w-full rounded-xl border border-white/12 bg-[#1a1724]/85 px-4 py-3 text-white placeholder:text-zinc-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-zinc-400">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="input-aura mt-2 w-full rounded-xl border border-white/12 bg-[#1a1724]/85 px-4 py-3 text-white placeholder:text-zinc-500"
                placeholder="you@domain.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm text-zinc-400">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="input-aura mt-2 w-full resize-none rounded-xl border border-white/12 bg-[#1a1724]/85 px-4 py-3 text-white placeholder:text-zinc-500"
                placeholder="Tell me about your project…"
              />
            </div>
            <GlowButton type="submit" className="w-full sm:w-auto">
              Send message
            </GlowButton>
          </form>

          <AnimatePresence>
            {sent && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="mt-6 text-sm text-purple-300/90"
              >
                Thanks — this demo doesn&apos;t post anywhere yet. Hook the form to your endpoint
                in <code className="text-purple-200">ContactSection.tsx</code>.
              </motion.p>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </SectionReveal>
  );
}
