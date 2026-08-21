"use client";

import { useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { stats } from "@/lib/content";

function AnimatedNumber({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 30;
    const step = value / steps;
    const stepDuration = duration / steps;
    let current = 0;
    const t = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(t);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);
    return () => clearInterval(t);
  }, [value, inView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const vp = { once: true, margin: "-40px" as const };

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 bg-slate-900/40 border-y border-slate-700/50"
      aria-label="Experience and results"
    >
      <div className="section-container">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: reduceMotion ? 0.2 : 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 text-center"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: reduceMotion ? 0.2 : 0.3, delay: reduceMotion ? 0 : i * 0.08 }}
              className="group"
            >
              <p className="font-display text-4xl sm:text-5xl font-bold text-brand-400 mb-1 tabular-nums">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </p>
              <p className="text-slate-400 text-sm sm:text-base font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
