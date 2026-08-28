import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSite } from "@/lib/admin/queries";
import { getSql } from "@/lib/db";
import { sendOfferToClient } from "@/lib/admin/send-offer";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const site = await getSite(params.id);
    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    const body = await request.json();
    const offerId = String(body.offerId || "");
    const channels = (Array.isArray(body.channels) ? body.channels : ["sms"]) as Array<
      "sms" | "email"
    >;

    if (!offerId) {
      return NextResponse.json({ error: "Pick a plan" }, { status: 400 });
    }

    const result = await sendOfferToClient({
      siteId: site.id,
      offerId,
      channels,
      businessName: site.business_name,
      contactName: site.contact_name,
      phone: site.client_phone,
      email: site.client_email,
    });

    const sql = getSql();
    const via = [
      result.sent.sms ? `SMS ${result.sent.sms}` : null,
      result.sent.email ? `email ${result.sent.email}` : null,
    ]
      .filter(Boolean)
      .join(" + ");

    await sql`
      INSERT INTO activity_log (client_id, site_id, type, description)
      VALUES (
        ${site.client_id},
        ${site.id},
        ${"offer_sent"},
        ${`Sent ${result.offer.name} (${result.offer.summary}) via ${via}`}
      )
    `;

    revalidatePath(`/admin/sites/${site.id}`);
    revalidatePath(`/admin/clients/${site.client_id}`);
    revalidatePath("/admin/sites");
    revalidatePath("/admin");

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "Failed to send offer";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
