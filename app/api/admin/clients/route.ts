import { NextResponse } from "next/server";
import { createClient, createClientWithSite } from "@/lib/admin/queries";

export async function GET() {
  try {
    const { listClientsWithSites } = await import("@/lib/admin/queries");
    const clients = await listClientsWithSites();
    return NextResponse.json(clients);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load clients" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.business_name?.trim()) {
      return NextResponse.json(
        { error: "Business name is required" },
        { status: 400 }
      );
    }

    const clientPayload = {
      business_name: body.business_name.trim(),
      contact_name: body.contact_name?.trim(),
      email: body.email?.trim(),
      phone: body.phone?.trim(),
      notes: body.notes?.trim(),
      source: body.source?.trim(),
      status: body.status,
    };

    if (body.site?.domain?.trim() || body.site?.name?.trim()) {
      const { client, site } = await createClientWithSite(clientPayload, {
        name:
          body.site.name?.trim() ||
          body.site.domain?.trim() ||
          body.business_name.trim(),
        domain: body.site.domain?.trim(),
        staging_url: body.site.staging_url?.trim(),
        platform: body.site.platform,
        admin_url: body.site.admin_url?.trim(),
        login_username: body.site.login_username?.trim(),
        login_password: body.site.login_password,
        hosting_provider: body.site.hosting_provider?.trim(),
        site_notes: body.site.site_notes?.trim(),
        stage: body.site.stage,
        package: body.site.package,
        project_price_cents: body.site.project_price_cents,
      });
      return NextResponse.json({ client, site }, { status: 201 });
    }

    const client = await createClient(clientPayload);
    return NextResponse.json({ client, site: null }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
  }
}
