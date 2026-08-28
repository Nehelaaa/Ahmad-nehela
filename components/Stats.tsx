"use client";

import { useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { stats } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

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
      className="py-16 sm:py-20 bg-surface border-y border-line"
      aria-label="Experience and results"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 text-center sm:divide-x sm:divide-line">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: reduceMotion ? 0.2 : 0.5, ease, delay: reduceMotion ? 0 : i * 0.08 }}
              className="group px-2"
            >
              <p className="font-display text-5xl sm:text-6xl text-paper mb-1.5 tabular-nums">
                <span className="text-gold-400">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
                </span>
              </p>
              <p className="text-paper/45 text-[13px] sm:text-sm font-medium uppercase tracking-[0.14em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
