import Link from "next/link";
import { site } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-surface pt-36 pb-20 sm:pt-44 sm:pb-28"
      aria-label="Introduction"
    >
      {/* Light visual on mobile; heavier orbs only from md up (blur is expensive on phones) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(192,138,52,0.16),transparent)]" />
        <div className="hero-orb absolute -top-24 left-[8%] hidden md:block h-[26rem] w-[26rem] rounded-full bg-gold-500/10 blur-[110px] animate-float" />
        <div
          className="hero-orb absolute top-10 right-[6%] hidden md:block h-[22rem] w-[22rem] rounded-full bg-sage-500/10 blur-[110px] animate-float"
          style={{ animationDelay: "-3.5s" }}
        />
        <div className="absolute inset-0 opacity-40 md:opacity-60 hero-pattern" />
        <div className="absolute inset-0 grain hidden md:block" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="eyebrow justify-center mb-7 hero-rise">
            <span className="h-px w-6 bg-gold-500/60" />
            Boston &amp; MetroWest · Free 15-min consult
            <span className="h-px w-6 bg-gold-500/60" />
          </div>

          <h1 className="hero-rise font-display text-[2.6rem] leading-[1.05] sm:text-6xl sm:leading-[1.05] md:text-7xl md:leading-[1.02] tracking-tightest text-paper mb-7">
            Websites that make your business the{" "}
            <span className="italic text-gold-400">obvious</span> choice.
          </h1>

          <p className="hero-rise max-w-xl mx-auto text-paper/60 text-base sm:text-lg leading-relaxed mb-3">
            {site.name} — custom sites, built and designed by {site.personName}, with SEO, WordPress, and
            analytics built in from day one.
          </p>

          <p className="hero-rise text-paper/40 text-sm mb-10">
            So the next neighbor who searches for what you do finds you first — and books.
          </p>

          <div className="hero-rise flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Link
              href="/#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 min-h-[48px] text-sm font-semibold text-surface transition-colors duration-200 hover:bg-gold-400 active:opacity-90"
            >
              Get a free quote
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/#work"
              className="inline-flex items-center justify-center rounded-full border border-line px-7 py-3.5 min-h-[48px] text-sm font-semibold text-paper/80 hover:border-gold-500/50 hover:text-gold-300 transition-colors duration-200"
            >
              View the work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
