"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { faqs } from "@/lib/seo-content";

const vp = { once: true, margin: "-40px" as const };

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="faq"
      className="py-20 sm:py-28 bg-surface border-t border-slate-700/50"
      aria-labelledby="faq-heading"
    >
      <div className="section-container max-w-3xl mx-auto">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <h2
            id="faq-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Questions about hiring a web developer in Boston
          </h2>
          <p className="text-slate-400">
            Straight answers for local business owners ready to get found online.
          </p>
        </motion.div>

        <ul className="space-y-3">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <li
                key={item.question}
                className="rounded-2xl border border-slate-700/50 bg-surface-elevated overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full text-left px-5 py-4 min-h-[52px] flex items-center justify-between gap-4 text-white font-medium hover:text-brand-400 transition-colors"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span>{item.question}</span>
                  <span className="text-brand-400 shrink-0 text-xl leading-none" aria-hidden>
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && (
                  <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
