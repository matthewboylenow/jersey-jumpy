import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { inquiries } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const allInquiries = await db
    .select()
    .from(inquiries)
    .orderBy(desc(inquiries.createdAt));

  // Generate CSV
  const headers = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Requested Date",
    "Requested Inflatable",
    "Event Details",
    "Status",
    "Created At",
  ];

  const rows = allInquiries.map((inquiry) => [
    inquiry.id,
    `"${(inquiry.name || "").replace(/"/g, '""')}"`,
    `"${(inquiry.email || "").replace(/"/g, '""')}"`,
    `"${(inquiry.phone || "").replace(/"/g, '""')}"`,
    inquiry.requestedDate
      ? new Date(inquiry.requestedDate).toLocaleDateString()
      : "",
    `"${(inquiry.requestedJumpy || "").replace(/"/g, '""')}"`,
    `"${(inquiry.eventDetails || "").replace(/"/g, '""')}"`,
    inquiry.status,
    inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString() : "",
  ]);

  const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
    "\n"
  );

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="inquiries-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
