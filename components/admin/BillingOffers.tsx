"use client";

import CopyPaymentLink from "./CopyPaymentLink";
import { STRIPE_OFFERS, STRIPE_MODE } from "@/lib/admin/stripe-catalog";
import { PROPOSAL_PLANS } from "@/lib/admin/proposal-plans";

export default function BillingOffers() {
  const publicOffers = STRIPE_OFFERS.filter((o) => o.visibility === "public");
  const proposals = STRIPE_OFFERS.filter((o) => o.visibility === "admin");

  return (
    <div className="space-y-10">
      {STRIPE_MODE === "test" && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200/90">
          Stripe is in <strong>test mode</strong>. Links work with Stripe test cards
          (e.g. 4242…). When your TopWebDeveloper account is ready for live charges,
          we&apos;ll copy this catalog to live mode.
        </div>
      )}

      <section>
        <h2 className="font-semibold text-white mb-1">Public packages & care</h2>
        <p className="text-sm text-slate-500 mb-4">
          Match the website — send these when a client picks Launch / Grow / Scale or Site Care
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {publicOffers.map((offer) => (
            <CopyPaymentLink key={offer.id} offer={offer} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-white mb-1">Proposal plans (admin only)</h2>
        <p className="text-sm text-slate-500 mb-4">
          Down payment + monthly care in one checkout — not shown on the public site
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {PROPOSAL_PLANS.map((plan) => {
            const offer = proposals.find((o) => o.id === plan.id);
            if (!offer) return null;
            return (
              <article
                key={plan.id}
                className="rounded-2xl border border-slate-700/60 bg-surface-elevated p-5 flex flex-col"
              >
                <h3 className="font-display text-lg font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-1 mb-3">{plan.tagline}</p>
                <p className="text-white mb-1">
                  <span className="font-display text-2xl font-bold tabular-nums">
                    ${plan.downPayment.toLocaleString()}
                  </span>
                  <span className="text-slate-500 text-sm"> down</span>
                </p>
                <p className="text-brand-400 font-medium tabular-nums mb-3">
                  + ${plan.monthly}/mo
                </p>
                <p className="text-xs text-slate-500 mb-4 flex-1">{plan.bestFor}</p>
                {plan.includesClientAdmin && (
                  <p className="text-xs font-medium text-emerald-400/90 mb-3">
                    Includes client admin access
                  </p>
                )}
                <CopyPaymentLink offer={offer} compact />
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
