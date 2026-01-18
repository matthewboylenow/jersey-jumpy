import { getDb } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { TestimonialForm } from "@/components/admin/TestimonialForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTestimonialPage({ params }: PageProps) {
  const { id } = await params;
  const isNew = id === "new";

  let testimonial = null;
  if (!isNew) {
    const db = getDb();
    const result = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, parseInt(id)))
      .limit(1);
    testimonial = result[0] || null;
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          {isNew ? "Add Testimonial" : "Edit Testimonial"}
        </h1>
        <p className="text-slate-600 mt-1">
          {isNew
            ? "Add a new customer testimonial"
            : "Update this testimonial's details"}
        </p>
      </div>

      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
