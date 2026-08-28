import Link from "next/link";
import SiteList from "@/components/admin/SiteList";
import { listSitesWithClients } from "@/lib/admin/queries";

export default async function SitesPage() {
  const sites = await listSitesWithClients();

  return (
    <>
      <header className="border-b border-line px-6 py-5 lg:px-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-paper">Websites</h1>
          <p className="text-paper/40 text-sm mt-1">
            {sites.length} {sites.length === 1 ? "site" : "sites"}
          </p>
        </div>
        <Link
          href="/admin/clients/new"
          className="inline-flex items-center rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-paper hover:bg-gold-400"
        >
          + Add
        </Link>
      </header>

      <div className="p-6 lg:p-8 max-w-4xl">
        {sites.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line p-12 text-center">
            <p className="text-paper font-medium mb-2">No websites yet</p>
            <p className="text-paper/40 text-sm mb-6">
              Add a client and their site together.
            </p>
            <Link
              href="/admin/clients/new"
              className="inline-flex rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-paper hover:bg-gold-400"
            >
              Add client & website
            </Link>
          </div>
        ) : (
          <SiteList sites={sites} />
        )}
      </div>
    </>
  );
}
