import { getDb } from "@/lib/db";
import { inflatables } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { InflatableForm } from "@/components/admin/InflatableForm";

async function getInflatable(id: string) {
  if (id === "new") return null;

  const db = getDb();
  const result = await db
    .select()
    .from(inflatables)
    .where(eq(inflatables.id, parseInt(id)))
    .limit(1);

  return result[0] || null;
}

export default async function InflatableEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inflatable = await getInflatable(id);

  if (id !== "new" && !inflatable) {
    notFound();
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          {inflatable ? "Edit Inflatable" : "Add New Inflatable"}
        </h1>
        <p className="text-slate-600 mt-1">
          {inflatable
            ? `Editing "${inflatable.name}"`
            : "Create a new bounce house, slide, or obstacle course"}
        </p>
      </div>

      <InflatableForm inflatable={inflatable} />
    </div>
  );
}
