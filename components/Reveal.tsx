"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay once the element enters view (ms). */
  delayMs?: number;
  as?: ElementType;
};

/**
 * Scroll reveal that never blanks the page on first paint.
 * SSR + pre-JS: fully visible. After mount, off-screen elements
 * may animate in; in-view elements stay visible.
 */
export default function Reveal({
  children,
  className = "",
  delayMs = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [enhance, setEnhance] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setEnhance(true);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      setEnhance(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    if (rect.top < vh * 0.94 && rect.bottom > vh * 0.02) {
      setShown(true);
      setEnhance(true);
      return;
    }

    setEnhance(true);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stateClass = !enhance || shown ? "reveal-shown" : "reveal-pending";
  const style: CSSProperties | undefined =
    delayMs > 0 && shown ? { transitionDelay: `${delayMs}ms` } : undefined;

  return (
    <Tag ref={ref} className={`reveal ${stateClass} ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}
