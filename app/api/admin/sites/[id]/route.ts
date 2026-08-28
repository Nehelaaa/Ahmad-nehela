import { NextResponse } from "next/server";
import { getSite, updateSite } from "@/lib/admin/queries";

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
    return NextResponse.json(site);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update site" }, { status: 500 });
  }
}
