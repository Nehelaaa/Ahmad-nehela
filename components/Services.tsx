"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { pricingDeal, services } from "@/lib/content";

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
                className={`relative flex flex-col rounded-2xl border overflow-hidden ${
                  plan.highlighted
                    ? "bg-surface-elevated border-brand-500"
                    : "bg-surface-elevated border-slate-700/60"
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-brand-500 text-center py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white">
                    Most popular
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6 sm:p-7">
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-3 mb-6 min-h-[3.25rem]">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white leading-tight">
                        {plan.name}
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">{plan.tagline}</p>
                    </div>
                    {percentOff > 0 && (
                      <span className="shrink-0 rounded-md bg-brand-500/15 text-brand-400 text-xs font-bold px-2 py-1 tabular-nums">
                        −{percentOff}%
                      </span>
                    )}
                  </div>

                  {/* Locked price block — same structure on every card */}
                  <div className="mb-6 pb-6 border-b border-slate-700/60">
                    <p className="text-slate-500 text-sm h-5">
                      {plan.regularPrice != null ? (
                        <>
                          Was{" "}
                          <span className="line-through tabular-nums">
                            ${plan.regularPrice.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="invisible">Was</span>
                      )}
                    </p>
                    <p className="mt-1 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white tracking-tight tabular-nums leading-none">
                        ${plan.price.toLocaleString()}
                      </span>
                    </p>
                    <p className="mt-2 text-brand-400 text-sm font-semibold h-5 tabular-nums">
                      {savings > 0 ? (
                        <>You save ${savings.toLocaleString()}</>
                      ) : (
                        <span className="invisible">You save</span>
                      )}
                    </p>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 min-h-[2.75rem]">
                    {plan.description}
                  </p>

                  <ul className="space-y-2.5 mb-8 flex-1">
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
