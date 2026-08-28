"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

const nav = [
  { href: "/admin", label: "Overview", icon: "◉" },
  { href: "/admin/clients", label: "Clients", icon: "◎" },
  { href: "/admin/sites", label: "Sites", icon: "◫" },
  { href: "/admin/billing", label: "Billing", icon: "◈" },
  { href: "/admin/insights", label: "Insights", icon: "◔" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-slate-800 bg-surface-elevated/50">
      <div className="p-5 border-b border-slate-800">
        <Link href="/admin" className="font-display text-lg font-bold text-white">
          A.N <span className="text-brand-400">Studio</span>
        </Link>
        <p className="text-xs text-slate-500 mt-1">Business dashboard</p>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-brand-500/15 text-brand-400"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-xs opacity-70" aria-hidden>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          className="block text-center text-xs text-slate-500 hover:text-brand-400 py-2"
        >
          ← Public site
        </Link>
        <LogoutButton />
      </div>
    </aside>
  );
}
