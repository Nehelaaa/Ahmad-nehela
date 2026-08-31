"use client";

import Reveal from "@/components/Reveal";
import { processSteps } from "@/lib/content";

export default function Process() {
  return (
    <section
      id="process"
      className="py-24 sm:py-32 bg-surface-elevated border-t border-line"
      aria-labelledby="process-heading"
    >
      <div className="section-container">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow justify-center mb-4">Process</p>
          <h2 id="process-heading" className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tightest text-paper mb-4">
            How I work.
          </h2>
          <p className="text-paper/55">
            A clear process so your project stays on track and you know what to expect from start to launch.
          </p>
        </Reveal>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          <div className="hidden lg:block absolute top-[2.75rem] left-0 right-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" aria-hidden />
          {processSteps.map((item, i) => (
            <Reveal key={item.step} as="article" delayMs={i * 90} className="group relative min-w-0">
              <span className="relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-full bg-surface ring-1 ring-line text-gold-400 font-display text-xl mb-5 group-hover:ring-gold-500/50 group-hover:scale-105 transition-all duration-500 ease-premium">
                {String(item.step).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg text-paper mb-2">{item.title}</h3>
              <p className="text-paper/50 text-sm leading-relaxed">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
