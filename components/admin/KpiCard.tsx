interface KpiCardProps {
  label: string;
  value: string;
  hint?: string;
  accent?: "brand" | "green" | "amber" | "red" | "default";
}

const accentMap = {
  brand: "text-gold-400",
  green: "text-emerald-400",
  amber: "text-amber-400",
  red: "text-red-400",
  default: "text-paper",
};

export default function KpiCard({
  label,
  value,
  hint,
  accent = "default",
}: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-surface-elevated p-5 hover:border-paper/15 transition-colors duration-300">
      <p className="text-xs font-medium uppercase tracking-wide text-paper/40 mb-2">
        {label}
      </p>
      <p className={`font-display text-2xl sm:text-3xl tabular-nums ${accentMap[accent]}`}>
        {value}
      </p>
      {hint && <p className="text-xs text-paper/40 mt-2">{hint}</p>}
    </div>
  );
}
