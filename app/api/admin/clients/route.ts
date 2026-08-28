import { NextResponse } from "next/server";
import { createClient, listClients } from "@/lib/admin/queries";

export async function GET() {
  try {
    const clients = await listClients();
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
    const client = await createClient({
      business_name: body.business_name.trim(),
      contact_name: body.contact_name?.trim(),
      email: body.email?.trim(),
      phone: body.phone?.trim(),
      address: body.address?.trim(),
      notes: body.notes?.trim(),
      source: body.source?.trim(),
      status: body.status,
    });
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
  }
}
