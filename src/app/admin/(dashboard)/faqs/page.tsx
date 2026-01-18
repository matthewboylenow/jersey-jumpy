import { getDb } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { asc, ilike, eq, and, or } from "drizzle-orm";
import Link from "next/link";
import { Plus, Pencil, GripVertical, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GenericActions } from "@/components/admin/GenericActions";
import { AdminSearch } from "@/components/admin/AdminSearch";
import { AdminStatusFilter } from "@/components/admin/AdminStatusFilter";
import { Suspense } from "react";

interface SearchParams {
  q?: string;
  status?: string;
}

async function getFAQs(searchParams: SearchParams) {
  const db = getDb();

  // Build conditions
  const conditions = [];

  if (searchParams.q) {
    const searchTerm = `%${searchParams.q}%`;
    conditions.push(
      or(
        ilike(faqs.question, searchTerm),
        ilike(faqs.answer, searchTerm)
      )
    );
  }

  if (searchParams.status === "active") {
    conditions.push(eq(faqs.isActive, true));
  } else if (searchParams.status === "hidden") {
    conditions.push(eq(faqs.isActive, false));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  return db
    .select()
    .from(faqs)
    .where(whereClause)
    .orderBy(asc(faqs.sortOrder));
}

export default async function FAQsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const items = await getFAQs(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">FAQs</h1>
          <p className="text-slate-600 mt-1">
            Manage frequently asked questions
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/faqs/new">
            <Plus className="w-4 h-4 mr-2" />
            Add FAQ
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Suspense fallback={<div className="w-64 h-10 bg-slate-100 rounded-md animate-pulse" />}>
          <AdminSearch placeholder="Search FAQs..." />
        </Suspense>
        <Suspense fallback={<div className="w-36 h-10 bg-slate-100 rounded-md animate-pulse" />}>
          <AdminStatusFilter />
        </Suspense>
        {items.length > 0 && (
          <span className="text-sm text-slate-500 ml-auto">
            {items.length} FAQ{items.length !== 1 ? "s" : ""} found
          </span>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {items.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-500">
            No FAQs found matching your criteria.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-6 hover:bg-slate-50"
              >
                <div className="flex items-center gap-2 text-slate-400 pt-1">
                  <GripVertical className="w-5 h-5" />
                  <span className="text-sm font-medium">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 mb-1">{item.question}</p>
                  <p className="text-sm text-slate-500 line-clamp-2">{item.answer}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {item.isActive ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-mint/20 text-mint-dark rounded-full">
                      <Eye className="w-3 h-3" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-slate-100 text-slate-500 rounded-full">
                      <EyeOff className="w-3 h-3" />
                      Hidden
                    </span>
                  )}
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/faqs/${item.id}`}>
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </Button>
                  <GenericActions
                    id={item.id}
                    isActive={item.isActive ?? true}
                    entityType="faqs"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
