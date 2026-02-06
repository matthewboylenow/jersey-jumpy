import { MetadataRoute } from "next";
import { getDb } from "@/lib/db";
import { inflatables } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://jerseyjumpy.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/inflatables`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/party-packages`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic inflatable pages
  let inflatablePages: MetadataRoute.Sitemap = [];
  try {
    const db = getDb();
    const activeInflatables = await db
      .select({ slug: inflatables.slug, updatedAt: inflatables.updatedAt })
      .from(inflatables)
      .where(eq(inflatables.isActive, true));

    inflatablePages = activeInflatables.map((item) => ({
      url: `${baseUrl}/inflatables/${item.slug}`,
      lastModified: item.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // If DB is unavailable, return static pages only
  }

  return [...staticPages, ...inflatablePages];
}
