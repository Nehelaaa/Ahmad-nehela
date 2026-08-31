"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { careSubscription, pricingDeal, services } from "@/lib/content";

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 sm:py-32 bg-surface border-t border-line"
      aria-labelledby="services-heading"
    >
      <div className="section-container">
        <Reveal className="text-center max-w-lg mx-auto mb-16">
          <p className="eyebrow justify-center mb-4">Pricing</p>
          <h2
            id="services-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tightest text-paper mb-4"
          >
            Simple, honest packages.
          </h2>
          <p className="text-paper/55 text-[15px] leading-relaxed">
            One clear project price. Site Care keeps it running after launch.
          </p>
          <p className="text-paper/35 text-sm mt-3">{pricingDeal.note}</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {services.map((plan, i) => {
            const savings = plan.regularPrice != null ? plan.regularPrice - plan.price : 0;

            return (
              <Reveal
                key={plan.name}
                as="article"
                delayMs={i * 80}
                className={`relative flex flex-col rounded-3xl p-7 sm:p-8 transition-all duration-500 ease-premium ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-surface-high to-surface-elevated ring-1 ring-gold-500/50 shadow-[0_0_60px_-20px_rgba(192,138,52,0.5)] md:-mt-3 md:mb-3 md:pt-9"
                    : "bg-surface-elevated ring-1 ring-line hover:ring-paper/15"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-surface">
                    Most popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-xl text-paper">{plan.name}</h3>
                  <p className="text-paper/45 text-sm mt-0.5">{plan.tagline}</p>
                </div>

                <div className="mb-6 pb-6 border-b border-line">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-display text-5xl text-paper leading-none tracking-tightest tabular-nums">
                      ${plan.price.toLocaleString()}
                    </span>
                    {plan.regularPrice != null && savings > 0 && (
                      <span className="text-paper/30 text-sm line-through tabular-nums">
                        ${plan.regularPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="mt-2.5 text-sm text-paper/45">
                    then{" "}
                    <span className="text-gold-400 font-medium tabular-nums">
                      ${careSubscription.price}/mo
                    </span>{" "}
                    Site Care
                  </p>
                </div>

                <p className="text-paper/55 text-sm leading-relaxed mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-paper/70 text-sm leading-snug">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-500" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/#contact"
                  className={`block text-center rounded-full py-3.5 min-h-[48px] font-semibold text-sm transition-all duration-300 ease-premium ${
                    plan.highlighted
                      ? "bg-gold-500 text-surface hover:bg-gold-400 hover:scale-[1.02]"
                      : "bg-white/[0.04] text-paper hover:bg-white/[0.08] ring-1 ring-line"
                  }`}
                >
                  {plan.cta}
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 rounded-3xl ring-1 ring-line bg-surface-elevated/60 px-6 py-9 sm:px-9">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7">
            <div>
              <p className="eyebrow mb-2">Included with every plan</p>
              <h3 className="font-display text-2xl text-paper">
                Site Care — ${careSubscription.price}/mo
              </h3>
            </div>
            <p className="text-sm text-paper/50 max-w-sm sm:text-right">
              {careSubscription.description}
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
            {careSubscription.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-paper/65">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-500" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="text-center text-paper/45 text-sm mt-10">
          Not sure which fits?{" "}
          <Link href="/#contact" className="text-gold-400 hover:text-gold-300 font-medium">
            Get a free quote
          </Link>
        </p>
      </div>
    </section>
  );
}
