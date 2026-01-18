import { getDb } from "@/lib/db";
import { partyPackages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PackageForm } from "@/components/admin/PackageForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPackagePage({ params }: PageProps) {
  const { id } = await params;
  const isNew = id === "new";

  let pkg = null;
  if (!isNew) {
    const db = getDb();
    const result = await db
      .select()
      .from(partyPackages)
      .where(eq(partyPackages.id, parseInt(id)))
      .limit(1);
    pkg = result[0] || null;
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          {isNew ? "Create Party Package" : "Edit Party Package"}
        </h1>
        <p className="text-slate-600 mt-1">
          {isNew
            ? "Add a new party package offering"
            : "Update this party package's details"}
        </p>
      </div>

      <PackageForm pkg={pkg} />
    </div>
  );
}
