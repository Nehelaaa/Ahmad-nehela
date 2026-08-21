import Link from "next/link";
import { getPhoneDisplay, getPhoneHref, site } from "@/lib/content";
import { seoServicePages } from "@/lib/seo-content";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const phoneHref = getPhoneHref();
  const phoneDisplay = getPhoneDisplay();

  return (
    <footer className="bg-surface border-t border-slate-800">
      <div className="section-container py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          <div>
            <p className="text-white font-display font-semibold mb-1">
              {site.name}
            </p>
            <p className="text-slate-500 text-sm mb-3">
              Web Developer · {site.serviceArea}
            </p>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Custom websites and web apps that help local businesses get found on Google and win more customers.
            </p>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-3">Get found on Google</p>
            <ul className="space-y-2 text-sm">
              {seoServicePages.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${p.slug}`}
                    className="text-slate-500 hover:text-brand-400 transition-colors"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-3">Contact</p>
            <ul className="space-y-2 text-sm">
              {phoneHref && (
                <li>
                  <a
                    href={phoneHref}
                    className="text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    {phoneDisplay}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-slate-500 hover:text-brand-400 transition-colors break-all"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-slate-500 hover:text-brand-400 transition-colors"
                >
                  Book a free call / get a quote
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-slate-500 hover:text-brand-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/#home"
                  className="text-slate-500 hover:text-brand-400 transition-colors"
                >
                  Back to top
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-slate-600 text-xs border-t border-slate-800 pt-6">
          © {currentYear} {site.name} · Web developer &amp; website designer in Boston, MA
        </p>
      </div>
    </footer>
  );
}
