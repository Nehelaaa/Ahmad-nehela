"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        business_name: fd.get("business_name"),
        contact_name: fd.get("contact_name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        source: fd.get("source"),
        notes: fd.get("notes"),
        status: fd.get("status"),
      }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Could not save client");
      return;
    }
    const client = await res.json();
    router.push(`/admin/clients/${client.id}`);
    router.refresh();
  }

  return (
    <>
      <header className="border-b border-slate-800 px-6 py-5 lg:px-8">
        <Link href="/admin/clients" className="text-xs text-slate-500 hover:text-brand-400">
          ← Clients
        </Link>
        <h1 className="font-display text-2xl font-bold text-white mt-2">Add client</h1>
      </header>

      <div className="p-6 lg:p-8 max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">Business name *</span>
            <input
              name="business_name"
              required
              className="w-full rounded-xl border border-slate-600 bg-surface-elevated px-4 py-3 text-white"
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">Contact name</span>
            <input
              name="contact_name"
              className="w-full rounded-xl border border-slate-600 bg-surface-elevated px-4 py-3 text-white"
            />
          </label>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-slate-400 mb-1 block">Email</span>
              <input
                name="email"
                type="email"
                className="w-full rounded-xl border border-slate-600 bg-surface-elevated px-4 py-3 text-white"
              />
            </label>
            <label className="block">
              <span className="text-sm text-slate-400 mb-1 block">Phone</span>
              <input
                name="phone"
                type="tel"
                className="w-full rounded-xl border border-slate-600 bg-surface-elevated px-4 py-3 text-white"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">Lead source</span>
            <input
              name="source"
              placeholder="Referral, Google, cold outreach…"
              className="w-full rounded-xl border border-slate-600 bg-surface-elevated px-4 py-3 text-white"
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">Status</span>
            <select
              name="status"
              defaultValue="lead"
              className="w-full rounded-xl border border-slate-600 bg-surface-elevated px-4 py-3 text-white"
            >
              <option value="lead">Lead</option>
              <option value="active">Active</option>
              <option value="past">Past client</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-slate-400 mb-1 block">Notes</span>
            <textarea
              name="notes"
              rows={3}
              className="w-full rounded-xl border border-slate-600 bg-surface-elevated px-4 py-3 text-white resize-none"
            />
          </label>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-brand-500 px-6 py-3 font-semibold text-white hover:bg-brand-400 disabled:opacity-60"
          >
            {loading ? "Saving…" : "Save client"}
          </button>
        </form>
      </div>
    </>
  );
}
