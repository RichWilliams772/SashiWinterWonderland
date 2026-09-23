import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { csvResponse, toCsv } from "@/lib/admin-csv";
import { listAdminGameIdeas } from "@/lib/admin-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const result = await listAdminGameIdeas();
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: "Game ideas could not be downloaded." }, { status: 502 });
  }

  const csv = toCsv(
    ["idea", "created_at"],
    result.ideas.map((idea) => [idea.idea, idea.createdAt]),
  );

  return csvResponse("wonderland-game-ideas.csv", csv);
}
