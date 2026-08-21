"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getPhoneDisplay, getPhoneHref } from "@/lib/content";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#what-i-build", label: "What I build" },
  { href: "#work", label: "Work" },
  { href: "#areas", label: "Areas" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const phoneHref = getPhoneHref();
  const phoneDisplay = getPhoneDisplay();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-surface/95 backdrop-blur-md py-3 shadow-lg border-b border-slate-800/50" : "py-5"
      }`}
    >
      <nav className="section-container flex items-center justify-between gap-3">
        <Link
          href="#home"
          className="font-display text-xl font-bold tracking-tight text-white hover:text-brand-400 transition-colors duration-200 shrink-0"
          aria-label="Ahmad Nehela - Home"
        >
          A.N <span className="text-brand-400">Portfolio</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {phoneHref && (
            <li>
              <a
                href={phoneHref}
                className="text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors whitespace-nowrap"
              >
                {phoneDisplay}
              </a>
            </li>
          )}
          <li>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-brand-500/60 px-4 py-2 text-sm font-semibold text-brand-400 hover:bg-brand-500/10 transition-all duration-200"
            >
              Book a call
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-400 transition-all duration-200 hover:scale-[1.02]"
            >
              Get a quote
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-brand-400 active:text-brand-400 transition-colors -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-surface-elevated border-t border-slate-800"
          >
            <ul className="section-container flex flex-col py-4 gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3.5 min-h-[44px] flex items-center text-slate-300 hover:text-white font-medium active:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {phoneHref && (
                <li>
                  <a
                    href={phoneHref}
                    className="block py-3.5 min-h-[44px] flex items-center text-brand-400 font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    Call {phoneDisplay}
                  </a>
                </li>
              )}
              <li className="pt-2 space-y-2">
                <Link
                  href="#contact"
                  className="block text-center rounded-full border border-brand-500/60 py-3.5 min-h-[48px] flex items-center justify-center text-brand-400 font-semibold"
                  onClick={() => setMobileOpen(false)}
                >
                  Book a free call
                </Link>
                <Link
                  href="#contact"
                  className="block text-center rounded-full bg-brand-500 py-3.5 min-h-[48px] flex items-center justify-center text-white font-semibold"
                  onClick={() => setMobileOpen(false)}
                >
                  Get a quote
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
