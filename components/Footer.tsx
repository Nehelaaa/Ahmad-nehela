import Link from "next/link";
import { getPhoneDisplay, getPhoneHref, site } from "@/lib/content";
import { seoServicePages } from "@/lib/seo-content";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const phoneHref = getPhoneHref();
  const phoneDisplay = getPhoneDisplay();

  return (
    <footer className="bg-surface border-t border-line">
      <div className="section-container py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          <div>
            <p className="font-display text-xl text-paper mb-2">
              {site.name}
            </p>
            <p className="text-paper/40 text-sm mb-3">
              Web Developer · {site.serviceArea}
            </p>
            <p className="text-paper/45 text-sm leading-relaxed max-w-xs">
              Custom websites and web apps that help local businesses get found on Google and win
              more customers.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-4">Get found on Google</p>
            <ul className="space-y-2.5 text-sm">
              {seoServicePages.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`} className="text-paper/45 hover:text-gold-300 transition-colors">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Contact</p>
            <ul className="space-y-2.5 text-sm">
              {phoneHref && (
                <li>
                  <a href={phoneHref} className="text-gold-400 hover:text-gold-300 transition-colors">
                    {phoneDisplay}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-paper/45 hover:text-gold-300 transition-colors break-all"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <Link href="/#contact" className="text-paper/45 hover:text-gold-300 transition-colors">
                  Book a free call / get a quote
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-paper/45 hover:text-gold-300 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/#home" className="text-paper/45 hover:text-gold-300 transition-colors">
                  Back to top
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-paper/30 text-xs border-t border-line pt-6">
          © {currentYear} {site.name} · Web developer &amp; website designer in Boston, MA
        </p>
      </div>
    </footer>
  );
}
