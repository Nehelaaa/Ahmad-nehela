import { NextResponse } from "next/server";
import { createSite, listSitesWithClients } from "@/lib/admin/queries";

export async function GET() {
  try {
    const sites = await listSitesWithClients();
    return NextResponse.json(sites);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load sites" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.client_id || !(body.name?.trim() || body.domain?.trim())) {
      return NextResponse.json(
        { error: "Client and domain are required" },
        { status: 400 }
      );
    }
    const quoted = body.project_price_quoted_cents ?? body.project_price_cents;
    const site = await createSite({
      client_id: body.client_id,
      name: body.name?.trim() || body.domain?.trim(),
      domain: body.domain?.trim(),
      staging_url: body.staging_url?.trim(),
      stage: body.stage,
      package: body.package,
      platform: body.platform,
      admin_url: body.admin_url?.trim(),
      login_username: body.login_username?.trim(),
      login_password: body.login_password,
      hosting_provider: body.hosting_provider?.trim(),
      site_notes: body.site_notes?.trim(),
      project_price_quoted_cents:
        quoted != null ? Math.round(Number(quoted)) : undefined,
      project_price_final_cents:
        body.project_price_final_cents != null
          ? Math.round(Number(body.project_price_final_cents))
          : quoted != null
            ? Math.round(Number(quoted))
            : undefined,
      tech_stack: body.tech_stack?.trim(),
    });
    return NextResponse.json(site, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create site" }, { status: 500 });
  }
}
