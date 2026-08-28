"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

const nav = [
  { href: "/admin", label: "Overview", icon: "◉" },
  { href: "/admin/clients", label: "Clients", icon: "◎", hint: "Businesses" },
  { href: "/admin/sites", label: "Websites", icon: "◫", hint: "Projects" },
  { href: "/admin/billing", label: "Billing", icon: "◈" },
  { href: "/admin/insights", label: "Insights", icon: "◔" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-line bg-surface-elevated/60">
      <div className="p-5 border-b border-line">
        <Link href="/admin" className="font-display text-lg text-paper">
          Top Web <span className="italic text-gold-400">Developer</span>
        </Link>
        <p className="text-xs text-paper/40 mt-1">Business dashboard</p>
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
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                active
                  ? "bg-gold-500/12 text-gold-300"
                  : "text-paper/50 hover:text-paper hover:bg-white/5"
              }`}
            >
              <span className="text-xs opacity-70" aria-hidden>
                {item.icon}
              </span>
              <span>
                {item.label}
                {"hint" in item && item.hint && (
                  <span className="block text-[10px] font-normal text-paper/30">
                    {item.hint}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-line space-y-2">
        <Link
          href="/"
          className="block text-center text-xs text-paper/40 hover:text-gold-300 py-2 transition-colors"
        >
          ← Public site
        </Link>
        <LogoutButton />
      </div>
    </aside>
  );
}
