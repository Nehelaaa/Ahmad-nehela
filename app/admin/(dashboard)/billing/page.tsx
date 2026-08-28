import Link from "next/link";
import BillingOffers from "@/components/admin/BillingOffers";
import { getDashboardStats } from "@/lib/admin/queries";
import { formatCents } from "@/lib/admin/types";

export default async function BillingPage() {
  const stats = await getDashboardStats();

  return (
    <>
      <header className="border-b border-slate-800 px-6 py-5 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-white">Billing</h1>
        <p className="text-slate-500 text-sm mt-1">
          Copy a Stripe payment link and send it to your client
        </p>
      </header>

      <div className="p-6 lg:p-8 max-w-4xl space-y-10">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-700/60 bg-surface-elevated p-5">
            <p className="text-xs uppercase text-slate-500 mb-1">Outstanding projects</p>
            <p className="text-2xl font-bold text-amber-400 tabular-nums">
              {formatCents(stats.unpaidProjectCents)}
            </p>
            <p className="text-xs text-slate-500 mt-1">{stats.unpaidProjects} awaiting payment</p>
          </div>
          <div className="rounded-xl border border-slate-700/60 bg-surface-elevated p-5">
            <p className="text-xs uppercase text-slate-500 mb-1">Monthly care (MRR)</p>
            <p className="text-2xl font-bold text-brand-400 tabular-nums">
              {formatCents(stats.mrrCents)}
            </p>
            <p className="text-xs text-slate-500 mt-1">{stats.activeCare} active</p>
          </div>
        </div>

        <BillingOffers />

        <Link href="/admin/clients" className="text-brand-400 hover:text-brand-300 text-sm">
          Manage clients →
        </Link>
      </div>
    </>
  );
}
