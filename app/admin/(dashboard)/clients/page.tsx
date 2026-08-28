import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";
import { listClients } from "@/lib/admin/queries";
import { formatDate } from "@/lib/admin/types";

export default async function ClientsPage() {
  const clients = await listClients();

  return (
    <>
      <header className="border-b border-slate-800 px-6 py-5 lg:px-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Clients</h1>
          <p className="text-slate-500 text-sm mt-1">{clients.length} total</p>
        </div>
        <Link
          href="/admin/clients/new"
          className="inline-flex items-center rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-400"
        >
          + Add client
        </Link>
      </header>

      <div className="p-6 lg:p-8">
        {clients.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 p-12 text-center">
            <p className="text-slate-400 mb-4">No clients yet.</p>
            <Link href="/admin/clients/new" className="text-brand-400 hover:text-brand-300">
              Add your first client →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-700/60">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-surface-elevated text-left text-slate-500">
                  <th className="px-4 py-3 font-medium">Business</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">Contact</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Email</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium hidden lg:table-cell">Updated</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-slate-800/80 hover:bg-surface-elevated/50"
                  >
                    <td className="px-4 py-3 font-medium text-white">{c.business_name}</td>
                    <td className="px-4 py-3 text-slate-400 hidden sm:table-cell">
                      {c.contact_name || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-400 hidden md:table-cell">
                      {c.email || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-4 py-3 text-slate-500 hidden lg:table-cell">
                      {formatDate(c.updated_at)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/clients/${c.id}`}
                        className="text-brand-400 hover:text-brand-300"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
