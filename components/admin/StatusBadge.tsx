import type { CareStatus, ProjectPaymentStatus, SiteStage } from "@/lib/admin/types";

const styles: Record<string, string> = {
  lead: "bg-surface-high text-paper/70 ring-1 ring-line",
  building: "bg-blue-900/40 text-blue-300 ring-1 ring-blue-500/20",
  review: "bg-violet-900/40 text-violet-300 ring-1 ring-violet-500/20",
  live: "bg-emerald-900/40 text-emerald-300 ring-1 ring-emerald-500/20",
  paused: "bg-gold-900/40 text-gold-300 ring-1 ring-gold-500/20",
  active: "bg-emerald-900/40 text-emerald-300 ring-1 ring-emerald-500/20",
  past: "bg-surface-high text-paper/45 ring-1 ring-line",
  not_invoiced: "bg-surface-high text-paper/60 ring-1 ring-line",
  sent: "bg-gold-900/40 text-gold-300 ring-1 ring-gold-500/20",
  paid: "bg-emerald-900/40 text-emerald-300 ring-1 ring-emerald-500/20",
  partial: "bg-orange-900/40 text-orange-300 ring-1 ring-orange-500/20",
  none: "bg-surface-high text-paper/45 ring-1 ring-line",
  past_due: "bg-red-900/40 text-red-300 ring-1 ring-red-500/20",
  canceled: "bg-surface-high text-paper/30 ring-1 ring-line",
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
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status] ?? styles.lead}`}
    >
      {text}
    </span>
  );
}
