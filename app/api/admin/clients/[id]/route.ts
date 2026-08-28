import { NextResponse } from "next/server";
import {
  getClient,
  listSitesForClient,
  updateClient,
} from "@/lib/admin/queries";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await getClient(params.id);
    if (!client) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const sites = await listSitesForClient(params.id);
    return NextResponse.json({ client, sites });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load client" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const client = await updateClient(params.id, body);
    if (!client) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(client);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update client" }, { status: 500 });
  }
}
