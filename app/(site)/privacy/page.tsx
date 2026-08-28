import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-surface text-slate-300">
      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-20">
        <Link href="/" className="text-sm text-brand-400 hover:text-brand-300">
          ← {site.name}
        </Link>
        <h1 className="font-display text-3xl font-bold text-white mt-6 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 mb-10">Last updated: August 28, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed">
          <p>
            {site.name} (“we”, “us”) provides web design and development services
            under the brand Top Web Developer. This policy explains how we handle
            information when you contact us or receive SMS messages from us.
          </p>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">Information we collect</h2>
            <p>
              We may collect your name, business name, email address, phone number,
              project details, and payment-related information you provide through
              our website forms, calls, meetings, or checkout links.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">How we use information</h2>
            <p>
              We use your information to respond to inquiries, deliver website
              projects, send payment / checkout links you requested, provide
              support, and manage ongoing site care subscriptions.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">SMS / text messages</h2>
            <p>
              If you provide a phone number and ask for a quote, proposal, or
              payment link, we may text you transactional messages related to your
              project (for example, a Stripe checkout link). Message frequency
              varies. Message and data rates may apply. You can reply{" "}
              <strong className="text-white">STOP</strong> to opt out or{" "}
              <strong className="text-white">HELP</strong> for help. We do not
              sell or share your phone number with third parties for their
              marketing.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">Sharing</h2>
            <p>
              We use service providers that help us operate (for example Stripe for
              payments, Twilio for SMS, and email delivery tools). We do not sell
              personal information or share it with third parties for their own
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-2">Contact</h2>
            <p>
              Questions about this policy:{" "}
              <a className="text-brand-400" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              or {site.phone}.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
