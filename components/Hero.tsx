"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const roles = ["Web Developer", "Designer", "Problem Solver", "Freelancer"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const t = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const anim = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-surface"
      aria-label="Introduction"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(245,158,11,0.15),transparent)]" />
      <div className="absolute inset-0 opacity-60 hero-pattern" aria-hidden />

      <div className="section-container relative z-10 text-center">
        <motion.p
          {...anim}
          transition={{ ...anim.transition, delay: 0 }}
          className="text-brand-400 font-medium tracking-wide uppercase text-sm mb-4"
        >
          Boston &amp; MetroWest · Free 15‑min consult
        </motion.p>
        <motion.h1
          {...anim}
          transition={{ ...anim.transition, delay: reduceMotion ? 0 : 0.1 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-3 px-1"
        >
          Ahmad Nehela
        </motion.h1>
        <motion.div
          {...anim}
          transition={{ ...anim.transition, delay: reduceMotion ? 0 : 0.2 }}
          className="text-lg sm:text-2xl md:text-3xl text-slate-400 mb-8 sm:mb-10 min-h-[2rem] sm:min-h-[2.5rem]"
        >
          <span className="text-white">I build </span>
          <span
            key={roleIndex}
            className="gradient-text font-semibold inline-block animate-fade-in"
          >
            {roles[roleIndex]}
          </span>
        </motion.div>
        <motion.p
          {...anim}
          transition={{ ...anim.transition, delay: reduceMotion ? 0 : 0.3 }}
          className="max-w-xl mx-auto text-slate-400 text-base sm:text-lg mb-8 sm:mb-10 px-1"
        >
          Custom sites and web apps for local businesses — SEO, Google Analytics, and WordPress built in. Book a free call or request a quote and let&apos;s get your business found online.
        </motion.p>
        <motion.div
          {...anim}
          transition={{ ...anim.transition, delay: reduceMotion ? 0 : 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] text-base font-semibold text-white hover:bg-brand-400 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] glow w-full sm:w-auto"
          >
            Book a free call
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] text-base font-semibold text-white hover:border-brand-500 hover:text-brand-400 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
          >
            Get a free quote
          </Link>
          <Link
            href="/#work"
            className="inline-flex items-center justify-center rounded-full border border-transparent px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] text-base font-semibold text-slate-400 hover:text-white transition-all duration-200 w-full sm:w-auto"
          >
            View my work
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={reduceMotion ? { y: 0 } : { y: [0, 8, 0] }}
          transition={reduceMotion ? {} : { repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-slate-500 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-brand-500" />
        </motion.div>
      </div>
    </section>
  );
}
