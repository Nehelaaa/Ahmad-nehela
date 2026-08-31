import { site, projects } from "@/lib/content";

const highlights = [
  { title: "More traffic", line: "SEO so you show up when customers search." },
  { title: "Local reach", line: "Google Business & local SEO for nearby customers." },
  { title: "Clear data", line: "Analytics so you see what works and grow." },
  { title: "Paid that converts", line: "Google Ads & landing pages that turn clicks into leads." },
];

const categories = Array.from(new Set(projects.map((p) => p.category)));
const marqueeItems = [...categories, ...categories];

export default function About() {
  return (
    <section
      id="about"
      className="section-defer py-24 sm:py-32 bg-surface-elevated border-t border-line"
      aria-labelledby="about-heading"
    >
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow justify-center mb-4">About</p>
          <h2
            id="about-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tightest text-paper mb-4"
          >
            {site.yearsExperience}+ years of building sites that{" "}
            <span className="italic text-gold-400">actually work</span>.
          </h2>
          <p className="text-paper/55 text-[15px] sm:text-base mt-3 leading-relaxed max-w-xl mx-auto">
            {site.name} · {site.personName}, {site.location}. I work with small businesses,
            nonprofits, and local companies — from idea to launch, with clear communication and
            a focus on results you can measure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl bg-surface border border-line p-5 hover:border-gold-500/40 transition-colors duration-300"
            >
              <span className="block w-8 h-px bg-gold-500/50 mb-4 group-hover:w-12 transition-all duration-500" />
              <p className="font-display text-paper text-base mb-1.5">{item.title}</p>
              <p className="text-paper/50 text-sm leading-snug">{item.line}</p>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden border-y border-line py-5 -mx-5 sm:-mx-6 lg:-mx-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface-elevated to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface-elevated to-transparent z-10" />
          <div className="flex w-max marquee-track">
            {marqueeItems.map((cat, i) => (
              <span
                key={cat + i}
                className="flex items-center px-6 sm:px-8 text-paper/35 text-sm sm:text-base font-medium tracking-wide whitespace-nowrap"
              >
                {cat}
                <span className="ml-6 sm:ml-8 text-gold-500/50" aria-hidden>
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
