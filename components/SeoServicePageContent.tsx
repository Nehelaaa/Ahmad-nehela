import Link from "next/link";
import type { SeoServicePage } from "@/lib/seo-content";
import { getPhoneDisplay, getPhoneHref, site } from "@/lib/content";

export default function SeoServicePageContent({ page }: { page: SeoServicePage }) {
  const phoneHref = getPhoneHref();
  const phoneDisplay = getPhoneDisplay();

  return (
    <article className="pt-28 sm:pt-32 pb-20 sm:pb-28">
      <div className="section-container max-w-3xl">
        <p className="text-brand-400 text-sm font-medium uppercase tracking-wide mb-3">
          {site.location} · {site.serviceArea}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          {page.h1}
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed mb-8">{page.intro}</p>

        <ul className="space-y-3 mb-10">
          {page.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-slate-300">
              <span className="text-brand-500 shrink-0">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <p className="text-slate-400 leading-relaxed mb-10">{page.closing}</p>

        <div className="flex flex-col gap-3 mb-12">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3.5 min-h-[48px] font-semibold text-white hover:bg-brand-400 transition-all w-full sm:w-auto text-center"
          >
            Book a free call / get a quote
          </Link>
          {phoneHref && (
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-3.5 min-h-[48px] font-semibold text-white hover:border-brand-500 hover:text-brand-400 transition-all w-full sm:w-auto"
            >
              Call {phoneDisplay}
            </a>
          )}
          <Link
            href="/#work"
            className="inline-flex items-center justify-center rounded-full border border-transparent px-6 py-3.5 min-h-[48px] font-semibold text-slate-400 hover:text-white transition-all w-full sm:w-auto"
          >
            View work
          </Link>
        </div>

        <nav aria-label="More services" className="border-t border-slate-700/50 pt-8">
          <p className="text-slate-500 text-sm mb-3">Related</p>
          <ul className="flex flex-wrap gap-3 text-sm">
            <li>
              <Link href="/" className="text-brand-400 hover:text-brand-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/web-developer-boston" className="text-slate-400 hover:text-brand-400">
                Web developer Boston
              </Link>
            </li>
            <li>
              <Link href="/website-designer-boston" className="text-slate-400 hover:text-brand-400">
                Website designer
              </Link>
            </li>
            <li>
              <Link href="/small-business-website-boston" className="text-slate-400 hover:text-brand-400">
                Small business websites
              </Link>
            </li>
            <li>
              <Link href="/wordpress-developer-boston" className="text-slate-400 hover:text-brand-400">
                WordPress
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </article>
  );
}
