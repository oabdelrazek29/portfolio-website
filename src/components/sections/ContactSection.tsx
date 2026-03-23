"use client";

/**
 * Contact section with dark inputs + glow focus states.
 * Hook `handleSubmit` into your backend or form provider when ready.
 */

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Replace this with your real API request.
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative px-5 py-20 md:px-8 md:pb-28 md:pt-28">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.96, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm uppercase tracking-[0.2em] text-purple-300/85"
        >
          Contact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.82, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-4xl font-medium tracking-[-0.02em] text-white md:text-5xl"
        >
          Get in Touch
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.84, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-2xl rounded-3xl border border-purple-500/25 bg-black/45 p-6 md:p-8"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="text-sm text-zinc-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className="input-aura mt-2 w-full rounded-xl border border-white/10 bg-[#0f0a18] px-4 py-3 text-white placeholder:text-zinc-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-zinc-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="input-aura mt-2 w-full rounded-xl border border-white/10 bg-[#0f0a18] px-4 py-3 text-white placeholder:text-zinc-500"
                placeholder="you@domain.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm text-zinc-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="input-aura mt-2 w-full resize-none rounded-xl border border-white/10 bg-[#0f0a18] px-4 py-3 text-white placeholder:text-zinc-500"
                placeholder="Tell me about your project…"
              />
            </div>
            <GlowButton type="submit" className="w-full sm:w-auto">
              Send Message
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
                Message state triggered. Connect this form to your API in `ContactSection.tsx`.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
