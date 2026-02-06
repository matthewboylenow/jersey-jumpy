import { getDb } from "@/lib/db";
import { emailLogs } from "@/lib/db/schema";
import { desc, ilike, eq, and, or, sql } from "drizzle-orm";
import Link from "next/link";
import { Eye, CheckCircle, XCircle, Clock, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminSearch } from "@/components/admin/AdminSearch";
import { AdminStatusFilter } from "@/components/admin/AdminStatusFilter";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { Suspense } from "react";

const PAGE_SIZE = 20;

const emailStatuses = [
  { value: "all", label: "All Status" },
  { value: "sent", label: "Sent" },
  { value: "failed", label: "Failed" },
];

const emailTypes = [
  { value: "all", label: "All Types" },
  { value: "contact_notification", label: "Contact Notification" },
  { value: "contact_confirmation", label: "Contact Confirmation" },
];

interface SearchParams {
  q?: string;
  status?: string;
  type?: string;
  page?: string;
}

function EmailStatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    sent: {
      bg: "bg-mint-light",
      text: "text-mint-dark",
      icon: <CheckCircle className="w-3 h-3" />,
    },
    failed: {
      bg: "bg-coral-light",
      text: "text-coral-dark",
      icon: <XCircle className="w-3 h-3" />,
    },
    pending: {
      bg: "bg-butter-light",
      text: "text-butter-dark",
      icon: <Clock className="w-3 h-3" />,
    },
  };

  const style = styles[status] || styles.pending;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
    >
      {style.icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function EmailTypeBadge({ type }: { type: string }) {
  const labels: Record<string, string> = {
    contact_notification: "Team Notification",
    contact_confirmation: "Customer Confirmation",
    unknown: "Unknown",
  };

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
      <Mail className="w-3 h-3" />
      {labels[type] || type}
    </span>
  );
}

async function getEmailLogs(searchParams: SearchParams) {
  const db = getDb();
  const page = parseInt(searchParams.page || "1");
  const offset = (page - 1) * PAGE_SIZE;

  // Build conditions
  const conditions = [];

  if (searchParams.q) {
    const searchTerm = `%${searchParams.q}%`;
    conditions.push(
      or(
        ilike(emailLogs.recipient, searchTerm),
        ilike(emailLogs.subject, searchTerm)
      )
    );
  }

  if (searchParams.status && searchParams.status !== "all") {
    conditions.push(eq(emailLogs.status, searchParams.status));
  }

  if (searchParams.type && searchParams.type !== "all") {
    conditions.push(eq(emailLogs.emailType, searchParams.type));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Get total count
  const countResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(emailLogs)
    .where(whereClause);
  const totalItems = countResult[0]?.count || 0;

  // Get stats (for all emails, not filtered)
  const allItems = await db.select().from(emailLogs);
  const stats = {
    total: allItems.length,
    sent: allItems.filter((i) => i.status === "sent").length,
    failed: allItems.filter((i) => i.status === "failed").length,
  };

  // Get paginated items
  const items = await db
    .select()
    .from(emailLogs)
    .where(whereClause)
    .orderBy(desc(emailLogs.createdAt))
    .limit(PAGE_SIZE)
    .offset(offset);

  return {
    items,
    totalItems,
    totalPages: Math.ceil(totalItems / PAGE_SIZE),
    currentPage: page,
    stats,
  };
}

export default async function EmailLogsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { items, totalItems, totalPages, currentPage, stats } = await getEmailLogs(params);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Email Logs</h1>
        <p className="text-slate-600 mt-1">
          Track all outgoing emails sent from the contact form
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          <p className="text-sm text-slate-500">Total Emails</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-mint-dark">{stats.sent}</p>
          <p className="text-sm text-slate-500">Sent Successfully</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-coral-dark">{stats.failed}</p>
          <p className="text-sm text-slate-500">Failed</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Suspense fallback={<div className="w-64 h-10 bg-slate-100 rounded-md animate-pulse" />}>
          <AdminSearch placeholder="Search by recipient, subject..." />
        </Suspense>
        <Suspense fallback={<div className="w-36 h-10 bg-slate-100 rounded-md animate-pulse" />}>
          <AdminStatusFilter statuses={emailStatuses} />
        </Suspense>
        <Suspense fallback={<div className="w-36 h-10 bg-slate-100 rounded-md animate-pulse" />}>
          <AdminStatusFilter statuses={emailTypes} paramName="type" />
        </Suspense>
        {totalItems > 0 && (
          <span className="text-sm text-slate-500 ml-auto">
            {totalItems} email{totalItems !== 1 ? "s" : ""} found
          </span>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Sent
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No email logs found. Emails will be logged here when sent via the contact form.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-900">{item.recipient}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 max-w-xs truncate" title={item.subject}>
                        {item.subject}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <EmailTypeBadge type={item.emailType} />
                    </td>
                    <td className="px-6 py-4">
                      <EmailStatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-500">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleString()
                          : "N/A"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/email-logs/${item.id}`}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        {item.relatedInquiryId && (
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/inquiries/${item.relatedInquiryId}`}>
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Suspense fallback={null}>
          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={PAGE_SIZE}
          />
        </Suspense>
      </div>
    </div>
  );
}
