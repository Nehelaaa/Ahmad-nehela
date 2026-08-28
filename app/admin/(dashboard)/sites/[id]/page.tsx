import { notFound } from "next/navigation";
import SiteDetailPanel from "@/components/admin/SiteDetailPanel";
import { getSite } from "@/lib/admin/queries";
import type { SitePublic } from "@/lib/admin/types";

export default async function SiteDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { saved?: string };
}) {
  const site = await getSite(params.id);
  if (!site) notFound();

  const { login_password_enc, ...siteSafe } = site;
  const hasPassword = Boolean(login_password_enc);

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      {searchParams.saved === "1" && (
        <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          Website saved. You can edit details and credentials below anytime.
        </div>
      )}
      <SiteDetailPanel
        site={siteSafe as SitePublic}
        businessName={site.business_name}
        clientId={site.client_id}
        hasPassword={hasPassword}
        clientPhone={site.client_phone}
        clientEmail={site.client_email}
      />
    </div>
  );
}
