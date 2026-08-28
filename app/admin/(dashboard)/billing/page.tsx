import Link from "next/link";
import { getDashboardStats } from "@/lib/admin/queries";
import { formatCents } from "@/lib/admin/types";

export default async function BillingPage() {
  const stats = await getDashboardStats();

  return (
    <>
      <header className="border-b border-slate-800 px-6 py-5 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-white">Billing</h1>
        <p className="text-slate-500 text-sm mt-1">
          Stripe invoice & subscription links — Phase 2
        </p>
      </header>

      <div className="p-6 lg:p-8 max-w-2xl space-y-6">
        <div className="rounded-xl border border-brand-500/30 bg-brand-500/10 p-5">
          <h2 className="font-semibold text-white mb-2">Coming next</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            One-click <strong className="text-slate-300">Send project invoice</strong> and{" "}
            <strong className="text-slate-300">Send care subscription link</strong> from each client
            and site page. Connect your new Stripe web-business account when ready.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-700/60 bg-surface-elevated p-5">
            <p className="text-xs uppercase text-slate-500 mb-1">Outstanding projects</p>
            <p className="text-2xl font-bold text-amber-400 tabular-nums">
              {formatCents(stats.unpaidProjectCents)}
            </p>
            <p className="text-xs text-slate-500 mt-1">{stats.unpaidProjects} invoices sent</p>
          </div>
          <div className="rounded-xl border border-slate-700/60 bg-surface-elevated p-5">
            <p className="text-xs uppercase text-slate-500 mb-1">Monthly care (MRR)</p>
            <p className="text-2xl font-bold text-brand-400 tabular-nums">
              {formatCents(stats.mrrCents)}
            </p>
            <p className="text-xs text-slate-500 mt-1">{stats.activeCare} active</p>
          </div>
        </div>

        <Link href="/admin/clients" className="text-brand-400 hover:text-brand-300 text-sm">
          Manage clients →
        </Link>
      </div>
    </>
  );
}
