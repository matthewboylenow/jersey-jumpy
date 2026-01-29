import { Metadata } from "next";
import { getDb } from "@/lib/db";
import { inflatables } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { FloatingBlobs } from "@/components/decorative/FloatingBlobs";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Camera, Phone } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Browse photos of our bounce houses, water slides, and obstacle courses at real New Jersey events! See our inflatables in action at birthday parties, school field days, and corporate events throughout NJ.",
  openGraph: {
    title: "Photo Gallery | Jersey Jumpy",
    description: "See our bounce houses, slides, and obstacle courses in action at real New Jersey events!",
  },
  alternates: {
    canonical: "https://jerseyjumpy.com/gallery",
  },
};

async function getGalleryImages() {
  const db = getDb();
  const items = await db
    .select({
      id: inflatables.id,
      name: inflatables.name,
      slug: inflatables.slug,
      category: inflatables.category,
      mainImageUrl: inflatables.mainImageUrl,
      galleryImageUrls: inflatables.galleryImageUrls,
    })
    .from(inflatables)
    .where(eq(inflatables.isActive, true))
    .orderBy(asc(inflatables.sortOrder), asc(inflatables.name));
  return items;
}

export default async function GalleryPage() {
  const inflatablesData = await getGalleryImages();

  // Flatten all images into a gallery array
  const galleryImages = inflatablesData.flatMap((item) => {
    const images = [];
    if (item.mainImageUrl) {
      images.push({
        id: `${item.id}-main`,
        url: item.mainImageUrl,
        name: item.name,
        slug: item.slug,
        category: item.category,
      });
    }
    if (item.galleryImageUrls) {
      item.galleryImageUrls.forEach((url, index) => {
        if (url) {
          images.push({
            id: `${item.id}-${index}`,
            url,
            name: item.name,
            slug: item.slug,
            category: item.category,
          });
        }
      });
    }
    return images;
  });

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <FloatingBlobs variant="subtle" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 mb-6">
              <Camera className="w-4 h-4 text-cta-primary" />
              <span className="text-sm font-medium text-text-secondary">
                Real Events, Real Fun
              </span>
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4">
              Photo{" "}
              <span className="bg-gradient-to-r from-lavender via-peach to-coral bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              See our amazing inflatables in action! Browse photos from real
              events across New Jersey.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4 mb-16">
        {galleryImages.length > 0 ? (
          <GalleryGrid images={galleryImages} />
        ) : (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="glass-card p-12">
              <span className="text-6xl mb-6 block">📸</span>
              <h2 className="font-display font-bold text-2xl text-text-primary mb-4">
                Gallery Coming Soon!
              </h2>
              <p className="text-text-secondary mb-6">
                We&apos;re updating our gallery with fresh photos. In the meantime,
                check out our inflatables page to see all our equipment.
              </p>
              <Link
                href="/inflatables"
                className="inline-flex px-6 py-3 rounded-full bg-gradient-to-r from-cta-primary to-cta-primary-hover text-white font-display font-bold shadow-lg shadow-cta-primary/30 hover:shadow-xl transition-shadow"
              >
                Browse Inflatables
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Share Your Photos */}
      <section className="relative py-16 overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-lavender/10 via-peach/10 to-mint/10" />
        <FloatingBlobs variant="subtle" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display font-bold text-2xl text-text-primary mb-4">
              Had a Jersey Jumpy Party?
            </h2>
            <p className="text-text-secondary mb-8">
              We&apos;d love to see your photos! Tag us on social media or send
              us your favorite party pics. With your permission, we may feature
              them in our gallery!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://www.facebook.com/JerseyJumpy/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#1877F2] text-white font-display font-bold hover:opacity-90 transition-opacity"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/jerseyjumpy/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white font-display font-bold hover:opacity-90 transition-opacity"
              >
                Instagram
              </a>
              <a
                href="https://twitter.com/jerseyjumpy/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#1DA1F2] text-white font-display font-bold hover:opacity-90 transition-opacity"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="glass-card max-w-3xl mx-auto p-8 md:p-12 text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-4">
            Ready to Create Your Own Memories?
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Book your bounce house today and make your next party unforgettable!
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
      </section>
    </div>
  );
}
