"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSiteForm({ clientId }: { clientId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const priceDollars = fd.get("project_price");
    const cents =
      priceDollars && String(priceDollars).trim()
        ? Math.round(parseFloat(String(priceDollars)) * 100)
        : undefined;

    await fetch("/api/admin/sites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        name: fd.get("name"),
        domain: fd.get("domain"),
        stage: fd.get("stage"),
        package: fd.get("package"),
        project_price_quoted_cents: cents,
        project_price_final_cents: cents,
        tech_stack: fd.get("tech_stack"),
      }),
    });
    setLoading(false);
    setOpen(false);
    router.refresh();
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border border-dashed border-slate-600 py-4 text-sm text-slate-400 hover:text-brand-400 hover:border-brand-500/50"
      >
        + Add site
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-700/60 bg-surface-elevated p-5 space-y-3"
    >
      <h3 className="font-semibold text-white text-sm">New site</h3>
      <input
        name="name"
        required
        placeholder="Site name"
        className="w-full rounded-lg border border-slate-600 bg-surface px-3 py-2 text-sm text-white"
      />
      <input
        name="domain"
        placeholder="domain.com"
        className="w-full rounded-lg border border-slate-600 bg-surface px-3 py-2 text-sm text-white"
      />
      <div className="grid grid-cols-2 gap-2">
        <select
          name="package"
          defaultValue="launch"
          className="rounded-lg border border-slate-600 bg-surface px-2 py-2 text-sm text-white"
        >
          <option value="launch">Launch</option>
          <option value="grow">Grow</option>
          <option value="scale">Scale</option>
          <option value="custom">Custom</option>
        </select>
        <select
          name="stage"
          defaultValue="lead"
          className="rounded-lg border border-slate-600 bg-surface px-2 py-2 text-sm text-white"
        >
          <option value="lead">Lead</option>
          <option value="building">Building</option>
          <option value="review">Review</option>
          <option value="live">Live</option>
        </select>
      </div>
      <input
        name="project_price"
        type="number"
        min="0"
        step="1"
        placeholder="Project price ($)"
        className="w-full rounded-lg border border-slate-600 bg-surface px-3 py-2 text-sm text-white"
      />
      <input
        name="tech_stack"
        placeholder="WordPress, Next.js…"
        className="w-full rounded-lg border border-slate-600 bg-surface px-3 py-2 text-sm text-white"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-brand-500 py-2 text-sm font-semibold text-white"
        >
          {loading ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-3 rounded-lg border border-slate-600 text-sm text-slate-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
