import { getDb } from "@/lib/db";
import { emailLogs } from "@/lib/db/schema";

const ELASTIC_EMAIL_API_URL = "https://api.elasticemail.com/v4/emails/transactional";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

interface EmailLogParams {
  emailType: string;
  relatedInquiryId?: number;
}

interface ElasticEmailResponse {
  MessageID?: string;
  TransactionID?: string;
}

async function logEmail(
  params: SendEmailParams,
  logParams: EmailLogParams,
  status: "sent" | "failed",
  response?: ElasticEmailResponse,
  errorMessage?: string
) {
  try {
    const db = getDb();
    await db.insert(emailLogs).values({
      recipient: params.to,
      subject: params.subject,
      status,
      errorMessage: errorMessage || null,
      messageId: response?.MessageID || null,
      transactionId: response?.TransactionID || null,
      emailType: logParams.emailType,
      relatedInquiryId: logParams.relatedInquiryId || null,
    });
  } catch (err) {
    // Don't let logging failures break email sending
    console.error("Failed to log email:", err);
  }
}

export async function sendEmail(
  { to, subject, html, replyTo }: SendEmailParams,
  logParams: EmailLogParams = { emailType: "unknown" }
) {
  try {
    const response = await fetch(ELASTIC_EMAIL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ElasticEmail-ApiKey": process.env.ELASTIC_EMAIL_API_KEY!,
      },
      body: JSON.stringify({
        Recipients: {
          To: [to],
        },
        Content: {
          From: process.env.ELASTIC_EMAIL_FROM || "info@jerseyjumpy.com",
          ReplyTo: replyTo,
          Subject: subject,
          Body: [
            {
              ContentType: "HTML",
              Content: html,
            },
          ],
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(`Failed to send email: ${errorText}`);

      // Log the failed attempt
      await logEmail(
        { to, subject, html, replyTo },
        logParams,
        "failed",
        undefined,
        errorText
      );

      throw error;
    }

    const result: ElasticEmailResponse = await response.json();

    // Log the successful send
    await logEmail({ to, subject, html, replyTo }, logParams, "sent", result);

    return result;
  } catch (error) {
    // If it's already our error, re-throw it (already logged)
    if (error instanceof Error && error.message.startsWith("Failed to send email:")) {
      throw error;
    }

    // Log unexpected errors
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    await logEmail(
      { to, subject, html, replyTo },
      logParams,
      "failed",
      undefined,
      errorMessage
    );

    throw error;
  }
}

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  requestedDate?: string;
  requestedTime?: string;
  requestedJumpy?: string;
  referralSource?: string;
  eventDetails?: string;
}

export async function sendContactNotification(
  formData: ContactFormData,
  inquiryId?: number
) {
  // Email to Jersey Jumpy team
  await sendEmail(
    {
      to: process.env.CONTACT_EMAIL_TO || "info@jerseyjumpy.com",
      subject: `New Booking Request: ${formData.name} - ${formData.requestedJumpy || "General Inquiry"}`,
      replyTo: formData.email,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7C5DFA;">New Booking Request</h2>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2D2A3E;">Contact Information</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
        </div>

        ${formData.address ? `
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2D2A3E;">Event Address</h3>
          <p>${formData.address}${formData.address2 ? `, ${formData.address2}` : ""}</p>
          <p>${formData.city || ""}, ${formData.state || ""} ${formData.zip || ""}</p>
        </div>
        ` : ""}

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2D2A3E;">Event Details</h3>
          <p><strong>Requested Date:</strong> ${formData.requestedDate || "Not specified"}</p>
          <p><strong>Requested Time:</strong> ${formData.requestedTime || "Not specified"}</p>
          <p><strong>Requested Jumpy:</strong> ${formData.requestedJumpy || "Not specified"}</p>
        </div>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2D2A3E;">Additional Information</h3>
          <p><strong>How they heard about us:</strong> ${formData.referralSource || "Not specified"}</p>
          <p><strong>Event Details:</strong></p>
          <p>${formData.eventDetails || "None provided"}</p>
        </div>
      </div>
    `,
    },
    { emailType: "contact_notification", relatedInquiryId: inquiryId }
  );

  // Confirmation email to customer
  await sendEmail(
    {
      to: formData.email,
      subject: "Thanks for contacting Jersey Jumpy!",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7C5DFA;">We Got Your Request!</h2>

        <p>Hi ${formData.name},</p>

        <p>Thanks for reaching out to Jersey Jumpy! We've received your booking request and will get back to you within 24 hours.</p>

        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2D2A3E;">Your Request</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 10px 0;"><strong>Inflatable:</strong> ${formData.requestedJumpy || "Not specified"}</li>
            <li style="margin: 10px 0;"><strong>Date:</strong> ${formData.requestedDate || "Not specified"}</li>
            <li style="margin: 10px 0;"><strong>Time:</strong> ${formData.requestedTime || "Not specified"}</li>
          </ul>
        </div>

        <p>Need to reach us sooner? Give us a call at <strong><a href="tel:866-597-6625">866-597-6625</a></strong>!</p>

        <p style="color: #5C5470;">- The Jersey Jumpy Team</p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

        <p style="font-size: 12px; color: #8E8BA3;">
          JerseyJumpy.com LLC<br />
          PO Box: 217, Iselin, NJ 08830<br />
          Toll Free: 866-597-6625 | Local: 732-750-8810
        </p>
      </div>
    `,
    },
    { emailType: "contact_confirmation", relatedInquiryId: inquiryId }
  );
}
