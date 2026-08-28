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

  // Close drawer if viewport grows to desktop nav
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const goToSection = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const hash = `#${id}`;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wasOpen = mobileOpen;
    // Instant scroll after closing the drawer so the target lands under the fixed header
    const behavior: ScrollBehavior = reduced || wasOpen ? "auto" : "smooth";

    if (pathname === "/") {
      e.preventDefault();
      setMobileOpen(false);
      document.body.style.overflow = "";
      window.history.pushState(null, "", hash);
      window.setTimeout(() => scrollToHash(hash, behavior), wasOpen ? 280 : 0);
      return;
    }

    setMobileOpen(false);
    document.body.style.overflow = "";
  };

  const headerSolid = scrolled || mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-premium ${
        headerSolid
          ? "bg-surface/85 backdrop-blur-xl py-3 border-b border-line"
          : "py-5 sm:py-6"
      }`}
    >
      <nav className="section-container flex items-center justify-between gap-3">
        <Link
          href={homeHash("home")}
          onClick={(e) => goToSection(e, "home")}
          className="group font-display text-lg sm:text-xl tracking-tight text-paper shrink-0 whitespace-nowrap"
          aria-label="Top Web Developer - Home"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold-400 mr-2 -translate-y-px" aria-hidden />
          Top Web{" "}
          <span className="italic text-gold-400 group-hover:text-gold-300 transition-colors">
            Developer
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-3 xl:gap-4 min-w-0">
          <ul className="flex items-center gap-1">
            {desktopLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={homeHash(link.id)}
                  onClick={(e) => goToSection(e, link.id)}
                  className="inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-medium tracking-wide text-paper/60 hover:text-paper hover:bg-white/5 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5 xl:gap-3 pl-3 ml-1 border-l border-line">
            {phoneHref && (
              <a
                href={phoneHref}
                className="hidden xl:inline-flex text-[13px] font-medium text-paper/70 hover:text-gold-300 transition-colors whitespace-nowrap"
              >
                {phoneDisplay}
              </a>
            )}
            <Link
              href={homeHash("contact")}
              onClick={(e) => goToSection(e, "contact")}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-line px-4 py-2 text-[13px] font-semibold text-paper/80 hover:border-gold-500/60 hover:text-gold-300 transition-all duration-200"
            >
              Book a call
            </Link>
            <Link
              href={homeHash("contact")}
              onClick={(e) => goToSection(e, "contact")}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-gold-500 px-4 py-2 text-[13px] font-semibold text-surface hover:bg-gold-400 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Get a quote
            </Link>
          </div>
        </div>

        <div className="flex lg:hidden items-center gap-1.5 shrink-0">
          {phoneHref && (
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full text-gold-300 hover:bg-gold-500/10 text-sm font-semibold px-2"
              aria-label={`Call ${phoneDisplay}`}
            >
              Call
            </a>
          )}
          <Link
            href={homeHash("contact")}
            onClick={(e) => goToSection(e, "contact")}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-gold-500 px-3.5 py-2 min-h-[40px] text-sm font-semibold text-surface hover:bg-gold-400"
          >
            Quote
          </Link>
          <button
            type="button"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-paper hover:text-gold-300 active:text-gold-300 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
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
                  strokeWidth={1.75}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-surface border-t border-line max-h-[min(70dvh,calc(100dvh-4.5rem))] overflow-y-auto overscroll-contain"
          >
            <ul className="section-container flex flex-col py-3 gap-0.5 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {mobileLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={homeHash(link.id)}
                    onClick={(e) => goToSection(e, link.id)}
                    className="block py-3.5 min-h-[48px] flex items-center text-paper/75 hover:text-paper font-medium active:text-paper text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {phoneHref && (
                <li>
                  <a
                    href={phoneHref}
                    className="block py-3.5 min-h-[48px] flex items-center text-gold-300 font-medium text-base"
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
                  className="block text-center rounded-full border border-line py-3.5 min-h-[48px] flex items-center justify-center text-paper font-semibold whitespace-nowrap"
                >
                  Book a free call
                </Link>
                <Link
                  href={homeHash("contact")}
                  onClick={(e) => goToSection(e, "contact")}
                  className="block text-center rounded-full bg-gold-500 py-3.5 min-h-[48px] flex items-center justify-center text-surface font-semibold whitespace-nowrap"
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
