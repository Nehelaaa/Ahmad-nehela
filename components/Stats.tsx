"use client";

import { useEffect, useState, useRef } from "react";
import Reveal from "@/components/Reveal";
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
      { rootMargin: "-80px", threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 bg-surface border-y border-line"
      aria-label="Experience and results"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 text-center sm:divide-x sm:divide-line">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delayMs={i * 80} className="group px-2">
              <p className="font-display text-5xl sm:text-6xl text-paper mb-1.5 tabular-nums">
                <span className="text-gold-400">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
                </span>
              </p>
              <p className="text-paper/45 text-[13px] sm:text-sm font-medium uppercase tracking-[0.14em]">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
