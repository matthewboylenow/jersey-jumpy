import { getDb } from "@/lib/db";
import { emailLogs, inquiries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, Clock, Mail, ExternalLink, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

function EmailStatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    sent: {
      bg: "bg-mint-light",
      text: "text-mint-dark",
      icon: <CheckCircle className="w-4 h-4" />,
    },
    failed: {
      bg: "bg-coral-light",
      text: "text-coral-dark",
      icon: <XCircle className="w-4 h-4" />,
    },
    pending: {
      bg: "bg-butter-light",
      text: "text-butter-dark",
      icon: <Clock className="w-4 h-4" />,
    },
  };

  const style = styles[status] || styles.pending;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
    >
      {style.icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

async function getEmailLog(id: number) {
  const db = getDb();
  const [log] = await db.select().from(emailLogs).where(eq(emailLogs.id, id));

  if (!log) return null;

  // Get related inquiry if exists
  let inquiry = null;
  if (log.relatedInquiryId) {
    const [result] = await db
      .select()
      .from(inquiries)
      .where(eq(inquiries.id, log.relatedInquiryId));
    inquiry = result;
  }

  return { log, inquiry };
}

export default async function EmailLogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getEmailLog(parseInt(id));

  if (!result) {
    notFound();
  }

  const { log, inquiry } = result;

  const emailTypeLabels: Record<string, string> = {
    contact_notification: "Team Notification",
    contact_confirmation: "Customer Confirmation",
    unknown: "Unknown",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/email-logs">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Email Log Details</h1>
          <p className="text-slate-600 mt-1">Log #{log.id}</p>
        </div>
        <EmailStatusBadge status={log.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Email Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Email Information</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-slate-500">Recipient</dt>
                <dd className="mt-1 text-slate-900">{log.recipient}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Subject</dt>
                <dd className="mt-1 text-slate-900">{log.subject}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Type</dt>
                <dd className="mt-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                    <Mail className="w-3 h-3" />
                    {emailTypeLabels[log.emailType] || log.emailType}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Sent At</dt>
                <dd className="mt-1 text-slate-900">
                  {log.createdAt
                    ? new Date(log.createdAt).toLocaleString("en-US", {
                        dateStyle: "full",
                        timeStyle: "medium",
                      })
                    : "N/A"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Error Details (if failed) */}
          {log.status === "failed" && log.errorMessage && (
            <div className="bg-coral-light/20 border border-coral rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-coral-dark flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-semibold text-coral-dark mb-2">Error Details</h2>
                  <pre className="text-sm text-coral-dark whitespace-pre-wrap font-mono bg-white/50 rounded-lg p-4 overflow-x-auto">
                    {log.errorMessage}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Elastic Email Response */}
          {(log.messageId || log.transactionId) && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Elastic Email Response</h2>
              <dl className="space-y-4">
                {log.messageId && (
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Message ID</dt>
                    <dd className="mt-1 font-mono text-sm text-slate-900 bg-slate-50 px-3 py-2 rounded">
                      {log.messageId}
                    </dd>
                  </div>
                )}
                {log.transactionId && (
                  <div>
                    <dt className="text-sm font-medium text-slate-500">Transaction ID</dt>
                    <dd className="mt-1 font-mono text-sm text-slate-900 bg-slate-50 px-3 py-2 rounded">
                      {log.transactionId}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Related Inquiry */}
          {inquiry && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Related Inquiry</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-500">Customer</p>
                  <p className="font-medium text-slate-900">{inquiry.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Requested</p>
                  <p className="font-medium text-slate-900">{inquiry.requestedJumpy || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Date</p>
                  <p className="font-medium text-slate-900">
                    {inquiry.requestedDate
                      ? new Date(inquiry.requestedDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                  <Link href={`/admin/inquiries/${inquiry.id}`}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Inquiry
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {!inquiry && log.relatedInquiryId && (
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Related Inquiry</h2>
              <p className="text-sm text-slate-500">
                The linked inquiry (ID: {log.relatedInquiryId}) may have been deleted.
              </p>
            </div>
          )}

          {/* Quick Info */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Info</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Log ID</dt>
                <dd className="font-medium text-slate-900">#{log.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Status</dt>
                <dd className="font-medium text-slate-900 capitalize">{log.status}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Type</dt>
                <dd className="font-medium text-slate-900">
                  {log.emailType === "contact_notification" ? "Notification" : "Confirmation"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
