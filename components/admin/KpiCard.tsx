interface KpiCardProps {
  label: string;
  value: string;
  hint?: string;
  accent?: "brand" | "green" | "amber" | "red" | "default";
}

const accentMap = {
  brand: "text-brand-400",
  green: "text-emerald-400",
  amber: "text-amber-400",
  red: "text-red-400",
  default: "text-white",
};

export default function KpiCard({
  label,
  value,
  hint,
  accent = "default",
}: KpiCardProps) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-surface-elevated p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">
        {label}
      </p>
      <p className={`text-2xl sm:text-3xl font-bold tabular-nums ${accentMap[accent]}`}>
        {value}
      </p>
      {hint && <p className="text-xs text-slate-500 mt-2">{hint}</p>}
    </div>
  );
}
