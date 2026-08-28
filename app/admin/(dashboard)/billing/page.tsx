import Link from "next/link";
import { getDashboardStats } from "@/lib/admin/queries";
import { formatCents } from "@/lib/admin/types";
import { PROPOSAL_PLANS, formatProposalPlan } from "@/lib/admin/proposal-plans";
import { careSubscription } from "@/lib/content";

export default async function BillingPage() {
  const stats = await getDashboardStats();

  return (
    <>
      <header className="border-b border-slate-800 px-6 py-5 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-white">Billing</h1>
        <p className="text-slate-500 text-sm mt-1">
          Public care rate + private proposal plans you send to clients
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

        {/* Public site rate */}
        <section>
          <h2 className="font-semibold text-white mb-1">On the website</h2>
          <p className="text-sm text-slate-500 mb-4">
            What visitors see — Launch / Grow / Scale packages plus this care rate
          </p>
          <div className="rounded-2xl border border-slate-700/60 bg-surface-elevated p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-medium text-white">{careSubscription.name}</p>
              <p className="text-sm text-slate-500 mt-0.5">{careSubscription.tagline}</p>
            </div>
            <p className="font-display text-2xl font-bold text-white tabular-nums">
              ${careSubscription.price}
              <span className="text-sm font-medium text-slate-500">/mo</span>
            </p>
          </div>
        </section>

        {/* Admin-only proposal plans */}
        <section>
          <h2 className="font-semibold text-white mb-1">Proposal plans (admin only)</h2>
          <p className="text-sm text-slate-500 mb-4">
            Not on the public site — use these when you pitch a down payment + monthly care
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {PROPOSAL_PLANS.map((plan) => (
              <article
                key={plan.id}
                className="rounded-2xl border border-slate-700/60 bg-surface-elevated p-5 flex flex-col"
              >
                <div className="mb-4">
                  <h3 className="font-display text-lg font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{plan.tagline}</p>
                </div>
                <p className="text-white mb-1">
                  <span className="font-display text-2xl font-bold tabular-nums">
                    ${plan.downPayment.toLocaleString()}
                  </span>
                  <span className="text-slate-500 text-sm"> down</span>
                </p>
                <p className="text-brand-400 font-medium tabular-nums mb-3">
                  + ${plan.monthly}/mo
                </p>
                <p className="text-xs text-slate-500 mb-4">{plan.bestFor}</p>
                <ul className="space-y-1.5 text-sm text-slate-300 flex-1 mb-4">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-brand-500 shrink-0">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {plan.includesClientAdmin && (
                  <p className="text-xs font-medium text-emerald-400/90 mb-3">
                    Includes client admin access
                  </p>
                )}
                <p className="text-[11px] text-slate-600 border-t border-slate-700/60 pt-3">
                  {formatProposalPlan(plan)}
                </p>
              </article>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Stripe payment links for these plans come next — then you can send one click from a client page.
          </p>
        </section>

        <Link href="/admin/clients" className="text-brand-400 hover:text-brand-300 text-sm">
          Manage clients →
        </Link>
      </div>
    </>
  );
}
