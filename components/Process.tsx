import { processSteps } from "@/lib/content";

export default function Process() {
  return (
    <section
      id="process"
      className="section-defer py-24 sm:py-32 bg-surface-elevated border-t border-line"
      aria-labelledby="process-heading"
    >
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow justify-center mb-4">Process</p>
          <h2 id="process-heading" className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tightest text-paper mb-4">
            How I work.
          </h2>
          <p className="text-paper/55">
            A clear process so your project stays on track and you know what to expect from start to launch.
          </p>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          <div className="hidden lg:block absolute top-[2.75rem] left-0 right-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" aria-hidden />
          {processSteps.map((item) => (
            <article key={item.step} className="group relative min-w-0">
              <span className="relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-full bg-surface ring-1 ring-line text-gold-400 font-display text-xl mb-5">
                {String(item.step).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg text-paper mb-2">{item.title}</h3>
              <p className="text-paper/50 text-sm leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
