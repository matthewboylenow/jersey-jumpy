import { getDb } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { FAQForm } from "@/components/admin/FAQForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditFAQPage({ params }: PageProps) {
  const { id } = await params;
  const isNew = id === "new";

  let faq = null;
  if (!isNew) {
    const db = getDb();
    const result = await db
      .select()
      .from(faqs)
      .where(eq(faqs.id, parseInt(id)))
      .limit(1);
    faq = result[0] || null;
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          {isNew ? "Add FAQ" : "Edit FAQ"}
        </h1>
        <p className="text-slate-600 mt-1">
          {isNew
            ? "Add a new frequently asked question"
            : "Update this FAQ's details"}
        </p>
      </div>

      <FAQForm faq={faq} />
    </div>
  );
}
