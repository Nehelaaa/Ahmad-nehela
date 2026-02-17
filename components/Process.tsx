"use client";

import { motion, useReducedMotion } from "framer-motion";
import { processSteps } from "@/lib/content";

const vp = { once: true, margin: "-40px" as const };

export default function Process() {
  const reduceMotion = useReducedMotion();
  const anim = reduceMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.3 } };
  return (
    <section
      id="process"
      className="py-20 sm:py-28 bg-surface border-t border-slate-700/50"
      aria-labelledby="process-heading"
    >
      <div className="section-container">
        <motion.div
          {...anim}
          viewport={vp}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2
            id="process-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            How I work
          </h2>
          <p className="text-slate-400">
            A clear process so your project stays on track and you know what to expect from start to launch.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {processSteps.map((item, i) => (
            <motion.article
              key={item.step}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: reduceMotion ? 0.2 : 0.3, delay: reduceMotion ? 0 : i * 0.08 }}
              className="group relative rounded-2xl bg-surface-elevated border border-slate-700/50 p-6 sm:p-8 card-hover hover:border-brand-500/40 min-w-0"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-500/20 text-brand-400 font-display font-bold text-lg mb-4">
                {item.step}
              </span>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
              {i < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-600 -translate-y-1/2" aria-hidden />
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
