import Link from "next/link";
import { notFound } from "next/navigation";
import SiteDetailPanel from "@/components/admin/SiteDetailPanel";
import { getSite } from "@/lib/admin/queries";
import type { SitePublic } from "@/lib/admin/types";

export default async function SiteDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const site = await getSite(params.id);
  if (!site) notFound();

  const { login_password_enc: _, ...siteSafe } = site;

  return (
    <>
      <header className="border-b border-slate-800 px-6 py-5 lg:px-8">
        <Link href="/admin/sites" className="text-xs text-slate-500 hover:text-brand-400">
          ← Websites
        </Link>
        <p className="text-xs text-brand-400 uppercase tracking-wide font-medium mt-2 mb-1">
          Website project
        </p>
      </header>

      <div className="p-6 lg:p-8 max-w-3xl">
        <SiteDetailPanel
          site={siteSafe as SitePublic}
          businessName={site.business_name}
          clientId={site.client_id}
        />
      </div>
    </>
  );
}
