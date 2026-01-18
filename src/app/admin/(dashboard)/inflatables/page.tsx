import { getDb } from "@/lib/db";
import { inflatables } from "@/lib/db/schema";
import { asc, ilike, eq, and, or, sql } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { InflatableActions } from "@/components/admin/InflatableActions";
import { AdminSearch } from "@/components/admin/AdminSearch";
import { AdminCategoryFilter } from "@/components/admin/AdminCategoryFilter";
import { AdminStatusFilter } from "@/components/admin/AdminStatusFilter";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { Suspense } from "react";

const PAGE_SIZE = 10;

const categoryLabels: Record<string, string> = {
  "13x13-bouncers": "13'x13' Bouncers",
  "castle-bouncers": "Castle Bouncers",
  "combo-bouncers": "Combo Bouncers",
  "wet-dry-slides": "Wet/Dry Slides",
  "obstacle-courses": "Obstacle Courses",
};

const categories = Object.entries(categoryLabels).map(([value, label]) => ({
  value,
  label,
}));

interface SearchParams {
  q?: string;
  category?: string;
  status?: string;
  page?: string;
}

async function getInflatables(searchParams: SearchParams) {
  const db = getDb();
  const page = parseInt(searchParams.page || "1");
  const offset = (page - 1) * PAGE_SIZE;

  // Build conditions
  const conditions = [];

  if (searchParams.q) {
    const searchTerm = `%${searchParams.q}%`;
    conditions.push(
      or(
        ilike(inflatables.name, searchTerm),
        ilike(inflatables.subtitle, searchTerm),
        ilike(inflatables.description, searchTerm)
      )
    );
  }

  if (searchParams.category && searchParams.category !== "all") {
    conditions.push(eq(inflatables.category, searchParams.category));
  }

  if (searchParams.status === "active") {
    conditions.push(eq(inflatables.isActive, true));
  } else if (searchParams.status === "hidden") {
    conditions.push(eq(inflatables.isActive, false));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Get total count
  const countResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(inflatables)
    .where(whereClause);
  const totalItems = countResult[0]?.count || 0;

  // Get paginated items
  const items = await db
    .select()
    .from(inflatables)
    .where(whereClause)
    .orderBy(asc(inflatables.sortOrder), asc(inflatables.name))
    .limit(PAGE_SIZE)
    .offset(offset);

  return {
    items,
    totalItems,
    totalPages: Math.ceil(totalItems / PAGE_SIZE),
    currentPage: page,
  };
}

export default async function InflatablesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { items, totalItems, totalPages, currentPage } = await getInflatables(params);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inflatables</h1>
          <p className="text-slate-600 mt-1">
            Manage your bounce houses, slides, and obstacle courses
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/inflatables/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Inflatable
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Suspense fallback={<div className="w-64 h-10 bg-slate-100 rounded-md animate-pulse" />}>
          <AdminSearch placeholder="Search inflatables..." />
        </Suspense>
        <Suspense fallback={<div className="w-48 h-10 bg-slate-100 rounded-md animate-pulse" />}>
          <AdminCategoryFilter categories={categories} />
        </Suspense>
        <Suspense fallback={<div className="w-36 h-10 bg-slate-100 rounded-md animate-pulse" />}>
          <AdminStatusFilter />
        </Suspense>
        {totalItems > 0 && (
          <span className="text-sm text-slate-500 ml-auto">
            {totalItems} inflatable{totalItems !== 1 ? "s" : ""} found
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
                  Inflatable
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
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
                    No inflatables found matching your criteria.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden relative shrink-0">
                          {item.mainImageUrl ? (
                            <Image
                              src={item.mainImageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                              No image
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{item.name}</p>
                          <p className="text-sm text-slate-500">{item.subtitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                        {categoryLabels[item.category] || item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-900">
                        {item.price ? formatPrice(item.price) : "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
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
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/inflatables/${item.id}`}>
                            <Pencil className="w-4 h-4" />
                          </Link>
                        </Button>
                        <InflatableActions id={item.id} isActive={item.isActive ?? true} />
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
