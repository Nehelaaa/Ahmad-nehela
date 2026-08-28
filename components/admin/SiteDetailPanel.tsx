"use client";

import { useState } from "react";
import Link from "next/link";
import StatusBadge from "./StatusBadge";
import {
  formatCents,
  formatDate,
  PACKAGE_LABELS,
  type SitePublic,
} from "@/lib/admin/types";
import { platformLabel } from "@/lib/admin/platforms";

export default function SiteDetailPanel({
  site,
  businessName,
  clientId,
}: {
  site: SitePublic;
  businessName: string;
  clientId: string;
}) {
  const [password, setPassword] = useState<string | null>(null);
  const [loadingPw, setLoadingPw] = useState(false);
  const [showPw, setShowPw] = useState(false);

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

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-700/60 bg-surface-elevated p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs text-slate-500 mb-1">
              Client:{" "}
              <Link href={`/admin/clients/${clientId}`} className="text-brand-400 hover:text-brand-300">
                {businessName}
              </Link>
            </p>
            <h1 className="font-display text-2xl font-bold text-white">
              {site.domain || site.name}
            </h1>
            {site.domain && site.name !== site.domain && (
              <p className="text-slate-500 text-sm mt-1">{site.name}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={site.stage} />
            <StatusBadge status={site.package} label={PACKAGE_LABELS[site.package]} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <Info label="Platform" value={platformLabel(site.platform)} />
          <Info label="Project price" value={formatCents(site.project_price_final_cents)} />
          <Info
            label="Payment"
            value={<StatusBadge status={site.project_payment_status} />}
          />
          <Info label="Hosting" value={site.hosting_provider || "—"} />
          <Info label="Added" value={formatDate(site.created_at)} />
          <Info label="Care" value={site.care_status === "none" ? "Not set up" : site.care_status} />
        </div>

        {(site.staging_url || site.admin_url) && (
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-700/60">
            {site.domain && (
              <a
                href={`https://${site.domain.replace(/^https?:\/\//, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-400 hover:text-brand-300"
              >
                Open live site ↗
              </a>
            )}
            {site.staging_url && (
              <a
                href={site.staging_url.startsWith("http") ? site.staging_url : `https://${site.staging_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 hover:text-white"
              >
                Staging ↗
              </a>
            )}
            {site.admin_url && (
              <a
                href={site.admin_url.startsWith("http") ? site.admin_url : `https://${site.admin_url}`}
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
        <h2 className="font-semibold text-white mb-1">Login credentials</h2>
        <p className="text-xs text-slate-500 mb-4">Encrypted at rest · admin access only</p>
        <dl className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-slate-500 mb-1">Username</dt>
            <dd className="text-white font-mono text-sm bg-surface rounded-lg px-3 py-2 border border-slate-700">
              {site.login_username || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500 mb-1">Password</dt>
            <dd className="flex items-center gap-2">
              <span className="flex-1 text-white font-mono text-sm bg-surface rounded-lg px-3 py-2 border border-slate-700">
                {showPw && password !== null
                  ? password || "—"
                  : "••••••••"}
              </span>
              <button
                type="button"
                onClick={revealPassword}
                disabled={loadingPw}
                className="shrink-0 rounded-lg border border-slate-600 px-3 py-2 text-xs text-slate-300 hover:border-brand-500 hover:text-brand-400"
              >
                {loadingPw ? "…" : showPw ? "Hide" : "Show"}
              </button>
            </dd>
          </div>
        </dl>
        {site.site_notes && (
          <p className="mt-4 text-sm text-slate-400 border-t border-slate-700/60 pt-4 whitespace-pre-wrap">
            {site.site_notes}
          </p>
        )}
      </div>

      <Link
        href="/admin/sites"
        className="inline-block text-sm text-brand-400 hover:text-brand-300"
      >
        ← Back to website pipeline
      </Link>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">{label}</p>
      <div className="text-white">{value}</div>
    </div>
  );
}
