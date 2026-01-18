import { Metadata } from "next";
import { getDb } from "@/lib/db";
import { inflatables, categories } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { InflatablesGrid } from "@/components/inflatables/InflatablesGrid";
import { FloatingBlobs } from "@/components/decorative/FloatingBlobs";

export const metadata: Metadata = {
  title: "Bounce Houses & Inflatables | Jersey Jumpy",
  description:
    "Browse our collection of bounce houses, castle bouncers, combo units, wet/dry slides, and obstacle courses. Professional delivery across New Jersey.",
};

async function getInflatables() {
  const db = getDb();
  const items = await db
    .select()
    .from(inflatables)
    .where(eq(inflatables.isActive, true))
    .orderBy(asc(inflatables.sortOrder), asc(inflatables.name));
  return items;
}

async function getCategories() {
  const db = getDb();
  const items = await db
    .select()
    .from(categories)
    .orderBy(asc(categories.sortOrder));
  return items;
}

export default async function InflatablesPage() {
  const [allInflatables, allCategories] = await Promise.all([
    getInflatables(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <FloatingBlobs variant="subtle" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-lavender via-peach to-coral bg-clip-text text-transparent">
                Inflatables
              </span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              From classic bouncers to giant obstacle courses, find the perfect
              inflatable for your next celebration.
            </p>
          </div>
        </div>
      </section>

      {/* Inflatables Grid with Filter */}
      <section className="container mx-auto px-4">
        <InflatablesGrid
          inflatables={allInflatables}
          categories={allCategories}
        />
      </section>
    </div>
  );
}
