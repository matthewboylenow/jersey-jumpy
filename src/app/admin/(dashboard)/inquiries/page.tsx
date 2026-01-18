import { getDb } from "@/lib/db";
import { inquiries } from "@/lib/db/schema";
import { desc, ilike, eq, and, or, sql } from "drizzle-orm";
import Link from "next/link";
import { Eye, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InquiryStatusBadge } from "@/components/admin/InquiryStatusBadge";
import { ExportButton } from "@/components/admin/ExportButton";
import { AdminSearch } from "@/components/admin/AdminSearch";
import { AdminStatusFilter } from "@/components/admin/AdminStatusFilter";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { Suspense } from "react";

const PAGE_SIZE = 15;

const inquiryStatuses = [
  { value: "all", label: "All Status" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "booked", label: "Booked" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

interface SearchParams {
  q?: string;
  status?: string;
  page?: string;
}

async function getInquiries(searchParams: SearchParams) {
  const db = getDb();
  const page = parseInt(searchParams.page || "1");
  const offset = (page - 1) * PAGE_SIZE;

  // Build conditions
  const conditions = [];

  if (searchParams.q) {
    const searchTerm = `%${searchParams.q}%`;
    conditions.push(
      or(
        ilike(inquiries.name, searchTerm),
        ilike(inquiries.email, searchTerm),
        ilike(inquiries.phone, searchTerm),
        ilike(inquiries.requestedJumpy, searchTerm),
        ilike(inquiries.city, searchTerm)
      )
    );
  }

  if (searchParams.status && searchParams.status !== "all") {
    conditions.push(eq(inquiries.status, searchParams.status));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Get total count
  const countResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(inquiries)
    .where(whereClause);
  const totalItems = countResult[0]?.count || 0;

  // Get stats (for all inquiries, not filtered)
  const allItems = await db.select().from(inquiries);
  const stats = {
    total: allItems.length,
    new: allItems.filter((i) => i.status === "new").length,
    contacted: allItems.filter((i) => i.status === "contacted").length,
    booked: allItems.filter((i) => i.status === "booked").length,
  };

  // Get paginated items
  const items = await db
    .select()
    .from(inquiries)
    .where(whereClause)
    .orderBy(desc(inquiries.createdAt))
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

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { items, totalItems, totalPages, currentPage, stats } = await getInquiries(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inquiries</h1>
          <p className="text-slate-600 mt-1">
            View and manage contact form submissions
          </p>
        </div>
        <ExportButton />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          <p className="text-sm text-slate-500">Total Inquiries</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-sky-600">{stats.new}</p>
          <p className="text-sm text-slate-500">New</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-butter-dark">{stats.contacted}</p>
          <p className="text-sm text-slate-500">Contacted</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-mint-dark">{stats.booked}</p>
          <p className="text-sm text-slate-500">Booked</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Suspense fallback={<div className="w-64 h-10 bg-slate-100 rounded-md animate-pulse" />}>
          <AdminSearch placeholder="Search by name, email, phone..." />
        </Suspense>
        <Suspense fallback={<div className="w-36 h-10 bg-slate-100 rounded-md animate-pulse" />}>
          <AdminStatusFilter statuses={inquiryStatuses} />
        </Suspense>
        {totalItems > 0 && (
          <span className="text-sm text-slate-500 ml-auto">
            {totalItems} inquir{totalItems !== 1 ? "ies" : "y"} found
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
                  Contact
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Event Details
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No inquiries found matching your criteria.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{item.name}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {item.email}
                          </span>
                          {item.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {item.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">
                          {item.requestedJumpy || "Not specified"}
                        </p>
                        {item.requestedDate && (
                          <p className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.requestedDate).toLocaleDateString()}
                            {item.requestedTime && ` at ${item.requestedTime}`}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <InquiryStatusBadge status={item.status || "new"} />
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-500">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/inquiries/${item.id}`}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Link>
                        </Button>
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
