import { getDb } from "@/lib/db";
import { inquiries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InquiryStatusBadge } from "@/components/admin/InquiryStatusBadge";
import { InquiryActions } from "@/components/admin/InquiryActions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InquiryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const db = getDb();

  const result = await db
    .select()
    .from(inquiries)
    .where(eq(inquiries.id, parseInt(id)))
    .limit(1);

  const inquiry = result[0];

  if (!inquiry) {
    notFound();
  }

  const formatDate = (date: Date | string | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (date: Date | string | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href="/admin/inquiries">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Inquiries
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-slate-900">
            Inquiry from {inquiry.name}
          </h1>
          <p className="text-slate-600 mt-1">
            Received {formatDateTime(inquiry.createdAt)}
          </p>
        </div>
        <InquiryStatusBadge status={inquiry.status || "new"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {inquiry.email}
                  </a>
                </div>
              </div>

              {inquiry.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <a
                      href={`tel:${inquiry.phone}`}
                      className="text-green-600 hover:underline"
                    >
                      {inquiry.phone}
                    </a>
                  </div>
                </div>
              )}

              {(inquiry.address || inquiry.city) && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Address</p>
                    <p className="text-slate-900">
                      {inquiry.address}
                      {inquiry.address2 && `, ${inquiry.address2}`}
                      {inquiry.city && <br />}
                      {inquiry.city}
                      {inquiry.state && `, ${inquiry.state}`} {inquiry.zip}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Event Details */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Event Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {inquiry.requestedDate && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Requested Date</p>
                    <p className="text-slate-900 font-medium">
                      {formatDate(inquiry.requestedDate)}
                    </p>
                  </div>
                </div>
              )}

              {inquiry.requestedTime && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Requested Time</p>
                    <p className="text-slate-900 font-medium">
                      {inquiry.requestedTime}
                    </p>
                  </div>
                </div>
              )}

              {inquiry.requestedJumpy && (
                <div className="col-span-2">
                  <p className="text-sm text-slate-500">Requested Inflatable</p>
                  <p className="text-slate-900 font-medium">
                    {inquiry.requestedJumpy}
                  </p>
                </div>
              )}
            </div>

            {inquiry.eventDetails && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-500 mb-2">Event Details / Message</p>
                <p className="text-slate-900 whitespace-pre-wrap">
                  {inquiry.eventDetails}
                </p>
              </div>
            )}

            {inquiry.referralSource && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-500">How did they hear about us?</p>
                <p className="text-slate-900">{inquiry.referralSource}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Actions</h2>
            <InquiryActions inquiry={inquiry} />
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Internal Notes
            </h2>
            {inquiry.notes ? (
              <p className="text-slate-700 whitespace-pre-wrap">{inquiry.notes}</p>
            ) : (
              <p className="text-slate-500 italic">No notes added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
