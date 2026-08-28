import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";
import AddSiteForm from "@/components/admin/AddSiteForm";
import {
  formatCents,
  formatDate,
  PACKAGE_LABELS,
} from "@/lib/admin/types";
import { getClient, listSitesForClient } from "@/lib/admin/queries";

export default async function ClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const client = await getClient(params.id);
  if (!client) notFound();
  const sites = await listSitesForClient(params.id);

  return (
    <>
      <header className="border-b border-slate-800 px-6 py-5 lg:px-8">
        <Link href="/admin/clients" className="text-xs text-slate-500 hover:text-brand-400">
          ← Clients
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4 mt-2">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">
              {client.business_name}
            </h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <StatusBadge status={client.status} />
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 lg:p-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <section className="rounded-xl border border-slate-700/60 bg-surface-elevated p-5 space-y-3 text-sm">
            <h2 className="font-semibold text-white">Contact</h2>
            {client.contact_name && (
              <p className="text-slate-300">{client.contact_name}</p>
            )}
            {client.email && (
              <a href={`mailto:${client.email}`} className="block text-brand-400">
                {client.email}
              </a>
            )}
            {client.phone && (
              <a href={`tel:${client.phone}`} className="block text-brand-400">
                {client.phone}
              </a>
            )}
            {client.source && (
              <p className="text-slate-500">Source: {client.source}</p>
            )}
            {client.notes && (
              <p className="text-slate-400 whitespace-pre-wrap border-t border-slate-700 pt-3">
                {client.notes}
              </p>
            )}
            <p className="text-xs text-slate-600 pt-2">
              Added {formatDate(client.created_at)}
            </p>
          </section>

          <AddSiteForm clientId={client.id} />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-semibold text-white">Sites ({sites.length})</h2>
          {sites.length === 0 ? (
            <p className="text-slate-500 text-sm">No sites yet — add one on the left.</p>
          ) : (
            sites.map((site) => (
              <article
                key={site.id}
                className="rounded-xl border border-slate-700/60 bg-surface-elevated p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium text-white">{site.name}</h3>
                    {site.domain && (
                      <p className="text-sm text-brand-400/90">{site.domain}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status={site.stage} />
                    <StatusBadge
                      status={site.package}
                      label={PACKAGE_LABELS[site.package]}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
                  <p className="text-slate-400">
                    Project:{" "}
                    <span className="text-white">
                      {formatCents(site.project_price_final_cents)}
                    </span>
                    {" · "}
                    <StatusBadge status={site.project_payment_status} />
                  </p>
                  <p className="text-slate-400">
                    Care:{" "}
                    <span className="text-white">
                      {site.care_price_monthly_cents
                        ? `${formatCents(site.care_price_monthly_cents)}/mo`
                        : "—"}
                    </span>
                    {site.care_status !== "none" && (
                      <>
                        {" · "}
                        <StatusBadge status={site.care_status} />
                      </>
                    )}
                  </p>
                </div>
                <div className="flex gap-3 mt-4">
                  <Link
                    href="/admin/sites"
                    className="text-xs text-brand-400 hover:text-brand-300"
                  >
                    View in pipeline →
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </>
  );
}
