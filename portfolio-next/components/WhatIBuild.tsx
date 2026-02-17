"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { websiteTypes } from "@/lib/content";

export default function WhatIBuild() {
  return (
    <section
      id="what-i-build"
      className="py-20 sm:py-28 bg-surface-elevated border-t border-slate-700/50"
      aria-labelledby="what-i-build-heading"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2
            id="what-i-build-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            What I build for you
          </h2>
          <p className="text-slate-400">
            Sites and web apps — from custom builds to WordPress and beyond. Choose what fits your business and budget.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {websiteTypes.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group rounded-2xl bg-surface border border-slate-700/50 p-6 card-hover hover:border-brand-500/40 min-w-0"
            >
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 min-h-[48px] text-sm font-semibold text-white hover:bg-brand-400 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
          >
            Tell me what you need
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
