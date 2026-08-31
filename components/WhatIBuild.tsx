import Link from "next/link";
import { websiteTypes } from "@/lib/content";

export default function WhatIBuild() {
  return (
    <section
      id="what-i-build"
      className="section-defer py-24 sm:py-32 bg-surface border-t border-line"
      aria-labelledby="what-i-build-heading"
    >
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow justify-center mb-4">Capabilities</p>
          <h2 id="what-i-build-heading" className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tightest text-paper mb-4">
            What I build for you.
          </h2>
          <p className="text-paper/55">
            Sites and web apps — from custom builds to WordPress and beyond. Choose what fits your business and budget.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {websiteTypes.map((item, i) => (
            <article
              key={item.title}
              className={`group relative rounded-2xl bg-surface-elevated border border-line p-6 sm:p-7 hover:border-gold-500/40 min-w-0 overflow-hidden transition-colors duration-300 ${
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
              <span className="relative block font-display text-3xl text-gold-500/25 mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative font-display text-lg text-paper mb-2 group-hover:text-gold-300 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="relative text-paper/50 text-sm leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3.5 min-h-[48px] text-sm font-semibold text-surface transition-colors duration-200 hover:bg-gold-400 touch-manipulation"
          >
            Tell me what you need
          </Link>
        </div>
      </div>
    </section>
  );
}
