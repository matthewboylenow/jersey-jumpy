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
    "Address",
    "City",
    "State",
    "ZIP",
    "Requested Date",
    "Requested Time",
    "Requested Inflatable",
    "Referral Source",
    "Event Details",
    "Status",
    "Notes",
    "Created At",
  ];

  const esc = (val: string | null | undefined) =>
    `"${(val || "").replace(/"/g, '""')}"`;

  const rows = allInquiries.map((inquiry) => [
    inquiry.id,
    esc(inquiry.name),
    esc(inquiry.email),
    esc(inquiry.phone),
    esc(inquiry.address),
    esc(inquiry.city),
    esc(inquiry.state),
    esc(inquiry.zip),
    inquiry.requestedDate
      ? new Date(inquiry.requestedDate).toLocaleDateString()
      : "",
    esc(inquiry.requestedTime),
    esc(inquiry.requestedJumpy),
    esc(inquiry.referralSource),
    esc(inquiry.eventDetails),
    inquiry.status,
    esc(inquiry.notes),
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
