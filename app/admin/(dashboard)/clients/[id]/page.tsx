import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";
import AddWebsiteForm from "@/components/admin/AddWebsiteForm";
import {
  formatCents,
  formatDate,
  PACKAGE_LABELS,
} from "@/lib/admin/types";
import { platformLabel } from "@/lib/admin/platforms";
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
            <p className="text-xs text-brand-400 uppercase tracking-wide font-medium mb-1">
              Client
            </p>
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
        <aside className="lg:col-span-1 space-y-6">
          <section className="rounded-2xl border border-slate-700/60 bg-surface-elevated p-5 space-y-3 text-sm">
            <h2 className="font-semibold text-white text-base">Contact</h2>
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
        </aside>

        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-brand-400 uppercase tracking-wide font-medium mb-1">
                Websites
              </p>
              <h2 className="font-display text-xl font-bold text-white">
                {sites.length} project{sites.length !== 1 ? "s" : ""}
              </h2>
            </div>
          </div>

          {sites.length === 0 ? (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 text-center">
              <p className="text-amber-200/90 font-medium mb-1">No website added yet</p>
              <p className="text-slate-500 text-sm mb-4">
                Add their domain and login info so you can track the project.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {sites.map((site) => (
                <li key={site.id}>
                  <Link
                    href={`/admin/sites/${site.id}`}
                    className="block rounded-2xl border border-slate-700/60 bg-surface-elevated p-5 hover:border-brand-500/40 transition-colors group"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white group-hover:text-brand-400 transition-colors">
                          {site.domain || site.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {platformLabel(site.platform)} · {PACKAGE_LABELS[site.package]}
                        </p>
                      </div>
                      <StatusBadge status={site.stage} />
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-400">
                      <span>Project {formatCents(site.project_price_final_cents)}</span>
                      <StatusBadge status={site.project_payment_status} />
                      {site.login_username && (
                        <span className="text-slate-500">Login saved ✓</span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <AddWebsiteForm clientId={client.id} businessName={client.business_name} />
        </div>
      </div>
    </>
  );
}
