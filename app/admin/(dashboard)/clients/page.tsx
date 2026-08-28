import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";
import { listClientsWithSites } from "@/lib/admin/queries";
import { displayDomain } from "@/lib/admin/normalize";
import { formatDate } from "@/lib/admin/types";

export default async function ClientsPage() {
  const clients = await listClientsWithSites();

  return (
    <>
      <header className="border-b border-line px-6 py-5 lg:px-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-paper">Clients</h1>
          <p className="text-paper/40 text-sm mt-1">
            {clients.length} business{clients.length !== 1 ? "es" : ""} — each can have one or more websites
          </p>
        </div>
        <Link
          href="/admin/clients/new"
          className="inline-flex items-center rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-paper hover:bg-gold-400"
        >
          + Add client & website
        </Link>
      </header>

      <div className="p-6 lg:p-8">
        {clients.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line p-12 text-center max-w-lg mx-auto">
            <p className="text-paper font-medium mb-2">No clients yet</p>
            <p className="text-paper/40 text-sm mb-6">
              Add a business and their website in one step — contact info, domain, and login details.
            </p>
            <Link
              href="/admin/clients/new"
              className="inline-flex rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-paper hover:bg-gold-400"
            >
              Add first client
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {clients.map((c) => (
              <Link
                key={c.id}
                href={`/admin/clients/${c.id}`}
                className="group rounded-2xl border border-line bg-surface-elevated p-5 hover:border-gold-500/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h2 className="font-semibold text-paper group-hover:text-gold-400 transition-colors">
                    {c.business_name}
                  </h2>
                  <StatusBadge status={c.status} />
                </div>
                {c.contact_name && (
                  <p className="text-sm text-paper/50 mb-1">{c.contact_name}</p>
                )}
                {c.email && (
                  <p className="text-xs text-paper/40 truncate">{c.email}</p>
                )}
                <div className="mt-4 pt-4 border-t border-line flex items-center justify-between text-xs">
                  {c.site_count > 0 ? (
                    <span className="text-paper/50">
                      {c.site_count} website{c.site_count !== 1 ? "s" : ""}
                      {c.primary_domain && (
                        <span className="text-gold-400/80"> · {displayDomain(c.primary_domain)}</span>
                      )}
                    </span>
                  ) : (
                    <span className="text-amber-400/90 font-medium">No website yet</span>
                  )}
                  {c.primary_stage && (
                    <StatusBadge status={c.primary_stage} />
                  )}
                </div>
                <p className="text-[11px] text-paper/30 mt-2">
                  Updated {formatDate(c.updated_at)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
