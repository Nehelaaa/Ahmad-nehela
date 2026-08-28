import Link from "next/link";
import { notFound } from "next/navigation";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import StatusBadge from "@/components/admin/StatusBadge";
import AddWebsiteForm from "@/components/admin/AddWebsiteForm";
import {
  formatCents,
  formatDate,
  PACKAGE_LABELS,
} from "@/lib/admin/types";
import { platformLabel } from "@/lib/admin/platforms";
import { displayDomain, domainToUrl } from "@/lib/admin/normalize";
import { getClient, listSitesForClient } from "@/lib/admin/queries";

export default async function ClientDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { saved?: string };
}) {
  const client = await getClient(params.id);
  if (!client) notFound();
  const sites = await listSitesForClient(params.id);

  return (
    <>
      <header className="border-b border-slate-800 px-6 py-5 lg:px-8">
        <AdminBreadcrumb
          items={[
            { label: "Clients", href: "/admin/clients" },
            { label: client.business_name },
          ]}
        />
        <div className="flex flex-wrap items-start justify-between gap-4 mt-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">
              {client.business_name}
            </h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <StatusBadge status={client.status} />
              {sites.length > 0 && (
                <span className="text-xs text-slate-500 self-center">
                  {sites.length} website{sites.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
          <Link
            href="/admin/sites"
            className="text-sm text-brand-400 hover:text-brand-300"
          >
            View pipeline →
          </Link>
        </div>
      </header>

      <div className="p-6 lg:p-8 grid lg:grid-cols-3 gap-8">
        {searchParams.saved === "1" && (
          <div className="lg:col-span-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            Saved successfully. Your client and website are in the dashboard.
          </div>
        )}
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
          <div>
            <h2 className="font-display text-xl font-bold text-white mb-1">
              Websites
            </h2>
            <p className="text-sm text-slate-500">
              Click a website to view, edit credentials, or change status
            </p>
          </div>

          {sites.length === 0 ? (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
              <p className="text-amber-200/90 font-medium mb-1">No website yet</p>
              <p className="text-slate-500 text-sm">
                Add the live domain and login info below.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {sites.map((site) => (
                <li
                  key={site.id}
                  className="rounded-2xl border border-slate-700/60 bg-surface-elevated p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/admin/sites/${site.id}`}
                        className="font-semibold text-white hover:text-brand-400 transition-colors text-lg"
                      >
                        {displayDomain(site.domain || site.name)}
                      </Link>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {platformLabel(site.platform)} · {PACKAGE_LABELS[site.package]}
                      </p>
                    </div>
                    <StatusBadge status={site.stage} />
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-slate-700/60">
                    <Link
                      href={`/admin/sites/${site.id}`}
                      className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400"
                    >
                      Open & edit
                    </Link>
                    {domainToUrl(site.domain) && (
                      <a
                        href={domainToUrl(site.domain)!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-400 hover:text-white"
                      >
                        Live site ↗
                      </a>
                    )}
                    <span className="text-xs text-slate-500 ml-auto">
                      {formatCents(site.project_price_final_cents)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <AddWebsiteForm
            clientId={client.id}
            businessName={client.business_name}
            existingCount={sites.length}
          />
        </div>
      </div>
    </>
  );
}
