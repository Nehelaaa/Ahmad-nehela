"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { areasServed } from "@/lib/seo-content";
import { site } from "@/lib/content";

const vp = { once: true, margin: "-40px" as const };

export default function LocalSeo() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="areas"
      className="py-20 sm:py-28 bg-surface-elevated border-t border-slate-700/50"
      aria-labelledby="areas-heading"
    >
      <div className="section-container">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.3 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2
            id="areas-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Web design &amp; development across {site.serviceArea}
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Local businesses hire me to get found on Google, look professional online, and turn visitors into calls and bookings. Based in Boston — serving nearby cities and towns.
          </p>
        </motion.div>

        <ul className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {areasServed.map((area) => (
            <li
              key={area}
              className="rounded-full border border-slate-700/60 bg-surface px-4 py-2 text-sm text-slate-300"
            >
              {area}
            </li>
          ))}
        </ul>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            {
              href: "/web-developer-boston",
              label: "Web developer Boston",
            },
            {
              href: "/website-designer-boston",
              label: "Website designer Boston",
            },
            {
              href: "/small-business-website-boston",
              label: "Small business websites",
            },
            {
              href: "/wordpress-developer-boston",
              label: "WordPress developer Boston",
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-slate-700/50 bg-surface p-5 text-center text-sm font-semibold text-white hover:border-brand-500 hover:text-brand-400 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
