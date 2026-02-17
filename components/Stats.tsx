"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 bg-surface-muted/50 border-y border-slate-700/50"
      aria-label="Experience and results"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 text-center"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
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
