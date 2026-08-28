"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import StatusBadge from "./StatusBadge";
import {
  formatCents,
  PACKAGE_LABELS,
  SITE_STAGES,
  type SiteStage,
  type SiteWithClient,
} from "@/lib/admin/types";

export default function SiteKanban({ sites }: { sites: SiteWithClient[] }) {
  const router = useRouter();

  async function moveSite(siteId: string, stage: SiteStage) {
    await fetch(`/api/admin/sites/${siteId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage }),
    });
    router.refresh();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
      {SITE_STAGES.map((col) => {
        const columnSites = sites.filter((s) => s.stage === col.id);
        return (
          <div key={col.id} className="flex flex-col min-h-[320px]">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${col.color}`} />
                <h3 className="text-sm font-semibold text-white">{col.label}</h3>
              </div>
              <span className="text-xs text-slate-500 tabular-nums">
                {columnSites.length}
              </span>
            </div>
            <div className="flex-1 space-y-3 rounded-xl border border-slate-800 bg-surface-elevated/40 p-3">
              {columnSites.length === 0 && (
                <p className="text-xs text-slate-600 text-center py-8">Empty</p>
              )}
              {columnSites.map((site) => (
                <article
                  key={site.id}
                  className="rounded-lg border border-slate-700/60 bg-surface p-3 space-y-2"
                >
                  <div>
                    <p className="font-medium text-white text-sm leading-snug">
                      {site.name}
                    </p>
                    <p className="text-xs text-slate-500">{site.business_name}</p>
                  </div>
                  {site.domain && (
                    <p className="text-xs text-brand-400/80 truncate">{site.domain}</p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    <StatusBadge
                      status={site.package}
                      label={PACKAGE_LABELS[site.package]}
                    />
                    <StatusBadge status={site.project_payment_status} />
                  </div>
                  <p className="text-xs text-slate-400">
                    Project: {formatCents(site.project_price_final_cents)}
                  </p>
                  <select
                    value={site.stage}
                    onChange={(e) => moveSite(site.id, e.target.value as SiteStage)}
                    className="w-full rounded-md border border-slate-700 bg-surface-elevated px-2 py-1.5 text-xs text-slate-300"
                    aria-label={`Move ${site.name}`}
                  >
                    {SITE_STAGES.map((s) => (
                      <option key={s.id} value={s.id}>
                        Move to {s.label}
                      </option>
                    ))}
                  </select>
                  <Link
                    href={`/admin/sites/${site.id}`}
                    className="block text-xs text-brand-400 hover:text-brand-300 font-medium"
                  >
                    Open website →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
