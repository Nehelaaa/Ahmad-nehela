"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { faqs } from "@/lib/seo-content";

const vp = { once: true, margin: "-40px" as const };
const ease = [0.16, 1, 0.3, 1] as const;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="faq"
      className="py-24 sm:py-32 bg-surface border-t border-line"
      aria-labelledby="faq-heading"
    >
      <div className="section-container max-w-3xl mx-auto">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, ease }}
          className="text-center mb-14"
        >
          <p className="eyebrow justify-center mb-4">FAQ</p>
          <h2 id="faq-heading" className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tightest text-paper mb-4">
            Questions about hiring a web developer in Boston.
          </h2>
          <p className="text-paper/55">
            Straight answers for local business owners ready to get found online.
          </p>
        </motion.div>

        <ul className="space-y-3">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <motion.li
                key={item.question}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.4, ease, delay: reduceMotion ? 0 : i * 0.03 }}
                className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${
                  open ? "border-gold-500/40 bg-surface-elevated" : "border-line bg-surface-elevated/60"
                }`}
              >
                <button
                  type="button"
                  className="w-full text-left px-5 py-4 min-h-[52px] flex items-center justify-between gap-4 text-paper font-medium hover:text-gold-300 transition-colors"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span>{item.question}</span>
                  <span
                    className={`text-gold-400 shrink-0 text-xl leading-none transition-transform duration-300 ${
                      open ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                {open && (
                  <div className="px-5 pb-5 text-paper/55 text-sm leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
