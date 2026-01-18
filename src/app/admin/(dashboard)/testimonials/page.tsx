import { getDb } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { desc, ilike, eq, and, or } from "drizzle-orm";
import Link from "next/link";
import { Plus, Pencil, Star, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GenericActions } from "@/components/admin/GenericActions";
import { AdminSearch } from "@/components/admin/AdminSearch";
import { AdminStatusFilter } from "@/components/admin/AdminStatusFilter";
import { Suspense } from "react";

interface SearchParams {
  q?: string;
  status?: string;
}

async function getTestimonials(searchParams: SearchParams) {
  const db = getDb();

  // Build conditions
  const conditions = [];

  if (searchParams.q) {
    const searchTerm = `%${searchParams.q}%`;
    conditions.push(
      or(
        ilike(testimonials.customerName, searchTerm),
        ilike(testimonials.location, searchTerm),
        ilike(testimonials.content, searchTerm)
      )
    );
  }

  if (searchParams.status === "active") {
    conditions.push(eq(testimonials.isActive, true));
  } else if (searchParams.status === "hidden") {
    conditions.push(eq(testimonials.isActive, false));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  return db
    .select()
    .from(testimonials)
    .where(whereClause)
    .orderBy(desc(testimonials.featured), desc(testimonials.createdAt));
}

export default async function TestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const items = await getTestimonials(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
          <p className="text-slate-600 mt-1">
            Manage customer reviews and testimonials
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/testimonials/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Suspense fallback={<div className="w-64 h-10 bg-slate-100 rounded-md animate-pulse" />}>
          <AdminSearch placeholder="Search testimonials..." />
        </Suspense>
        <Suspense fallback={<div className="w-36 h-10 bg-slate-100 rounded-md animate-pulse" />}>
          <AdminStatusFilter />
        </Suspense>
        {items.length > 0 && (
          <span className="text-sm text-slate-500 ml-auto">
            {items.length} testimonial{items.length !== 1 ? "s" : ""} found
          </span>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Rating
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
                    No testimonials found matching your criteria.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{item.customerName}</p>
                        <p className="text-sm text-slate-500">{item.location}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-md">
                      <p className="text-sm text-slate-600 truncate">
                        {item.content}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-0.5">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-butter-dark fill-butter-dark" />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {item.featured && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-butter/30 text-butter-dark rounded-full w-fit">
                            Featured
                          </span>
                        )}
                        {item.isActive ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-mint/20 text-mint-dark rounded-full w-fit">
                            <Eye className="w-3 h-3" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-slate-100 text-slate-500 rounded-full w-fit">
                            <EyeOff className="w-3 h-3" />
                            Hidden
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/testimonials/${item.id}`}>
                            <Pencil className="w-4 h-4" />
                          </Link>
                        </Button>
                        <GenericActions
                          id={item.id}
                          isActive={item.isActive ?? true}
                          entityType="testimonials"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
