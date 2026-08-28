import Link from "next/link";
import type { SeoServicePage } from "@/lib/seo-content";
import { getPhoneDisplay, getPhoneHref, site } from "@/lib/content";

export default function SeoServicePageContent({ page }: { page: SeoServicePage }) {
  const phoneHref = getPhoneHref();
  const phoneDisplay = getPhoneDisplay();

  return (
    <article className="relative pt-32 sm:pt-40 pb-24 sm:pb-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(192,138,52,0.12),transparent)]" aria-hidden />
      <div className="section-container max-w-3xl relative">
        <p className="eyebrow mb-4">
          {site.location} · {site.serviceArea}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tightest text-paper mb-6">
          {page.h1}
        </h1>
        <p className="text-paper/55 text-lg leading-relaxed mb-8">{page.intro}</p>

        <ul className="space-y-3 mb-10">
          {page.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-paper/70">
              <span className="text-gold-500 shrink-0">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <p className="text-paper/55 leading-relaxed mb-10">{page.closing}</p>

        <div className="flex flex-col gap-3 mb-12">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3.5 min-h-[48px] font-semibold text-surface hover:bg-gold-400 transition-all duration-300 ease-premium hover:scale-[1.02] w-full sm:w-auto text-center"
          >
            Book a free call / get a quote
          </Link>
          {phoneHref && (
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 min-h-[48px] font-semibold text-paper hover:border-gold-500/50 hover:text-gold-300 transition-all w-full sm:w-auto"
            >
              Call {phoneDisplay}
            </a>
          )}
          <Link
            href="/#work"
            className="inline-flex items-center justify-center rounded-full border border-transparent px-6 py-3.5 min-h-[48px] font-semibold text-paper/45 hover:text-paper transition-all w-full sm:w-auto"
          >
            View work
          </Link>
        </div>

        <nav aria-label="More services" className="border-t border-line pt-8">
          <p className="text-paper/40 text-sm mb-3">Related</p>
          <ul className="flex flex-wrap gap-3 text-sm">
            <li>
              <Link href="/" className="text-gold-400 hover:text-gold-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/web-developer-boston" className="text-paper/50 hover:text-gold-300">
                Web developer Boston
              </Link>
            </li>
            <li>
              <Link href="/website-designer-boston" className="text-paper/50 hover:text-gold-300">
                Website designer
              </Link>
            </li>
            <li>
              <Link href="/small-business-website-boston" className="text-paper/50 hover:text-gold-300">
                Small business websites
              </Link>
            </li>
            <li>
              <Link href="/wordpress-developer-boston" className="text-paper/50 hover:text-gold-300">
                WordPress
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </article>
  );
}
