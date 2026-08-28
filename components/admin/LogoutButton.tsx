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
      className="w-full rounded-xl border border-line px-3 py-2 text-sm text-paper/50 hover:text-paper hover:border-paper/20 transition-colors duration-200"
    >
      Sign out
    </button>
  );
}
