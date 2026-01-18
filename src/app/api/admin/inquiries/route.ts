import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { inquiries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await request.json();
  const db = getDb();

  await db
    .update(inquiries)
    .set({ status })
    .where(eq(inquiries.id, id));

  return NextResponse.json({ success: true });
}
