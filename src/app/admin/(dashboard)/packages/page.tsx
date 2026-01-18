import { getDb } from "@/lib/db";
import { partyPackages } from "@/lib/db/schema";
import { asc, ilike, eq, and } from "drizzle-orm";
import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { GenericActions } from "@/components/admin/GenericActions";
import { AdminSearch } from "@/components/admin/AdminSearch";
import { AdminStatusFilter } from "@/components/admin/AdminStatusFilter";
import { Suspense } from "react";

interface SearchParams {
  q?: string;
  status?: string;
}

async function getPackages(searchParams: SearchParams) {
  const db = getDb();

  // Build conditions
  const conditions = [];

  if (searchParams.q) {
    const searchTerm = `%${searchParams.q}%`;
    conditions.push(ilike(partyPackages.name, searchTerm));
  }

  if (searchParams.status === "active") {
    conditions.push(eq(partyPackages.isActive, true));
  } else if (searchParams.status === "hidden") {
    conditions.push(eq(partyPackages.isActive, false));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  return db
    .select()
    .from(partyPackages)
    .where(whereClause)
    .orderBy(asc(partyPackages.sortOrder), asc(partyPackages.name));
}

interface PackageItem {
  quantity: number;
  name: string;
}

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const items = await getPackages(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Party Packages</h1>
          <p className="text-slate-600 mt-1">
            Manage bundled inflatable packages
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/packages/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Package
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Suspense fallback={<div className="w-64 h-10 bg-slate-100 rounded-md animate-pulse" />}>
          <AdminSearch placeholder="Search packages..." />
        </Suspense>
        <Suspense fallback={<div className="w-36 h-10 bg-slate-100 rounded-md animate-pulse" />}>
          <AdminStatusFilter />
        </Suspense>
        {items.length > 0 && (
          <span className="text-sm text-slate-500 ml-auto">
            {items.length} package{items.length !== 1 ? "s" : ""} found
          </span>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Package
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Items
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
                    No packages found matching your criteria.
                  </td>
                </tr>
              ) : (
                items.map((item) => {
                  const packageItems = item.items as PackageItem[];
                  return (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">{item.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-500">
                          {packageItems.map((pi, i) => (
                            <span key={i}>
                              ({pi.quantity}) {pi.name}
                              {i < packageItems.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-900">
                          {formatPrice(item.price)}
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
                            <Link href={`/admin/packages/${item.id}`}>
                              <Pencil className="w-4 h-4" />
                            </Link>
                          </Button>
                          <GenericActions
                            id={item.id}
                            isActive={item.isActive ?? true}
                            entityType="packages"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
