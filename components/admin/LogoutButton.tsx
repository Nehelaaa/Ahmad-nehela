"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="w-full rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
    >
      Sign out
    </button>
  );
}
