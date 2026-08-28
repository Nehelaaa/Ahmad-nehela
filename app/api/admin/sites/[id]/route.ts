import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSite, updateSite } from "@/lib/admin/queries";

function revalidateSitePaths(clientId: string, siteId: string) {
  revalidatePath("/admin/clients");
  revalidatePath(`/admin/clients/${clientId}`);
  revalidatePath("/admin/sites");
  revalidatePath(`/admin/sites/${siteId}`);
  revalidatePath("/admin");
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const site = await getSite(params.id);
    if (!site) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(site);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load site" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const site = await updateSite(params.id, body);
    if (!site) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    revalidateSitePaths(site.client_id, site.id);
    return NextResponse.json(site);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update site" }, { status: 500 });
  }
}
