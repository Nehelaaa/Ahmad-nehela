import Link from "next/link";
import SiteKanban from "@/components/admin/SiteKanban";
import { listSitesWithClients } from "@/lib/admin/queries";

export default async function SitesPage() {
  const sites = await listSitesWithClients();

  return (
    <>
      <header className="border-b border-slate-800 px-6 py-5 lg:px-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Websites</h1>
          <p className="text-slate-500 text-sm mt-1">
            Project pipeline — each card is a site tied to a client
          </p>
        </div>
        <Link
          href="/admin/clients/new"
          className="inline-flex items-center rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-400"
        >
          + Add client & website
        </Link>
      </header>

      <div className="p-6 lg:p-8">
        {sites.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 p-12 text-center">
            <p className="text-slate-400 mb-4">
              No websites yet. Add a client and their site in one step.
            </p>
            <Link href="/admin/clients/new" className="text-brand-400 hover:text-brand-300">
              Add client & website →
            </Link>
          </div>
        ) : (
          <SiteKanban sites={sites} />
        )}
      </div>
    </>
  );
}
