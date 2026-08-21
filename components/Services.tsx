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
          <p className="text-slate-400 leading-relaxed mb-3">
            Clear prices for local businesses. Pick a plan — we&apos;ll refine the details on a free call.
          </p>
          <p className="text-sm text-slate-500">{pricingDeal.note}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {services.map((plan, i) => {
            const savings =
              plan.regularPrice != null ? plan.regularPrice - plan.price : 0;

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
                className={`relative flex flex-col rounded-2xl p-6 sm:p-7 border text-left ${
                  plan.highlighted
                    ? "bg-surface-elevated border-brand-500/60 shadow-[0_0_0_1px_rgba(245,158,11,0.15)]"
                    : "bg-surface-elevated/80 border-slate-700/60"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-md bg-brand-500 text-white text-[11px] font-semibold tracking-wide">
                    Most popular
                  </span>
                )}

                <div className="mb-5">
                  <h3 className="font-display text-xl font-bold text-white">
                    {plan.name}
                  </h3>
                  <p className="text-slate-500 text-sm mt-0.5">{plan.tagline}</p>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    {plan.regularPrice != null && (
                      <span className="text-slate-500 line-through text-sm">
                        ${plan.regularPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-white tracking-tight">
                      ${plan.price.toLocaleString()}
                    </span>
                  </div>
                  {savings > 0 && (
                    <p className="text-slate-500 text-sm mt-1.5">
                      Save ${savings.toLocaleString()}
                    </p>
                  )}
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
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
