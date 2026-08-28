import { NextResponse } from "next/server";
import {
  getActionQueue,
  getDashboardStats,
  listRecentActivity,
} from "@/lib/admin/queries";

export async function GET() {
  try {
    const [stats, actions, activity] = await Promise.all([
      getDashboardStats(),
      getActionQueue(),
      listRecentActivity(),
    ]);
    return NextResponse.json({ stats, actions, activity });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
