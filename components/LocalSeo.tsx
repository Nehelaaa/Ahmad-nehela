import Link from "next/link";
import { areasServed } from "@/lib/seo-content";
import { site } from "@/lib/content";

const seoLinks = [
  { href: "/web-developer-boston", label: "Web developer Boston" },
  { href: "/website-designer-boston", label: "Website designer Boston" },
  { href: "/small-business-website-boston", label: "Small business websites" },
  { href: "/wordpress-developer-boston", label: "WordPress developer Boston" },
];

export default function LocalSeo() {
  return (
    <section
      id="areas"
      className="section-defer py-24 sm:py-32 bg-surface border-t border-line"
      aria-labelledby="areas-heading"
    >
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow justify-center mb-4">Service area</p>
          <h2 id="areas-heading" className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tightest text-paper mb-4">
            Serving {site.serviceArea}.
          </h2>
          <p className="text-paper/55 leading-relaxed">
            Local businesses hire me to get found on Google, look professional online, and turn
            visitors into calls and bookings. Based in Boston — serving nearby cities and towns.
          </p>
        </div>

        <ul className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14">
          {areasServed.map((area) => (
            <li
              key={area}
              className="rounded-full border border-line bg-surface-elevated px-4 py-2 text-sm text-paper/65"
            >
              {area}
            </li>
          ))}
        </ul>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {seoLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-2xl border border-line bg-surface-elevated p-5 text-center text-sm font-semibold text-paper hover:border-gold-500/50 hover:text-gold-300 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
