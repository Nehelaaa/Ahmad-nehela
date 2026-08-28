import type { CareStatus, ProjectPaymentStatus, SiteStage } from "@/lib/admin/types";

const styles: Record<string, string> = {
  lead: "bg-slate-700 text-slate-200",
  building: "bg-blue-900/50 text-blue-300",
  review: "bg-violet-900/50 text-violet-300",
  live: "bg-emerald-900/50 text-emerald-300",
  paused: "bg-amber-900/50 text-amber-300",
  active: "bg-emerald-900/50 text-emerald-300",
  past: "bg-slate-700 text-slate-400",
  not_invoiced: "bg-slate-700 text-slate-300",
  sent: "bg-amber-900/50 text-amber-300",
  paid: "bg-emerald-900/50 text-emerald-300",
  partial: "bg-orange-900/50 text-orange-300",
  none: "bg-slate-700 text-slate-400",
  past_due: "bg-red-900/50 text-red-300",
  canceled: "bg-slate-700 text-slate-500",
};

export default function StatusBadge({
  status,
  label,
}: {
  status: SiteStage | ProjectPaymentStatus | CareStatus | string;
  label?: string;
}) {
  const text = label ?? status.replace(/_/g, " ");
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize ${styles[status] ?? styles.lead}`}
    >
      {text}
    </span>
  );
}
