"use client";

import { useState } from "react";
import type { StripeOffer } from "@/lib/admin/stripe-catalog";

export default function CopyPaymentLink({
  offer,
  compact,
}: {
  offer: StripeOffer;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(offer.paymentLinkUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", offer.paymentLinkUrl);
    }
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={copy}
          className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-300 hover:border-brand-500 hover:text-brand-400"
        >
          {copied ? "Copied!" : "Copy link"}
        </button>
        <a
          href={offer.paymentLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-brand-400 hover:text-brand-300"
        >
          Open ↗
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-700/60 bg-surface p-4 flex flex-col gap-3">
      <div>
        <p className="font-medium text-white text-sm">{offer.name}</p>
        <p className="text-xs text-slate-500 mt-0.5">{offer.summary}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copy}
          className="rounded-lg bg-brand-500 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-400"
        >
          {copied ? "Copied!" : "Copy payment link"}
        </button>
        <a
          href={offer.paymentLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-slate-600 px-3 py-2 text-xs text-slate-300 hover:border-brand-500 hover:text-brand-400"
        >
          Open checkout ↗
        </a>
      </div>
    </div>
  );
}
