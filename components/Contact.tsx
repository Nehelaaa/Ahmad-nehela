"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  getPhoneDisplay,
  getPhoneHref,
  site,
  services,
} from "@/lib/content";

const vp = { once: true, margin: "-40px" as const };

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const reduceMotion = useReducedMotion();
  const phoneHref = getPhoneHref();
  const phoneDisplay = getPhoneDisplay();

  const animLeft = reduceMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, x: -24 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.3 } };
  const animRight = reduceMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, x: 24 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.3 } };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setStatus("done");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-surface-elevated border-t border-slate-700/50"
      aria-labelledby="contact-heading"
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div {...animLeft} viewport={vp}>
            <h2
              id="contact-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              Book a call or get a quote
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Free 15‑minute consult — tell me your goals and I&apos;ll follow up with a clear plan. No obligation. Serving {site.serviceArea}.
            </p>

            {phoneHref && (
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3.5 min-h-[48px] text-sm font-semibold text-white hover:bg-brand-400 transition-all mb-8"
              >
                Call {phoneDisplay}
              </a>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-brand-500 text-xl" aria-hidden>
                  →
                </span>
                <div>
                  <p className="text-slate-500 text-sm">Name</p>
                  <p className="text-white font-medium">{site.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-brand-500 text-xl" aria-hidden>
                  →
                </span>
                <div>
                  <p className="text-slate-500 text-sm">Service area</p>
                  <p className="text-white font-medium">{site.serviceArea}</p>
                </div>
              </div>
              {phoneHref && (
                <div className="flex items-center gap-4">
                  <span className="text-brand-500 text-xl" aria-hidden>
                    →
                  </span>
                  <div>
                    <p className="text-slate-500 text-sm">Phone</p>
                    <a
                      href={phoneHref}
                      className="text-brand-400 hover:text-brand-300 font-medium"
                    >
                      {phoneDisplay}
                    </a>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4">
                <span className="text-brand-500 text-xl" aria-hidden>
                  →
                </span>
                <div>
                  <p className="text-slate-500 text-sm">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-brand-400 hover:text-brand-300 font-medium break-all"
                  >
                    {site.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...animRight} viewport={vp} className="rounded-2xl bg-surface border border-slate-700/50 p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold text-white mb-2">
              Send a message
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Choose book a call or get a quote below. I typically reply within one business day.
            </p>

            {status === "done" ? (
              <div className="rounded-xl bg-brand-500/10 border border-brand-500/30 p-6 text-center">
                <p className="text-brand-400 font-semibold mb-2">
                  Thank you for reaching out!
                </p>
                <p className="text-slate-400 text-sm">
                  I&apos;ll get back to you as soon as I can — usually within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                name="contact"
                method="POST"
                className="space-y-5"
              >
                <div className="hidden" aria-hidden>
                  <label>
                    Don’t fill this out: <input name="bot" />
                  </label>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <label className="block">
                    <span className="sr-only">Name</span>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full rounded-xl border border-slate-600 bg-surface px-4 py-3.5 text-base text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </label>
                  <label className="block">
                    <span className="sr-only">Email</span>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email"
                      className="w-full rounded-xl border border-slate-600 bg-surface px-4 py-3.5 text-base text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="sr-only">Phone (optional)</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone (optional — for a call back)"
                    className="w-full rounded-xl border border-slate-600 bg-surface px-4 py-3.5 text-base text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Business name</span>
                  <input
                    type="text"
                    name="businessName"
                    placeholder="Business name"
                    className="w-full rounded-xl border border-slate-600 bg-surface px-4 py-3.5 text-base text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </label>
                <label className="block">
                  <span className="sr-only">What do you need?</span>
                  <select
                    name="preferredContact"
                    required
                    className="w-full rounded-xl border border-slate-600 bg-surface px-4 py-3.5 text-base text-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 appearance-none bg-no-repeat bg-[length:1.25rem] bg-[right_0.75rem_center] pr-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                    }}
                    defaultValue="call"
                  >
                    <option value="call">Book a free call</option>
                    <option value="email">Get a quote</option>
                    <option value="either">Either — call or quote</option>
                  </select>
                </label>
                <label className="block">
                  <span className="sr-only">Plan</span>
                  <select
                    name="plan"
                    className="w-full rounded-xl border border-slate-600 bg-surface px-4 py-3.5 text-base text-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 appearance-none bg-no-repeat bg-[length:1.25rem] bg-[right_0.75rem_center] pr-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                    }}
                  >
                    <option value="">Select a plan (optional)</option>
                    {services.map((plan) => (
                      <option key={plan.name} value={`${plan.name} — $${plan.price.toLocaleString()} + $59/mo care`}>
                        {plan.name} — ${plan.price.toLocaleString()} + $59/mo care
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="sr-only">Subject</span>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="Subject (e.g. New business website)"
                    className="w-full rounded-xl border border-slate-600 bg-surface px-4 py-3.5 text-base text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Message</span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project, timeline, and goals..."
                    className="w-full rounded-xl border border-slate-600 bg-surface px-4 py-3.5 text-base text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 resize-none"
                  />
                </label>
                {status === "error" && (
                  <p className="text-red-400 text-sm">
                    Something went wrong. Please email me directly at{" "}
                    <a href={`mailto:${site.email}`} className="underline">
                      {site.email}
                    </a>
                    {" "}or call{" "}
                    {phoneHref ? (
                      <a href={phoneHref} className="underline">
                        {phoneDisplay}
                      </a>
                    ) : (
                      "me"
                    )}
                    .
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full bg-brand-500 py-4 min-h-[48px] font-semibold text-white hover:bg-brand-400 disabled:opacity-60 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] touch-manipulation"
                >
                  {status === "sending" ? "Sending..." : "Submit"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
