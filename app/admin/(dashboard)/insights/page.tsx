import { getDashboardStats, listSitesWithClients } from "@/lib/admin/queries";
import { formatCents, PACKAGE_LABELS } from "@/lib/admin/types";
import KpiCard from "@/components/admin/KpiCard";

export default async function InsightsPage() {
  const [stats, sites] = await Promise.all([
    getDashboardStats(),
    listSitesWithClients(),
  ]);

  const packageCounts = sites.reduce(
    (acc, s) => {
      acc[s.package] = (acc[s.package] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const liveWithCare = sites.filter((s) => s.stage === "live" && s.care_status === "active").length;
  const liveTotal = sites.filter((s) => s.stage === "live").length;
  const attachRate =
    liveTotal > 0 ? Math.round((liveWithCare / liveTotal) * 100) : 0;

  return (
    <>
      <header className="border-b border-slate-800 px-6 py-5 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-white">Insights</h1>
        <p className="text-slate-500 text-sm mt-1">Business health at a glance</p>
      </header>

      <div className="p-6 lg:p-8 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <KpiCard label="MRR" value={formatCents(stats.mrrCents)} accent="brand" />
          <KpiCard
            label="Care attach rate"
            value={`${attachRate}%`}
            hint={`${liveWithCare} of ${liveTotal} live sites on care`}
            accent={attachRate >= 70 ? "green" : "amber"}
          />
          <KpiCard
            label="Past due care"
            value={String(stats.pastDueCare)}
            accent={stats.pastDueCare > 0 ? "red" : "green"}
          />
        </div>

        <section className="rounded-xl border border-slate-700/60 bg-surface-elevated p-5">
          <h2 className="font-semibold text-white mb-4">Sites by package</h2>
          <ul className="space-y-2">
            {Object.entries(PACKAGE_LABELS).map(([key, label]) => (
              <li key={key} className="flex justify-between text-sm">
                <span className="text-slate-400">{label}</span>
                <span className="text-white tabular-nums">{packageCounts[key] ?? 0}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-slate-700/60 bg-surface-elevated p-5">
          <h2 className="font-semibold text-white mb-2">Pipeline</h2>
          <p className="text-sm text-slate-400">
            {stats.leadsInPipeline} leads · {stats.inBuild} in build · {stats.liveSites} live
          </p>
        </section>
      </div>
    </>
  );
}
