"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

/** ~5s: long enough to read a card, short enough to feel alive on mobile */
const SLIDE_INTERVAL_MS = 5000;

function cardsPerSlideForWidth(width: number) {
  if (width >= 1024) return 4;
  if (width >= 640) return 2;
  return 1;
}

export default function Work() {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [slideIndex, setSlideIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [cardsPerSlide, setCardsPerSlide] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sync = () => {
      setCardsPerSlide(cardsPerSlideForWidth(window.innerWidth));
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const totalSlides = Math.max(1, Math.ceil(projects.length / cardsPerSlide));
  const slides = Array.from({ length: totalSlides }, (_, i) =>
    projects.slice(i * cardsPerSlide, (i + 1) * cardsPerSlide)
  );

  useEffect(() => {
    setSlideIndex((prev) => Math.min(prev, totalSlides - 1));
  }, [totalSlides]);

  useEffect(() => {
    if (totalSlides <= 1 || paused || reduceMotion) return;
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
  }, [totalSlides, paused, reduceMotion]);

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
      className="py-24 sm:py-32 bg-surface-elevated border-t border-line content-auto"
      aria-labelledby="work-heading"
    >
      <div className="section-container">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: reduceMotion ? 0.2 : 0.5, ease }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <p className="eyebrow justify-center mb-4">Selected work</p>
          <h2
            id="work-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tightest text-paper mb-4"
          >
            {projects.length}+ real projects, live today.
          </h2>
          <p className="text-paper/55 px-1">
            From education and healthcare to local business and e‑commerce — every project below is a
            real, deployed client site.
          </p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setPaused(false);
            }
          }}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => {
            window.setTimeout(() => setPaused(false), 4000);
          }}
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex items-start"
              animate={{ x: `${-slideIndex * 100}%` }}
              transition={{
                type: "tween",
                duration: reduceMotion ? 0 : transitionEnabled ? 0.55 : 0,
                ease: "easeInOut",
              }}
            >
              {slides.map((slideProjects, slideIdx) => {
                // Only mount nearby slides so mobile doesn't download 20+ images upfront
                const shouldLoad = Math.abs(slideIdx - slideIndex) <= 1;
                return (
                  <div
                    key={slideIdx}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 flex-shrink-0 w-full items-start"
                  >
                    {shouldLoad
                      ? slideProjects.map((project, cardIdx) => (
                          <a
                            key={project.title}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block h-fit rounded-2xl overflow-hidden bg-surface border border-line hover:border-gold-500/40 transition-all duration-500 ease-premium card-hover touch-manipulation"
                          >
                            <div className="aspect-video relative shrink-0 bg-surface-high overflow-hidden">
                              {!failedImages.has(project.image) ? (
                                <Image
                                  src={project.image}
                                  alt={`${project.title} - project by Top Web Developer`}
                                  fill
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                  loading={
                                    slideIdx === slideIndex && cardIdx === 0 ? "eager" : "lazy"
                                  }
                                  quality={70}
                                  className="object-cover object-center transition-transform duration-700 ease-premium group-hover:scale-105"
                                  onError={() =>
                                    setFailedImages((prev) => new Set(prev).add(project.image))
                                  }
                                />
                              ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-gold-900/40 to-surface-high flex items-center justify-center p-4">
                                  <span className="text-gold-400 font-display text-center text-sm sm:text-base">
                                    {project.title}
                                  </span>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-surface/80 backdrop-blur-sm ring-1 ring-white/10 text-paper text-[11px] font-medium tracking-wide">
                                {project.category}
                              </span>
                            </div>
                            <div className="p-4">
                              <h3 className="font-display text-paper group-hover:text-gold-300 transition-colors">
                                {project.title}
                              </h3>
                              <p className="text-paper/45 text-sm mt-1 line-clamp-2 leading-snug">
                                {project.description}
                              </p>
                            </div>
                          </a>
                        ))
                      : // Keep slide width without loading images
                        Array.from({ length: slideProjects.length || cardsPerSlide }).map((_, i) => (
                          <div
                            key={`placeholder-${slideIdx}-${i}`}
                            className="rounded-2xl overflow-hidden bg-surface border border-line"
                            aria-hidden
                          >
                            <div className="aspect-video bg-surface-high" />
                            <div className="p-4 h-[4.5rem]" />
                          </div>
                        ))}
                  </div>
                );
              })}
            </motion.div>
          </div>

          {totalSlides > 1 && (
            <div className="flex justify-center items-center gap-1 mt-8 flex-wrap px-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-200 touch-manipulation min-w-[44px] min-h-[44px] inline-flex items-center justify-center ${
                    i === slideIndex ? "text-gold-400" : "text-paper/25"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === slideIndex ? "true" : undefined}
                >
                  <span
                    className={`rounded-full transition-all duration-300 ${
                      i === slideIndex ? "bg-gold-500 w-6 h-1.5" : "bg-paper/20 w-1.5 h-1.5"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
