"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { careSubscription, pricingDeal, services } from "@/lib/content";

export default function Services() {
  const reduceMotion = useReducedMotion();
  const anim = reduceMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.35 } };

  return (
    <section
      id="services"
      className="py-20 sm:py-28 bg-surface border-t border-slate-700/40"
      aria-labelledby="services-heading"
    >
      <div className="section-container">
        <motion.div
          {...anim}
          viewport={{ once: true, margin: "-40px" }}
          className="text-center max-w-lg mx-auto mb-14"
        >
          <h2
            id="services-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3"
          >
            Simple packages
          </h2>
          <p className="text-slate-400 text-[15px] leading-relaxed">
            One clear project price. Site Care keeps it running after launch.
          </p>
          <p className="text-slate-600 text-sm mt-3">{pricingDeal.note}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-5 items-stretch">
          {services.map((plan, i) => {
            const savings =
              plan.regularPrice != null ? plan.regularPrice - plan.price : 0;

            return (
              <motion.article
                key={plan.name}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: reduceMotion ? 0.2 : 0.35,
                  delay: reduceMotion ? 0 : i * 0.05,
                }}
                className={`relative flex flex-col rounded-2xl p-6 sm:p-7 ${
                  plan.highlighted
                    ? "bg-surface-elevated ring-1 ring-brand-500 shadow-[0_0_0_1px_rgba(245,158,11,0.15)] md:-mt-2 md:mb-2 md:pt-8"
                    : "bg-surface-elevated/80 ring-1 ring-slate-700/50"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Most popular
                  </span>
                )}

                <div className="mb-5">
                  <h3 className="font-display text-lg font-bold text-white">
                    {plan.name}
                  </h3>
                  <p className="text-slate-500 text-sm mt-0.5">{plan.tagline}</p>
                </div>

                <div className="mb-5 pb-5 border-b border-slate-700/40">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[2.5rem] font-bold text-white leading-none tracking-tight tabular-nums">
                      ${plan.price.toLocaleString()}
                    </span>
                    {plan.regularPrice != null && savings > 0 && (
                      <span className="text-slate-600 text-sm line-through tabular-nums">
                        ${plan.regularPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-slate-400">
                    then{" "}
                    <span className="text-brand-400 font-medium tabular-nums">
                      ${careSubscription.price}/mo
                    </span>{" "}
                    Site Care
                  </p>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {plan.description}
                </p>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-slate-300 text-sm leading-snug"
                    >
                      <span
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500"
                        aria-hidden
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/#contact"
                  className={`block text-center rounded-xl py-3 min-h-[48px] font-semibold text-sm transition-colors ${
                    plan.highlighted
                      ? "bg-brand-500 text-white hover:bg-brand-400"
                      : "bg-white/5 text-white hover:bg-white/10 ring-1 ring-slate-600/60"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          {...anim}
          viewport={{ once: true, margin: "-40px" }}
          className="mt-12 sm:mt-14 rounded-2xl ring-1 ring-slate-700/50 bg-surface-elevated/50 px-6 py-8 sm:px-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-400 mb-1">
                Included with every plan
              </p>
              <h3 className="font-display text-xl font-bold text-white">
                Site Care — ${careSubscription.price}/mo
              </h3>
            </div>
            <p className="text-sm text-slate-500 max-w-sm sm:text-right">
              {careSubscription.description}
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
            {careSubscription.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </motion.div>

        <p className="text-center text-slate-500 text-sm mt-10">
          Not sure which fits?{" "}
          <Link href="/#contact" className="text-brand-400 hover:text-brand-300 font-medium">
            Get a free quote
          </Link>
        </p>
      </div>
    </section>
  );
}
