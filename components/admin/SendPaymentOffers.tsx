"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CopyPaymentLink from "./CopyPaymentLink";
import { STRIPE_OFFERS, type StripeOffer } from "@/lib/admin/stripe-catalog";

export default function SendPaymentOffers({
  siteId,
  clientPhone,
  clientEmail,
}: {
  siteId: string;
  clientPhone: string | null;
  clientEmail: string | null;
}) {
  const router = useRouter();
  const [offerId, setOfferId] = useState("starter");
  const [sendSms, setSendSms] = useState(Boolean(clientPhone));
  const [sendEmail, setSendEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selected = STRIPE_OFFERS.find((o) => o.id === offerId) as StripeOffer;

  async function handleSend() {
    setLoading(true);
    setError("");
    setMessage("");

    const channels: Array<"sms" | "email"> = [];
    if (sendSms) channels.push("sms");
    if (sendEmail) channels.push("email");
    if (channels.length === 0) {
      setError("Choose text, email, or both");
      setLoading(false);
      return;
    }

    const res = await fetch(`/api/admin/sites/${siteId}/send-offer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ offerId, channels }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Could not send");
      return;
    }

    const parts = [
      data.sent?.sms ? `Texted ${data.sent.sms}` : null,
      data.sent?.email ? `Emailed ${data.sent.email}` : null,
    ].filter(Boolean);
    setMessage(
      `${parts.join(" · ")}. Link for ${data.offer?.name} is on its way.`
    );
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-gold-500/30 bg-surface-elevated p-6 space-y-5">
      <div>
        <h2 className="font-semibold text-paper">Send offer</h2>
        <p className="text-xs text-paper/40 mt-0.5">
          Pick a plan — we text (and/or email) the Stripe checkout link to the client
        </p>
      </div>

      <label className="block">
        <span className="text-sm text-paper/50 mb-1.5 block">Plan</span>
        <select
          value={offerId}
          onChange={(e) => setOfferId(e.target.value)}
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-paper"
        >
          <optgroup label="Proposal plans (recommended)">
            {STRIPE_OFFERS.filter((o) => o.visibility === "admin").map((o) => (
              <option key={o.id} value={o.id}>
                {o.name} — {o.summary}
              </option>
            ))}
          </optgroup>
          <optgroup label="Public packages & care">
            {STRIPE_OFFERS.filter((o) => o.visibility === "public").map((o) => (
              <option key={o.id} value={o.id}>
                {o.name} — {o.summary}
              </option>
            ))}
          </optgroup>
        </select>
      </label>

      <div className="rounded-xl border border-line bg-surface px-4 py-3 text-sm">
        <p className="text-paper font-medium">{selected.name}</p>
        <p className="text-paper/40 text-xs mt-0.5">{selected.summary}</p>
      </div>

      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={sendSms}
            onChange={(e) => setSendSms(e.target.checked)}
            className="mt-1"
          />
          <span>
            <span className="text-sm text-paper">Text message</span>
            <span className="block text-xs text-paper/40">
              {clientPhone
                ? `To ${clientPhone}`
                : "No phone on file — add one on the client first"}
            </span>
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={sendEmail}
            onChange={(e) => setSendEmail(e.target.checked)}
            className="mt-1"
          />
          <span>
            <span className="text-sm text-paper">Email</span>
            <span className="block text-xs text-paper/40">
              {clientEmail
                ? `To ${clientEmail}`
                : "No email on file — add one on the client first"}
            </span>
          </span>
        </label>
      </div>

      <button
        type="button"
        onClick={handleSend}
        disabled={loading || (!sendSms && !sendEmail)}
        className="w-full rounded-xl bg-gold-500 py-3 text-sm font-semibold text-paper hover:bg-gold-400 disabled:opacity-50"
      >
        {loading ? "Sending…" : "Send checkout link"}
      </button>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {message && <p className="text-sm text-emerald-400">{message}</p>}

      <div className="border-t border-line pt-4">
        <p className="text-xs text-paper/40 mb-2">Or copy manually</p>
        <CopyPaymentLink offer={selected} compact />
      </div>
    </div>
  );
}
