"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const anim = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-surface pt-28 pb-14 sm:pt-32 sm:pb-16"
      aria-label="Introduction"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(245,158,11,0.12),transparent)]" />
      <div className="absolute inset-0 opacity-40 hero-pattern" aria-hidden />

      <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
        <motion.p
          {...anim}
          className="text-brand-400 font-medium tracking-wide uppercase text-xs mb-4"
        >
          Boston &amp; MetroWest · Free 15‑min consult
        </motion.p>

        <motion.h1
          {...anim}
          transition={{ ...anim.transition, delay: reduceMotion ? 0 : 0.05 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-3"
        >
          Websites that help local businesses get found
        </motion.h1>

        <motion.p
          {...anim}
          transition={{ ...anim.transition, delay: reduceMotion ? 0 : 0.1 }}
          className="text-slate-400 text-base sm:text-lg mb-3"
        >
          Ahmad Nehela — web developer &amp; designer
        </motion.p>

        <motion.p
          {...anim}
          transition={{ ...anim.transition, delay: reduceMotion ? 0 : 0.15 }}
          className="max-w-lg mx-auto text-slate-500 text-sm sm:text-base leading-relaxed mb-8"
        >
          Custom sites with SEO, WordPress, and Google Analytics built in — so neighbors can find you and book.
        </motion.p>

        <motion.div
          {...anim}
          transition={{ ...anim.transition, delay: reduceMotion ? 0 : 0.2 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
        >
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-brand-500 px-7 py-3 min-h-[48px] text-sm font-semibold text-white hover:bg-brand-400 transition-colors"
          >
            Get a free quote
          </Link>
          <Link
            href="/#work"
            className="inline-flex items-center justify-center rounded-full border border-slate-600 px-7 py-3 min-h-[48px] text-sm font-semibold text-white hover:border-brand-500 hover:text-brand-400 transition-colors"
          >
            View work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
