import Link from "next/link";
import {
  getBookingHref,
  getPhoneDisplay,
  getPhoneHref,
  site,
} from "@/lib/content";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const phoneHref = getPhoneHref();
  const phoneDisplay = getPhoneDisplay();
  const bookingHref = getBookingHref();
  const bookingExternal = Boolean(site.bookingUrl?.trim());

  return (
    <footer className="bg-surface border-t border-slate-800">
      <div className="section-container py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-white font-display font-semibold mb-1">
              {site.name}
            </p>
            <p className="text-slate-500 text-sm mb-3">
              Web Developer · {site.serviceArea}
            </p>
            <p className="text-slate-500 text-sm">
              © {currentYear} {site.name}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            {phoneHref && (
              <a
                href={phoneHref}
                className="text-brand-400 hover:text-brand-300 transition-colors"
              >
                {phoneDisplay}
              </a>
            )}
            <a
              href={`mailto:${site.email}`}
              className="text-slate-500 hover:text-brand-400 transition-colors break-all"
            >
              {site.email}
            </a>
            <Link
              href={bookingHref}
              {...(bookingExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-slate-500 hover:text-brand-400 transition-colors"
            >
              Book a free call
            </Link>
            <Link
              href="#contact"
              className="text-slate-500 hover:text-brand-400 transition-colors"
            >
              Get a quote
            </Link>
            <Link
              href="#home"
              className="text-slate-500 hover:text-brand-400 transition-colors pt-1"
            >
              Back to top
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
