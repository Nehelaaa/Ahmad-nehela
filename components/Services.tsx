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
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-wide mb-3">
            New client deals · Clear savings
          </p>
          <h2
            id="services-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Pricing built for local businesses
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Real discounts for first-time clients — not vague “ask for a quote” pricing. Pick a package, split payments if you want, and we&apos;ll map the rest on a free call.
          </p>
        </motion.div>

        <motion.div
          {...anim}
          viewport={{ once: true, margin: "-40px" }}
          className="mb-10 rounded-2xl border border-brand-500/40 bg-gradient-to-br from-brand-500/15 via-brand-500/5 to-transparent px-5 py-6 sm:px-8 sm:py-7 text-center"
        >
          <span className="inline-block rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white mb-3">
            {pricingDeal.badge}
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
            {pricingDeal.headline}
          </h3>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-5 leading-relaxed">
            {pricingDeal.subcopy}
          </p>
          <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4 text-sm text-slate-300">
            {pricingDeal.perks.map((perk) => (
              <li
                key={perk}
                className="inline-flex items-center justify-center gap-1.5"
              >
                <span className="text-brand-400">✓</span>
                {perk}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((plan, i) => {
            const savings =
              "regularPrice" in plan && plan.regularPrice != null
                ? plan.regularPrice - plan.price
                : 0;

            return (
              <motion.article
                key={plan.name}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: reduceMotion ? 0.2 : 0.3, delay: reduceMotion ? 0 : i * 0.08 }}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col border transition-all duration-300 card-hover text-center md:text-left ${
                  plan.highlighted
                    ? "bg-brand-500/10 border-brand-500/50 ring-2 ring-brand-500/20 hover:shadow-brand-500/15 md:scale-[1.02]"
                    : "bg-surface-elevated border-slate-700/50 hover:border-slate-600"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-brand-500 text-white text-xs font-semibold shadow-lg whitespace-nowrap">
                    Most popular · biggest value
                  </span>
                )}
                <p className="text-brand-400/90 text-xs font-semibold uppercase tracking-wide mb-2">
                  {plan.tagline}
                </p>
                <h3 className="font-display text-2xl font-bold text-white mb-1">
                  {plan.name}
                </h3>
                <div className="mb-3">
                  {"regularPrice" in plan && plan.regularPrice != null && (
                    <p className="text-slate-500 line-through text-base font-medium">
                      ${plan.regularPrice.toLocaleString()}
                    </p>
                  )}
                  <p className="text-3xl sm:text-4xl font-bold text-brand-400">
                    ${plan.price.toLocaleString()}
                  </p>
                  {savings > 0 && (
                    <p className="text-emerald-400 text-sm font-semibold mt-1">
                      You save ${savings.toLocaleString()}
                    </p>
                  )}
                  <p className="text-slate-500 text-xs mt-1">one-time · 50/50 payment plan OK</p>
                  {"promoLabel" in plan && plan.promoLabel && (
                    <span className="inline-block mt-2 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
                      {plan.promoLabel}
                    </span>
                  )}
                </div>
                {"bonus" in plan && plan.bonus && (
                  <p className="mb-4 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-xs sm:text-sm text-emerald-300 leading-snug">
                    Deal bonus: {plan.bonus}
                  </p>
                )}
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">{plan.description}</p>
                <ul className="space-y-3 mb-8 flex-1 flex flex-col items-center md:items-start">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-slate-300 text-sm w-full justify-center md:justify-start text-left"
                    >
                      <span className="text-brand-500 shrink-0 mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#contact"
                  className={`block text-center rounded-full py-3.5 min-h-[48px] font-semibold transition-all whitespace-nowrap ${
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

        <p className="text-center text-slate-500 text-sm mt-10 max-w-xl mx-auto leading-relaxed">
          Mention you saw the <span className="text-slate-400">new client offer</span> when you reach out.{" "}
          <Link href="/#contact" className="text-brand-400 hover:text-brand-300 font-medium">
            Book a free call or get a quote
          </Link>{" "}
          — I&apos;ll lock in the deal that fits your business.
        </p>
      </div>
    </section>
  );
}
