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
      _hp,
      _ts,
    } = body;

    // Honeypot check — bots fill hidden fields
    if (_hp) {
      return NextResponse.json({ success: true });
    }

    // Timing check — reject submissions faster than 3 seconds
    if (_ts && Date.now() - _ts < 3000) {
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (!name || !email || !phone || !address || !city || !state || !zip || !requestedDate || !requestedTime || !requestedJumpy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to database
    const db = getDb();
    const [inserted] = await db.insert(inquiries).values({
      name,
      email,
      phone,
      address,
      city,
      state,
      zip,
      // requestedDate is already a calendar date string (YYYY-MM-DD) from the
      // date input. Store it as-is — converting through new Date()/toISOString
      // applies a UTC shift that can move it to the wrong day.
      requestedDate: requestedDate.slice(0, 10),
      requestedTime,
      requestedJumpy,
      referralSource: referralSource || null,
      eventDetails: eventDetails || null,
      status: "new",
    }).returning({ id: inquiries.id });

    // Send email notification (if configured)
    try {
      await sendContactNotification(
        {
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
        },
        inserted.id
      );
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
