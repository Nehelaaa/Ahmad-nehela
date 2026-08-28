"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  formatCents,
  SITE_STAGES,
  type SiteStage,
  type SiteWithClient,
} from "@/lib/admin/types";
import { displayDomain, domainToUrl } from "@/lib/admin/normalize";

const stageDot: Record<SiteStage, string> = {
  lead: "bg-paper/40",
  building: "bg-blue-400",
  review: "bg-violet-400",
  live: "bg-emerald-400",
  paused: "bg-amber-400",
};

export default function SiteList({ sites }: { sites: SiteWithClient[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<SiteStage | "all">("all");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: sites.length };
    for (const s of SITE_STAGES) {
      map[s.id] = sites.filter((x) => x.stage === s.id).length;
    }
    return map;
  }, [sites]);

  const visible = filter === "all" ? sites : sites.filter((s) => s.stage === filter);

  async function moveSite(siteId: string, stage: SiteStage) {
    await fetch(`/api/admin/sites/${siteId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage }),
    });
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-1.5">
        <FilterChip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label="All"
          count={counts.all}
        />
        {SITE_STAGES.map((s) => (
          <FilterChip
            key={s.id}
            active={filter === s.id}
            onClick={() => setFilter(s.id)}
            label={s.label}
            count={counts[s.id] ?? 0}
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-paper/40 py-12 text-center">
          No websites in this status.
        </p>
      ) : (
        <ul className="divide-y divide-line rounded-2xl border border-line overflow-hidden bg-surface-elevated/40">
          {visible.map((site) => {
            const domain = displayDomain(site.domain || site.name);
            const liveUrl = domainToUrl(site.domain);
            return (
              <li
                key={site.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 hover:bg-white/[0.03]"
              >
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/admin/sites/${site.id}`}
                    className="font-medium text-paper hover:text-gold-400 transition-colors"
                  >
                    {domain}
                  </Link>
                  <p className="text-sm text-paper/40 truncate mt-0.5">
                    {site.business_name}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-5 shrink-0">
                  <p className="text-sm text-paper/50 tabular-nums w-20">
                    {formatCents(site.project_price_final_cents)}
                  </p>
                  <label className="relative">
                    <span className="sr-only">Status</span>
                    <span
                      className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${stageDot[site.stage]}`}
                    />
                    <select
                      value={site.stage}
                      onChange={(e) =>
                        moveSite(site.id, e.target.value as SiteStage)
                      }
                      className="appearance-none rounded-lg border border-line bg-surface pl-6 pr-7 py-1.5 text-xs text-paper/70"
                      aria-label={`Status for ${domain}`}
                    >
                      {SITE_STAGES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-paper/40 hover:text-paper"
                    >
                      Live ↗
                    </a>
                  )}
                  <Link
                    href={`/admin/sites/${site.id}`}
                    className="text-xs font-medium text-gold-400 hover:text-gold-300"
                  >
                    Edit
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "bg-gold-500 text-surface"
          : "text-paper/50 hover:text-paper hover:bg-white/5"
      }`}
    >
      {label}
      <span className={`ml-1.5 tabular-nums ${active ? "text-surface/60" : "text-paper/30"}`}>
        {count}
      </span>
    </button>
  );
}
