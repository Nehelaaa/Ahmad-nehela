import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "SMS Terms",
  robots: { index: true, follow: true },
};

export default function SmsTermsPage() {
  return (
    <main className="min-h-screen bg-surface text-slate-300">
      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-20">
        <Link href="/" className="text-sm text-brand-400 hover:text-brand-300">
          ← {site.name}
        </Link>
        <h1 className="font-display text-3xl font-bold text-white mt-6 mb-2">
          SMS Terms &amp; Conditions
        </h1>
        <p className="text-sm text-slate-500 mb-10">
          Program: {site.name} · Last updated: August 28, 2026
        </p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-base mb-2">Program description</h2>
            <p>
              This SMS program sends transactional messages about website projects,
              proposals, and payment / checkout links for clients of {site.name}.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">Message frequency</h2>
            <p>
              Message frequency varies based on your project (typically a small
              number of texts when a payment link or update is needed).
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">Rates</h2>
            <p>
              Message and data rates may apply. Check your carrier plan for details.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">
              Opt out &amp; help
            </h2>
            <p>
              Reply <strong className="text-white">STOP</strong> to cancel. Reply{" "}
              <strong className="text-white">HELP</strong> for help. You may also
              email{" "}
              <a className="text-brand-400" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              or call {site.phone}.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">Consent</h2>
            <p>
              By providing your phone number when requesting a quote, proposal, or
              payment link (on our website, by phone, or in person), you consent to
              receive these transactional SMS messages. Consent is not a condition
              of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">Privacy</h2>
            <p>
              See our{" "}
              <Link href="/privacy" className="text-brand-400">
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
