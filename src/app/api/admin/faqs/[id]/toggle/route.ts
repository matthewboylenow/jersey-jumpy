import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();

  await db
    .update(faqs)
    .set({
      isActive: sql`NOT ${faqs.isActive}`,
    })
    .where(eq(faqs.id, parseInt(id)));

  return NextResponse.json({ success: true });
}
