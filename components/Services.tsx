"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { careSubscription, pricingDeal, services } from "@/lib/content";

export default function Services() {
  const reduceMotion = useReducedMotion();
  const anim = reduceMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.3 } };

  return (
    <section
      id="services"
      className="py-20 sm:py-28 bg-surface border-t border-slate-700/50"
      aria-labelledby="services-heading"
    >
      <div className="section-container">
        <motion.div
          {...anim}
          viewport={{ once: true, margin: "-40px" }}
          className="text-center max-w-xl mx-auto mb-12 sm:mb-14"
        >
          <h2
            id="services-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-white mb-3"
          >
            Simple packages
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Clear prices for local businesses. Pick a plan — we&apos;ll refine the details on a free call.
          </p>
          <p className="text-sm text-slate-500 mt-2">{pricingDeal.note}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {services.map((plan, i) => {
            const savings =
              plan.regularPrice != null ? plan.regularPrice - plan.price : 0;
            const percentOff =
              plan.regularPrice && savings > 0
                ? Math.round((savings / plan.regularPrice) * 100)
                : 0;

            return (
              <motion.article
                key={plan.name}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: reduceMotion ? 0.2 : 0.3,
                  delay: reduceMotion ? 0 : i * 0.06,
                }}
                className={`relative flex flex-col rounded-2xl border ${
                  plan.highlighted
                    ? "bg-surface-elevated border-brand-500"
                    : "bg-surface-elevated border-slate-700/60"
                }`}
              >
                {plan.highlighted && (
                  <div className="rounded-t-2xl bg-brand-500 text-center py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white">
                    Most popular
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6 sm:p-8">
                  <div className="mb-8">
                    <h3 className="font-display text-xl font-bold text-white">
                      {plan.name}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">{plan.tagline}</p>
                  </div>

                  {/* One clean price stack */}
                  <div className="mb-8">
                    <p className="flex items-end gap-1">
                      <span className="font-display text-4xl sm:text-[2.75rem] font-bold text-white leading-none tracking-tight tabular-nums">
                        ${plan.price.toLocaleString()}
                      </span>
                    </p>

                    {plan.regularPrice != null && percentOff > 0 && (
                      <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                        <span className="text-slate-500 line-through tabular-nums">
                          ${plan.regularPrice.toLocaleString()}
                        </span>
                        <span className="text-slate-600" aria-hidden>
                          ·
                        </span>
                        <span className="text-brand-400 font-medium tabular-nums">
                          {percentOff}% off
                        </span>
                        <span className="text-slate-600" aria-hidden>
                          ·
                        </span>
                        <span className="text-slate-400 tabular-nums">
                          save ${savings.toLocaleString()}
                        </span>
                      </p>
                    )}
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    {plan.description}
                  </p>

                  <ul className="space-y-2.5 mb-8 flex-1 border-t border-slate-700/50 pt-6">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-slate-300 text-sm"
                      >
                        <span className="text-brand-500 shrink-0 mt-0.5" aria-hidden>
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/#contact"
                    className={`block text-center rounded-full py-3 min-h-[48px] font-semibold text-sm transition-colors ${
                      plan.highlighted
                        ? "bg-brand-500 text-white hover:bg-brand-400"
                        : "border border-slate-600 text-white hover:border-brand-500 hover:text-brand-400"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Monthly care — separate from project packages */}
        <motion.div
          {...anim}
          viewport={{ once: true, margin: "-40px" }}
          className="mt-12 sm:mt-14 rounded-2xl border border-slate-700/60 bg-surface-elevated px-6 py-8 sm:px-10 sm:py-9"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-brand-400 text-xs font-semibold uppercase tracking-wide mb-2">
                Optional after launch
              </p>
              <h3 className="font-display text-2xl font-bold text-white">
                {careSubscription.name}
              </h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                {careSubscription.description}
              </p>
              <ul className="mt-5 grid sm:grid-cols-2 gap-2">
                {careSubscription.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-brand-500 shrink-0" aria-hidden>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 text-center lg:text-right">
              <p className="font-display text-4xl font-bold text-white tabular-nums">
                ${careSubscription.price}
                <span className="text-lg font-medium text-slate-500">/mo</span>
              </p>
              <p className="text-slate-500 text-sm mt-1">{careSubscription.tagline}</p>
              <Link
                href="/#contact"
                className="mt-5 inline-flex rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-400"
              >
                {careSubscription.cta}
              </Link>
            </div>
          </div>
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
