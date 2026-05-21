"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/content";

/** Desktop/tablet only — auto-advance is off on small screens so links are easy to tap. */
const SLIDE_INTERVAL_MS = 8000;
const CARDS_PER_SLIDE = 4;

export default function Work() {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [slideIndex, setSlideIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(false);
  const reduceMotion = useReducedMotion();

  // Match Tailwind `sm` — no auto carousel on phones (dots still work).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setAutoAdvanceEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const totalSlides = Math.ceil(projects.length / CARDS_PER_SLIDE);
  const slides = Array.from({ length: totalSlides }, (_, i) =>
    projects.slice(i * CARDS_PER_SLIDE, (i + 1) * CARDS_PER_SLIDE)
  );

  // Auto-advance on sm+ only — on mobile, slides stay put until the user uses the dots.
  useEffect(() => {
    if (totalSlides <= 1 || !autoAdvanceEnabled) return;
    const t = setInterval(() => {
      setSlideIndex((prev) => {
        if (prev === totalSlides - 1) {
          setTransitionEnabled(false);
          return 0;
        }
        return prev + 1;
      });
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(t);
  }, [totalSlides, autoAdvanceEnabled]);

  // Re-enable transition after instant reset
  useEffect(() => {
    if (!transitionEnabled) {
      const id = requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
      return () => cancelAnimationFrame(id);
    }
  }, [transitionEnabled]);

  const goTo = (index: number) => {
    setSlideIndex(Math.max(0, Math.min(index, totalSlides - 1)));
  };

  return (
    <section
      id="work"
      className="py-20 sm:py-28 bg-surface border-t border-slate-700/50"
      aria-labelledby="work-heading"
    >
      <div className="section-container">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: reduceMotion ? 0.2 : 0.3 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2
            id="work-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Web design and development projects
          </h2>
          <p className="text-slate-400">
            From education and healthcare to local business and e‑commerce: a selection of recent projects.
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex items-start"
              animate={{ x: `${-slideIndex * 100}%` }}
              transition={{
                type: "tween",
                duration: reduceMotion ? 0 : transitionEnabled ? 0.5 : 0,
                ease: "easeInOut",
              }}
            >
              {slides.map((slideProjects, slideIdx) => (
                <div
                  key={slideIdx}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-shrink-0 w-full items-start"
                >
                  {slideProjects.map((project) => (
                    <a
                      key={project.title}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-fit rounded-2xl overflow-hidden bg-surface-elevated border border-slate-700/50 hover:border-brand-500/50 transition-all duration-300 card-hover hover:shadow-xl hover:shadow-brand-500/10 touch-manipulation"
                    >
                      <div className="aspect-video relative shrink-0 bg-slate-800 overflow-hidden">
                        {!failedImages.has(project.image) ? (
                          <Image
                            src={project.image}
                            alt={`${project.title} - project by Ahmad Nehela`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className={
                              "thumbnailFit" in project && project.thumbnailFit === "contain"
                                ? "object-contain object-center p-8 sm:p-10 transition-transform duration-500 group-hover:scale-105"
                                : "object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            }
                            onError={() =>
                              setFailedImages((prev) =>
                                new Set(prev).add(project.image)
                              )
                            }
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 to-slate-700 flex items-center justify-center p-4">
                            <span className="text-brand-400 font-display font-bold text-center text-sm sm:text-base">
                              {project.title}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-brand-500/90 text-white text-xs font-medium">
                          {project.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-semibold text-white group-hover:text-brand-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-slate-500 text-sm mt-1 line-clamp-2 leading-snug">
                          {project.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {totalSlides > 1 && (
            <div className="flex justify-center gap-1.5 mt-6">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-200 touch-manipulation p-2 ${
                    i === slideIndex
                      ? "bg-brand-500 w-5 h-2"
                      : "bg-slate-600 hover:bg-slate-500 active:bg-slate-500 w-2 h-2"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
