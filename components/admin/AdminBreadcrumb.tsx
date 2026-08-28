import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function AdminBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-slate-600">/</span>}
            {item.href && !isLast ? (
              <Link href={item.href} className="text-slate-500 hover:text-brand-400">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-slate-300" : "text-slate-500"}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
