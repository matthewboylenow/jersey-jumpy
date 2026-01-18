import { getDb } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { TestimonialCarousel } from "./TestimonialCarousel";

async function getTestimonials() {
  const db = getDb();
  const items = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.isActive, true))
    .orderBy(desc(testimonials.featured))
    .limit(8);
  return items;
}

export async function Testimonials() {
  const items = await getTestimonials();

  return (
    <section className="py-20 bg-gradient-to-b from-lavender-light/20 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-mint via-sky to-lavender bg-clip-text text-transparent">
              Happy Customers
            </span>{" "}
            Say
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what parents and party
            planners have to say about their Jersey Jumpy experience.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <TestimonialCarousel testimonials={items} />
      </div>
    </section>
  );
}
