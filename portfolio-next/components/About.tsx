"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/content";

const highlights = [
  { title: "More traffic", line: "SEO so you show up when customers search." },
  { title: "Local reach", line: "Google Business & local SEO for nearby customers." },
  { title: "Clear data", line: "Analytics so you see what works and grow." },
  { title: "Paid that converts", line: "Google Ads & landing pages that turn clicks into leads." },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-surface-elevated border-t border-slate-700/50"
      aria-labelledby="about-heading"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-14"
        >
          <h2
            id="about-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-white mb-3"
          >
            About me
          </h2>
          <p className="text-brand-400 font-medium">
            {site.name} — freelance web developer & designer, Boston MA
          </p>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            {site.yearsExperience}+ years building sites that get traffic, reach local customers, and give you the data to grow.
          </p>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            I work with small businesses, nonprofits, and local companies — from idea to launch, with clear communication and a focus on results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group rounded-xl bg-surface border border-slate-700/50 p-5 hover:border-brand-500/40 transition-all duration-200"
            >
              <p className="font-display font-bold text-white text-base mb-1.5">
                {item.title}
              </p>
              <p className="text-slate-400 text-sm leading-snug">
                {item.line}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 text-sm mt-8"
        >
          From landing pages to full sites — built to perform.
        </motion.p>
      </div>
    </section>
  );
}
