import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { inquiries } from "@/lib/db/schema";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      zip,
      requestedDate,
      requestedTime,
      requestedJumpy,
      referralSource,
      eventDetails,
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !address || !city || !state || !zip || !requestedDate || !requestedTime || !requestedJumpy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to database
    const db = getDb();
    await db.insert(inquiries).values({
      name,
      email,
      phone,
      address,
      city,
      state,
      zip,
      requestedDate: new Date(requestedDate).toISOString().split('T')[0],
      requestedTime,
      requestedJumpy,
      referralSource: referralSource || null,
      eventDetails: eventDetails || null,
      status: "new",
    });

    // Send email notification (if configured)
    try {
      await sendContactNotification({
        name,
        email,
        phone,
        address,
        city,
        state,
        zip,
        requestedDate,
        requestedTime,
        requestedJumpy,
        referralSource,
        eventDetails,
      });
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error("Failed to send email notification:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
