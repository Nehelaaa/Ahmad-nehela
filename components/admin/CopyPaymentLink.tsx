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
          className="rounded-lg border border-line px-3 py-1.5 text-xs text-paper/70 hover:border-gold-500/50 hover:text-gold-300 transition-colors"
        >
          {copied ? "Copied!" : "Copy link"}
        </button>
        <a
          href={offer.paymentLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gold-400 hover:text-gold-300"
        >
          Open ↗
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-4 flex flex-col gap-3">
      <div>
        <p className="font-medium text-paper text-sm">{offer.name}</p>
        <p className="text-xs text-paper/40 mt-0.5">{offer.summary}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copy}
          className="rounded-lg bg-gold-500 px-3 py-2 text-xs font-semibold text-surface hover:bg-gold-400 transition-colors"
        >
          {copied ? "Copied!" : "Copy payment link"}
        </button>
        <a
          href={offer.paymentLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-line px-3 py-2 text-xs text-paper/70 hover:border-gold-500/50 hover:text-gold-300 transition-colors"
        >
          Open checkout ↗
        </a>
      </div>
    </div>
  );
}
