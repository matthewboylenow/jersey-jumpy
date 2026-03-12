import { JsonLd } from "./JsonLd";
import type { Testimonial } from "@/lib/db/schema";

export function TestimonialsJsonLd({ testimonials }: { testimonials: Testimonial[] }) {
  const totalReviews = testimonials.length;
  if (totalReviews === 0) return null;

  const averageRating =
    testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / totalReviews;

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://jerseyjumpy.com/#business",
    name: "Jersey Jumpy",
    url: "https://jerseyjumpy.com",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      reviewCount: totalReviews.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    review: testimonials.slice(0, 10).map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.customerName,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: (t.rating || 5).toString(),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: t.content,
    })),
  };

  return <JsonLd data={data} />;
}
