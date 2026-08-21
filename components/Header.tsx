"use client";

import { useState, useEffect, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getPhoneDisplay, getPhoneHref } from "@/lib/content";
import { homeHash, scrollToHash } from "@/lib/nav";

const desktopLinks = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "faq", label: "FAQ" },
];

const mobileLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "what-i-build", label: "What I build" },
  { id: "work", label: "Work" },
  { id: "areas", label: "Areas" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
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

  const goToSection = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const hash = `#${id}`;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";

    // Already on the homepage — scroll in place (Next won't re-navigate same path)
    if (pathname === "/") {
      e.preventDefault();
      setMobileOpen(false);
      document.body.style.overflow = "";
      window.history.pushState(null, "", hash);
      // Slight delay so mobile drawer unlocks overflow before scrolling
      window.setTimeout(() => scrollToHash(hash, behavior), mobileOpen ? 120 : 0);
      return;
    }

    // Other routes: let Link go to /#id; SmoothHashScroll handles the scroll
    setMobileOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/95 backdrop-blur-md py-3 shadow-lg border-b border-slate-800/50"
          : "py-4 sm:py-5"
      }`}
    >
      <nav className="section-container flex items-center justify-between gap-4">
        <Link
          href={homeHash("home")}
          onClick={(e) => goToSection(e, "home")}
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-white hover:text-brand-400 transition-colors duration-200 shrink-0 whitespace-nowrap"
          aria-label="Ahmad Nehela - Home"
        >
          A.N <span className="text-brand-400">Portfolio</span>
        </Link>

        <div className="hidden lg:flex items-center gap-3 xl:gap-4 min-w-0">
          <ul className="flex items-center gap-1">
            {desktopLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={homeHash(link.id)}
                  onClick={(e) => goToSection(e, link.id)}
                  className="inline-flex items-center whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5 xl:gap-3 pl-3 ml-1 border-l border-slate-700/80">
            {phoneHref && (
              <a
                href={phoneHref}
                className="hidden xl:inline-flex text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors whitespace-nowrap"
              >
                {phoneDisplay}
              </a>
            )}
            <Link
              href={homeHash("contact")}
              onClick={(e) => goToSection(e, "contact")}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-brand-500/60 px-3.5 py-2 text-sm font-semibold text-brand-400 hover:bg-brand-500/10 transition-all duration-200"
            >
              Book a call
            </Link>
            <Link
              href={homeHash("contact")}
              onClick={(e) => goToSection(e, "contact")}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400 transition-all duration-200 hover:scale-[1.02]"
            >
              Get a quote
            </Link>
          </div>
        </div>

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
            className="lg:hidden bg-surface-elevated border-t border-slate-800 max-h-[calc(100dvh-4rem)] overflow-y-auto"
          >
            <ul className="section-container flex flex-col py-4 gap-0.5">
              {mobileLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={homeHash(link.id)}
                    onClick={(e) => goToSection(e, link.id)}
                    className="block py-3 min-h-[44px] flex items-center text-slate-300 hover:text-white font-medium active:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {phoneHref && (
                <li>
                  <a
                    href={phoneHref}
                    className="block py-3 min-h-[44px] flex items-center text-brand-400 font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    Call {phoneDisplay}
                  </a>
                </li>
              )}
              <li className="pt-3 space-y-2">
                <Link
                  href={homeHash("contact")}
                  onClick={(e) => goToSection(e, "contact")}
                  className="block text-center rounded-full border border-brand-500/60 py-3.5 min-h-[48px] flex items-center justify-center text-brand-400 font-semibold whitespace-nowrap"
                >
                  Book a free call
                </Link>
                <Link
                  href={homeHash("contact")}
                  onClick={(e) => goToSection(e, "contact")}
                  className="block text-center rounded-full bg-brand-500 py-3.5 min-h-[48px] flex items-center justify-center text-white font-semibold whitespace-nowrap"
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
