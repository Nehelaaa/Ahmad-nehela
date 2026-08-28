"use client";

import { useState } from "react";
import Link from "next/link";
import { PLATFORMS } from "@/lib/admin/platforms";

function Section({
  step,
  title,
  subtitle,
  children,
}: {
  step: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-700/60 bg-surface-elevated overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-700/60 bg-surface/50">
        <p className="text-brand-400 text-xs font-semibold uppercase tracking-wide mb-1">
          Step {step}
        </p>
        <h2 className="font-display text-lg font-bold text-white">{title}</h2>
        <p className="text-slate-500 text-sm mt-0.5">{subtitle}</p>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-600 bg-surface px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

export default function NewClientForm() {
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

    const res = await fetch("/api/admin/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        business_name: fd.get("business_name"),
        contact_name: fd.get("contact_name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        source: fd.get("source"),
        notes: fd.get("client_notes"),
        status: fd.get("status"),
        site: {
          name: fd.get("site_name") || fd.get("domain") || fd.get("business_name"),
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
        },
      }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not save");
      return;
    }
    const data = await res.json();
    if (data.site?.id) {
      window.location.href = `/admin/sites/${data.site.id}?saved=1`;
    } else if (data.client?.id) {
      window.location.href = `/admin/clients/${data.client.id}?saved=1`;
    } else {
      window.location.href = "/admin/clients";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <Section
        step="1"
        title="The business"
        subtitle="Who you're working with — contact & notes"
      >
        <label className="block">
          <span className="text-sm text-slate-400 mb-1 block">Business name *</span>
          <input name="business_name" required className={inputClass} />
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">Contact name</span>
            <input name="contact_name" className={inputClass} />
          </label>
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">Phone</span>
            <input name="phone" type="tel" className={inputClass} />
          </label>
        </div>
        <label className="block">
          <span className="text-sm text-slate-400 mb-1 block">Email</span>
          <input name="email" type="email" className={inputClass} />
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">Lead source</span>
            <input name="source" placeholder="Referral, Google…" className={inputClass} />
          </label>
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">Client status</span>
            <select name="status" defaultValue="lead" className={inputClass}>
              <option value="lead">Lead</option>
              <option value="active">Active</option>
              <option value="past">Past client</option>
            </select>
          </label>
        </div>
        <label className="block">
          <span className="text-sm text-slate-400 mb-1 block">Client notes</span>
          <textarea name="client_notes" rows={2} className={`${inputClass} resize-none`} />
        </label>
      </Section>

      <Section
        step="2"
        title="Their website"
        subtitle="Project details, URLs, and login info you need to manage the site"
      >
        <label className="block">
          <span className="text-sm text-slate-400 mb-1 block">Website name</span>
          <input
            name="site_name"
            placeholder="e.g. Main site, Shop site…"
            className={inputClass}
          />
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">Live domain *</span>
            <input
              name="domain"
              required
              placeholder="theirbusiness.com"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">Staging URL</span>
            <input
              name="staging_url"
              placeholder="staging.netlify.app…"
              className={inputClass}
            />
          </label>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">Platform</span>
            <select name="platform" defaultValue="wordpress" className={inputClass}>
              {PLATFORMS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">Package</span>
            <select name="package" defaultValue="launch" className={inputClass}>
              <option value="launch">Launch</option>
              <option value="grow">Grow</option>
              <option value="scale">Scale</option>
              <option value="custom">Custom</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">Pipeline stage</span>
            <select name="stage" defaultValue="live" className={inputClass}>
              <option value="lead">Lead — not started yet</option>
              <option value="building">Building</option>
              <option value="review">Review</option>
              <option value="live">Live — site is already launched</option>
            </select>
          </label>
        </div>
        <label className="block">
          <span className="text-sm text-slate-400 mb-1 block">Project price ($)</span>
          <input
            name="project_price"
            type="number"
            min="0"
            step="1"
            placeholder="799"
            className={inputClass}
          />
        </label>

        <div className="rounded-xl border border-slate-700/80 bg-surface p-4 space-y-4">
          <p className="text-sm font-medium text-white">Admin login</p>
          <p className="text-xs text-slate-500 -mt-2">
            Stored encrypted — only visible to you in the dashboard
          </p>
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">Admin / login URL</span>
            <input
              name="admin_url"
              placeholder="https://site.com/wp-admin"
              className={inputClass}
            />
          </label>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-slate-400 mb-1 block">Username</span>
              <input name="login_username" autoComplete="off" className={inputClass} />
            </label>
            <label className="block">
              <span className="text-sm text-slate-400 mb-1 block">Password</span>
              <input
                name="login_password"
                type="password"
                autoComplete="new-password"
                className={inputClass}
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">Hosting provider</span>
            <input
              name="hosting_provider"
              placeholder="Netlify, GoDaddy, WP Engine…"
              className={inputClass}
            />
          </label>
        </div>
        <label className="block">
          <span className="text-sm text-slate-400 mb-1 block">Site notes</span>
          <textarea
            name="site_notes"
            rows={2}
            placeholder="FTP details, plugin notes, etc."
            className={`${inputClass} resize-none`}
          />
        </label>
      </Section>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-brand-500 px-8 py-3 font-semibold text-white hover:bg-brand-400 disabled:opacity-60"
        >
          {loading ? "Saving…" : "Save client & website"}
        </button>
        <Link
          href="/admin/clients"
          className="rounded-full border border-slate-600 px-6 py-3 text-sm text-slate-400 hover:text-white"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
