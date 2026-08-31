"use client";

import { useState } from "react";
import { faqs } from "@/lib/seo-content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section-defer py-24 sm:py-32 bg-surface border-t border-line"
      aria-labelledby="faq-heading"
    >
      <div className="section-container max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="eyebrow justify-center mb-4">FAQ</p>
          <h2 id="faq-heading" className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tightest text-paper mb-4">
            Questions about hiring a web developer in Boston.
          </h2>
          <p className="text-paper/55">
            Straight answers for local business owners ready to get found online.
          </p>
        </div>

        <ul className="space-y-3">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <li
                key={item.question}
                className={`rounded-2xl border overflow-hidden transition-colors duration-200 ${
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
                    className={`text-gold-400 shrink-0 text-xl leading-none transition-transform duration-200 ${
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
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
