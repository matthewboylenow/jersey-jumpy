import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { settings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const db = getDb();

  // Upsert each setting
  for (const [key, value] of Object.entries(data)) {
    const existing = await db
      .select()
      .from(settings)
      .where(eq(settings.key, key))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(settings)
        .set({ value: value as string, updatedAt: new Date() })
        .where(eq(settings.key, key));
    } else {
      await db.insert(settings).values({
        key,
        value: value as string,
        updatedAt: new Date(),
      });
    }
  }

  return NextResponse.json({ success: true });
}
