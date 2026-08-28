import { NextResponse } from "next/server";
import { getSiteCredentials } from "@/lib/admin/queries";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const creds = await getSiteCredentials(params.id);
    if (!creds) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(creds);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load credentials" }, { status: 500 });
  }
}
