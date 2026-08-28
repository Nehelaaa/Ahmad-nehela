"use client";

import { useState } from "react";
import Link from "next/link";
import AdminBreadcrumb from "./AdminBreadcrumb";
import EditWebsiteForm from "./EditWebsiteForm";
import SendPaymentOffers from "./SendPaymentOffers";
import StatusBadge from "./StatusBadge";
import {
  formatCents,
  formatDate,
  PACKAGE_LABELS,
  SITE_STAGES,
  type SitePublic,
  type SiteStage,
} from "@/lib/admin/types";
import { platformLabel } from "@/lib/admin/platforms";
import { displayDomain, domainToUrl } from "@/lib/admin/normalize";
import { useRouter } from "next/navigation";

export default function SiteDetailPanel({
  site,
  businessName,
  clientId,
  hasPassword,
  clientPhone,
  clientEmail,
}: {
  site: SitePublic;
  businessName: string;
  clientId: string;
  hasPassword: boolean;
  clientPhone: string | null;
  clientEmail: string | null;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [password, setPassword] = useState<string | null>(null);
  const [loadingPw, setLoadingPw] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const domain = displayDomain(site.domain || site.name);
  const liveUrl = domainToUrl(site.domain);

  async function revealPassword() {
    if (password !== null) {
      setShowPw(!showPw);
      return;
    }
    setLoadingPw(true);
    const res = await fetch(`/api/admin/sites/${site.id}/credentials`);
    const data = await res.json();
    setLoadingPw(false);
    if (res.ok) {
      setPassword(data.login_password || "");
      setShowPw(true);
    }
  }

  async function changeStage(stage: SiteStage) {
    await fetch(`/api/admin/sites/${site.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage }),
    });
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "Clients", href: "/admin/clients" },
          { label: businessName, href: `/admin/clients/${clientId}` },
          { label: domain },
        ]}
      />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">{domain}</h1>
          <p className="text-slate-500 text-sm mt-1">
            {platformLabel(site.platform)} · {PACKAGE_LABELS[site.package]}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {!editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="rounded-lg border border-brand-500/50 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-400 hover:bg-brand-500/20"
            >
              Edit website
            </button>
          )}
          <StatusBadge status={site.stage} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        <Link
          href={`/admin/clients/${clientId}`}
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-slate-400 hover:border-brand-500/40 hover:text-brand-400"
        >
          ← {businessName}
        </Link>
        <Link
          href="/admin/sites"
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-slate-400 hover:border-brand-500/40 hover:text-brand-400"
        >
          All websites
        </Link>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-700 px-3 py-1.5 text-brand-400 hover:border-brand-500/40"
          >
            Open live site ↗
          </a>
        )}
      </div>

      {editing ? (
        <div className="rounded-2xl border border-brand-500/30 bg-surface-elevated p-6">
          <h2 className="font-semibold text-white mb-4">Edit website details</h2>
          <EditWebsiteForm
            site={site}
            onCancel={() => setEditing(false)}
            onSaved={() => setEditing(false)}
          />
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-slate-700/60 bg-surface-elevated p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-6">
              <Info label="Status">
                <select
                  value={site.stage}
                  onChange={(e) => changeStage(e.target.value as SiteStage)}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-surface px-3 py-2 text-sm text-white"
                >
                  {SITE_STAGES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </Info>
              <Info label="Project price" value={formatCents(site.project_price_final_cents)} />
              <Info
                label="Payment"
                value={<StatusBadge status={site.project_payment_status} />}
              />
              <Info label="Hosting" value={site.hosting_provider || "—"} />
              <Info label="Added" value={formatDate(site.created_at)} />
              <Info
                label="Care plan"
                value={site.care_status === "none" ? "Not set up" : site.care_status}
              />
            </div>

            {(site.staging_url || site.admin_url) && (
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-700/60">
                {site.staging_url && (
                  <a
                    href={
                      site.staging_url.startsWith("http")
                        ? site.staging_url
                        : `https://${site.staging_url}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-white"
                  >
                    Staging ↗
                  </a>
                )}
                {site.admin_url && (
                  <a
                    href={
                      site.admin_url.startsWith("http")
                        ? site.admin_url
                        : `https://${site.admin_url}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-white"
                  >
                    Admin login ↗
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-surface-elevated p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="font-semibold text-white">Login credentials</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Encrypted at rest · click Edit to update username or password
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="text-xs text-brand-400 hover:text-brand-300"
              >
                Edit credentials →
              </button>
            </div>
            <dl className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-slate-500 mb-1">Username</dt>
                <dd className="text-white font-mono text-sm bg-surface rounded-lg px-3 py-2 border border-slate-700">
                  {site.login_username || "Not set — click Edit to add"}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500 mb-1">Password</dt>
                <dd className="flex items-center gap-2">
                  <span className="flex-1 text-white font-mono text-sm bg-surface rounded-lg px-3 py-2 border border-slate-700">
                    {showPw && password !== null
                      ? password || "Not set"
                      : hasPassword
                        ? "••••••••"
                        : "Not set — click Edit to add"}
                  </span>
                  {hasPassword && (
                    <button
                      type="button"
                      onClick={revealPassword}
                      disabled={loadingPw}
                      className="shrink-0 rounded-lg border border-slate-600 px-3 py-2 text-xs text-slate-300 hover:border-brand-500 hover:text-brand-400"
                    >
                      {loadingPw ? "…" : showPw ? "Hide" : "Show"}
                    </button>
                  )}
                </dd>
              </div>
            </dl>
            {site.site_notes && (
              <p className="mt-4 text-sm text-slate-400 border-t border-slate-700/60 pt-4 whitespace-pre-wrap">
                {site.site_notes}
              </p>
            )}
          </div>

          <SendPaymentOffers
            siteId={site.id}
            clientPhone={clientPhone}
            clientEmail={clientEmail}
          />
        </>
      )}
    </div>
  );
}

function Info({
  label,
  value,
  children,
}: {
  label: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">{label}</p>
      <div className="text-white">{children ?? value}</div>
    </div>
  );
}
