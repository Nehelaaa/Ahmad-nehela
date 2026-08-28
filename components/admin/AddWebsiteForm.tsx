"use client";

import { useState } from "react";
import { PLATFORMS } from "@/lib/admin/platforms";
import { SITE_STAGES } from "@/lib/admin/types";

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-paper placeholder-paper/30 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20";

export default function AddWebsiteForm({
  clientId,
  businessName,
  existingCount = 0,
}: {
  clientId: string;
  businessName: string;
  existingCount?: number;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    const price = fd.get("project_price");
    const cents =
      price && String(price).trim()
        ? Math.round(parseFloat(String(price)) * 100)
        : undefined;

    const res = await fetch("/api/admin/sites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        name: fd.get("domain") || businessName,
        domain: fd.get("domain"),
        staging_url: fd.get("staging_url"),
        platform: fd.get("platform"),
        admin_url: fd.get("admin_url"),
        login_username: fd.get("login_username"),
        login_password: fd.get("login_password"),
        hosting_provider: fd.get("hosting_provider"),
        site_notes: fd.get("site_notes"),
        package: fd.get("package") || "launch",
        stage: fd.get("stage") || "live",
        project_price_cents: cents,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not save website — try again");
      return;
    }

    const site = await res.json();
    window.location.href = `/admin/sites/${site.id}?saved=1`;
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border-2 border-dashed border-gold-500/40 bg-gold-500/5 py-4 text-sm font-medium text-gold-400 hover:bg-gold-500/10"
      >
        {existingCount > 0 ? "+ Add another website" : "+ Add website for this client"}
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-surface-elevated p-5 space-y-4"
    >
      <div>
        <h3 className="font-semibold text-paper">New website</h3>
        <p className="text-xs text-paper/40 mt-1">
          Already live? Set status to <strong className="text-paper/50">Live</strong> below.
        </p>
      </div>

      <label className="block">
        <span className="text-sm text-paper/50 mb-1 block">Live domain *</span>
        <input name="domain" required className={inputClass} placeholder="domain.com" />
      </label>

      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-sm text-paper/50 mb-1 block">Platform</span>
          <select name="platform" defaultValue="nextjs" className={inputClass}>
            {PLATFORMS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm text-paper/50 mb-1 block">Status</span>
          <select name="stage" defaultValue="live" className={inputClass}>
            {SITE_STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm text-paper/50 mb-1 block">Admin / login URL</span>
        <input name="admin_url" className={inputClass} placeholder="https://site.com/wp-admin" />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-sm text-paper/50 mb-1 block">Username</span>
          <input name="login_username" autoComplete="off" className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm text-paper/50 mb-1 block">Password</span>
          <input
            name="login_password"
            type="password"
            autoComplete="new-password"
            className={inputClass}
          />
        </label>
      </div>

      <input name="hosting_provider" placeholder="Hosting (Netlify, GoDaddy…)" className={inputClass} />
      <textarea
        name="site_notes"
        rows={2}
        placeholder="Notes (optional)"
        className={`${inputClass} resize-none`}
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-gold-500 py-2.5 text-sm font-semibold text-paper hover:bg-gold-400 disabled:opacity-60"
        >
          {loading ? "Saving…" : "Save website"}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setError("");
          }}
          className="px-4 rounded-lg border border-line text-sm text-paper/50 hover:text-paper"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
