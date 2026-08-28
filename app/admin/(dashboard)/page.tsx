import Link from "next/link";
import KpiCard from "@/components/admin/KpiCard";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  formatCents,
  formatDate,
} from "@/lib/admin/types";
import {
  getActionQueue,
  getDashboardStats,
  listRecentActivity,
} from "@/lib/admin/queries";

export default async function AdminOverviewPage() {
  const [stats, actions, activity] = await Promise.all([
    getDashboardStats(),
    getActionQueue(),
    listRecentActivity(),
  ]);

  return (
    <>
      <header className="border-b border-line px-6 py-5 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-paper">Overview</h1>
        <p className="text-paper/40 text-sm mt-1">
          Your business at a glance — clients, sites, and billing
        </p>
      </header>

      <div className="p-6 lg:p-8 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            label="MRR (care)"
            value={formatCents(stats.mrrCents)}
            hint={`${stats.activeCare} active subscriptions`}
            accent="brand"
          />
          <KpiCard
            label="Live sites"
            value={String(stats.liveSites)}
            hint={`${stats.inBuild} in build`}
            accent="green"
          />
          <KpiCard
            label="Outstanding projects"
            value={formatCents(stats.unpaidProjectCents)}
            hint={`${stats.unpaidProjects} awaiting payment`}
            accent={stats.unpaidProjects > 0 ? "amber" : "default"}
          />
          <KpiCard
            label="Active clients"
            value={String(stats.activeClients)}
            hint={`${stats.leadsInPipeline} leads in pipeline`}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <section className="rounded-xl border border-line bg-surface-elevated p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-paper">Action queue</h2>
              <Link href="/admin/sites" className="text-xs text-gold-400 hover:text-gold-300">
                All websites →
              </Link>
            </div>
            {actions.length === 0 ? (
              <p className="text-sm text-paper/40 py-6 text-center">
                All caught up — no urgent items.
              </p>
            ) : (
              <ul className="space-y-3">
                {actions.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start justify-between gap-3 rounded-lg border border-line bg-surface p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-paper">{item.name}</p>
                      <p className="text-xs text-paper/40">{item.business_name}</p>
                      <div className="flex gap-2 mt-2">
                        <StatusBadge status={item.stage} />
                        <StatusBadge status={item.project_payment_status} />
                        {item.care_status !== "none" && (
                          <StatusBadge status={item.care_status} />
                        )}
                      </div>
                    </div>
                    <Link
                      href={`/admin/clients/${item.client_id}`}
                      className="text-xs text-gold-400 shrink-0"
                    >
                      Open
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-xl border border-line bg-surface-elevated p-5">
            <h2 className="font-semibold text-paper mb-4">Recent activity</h2>
            {activity.length === 0 ? (
              <p className="text-sm text-paper/40 py-6 text-center">
                Activity will appear as you add clients and sites.
              </p>
            ) : (
              <ul className="space-y-3">
                {activity.map((a) => (
                  <li key={a.id} className="text-sm border-b border-line pb-3 last:border-0">
                    <p className="text-paper/70">{a.description}</p>
                    <p className="text-xs text-paper/40 mt-1">
                      {formatDate(a.created_at)}
                      {a.business_name ? ` · ${a.business_name}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/clients/new"
            className="inline-flex items-center rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-paper hover:bg-gold-400"
          >
            + Add client & website
          </Link>
          <Link
            href="/admin/sites"
            className="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-paper hover:border-gold-500"
          >
            View websites
          </Link>
        </div>
      </div>
    </>
  );
}
