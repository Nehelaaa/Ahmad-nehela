"use client";

import CopyPaymentLink from "./CopyPaymentLink";
import { adminProposalOffers, publicOffers } from "@/lib/admin/stripe-catalog";

export default function SendPaymentOffers() {
  return (
    <div className="rounded-2xl border border-slate-700/60 bg-surface-elevated p-6 space-y-6">
      <div>
        <h2 className="font-semibold text-white">Send payment link</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Copy a link and text/email it to the client — they pay on Stripe Checkout
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500 mb-3">Packages & care</p>
        <div className="space-y-2">
          {publicOffers().map((offer) => (
            <div
              key={offer.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-700/50 px-3 py-2.5"
            >
              <div>
                <p className="text-sm text-white">{offer.name}</p>
                <p className="text-xs text-slate-500">{offer.summary}</p>
              </div>
              <CopyPaymentLink offer={offer} compact />
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500 mb-3">
          Proposal plans (admin only)
        </p>
        <div className="space-y-2">
          {adminProposalOffers().map((offer) => (
            <div
              key={offer.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-700/50 px-3 py-2.5"
            >
              <div>
                <p className="text-sm text-white">{offer.name}</p>
                <p className="text-xs text-slate-500">{offer.summary}</p>
              </div>
              <CopyPaymentLink offer={offer} compact />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
