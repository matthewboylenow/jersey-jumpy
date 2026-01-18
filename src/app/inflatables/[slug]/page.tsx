import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { inflatables } from "@/lib/db/schema";
import { eq, and, ne } from "drizzle-orm";
import { InflatableDetail } from "@/components/inflatables/InflatableDetail";
import { RelatedInflatables } from "@/components/inflatables/RelatedInflatables";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getInflatable(slug: string) {
  const db = getDb();
  const results = await db
    .select()
    .from(inflatables)
    .where(and(eq(inflatables.slug, slug), eq(inflatables.isActive, true)))
    .limit(1);
  return results[0] || null;
}

async function getRelatedInflatables(category: string, excludeSlug: string) {
  const db = getDb();
  const results = await db
    .select()
    .from(inflatables)
    .where(
      and(
        eq(inflatables.category, category),
        eq(inflatables.isActive, true),
        ne(inflatables.slug, excludeSlug)
      )
    )
    .limit(4);
  return results;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const inflatable = await getInflatable(slug);

  if (!inflatable) {
    return {
      title: "Inflatable Not Found | Jersey Jumpy",
    };
  }

  return {
    title: inflatable.metaTitle || `${inflatable.name} | Jersey Jumpy`,
    description:
      inflatable.metaDescription ||
      `Rent the ${inflatable.name} for your next party. ${inflatable.subtitle || ""} Professional delivery across New Jersey.`,
    openGraph: {
      title: `${inflatable.name} | Jersey Jumpy`,
      description: inflatable.description || `Rent the ${inflatable.name} for your next party.`,
      images: inflatable.mainImageUrl ? [inflatable.mainImageUrl] : undefined,
    },
  };
}

export default async function InflatableDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const inflatable = await getInflatable(slug);

  if (!inflatable) {
    notFound();
  }

  const relatedInflatables = await getRelatedInflatables(
    inflatable.category,
    inflatable.slug
  );

  return (
    <div className="min-h-screen pt-24 pb-20">
      <InflatableDetail inflatable={inflatable} />

      {relatedInflatables.length > 0 && (
        <RelatedInflatables inflatables={relatedInflatables} />
      )}
    </div>
  );
}
