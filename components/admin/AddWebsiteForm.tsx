"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PLATFORMS } from "@/lib/admin/platforms";

const inputClass =
  "w-full rounded-xl border border-slate-600 bg-surface px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

export default function AddWebsiteForm({
  clientId,
  businessName,
}: {
  clientId: string;
  businessName: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
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
        package: fd.get("package"),
        stage: fd.get("stage"),
        project_price_cents: cents,
      }),
    });
    setLoading(false);
    if (res.ok) {
      const site = await res.json();
      router.push(`/admin/sites/${site.id}`);
      router.refresh();
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border-2 border-dashed border-brand-500/40 bg-brand-500/5 py-4 text-sm font-medium text-brand-400 hover:bg-brand-500/10"
      >
        + Add website for this client
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-700/60 bg-surface-elevated p-5 space-y-4"
    >
      <h3 className="font-semibold text-white">New website</h3>
      <label className="block">
        <span className="text-sm text-slate-400 mb-1 block">Live domain *</span>
        <input name="domain" required className={inputClass} placeholder="domain.com" />
      </label>
      <label className="block">
        <span className="text-sm text-slate-400 mb-1 block">Platform</span>
        <select name="platform" defaultValue="wordpress" className={inputClass}>
          {PLATFORMS.map((p) => (
            <option key={p.id} value={p.id}>{p.label}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm text-slate-400 mb-1 block">Admin URL</span>
        <input name="admin_url" className={inputClass} placeholder="/wp-admin" />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <input name="login_username" placeholder="Username" className={inputClass} />
        <input name="login_password" type="password" placeholder="Password" className={inputClass} />
      </div>
      <input name="hosting_provider" placeholder="Hosting" className={inputClass} />
      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="flex-1 rounded-lg bg-brand-500 py-2 text-sm font-semibold text-white">
          {loading ? "Saving…" : "Save website"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="px-4 rounded-lg border border-slate-600 text-sm text-slate-400">
          Cancel
        </button>
      </div>
    </form>
  );
}
