import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const db = getDb();

  const result = await db
    .insert(testimonials)
    .values({
      ...data,
      createdAt: new Date(),
    })
    .returning({ id: testimonials.id });

  return NextResponse.json({ success: true, id: result[0].id });
}
