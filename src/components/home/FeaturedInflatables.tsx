import { getDb } from "@/lib/db";
import { inflatables } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { InflatableCard } from "@/components/inflatables/InflatableCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function getFeaturedInflatables() {
  const db = getDb();
  const featured = await db
    .select()
    .from(inflatables)
    .where(eq(inflatables.isActive, true))
    .limit(8);
  return featured;
}

export async function FeaturedInflatables() {
  const featuredItems = await getFeaturedInflatables();

  return (
    <section className="py-20 bg-gradient-to-b from-white to-lavender-light/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-lavender via-peach to-coral bg-clip-text text-transparent">
              Most Popular
            </span>{" "}
            Inflatables
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            From classic bouncers to giant obstacle courses, we have the perfect
            inflatable for every party.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {featuredItems.map((item, index) => (
            <InflatableCard key={item.id} inflatable={item} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            className="px-8 py-6 rounded-full font-display font-bold text-lg bg-gradient-to-r from-cta-primary to-cta-primary-hover hover:opacity-90 shadow-lg shadow-cta-primary/30"
          >
            <Link href="/inflatables" className="flex items-center gap-2">
              <span>View All Inflatables</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
