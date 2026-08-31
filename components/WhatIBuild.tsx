"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { websiteTypes } from "@/lib/content";

export default function WhatIBuild() {
  return (
    <section
      id="what-i-build"
      className="py-24 sm:py-32 bg-surface border-t border-line"
      aria-labelledby="what-i-build-heading"
    >
      <div className="section-container">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow justify-center mb-4">Capabilities</p>
          <h2 id="what-i-build-heading" className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tightest text-paper mb-4">
            What I build for you.
          </h2>
          <p className="text-paper/55">
            Sites and web apps — from custom builds to WordPress and beyond. Choose what fits your business and budget.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {websiteTypes.map((item, i) => (
            <Reveal
              key={item.title}
              as="article"
              delayMs={i * 60}
              className={`group relative rounded-2xl bg-surface-elevated border border-line p-6 sm:p-7 card-hover hover:border-gold-500/40 min-w-0 overflow-hidden ${
                [
                  "lg:col-span-4",
                  "lg:col-span-2",
                  "lg:col-span-2",
                  "lg:col-span-4",
                  "lg:col-span-3",
                  "lg:col-span-3",
                ][i] ?? "lg:col-span-2"
              }`}
            >
              <span className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gold-500/[0.06] blur-2xl group-hover:bg-gold-500/[0.12] transition-all duration-500" aria-hidden />
              <span className="relative block font-display text-3xl text-gold-500/25 mb-4 group-hover:text-gold-500/50 transition-colors duration-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative font-display text-lg text-paper mb-2 group-hover:text-gold-300 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="relative text-paper/50 text-sm leading-relaxed">{item.description}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3.5 min-h-[48px] text-sm font-semibold text-surface transition-all duration-300 ease-premium hover:bg-gold-400 hover:scale-[1.03] active:scale-[0.98] touch-manipulation"
          >
            Tell me what you need
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
