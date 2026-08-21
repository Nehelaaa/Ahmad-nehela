"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToHash } from "@/lib/nav";

/**
 * After client navigations to /#section (e.g. from SEO pages),
 * Next.js often skips scrolling — this finishes the job.
 */
export default function SmoothHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";

    const t = window.setTimeout(() => scrollToHash(hash, behavior), 80);
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      scrollToHash(window.location.hash, reduced ? "auto" : "smooth");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
