"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PLATFORMS } from "@/lib/admin/platforms";
import {
  PACKAGE_LABELS,
  SITE_STAGES,
  type SitePublic,
} from "@/lib/admin/types";

const inputClass =
  "w-full rounded-xl border border-slate-600 bg-surface px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

export default function EditWebsiteForm({
  site,
  onCancel,
  onSaved,
}: {
  site: SitePublic;
  onCancel?: () => void;
  onSaved?: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const fd = new FormData(e.currentTarget);
    const price = fd.get("project_price");
    const cents =
      price && String(price).trim()
        ? Math.round(parseFloat(String(price)) * 100)
        : null;

    const payload: Record<string, unknown> = {
      name: String(fd.get("domain") || site.name).trim(),
      domain: String(fd.get("domain") || "").trim() || null,
      staging_url: String(fd.get("staging_url") || "").trim() || null,
      platform: fd.get("platform"),
      package: fd.get("package"),
      stage: fd.get("stage"),
      admin_url: String(fd.get("admin_url") || "").trim() || null,
      login_username: String(fd.get("login_username") || "").trim() || null,
      hosting_provider: String(fd.get("hosting_provider") || "").trim() || null,
      site_notes: String(fd.get("site_notes") || "").trim() || null,
      project_price_final_cents: cents,
    };

    const newPassword = String(fd.get("login_password") || "").trim();
    if (newPassword) {
      payload.login_password = newPassword;
    }

    const res = await fetch(`/api/admin/sites/${site.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not save changes");
      return;
    }

    setSuccess("Saved!");
    router.refresh();
    onSaved?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block sm:col-span-2">
          <span className="text-sm text-slate-400 mb-1 block">Live domain *</span>
          <input
            name="domain"
            required
            defaultValue={site.domain ?? ""}
            className={inputClass}
            placeholder="domain.com"
          />
        </label>
        <label className="block">
          <span className="text-sm text-slate-400 mb-1 block">Staging URL</span>
          <input
            name="staging_url"
            defaultValue={site.staging_url ?? ""}
            className={inputClass}
            placeholder="staging.netlify.app"
          />
        </label>
        <label className="block">
          <span className="text-sm text-slate-400 mb-1 block">Status</span>
          <select name="stage" defaultValue={site.stage} className={inputClass}>
            {SITE_STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block">
          <span className="text-sm text-slate-400 mb-1 block">Platform</span>
          <select name="platform" defaultValue={site.platform ?? "wordpress"} className={inputClass}>
            {PLATFORMS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm text-slate-400 mb-1 block">Package</span>
          <select name="package" defaultValue={site.package} className={inputClass}>
            {Object.entries(PACKAGE_LABELS).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm text-slate-400 mb-1 block">Project price ($)</span>
          <input
            name="project_price"
            type="number"
            min="0"
            step="1"
            defaultValue={
              site.project_price_final_cents != null
                ? site.project_price_final_cents / 100
                : ""
            }
            className={inputClass}
          />
        </label>
      </div>

      <div className="rounded-xl border border-slate-700/80 bg-surface p-4 space-y-4">
        <p className="text-sm font-medium text-white">Admin login</p>
        <label className="block">
          <span className="text-sm text-slate-400 mb-1 block">Admin / login URL</span>
          <input
            name="admin_url"
            defaultValue={site.admin_url ?? ""}
            className={inputClass}
            placeholder="https://site.com/wp-admin"
          />
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">Username</span>
            <input
              name="login_username"
              defaultValue={site.login_username ?? ""}
              autoComplete="off"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">New password</span>
            <input
              name="login_password"
              type="password"
              autoComplete="new-password"
              placeholder="Leave blank to keep current"
              className={inputClass}
            />
          </label>
        </div>
        <label className="block">
          <span className="text-sm text-slate-400 mb-1 block">Hosting provider</span>
          <input
            name="hosting_provider"
            defaultValue={site.hosting_provider ?? ""}
            className={inputClass}
            placeholder="Netlify, GoDaddy…"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm text-slate-400 mb-1 block">Site notes</span>
        <textarea
          name="site_notes"
          rows={3}
          defaultValue={site.site_notes ?? ""}
          className={`${inputClass} resize-none`}
        />
      </label>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {success && <p className="text-emerald-400 text-sm">{success}</p>}

      <div className="flex flex-wrap gap-2 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-400 disabled:opacity-60"
        >
          {loading ? "Saving…" : "Save changes"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-600 px-4 py-2.5 text-sm text-slate-400 hover:text-white"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
