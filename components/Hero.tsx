"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/content";

const headlineWords = ["Websites", "that", "make", "your", "business", "the", "obvious", "choice."];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-surface pt-36 pb-20 sm:pt-44 sm:pb-28"
      aria-label="Introduction"
    >
      {/* Lighter on mobile: no huge blur orbs (GPU-heavy) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(192,138,52,0.16),transparent)]" />
        <div className="hidden sm:block absolute -top-24 left-[8%] h-[26rem] w-[26rem] rounded-full bg-gold-500/10 blur-[110px] animate-float" />
        <div
          className="hidden sm:block absolute top-10 right-[6%] h-[22rem] w-[22rem] rounded-full bg-sage-500/10 blur-[110px] animate-float"
          style={{ animationDelay: "-3.5s" }}
        />
        <div className="absolute inset-0 opacity-40 sm:opacity-60 hero-pattern" />
        <div className="hidden sm:block absolute inset-0 grain" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className="eyebrow justify-center mb-7"
          >
            <span className="h-px w-6 bg-gold-500/60" />
            Boston &amp; MetroWest · Free 15-min consult
            <span className="h-px w-6 bg-gold-500/60" />
          </motion.div>

          <h1 className="font-display text-[2.6rem] leading-[1.05] sm:text-6xl sm:leading-[1.05] md:text-7xl md:leading-[1.02] tracking-tightest text-paper mb-7">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word + i}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 18 }
                }
                animate={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0 }
                }
                transition={{
                  duration: 0.55,
                  ease,
                  delay: reduceMotion ? 0 : 0.05 * i,
                }}
                className={`inline-block mr-[0.28em] ${
                  word === "obvious" ? "italic text-gold-400" : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: reduceMotion ? 0 : 0.45 }}
            className="max-w-xl mx-auto text-paper/60 text-base sm:text-lg leading-relaxed mb-3"
          >
            {site.name} — custom sites, built and designed by {site.personName}, with SEO, WordPress,
            and analytics built in from day one.
          </motion.p>

          <motion.p
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: reduceMotion ? 0 : 0.52 }}
            className="text-paper/40 text-sm mb-10"
          >
            So the next neighbor who searches for what you do finds you first — and books.
          </motion.p>

          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: reduceMotion ? 0 : 0.58 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
          >
            <Link
              href="/#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 min-h-[48px] text-sm font-semibold text-surface transition-all duration-300 ease-premium hover:bg-gold-400 hover:scale-[1.03] active:scale-[0.98]"
            >
              Get a free quote
              <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                →
              </span>
            </Link>
            <Link
              href="/#work"
              className="inline-flex items-center justify-center rounded-full border border-line px-7 py-3.5 min-h-[48px] text-sm font-semibold text-paper/80 hover:border-gold-500/50 hover:text-gold-300 transition-all duration-300"
            >
              View the work
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
