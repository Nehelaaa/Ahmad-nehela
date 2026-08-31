"use client";

import { useEffect, useState, useRef } from "react";
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
  const [count, setCount] = useState(value);
  useEffect(() => {
    if (!inView) return;
    // Prefer reduced work on mobile: snap to value if user prefers reduced motion
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(value);
      return;
    }
    setCount(0);
    const duration = 900;
    const steps = 18;
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
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px", threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section-defer py-16 sm:py-20 bg-surface border-y border-line"
      aria-label="Experience and results"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 text-center sm:divide-x sm:divide-line">
          {stats.map((stat) => (
            <div key={stat.label} className="group px-2">
              <p className="font-display text-5xl sm:text-6xl text-paper mb-1.5 tabular-nums">
                <span className="text-gold-400">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
                </span>
              </p>
              <p className="text-paper/45 text-[13px] sm:text-sm font-medium uppercase tracking-[0.14em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
