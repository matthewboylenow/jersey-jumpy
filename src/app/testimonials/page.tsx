import { Metadata } from "next";
import { getDb } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { FloatingBlobs } from "@/components/decorative/FloatingBlobs";
import { TestimonialGrid } from "@/components/testimonials/TestimonialGrid";
import { Star, Phone } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Customer Reviews & Testimonials | Jersey Jumpy",
  description:
    "Read what our customers say about Jersey Jumpy. Real reviews from real families across New Jersey who trusted us for their parties and events.",
};

async function getTestimonials() {
  const db = getDb();
  const items = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.isActive, true))
    .orderBy(desc(testimonials.featured), desc(testimonials.createdAt));
  return items;
}

export default async function TestimonialsPage() {
  const allTestimonials = await getTestimonials();

  // Calculate stats
  const totalReviews = allTestimonials.length;
  const averageRating =
    allTestimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / totalReviews;

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <FloatingBlobs variant="subtle" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 mb-6">
              <Star className="w-4 h-4 text-butter-dark fill-butter-dark" />
              <span className="text-sm font-medium text-text-secondary">
                {averageRating.toFixed(1)} Average Rating
              </span>
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4">
              What Our{" "}
              <span className="bg-gradient-to-r from-lavender via-peach to-coral bg-clip-text text-transparent">
                Customers Say
              </span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Don&apos;t just take our word for it. Here&apos;s what families across
              New Jersey have to say about their Jersey Jumpy experience.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-8 flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="font-display font-extrabold text-4xl text-cta-primary">
                {totalReviews}+
              </p>
              <p className="text-text-muted text-sm">Happy Families</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-butter-dark fill-butter-dark"
                  />
                ))}
              </div>
              <p className="text-text-muted text-sm">5-Star Service</p>
            </div>
            <div className="text-center">
              <p className="font-display font-extrabold text-4xl text-cta-primary">
                2007
              </p>
              <p className="text-text-muted text-sm">Established</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="container mx-auto px-4 mb-16">
        <TestimonialGrid testimonials={allTestimonials} />
      </section>

      {/* CTA Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lavender/20 via-peach/20 to-mint/20" />
        <FloatingBlobs variant="subtle" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="glass-card max-w-3xl mx-auto p-8 md:p-12 text-center">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4">
              Ready to Create Your Own Memories?
            </h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              Join hundreds of happy families who have made their parties
              unforgettable with Jersey Jumpy!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:866-597-6625"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cta-primary to-cta-primary-hover text-white font-display font-bold text-lg shadow-lg shadow-cta-primary/30 hover:shadow-xl transition-shadow"
              >
                <Phone className="w-5 h-5" />
                <span>866-597-6625</span>
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full font-display font-bold text-lg border-2 border-cta-primary/20 text-cta-primary hover:bg-lavender-light/30 hover:border-cta-primary/40 transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
